package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.RestaurantRequest;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.model.User;

import java.util.List;

public interface RestaurantService {
    Restaurant createRestaurant(RestaurantRequest request) throws Exception;
    Restaurant updateRestaurant(Long restaurantId, RestaurantRequest request) throws Exception;
    void deleteRestaurant(Long restaurantId);
    List<Restaurant> getAllRestaurants();
    Restaurant getRestaurantById(Long restaurantId) throws Exception;
    Restaurant getRestaurantOfUser() throws Exception;
    Restaurant updateStatusOfRestaurant() throws Exception;
    Restaurant addRestaurantToFavourites(Long restaurantId) throws Exception;
    List<Restaurant> getFavouriteRestaurants() throws Exception;
}
