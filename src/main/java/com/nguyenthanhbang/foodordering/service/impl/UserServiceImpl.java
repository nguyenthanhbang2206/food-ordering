package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.enums.Role;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.UserRepository;
import com.nguyenthanhbang.foodordering.service.UserService;
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
            throw new Exception("email exist");
        }
        user.setRole(user.getRole());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User getUserByRefreshTokenAndEmail(String refreshToken, String email) {
        return userRepository.findByRefreshTokenAndEmail(refreshToken, email);
    }
}
