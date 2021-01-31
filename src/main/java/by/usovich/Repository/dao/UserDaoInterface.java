package by.usovich.Repository.dao;

/**
 * Created by yanus on 7/14/2017.
 */

import java.util.List;

public interface UserDaoInterface extends CRUDofEntitiesInterface {

    boolean isLoginExists(String login);

    boolean isEmailExists(String email);

    boolean isPassword(String password);

    List getUserEntityByLogin(String login);

    Integer getVisitSite();
}
