package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByIdAndRestaurantId(Long orderId, Long restaurantId);
    Optional<Order> findByIdAndCustomerId(Long orderId, Long customerId);
    List<Order> findByCustomerId(Long customerId);
    List<Order> findByRestaurantId(Long restaurantId);
}
