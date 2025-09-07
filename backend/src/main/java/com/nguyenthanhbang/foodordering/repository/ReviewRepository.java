package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByUserIdAndRestaurantId(Long userId, Long restaurantId);
    int countByRestaurantId(Long restaurantId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.restaurant.id = :restaurantId")
    double getAverageRatingByRestaurantId(@Param("restaurantId") Long restaurantId);
}
