package com.nguyenthanhbang.foodordering.controller.user;

import com.nguyenthanhbang.foodordering.dto.request.ChatRequest;
import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.model.Food;
import com.nguyenthanhbang.foodordering.service.FoodRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class FoodRecommendationController {
    private final FoodRecommendationService foodRecommendationService;
    @GetMapping("/food-recommendations/for-you")
    public ResponseEntity<ApiResponse<List<Food>>> forYou() {
        List<Food> foods = foodRecommendationService.forYou();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get foods successfully")
                .data(foods)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @GetMapping("/food-recommendations/{foodId}/similar")
    public ResponseEntity<ApiResponse<List<Food>>> forYou(@PathVariable Long foodId) {
        List<Food> foods = foodRecommendationService.similarFood(foodId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get foods successfully")
                .data(foods)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

}
