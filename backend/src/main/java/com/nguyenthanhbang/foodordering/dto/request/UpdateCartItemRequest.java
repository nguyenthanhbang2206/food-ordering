package com.nguyenthanhbang.foodordering.dto.request;

import jakarta.validation.constraints.Min;
import lombok.Getter;

@Getter
public class UpdateCartItemRequest {
    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
}
