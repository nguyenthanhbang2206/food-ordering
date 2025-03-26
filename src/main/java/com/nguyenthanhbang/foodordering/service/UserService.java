package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.UpdateUserRequest;
import com.nguyenthanhbang.foodordering.model.User;


public interface UserService {
    void updateTokenOfUser(String email, String refreshToken);
    User createUser(User user) throws Exception;
    User getUserByRefreshTokenAndEmail(String refreshToken, String email) throws Exception;
    User getUserByEmail(String email) throws Exception;
    User getUserLogin() throws Exception;
    User updateProfile(UpdateUserRequest request) throws Exception;
}
