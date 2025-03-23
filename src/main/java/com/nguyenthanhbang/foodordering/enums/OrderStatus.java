package com.nguyenthanhbang.foodordering.enums;

import lombok.AllArgsConstructor;

public enum OrderStatus {
    PENDING("Chờ xử lý"),
    PROCESSING("Đang xử lý"),
    DELIVERED("Đã giao hàng"),
    CANCELLED("Đã hủy");
    private final String description;

    OrderStatus(String description) {
        this.description = description;
    }
}
