package com.nguyenthanhbang.foodordering.validator;

import com.nguyenthanhbang.foodordering.dto.request.CreateUserRequest;
import com.nguyenthanhbang.foodordering.service.UserService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RegisterValidator implements ConstraintValidator<ValidRegister, CreateUserRequest> {
    private final UserService userService;
    @Override
    public void initialize(ValidRegister constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(CreateUserRequest request, ConstraintValidatorContext constraintValidatorContext) {
        boolean isValid = true;
        if(!request.getPassword().equals(request.getConfirmPassword())) {
            constraintValidatorContext.buildConstraintViolationWithTemplate("Confirm password does not match")
                    .addPropertyNode("confirmPassword")
                    .addConstraintViolation()
                    .disableDefaultConstraintViolation();
            isValid = false;
        }
        return isValid;
    }
}
