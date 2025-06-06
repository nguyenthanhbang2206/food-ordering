package com.nguyenthanhbang.foodordering.controller.user;

import com.nguyenthanhbang.foodordering.dto.request.CommentRequest;
import com.nguyenthanhbang.foodordering.dto.request.ReviewRequest;
import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.dto.response.ReviewStats;
import com.nguyenthanhbang.foodordering.model.Comment;
import com.nguyenthanhbang.foodordering.model.Review;
import com.nguyenthanhbang.foodordering.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    @PostMapping("/reviews")
    public ResponseEntity<ApiResponse<Review>> rating(@RequestBody ReviewRequest request) {
        Review review = reviewService.rating(request);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.CREATED.value())
                .message("Review successfully")
                .data(review)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @GetMapping("/restaurants/{restaurantId}/my-review")
    public ResponseEntity<ApiResponse<Review>> getMyReview(@PathVariable Long restaurantId) {
        Review review = reviewService.getMyReview(restaurantId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get my review successfully")
                .data(review)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
