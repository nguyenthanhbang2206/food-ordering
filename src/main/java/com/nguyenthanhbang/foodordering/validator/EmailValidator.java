package com.nguyenthanhbang.foodordering.validator;

import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.UserRepository;
import com.nguyenthanhbang.foodordering.service.UserService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;

@RequiredArgsConstructor
public class EmailValidator implements ConstraintValidator<ValidEmail, String> {
    private boolean checkExists;
    private final UserRepository userRepository;
    @Override
    public void initialize(ValidEmail constraintAnnotation) {
        this.checkExists = constraintAnnotation.checkExists();
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        if(!StringUtils.hasLength(s)){
            return false;
        }
        String regex = "^[\\w!#$%&amp;'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&amp;'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
        boolean valid = true;
        if(!s.matches(regex)){
            valid = false;
        }else {
            if(this.checkExists) {
                boolean existsByEmail = userRepository.existsByEmail(s);
                if(existsByEmail) {
                    constraintValidatorContext
                            .buildConstraintViolationWithTemplate("Email already exists")
                            .addConstraintViolation()
                            .disableDefaultConstraintViolation();
                    valid = false;
                }
            }
        }
        return valid;
    }
}
