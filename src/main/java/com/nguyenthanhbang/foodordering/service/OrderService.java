package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.CreateOrderRequest;
import com.nguyenthanhbang.foodordering.dto.request.UpdateOrderRequest;
import com.nguyenthanhbang.foodordering.model.Food;
import com.nguyenthanhbang.foodordering.model.Order;

import java.util.List;

public interface OrderService {
    Order createOrder(CreateOrderRequest request);
    Order updateOrder(Long orderId, UpdateOrderRequest request);
    void deleteOrder(Long orderId);
    List<Order> getAllOrdersByUserLogin();
    List<Order> getAllOrdersByRestaurant();
    Order getOrderById(Long orderId);
    Order getOrderByIdAndRestaurantId(Long orderId);
    Order getOrderByIdAndUserId(Long orderId);
    boolean fromOneRestaurant(List<Food> foods, Long restaurantId);
}
