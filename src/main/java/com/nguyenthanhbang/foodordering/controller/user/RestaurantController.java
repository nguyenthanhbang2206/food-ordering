package com.nguyenthanhbang.foodordering.controller.user;

import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class RestaurantController {
    private final RestaurantService restaurantService;
    @GetMapping("/restaurants/{restaurantId}")
    public ResponseEntity<ApiResponse<Restaurant>> getRestaurantById(@PathVariable Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get restaurant successfully")
                .data(restaurant)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/restaurants")
    public ResponseEntity<ApiResponse<List<Restaurant>>> getAllRestaurants() throws Exception {
        List<Restaurant> restaurants = restaurantService.getAllRestaurants();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get restaurants successfully")
                .data(restaurants)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @PostMapping("/restaurants/{restaurantId}/favourites")
    public ResponseEntity<ApiResponse<Restaurant>> addFavouriteRestaurant(@PathVariable Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantService.addRestaurantToFavourites(restaurantId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Add to favourites successfully")
                .data(restaurant)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/restaurants/favourites")
    public ResponseEntity<ApiResponse<List<Restaurant>>> getFavouriteRestaurants() throws Exception {
        List<Restaurant> restaurants = restaurantService.getFavouriteRestaurants();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get favourite restaurants")
                .data(restaurants)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
}
