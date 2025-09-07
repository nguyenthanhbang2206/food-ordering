package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.dto.request.ReviewRequest;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.model.Review;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.RestaurantRepository;
import com.nguyenthanhbang.foodordering.repository.ReviewRepository;
import com.nguyenthanhbang.foodordering.service.RestaurantService;
import com.nguyenthanhbang.foodordering.service.ReviewService;
import com.nguyenthanhbang.foodordering.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final UserService userService;
    private final ReviewRepository reviewRepository;
    private final RestaurantService restaurantService;
    private final RestaurantRepository restaurantRepository;

    @Override
    public Review rating(ReviewRequest request) {
        Restaurant restaurant = restaurantService.getRestaurantById(request.getRestaurantId());
        User user = userService.getUserLogin();
        Optional<Review> optionalReview = reviewRepository.findByUserIdAndRestaurantId(user.getId(), restaurant.getId());
        Review review = null;
        if (optionalReview.isPresent()) {
            review = optionalReview.get();
            review.setRating(request.getRating());
        }else{
            review = new Review();
            review.setRating(request.getRating());
            review.setUser(user);
            review.setRestaurant(restaurant);
        }
        review = reviewRepository.save(review);
        restaurant.setAverageRating(this.getAverageRating(restaurant.getId()));
        restaurant.setReviewCount(this.countReviewsByRestaurantId(restaurant.getId()));
        restaurantRepository.save(restaurant);
        return review;
    }

    @Override
    public double getAverageRating(Long restaurantId) {
        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
        return reviewRepository.getAverageRatingByRestaurantId(restaurantId);
    }

    @Override
    public Review getMyReview(Long restaurantId) {
        User user = userService.getUserLogin();
        Optional<Review> review = reviewRepository.findByUserIdAndRestaurantId(user.getId(), restaurantId);
        if(review.isPresent()) {
            return review.get();
        }
        return null;
    }

    @Override
    public int countReviewsByRestaurantId(Long restaurantId) {
        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
        int count = reviewRepository.countByRestaurantId(restaurantId);
        return count;
    }
}
