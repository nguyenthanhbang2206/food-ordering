package com.nguyenthanhbang.foodordering.dto.request;


import lombok.Getter;

@Getter
public class ReviewRequest {
    private Long restaurantId;
    private int rating;
}
