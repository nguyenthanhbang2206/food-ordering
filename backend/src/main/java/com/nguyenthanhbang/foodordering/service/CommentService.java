package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.CommentRequest;
import com.nguyenthanhbang.foodordering.model.Comment;

import java.util.List;

public interface CommentService {
    Comment createComment(CommentRequest request);
    List<Comment> getCommentByRestaurantId(Long restaurantId);
}
