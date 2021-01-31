package by.usovich.service.Imp;

import by.usovich.Repository.dao.UserDaoInterface;
import by.usovich.dto.LoginAndRegDto.RegDto;
import by.usovich.dto.UserDto;
import by.usovich.entity.GamesEntity;
import by.usovich.entity.UserEntity;
import by.usovich.service.UserServiseInterface;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by yanus on 7/11/2017.
 */
@Service
public class UserServiceImplement implements UserServiseInterface {

    public Logger log = Logger.getLogger(UserServiceImplement.class);

    @Autowired
    public UserDaoInterface userDaoImp;

    @Override
    public Integer getVisitTheSite() {

        //   return  userDaoImp.getVisitSite();
        return 1;
    }

    @Override
    public void incrementJoinInTheGame(String loginUser, String titelGame) {

        UserEntity userEntity = (UserEntity) userDaoImp.getUserEntityByLogin(loginUser).get(0);

        GamesEntity gamesEntity = userEntity.getGamesEntity();

        switch (titelGame) {

            case "cs":
                gamesEntity.setNumberVisitCs(gamesEntity.getNumberVisitCs() + 1);
                break;
            case "wot":
                gamesEntity.setNumberVisitWOT(gamesEntity.getNumberVisitWOT() + 1);
                break;
            case "paragon":
                gamesEntity.setNumberVisitParagon(gamesEntity.getNumberVisitParagon() + 1);
                break;
            case "dota":
                gamesEntity.setNumberVisitDota(gamesEntity.getNumberVisitDota() + 1);
                break;

        }

        userEntity.setGamesEntity(gamesEntity);

        userDaoImp.updateEntity(userEntity);

        // System.out.println(userEntity.getGamesEntity() + "");
    }

    public boolean isLoginExists(String login) {

        if (userDaoImp.getUserEntityByLogin(login).size() > 0) {
            log.info("Login :" + login + " is in the BD");
            System.out.println("" + (userDaoImp.getUserEntityByLogin(login).toString()));
            return true;
        } else {
            log.info("Login :" + login + " is NOT in the BD");
            return false;
        }

    }


    public boolean isEmailExists(String email) {

        if (userDaoImp.isEmailExists(email)) {
            log.info("Email :" + email + " is in the BD");
            return true;
        } else {
            log.info("Email :" + email + " is NOT in the BD");
            return false;
        }
    }


    public boolean isPasswordExists(String password) {

        if (userDaoImp.isPassword(password)) {
            log.info("Password :" + password + " is in the BD");
            return true;
        } else {
            log.info("Password :" + password + " is NOT in the BD");
            return false;
        }
    }


    @Override
    public void deleteUser(UserDto userDto) {

        UserEntity userEntityFromBD = (UserEntity) userDaoImp.getUserEntityByLogin(userDto.getLogin()).get(0);

        userDaoImp.deleteEntity(userEntityFromBD);

    }

    private boolean hadleListFromBD(List list) {
        if (!(list == null)) {
            log.info("Find Entity in BD");
            return true;
        } else {
            log.info("Not Find Entity in BD");
            return false;
        }
    }


    @Override
    public void createUser(RegDto regDto) {

        UserEntity userEntity = new UserEntity();

        userEntity.set_login(regDto.getLogin());
        userEntity.set_password(regDto.getPassword());
        userEntity.set_email(regDto.getEmail());
        userEntity.set_country(regDto.getCountry());


        GamesEntity gamesEntity = new GamesEntity();

        userEntity.setGamesEntity(gamesEntity);

        // userDaoImp.createGames(gamesEntity);

        userDaoImp.createEntity(userEntity);


    }


}
