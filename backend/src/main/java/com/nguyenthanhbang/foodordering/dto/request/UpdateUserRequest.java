package com.nguyenthanhbang.foodordering.dto.request;

import com.nguyenthanhbang.foodordering.enums.Gender;
import com.nguyenthanhbang.foodordering.enums.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class UpdateUserRequest {
    @NotBlank(message = "FullName must not be blank")
    private String fullName;
    @NotBlank(message = "Avatar must not be blank")
    private String avatar;
    private Gender gender;
}
