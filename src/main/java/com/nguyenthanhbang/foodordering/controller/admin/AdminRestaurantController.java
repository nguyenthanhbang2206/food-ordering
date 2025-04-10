package com.nguyenthanhbang.foodordering.controller.admin;

import com.nguyenthanhbang.foodordering.dto.request.RestaurantRequest;
import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.service.RestaurantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminRestaurantController {
    private final RestaurantService restaurantService;
    @PostMapping("/restaurants")
    public ResponseEntity<ApiResponse<Restaurant>> createRestaurant(@Valid @RequestBody RestaurantRequest request) {
        Restaurant createdRestaurant = restaurantService.createRestaurant(request);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.CREATED.value())
                .message("Restaurant created")
                .data(createdRestaurant)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
    @PutMapping("/restaurants")
    public ResponseEntity<ApiResponse<Restaurant>> updateRestaurant(@Valid @RequestBody RestaurantRequest request)  {
        Restaurant updateRestaurant = restaurantService.updateRestaurant(request);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Restaurant updated")
                .data(updateRestaurant)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @DeleteMapping("/restaurants/{restaurantId}")
    public ResponseEntity<ApiResponse<Void>> deleteRestaurant(@PathVariable Long restaurantId) {
        restaurantService.deleteRestaurant(restaurantId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Restaurant deleted")
                .data(null)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @GetMapping("/my-restaurant")
    public ResponseEntity<ApiResponse<Restaurant>> getMyRestaurant() {
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get restaurant success")
                .data(restaurant)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @PutMapping("/restaurants/status")
    public ResponseEntity<ApiResponse<Restaurant>> updateRestaurantStatus()  {
        Restaurant restaurant = restaurantService.updateStatusOfRestaurant();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Update restaurant success")
                .data(restaurant)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

}
