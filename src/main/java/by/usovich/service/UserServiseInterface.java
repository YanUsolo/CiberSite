package by.usovich.service;

import by.usovich.dto.LoginAndRegDto.RegDto;
import by.usovich.dto.UserDto;

/**
 * Created by yanus on 7/11/2017.
 */
public interface UserServiseInterface {

    boolean isLoginExists(String login);

    boolean isEmailExists(String email);

    boolean isPasswordExists(String password);

    void createUser(RegDto profile);

    void deleteUser(UserDto profile);

    void incrementJoinInTheGame(String loginUser, String titelGame);

    Integer getVisitTheSite();
}
