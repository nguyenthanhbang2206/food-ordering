package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.ResetPasswordRequest;
import com.nguyenthanhbang.foodordering.model.ResetPasswordToken;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.ResetPasswordTokenRepository;
import com.nguyenthanhbang.foodordering.service.impl.EmailServiceImpl;
import com.nguyenthanhbang.foodordering.service.impl.UserServiceImpl;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
public class EmailServiceTest {
    @Mock
    private UserServiceImpl userService;
    @Mock
    private ResetPasswordTokenRepository resetPasswordTokenRepository;
    @Mock
    private JavaMailSender javaMailSender;
    @Mock
    private MimeMessage mimeMessage;
    @InjectMocks
    private EmailServiceImpl emailService;
    private ResetPasswordRequest request;
    private User user;
    @BeforeEach
    public void setUp() {
        request = new ResetPasswordRequest();
        request.setEmail("a@gmail.com");
        user = User.builder()
                .fullName("Nguyen Van A")
                .build();
        user.setId(1L);
        ReflectionTestUtils.setField(emailService, "from", "admin@gmail.com");
        ReflectionTestUtils.setField(emailService, "frontendUrl", "http://localhost:3000");
    }
    @Test
    public void sendTokenResetPassword_success_shouldSendToken() throws MessagingException {
        Mockito.when(userService.getUserByEmail("a@gmail.com")).thenReturn(user);
        Mockito.when(javaMailSender.createMimeMessage()).thenReturn(mimeMessage);
        emailService.sendTokenResetPassword(request);
        Mockito.verify(userService).getUserByEmail("a@gmail.com");
        Mockito.verify(resetPasswordTokenRepository).save(Mockito.any(ResetPasswordToken.class));
        Mockito.verify(javaMailSender).send(mimeMessage);

    }
    @Test
    public void sendTokenResetPassword_mailError_shouldThrowException() {
        Mockito.when(userService.getUserByEmail("a@gmail.com")).thenReturn(user);
        Mockito.when(javaMailSender.createMimeMessage()).thenReturn(mimeMessage);
        Mockito.doThrow(new MailSendException("Mail error")).when(javaMailSender).send(Mockito.any(MimeMessage.class));
        Assertions.assertThrows(MailSendException.class, () -> emailService.sendTokenResetPassword(request));

    }
    @Test
    public void sendTokenResetPassword_emailNotFound_shouldThrowException() {
        Mockito.when(userService.getUserByEmail("a@gmail.com")).thenThrow(new UsernameNotFoundException("User not found"));
        Assertions.assertThrows(UsernameNotFoundException.class, () -> emailService.sendTokenResetPassword(request));
        Mockito.verify(userService).getUserByEmail("a@gmail.com");
        Mockito.verify(resetPasswordTokenRepository, Mockito.never()).save(Mockito.any(ResetPasswordToken.class));
        Mockito.verify(javaMailSender, Mockito.never()).send(mimeMessage);
    }
}
