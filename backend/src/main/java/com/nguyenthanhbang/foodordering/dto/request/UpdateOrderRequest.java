package com.nguyenthanhbang.foodordering.dto.request;

import com.nguyenthanhbang.foodordering.enums.OrderStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateOrderRequest {
    private OrderStatus status;
}
