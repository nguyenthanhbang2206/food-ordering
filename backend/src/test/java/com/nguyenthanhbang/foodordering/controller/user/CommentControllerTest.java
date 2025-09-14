package com.nguyenthanhbang.foodordering.controller.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nguyenthanhbang.foodordering.config.JwtFilter;
import com.nguyenthanhbang.foodordering.config.WebsocketConfig;
import com.nguyenthanhbang.foodordering.dto.request.CommentRequest;
import com.nguyenthanhbang.foodordering.model.Comment;
import com.nguyenthanhbang.foodordering.service.CommentService;
import com.nguyenthanhbang.foodordering.util.SecurityUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CommentController.class)
@AutoConfigureMockMvc(addFilters = false)
public class CommentControllerTest {

    @MockBean
    private SecurityUtil securityUtil;
    @MockBean
    private UserDetailsService userDetailsService;
    @MockBean
    private JwtFilter jwtFilter;



    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CommentService commentService;

    @MockBean
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    private static final String PATH = "/api/v1";

    private Comment comment;
    private CommentRequest request;

    @BeforeEach
    void setUp() {
        comment = new Comment();
        comment.setId(1L);
        comment.setContent("Nice!");

        request = new CommentRequest();
        request.setContent("Nice!");
        request.setRestaurantId(2L);
    }

    @Test
    void createComment_validRequest_shouldCreateCommentAndSendMessage() throws Exception {
        when(commentService.createComment(any(CommentRequest.class))).thenReturn(comment);

        mockMvc.perform(post(PATH + "/comments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value(201))
                .andExpect(jsonPath("$.message").value("Create comment successfully"))
                .andExpect(jsonPath("$.data.content").value("Nice!"))
                .andExpect(jsonPath("$.data.id").value(1L));

        verify(commentService).createComment(any(CommentRequest.class));
        verify(messagingTemplate).convertAndSend(eq("/topic/restaurants/" + request.getRestaurantId()), any(Comment.class));
    }

    @Test
    void createComment_invalidRequest_shouldReturnBadRequest() throws Exception {
        request.setContent("");

        mockMvc.perform(post(PATH + "/comments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(commentService, never()).createComment(any(CommentRequest.class));
        verifyNoInteractions(messagingTemplate);
    }

    @Test
    void getComments_validRequest_shouldReturnList() throws Exception {
        List<Comment> comments = Arrays.asList(comment);
        when(commentService.getCommentByRestaurantId(2L)).thenReturn(comments);

        mockMvc.perform(get(PATH + "/restaurants/{restaurantId}/comments", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get comments successfully"))
                .andExpect(jsonPath("$.data[0].content").value("Nice!"))
                .andExpect(jsonPath("$.data[0].id").value(1L));

        verify(commentService).getCommentByRestaurantId(2L);
    }

    @Test
    void getComments_noComment_shouldReturnEmptyList() throws Exception {
        when(commentService.getCommentByRestaurantId(2L)).thenReturn(Collections.emptyList());

        mockMvc.perform(get(PATH + "/restaurants/{restaurantId}/comments", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isEmpty());

        verify(commentService).getCommentByRestaurantId(2L);
    }

    @Test
    void getComments_invalidPathVariable_shouldReturnBadRequest() throws Exception {
        mockMvc.perform(get(PATH + "/restaurants/invalid/comments"))
                .andExpect(status().isBadRequest());

        verify(commentService, never()).getCommentByRestaurantId(anyLong());
    }
}