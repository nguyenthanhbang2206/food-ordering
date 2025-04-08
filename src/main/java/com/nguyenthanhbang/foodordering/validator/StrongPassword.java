package com.nguyenthanhbang.foodordering.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Constraint(validatedBy = { StrongPasswordValidator.class })
@Target({ FIELD })
@Retention(RUNTIME)
public @interface StrongPassword {
    String message() default "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, one special character, and must not contain any whitespace";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
