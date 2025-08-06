package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.CreateUserRequest;
import com.nguyenthanhbang.foodordering.dto.request.UpdatePasswordRequest;
import com.nguyenthanhbang.foodordering.dto.request.UpdateUserRequest;
import com.nguyenthanhbang.foodordering.model.User;


public interface UserService {
    void updateTokenOfUser(String email, String refreshToken);
    User createUser(CreateUserRequest user);
    User getUserByRefreshTokenAndEmail(String refreshToken, String email);
    User getUserByEmail(String email);
    User getUserLogin();
    User updateProfile(UpdateUserRequest request);
    User updatePassword(UpdatePasswordRequest request);
}
