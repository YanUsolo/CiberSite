package by.usovich.dao;

import by.usovich.entity.VideoEntity;

import java.util.List;

/**
 * Created by yanus on 8/19/2017.
 */
public interface VideoDaoInterface {

    List getVideoAtTitel(String nameGameTable);

    void createVideo(VideoEntity videoEntity);

    void deleteVideo(VideoEntity videoEntity);

    VideoEntity getVideoById(int id);
}
