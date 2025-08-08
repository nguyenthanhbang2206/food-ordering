package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.FoodRepository;
import com.nguyenthanhbang.foodordering.repository.OrderRepository;
import com.nguyenthanhbang.foodordering.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final FoodRepository foodRepository;
    private final UserService userService;
    private final RestaurantService restaurantService;
    private final OrderRepository orderRepository;
    private final OrderService orderService;
    private final FoodService foodService;
    @Override
    public Map<String, Object> statistic() {
        User user = userService.getUserLogin();
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        Long restaurantId = restaurant.getId();
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("totalFoods", foodRepository.countByRestaurantId(restaurantId));
        result.put("totalOrders", orderRepository.countByRestaurantId(restaurantId));
        result.put("totalRevenue", orderRepository.totalRevenueByRestaurantId(restaurantId));
        result.put("totalReviews", restaurant.getReviewCount());
        result.put("averageRating", restaurant.getAverageRating());
        result.put("todayOrders", orderService.countOrdersToday(restaurantId));
        result.put("todayRevenue", orderService.revenueToday(restaurantId));
        result.put("orderStatus", orderService.countOrderByStatus(restaurantId));
        result.put("topFoods", foodService.getFoodStatistic(restaurantId));
        result.put("revenueByMonth", orderService.getRevenueByMonth(restaurantId));
        return result;
    }
}
