package com.nguyenthanhbang.foodordering.model;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Embeddable
public class RestaurantFavourite {
    private String name;
    private String description;
    @Column(length = 1000)
    private List<String> images = new ArrayList<>();
}
