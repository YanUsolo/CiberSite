package by.usovich.validators;

import by.usovich.dto.LoginAndRegDto.LoginDto;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

/**
 * Created by yanus on 7/12/2017.
 */
public class LoginValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return LoginDto.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "login", "empty.login", "Login mustn't be empty.");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "empty.password", "password mustn't be empty.");
    }
}

