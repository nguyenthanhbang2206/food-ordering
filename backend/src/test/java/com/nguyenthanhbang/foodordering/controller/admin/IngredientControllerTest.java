package com.nguyenthanhbang.foodordering.controller.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nguyenthanhbang.foodordering.config.JwtFilter;
import com.nguyenthanhbang.foodordering.dto.request.IngredientRequest;
import com.nguyenthanhbang.foodordering.model.Ingredient;
import com.nguyenthanhbang.foodordering.service.IngredientService;
import com.nguyenthanhbang.foodordering.util.SecurityUtil;
import jakarta.persistence.EntityNotFoundException;
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

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(IngredientController.class)
@AutoConfigureMockMvc(addFilters = false)
public class IngredientControllerTest {
    @MockBean
    private SecurityUtil securityUtil;
    @MockBean
    private UserDetailsService userDetailsService;
    @MockBean
    private JwtFilter jwtFilter;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IngredientService ingredientService;

    @Autowired
    private ObjectMapper objectMapper;

    private static final String PATH = "/api/v1/admin/restaurants/ingredients";

    private Ingredient ingredient;
    private IngredientRequest request;

    @BeforeEach
    void setUp() {
        ingredient = new Ingredient();
        ingredient.setId(1L);
        ingredient.setName("Salt");

        request = new IngredientRequest();
        request.setName("Salt");
    }

    @Test
    void createIngredient_validRequest_shouldCreateIngredient() throws Exception {
        when(ingredientService.createIngredient(any(IngredientRequest.class))).thenReturn(ingredient);

        mockMvc.perform(post(PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value(201))
                .andExpect(jsonPath("$.message").value("Create ingredient successful"))
                .andExpect(jsonPath("$.data.name").value("Salt"))
                .andExpect(jsonPath("$.data.id").value(1L));

        verify(ingredientService).createIngredient(any(IngredientRequest.class));
    }

    @Test
    void createIngredient_invalidRequest_shouldReturnBadRequest() throws Exception {
        request.setName("");

        mockMvc.perform(post(PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(ingredientService, never()).createIngredient(any(IngredientRequest.class));
    }

    @Test
    void createIngredient_serviceThrowsException_shouldReturnNotFound() throws Exception {
        when(ingredientService.createIngredient(any(IngredientRequest.class)))
                .thenThrow(new EntityNotFoundException("Restaurant not found"));

        mockMvc.perform(post(PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());

        verify(ingredientService).createIngredient(any(IngredientRequest.class));
    }

    @Test
    void updateIngredient_validRequest_shouldUpdateIngredient() throws Exception {
        ingredient.setName("Pepper");
        when(ingredientService.updateIngredient(eq(1L), any(IngredientRequest.class))).thenReturn(ingredient);

        mockMvc.perform(put(PATH + "/{ingredientId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Update ingredient successful"))
                .andExpect(jsonPath("$.data.name").value("Pepper"))
                .andExpect(jsonPath("$.data.id").value(1L));

        verify(ingredientService).updateIngredient(eq(1L), any(IngredientRequest.class));
    }

    @Test
    void updateIngredient_invalidRequest_shouldReturnBadRequest() throws Exception {
        request.setName("");

        mockMvc.perform(put(PATH + "/{ingredientId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());

        verify(ingredientService, never()).updateIngredient(eq(1L), any(IngredientRequest.class));
    }

    @Test
    void updateIngredient_serviceThrowsException_shouldReturnNotFound() throws Exception {
        when(ingredientService.updateIngredient(eq(1L), any(IngredientRequest.class)))
                .thenThrow(new EntityNotFoundException("Ingredient not found"));

        mockMvc.perform(put(PATH + "/{ingredientId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());

        verify(ingredientService).updateIngredient(eq(1L), any(IngredientRequest.class));
    }

    @Test
    void getIngredientsByRestaurant_validRequest_shouldReturnList() throws Exception {
        List<Ingredient> ingredients = Arrays.asList(ingredient);
        when(ingredientService.getIngredientsByRestaurant()).thenReturn(ingredients);

        mockMvc.perform(get(PATH))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get all ingredients successful"))
                .andExpect(jsonPath("$.data[0].name").value("Salt"))
                .andExpect(jsonPath("$.data[0].id").value(1L));
        verify(ingredientService).getIngredientsByRestaurant();
    }

    @Test
    void getIngredientsByRestaurant_noIngredient_shouldReturnEmptyList() throws Exception {
        when(ingredientService.getIngredientsByRestaurant()).thenReturn(Collections.emptyList());

        mockMvc.perform(get(PATH))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isEmpty());

        verify(ingredientService).getIngredientsByRestaurant();
    }

    @Test
    void deleteIngredient_validRequest_shouldDeleteIngredient() throws Exception {
        doNothing().when(ingredientService).deleteIngredientById(1L);

        mockMvc.perform(delete(PATH + "/{ingredientId}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Delete ingredient successful"))
                .andExpect(jsonPath("$.data").doesNotExist());

        verify(ingredientService).deleteIngredientById(1L);
    }

    @Test
    void deleteIngredient_invalidPathVariable_shouldReturnBadRequest() throws Exception {
        mockMvc.perform(delete(PATH + "/invalid"))
                .andExpect(status().isBadRequest());

        verify(ingredientService, never()).deleteIngredientById(anyLong());
    }

    @Test
    void deleteIngredient_serviceThrowsException_shouldReturnNotFound() throws Exception {
        doThrow(new EntityNotFoundException("Ingredient not found")).when(ingredientService).deleteIngredientById(999L);

        mockMvc.perform(delete(PATH + "/{ingredientId}", 999L))
                .andExpect(status().isNotFound());

        verify(ingredientService).deleteIngredientById(999L);
    }
}