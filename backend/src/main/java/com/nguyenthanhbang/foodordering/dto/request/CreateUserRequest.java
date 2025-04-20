package com.nguyenthanhbang.foodordering.dto.request;

import com.nguyenthanhbang.foodordering.enums.Role;
import com.nguyenthanhbang.foodordering.validator.StrongPassword;
import com.nguyenthanhbang.foodordering.validator.ValidEmail;
import com.nguyenthanhbang.foodordering.validator.ValidRegister;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
@ValidRegister
public class CreateUserRequest {
    @ValidEmail(checkExists = true)
    private String email;
    @StrongPassword
    private String password;
    private String confirmPassword;
    @NotBlank(message = "Fullname must not be blank")
    private String fullName;
    private Role role;
}
