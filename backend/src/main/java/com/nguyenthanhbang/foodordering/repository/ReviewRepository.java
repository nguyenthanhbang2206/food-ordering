package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByUserIdAndRestaurantId(Long userId, Long restaurantId);
    int countByRestaurantId(Long restaurantId);
}
