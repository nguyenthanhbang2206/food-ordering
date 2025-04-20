package com.nguyenthanhbang.foodordering.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class PaginationResponse {
    private Pagination pagination;
    private Object items;

    @Getter
    @Setter
    @Builder
    public static class Pagination {
        private int page;
        private int size;
        private int totalPages;
        private long totalItems;
    }
}
