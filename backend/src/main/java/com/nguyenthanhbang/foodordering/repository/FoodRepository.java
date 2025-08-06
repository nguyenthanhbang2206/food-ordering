package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, Long> , JpaSpecificationExecutor<Food> {
    Page<Food> findByRestaurantId(Long restaurantId, Pageable pageable);
    Optional<Food> findByIdAndRestaurantId(Long id, Long restaurantId);
    Page<Food> findAll(Specification<Food> specification,Pageable pageable);
    List<Food> findByIngredientsId(Long ingredientsId);
    long countByRestaurantId(Long restaurantId);
    List<Food> findTop5ByOrderByCreatedDateDesc();
    List<Food> findTop5ByOrderBySoldDesc();
}
