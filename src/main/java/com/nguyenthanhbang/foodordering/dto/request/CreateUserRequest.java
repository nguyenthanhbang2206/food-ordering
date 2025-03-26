package com.nguyenthanhbang.foodordering.dto.request;

import com.nguyenthanhbang.foodordering.enums.Role;
import lombok.Getter;

@Getter
public class CreateUserRequest {
    private String email;
    private String password;
    private String fullName;
    private Role role;
}
