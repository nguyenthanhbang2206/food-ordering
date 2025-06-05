package com.nguyenthanhbang.foodordering.controller.user;

import com.nguyenthanhbang.foodordering.dto.request.CommentRequest;
import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.model.Comment;
import com.nguyenthanhbang.foodordering.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    private final SimpMessagingTemplate messagingTemplate;
    @PostMapping("/comments")
    public ResponseEntity<ApiResponse<Comment>> createComment(@RequestBody CommentRequest request) {
        Comment comment = commentService.createComment(request);
        messagingTemplate.convertAndSend("/topic/restaurants/" + request.getRestaurantId(), comment);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.CREATED.value())
                .message("Create comment successfully")
                .data(comment)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
    @GetMapping("/restaurants/{restaurantId}/comments")
    public ResponseEntity<ApiResponse<List<Comment>>> getComments(@PathVariable Long restaurantId) {
        List<Comment> comments = commentService.getCommentByRestaurantId(restaurantId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get comments successfully")
                .data(comments)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

}
