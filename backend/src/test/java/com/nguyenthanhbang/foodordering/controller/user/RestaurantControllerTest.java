package com.nguyenthanhbang.foodordering.controller.user;

import com.nguyenthanhbang.foodordering.config.JwtFilter;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.model.Category;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.service.CategoryService;
import com.nguyenthanhbang.foodordering.service.RestaurantService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RestaurantController.class)
@AutoConfigureMockMvc(addFilters = false)
public class RestaurantControllerTest {
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

    @MockBean
    private CategoryService categoryService;

    private Restaurant restaurant;
    private Category category;

    @BeforeEach
    void setUp() {
        restaurant = new Restaurant();
        restaurant.setId(1L);
        restaurant.setName("Pizza Place");

        category = new Category();
        category.setId(1L);
        category.setName("Pizza");
    }

    @Test
    void getRestaurantById_validRequest_shouldReturnRestaurant() throws Exception {
        when(restaurantService.getRestaurantById(1L)).thenReturn(restaurant);

        mockMvc.perform(get("/api/v1/restaurants/{restaurantId}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get restaurant successfully"))
                .andExpect(jsonPath("$.data.name").value("Pizza Place"))
                .andExpect(jsonPath("$.data.id").value(1L));
        verify(restaurantService).getRestaurantById(1L);
    }

    @Test
    void getAllRestaurants_validRequest_shouldReturnPaginationResponse() throws Exception {
        PaginationResponse.Pagination pagination = PaginationResponse.Pagination.builder()
                .totalItems(1)
                .size(5)
                .totalPages(1)
                .page(1)
                .build();
        PaginationResponse response = PaginationResponse.builder()
                .pagination(pagination)
                .items(Arrays.asList(restaurant))
                .build();

        Pageable pageable = PageRequest.of(0, 5);
        when(restaurantService.getAllRestaurants(any(Pageable.class))).thenReturn(response);

        mockMvc.perform(get("/api/v1/restaurants")
                        .param("page", "1")
                        .param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get restaurants successfully"))
                .andExpect(jsonPath("$.data.pagination.page").value(1))
                .andExpect(jsonPath("$.data.items[0].id").value(1L));
        verify(restaurantService).getAllRestaurants(any(Pageable.class));
    }

    @Test
    void addFavouriteRestaurant_validRequest_shouldReturnRestaurant() throws Exception {
        when(restaurantService.addRestaurantToFavourites(1L)).thenReturn(restaurant);

        mockMvc.perform(put("/api/v1/restaurants/{restaurantId}/favourites", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Add to favourites successfully"))
                .andExpect(jsonPath("$.data.name").value("Pizza Place"))
                .andExpect(jsonPath("$.data.id").value(1L));
        verify(restaurantService).addRestaurantToFavourites(1L);
    }

    @Test
    void getFavouriteRestaurants_validRequest_shouldReturnList() throws Exception {
        List<Restaurant> restaurants = Arrays.asList(restaurant);
        when(restaurantService.getFavouriteRestaurants()).thenReturn(restaurants);

        mockMvc.perform(get("/api/v1/restaurants/favourites"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get favourite restaurants"))
                .andExpect(jsonPath("$.data[0].name").value("Pizza Place"))
                .andExpect(jsonPath("$.data[0].id").value(1L));
        verify(restaurantService).getFavouriteRestaurants();
    }

    @Test
    void searchRestaurants_validRequest_shouldReturnList() throws Exception {
        List<Restaurant> restaurants = Arrays.asList(restaurant);
        when(restaurantService.searchRestaurants("Pizza")).thenReturn(restaurants);

        mockMvc.perform(get("/api/v1/restaurants/search")
                        .param("keyword", "Pizza"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Search restaurants successfully"))
                .andExpect(jsonPath("$.data[0].name").value("Pizza Place"))
                .andExpect(jsonPath("$.data[0].id").value(1L));
        verify(restaurantService).searchRestaurants("Pizza");
    }

    @Test
    void getCategoryByRestaurantId_validRequest_shouldReturnCategories() throws Exception {
        List<Category> categories = Arrays.asList(category);
        when(categoryService.getCategoriesByRestaurantId(1L)).thenReturn(categories);

        mockMvc.perform(get("/api/v1/restaurants/{restaurantId}/categories", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get categories by restaurantId successfully"))
                .andExpect(jsonPath("$.data[0].name").value("Pizza"))
                .andExpect(jsonPath("$.data[0].id").value(1L));
        verify(categoryService).getCategoriesByRestaurantId(1L);
    }
}