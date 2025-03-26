package com.nguyenthanhbang.foodordering.dto.request;

import com.nguyenthanhbang.foodordering.enums.Gender;
import com.nguyenthanhbang.foodordering.enums.Role;
import lombok.Getter;

@Getter
public class UpdateUserRequest {
    private String email;
    private String fullName;
    private String avatar;
    private Gender gender;
}
