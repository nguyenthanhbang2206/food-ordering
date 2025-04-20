package com.nguyenthanhbang.foodordering.dto.request;

import com.nguyenthanhbang.foodordering.enums.OrderStatus;
import lombok.Getter;

@Getter
public class UpdateOrderRequest {
    private OrderStatus status;
}
