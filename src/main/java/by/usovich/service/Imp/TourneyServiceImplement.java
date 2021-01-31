package by.usovich.service.Imp;

import by.usovich.Repository.dao.TourneyDaoInterface;
import by.usovich.dto.TourneyDto;
import by.usovich.dto.TourneyJsonDto;
import by.usovich.entity.TourneyEntity;
import by.usovich.service.TourneyServiceInterface;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by yansolo on 19.05.2018.
 */
@Service("tourneyService")
public class TourneyServiceImplement implements TourneyServiceInterface {

    @Autowired
    TourneyDaoInterface tourneyDaoImp;
    private static final Logger log = Logger.getLogger(TourneyServiceImplement.class);

    public TourneyJsonDto getTourneyAtNameGame(String nameTheme, String numberOfPosts)
    {
       // String titel = getNameTablePost(nameTheme);



        int numberPosts = Integer.parseInt(numberOfPosts);

        TourneyJsonDto tourneyJsonDto = new TourneyJsonDto();

        if(!getNameTablePost(nameTheme).equals("")){

            //Debbug
            log.info("True");

            List tourneyEntity = null;//список постов для парса в Map(Controller)
            tourneyEntity = tourneyDaoImp.getTourneyAtTitel(getNameTablePost(nameTheme));

            if (tourneyEntity.size() == 0) {

                log.error("Сущность не получена");

            } else {

                log.info("Сущность получена");

                if(tourneyEntity.size() <= numberPosts-1){

                    numberPosts = tourneyEntity.size();
                }

                getLastTourney(numberPosts, tourneyEntity, tourneyJsonDto);
                   // session.setAttribute("indexNews",displayedNews-3);


            }
        }
        return tourneyJsonDto;//DAO
    }

    @Override
    public TourneyJsonDto getTourneyAtNameGame(String nameTheme) {

        TourneyJsonDto tourneyJsonDto = new TourneyJsonDto();

        if(getNameTablePost(getTitelFromTheme(nameTheme)).equals("")) {

            //Debbug
            log.info("True");
        } else {

            List tourneyEntity = null;//список постов для парса в Map(Controller)
            tourneyEntity = tourneyDaoImp.getTourneyAtTitel(getNameTablePost(getTitelFromTheme(nameTheme)));

            if (tourneyEntity.size() == 0) {

                log.error("Сущность не получена");

            } else {

                log.info("Сущность получена");


                for (int temp = 0; tourneyEntity.size() > temp; temp++) {//получение последних постов добавленных в БД

                    int sizeList = tourneyEntity.size();

                    tourneyJsonDto.putPostInJsonForViewPage(getPostEntityInPostDto((TourneyEntity)
                            tourneyEntity.get(sizeList - temp - 1)));//Получение из списка ENITITYpost в DTOpost

                }
            }
        }
        return tourneyJsonDto;//DAO
    }

    private TourneyDto getPostEntityInPostDto(TourneyEntity postEntity){

        if(false){
            return null;
        }else{
            return new TourneyDto(postEntity.get_id() + "",postEntity.get_titel(), postEntity.get_name(),postEntity.get_date(),
                    postEntity.get_fund(),postEntity.get_refImage());
        }

    }

    private void getLastTourney(int countLastTourney, List tourneyEntity, TourneyJsonDto tourneyJsonDto) {//получение последних постов добавленных в БД

        for (int temp = 0; countLastTourney > temp; temp++) {//получение последних постов добавленных в БД

            int sizeList = tourneyEntity.size();

            tourneyJsonDto.putPost(getPostEntityInPostDto((TourneyEntity)
                    tourneyEntity.get(sizeList - temp - 1)));//Получение из списка ENITITYpost в DTOpost


        }
    }


    private String getNameTablePost(String nameGame) {

        if (nameGame.equals("paragon")) {
            return "tablePARAGON";
        }
        if (nameGame.equals("cs")) {
            return "tableCS";
        }
        if (nameGame.equals("dota")) {
            return "tableDOTA";
        }
        if (nameGame.equals("wot")) {
            return "tableWOT";
        }

        return "";
    }

    private String getTitelFromTheme(String theme) {//Получение темы с сайта Cibersite со своим Titel

        switch (theme.charAt(0)) {
            case '1':
                return "cs";
            case '2':
                return "paragon";
            case '3':
                return "dota";
            case '4':
                return "wot";
            case 'c':
                return "cs";
            case 'p':
                return "paragon";
            case 'd':
                return "dota";
            case 'w':
                return "wot";
            default:
                return "wot";
        }
    }
}
