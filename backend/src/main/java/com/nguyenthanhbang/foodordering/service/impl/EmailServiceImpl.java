package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.dto.request.ResetPasswordRequest;
import com.nguyenthanhbang.foodordering.model.ResetPasswordToken;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.ResetPasswordTokenRepository;
import com.nguyenthanhbang.foodordering.service.EmailService;
import com.nguyenthanhbang.foodordering.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final UserService userService;
    private final ResetPasswordTokenRepository resetPasswordTokenRepository;
    @Value("${spring.mail.username}")
    private String from;
    @Value("${app.frontend.url")
    private String frontendUrl;
    private final JavaMailSender mailSender;
    @Override
    public void sendTokenResetPassword(ResetPasswordRequest request) throws MessagingException {
       try {
           String email = request.getEmail();
           User user = userService.getUserByEmail(email);
           String token = UUID.randomUUID().toString();
           ResetPasswordToken resetPasswordToken = ResetPasswordToken.builder()
                   .expiryDate(LocalDateTime.now().plus(30, ChronoUnit.MINUTES))
                   .token(token)
                   .user(user)
                   .build();
           resetPasswordTokenRepository.save(resetPasswordToken);
           MimeMessage mimeMessage = mailSender.createMimeMessage();
           MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
           helper.setFrom(from);
           helper.setTo(request.getEmail());
           helper.setSubject("Đổi mật khẩu");
           String link = frontendUrl + "/reset-password?token=" + token;
           helper.setText("Bấm vào link sau: " + link + " để đổi mật khẩu");
           mailSender.send(mimeMessage);
       }catch (MessagingException e){
           throw new MessagingException(e.getMessage());
       }
    }
}
