package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.CreateOrderRequest;
import com.nguyenthanhbang.foodordering.dto.request.UpdateOrderRequest;
import com.nguyenthanhbang.foodordering.dto.response.OrderStatistic;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.dto.response.RevenueByMonth;
import com.nguyenthanhbang.foodordering.model.Food;
import com.nguyenthanhbang.foodordering.model.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

public interface OrderService {
    Order createOrder(CreateOrderRequest request);
    Order updateOrder(Long orderId, UpdateOrderRequest request);
    PaginationResponse getAllOrdersByUserLogin(Pageable pageable);
    PaginationResponse getAllOrdersByRestaurant(Pageable pageable);
    Order getOrderByIdAndRestaurantId(Long orderId);
    Order getOrderByIdAndUserId(Long orderId);
    boolean fromOneRestaurant(List<Food> foods, Long restaurantId);
    Long countOrdersToday(Long restaurantId);
    Long revenueToday(Long restaurantId);
    List<OrderStatistic> countOrderByStatus(Long restaurantId);
    List<RevenueByMonth> getRevenueByMonth(@Param("restaurantId") Long restaurantId);
    List<Order> getRecentOrders();
}
