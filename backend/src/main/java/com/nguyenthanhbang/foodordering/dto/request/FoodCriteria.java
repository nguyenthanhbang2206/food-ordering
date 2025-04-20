package com.nguyenthanhbang.foodordering.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FoodCriteria {
    private Boolean available = true;
    private String cuisine;
    private Boolean vegetarian;
    private Boolean spicy;
    private String category;
    private List<String> prices;
}
