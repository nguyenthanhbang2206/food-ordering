package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.dto.request.CreateUserRequest;
import com.nguyenthanhbang.foodordering.dto.request.UpdatePasswordRequest;
import com.nguyenthanhbang.foodordering.dto.request.UpdateUserRequest;
import com.nguyenthanhbang.foodordering.model.ResetPasswordToken;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.ResetPasswordTokenRepository;
import com.nguyenthanhbang.foodordering.repository.UserRepository;
import com.nguyenthanhbang.foodordering.service.UserService;
import com.nguyenthanhbang.foodordering.util.SecurityUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ResetPasswordTokenRepository resetPasswordTokenRepository;

    @Override
    public void updateTokenOfUser(String email, String refreshToken) {
        User user = userRepository.findByEmail(email);
        if(user != null) {
            user.setRefreshToken(refreshToken);
            userRepository.save(user);
        }
    }

    @Override
    public User createUser(CreateUserRequest request) {
        User currentUser = userRepository.findByEmail(request.getEmail());
        if(currentUser != null) {
            throw new IllegalArgumentException("Email already exists");
        }
        currentUser = new User();
        currentUser.setEmail(request.getEmail());
        currentUser.setFullName(request.getFullName());
        currentUser.setRole(request.getRole());
        currentUser.setPassword(passwordEncoder.encode(request.getPassword()));
        return userRepository.save(currentUser);
    }


    @Override
    public User getUserByRefreshTokenAndEmail(String refreshToken, String email)  {
        User user = userRepository.findByRefreshTokenAndEmail(refreshToken, email);
        if(user == null) {
            throw new EntityNotFoundException("User not found");
        }
        return user;
    }

    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if(user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

    @Override
    public User getUserLogin() {
        String email = SecurityUtil.getCurrentUserLogin().orElseThrow(() -> new EntityNotFoundException("User not found"));
        User user = this.getUserByEmail(email);
        return user;
    }

    @Override
    public User updateProfile(UpdateUserRequest request) {
        User user = this.getUserLogin();
        user.setFullName(request.getFullName());
       // user.setAvatar(request.getAvatar());
        user.setGender(request.getGender());
        user = userRepository.save(user);
        return user;
    }

    @Override
    public User updatePassword(UpdatePasswordRequest request) {
        ResetPasswordToken resetPasswordToken = resetPasswordTokenRepository.findByToken(request.getToken()).orElseThrow(() -> new EntityNotFoundException("Invalid token"));
        if(!resetPasswordToken.getExpiryDate().isAfter(LocalDateTime.now())) {
            throw new IllegalArgumentException("Invalid token");
        }
        User user = resetPasswordToken.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        resetPasswordTokenRepository.delete(resetPasswordToken);
        return userRepository.save(user);
    }

}
