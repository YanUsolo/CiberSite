package by.usovich.Repository.dao;

import by.usovich.entity.VideoEntity;

import java.util.List;

/**
 * Created by yanus on 8/19/2017.
 */
public interface VideoDaoInterface extends CRUDofEntitiesInterface {
    List getVideoAtTitel(String nameGameTable);

    VideoEntity getVideoById(int id);
}
