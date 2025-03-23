package com.nguyenthanhbang.foodordering.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nguyenthanhbang.foodordering.dto.response.ErrorDetails;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.util.Optional;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private AuthenticationEntryPoint authenticationEntryPoint = new BearerTokenAuthenticationEntryPoint();
    @Autowired
    private ObjectMapper objectMapper;
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        authenticationEntryPoint.commence(request, response, authException);
        response.setContentType("application/json;charset=UTF-8");
        ErrorDetails errorDetails = ErrorDetails.builder()
                .status(HttpStatus.UNAUTHORIZED.value())
                .message("Token không hợp lệ")
                .error(Optional.ofNullable(authException.getCause()).map(Throwable::getMessage).orElse(authException.getMessage()))
                .path(request.getRequestURI())
                .timestamp(Instant.now())
                .build();
        objectMapper.writeValue(response.getWriter(), errorDetails);
    }
}
