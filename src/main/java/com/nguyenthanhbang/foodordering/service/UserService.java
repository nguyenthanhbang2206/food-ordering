package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.model.User;

public interface UserService {
    void updateTokenOfUser(String email, String refreshToken);
    User createUser(User user) throws Exception;
    User getUserByRefreshTokenAndEmail(String refreshToken, String email);
}
