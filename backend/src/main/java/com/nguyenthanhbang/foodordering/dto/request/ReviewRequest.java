package com.nguyenthanhbang.foodordering.dto.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequest {
    private Long restaurantId;
    private int rating;
}
