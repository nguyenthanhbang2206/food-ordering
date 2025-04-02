package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.RestaurantRequest;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.model.User;

import java.util.List;

public interface RestaurantService {
    Restaurant createRestaurant(RestaurantRequest request);
    Restaurant updateRestaurant(RestaurantRequest request);
    void deleteRestaurant(Long restaurantId);
    List<Restaurant> getAllRestaurants();
    Restaurant getRestaurantById(Long restaurantId);
    Restaurant getRestaurantOfUser();
    Restaurant updateStatusOfRestaurant();
    Restaurant addRestaurantToFavourites(Long restaurantId);
    List<Restaurant> getFavouriteRestaurants();
}
