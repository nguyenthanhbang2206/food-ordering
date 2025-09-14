package com.nguyenthanhbang.foodordering.controller.admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nguyenthanhbang.foodordering.config.JwtFilter;
import com.nguyenthanhbang.foodordering.dto.request.FoodRequest;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.model.Category;
import com.nguyenthanhbang.foodordering.model.Food;
import com.nguyenthanhbang.foodordering.model.Ingredient;
import com.nguyenthanhbang.foodordering.service.FoodService;
import com.nguyenthanhbang.foodordering.util.SecurityUtil;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdminFoodController.class)
@AutoConfigureMockMvc(addFilters = false)
public class AdminFoodControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private SecurityUtil securityUtil;
    @MockBean
    private UserDetailsService userDetailsService;
    @MockBean
    private JwtFilter jwtFilter;

    @MockBean
    private FoodService foodService;

    private static final String PATH = "/api/v1/admin";

    private Food food;
    private FoodRequest request;

    @BeforeEach
    public void setUp()  {
        food = Food.builder()
                .name("food")
                .sold(10)
                .available(true)
                .price(1)
                .build();
        food.setId(1L);

        Ingredient ingredient = new Ingredient();
        ingredient.setName("ingredient");
        ingredient.setId(1L);

        Category category = new Category();
        category.setName("category");
        category.setId(1L);

        request = new FoodRequest();
        request.setName("food");
        request.setPrice(1);
        request.setCuisine("cuisine");
        request.setDescription("description");
        request.setSpicy(true);
        request.setIngredients(Arrays.asList(1L));
        request.setFoodCategoryId(1L);
        request.setImages(Arrays.asList("image1", "image2", "image3"));

    }


    @Test
    void createFood_validRequest_shouldCreateFood() throws Exception {
        when(foodService.createFood(any(FoodRequest.class))).thenReturn(food);

        mockMvc.perform(post(PATH + "/restaurants/foods")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value(201))
                .andExpect(jsonPath("$.data.name").value("food"))
                .andExpect(jsonPath("$.message").value("Create food successfully"))
                .andExpect(jsonPath("$.data.id").value(1L));
        verify(foodService).createFood(any(FoodRequest.class));
    }

    @Test
    void createFood_invalidRequest_shouldReturnBadRequest() throws Exception {
        request.setName("");


        mockMvc.perform(post(PATH + "/restaurants/foods")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400));
        verify(foodService, never()).createFood(any(FoodRequest.class));
    }

    @Test
    void createFood_serviceThrowException_shouldThrowException() throws Exception {
        when(foodService.createFood(any(FoodRequest.class))).thenThrow(new EntityNotFoundException("Ingredient not found"));

        mockMvc.perform(post(PATH + "/restaurants/foods")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404));
        verify(foodService).createFood(any(FoodRequest.class));
    }

    @Test
    void createFood_invalidRequestBody_shouldReturnBadRequest() throws Exception {
        mockMvc.perform(post(PATH + "/restaurants/foods")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400));
        verify(foodService, never()).createFood(request);
    }
    @Test
    void updateFood_validRequest_shouldUpdateFood() throws Exception {
        Long foodId = 1L;
        food.setName("update");

        when(foodService.updateFood(eq(1L), any(FoodRequest.class))).thenReturn(food);

        mockMvc.perform(put(PATH + "/restaurants/foods/{foodId}", foodId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.data.name").value("update"))
                .andExpect(jsonPath("$.message").value("Update food successfully"))
                .andExpect(jsonPath("$.data.id").value(1L));

        verify(foodService).updateFood(eq(1L), any(FoodRequest.class));
    }

    @Test
    void updateFood_invalidRequest_shouldReturnBadRequest() throws Exception {
        request.setName("");
        Long foodId = 1L;
        mockMvc.perform(put(PATH + "/restaurants/foods/{foodId}", foodId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400));

        verify(foodService, never()).updateFood(eq(1L), any(FoodRequest.class));
    }

    @Test
    void updateFood_serviceThrowException_shouldThrowException() throws Exception {
        Long foodId = 999L;

        when(foodService.updateFood(eq(999L), any(FoodRequest.class))).thenThrow(new EntityNotFoundException("Food not found"));

        mockMvc.perform(put(PATH + "/restaurants/foods/{foodId}", foodId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404));
        verify(foodService).updateFood(eq(999L), any(FoodRequest.class));
    }

    @Test
    void updateFood_invalidPathVariable_shouldReturnBadRequest() throws Exception {
        mockMvc.perform(put(PATH + "/restaurants/foods/invalid")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
        verify(foodService, never()).updateFood(anyLong(), any(FoodRequest.class));
    }

    @Test
    void deleteFood_validRequest_shouldDeleteFood() throws Exception {
        Long foodId = 1L;

        mockMvc.perform(delete(PATH + "/restaurants/foods/{foodId}", foodId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Delete food successfully"));

        verify(foodService).deleteFood(eq(1L));
    }
    @Test
    void deleteFood_invalidPathVariable_shouldReturnBadRequest() throws Exception {

        mockMvc.perform(delete(PATH + "/restaurants/foods/invalid"))
                .andExpect(status().isBadRequest());
        verify(foodService, never()).deleteFood(anyLong());
    }

    @Test
    void deleteFood_serviceThrowException_shouldThrowException() throws Exception {
        Long foodId = 999L;
        doThrow(new EntityNotFoundException("Food not found")).when(foodService).deleteFood(eq(foodId));
        mockMvc.perform(delete(PATH + "/restaurants/foods/{foodId}", foodId))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404));

        verify(foodService).deleteFood(eq(foodId));
    }

    @Test
    void getFoodByRestaurant_validRequest_shouldReturnFoods() throws Exception {
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

        Pageable pageable = PageRequest.of(0,5);
        when(foodService.getFoodsByRestaurant(pageable)).thenReturn(response);

        mockMvc.perform(get(PATH + "/restaurants/foods")
                        .param("page", "1")
                        .param("size", "5")
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.data.pagination.page").value(1))
                .andExpect(jsonPath("$.data.pagination.size").value(5))
                .andExpect(jsonPath("$.data.pagination.totalItems").value(1))
                .andExpect(jsonPath("$.data.pagination.totalPages").value(1))
                .andExpect(jsonPath("$.data.items[0].id").value(1L))
                .andExpect(jsonPath("$.data.items[0].name").value("food"))
                .andExpect(jsonPath("$.message").value("Get food by restaurant successfully"));
        verify(foodService).getFoodsByRestaurant(pageable);
    }

    @Test
    void updateAvailability_validRequest_shouldUpdateAvailability() throws Exception {
        Long foodId = 1L;
        when(foodService.updateAvailability(foodId)).thenReturn(food);

        mockMvc.perform(put(PATH + "/restaurants/foods/{foodId}/availability", foodId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.data.available").value(true))
                .andExpect(jsonPath("$.message").value("Update successfully"))
                .andExpect(jsonPath("$.data.id").value(1L));
        verify(foodService).updateAvailability(foodId);
    }

    @Test
    void updateAvailability_ShouldValidatePathVariable() throws Exception {
        mockMvc.perform(put(PATH + "/restaurants/foods/invalid/availability"))
                .andExpect(status().isBadRequest());

        verify(foodService, never()).updateAvailability(anyLong());
    }



}
