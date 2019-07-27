package by.usovich.service.Imp;

import by.usovich.dao.StreamsDaoInterface;
import by.usovich.dao.VideoDaoInterface;
import by.usovich.dto.StreamAndVideoDto.CreateStreamAndVideoDto;
import by.usovich.dto.StreamAndVideoDto.StreamDto.StreamDto;
import by.usovich.dto.StreamAndVideoDto.StreamDto.StreamJsonDto;
import by.usovich.dto.StreamAndVideoDto.VideoDto.VideoDto;
import by.usovich.dto.StreamAndVideoDto.VideoDto.VideoJsonDto;
import by.usovich.entity.StreamEntity;
import by.usovich.entity.VideoEntity;
import by.usovich.service.StreamVideoServiceInterface;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by yansolo on 06.05.2018.
 */
@Service("VideoStreamService")
public class StreamVideoServiceImplement implements StreamVideoServiceInterface {

    @Autowired
    public VideoDaoInterface videoDaoImp;

    @Autowired
    public StreamsDaoInterface streamDaoImp;

    private static final Logger log = Logger.getLogger(StreamServiceImplement.class);

    public VideoJsonDto getVideoAtNameGame(int countView, String nameTheme, String numberOfPosts) {//получение множества последних постов

        int numberPosts = Integer.parseInt(numberOfPosts);

        VideoJsonDto videoJsonDto = new VideoJsonDto();

        if(getNameTablePost(nameTheme).equals("")){

            //Debbug


        }else {

            List videoEntity = null;//список постов для парса в Map(Controller)
            videoEntity = videoDaoImp.getVideoAtTitel(getNameTablePost(nameTheme));

            if((videoEntity.size() == 0) || videoEntity == null){

                log.error("Сущность не получена(VideoEntity)");

                //желательно пустой объект
                return null;

            }else{

                log.info("Сущность получена");

                getLastVideo(countView,videoEntity,videoJsonDto);

            }
        }

        return videoJsonDto;//DAO
    }

    @Override
    public boolean deleteStreamVideo(String type, int id) {

        switch (type){
            case "video":
                VideoEntity videoEntity =videoDaoImp.getVideoById(id);

                if(!(videoEntity == null)){

                    videoDaoImp.deleteVideo(videoEntity);
                    return true;
                }
            case "stream":
                StreamEntity streamEntity =streamDaoImp.getStreamById(id);

                if(!(streamEntity == null)){

                    streamDaoImp.deleteStream(streamEntity);
                    return true;
                }
        }

        return false;
    }

    private void getLastVideo(int countView, List videoEntity, VideoJsonDto videoJsonDto) {//получение последних постов добавленных в БД

        for (int temp = 0; countView > temp; temp++) {//получение последних постов добавленных в БД

            int sizeList = videoEntity.size();

            videoJsonDto.putVideo(getPostEntityInPostDto((VideoEntity)
                    videoEntity.get(sizeList - temp - 1)));//Получение из списка ENITITYpost в DTOpost

        }
    }


    private VideoDto getPostEntityInPostDto(VideoEntity videoEntity){

        if(false){
            return null;
        }else{
            return new VideoDto(videoEntity.get_id() +"",videoEntity.get_titel(),videoEntity.get_name(),
                    videoEntity.get_refVideo(),videoEntity.get_refImage(),videoEntity.get_data());
        }

    }



    public StreamJsonDto getStreamAtNameGame(int countView,String nameTheme, String numberOfPosts) {//получение множества последних постов

        int numberPosts = Integer.parseInt(numberOfPosts);

        StreamJsonDto streamJsonDto = new StreamJsonDto();

        if(getNameTablePost(nameTheme).equals("")){

            //Debbug

        }else {

            List streamEntity = null;//список постов для парса в Map(Controller)
            streamEntity = streamDaoImp.getStreamAtTitel(getNameTablePost(nameTheme));

            if(streamEntity.size() == 0){

                log.error("Сущность не получена(StreamEntity)");

            }else{

                getLastStreams(countView,streamEntity,streamJsonDto);
                log.info("Сущность получена");
            }
        }

        return streamJsonDto;//DAO
    }



    @Override
    public VideoJsonDto getVideoAtNameGame(String nameTheme) {
        VideoJsonDto videoJsonDto = new VideoJsonDto();

        if (getNameTablePost(getTitelFromTheme(nameTheme)).equals("")) {

            //Debbug

        }else {

            List videoEntity = null;//список постов для парса в Map(Controller)
            videoEntity = videoDaoImp.getVideoAtTitel(getNameTablePost(getTitelFromTheme(nameTheme)));

            if(videoEntity.size() == 0){

                log.error("Сущность не получена(StreamEntity)");

            }else{

                for (int temp = 0; videoEntity.size()  > temp; temp++) {//получение последних постов добавленных в БД

                    int sizeList = videoEntity.size();

                    videoJsonDto.putPostInJsonForViewPage(getPostEntityInPostDto((VideoEntity)
                            videoEntity.get(sizeList - temp - 1)));//Получение из списка ENITITYpost в DTOpost

                }
                log.info("Сущность получена");
            }
        }

        return videoJsonDto;//DAO
    }

    @Override
    public StreamJsonDto getStreamAtNameGame(String nameTheme) {

        StreamJsonDto streamJsonDto = new StreamJsonDto();

        if (getNameTablePost(getTitelFromTheme(nameTheme)).equals("")) {

            //Debbug

        }else {

            List streamEntity = null;//список постов для парса в Map(Controller)
            streamEntity = streamDaoImp.getStreamAtTitel(getNameTablePost(getTitelFromTheme(nameTheme)));

            if(streamEntity.size() == 0){

                log.error("Сущность не получена(StreamEntity)");

            }else{

                for (int temp = 0; streamEntity.size()  > temp; temp++) {//получение последних постов добавленных в БД

                    int sizeList = streamEntity.size();

                    streamJsonDto.putPostInJsonForViewPage(getPostEntityInPostDto((StreamEntity)
                            streamEntity.get(sizeList - temp - 1)));//Получение из списка ENITITYpost в DTOpost

                }
                log.info("Сущность получена");
            }
        }

        return streamJsonDto;//DAO
    }

    private void getLastStreams(int viewCount, List streamEntity, StreamJsonDto streamJsonDto) {//получение последних постов добавленных в БД


        for (int temp = 0; viewCount  > temp; temp++) {//получение последних постов добавленных в БД

            int sizeList = streamEntity.size();

            streamJsonDto.putStream(getPostEntityInPostDto((StreamEntity)
                    streamEntity.get(sizeList - temp - 1)));//Получение из списка ENITITYpost в DTOpost

        }

    }

    private StreamDto getPostEntityInPostDto(StreamEntity streamEntity){

        if(false){
            return null;
        }else{
            return new StreamDto(streamEntity.get_id() + "",streamEntity.get_titel(),streamEntity.get_name(),
                    streamEntity.get_refVideo(),streamEntity.get_refImage(),streamEntity.get_data());
        }

    }

    @Override
    public boolean setVideoOrStream(CreateStreamAndVideoDto videoAndStreamDto) {

        if(!(videoAndStreamDto.getName().equals(null) && videoAndStreamDto.getName().equals(null)
                && videoAndStreamDto.getName().equals(null))){

            if(videoAndStreamDto.getType().equals("video")){

                VideoEntity videoEntity = new VideoEntity();

                videoEntity.set_titel(getNameTablePost(videoAndStreamDto.getTitel()));
                videoEntity.set_name(videoAndStreamDto.getName());
                videoEntity.set_refVideo(videoAndStreamDto.getRefVideo());
                videoEntity.set_refImage(videoAndStreamDto.getRefImage());
                videoEntity.set_data("---------");

                videoDaoImp.createVideo(videoEntity);

                return true;

            }
            if(videoAndStreamDto.getType().equals("stream")){

                StreamEntity streamEntity = new StreamEntity();

                streamEntity.set_titel(getNameTablePost(videoAndStreamDto.getTitel()));
                streamEntity.set_name(videoAndStreamDto.getName());
                streamEntity.set_refVideo(videoAndStreamDto.getRefVideo());
                streamEntity.set_refImage(videoAndStreamDto.getRefImage());
                streamEntity.set_data("---------");

                streamDaoImp.createStream(streamEntity);

                return true;
            }

        }

        return false;
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
