package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByRestaurantId(Long restaurantId);
    Optional<Food> findByIdAndRestaurantId(Long id, Long restaurantId);
}
