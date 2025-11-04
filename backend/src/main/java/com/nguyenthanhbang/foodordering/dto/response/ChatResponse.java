package com.nguyenthanhbang.foodordering.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChatResponse {
    private String message;
    private List<FoodRecommendation> data;
    @Getter
    @Setter
    public static class FoodRecommendation {
        private Long id;
        private String name;
        private long price;
        private String cuisine;
    }
}
