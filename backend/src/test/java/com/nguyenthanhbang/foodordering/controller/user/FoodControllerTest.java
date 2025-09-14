package com.nguyenthanhbang.foodordering.controller.user;

import com.nguyenthanhbang.foodordering.config.JwtFilter;
import com.nguyenthanhbang.foodordering.dto.request.FoodCriteria;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.model.Food;
import com.nguyenthanhbang.foodordering.service.FoodService;
import com.nguyenthanhbang.foodordering.util.SecurityUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FoodController.class)
@AutoConfigureMockMvc(addFilters = false)
public class FoodControllerTest {

    @MockBean
    private SecurityUtil securityUtil;
    @MockBean
    private UserDetailsService userDetailsService;
    @MockBean
    private JwtFilter jwtFilter;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FoodService foodService;

    private Food food;

    @BeforeEach
    void setUp() {
        food = new Food();
        food.setId(1L);
        food.setName("Pizza");
    }

    @Test
    void getAllFoods_validRequest_shouldReturnPaginationResponse() throws Exception {
        PaginationResponse.Pagination pagination = PaginationResponse.Pagination.builder()
                .totalItems(1)
                .size(5)
                .totalPages(1)
                .page(1)
                .build();
        PaginationResponse response = PaginationResponse.builder()
                .pagination(pagination)
                .items(Arrays.asList(food))
                .build();

        Pageable pageable = PageRequest.of(0, 5);
        FoodCriteria criteria = new FoodCriteria();

        when(foodService.getAllFoods(eq(1L), any(Pageable.class), any(FoodCriteria.class))).thenReturn(response);

        mockMvc.perform(get("/api/v1/restaurants/{restaurantId}/foods", 1L)
                        .param("page", "1")
                        .param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get all foods successfully"))
                .andExpect(jsonPath("$.data.pagination.page").value(1))
                .andExpect(jsonPath("$.data.items[0].id").value(1L));
        verify(foodService).getAllFoods(eq(1L), any(Pageable.class), any(FoodCriteria.class));
    }

    @Test
    void getAllFoods_noFood_shouldReturnEmptyList() throws Exception {
        PaginationResponse.Pagination pagination = PaginationResponse.Pagination.builder()
                .totalItems(0)
                .size(5)
                .totalPages(0)
                .page(1)
                .build();
        PaginationResponse response = PaginationResponse.builder()
                .pagination(pagination)
                .items(Collections.emptyList())
                .build();

        when(foodService.getAllFoods(eq(1L), any(Pageable.class), any(FoodCriteria.class))).thenReturn(response);

        mockMvc.perform(get("/api/v1/restaurants/{restaurantId}/foods", 1L)
                        .param("page", "1")
                        .param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.items").isEmpty());
    }

    @Test
    void getFoodById_validRequest_shouldReturnFood() throws Exception {
        when(foodService.getFoodById(1L)).thenReturn(food);

        mockMvc.perform(get("/api/v1/foods/{foodId}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get food successfully"))
                .andExpect(jsonPath("$.data.name").value("Pizza"))
                .andExpect(jsonPath("$.data.id").value(1L));
        verify(foodService).getFoodById(1L);
    }

    @Test
    void getPopularFood_validRequest_shouldReturnList() throws Exception {
        List<Food> foods = Arrays.asList(food);
        when(foodService.getPopularFoods()).thenReturn(foods);

        mockMvc.perform(get("/api/v1/foods/popular"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get popular foods successfully"))
                .andExpect(jsonPath("$.data[0].name").value("Pizza"))
                .andExpect(jsonPath("$.data[0].id").value(1L));
        verify(foodService).getPopularFoods();
    }

    @Test
    void getPopularFood_noFood_shouldReturnEmptyList() throws Exception {
        when(foodService.getPopularFoods()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/foods/popular"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isEmpty());
        verify(foodService).getPopularFoods();
    }

    @Test
    void getLatestFood_validRequest_shouldReturnList() throws Exception {
        List<Food> foods = Arrays.asList(food);
        when(foodService.getLatestFoods()).thenReturn(foods);

        mockMvc.perform(get("/api/v1/foods/latest"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get latest foods successfully"))
                .andExpect(jsonPath("$.data[0].name").value("Pizza"))
                .andExpect(jsonPath("$.data[0].id").value(1L));
        verify(foodService).getLatestFoods();
    }

    @Test
    void getLatestFood_noFood_shouldReturnEmptyList() throws Exception {
        when(foodService.getLatestFoods()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/foods/latest"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isEmpty());
        verify(foodService).getLatestFoods();
    }
}