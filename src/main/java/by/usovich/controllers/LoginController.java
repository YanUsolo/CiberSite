package by.usovich.controllers;

import by.usovich.dto.LoginAndRegDto.LoginDto;
import by.usovich.service.UserServiseInterface;
import by.usovich.validators.LoginValidator;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * Created by yanus on 7/11/2017.
 */

@Controller
public class LoginController {

    //ToDo
    public LoginValidator validator = new LoginValidator();

    private static final Logger log = Logger.getLogger(LoginController.class);

    @Autowired
    public UserServiseInterface userServiseImp;


    @RequestMapping(value = "/login",method = RequestMethod.GET)
    public String getPageLogin(HttpSession session, @ModelAttribute("userDto") LoginDto userDto){

        LoginDto userDtoTipoFromBD = new LoginDto("SoLo@gmail.com","SoLo","www");


       // validator.validate(UserDto,result);

        if(false){
            return "login";
        }else{

            if(true) {//Поиск user from BD ПО логину

                if(true) {//Проверка на пароль

                }
                else{
                    //ToDo
                    //Неверный пароль
                }
            }
            else{
                //ToDo
                //Неверный логин
            }
        }



        return "login";
    }


    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String Login(@ModelAttribute("loginDto") LoginDto userDto, HttpSession session,Model model){


        System.out.println("\n" + userDto.getEmail() + "   " + userDto.getNick() + "   " + userDto.getPassword() + "   ");

        if(userServiseImp.isLoginExists(userDto.getNick() +"") && userServiseImp.isPasswordExists(userDto.getPassword())){
            session.setAttribute("isExist",true);
            session.setAttribute("login",userDto.getNick());
            System.out.println("------------------" + userDto.getNick());
            return "redirect:main-page-wot";
        }

        return "login";
    }

}
