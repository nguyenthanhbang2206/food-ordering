package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.ResetPasswordRequest;
import jakarta.mail.MessagingException;

public interface EmailService {
    void sendTokenResetPassword(ResetPasswordRequest request) throws MessagingException;
}
