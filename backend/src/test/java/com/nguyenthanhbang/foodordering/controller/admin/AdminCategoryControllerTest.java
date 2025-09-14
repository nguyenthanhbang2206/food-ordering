package com.nguyenthanhbang.foodordering.controller.admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nguyenthanhbang.foodordering.config.JwtFilter;
import com.nguyenthanhbang.foodordering.config.SecurityConfiguration;
import com.nguyenthanhbang.foodordering.dto.request.CategoryRequest;
import com.nguyenthanhbang.foodordering.model.Category;
import com.nguyenthanhbang.foodordering.service.CategoryService;
import com.nguyenthanhbang.foodordering.util.SecurityUtil;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdminCategoryController.class)
@AutoConfigureMockMvc(addFilters = false)
public class AdminCategoryControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private CategoryService categoryService;

    @MockBean
    private SecurityUtil securityUtil;
    @MockBean
    private UserDetailsService userDetailsService;
    @MockBean
    private JwtFilter jwtFilter;

    private Category category;
    private CategoryRequest request;

    private static final String PATH = "/api/v1/admin";

    @BeforeEach
    public void setUp() {
        category = new Category();
        category.setId(1L);
        category.setName("category");
        category.setActive(true);

        request = new CategoryRequest();
        request.setName("category");
    }

    @Test
    void createCategory_success_shouldCreateCategory() throws Exception {

        when(categoryService.createCategory(any(CategoryRequest.class))).thenReturn(category);

        mockMvc.perform(post(PATH + "/restaurants/categories")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value(201))
                .andExpect(jsonPath("$.data.name").value("category"))
                .andExpect(jsonPath("$.message").value("Create category successful"))
                .andExpect(jsonPath("$.data.id").value(1L));

    }

    @Test
    void createCategory_invalidRequest_shouldReturnBadRequest() throws Exception {
        request.setName("");

        mockMvc.perform(post(PATH + "/restaurants/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400));
    }

    @Test
    void createCategory_serviceThrowException_shouldThrowException() throws Exception {
        when(categoryService.createCategory(any(CategoryRequest.class))).thenThrow(new EntityExistsException("Category already exists"));
        mockMvc.perform(post(PATH + "/restaurants/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400));
    }
    @Test
    void updateCategory_validRequest_shouldUpdateCategory() throws Exception {
        Long categoryId = 1L;
        category.setName("update");
        when(categoryService.updateCategory(eq(1L), any(CategoryRequest.class))).thenReturn(category);

        mockMvc.perform(put(PATH + "/restaurants/categories/{categoryId}", categoryId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.data.name").value("update"))
                .andExpect(jsonPath("$.message").value("Update category successful"))
                .andExpect(jsonPath("$.data.id").value(1L));

    }

    @Test
    void updateCategory_invalidRequest_shouldReturnBadRequest() throws Exception {
        Long categoryId = 1L;
        request.setName("");

        mockMvc.perform(put(PATH + "/restaurants/categories/{categoryId}", categoryId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400));

    }

    @Test
    void updateCategory_serviceThrowException_shouldThrowException() throws Exception {
        Long categoryId = 999L;

        when(categoryService.updateCategory(eq(categoryId), any(CategoryRequest.class))).thenThrow(new EntityNotFoundException("Category not found"));
        mockMvc.perform(put(PATH + "/restaurants/categories/{categoryId}", categoryId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404));
    }

    @Test
    void getCategoriesByRestaurant_validRequest_shouldReturnCategories() throws Exception {
        when(categoryService.getCategoriesByRestaurant()).thenReturn(Arrays.asList(category));

        mockMvc.perform(get(PATH + "/restaurants/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].name").value("category"))
                .andExpect(jsonPath("$.message").value("Get all categories successful"))
                .andExpect(jsonPath("$.data[0].id").value(1L));

    }

    @Test
    void getCategoriesByRestaurant_noCategory_shouldReturnEmptyList() throws Exception {
        when(categoryService.getCategoriesByRestaurant()).thenReturn(Arrays.asList());

        mockMvc.perform(get(PATH + "/restaurants/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.message").value("Get all categories successful"));
    }

    @Test
    void getCategoriesByRestaurant_serviceThrowException_shouldThrowException() throws Exception {
        when(categoryService.getCategoriesByRestaurant()).thenThrow(new EntityNotFoundException("Restaurant not found"));

        mockMvc.perform(get(PATH + "/restaurants/categories"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404));


    }

    @Test
    void deleteCategory_validRequest_shouldDeleteCategory() throws Exception {
        mockMvc.perform(delete(PATH + "/restaurants/categories/{categoryId}", category.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Delete category successful"));
    }

    @Test
    void deleteCategory_serviceThrowException_shouldThrowException() throws Exception {
        Long categoryId = 999L;
        doThrow(new EntityNotFoundException("Category not found")).when(categoryService).deleteCategory(eq(categoryId));
        mockMvc.perform(delete(PATH + "/restaurants/categories/{categoryId}", categoryId))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404));

    }





}
