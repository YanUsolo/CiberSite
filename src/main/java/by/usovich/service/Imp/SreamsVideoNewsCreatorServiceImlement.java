package by.usovich.service.Imp;

import by.usovich.dao.StreamsDaoInterface;
import by.usovich.dao.VideoDaoInterface;
import by.usovich.dto.StreamAndVideoDto.CreateStreamAndVideoDto;
import by.usovich.entity.StreamEntity;
import by.usovich.entity.VideoEntity;
import by.usovich.service.SreamsVideoNewsCreatorServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by yanus on 10/4/2017.
 */
//Todo Date. It is important
@Service("creatorPosts")
public class SreamsVideoNewsCreatorServiceImlement implements SreamsVideoNewsCreatorServiceInterface {

    @Autowired
    StreamsDaoInterface streamsDaoInterface;

    @Autowired
    VideoDaoInterface videoDaoInterface;

    @Override
    public boolean setVideoOrStream(CreateStreamAndVideoDto videoAndStreamDto) {

        if (!(videoAndStreamDto.getName().equals(null) && videoAndStreamDto.getName().equals(null)
                && videoAndStreamDto.getName().equals(null))) {

            if (videoAndStreamDto.getType().equals("video")) {

                VideoEntity videoEntity = new VideoEntity();

                videoEntity.set_titel(getNameTablePost(videoAndStreamDto.getTitel()));
                videoEntity.set_name(videoAndStreamDto.getName());
                videoEntity.set_refVideo(videoAndStreamDto.getRefVideo());
                videoEntity.set_refImage(videoAndStreamDto.getRefImage());
                videoEntity.set_data("---------");

                videoDaoInterface.createEntity(videoEntity);

                return true;

            }
            if (videoAndStreamDto.getType().equals("stream")) {

                StreamEntity streamEntity = new StreamEntity();

                streamEntity.set_titel(getNameTablePost(videoAndStreamDto.getTitel()));
                streamEntity.set_name(videoAndStreamDto.getName());
                streamEntity.set_refVideo(videoAndStreamDto.getRefVideo());
                streamEntity.set_refImage(videoAndStreamDto.getRefImage());
                streamEntity.set_data("---------");

                streamsDaoInterface.createEntity(streamEntity);

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
}
