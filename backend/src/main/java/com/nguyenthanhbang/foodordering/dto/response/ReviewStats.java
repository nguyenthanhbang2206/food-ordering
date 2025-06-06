package com.nguyenthanhbang.foodordering.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewStats {
    int count;
    double averageRating;
}
