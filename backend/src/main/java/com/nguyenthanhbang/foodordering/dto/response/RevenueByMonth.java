package com.nguyenthanhbang.foodordering.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RevenueByMonth {
    private long month;
    private long revenue;
}
