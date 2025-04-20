package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    Optional<Restaurant> findByOwner(User owner);
    @Query("select r from Restaurant r where lower(r.name) like lower(concat('%', :keyword, '%'))")
    List<Restaurant> search(@Param("keyword") String keyword);
}
