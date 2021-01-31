package by.usovich.Repository.dao;

import java.util.List;
import java.util.Map;

public interface CRUDofEntitiesInterface {

    void createEntity(Object createEntity);

    void deleteEntity(Object deleteEntity);

    void updateEntity(Object updateEntity);

    Object readEntity(Class entityClass, Integer id);

    List getListEntities(String requestAsHQL, Map<String, String> parameters);
}
