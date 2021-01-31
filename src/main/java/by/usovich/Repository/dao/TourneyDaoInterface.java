package by.usovich.Repository.dao;

import java.util.List;

/**
 * Created by yansolo on 19.05.2018.
 */
public interface TourneyDaoInterface extends CRUDofEntitiesInterface {
    List getTourneyAtTitel(String nameGameTable);
}
