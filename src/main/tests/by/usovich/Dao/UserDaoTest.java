package by.usovich.Dao;


import by.usovich.Repository.dao.UserDaoInterface;
import by.usovich.entity.UserEntity;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.testng.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "/BeansContextForTests.xml"})
public class UserDaoTest {

    @Autowired
    UserDaoInterface userDaoInterface;

    String[] arrayLogin_successful;
    String[] arrayLogin_notSuccessful;

    String[] arrayEmail_successful;
    String[] arrayEmail_notSuccessful;


    @Before
    public void setUp() {

        arrayLogin_successful = new String[]{"YanSoLo1", "YanSoLo2", "YanSoLo3", "YanSoLo10"};
        arrayLogin_notSuccessful = new String[]{"lolkek", "bob3546456", "gdfgsdsokjgd", "dijngidnbv"};

        arrayEmail_successful = new String[]{"1231@email.com", "1232@email.com", "1235@email.com", "12310@email.com"};
        arrayEmail_notSuccessful = new String[]{"dfgdfg@email.com", "ghfghfgh@email.com", "hgjghjkgh@email.com", "asdfsdgsdfhg@email.com"};
    }


    @Test
    public void isLoginExists_ofUser_Successful() {

        for (String login : arrayLogin_successful) {

            assertTrue(userDaoInterface.isLoginExists(login));
        }
    }

    @Test
    public void isLoginExists_ofUser_notSuccessful() {

        for (String login : arrayLogin_notSuccessful) {

            assertFalse(userDaoInterface.isLoginExists(login));
            ;
        }
    }


    @Test
    public void isEmailExists_ofUser_Successful() {

        for (String email : arrayEmail_successful) {

            assertTrue(userDaoInterface.isEmailExists(email));
        }
    }

    @Test
    public void isEmailExists_ofUser_notSuccessful() {

        for (String email : arrayEmail_notSuccessful) {

            assertFalse(userDaoInterface.isEmailExists(email));
        }
    }


    @Test
    public void getUserEntityByLogin_checkHasUserEntity_Successful() {

        for (String login : arrayLogin_successful) {

            UserEntity userEntity = (UserEntity) userDaoInterface.getUserEntityByLogin(login).get(0);

            assertTrue(userEntity.get_login().equals(login));
        }
    }

    @Test
    public void getUserEntityByLogin_checkHasUserEntity_notSuccessful() {

        assertThrows(IndexOutOfBoundsException.class, () -> {

            for (String login : arrayLogin_notSuccessful) {

                UserEntity userEntity = (UserEntity) userDaoInterface.getUserEntityByLogin(login).get(0);

                assertFalse(userEntity.get_login().equals(login));
            }
        });
    }


}
