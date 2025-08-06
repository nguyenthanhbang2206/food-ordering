package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.dto.request.CommentRequest;
import com.nguyenthanhbang.foodordering.model.Comment;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.CommentRepository;
import com.nguyenthanhbang.foodordering.service.CommentService;
import com.nguyenthanhbang.foodordering.service.RestaurantService;
import com.nguyenthanhbang.foodordering.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final RestaurantService restaurantService;
    private final UserService userService;
    @Override
    public Comment createComment(CommentRequest request) {
        User user = userService.getUserLogin();
        Restaurant restaurant = restaurantService.getRestaurantById(request.getRestaurantId());
        Comment comment = new Comment();
        comment.setCreatedDate(Instant.now());
        comment.setContent(request.getContent());
        comment.setRestaurant(restaurant);
        comment.setUser(user);
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getCommentByRestaurantId(Long restaurantId) {
        return commentRepository.findByRestaurantIdOrderByCreatedDateDesc(restaurantId);
    }
}
