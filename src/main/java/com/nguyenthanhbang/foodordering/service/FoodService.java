package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.FoodRequest;
import com.nguyenthanhbang.foodordering.model.Food;

import java.util.List;

public interface FoodService {
    Food createFood(FoodRequest request);
    Food updateFood(Long foodId, FoodRequest request);
    List<Food> getFoodsByRestaurant();
    List<Food> getAllFoods();
    Food getFoodById(Long foodId);
    Food getFoodByIdAndRestaurantId(Long foodId, Long restaurantId);
    void deleteFood(Long foodId);
    Food updateAvailability(Long foodId);
}
