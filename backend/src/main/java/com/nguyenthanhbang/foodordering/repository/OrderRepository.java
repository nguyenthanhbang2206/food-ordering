package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.dto.response.RevenueByMonth;
import com.nguyenthanhbang.foodordering.enums.OrderStatus;
import com.nguyenthanhbang.foodordering.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByIdAndRestaurantId(Long orderId, Long restaurantId);
    Optional<Order> findByIdAndCustomerId(Long orderId, Long customerId);
    Page<Order> findByCustomerId(Long customerId, Pageable pageable);
    Page<Order> findByRestaurantId(Long restaurantId, Pageable pageable);
    List<Order> findByRestaurantId(Long restaurantId);
    Long countByRestaurantId(Long restaurantId);
    @Query("SELECT COUNT(o) FROM Order o WHERE o.restaurant.id = :restaurantId AND o.createdDate >= :start AND o.createdDate < :end")
    Long countOrdersToday(@Param("start") Instant start,
                          @Param("end") Instant end,
                          @Param("restaurantId") Long restaurantId);
    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE o.restaurant.id = :restaurantId AND o.createdDate >= :start AND o.createdDate < :end AND o.status = 'DELIVERED'")
    Long revenueToday(@Param("start") Instant start,
                          @Param("end") Instant end,
                          @Param("restaurantId") Long restaurantId);
    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE o.restaurant.id = :restaurantId AND o.status = 'DELIVERED'")
    Long totalRevenueByRestaurantId(@Param("restaurantId") Long restaurantId);
    Long countByRestaurantIdAndStatus(Long restaurantId, OrderStatus status);

    @Query("SELECT NEW com.nguyenthanhbang.foodordering.dto.response.RevenueByMonth(MONTH(o.createdDate), SUM(o.totalPrice)) FROM Order o WHERE o.restaurant.id = :restaurantId AND o.status = 'DELIVERED' GROUP BY MONTH(o.createdDate) ORDER BY MONTH(o.createdDate)")
    List<RevenueByMonth> revenueByMonth(@Param("restaurantId") Long restaurantId);
    List<Order> findTop5ByRestaurantIdOrderByCreatedDateDesc(Long restaurantId);
}
