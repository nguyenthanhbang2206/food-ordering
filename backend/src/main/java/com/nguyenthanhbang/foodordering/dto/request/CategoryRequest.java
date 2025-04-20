package com.nguyenthanhbang.foodordering.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class CategoryRequest {
    @NotBlank(message = "Name must not be blank")
    private String name;
}
