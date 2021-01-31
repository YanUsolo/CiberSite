package by.usovich.Repository.dao;

import by.usovich.entity.StreamEntity;

import java.util.List;

/**
 * Created by yanus on 8/19/2017.
 */
public interface StreamsDaoInterface extends CRUDofEntitiesInterface {

    List getStreamAtTitle(String nameGameTable);

    StreamEntity getStreamById(int id);
}