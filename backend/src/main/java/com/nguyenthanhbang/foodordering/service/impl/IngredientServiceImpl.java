package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.dto.request.IngredientRequest;
import com.nguyenthanhbang.foodordering.model.Food;
import com.nguyenthanhbang.foodordering.model.Ingredient;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.repository.FoodRepository;
import com.nguyenthanhbang.foodordering.repository.IngredientRepository;
import com.nguyenthanhbang.foodordering.service.IngredientService;
import com.nguyenthanhbang.foodordering.service.RestaurantService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IngredientServiceImpl implements IngredientService {
    private final IngredientRepository ingredientRepository;
    private final RestaurantService restaurantService;
    private final FoodRepository foodRepository;

    @Override
    public List<Ingredient> getIngredientsByRestaurant() {
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        List<Ingredient> ingredients = ingredientRepository.findByRestaurantId(restaurant.getId());
        return ingredients;
    }

    @Override
    public Ingredient getIngredientByIdAndRestaurantId(Long ingredientId) {
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        Ingredient ingredient = ingredientRepository.findByIdAndRestaurantId(ingredientId, restaurant.getId()).orElseThrow(() -> new EntityNotFoundException("Ingredient not found"));
        return ingredient;
    }

    @Override
    public Ingredient createIngredient(IngredientRequest request) {
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        Optional<Ingredient> opt = ingredientRepository.findByNameAndRestaurantId(request.getName(), restaurant.getId());
        if (opt.isPresent()) {
            throw new EntityExistsException("Ingredient already exists");
        }
        Ingredient ingredient = new Ingredient();
        ingredient.setName(request.getName());
        ingredient.setRestaurant(restaurant);
        return ingredientRepository.save(ingredient);
    }

    @Override
    public Ingredient updateIngredient(Long ingredientId, IngredientRequest request) {
        Ingredient ingredient = this.getIngredientByIdAndRestaurantId(ingredientId);
        Ingredient isExistsName = ingredientRepository.findByName(request.getName());
        if(isExistsName != null){
            throw new EntityExistsException("Ingredient already exists");
        }
        ingredient.setName(request.getName());
        return ingredientRepository.save(ingredient);
    }

    @Override
    @Transactional
    public void deleteIngredientById(Long ingredientId) {
        Ingredient ingredient = this.getIngredientByIdAndRestaurantId(ingredientId);
        ingredient.setActive(false);
        ingredientRepository.save(ingredient);
    }

}
