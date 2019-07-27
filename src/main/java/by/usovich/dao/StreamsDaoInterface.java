package by.usovich.dao;

import by.usovich.entity.StreamEntity;
import by.usovich.entity.UserEntity;

import java.util.List;

/**
 * Created by yanus on 8/19/2017.
 */
public interface StreamsDaoInterface {

    public List getStreamAtTitel(String nameGameTable);

    void createStream(StreamEntity streamEntity);

    public void deleteStream(StreamEntity streamEntity);

    StreamEntity getStreamById(int id);
}