package com.nguyenthanhbang.foodordering.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Statistics {
    private long totalOrders;
    private long totalFoods;
}
