package by.usovich.controllers;

import by.usovich.dto.TourneyDto;
import by.usovich.service.TourneyServiceInterface;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.Map;

/**
 * Created by yansolo on 19.05.2018.
 */
@Controller
public class TourneyController {


    public TourneyServiceInterface tourneyServiceImp;

    @RequestMapping(value = "/getTourney", method = RequestMethod.GET)
    public @ResponseBody
    String getTourney(HttpSession session, Model model) {

        //int numInt = 10;
        String numStr = "2";

        String titel = "dota";

        Map<String, TourneyDto> response = null;

        //ToDo


        //    String string = newsServiceImp.getNewsAtNameGame(titel,numStr).getJsonArray().toString();//for debbug

        return tourneyServiceImp.getTourneyAtNameGame(titel, numStr).getMap().toString();
    }
}
