package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.IngredientRequest;
import com.nguyenthanhbang.foodordering.model.Ingredient;

import java.util.List;

public interface IngredientService {
    List<Ingredient> getIngredientsByRestaurant();
    Ingredient getIngredientByIdAndRestaurantId(Long ingredientId);
    Ingredient createIngredient(IngredientRequest request);
    Ingredient updateIngredient(Long ingredientId, IngredientRequest request);
    void deleteIngredientById(Long ingredientId);
}
