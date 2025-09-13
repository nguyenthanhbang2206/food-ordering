package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.CreateUserRequest;
import com.nguyenthanhbang.foodordering.dto.request.UpdatePasswordRequest;
import com.nguyenthanhbang.foodordering.dto.request.UpdateUserRequest;
import com.nguyenthanhbang.foodordering.enums.Gender;
import com.nguyenthanhbang.foodordering.enums.Role;
import com.nguyenthanhbang.foodordering.model.ResetPasswordToken;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.ResetPasswordTokenRepository;
import com.nguyenthanhbang.foodordering.repository.UserRepository;
import com.nguyenthanhbang.foodordering.service.impl.UserServiceImpl;
import com.nguyenthanhbang.foodordering.util.SecurityUtil;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private ResetPasswordTokenRepository resetPasswordTokenRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;
    private CreateUserRequest createUserRequest;
    private UpdateUserRequest updateUserRequest;
    private UpdatePasswordRequest updatePasswordRequest;
    private ResetPasswordToken resetPasswordToken;

    @BeforeEach
    public void setUp() {
        user = User.builder()
                .email("a@example.com")
                .fullName("Nguyen Van A")
                .password("encodedPassword")
                .refreshToken("refreshToken")
                .gender(Gender.MALE)
                .build();
        user.setId(1L);

        createUserRequest = new CreateUserRequest();
        createUserRequest.setEmail("new@example.com");
        createUserRequest.setFullName("New");
        createUserRequest.setRole(Role.CUSTOMER);
        createUserRequest.setPassword("password123");

        updateUserRequest = new UpdateUserRequest();
        updateUserRequest.setFullName("Updated Name");

        updatePasswordRequest = new UpdatePasswordRequest();
        updatePasswordRequest.setToken("validToken");
        updatePasswordRequest.setNewPassword("newPassword123");

        resetPasswordToken = new ResetPasswordToken();
        resetPasswordToken.setToken("validToken");
        resetPasswordToken.setUser(user);
        resetPasswordToken.setExpiryDate(LocalDateTime.now().plusHours(1));
    }

    @Test
    public void updateTokenOfUser_WhenUserExists_ShouldUpdateRefreshToken() {
        String email = "a@example.com";
        String newRefreshToken = "newRefreshToken";
        when(userRepository.findByEmail(email)).thenReturn(user);
        when(userRepository.save(any(User.class))).thenReturn(user);

        userService.updateTokenOfUser(email, newRefreshToken);

        verify(userRepository).findByEmail(email);
        verify(userRepository).save(user);
        assertEquals(newRefreshToken, user.getRefreshToken());
    }

    @Test
    public void updateTokenOfUser_WhenUserNotExists_ShouldNotSave() {
        String email = "nonexistent@example.com";
        String newRefreshToken = "newRefreshToken";
        when(userRepository.findByEmail(email)).thenReturn(null);

        userService.updateTokenOfUser(email, newRefreshToken);

        verify(userRepository).findByEmail(email);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    public void createUser_WhenEmailNotExists_ShouldCreateNewUser() {
        when(userRepository.findByEmail(createUserRequest.getEmail())).thenReturn(null);
        when(passwordEncoder.encode(createUserRequest.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        User result = userService.createUser(createUserRequest);

        assertNotNull(result);
        verify(userRepository).findByEmail(createUserRequest.getEmail());
        verify(passwordEncoder).encode(createUserRequest.getPassword());
        verify(userRepository).save(any(User.class));
    }

    @Test
    public void createUser_WhenEmailAlreadyExists_ShouldThrowException() {
        when(userRepository.findByEmail(createUserRequest.getEmail())).thenReturn(user);

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> userService.createUser(createUserRequest)
        );
        assertEquals("Email already exists", exception.getMessage());
        verify(userRepository).findByEmail(createUserRequest.getEmail());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    public void getUserByRefreshTokenAndEmail_ShouldReturnUser_WhenUserExists() {
        String refreshToken = "validToken";
        String email = "a@example.com";
        when(userRepository.findByRefreshTokenAndEmail(refreshToken, email)).thenReturn(user);

        User result = userService.getUserByRefreshTokenAndEmail(refreshToken, email);

        assertNotNull(result);
        assertEquals(user, result);
        verify(userRepository).findByRefreshTokenAndEmail(refreshToken, email);
    }

    @Test
    public void getUserByRefreshTokenAndEmail_WhenUserNotExists_ShouldThrowException() {
        String refreshToken = "invalidToken";
        String email = "test@example.com";
        when(userRepository.findByRefreshTokenAndEmail(refreshToken, email)).thenReturn(null);

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> userService.getUserByRefreshTokenAndEmail(refreshToken, email));
        assertEquals("User not found", exception.getMessage());
        verify(userRepository).findByRefreshTokenAndEmail(refreshToken, email);
    }

    @Test
    public void getUserByEmail_WhenUserExist_ShouldReturnUsers() {
        String email = "a@example.com";
        when(userRepository.findByEmail(email)).thenReturn(user);

        User result = userService.getUserByEmail(email);

        assertNotNull(result);
        assertEquals(user, result);
        verify(userRepository).findByEmail(email);
    }

    @Test
    public void getUserByEmail_WhenUserNotExists_ShouldThrowException() {
        String email = "nonexistent@example.com";
        when(userRepository.findByEmail(email)).thenReturn(null);

        UsernameNotFoundException exception = assertThrows(UsernameNotFoundException.class, () -> userService.getUserByEmail(email));
        assertEquals("User not found", exception.getMessage());
        verify(userRepository).findByEmail(email);
    }

    @Test
    public void getUserLogin_ShouldReturnUser_WhenUserIsAuthenticated() {
        String email = "test@example.com";
        try (MockedStatic<SecurityUtil> mockedSecurityUtil = mockStatic(SecurityUtil.class)) {
            mockedSecurityUtil.when(SecurityUtil::getCurrentUserLogin).thenReturn(Optional.of(email));
            when(userRepository.findByEmail(email)).thenReturn(user);

            User result = userService.getUserLogin();

            assertNotNull(result);
            assertEquals(user, result);
            verify(userRepository).findByEmail(email);
        }
    }

    @Test
    public void getUserLogin_WhenNoUserAuthenticated_ShouldThrowException() {
        try (MockedStatic<SecurityUtil> mockedSecurityUtil = mockStatic(SecurityUtil.class)) {
            mockedSecurityUtil.when(SecurityUtil::getCurrentUserLogin).thenReturn(Optional.empty());

            EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> userService.getUserLogin());
            assertEquals("User not found", exception.getMessage());
            verify(userRepository, never()).findByEmail(anyString());
        }
    }

    @Test
    public void updateProfile_WhenUserIsAuthenticated_ShouldUpdateAndReturnUser() {
        String email = "a@example.com";
        try (MockedStatic<SecurityUtil> mockedSecurityUtil = mockStatic(SecurityUtil.class)) {
            mockedSecurityUtil.when(SecurityUtil::getCurrentUserLogin).thenReturn(Optional.of(email));
            when(userRepository.findByEmail(email)).thenReturn(user);
            when(userRepository.save(user)).thenReturn(user);

            User result = userService.updateProfile(updateUserRequest);

            assertNotNull(result);
            assertEquals("Updated Name", result.getFullName());
            verify(userRepository).findByEmail(email);
            verify(userRepository).save(user);
        }
    }

    @Test
    public void updatePassword_WhenTokenIsValid_ShouldUpdatePassword() {
        when(resetPasswordTokenRepository.findByToken(updatePasswordRequest.getToken()))
                .thenReturn(Optional.of(resetPasswordToken));
        when(passwordEncoder.encode(updatePasswordRequest.getNewPassword()))
                .thenReturn("newEncodedPassword");
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.updatePassword(updatePasswordRequest);

        assertNotNull(result);
        assertEquals("newEncodedPassword", result.getPassword());
        verify(resetPasswordTokenRepository).findByToken(updatePasswordRequest.getToken());
        verify(passwordEncoder).encode(updatePasswordRequest.getNewPassword());
        verify(resetPasswordTokenRepository).delete(resetPasswordToken);
        verify(userRepository).save(user);
    }

    @Test
    public void updatePassword_WhenTokenNotFound_ShouldThrowException() {
        when(resetPasswordTokenRepository.findByToken(updatePasswordRequest.getToken()))
                .thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(
                EntityNotFoundException.class,
                () -> userService.updatePassword(updatePasswordRequest)
        );
        assertEquals("Invalid token", exception.getMessage());
        verify(resetPasswordTokenRepository).findByToken(updatePasswordRequest.getToken());
        verify(userRepository, never()).save(any(User.class));
        verify(resetPasswordTokenRepository, never()).delete(any(ResetPasswordToken.class));
    }

    @Test
    public void updatePassword_WhenTokenIsExpired_ShouldThrowException() {
        resetPasswordToken.setExpiryDate(LocalDateTime.now().minusHours(1));
        when(resetPasswordTokenRepository.findByToken(updatePasswordRequest.getToken()))
                .thenReturn(Optional.of(resetPasswordToken));

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> userService.updatePassword(updatePasswordRequest)
        );
        assertEquals("Invalid token", exception.getMessage());
        verify(resetPasswordTokenRepository).findByToken(updatePasswordRequest.getToken());
        verify(userRepository, never()).save(any(User.class));
        verify(resetPasswordTokenRepository, never()).delete(any(ResetPasswordToken.class));
    }
}
