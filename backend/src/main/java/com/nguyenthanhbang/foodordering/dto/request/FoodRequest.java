package com.nguyenthanhbang.foodordering.dto.request;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.List;

@Getter
public class FoodRequest {
    @NotBlank(message = "Name must not be blank")
    private String name;
    @NotBlank(message = "Description must not be blank")
    private String description;
    @Min(value = 1, message = "Price must be at least 1")
    private long price;
    @NotEmpty(message = "Image must not be empty")
    private List<String> images;
    @NotNull(message = "FoodCategoryId must not be null")
    private Long foodCategoryId;
    @NotEmpty(message = "Ingredients must not be empty")
    private List<Long> ingredients;
    @NotBlank(message = "Cuisine must not be blank")
    private String cuisine;
    private boolean vegetarian;
    private boolean spicy;

}
