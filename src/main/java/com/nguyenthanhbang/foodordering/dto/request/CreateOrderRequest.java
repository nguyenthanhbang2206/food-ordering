package com.nguyenthanhbang.foodordering.dto.request;

import com.nguyenthanhbang.foodordering.model.Address;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;



@Getter
public class CreateOrderRequest {
    @NotNull(message = "Address must not be null")
    private Address deliveryAddress;
    @NotNull(message = "restaurantId must not be null")
    private Long restaurantId;
}
