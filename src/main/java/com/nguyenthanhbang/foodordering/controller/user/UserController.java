package com.nguyenthanhbang.foodordering.controller.user;

import com.nguyenthanhbang.foodordering.dto.request.UpdateUserRequest;
import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PutMapping("/users/profile")
    public ResponseEntity<ApiResponse<User>> updateProfile(@RequestBody UpdateUserRequest request) {
        User user = userService.updateProfile(request);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Updated profile")
                .data(user)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/users/profile")
    public ResponseEntity<ApiResponse<User>> getProfile() {
        User user = userService.getUserLogin();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get profile successfully")
                .data(user)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

}
