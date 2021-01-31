package by.usovich.service.Imp;


import by.usovich.Repository.dao.VideoDaoInterface;
import by.usovich.dto.StreamAndVideoDto.VideoDto.VideoDto;
import by.usovich.dto.StreamAndVideoDto.VideoDto.VideoJsonDto;
import by.usovich.entity.VideoEntity;
import by.usovich.service.VideoServiceInterface;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by yanus on 8/19/2017.
 */
@Service("videoServiceImp")
public class VideoServiceImplement implements VideoServiceInterface {

    @Autowired
    public VideoDaoInterface PostDaoImp;

    private static final Logger log = Logger.getLogger(StreamServiceImplement.class);

    public VideoJsonDto getVideoAtNameGame(int countView, String nameTheme, String numberOfPosts) {//получение множества последних постов

        int numberPosts = Integer.parseInt(numberOfPosts);

        VideoJsonDto videoJsonDto = new VideoJsonDto();

        if (getNameTablePost(nameTheme).equals("")) {

            //Debbug


        } else {

            List videoEntity = null;//список постов для парса в Map(Controller)
            videoEntity = PostDaoImp.getVideoAtTitel(getNameTablePost(nameTheme));

            if ((videoEntity.size() == 0) || videoEntity == null) {

                log.error("Сущность не получена(VideoEntity)");

                //желательно пустой объект
                return null;

            } else {

                log.info("Сущность получена");

                getLastVideo(countView, videoEntity, videoJsonDto);

            }
        }

        return videoJsonDto;//DAO
    }

    private void getLastVideo(int countView, List videoEntity, VideoJsonDto videoJsonDto) {//получение последних постов добавленных в БД

        for (int temp = 0; countView > temp; temp++) {//получение последних постов добавленных в БД

            int sizeList = videoEntity.size();

            videoJsonDto.putVideo(getPostEntityInPostDto((VideoEntity)
                    videoEntity.get(sizeList - temp - 1)));//Получение из списка ENITITYpost в DTOpost

        }
    }

    private VideoDto getPostEntityInPostDto(VideoEntity videoEntity) {

        if (false) {
            return null;
        } else {
            return new VideoDto(videoEntity.get_titel(), videoEntity.get_name(),
                    videoEntity.get_refVideo(), videoEntity.get_refImage(), videoEntity.get_data());
        }

    }

    //вынести в отдельный класс
    private String getNameTablePost(String nameGame) {

        if (nameGame.equals("paragon")) {
//            return "tablePARAGON";
            return "paragon";
        }
        if (nameGame.equals("cs")) {
//            return "tableCS";
            return "cs";
        }
        if (nameGame.equals("dota")) {
//            return "tableDOTA";
            return "dota";
        }
        if (nameGame.equals("wot")) {
//            return "tableWOT";
            return "wot";
        }

        return "";
    }
}
