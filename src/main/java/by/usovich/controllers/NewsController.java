package by.usovich.controllers;


import by.usovich.dto.NewsDto.CreateNewsDto;
import by.usovich.dto.NewsDto.NewsDto;
import by.usovich.service.NewsServiceInterface;
import java.util.*;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * Created by yanus on 15.05.2017.
 */


@Controller
public class NewsController {

    //private final Logger;

    @Autowired
    public NewsServiceInterface newsServiceImp;


    private static final Logger log = Logger.getLogger(NewsController.class);

//    @RequestMapping(value = "/index",method = RequestMethod.POST)
//    public String getNewPageWithNews(@RequestParam String titel, @RequestParam String number, HttpSession session, Model model){
//
//
//        model.addAttribute("posts",newsServiceImp.getNewsAtNameGame(titel,number).getMap());
//
//        return "index";
//    }


    @RequestMapping(value = "/getNews",method = RequestMethod.GET)
    public @ResponseBody
   // Map<String,PostJsonDto> getNews(@RequestParam("titel") String titel, @RequestParam("number") String number, HttpSession session, Model model){
    String getNewsGet(@RequestParam() String titel, @RequestParam() String number, HttpSession session, Model model){

        Map<String,NewsDto> response = null;

        return newsServiceImp.getNewsAtNameGame(titel,number).getJsonArray().toString();
    }


    @RequestMapping(value = "/getNews",method = RequestMethod.POST,produces = "application/json")
        // Map<String,PostJsonDto> getNews(@RequestParam("titel") String titel, @RequestParam("number") String number, HttpSession session, Model model){
   public @ResponseBody  String getNewsPostAtNumber(@RequestParam(name = "titel") String titel, @RequestParam(name = "numberNews") String newsDeriction, HttpSession session){

        Map<String,NewsDto> response = null;

        String number = "3";

        titel = "dota";

        String string = newsServiceImp.getNewsAtNameGame(titel,number).getJsonArray().toString();

        return string;
    }

    @RequestMapping(value = "/getNews",method = RequestMethod.POST,produces = "application/json")
    public @ResponseBody  String getNewsPostAtDeriction(@RequestParam(name = "titel") String titel, @RequestParam(name = "newsDeriction") String newsDeriction, HttpSession session){

       int numInt = 0;//В сессию
       String numStr = "0";

       //ToDo


        String string = newsServiceImp.getNewsAtNameGame(titel,numStr).getJsonArray().toString();//for debbug

        return string;
    }

    @RequestMapping(value = "/getNewsForCibersite",method = RequestMethod.POST,produces = "application/json")
    public @ResponseBody  String getNewsPostTesting(@RequestParam(name = "theme") String theme, @RequestParam(name = "page") String newsDeriction,
                                                    @RequestParam(name = "newsPerPage") String newsPerPage, HttpSession session){



        if(session.getAttribute("indexNews") == null){
            session.setAttribute("indexNews",-3);
        }


        //ToDo

        System.out.println("NewsController : getNewsForCiberSite");
        String string = newsServiceImp.getNewsAtNameGame(theme,newsDeriction,newsPerPage,session).getJsonArray().toString();//for debbug




        return string;
    }

    @RequestMapping( value = "/createNews", method = RequestMethod.POST)
    public String setCreateNews(HttpSession session, @ModelAttribute("CreateNewsDto")CreateNewsDto createNewsDto) {

        System.out.println("Well done");



        System.out.println("Titel :" + createNewsDto.getTitel());

        System.out.println("Content :" + createNewsDto.getContent());

        System.out.println("Name :" + createNewsDto.getName());

        System.out.println("refImage :" + createNewsDto.getRefImage());

        System.out.println("Date :" + createNewsDto.getDate());

        System.out.println(newsServiceImp.setNewsInBD(createNewsDto) + "Good!!!");
        return "createNews";
    }
}
