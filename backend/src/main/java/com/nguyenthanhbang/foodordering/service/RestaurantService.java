package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.RestaurantRequest;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.dto.response.Statistics;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RestaurantService {
    Restaurant createRestaurant(RestaurantRequest request);
    Restaurant updateRestaurant(RestaurantRequest request);
    void deleteRestaurant(Long restaurantId);
    PaginationResponse getAllRestaurants(Pageable pageable);
    Restaurant getRestaurantById(Long restaurantId);
    Restaurant getRestaurantOfUser();
    Restaurant updateStatusOfRestaurant();
    Restaurant addRestaurantToFavourites(Long restaurantId);
    List<Restaurant> getFavouriteRestaurants();
    List<Restaurant> searchRestaurants(String keyword);
    Statistics getRestaurantStatistics();
}
