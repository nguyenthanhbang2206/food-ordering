package com.nguyenthanhbang.foodordering.dto.response;

import lombok.*;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorDetails {
    private int status;
    private String message;
    private String error;
    private String path;
    private Instant timestamp;
}
