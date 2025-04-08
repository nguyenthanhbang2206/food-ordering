package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.CreateOrderRequest;
import com.nguyenthanhbang.foodordering.dto.request.UpdateOrderRequest;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.model.Food;
import com.nguyenthanhbang.foodordering.model.Order;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {
    Order createOrder(CreateOrderRequest request);
    Order updateOrder(Long orderId, UpdateOrderRequest request);
    void deleteOrder(Long orderId);
    PaginationResponse getAllOrdersByUserLogin(Pageable pageable);
    PaginationResponse getAllOrdersByRestaurant(Pageable pageable);
    Order getOrderById(Long orderId);
    Order getOrderByIdAndRestaurantId(Long orderId);
    Order getOrderByIdAndUserId(Long orderId);
    boolean fromOneRestaurant(List<Food> foods, Long restaurantId);
}
