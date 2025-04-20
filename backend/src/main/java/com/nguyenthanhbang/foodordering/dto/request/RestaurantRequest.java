package com.nguyenthanhbang.foodordering.dto.request;

import com.nguyenthanhbang.foodordering.model.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.List;
@Getter
public class RestaurantRequest {
    @NotBlank(message = "Name must not be blank")
    private String name;
    @NotBlank(message = "Description must not be blank")
    private String description;
    @NotBlank(message = "OpeningHours must not be blank")
    private String openingHours;
    @NotBlank(message = "ContactInformation must not be null")
    private ContactInformation contactInformation;
    @NotEmpty(message = "Images must not be empty")
    private List<String> images;
    @NotNull(message = "Address must not be null")
    private Address address;
}
