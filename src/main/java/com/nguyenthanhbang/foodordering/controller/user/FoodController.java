package com.nguyenthanhbang.foodordering.controller.user;

import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.model.Food;
import com.nguyenthanhbang.foodordering.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class FoodController {
    private final FoodService foodService;
    @GetMapping("/foods")
    public ResponseEntity<ApiResponse<List<Food>>> getAllFoods() throws Exception {
        List<Food> foods = foodService.getAllFoods();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get all foods successfully")
                .data(foods)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @GetMapping("/foods/{foodId}")
    public ResponseEntity<ApiResponse<Food>> getFoodById(@PathVariable Long foodId) throws Exception {
        Food food = foodService.getFoodById(foodId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get food successfully")
                .data(food)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
