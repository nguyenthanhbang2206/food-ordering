package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.CommentRequest;
import com.nguyenthanhbang.foodordering.model.Comment;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.CommentRepository;
import com.nguyenthanhbang.foodordering.service.impl.CommentServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.checkerframework.checker.units.qual.C;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;
    @Mock
    private RestaurantService restaurantService;
    @Mock
    private UserService userService;
    @InjectMocks
    private CommentServiceImpl commentService;
    private Comment comment;
    private Restaurant restaurant;
    private User user;
    private CommentRequest request;

    @BeforeEach
    public void setUp(){
        user = User.builder()
                .fullName("Nguyen Van A")
                .build();
        user.setId(1L);
        restaurant = Restaurant.builder()
                .name("restaurant")
                .owner(user)
                .description("description")
                .build();
        restaurant.setId(1L);
        comment = Comment.builder()
                .content("comment")
                .user(user)
                .restaurant(restaurant)
                .build();
        comment.setId(1L);
        request = new CommentRequest();
        request.setContent("request");
        request.setRestaurantId(restaurant.getId());
    }

    @Test
    public void createComment_userNotFound_shouldThrowException(){
        Mockito.when(userService.getUserLogin()).thenThrow(new EntityNotFoundException("User not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->commentService.createComment(request));
        Assertions.assertEquals("User not found", ex.getMessage());
        Mockito.verify(commentRepository, Mockito.never()).save(Mockito.any(Comment.class));
    }
    @Test
    public void createComment_restaurantNotFound_shouldThrowException(){
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(restaurantService.getRestaurantById(request.getRestaurantId())).thenThrow(new EntityNotFoundException("Restaurant with ID = " + request.getRestaurantId() + " not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->commentService.createComment(request));
        Assertions.assertEquals("Restaurant with ID = " + request.getRestaurantId() + " not found", ex.getMessage());
        Mockito.verify(commentRepository, Mockito.never()).save(Mockito.any(Comment.class));
    }
    @Test
    public void createComment_validRequest_shouldCreateComment(){
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(restaurantService.getRestaurantById(request.getRestaurantId())).thenReturn(restaurant);
        Mockito.when(commentRepository.save(Mockito.any(Comment.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Comment result = commentService.createComment(request);
        Assertions.assertNotNull(result);
        Assertions.assertEquals("request", result.getContent());
        Mockito.verify(commentRepository, Mockito.times(1)).save(Mockito.any(Comment.class));
    }
    @Test
    public void getCommentByRestaurantId_restaurantNotFound_shouldThrowException(){
        Long restaurantId = 999L;
        request.setRestaurantId(restaurantId);
        Mockito.when(restaurantService.getRestaurantById(restaurantId)).thenThrow(new EntityNotFoundException("Restaurant with ID = " + restaurantId + " not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->commentService.createComment(request));
        Assertions.assertEquals("Restaurant with ID = " + restaurantId + " not found", ex.getMessage());
        Mockito.verify(commentRepository, Mockito.never()).findByRestaurantIdOrderByCreatedDateDesc(restaurantId);
    }
    @Test
    public void getCommentByRestaurantId_validRequest_shouldReturnComments(){
        Comment comment1 = Comment.builder()
                .content("comment1")
                .build();
        Comment comment2 = Comment.builder()
                .content("comment2")
                .build();
        Mockito.when(restaurantService.getRestaurantById(1L)).thenReturn(restaurant);
        Mockito.when(commentRepository.findByRestaurantIdOrderByCreatedDateDesc(1L)).thenReturn(Arrays.asList(comment1, comment2));
        List<Comment> result = commentService.getCommentByRestaurantId(1L);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(2, result.size());
        Mockito.verify(commentRepository, Mockito.times(1)).findByRestaurantIdOrderByCreatedDateDesc(1L);
    }


}
