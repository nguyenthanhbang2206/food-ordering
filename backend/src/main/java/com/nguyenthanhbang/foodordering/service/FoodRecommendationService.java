package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.model.Food;

import java.util.List;

public interface FoodRecommendationService {
    List<Food> forYou();
    List<Food> similarFood(Long foodId);
}
