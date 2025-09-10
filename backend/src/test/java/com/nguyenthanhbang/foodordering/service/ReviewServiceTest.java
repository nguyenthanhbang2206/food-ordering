package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.ReviewRequest;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.model.Review;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.RestaurantRepository;
import com.nguyenthanhbang.foodordering.repository.ReviewRepository;
import com.nguyenthanhbang.foodordering.service.impl.RestaurantServiceImpl;
import com.nguyenthanhbang.foodordering.service.impl.ReviewServiceImpl;
import com.nguyenthanhbang.foodordering.service.impl.UserServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class ReviewServiceTest {
    @Mock
    private UserServiceImpl userService;
    @Mock
    private ReviewRepository reviewRepository;
    @Mock
    private RestaurantServiceImpl restaurantService;
    @Mock
    private RestaurantRepository restaurantRepository;
    @InjectMocks
    private ReviewServiceImpl reviewService;

    private ReviewRequest request;
    private Restaurant restaurant;
    private User user;
    private Review review;

    @BeforeEach
    public void setUp() {
        user = User.builder()
                .fullName("Nguyen Van A")
                .build();
        user.setId(1L);
        restaurant = Restaurant.builder()
                .averageRating(0.0)
                .reviewCount(0)
                .name("restaurant")
                .owner(user)
                .build();
        restaurant.setId(1L);
        request = new ReviewRequest();
        request.setRestaurantId(1L);
        request.setRating(3);
        review = Review.builder()
                .rating(2)
                .restaurant(restaurant)
                .user(user)
                .build();
    }
    @Test
    public void rating_restaurantNotFound_shouldThrowException() {
        Mockito.when(restaurantService.getRestaurantById(Mockito.anyLong())).thenThrow(new EntityNotFoundException("Restaurant with ID = " + request.getRestaurantId() + " not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, () -> reviewService.rating(request));
        Assertions.assertEquals("Restaurant with ID = " + request.getRestaurantId() + " not found", ex.getMessage());
        Mockito.verify(restaurantService).getRestaurantById(request.getRestaurantId());
        Mockito.verify(userService, Mockito.never()).getUserLogin();
        Mockito.verify(reviewRepository, Mockito.never()).findByUserIdAndRestaurantId(Mockito.anyLong(), Mockito.anyLong());
        Mockito.verify(reviewRepository, Mockito.never()).save(Mockito.any(Review.class));
        Mockito.verify(restaurantRepository, Mockito.never()).save(Mockito.any(Restaurant.class));
    }
    @Test
    public void rating_userNotFound_shouldThrowException() {
        Mockito.when(restaurantService.getRestaurantById(restaurant.getId())).thenReturn(restaurant);
        Mockito.when(userService.getUserLogin()).thenThrow(new EntityNotFoundException("User not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, () -> reviewService.rating(request));
        Assertions.assertEquals("User not found", ex.getMessage());
        Mockito.verify(restaurantService).getRestaurantById(restaurant.getId());
        Mockito.verify(userService).getUserLogin();
        Mockito.verify(reviewRepository, Mockito.never()).findByUserIdAndRestaurantId(Mockito.anyLong(), Mockito.anyLong());
        Mockito.verify(reviewRepository, Mockito.never()).save(Mockito.any(Review.class));
        Mockito.verify(restaurantRepository, Mockito.never()).save(Mockito.any(Restaurant.class));
    }
    @Test
    public void rating_reviewNotFound_shouldCreateNewReview() {
        Mockito.when(restaurantService.getRestaurantById(restaurant.getId())).thenReturn(restaurant);
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(reviewRepository.findByUserIdAndRestaurantId(user.getId(), restaurant.getId())).thenReturn(Optional.empty());
        Mockito.when(reviewRepository.save(Mockito.any(Review.class))).thenAnswer(i -> i.getArgument(0));
        Mockito.when(reviewRepository.getAverageRatingByRestaurantId(restaurant.getId())).thenReturn(3.0);
        Mockito.when(reviewRepository.countByRestaurantId(restaurant.getId())).thenReturn(1);
        Review result = reviewService.rating(request);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(request.getRating(), result.getRating());
        Assertions.assertEquals(3, result.getRestaurant().getAverageRating());
        Assertions.assertEquals(1, result.getRestaurant().getReviewCount());
        Mockito.verify(reviewRepository).save(Mockito.any(Review.class));
        Mockito.verify(restaurantRepository).save(Mockito.any(Restaurant.class));
    }
    @Test
    public void rating_reviewFound_shouldUpdateReview() {
        Mockito.when(restaurantService.getRestaurantById(restaurant.getId())).thenReturn(restaurant);
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(reviewRepository.findByUserIdAndRestaurantId(Mockito.anyLong(), Mockito.anyLong())).thenReturn(Optional.of(review));
        Mockito.when(reviewRepository.save(Mockito.any(Review.class))).thenAnswer(i -> i.getArgument(0));
        Mockito.when(reviewRepository.getAverageRatingByRestaurantId(restaurant.getId())).thenReturn(3.0);
        Mockito.when(reviewRepository.countByRestaurantId(restaurant.getId())).thenReturn(1);
        Review result = reviewService.rating(request);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(request.getRating(), result.getRating());
        Assertions.assertEquals(3, result.getRestaurant().getAverageRating());
        Assertions.assertEquals(1, result.getRestaurant().getReviewCount());
        Mockito.verify(reviewRepository).save(Mockito.any(Review.class));
        Mockito.verify(restaurantRepository).save(Mockito.any(Restaurant.class));
    }
    @Test
    public void getMyReview_userNotFound_shouldThrowException() {
        Mockito.when(restaurantService.getRestaurantById(restaurant.getId())).thenReturn(restaurant);
        Mockito.when(userService.getUserLogin()).thenThrow(new EntityNotFoundException("User not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, () -> reviewService.rating(request));
        Assertions.assertEquals("User not found", ex.getMessage());
        Mockito.verify(reviewRepository, Mockito.never()).findByUserIdAndRestaurantId(Mockito.anyLong(), Mockito.anyLong());
    }
    @Test
    public void getMyReview_reviewNotFound_shouldReturnNull() {
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(reviewRepository.findByUserIdAndRestaurantId(user.getId(), restaurant.getId())).thenReturn(Optional.empty());
        Review result= reviewService.getMyReview(restaurant.getId());
        Assertions.assertNull(result);
        Mockito.verify(reviewRepository).findByUserIdAndRestaurantId(user.getId(), restaurant.getId());
    }
    @Test
    public void getMyReview_reviewExists_shouldReturnReview() {
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(reviewRepository.findByUserIdAndRestaurantId(user.getId(), restaurant.getId())).thenReturn(Optional.of(review));
        Review result = reviewService.getMyReview(restaurant.getId());
        Assertions.assertNotNull(result);
        Assertions.assertEquals(review.getRating(), result.getRating());
        Mockito.verify(reviewRepository).findByUserIdAndRestaurantId(user.getId(), restaurant.getId());
    }
    @Test
    public void getAverageRating_restaurantNotFound_shouldThrowException() {
        Long restaurantId = 999L;
        Mockito.when(restaurantService.getRestaurantById(Mockito.anyLong())).thenThrow(new EntityNotFoundException("Restaurant with ID = " + restaurantId + " not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, () -> reviewService.getAverageRating(restaurantId));
        Assertions.assertEquals("Restaurant with ID = " + restaurantId + " not found", ex.getMessage());
        Mockito.verify(restaurantService).getRestaurantById(restaurantId);
        Mockito.verify(reviewRepository, Mockito.never()).getAverageRatingByRestaurantId(Mockito.anyLong());
    }
    @Test
    public void getAverageRating_validRequest_shouldReturnAverageRating() {
        Mockito.when(restaurantService.getRestaurantById(restaurant.getId())).thenReturn(restaurant);
        Mockito.when(reviewRepository.getAverageRatingByRestaurantId(restaurant.getId())).thenReturn(2.0);
        double result = reviewService.getAverageRating(restaurant.getId());
        Assertions.assertEquals(2.0, result);
        Mockito.verify(restaurantService).getRestaurantById(restaurant.getId());
        Mockito.verify(reviewRepository).getAverageRatingByRestaurantId(restaurant.getId());
    }
    @Test
    public void countReviewsByRestaurantId_restaurantNotFound_shouldThrowException() {
        Long restaurantId = 999L;
        Mockito.when(restaurantService.getRestaurantById(Mockito.anyLong())).thenThrow(new EntityNotFoundException("Restaurant with ID = " + restaurantId + " not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, () -> reviewService.getAverageRating(restaurantId));
        Assertions.assertEquals("Restaurant with ID = " + restaurantId + " not found", ex.getMessage());
        Mockito.verify(restaurantService).getRestaurantById(restaurantId);
        Mockito.verify(reviewRepository, Mockito.never()).countByRestaurantId(restaurantId);
    }
    @Test
    public void countReviewsByRestaurantId_validRequest_shouldReturnReviewCount() {
        Mockito.when(restaurantService.getRestaurantById(Mockito.anyLong())).thenReturn(restaurant);
        Mockito.when(reviewRepository.countByRestaurantId(restaurant.getId())).thenReturn(1);
        int result = reviewService.countReviewsByRestaurantId(restaurant.getId());
        Assertions.assertEquals(1, result);
        Mockito.verify(restaurantService).getRestaurantById(restaurant.getId());
        Mockito.verify(reviewRepository).countByRestaurantId(restaurant.getId());
    }
    


}
