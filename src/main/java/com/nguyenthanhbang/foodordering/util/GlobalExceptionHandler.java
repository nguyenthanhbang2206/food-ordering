package com.nguyenthanhbang.foodordering.util;

import com.nguyenthanhbang.foodordering.dto.response.ErrorDetails;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleException(Exception e, HttpServletRequest request) {
        ErrorDetails errorDetails = ErrorDetails.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .path(request.getRequestURI())
                .timestamp(Instant.now())
                .message(e.getMessage())
                .error("Internal server error")
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDetails);
    }
    @ExceptionHandler(value = {IllegalArgumentException.class})
    public ResponseEntity<ErrorDetails> handleBadRequest(Exception e, HttpServletRequest request) {
        ErrorDetails errorDetails = ErrorDetails.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .path(request.getRequestURI())
                .timestamp(Instant.now())
                .message(e.getMessage())
                .error("Bad request")
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorDetails);
    }
    @ExceptionHandler(value = {EntityNotFoundException.class, UsernameNotFoundException.class})
    public ResponseEntity<ErrorDetails> handleNotFoundException(Exception e, HttpServletRequest request) {
        ErrorDetails errorDetails = ErrorDetails.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .path(request.getRequestURI())
                .timestamp(Instant.now())
                .message(e.getMessage())
                .error("Not found")
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorDetails);
    }
    @ExceptionHandler(value = {EntityExistsException.class})
    public ResponseEntity<ErrorDetails> handleExistException(Exception e, HttpServletRequest request) {
        ErrorDetails errorDetails = ErrorDetails.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .path(request.getRequestURI())
                .timestamp(Instant.now())
                .message(e.getMessage())
                .error("Already exist")
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorDetails);
    }
}
