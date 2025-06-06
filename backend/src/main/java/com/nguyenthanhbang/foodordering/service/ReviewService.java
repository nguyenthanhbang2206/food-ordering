package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.ReviewRequest;
import com.nguyenthanhbang.foodordering.model.Review;

public interface ReviewService {
    Review rating(ReviewRequest request);
    double getAverageRating(Long restaurantId);
    Review getMyReview(Long restaurantId);
    int countReviewsByRestaurantId(Long restaurantId);
}
