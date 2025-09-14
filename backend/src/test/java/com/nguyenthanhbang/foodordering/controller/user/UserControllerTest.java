package com.nguyenthanhbang.foodordering.controller.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nguyenthanhbang.foodordering.config.JwtFilter;
import com.nguyenthanhbang.foodordering.dto.request.UpdateUserRequest;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.service.UserService;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
public class UserControllerTest {

    @MockBean
    private SecurityUtil securityUtil;
    @MockBean
    private UserDetailsService userDetailsService;
    @MockBean
    private JwtFilter jwtFilter;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private User user;
    private UpdateUserRequest request;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");
        user.setFullName("Test");

        request = new UpdateUserRequest();
        request.setFullName("Test");
    }

    @Test
    void updateProfile_validRequest_shouldUpdateProfile() throws Exception {
        when(userService.updateProfile(any(UpdateUserRequest.class))).thenReturn(user);

        mockMvc.perform(put("/api/v1/users/profile")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Updated profile"))
                .andExpect(jsonPath("$.data.fullName").value("Test"))
                .andExpect(jsonPath("$.data.email").value("test@example.com"));
        verify(userService).updateProfile(any(UpdateUserRequest.class));
    }

    @Test
    void updateProfile_invalidRequest_shouldReturnBadRequest() throws Exception {
        request.setFullName("");

        mockMvc.perform(put("/api/v1/users/profile")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
        verify(userService, never()).updateProfile(any(UpdateUserRequest.class));
    }

    @Test
    void getProfile_validRequest_shouldReturnUser() throws Exception {
        when(userService.getUserLogin()).thenReturn(user);

        mockMvc.perform(get("/api/v1/users/profile"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get profile successfully"))
                .andExpect(jsonPath("$.data.fullName").value("Test"))
                .andExpect(jsonPath("$.data.email").value("test@example.com"));
        verify(userService).getUserLogin();
    }
}