package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    Optional<Restaurant> findByOwner(User owner);
}
