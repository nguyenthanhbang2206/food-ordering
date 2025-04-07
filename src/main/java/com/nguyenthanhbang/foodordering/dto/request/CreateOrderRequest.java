package com.nguyenthanhbang.foodordering.dto.request;

import com.nguyenthanhbang.foodordering.model.Address;
import lombok.Getter;



@Getter
public class CreateOrderRequest {
    private Address deliveryAddress;
    private Long restaurantId;
}
