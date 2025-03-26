package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.dto.request.UpdateUserRequest;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.UserRepository;
import com.nguyenthanhbang.foodordering.service.UserService;
import com.nguyenthanhbang.foodordering.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void updateTokenOfUser(String email, String refreshToken) {
        User user = userRepository.findByEmail(email);
        if(user != null) {
            user.setRefreshToken(refreshToken);
            userRepository.save(user);
        }
    }

    @Override
    public User createUser(User user) throws Exception {
        User currentUser = userRepository.findByEmail(user.getEmail());
        if(currentUser != null) {
            throw new Exception("Email exist");
        }
        user.setRole(user.getRole());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User getUserByRefreshTokenAndEmail(String refreshToken, String email) throws Exception {
        User user = userRepository.findByRefreshTokenAndEmail(refreshToken, email);
        if(user == null) {
            throw new Exception("User not found");
        }
        return user;
    }

    @Override
    public User getUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if(user == null) {
            throw new Exception("User not found");
        }
        return user;
    }

    @Override
    public User getUserLogin() throws Exception {
        String email = SecurityUtil.getCurrentUserLogin().orElseThrow(() -> new Exception("User not found"));
        User user = this.getUserByEmail(email);
        return user;
    }

    @Override
    public User updateProfile(UpdateUserRequest request) throws Exception {
        User user = this.getUserLogin();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setAvatar(request.getAvatar());
        user.setGender(request.getGender());
        user = userRepository.save(user);
        return user;
    }

}
