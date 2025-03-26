package com.nguyenthanhbang.foodordering.dto.request;

import com.nguyenthanhbang.foodordering.model.*;
import lombok.Getter;

import java.util.List;
@Getter
public class RestaurantRequest {
    private String name;
    private String description;
    private String openingHours;
    private ContactInformation contactInformation;
    private List<String> images;
    private Address address;
}
