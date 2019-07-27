package by.usovich.dao;

/**
 * Created by yanus on 7/14/2017.
 */
import by.usovich.entity.UserEntity;

import java.util.*;
public interface UserDaoInterface {

     boolean isLoginExists(String login);

     boolean isEmailExists(String email);

     boolean isPassword(String password);

     List getUserEntityByLogin(String login);

    void createUser(UserEntity userEntity);

    void deleteUser(UserEntity userEntity);

    void updateUser(UserEntity userEntity);

    Integer getVisitSite();

}
