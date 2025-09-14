package com.nguyenthanhbang.foodordering.controller.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nguyenthanhbang.foodordering.config.JwtFilter;
import com.nguyenthanhbang.foodordering.dto.request.ReviewRequest;
import com.nguyenthanhbang.foodordering.model.Review;
import com.nguyenthanhbang.foodordering.service.ReviewService;
import com.nguyenthanhbang.foodordering.util.SecurityUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ReviewController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ReviewControllerTest {
    @MockBean
    private SecurityUtil securityUtil;
    @MockBean
    private UserDetailsService userDetailsService;
    @MockBean
    private JwtFilter jwtFilter;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReviewService reviewService;

    @Autowired
    private ObjectMapper objectMapper;

    private static final String PATH = "/api/v1";

    private Review review;
    private ReviewRequest request;

    @BeforeEach
    void setUp() {
        review = new Review();
        review.setId(1L);
        review.setRating(3);

        request = new ReviewRequest();
        request.setRestaurantId(2L);
        request.setRating(3);
    }

    @Test
    void rating_validRequest_shouldCreateReview() throws Exception {
        when(reviewService.rating(any(ReviewRequest.class))).thenReturn(review);

        mockMvc.perform(post(PATH + "/reviews")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value(201))
                .andExpect(jsonPath("$.message").value("Review successfully"))
                .andExpect(jsonPath("$.data.rating").value(3))
                .andExpect(jsonPath("$.data.id").value(1L));
        verify(reviewService).rating(any(ReviewRequest.class));
    }


    @Test
    void getMyReview_validRequest_shouldReturnReview() throws Exception {
        when(reviewService.getMyReview(2L)).thenReturn(review);

        mockMvc.perform(get(PATH + "/restaurants/{restaurantId}/my-review", 2L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get my review successfully"))
                .andExpect(jsonPath("$.data.rating").value(3))
                .andExpect(jsonPath("$.data.id").value(1L));

        verify(reviewService).getMyReview(2L);
    }

    @Test
    void getMyReview_invalidPathVariable_shouldReturnBadRequest() throws Exception {
        mockMvc.perform(get(PATH + "/restaurants/invalid/my-review"))
                .andExpect(status().isBadRequest());

        verify(reviewService, never()).getMyReview(anyLong());
    }
}