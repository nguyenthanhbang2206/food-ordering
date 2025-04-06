package com.nguyenthanhbang.foodordering.dto.request;

import lombok.Getter;

@Getter
public class CreateCartItemRequest {
    private int quantity;
    private Long foodId;
}
