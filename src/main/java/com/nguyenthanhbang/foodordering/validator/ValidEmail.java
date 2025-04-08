package com.nguyenthanhbang.foodordering.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;


import java.lang.annotation.*;

@Target(ElementType.FIELD)
@Constraint(validatedBy = {EmailValidator.class})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ValidEmail {
    boolean checkExists() default false;
    String message() default "Invalid email format";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
