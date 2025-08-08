package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.dto.request.FoodCriteria;
import com.nguyenthanhbang.foodordering.dto.request.FoodRequest;
import com.nguyenthanhbang.foodordering.dto.response.FoodStatistic;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
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
import jakarta.persistence.criteria.Join;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
        food.setSpicy(request.isSpicy());
        food.setVegetarian(request.isVegetarian());
        food.setCuisine(request.getCuisine());
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
        food.setSpicy(request.isSpicy());
        food.setVegetarian(request.isVegetarian());
        food.setCuisine(request.getCuisine());
        food = foodRepository.save(food);
        return food;
    }

    @Override
    public PaginationResponse getFoodsByRestaurant(Pageable pageable) {
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        Page<Food> foodPage = foodRepository.findByRestaurantId(restaurant.getId(), pageable);
        PaginationResponse.Pagination pagination = PaginationResponse.Pagination.builder()
                .page(pageable.getPageNumber() + 1)
                .size(pageable.getPageSize())
                .totalPages(foodPage.getTotalPages())
                .totalItems(foodPage.getTotalElements())
                .build();
        PaginationResponse paginationResponse = PaginationResponse.builder()
                .pagination(pagination)
                .items(foodPage.getContent())
                .build();
        return paginationResponse;
    }
    private Specification<Food> bySpicy(Boolean spicy) {
        return (root, query, builder) -> {
            return builder.equal(root.get("spicy"), spicy);
        };
    }
    private Specification<Food> byVegetarian(Boolean vegetarian) {
        return (root, query, builder) -> {
            return builder.equal(root.get("vegetarian"), vegetarian);
        };
    }
    private Specification<Food> byAvailable(Boolean available) {
        return (root, query, builder) -> {
            return builder.equal(root.get("available"), available);
        };
    }
    private Specification<Food> hasCuisine(String cuisine) {
        return (root, query, builder) -> {
            return builder.equal(root.get("cuisine"), cuisine);
        };
    }
    private Specification<Food> hasCategory(String category) {
        return (root, query, builder) -> {
            Join<Food, Category> foodCategoryJoin = root.join("foodCategory");
            return builder.equal(foodCategoryJoin.get("name"), category);
        };
    }
    private Specification<Food> priceRange(Long minPrice, Long maxPrice) {
        return (root, query, builder) -> {
            return builder.between(root.get("price"), minPrice, maxPrice);
        };
    }
    private Specification<Food> minPrice(Long minPrice) {
        return (root, query, builder) -> {
            return builder.ge(root.get("price"), minPrice);
        };
    }
    private Specification<Food> maxPrice(Long maxPrice) {
        return (root, query, builder) -> {
            return builder.le(root.get("price"), maxPrice);
        };
    }
    private Specification<Food> matchPrice(List<String> prices) {
        Specification<Food> combinedSpec = Specification.where(null);
        if(prices != null){
            for(String price : prices) {
                if(price.equals("from-100-to-200")){
                    Specification<Food> spec = priceRange(100L, 200L);
                    combinedSpec = combinedSpec.or(spec);
                }else if(price.equals("from-300-to-400")){
                    Specification<Food> spec = priceRange(300L, 400L);
                    combinedSpec = combinedSpec.or(spec);
                }else if(price.equals("gt-400")){
                    Specification<Food> spec = minPrice(400L);
                    combinedSpec = combinedSpec.or(spec);
                }else if(price.equals("lt-100")){
                    Specification<Food> spec = maxPrice(100L);
                    combinedSpec = combinedSpec.or(spec);
                }
            }
        }
        return combinedSpec;
    }
    private Specification<Food> byRestaurant(Long restaurantId) {
        return (root, query, builder) -> {
            return builder.equal(root.get("restaurant").get("id"), restaurantId);
        };
    }



    private Specification<Food> makeSpecs(Long restaurantId,FoodCriteria foodCriteria) {
        Specification combinedSpec = Specification.where(null);
        if(foodCriteria.getSpicy() != null) {
            combinedSpec = combinedSpec.and(bySpicy(foodCriteria.getSpicy()));
        }
        if(foodCriteria.getVegetarian() != null) {
            combinedSpec = combinedSpec.and(byVegetarian(foodCriteria.getVegetarian()));
        }
        if(foodCriteria.getAvailable() != null) {
            combinedSpec = combinedSpec.and(byAvailable(foodCriteria.getAvailable()));
        }
        if(foodCriteria.getCuisine() != null) {
            combinedSpec = combinedSpec.and(hasCuisine(foodCriteria.getCuisine()));
        }
        if(foodCriteria.getCategory() != null) {
            combinedSpec = combinedSpec.and(hasCategory(foodCriteria.getCategory()));
        }
        if(foodCriteria.getPrices() != null) {
            combinedSpec = combinedSpec.and(matchPrice(foodCriteria.getPrices()));
        }
        if(restaurantId != null){
            combinedSpec = combinedSpec.and(byRestaurant(restaurantId));
        }
        return combinedSpec;
    }
    @Override
    public PaginationResponse getAllFoods(Long restaurantId, Pageable pageable, FoodCriteria foodCriteria) {
        Page<Food> foodPage = foodRepository.findAll(makeSpecs(restaurantId,foodCriteria), pageable);
        PaginationResponse.Pagination pagination = PaginationResponse.Pagination.builder()
                .page(pageable.getPageNumber() + 1)
                .size(pageable.getPageSize())
                .totalPages(foodPage.getTotalPages())
                .totalItems(foodPage.getTotalElements())
                .build();
        PaginationResponse response = PaginationResponse.builder()
                .pagination(pagination)
                .items(foodPage.getContent())
                .build();
        return response;
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
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        Food food = this.getFoodByIdAndRestaurantId(foodId, restaurant.getId());
        food.setActive(false);
        foodRepository.save(food);
    }

    @Override
    public Food updateAvailability(Long foodId) {
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        Food food = this.getFoodByIdAndRestaurantId(foodId, restaurant.getId());
        food.setAvailable(!food.isAvailable());
        return foodRepository.save(food);
    }

    @Override
    public List<Food> getLatestFoods() {
        return foodRepository.findTop5ByOrderByCreatedDateDesc();
    }

    @Override
    public List<Food> getPopularFoods() {
        return foodRepository.findTop5ByOrderBySoldDesc();
    }

    @Override
    public List<FoodStatistic> getFoodStatistic(Long restaurantId) {
        List<Food> foods = foodRepository.findTop5ByRestaurantId(restaurantId);
        List<FoodStatistic> foodStatistics = foods.stream().map(food -> toFoodStatistic(food)).collect(Collectors.toList());
        return foodStatistics;
    }

    private FoodStatistic toFoodStatistic(Food food) {
        FoodStatistic foodStatistic = new FoodStatistic();
        foodStatistic.setName(food.getName());
        foodStatistic.setSold(food.getSold());
        return foodStatistic;
    }
}
