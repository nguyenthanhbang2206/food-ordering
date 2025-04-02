package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    Ingredient findByName(String name);
    List<Ingredient> findByRestaurantId(Long restaurantId);
    List<Ingredient> findByIdInAndRestaurantId(List<Long> ids, Long restaurantId);
    Optional<Ingredient> findByIdAndRestaurantId(Long ingredientId, Long restaurantId);
    Optional<Ingredient> findByNameAndRestaurantId(String ingredientName, Long restaurantId);

}
