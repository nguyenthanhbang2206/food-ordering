package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.dto.request.FoodRequest;
import com.nguyenthanhbang.foodordering.model.Category;
import com.nguyenthanhbang.foodordering.model.Food;
import com.nguyenthanhbang.foodordering.model.Ingredient;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.repository.FoodRepository;
import com.nguyenthanhbang.foodordering.repository.IngredientRepository;
import com.nguyenthanhbang.foodordering.service.CategoryService;
import com.nguyenthanhbang.foodordering.service.FoodService;
import com.nguyenthanhbang.foodordering.service.RestaurantService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodServiceImpl implements FoodService {
    private final FoodRepository foodRepository;
    private final RestaurantService restaurantService;
    private final CategoryService categoryService;
    private final IngredientRepository ingredientRepository;
    @Override
    public Food createFood(FoodRequest request) {
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        Category category = categoryService.getCategoryByIdAndRestaurantId(request.getFoodCategoryId());
        List<Ingredient> ingredients = ingredientRepository.findByIdInAndRestaurantId(request.getIngredients(), restaurant.getId());
        if(ingredients.isEmpty()){
            throw new EntityNotFoundException("Ingredient not found");
        }
        Food food = new Food();
        food.setImages(request.getImages());
        food.setName(request.getName());
        food.setAvailable(true);
        food.setDescription(request.getDescription());
        food.setPrice(request.getPrice());
        food.setFoodCategory(category);
        food.setRestaurant(restaurant);
        food.setIngredients(ingredients);
        food = foodRepository.save(food);
        restaurant.getFoods().add(food);
        return food;
    }


    @Override
    public Food updateFood(Long foodId, FoodRequest request)  {
        Restaurant restaurant =restaurantService.getRestaurantOfUser();
        Food food = this.getFoodByIdAndRestaurantId(foodId, restaurant.getId());
        Category category = categoryService.getCategoryByIdAndRestaurantId(request.getFoodCategoryId());
        List<Ingredient> ingredients = ingredientRepository.findByIdInAndRestaurantId(request.getIngredients(), restaurant.getId());
        if(ingredients.isEmpty()){
            throw new EntityNotFoundException("Ingredient not found");
        }
        food.setImages(request.getImages());
        food.setName(request.getName());
        food.setAvailable(true);
        food.setDescription(request.getDescription());
        food.setPrice(request.getPrice());
        food.setFoodCategory(category);
        food.setIngredients(ingredients);
        food = foodRepository.save(food);
        return food;
    }

    @Override
    public List<Food> getFoodsByRestaurant() {
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        List<Food> foods = foodRepository.findByRestaurantId(restaurant.getId());
        return foods;
    }

    @Override
    public List<Food> getAllFoods() {
        List<Food> foods = foodRepository.findAll();
        return foods;
    }

    @Override
    public Food getFoodById(Long foodId) {
        Food food = foodRepository.findById(foodId).orElseThrow(() -> new EntityNotFoundException("Food not found"));
        return food;
    }

    @Override
    public Food getFoodByIdAndRestaurantId(Long foodId, Long restaurantId) {
        Food food = foodRepository.findByIdAndRestaurantId(foodId, restaurantId).orElseThrow(() -> new EntityNotFoundException("Food not found"));
        return food;
    }

    @Override
    public void deleteFood(Long foodId) {
        foodRepository.deleteById(foodId);
    }

    @Override
    public Food updateAvailability(Long foodId) {
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        Food food = this.getFoodByIdAndRestaurantId(foodId, restaurant.getId());
        food.setAvailable(!food.isAvailable());
        return foodRepository.save(food);
    }
}
