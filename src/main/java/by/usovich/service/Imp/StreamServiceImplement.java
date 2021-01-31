package by.usovich.service.Imp;

import by.usovich.Repository.dao.StreamsDaoInterface;
import by.usovich.dto.StreamAndVideoDto.StreamDto.StreamDto;
import by.usovich.dto.StreamAndVideoDto.StreamDto.StreamJsonDto;
import by.usovich.entity.StreamEntity;
import by.usovich.service.StreamServiceInterface;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by yanus on 8/19/2017.
 */
@Service("streamServiceImp")
public class StreamServiceImplement implements StreamServiceInterface {


    @Autowired
    public StreamsDaoInterface streamsDaoImp;

    private static final Logger log = Logger.getLogger(StreamServiceImplement.class);

    public StreamJsonDto getStreamAtNameGame(String nameTheme, String numberOfPosts) {//получение множества последних постов

        int numberPosts = Integer.parseInt(numberOfPosts);

        StreamJsonDto streamJsonDto = new StreamJsonDto();

        if (getNameTablePost(nameTheme).equals("")) {

            //Debbug

        } else {

            List streamEntity = null;//список постов для парса в Map(Controller)
            streamEntity = streamsDaoImp.getStreamAtTitle(getNameTablePost(nameTheme));

            if (streamEntity.size() == 0) {

                log.error("Сущность не получена(StreamEntity)");

            } else {

                getLastNews(0, streamEntity, streamJsonDto);
                log.info("Сущность получена");
            }
        }

        return streamJsonDto;//DAO
    }


    private void getLastNews(int displayedNews, List newsEntity, StreamJsonDto newsJsonDto) {//получение последних постов добавленных в БД


        for (int temp = displayedNews; displayedNews + 3 > temp; temp++) {//получение последних постов добавленных в БД

            int sizeList = newsEntity.size();

            newsJsonDto.putStream(getPostEntityInPostDto((StreamEntity)
                    newsEntity.get(sizeList - temp - 1)));//Получение из списка ENITITYpost в DTOpost

        }

    }

    private StreamDto getPostEntityInPostDto(StreamEntity streamEntity) {

        if (false) {
            return null;
        } else {
            return new StreamDto(streamEntity.get_titel(), streamEntity.get_name(),
                    streamEntity.get_refVideo(), streamEntity.get_refImage(), streamEntity.get_data());
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
}
