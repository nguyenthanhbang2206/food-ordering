package com.nguyenthanhbang.foodordering.controller.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nguyenthanhbang.foodordering.config.JwtFilter;
import com.nguyenthanhbang.foodordering.dto.request.RestaurantRequest;
import com.nguyenthanhbang.foodordering.model.Address;
import com.nguyenthanhbang.foodordering.model.ContactInformation;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.service.RestaurantService;
import com.nguyenthanhbang.foodordering.util.SecurityUtil;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AdminRestaurantController.class)
@AutoConfigureMockMvc(addFilters = false)
public class AdminRestaurantControllerTest {

    @MockBean
    private SecurityUtil securityUtil;
    @MockBean
    private UserDetailsService userDetailsService;
    @MockBean
    private JwtFilter jwtFilter;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RestaurantService restaurantService;

    @Autowired
    private ObjectMapper objectMapper;

    private static final String PATH = "/api/v1/admin/restaurants";

    private Restaurant restaurant;
    private RestaurantRequest request;

    @BeforeEach
    void setUp() {
        restaurant = new Restaurant();
        restaurant.setId(1L);
        restaurant.setName("Pizza Place");
        restaurant.setOpen(true);

        request = new RestaurantRequest();
        request.setName("Pizza Place");
        request.setImages(Arrays.asList("image1"));
        request.setAddress(new Address());
        request.setOpeningHours("10AM - 10PM");
        request.setContactInformation(new ContactInformation());
        request.setDescription("Best pizza in town");
    }

    @Test
    void createRestaurant_validRequest_shouldCreateRestaurant() throws Exception {
        when(restaurantService.createRestaurant(any(RestaurantRequest.class))).thenReturn(restaurant);

        mockMvc.perform(post(PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value(201))
                .andExpect(jsonPath("$.message").value("Restaurant created"))
                .andExpect(jsonPath("$.data.name").value("Pizza Place"))
                .andExpect(jsonPath("$.data.id").value(1L));

        verify(restaurantService).createRestaurant(any(RestaurantRequest.class));
    }

    @Test
    void createRestaurant_invalidRequest_shouldReturnBadRequest() throws Exception {
        request.setName("");

        mockMvc.perform(post(PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(restaurantService, never()).createRestaurant(any(RestaurantRequest.class));
    }

    @Test
    void createRestaurant_serviceThrowsException_shouldReturnNotFound() throws Exception {
        when(restaurantService.createRestaurant(any(RestaurantRequest.class)))
                .thenThrow(new EntityNotFoundException("User not found"));

        mockMvc.perform(post(PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());

        verify(restaurantService).createRestaurant(any(RestaurantRequest.class));
    }

    @Test
    void updateRestaurant_validRequest_shouldUpdateRestaurant() throws Exception {
        restaurant.setName("Updated Name");
        when(restaurantService.updateRestaurant(any(RestaurantRequest.class))).thenReturn(restaurant);

        mockMvc.perform(put(PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Restaurant updated"))
                .andExpect(jsonPath("$.data.name").value("Updated Name"))
                .andExpect(jsonPath("$.data.id").value(1L));

        verify(restaurantService).updateRestaurant(any(RestaurantRequest.class));
    }

    @Test
    void updateRestaurant_invalidRequest_shouldReturnBadRequest() throws Exception {
        request.setName("");

        mockMvc.perform(put(PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(restaurantService, never()).updateRestaurant(any(RestaurantRequest.class));
    }

    @Test
    void updateRestaurant_serviceThrowsException_shouldReturnNotFound() throws Exception {
        when(restaurantService.updateRestaurant(any(RestaurantRequest.class)))
                .thenThrow(new EntityNotFoundException("Restaurant not found"));

        mockMvc.perform(put(PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());

        verify(restaurantService).updateRestaurant(any(RestaurantRequest.class));
    }

    @Test
    void deleteRestaurant_validRequest_shouldDeleteRestaurant() throws Exception {
        doNothing().when(restaurantService).deleteRestaurant(1L);

        mockMvc.perform(delete(PATH + "/{restaurantId}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Restaurant deleted"))
                .andExpect(jsonPath("$.data").doesNotExist());
        verify(restaurantService).deleteRestaurant(1L);
    }

    @Test
    void deleteRestaurant_invalidPathVariable_shouldReturnBadRequest() throws Exception {
        mockMvc.perform(delete(PATH + "/invalid"))
                .andExpect(status().isBadRequest());

        verify(restaurantService, never()).deleteRestaurant(anyLong());
    }

    @Test
    void deleteRestaurant_serviceThrowsException_shouldReturnNotFound() throws Exception {
        doThrow(new EntityNotFoundException("Restaurant not found")).when(restaurantService).deleteRestaurant(999L);

        mockMvc.perform(delete(PATH + "/{restaurantId}", 999L))
                .andExpect(status().isNotFound());

        verify(restaurantService).deleteRestaurant(999L);
    }

    @Test
    void getMyRestaurant_shouldReturnRestaurant() throws Exception {
        when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);

        mockMvc.perform(get("/api/v1/admin/my-restaurant"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get restaurant success"))
                .andExpect(jsonPath("$.data.name").value("Pizza Place"))
                .andExpect(jsonPath("$.data.id").value(1L));

        verify(restaurantService).getRestaurantOfUser();
    }

    @Test
    void getMyRestaurant_serviceThrowsException_shouldReturnNotFound() throws Exception {
        when(restaurantService.getRestaurantOfUser()).thenThrow(new EntityNotFoundException("Restaurant not found"));

        mockMvc.perform(get("/api/v1/admin/my-restaurant"))
                .andExpect(status().isNotFound());

        verify(restaurantService).getRestaurantOfUser();
    }

    @Test
    void updateRestaurantStatus_shouldUpdateStatus() throws Exception {
        restaurant.setOpen(false);
        when(restaurantService.updateStatusOfRestaurant()).thenReturn(restaurant);

        mockMvc.perform(put(PATH + "/status"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Update restaurant success"))
                .andExpect(jsonPath("$.data.open").value(false))
                .andExpect(jsonPath("$.data.id").value(1L));

        verify(restaurantService).updateStatusOfRestaurant();
    }

    @Test
    void updateRestaurantStatus_serviceThrowsException_shouldReturnNotFound() throws Exception {
        when(restaurantService.updateStatusOfRestaurant()).thenThrow(new EntityNotFoundException("Restaurant not found"));

        mockMvc.perform(put(PATH + "/status"))
                .andExpect(status().isNotFound());

        verify(restaurantService).updateStatusOfRestaurant();
    }
}