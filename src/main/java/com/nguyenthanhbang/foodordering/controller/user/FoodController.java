package com.nguyenthanhbang.foodordering.controller.user;

import com.nguyenthanhbang.foodordering.dto.request.FoodCriteria;
import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.model.Food;
import com.nguyenthanhbang.foodordering.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class FoodController {
    private final FoodService foodService;
    @GetMapping("/foods")
    public ResponseEntity<ApiResponse<PaginationResponse>> getAllFoods(Pageable pageable, FoodCriteria foodCriteria){
        PaginationResponse paginationResponse = foodService.getAllFoods(pageable, foodCriteria);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get all foods successfully")
                .data(paginationResponse)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @GetMapping("/foods/{foodId}")
    public ResponseEntity<ApiResponse<Food>> getFoodById(@PathVariable Long foodId) {
        Food food = foodService.getFoodById(foodId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get food successfully")
                .data(food)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
