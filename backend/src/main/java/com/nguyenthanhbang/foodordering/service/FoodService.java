package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.FoodCriteria;
import com.nguyenthanhbang.foodordering.dto.request.FoodRequest;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.model.Food;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FoodService {
    Food createFood(FoodRequest request);
    Food updateFood(Long foodId, FoodRequest request);
    PaginationResponse getFoodsByRestaurant(Pageable pageable);
    PaginationResponse getAllFoods(Long restaurantId,Pageable pageable, FoodCriteria foodCriteria);
    Food getFoodById(Long foodId);
    Food getFoodByIdAndRestaurantId(Long foodId, Long restaurantId);
    void deleteFood(Long foodId);
    Food updateAvailability(Long foodId);
    List<Food> getLatestFoods();
    List<Food> getPopularFoods();
}
