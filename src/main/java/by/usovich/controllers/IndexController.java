package by.usovich.controllers;

import by.usovich.dto.StreamAndVideoDto.CreateStreamAndVideoDto;
import by.usovich.dto.NewsDto.CreateNewsDto;
import by.usovich.service.*;
import by.usovich.service.Imp.SreamsVideoNewsCreatorServiceImlement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * Created by yanus on 8/7/2017.
 */
@Controller
public class IndexController {

    @Autowired
    public VideoServiceInterface videoServiceImp;

    @Autowired
    public StreamServiceInterface streamServiceImp;

    @Autowired
    public StreamVideoServiceInterface streamVideoServiceImp;

    @Autowired
    public TourneyServiceInterface tourneyServiceImp;

    @Autowired
    public NewsServiceInterface newsServiceImp;

    @Autowired
    public SreamsVideoNewsCreatorServiceImlement sreamsVideoNewsCreatorServiceImlement;

    @Autowired
    public UserServiseInterface userServiseImp;

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String getNewPage(HttpSession session, Model model) {


        if (session.getAttribute("isExist") == null) {
            model.addAttribute("isExist", false);
            session.setAttribute("isExist", false);

        }

        userServiseImp.isLoginExists("YanSoLo");


        return "index";
        // return "index";
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String emptyUrl(HttpSession session, Model model) {


       userServiseImp.getVisitTheSite();
        if (session.getAttribute("isExist") == null) {
            model.addAttribute("isExist", false);
            session.setAttribute("isExist", false);
            System.out.println("fmgokdmfgokmdohmdogmh");
        }

        userServiseImp.isLoginExists("YanSoLo");
        return "index";
    }


    @RequestMapping(value = "main-page-wot", method = RequestMethod.GET)
    public String getMainPageWot(HttpSession session, Model model) {

        String number = "8";

        String titel = "wot";

        model.addAttribute("Video", streamVideoServiceImp.getVideoAtNameGame(8, titel, number).getMap());

        model.addAttribute("Stream", streamVideoServiceImp.getStreamAtNameGame(8, titel, number).getMap());

        model.addAttribute("Tourney", tourneyServiceImp.getTourneyAtNameGame(titel, number).getMap());

        System.out.println(streamVideoServiceImp.getVideoAtNameGame(8, titel, number).getMap().toString());

        System.out.println(tourneyServiceImp.getTourneyAtNameGame(titel, number).getMap().toString());

        session.getAttribute("login");

        if (!(session.getAttribute("login") == null)) {

            userServiseImp.incrementJoinInTheGame(session.getAttribute("login") + "", "wot");
        }

        return "mainPageWot";
    }

    @RequestMapping(value = "main-page-cs", method = RequestMethod.GET)
    public String getMainPageDota(HttpSession session, Model model) {

        String number = "8";

        String titel = "cs";

        model.addAttribute("Video", streamVideoServiceImp.getVideoAtNameGame(8, titel, number).getMap());

        model.addAttribute("Stream", streamVideoServiceImp.getStreamAtNameGame(8, titel, number).getMap());

        model.addAttribute("Tourney", tourneyServiceImp.getTourneyAtNameGame(titel, number).getMap());

        System.out.println(streamVideoServiceImp.getVideoAtNameGame(8, titel, number).getMap().toString());

        System.out.println(tourneyServiceImp.getTourneyAtNameGame(titel, number).getMap().toString());

        if (!(session.getAttribute("login") == null)) {

            userServiseImp.incrementJoinInTheGame(session.getAttribute("login") + "", "cs");
        }

        return "mainPageCs";
    }

    @RequestMapping(value = "main-page-paragon", method = RequestMethod.GET)
    public String getMainPageCs(HttpSession session) {

        if (!(session.getAttribute("login") == null)) {

            userServiseImp.incrementJoinInTheGame(session.getAttribute("login") + "", "paragon");
        }
        return "mainPageParagon";
    }

    @RequestMapping(value = "main-page-dota", method = RequestMethod.GET)
    public String getMainPageParagon(HttpSession session) {

        if (!(session.getAttribute("login") == null)) {

            userServiseImp.incrementJoinInTheGame(session.getAttribute("login") + "", "dota");
        }

        return "mainPageDota";
    }


    @RequestMapping(value = "/createSteamOrVideoPage", method = RequestMethod.GET)
    public String getCreateStreanAndVideoPage(HttpSession session) {

        System.out.println("Get page for create Stream and Video");
        return "createStreamsAndVideo";
    }

    @RequestMapping(value = "/createNewsPage", method = RequestMethod.GET)
    public String getCreateNewsPage(HttpSession session) {

        System.out.println("Get page for create News");
        return "createNews";
    }

    @RequestMapping(value = "/deletePostsPage", method = RequestMethod.GET)
    public String getDeletePostsPage(HttpSession session) {

        System.out.println("Get page for delete Posts");
        return "deletePosts";
    }

    @RequestMapping(value = "/getViewPage", method = RequestMethod.GET)
    public String getViewPage(HttpSession session, Model model) {

        System.out.println("Get page for view all data");

        String titel = "wot";

        //   model.addAttribute("news",   newsServiceImp.getNewsAtNameGame(titel).getMap());

        //   model.addAttribute("stream",   streamVideoServiceImp.getStreamAtNameGame(titel).getMap());

        //    model.addAttribute("video",   streamVideoServiceImp.getVideoAtNameGame(titel).getMap());

        //   model.addAttribute("tourney",   tourneyServiceImp.getTourneyAtNameGame(titel).getMap());


        return "viewPage";
    }


    @RequestMapping(value = "/createSteamOrVideo", method = RequestMethod.POST)
    public String setCreateStreanAndVideo(HttpSession session,
                                          @ModelAttribute("createVideoAndStreamDto") CreateStreamAndVideoDto createVideoAndStreamDto) {

        System.out.println("Well done");

        System.out.println("Type :" + createVideoAndStreamDto.getType());

        System.out.println("Titel :" + createVideoAndStreamDto.getTitel());

        System.out.println("Name :" + createVideoAndStreamDto.getName());

        System.out.println("refImage :" + createVideoAndStreamDto.getRefImage());

        System.out.println("refVideo :" + createVideoAndStreamDto.getRefVideo());

        System.out.println("Date :" + createVideoAndStreamDto.getDate());

        System.out.println(sreamsVideoNewsCreatorServiceImlement.setVideoOrStream(createVideoAndStreamDto) + "Good!!!");

        return "createStreamsAndVideo";
    }


    @RequestMapping(value = "/deletePost", method = RequestMethod.POST)
    public String setDeletePost(HttpSession session,
                                @RequestParam(name = "type") String type,
                                @RequestParam(name = "id") int id) {

        System.out.println("Well done");

        System.out.println("Type : " + type);

        System.out.println("Id : " + type);


        switch (type) {
            case "news":
                newsServiceImp.deleteNews(id);
                break;
            case "stream":
                streamVideoServiceImp.deleteStreamVideo(type, id);
                break;
            case "video":
                streamVideoServiceImp.deleteStreamVideo(type, id);
                break;
            default:
                System.out.println("Don't have type");
        }


        return "deletePosts";
    }


    @RequestMapping(value = "/getPostForView", method = RequestMethod.POST, produces = "application/json")
    public @ResponseBody
    String getPostsForTitelAndTableGET(HttpSession session,
                                       @RequestParam(name = "titel") String titel,
                                       @RequestParam(name = "table") String table) {

        System.out.println("Well done");
        System.out.println("titel" + titel);
        System.out.println("table" + table);

        String string = "";

        if (table.equals("news")) {

        }

        switch (table) {
            case "news":
                string = newsServiceImp.getNewsAtNameGame(titel).getJsonArray().toString();
                break;
            case "video":
                string = streamVideoServiceImp.getVideoAtNameGame(titel).getJsonArray().toString();
                break;
            case "stream":
                string = streamVideoServiceImp.getStreamAtNameGame(titel).getJsonArray().toString();
                break;
            case "tourney":
                string = tourneyServiceImp.getTourneyAtNameGame(titel).getJsonArray().toString();
                break;
        }

        System.out.println("Json : " + string);
        return string;
    }


}
