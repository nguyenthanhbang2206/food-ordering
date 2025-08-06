package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByRestaurantIdOrderByCreatedDateDesc(Long restaurantId);
}
