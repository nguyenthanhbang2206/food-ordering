package com.nguyenthanhbang.foodordering.enums;


public enum Gender {
    MALE("nam"), FEMALE("nữ"), OTHER("khác");
    private final String description;

    Gender(String description) {
        this.description = description;
    }
}
