package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByNameAndRestaurantId(String name, Long restaurantId);
    Optional<Category> findByIdAndRestaurantId(Long categoryId, Long restaurantId);
    List<Category> findByRestaurantId(Long restaurantId);
}
