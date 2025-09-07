package com.nguyenthanhbang.foodordering.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateCartItemRequest {
    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
    @NotNull(message = "FoodId must not be null")
    private Long foodId;
}
