package com.nguyenthanhbang.foodordering.controller.admin;

import com.nguyenthanhbang.foodordering.dto.request.FoodRequest;
import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.model.Food;
import com.nguyenthanhbang.foodordering.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminFoodController {
    private final FoodService foodService;
    @PostMapping("/restaurants/foods")
    public ResponseEntity<ApiResponse<Food>> createFood(@RequestBody FoodRequest request) throws Exception {
        Food food = foodService.createFood(request);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.CREATED.value())
                .message("Create food successfully")
                .data(food)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
    @PutMapping("/restaurants/foods/{foodId}")
    public ResponseEntity<ApiResponse<Food>> updateFood(@PathVariable Long foodId, @RequestBody FoodRequest request) throws Exception {
        Food food = foodService.updateFood(foodId, request);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Update food successfully")
                .data(food)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @DeleteMapping("/restaurants/foods/{foodId}")
    public ResponseEntity<ApiResponse<Void>> deleteFood(@PathVariable Long foodId) throws Exception {
        foodService.deleteFood(foodId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.NO_CONTENT.value())
                .message("Delete food successfully")
                .data(null)
                .build();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(apiResponse);
    }
    @GetMapping("/restaurants/foods")
    public ResponseEntity<ApiResponse<List<Food>>> getFoodByRestaurant() throws Exception {
        List<Food> foods = foodService.getFoodsByRestaurant();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get food by restaurant successfully")
                .data(foods)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @PutMapping("/restaurants/foods/{foodId}")
    public ResponseEntity<ApiResponse<Food>> updateAvailability(@PathVariable Long foodId) throws Exception {
        Food food = foodService.updateAvailability(foodId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Update successfully")
                .data(food)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

}
