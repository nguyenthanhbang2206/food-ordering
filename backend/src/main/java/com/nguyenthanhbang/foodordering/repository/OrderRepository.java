package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByIdAndRestaurantId(Long orderId, Long restaurantId);
    Optional<Order> findByIdAndCustomerId(Long orderId, Long customerId);
    Page<Order> findByCustomerId(Long customerId, Pageable pageable);
    Page<Order> findByRestaurantId(Long restaurantId, Pageable pageable);
}
