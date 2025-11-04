package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.model.*;
import com.nguyenthanhbang.foodordering.repository.FoodRepository;
import com.nguyenthanhbang.foodordering.repository.OrderRepository;
import com.nguyenthanhbang.foodordering.service.FoodRecommendationService;
import com.nguyenthanhbang.foodordering.service.FoodService;
import com.nguyenthanhbang.foodordering.service.OrderService;
import com.nguyenthanhbang.foodordering.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodRecommendationServiceImpl implements FoodRecommendationService {
    private final UserService userService;
    private final OrderRepository orderRepository;
    private final FoodRepository foodRepository;
    private final FoodService foodService;

//    Dựa trên lịch sử mua hàng
    @Override
    public List<Food> forYou() {
        User user = userService.getUserLogin();
        List<Order> orders = orderRepository.findByCustomerId(user.getId());

        int totalFoods = 0;
        int totalVegetarian = 0;
        int totalSpicy = 0;
        List<Long> existingFoodIds = new ArrayList<>();
        Set<String> cuisines = new HashSet<>();
        for (Order order : orders) {
            for(OrderItem orderItem : order.getOrderItems()) {
                Food food = orderItem.getFood();
                if(food != null) {
                    existingFoodIds.add(food.getId());
                    cuisines.add(food.getCuisine());
                    if(food.isVegetarian()) {
                        totalVegetarian++;
                    }
                    if(food.isSpicy()) {
                        totalSpicy++;
                    }
                    totalFoods++;
                }
            }
        }
        boolean isVegetarian;
        boolean isSpicy;

        if (totalFoods > 0) {
            isVegetarian = ((totalVegetarian*1.0) / (totalFoods)) > 0.5;
            isSpicy = ((totalSpicy*1.0) / totalFoods ) > 0.5;
        }else {
            isVegetarian = false;
            isSpicy = false;
        }

        List<Food> availableFoods = foodRepository.findAll();
        availableFoods = availableFoods.stream()
                .filter(food -> !existingFoodIds.contains(food.getId()))
                .filter(food -> {
                    String cuisine = food.getCuisine();
                    return isVegetarian == food.isVegetarian()
                            && isSpicy == food.isSpicy()
                            && cuisines.contains(cuisine);
                })
                .sorted(Comparator.comparing(Food::getPrice))
                .limit(5)
                .toList();
        if(availableFoods.isEmpty()){
            return foodRepository.findTop5ByOrderBySoldDesc();
        }
        return availableFoods;
    }


    @Override
    public List<Food> similarFood(Long foodId) {
        Food foodDetail = foodService.getFoodById(foodId);
        List<Food> availableFoods = foodRepository.findAll();
        return availableFoods.stream()
                .filter(food -> !foodDetail.getId().equals(food.getId()))
                .filter(food -> countSimilar(food,foodDetail) >= 3).sorted((food1, food2) -> {
                    return Integer.compare(countSimilar(food2,foodDetail), countSimilar(food1,foodDetail));
                }).limit(5).toList();
    }
    private int countSimilar(Food food1, Food food2){
        int score = 0;
        if(food1.isSpicy() == food2.isSpicy()) {
            score++;
        }
        if(food1.isVegetarian() == food2.isVegetarian()) {
            score++;
        }
        if(food1.getCuisine().equals(food2.getCuisine())) {
            score+=2;
        }
        Set<String> ingredientNames = food1.getIngredients().stream().map(ingredient -> ingredient.getName()).collect(Collectors.toSet());
        for(Ingredient ingredient : food2.getIngredients()) {
            if(ingredientNames.contains(ingredient.getName())) {
                score++;
            }
        }
        return score;
    }
}
