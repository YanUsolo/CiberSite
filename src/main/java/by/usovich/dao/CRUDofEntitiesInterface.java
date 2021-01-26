package by.usovich.dao;

import java.util.List;
import java.util.Map;

public interface CRUDofEntitiesInterface {

    void createEntity(Object createEntity);

    void deleteEntity(Object deleteEntity);

    void updateEntity(Object updateEntity);

    List getListEnities(String requestAsHQL, Map<String, String> parameters);

}
