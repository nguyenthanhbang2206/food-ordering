package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
