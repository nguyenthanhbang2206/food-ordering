package com.nguyenthanhbang.foodordering.controller.user;

import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.model.Category;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.service.CategoryService;
import com.nguyenthanhbang.foodordering.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class RestaurantController {
    private final RestaurantService restaurantService;
    private final CategoryService categoryService;
    @GetMapping("/restaurants/{restaurantId}")
    public ResponseEntity<ApiResponse<Restaurant>> getRestaurantById(@PathVariable Long restaurantId) {
        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get restaurant successfully")
                .data(restaurant)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/restaurants")
    public ResponseEntity<ApiResponse<PaginationResponse>> getAllRestaurants(Pageable pageable) {
        PaginationResponse response = restaurantService.getAllRestaurants(pageable);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get restaurants successfully")
                .data(response)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @PutMapping("/restaurants/{restaurantId}/favourites")
    public ResponseEntity<ApiResponse<Restaurant>> addFavouriteRestaurant(@PathVariable Long restaurantId) {
        Restaurant restaurant = restaurantService.addRestaurantToFavourites(restaurantId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Add to favourites successfully")
                .data(restaurant)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/restaurants/favourites")
    public ResponseEntity<ApiResponse<List<Restaurant>>> getFavouriteRestaurants() {
        List<Restaurant> restaurants = restaurantService.getFavouriteRestaurants();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get favourite restaurants")
                .data(restaurants)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/restaurants/search")
    public ResponseEntity<ApiResponse<List<Restaurant>>> searchRestaurants(@RequestParam String keyword) {
        List<Restaurant> restaurants = restaurantService.searchRestaurants(keyword);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Search restaurants successfully")
                .data(restaurants)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/restaurants/{restaurantId}/categories")
    public ResponseEntity<ApiResponse<List<Category>>> getCategoryByRestaurantId(@PathVariable Long restaurantId) {
        List<Category> categories = categoryService.getCategoriesByRestaurantId(restaurantId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get categories by restaurantId successfully")
                .data(categories)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
}
