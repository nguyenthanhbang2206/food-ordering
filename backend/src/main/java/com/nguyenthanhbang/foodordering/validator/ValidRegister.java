package com.nguyenthanhbang.foodordering.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Constraint(validatedBy = {RegisterValidator.class})
@Target({ TYPE })
@Retention(RUNTIME)
public @interface ValidRegister {
    String message() default "Register invalid";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
