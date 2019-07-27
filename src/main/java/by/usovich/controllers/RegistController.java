package by.usovich.controllers;


import by.usovich.dto.LoginAndRegDto.RegDto;
import by.usovich.service.UserServiseInterface;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;

/**
 * Created by yanus on 7/12/2017.
 */

@Controller
public class RegistController {

    private static final Logger log = Logger.getLogger(RegistController.class);

    @Autowired
    public UserServiseInterface userServiseImp;

    @RequestMapping( value = "/reg" , method = RequestMethod.GET)
    public String getPageReg(HttpSession session){

        return "regis";
    }

    @RequestMapping( value = "/reg" , method = RequestMethod.POST)
    public String Reg(HttpSession session,@ModelAttribute("regDto") RegDto regDto){

        //System.out.println("\n" + regDto.getNick() + "\n" + regDto.getEmail() + "\n"  + regDto.getPassword() + "\n" + regDto.getRepassword() + "\n");


        log.info("\n" + "Login : " + regDto.getLogin() + "\n" + "Email : " + regDto.getEmail() +
                "\n" + "Password : " + regDto.getPassword() + "\n" + "Repassword : " + regDto.getRepassword() +
                "\n" + "Country : " + regDto.getCountry() + "\n" + "Games : " + regDto.toStringForGames());

        userServiseImp.isLoginExists(regDto.getLogin());

        userServiseImp.isEmailExists(regDto.getEmail());

        userServiseImp.isPasswordExists(regDto.getPassword());

        userServiseImp.createUser(regDto);

        //userServiseImp.deleteUser(regDto);

//        if(!userServiseImp.isLoginExists(regDto.getLogin())){
//
//            if(!userServiseImp.isEmailExists(regDto.getEmail())){
//
//                if(!userServiseImp.isPasswordExists(regDto.getPassword())){
//
//
//                }
//            }
//        }

        return "regis";
    }


}
