package by.usovich.Repository.dao;

import by.usovich.entity.NewsEntity;

import java.util.List;

/**
 * Created by yanus on 15.05.2017.
 */
public interface NewsDaoInterface extends CRUDofEntitiesInterface {

    List getNewsAtTitel(String nameGameTable);

    NewsEntity getNewsById(long id);

}
