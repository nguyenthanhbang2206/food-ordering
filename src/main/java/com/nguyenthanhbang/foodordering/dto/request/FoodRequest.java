package com.nguyenthanhbang.foodordering.dto.request;


import lombok.Getter;

import java.util.List;

@Getter
public class FoodRequest {
    private String name;
    private String description;
    private long price;
    private List<String> images;
    private Long foodCategoryId;
    private List<Long> ingredients;
}
