package by.usovich.dao.IMP;

import by.usovich.dao.CRUDofEntitiesInterface;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

public abstract class CRUDofEntitiesImp implements CRUDofEntitiesInterface {


    @Resource(name = "sessionFactory")
    public SessionFactory sessionFactory;

    public void createEntity(Object createEntity) {
        sessionFactory.getCurrentSession().delete(createEntity);
    }


    public void deleteEntity(Object deleteEntity) {

        sessionFactory.getCurrentSession().delete(deleteEntity);
    }


    public void updateEntity(Object updateEntity) {
        sessionFactory.getCurrentSession().update(updateEntity);

    }

    public List getListEnities(String requestAsHQL, Map<String, String> parameters) {


        Session session = sessionFactory.getCurrentSession();
        Query query = session.createQuery(requestAsHQL);
        for (String key : parameters.keySet()) {
            query.setParameter(key, parameters.get(key));
        }

        return query.getResultList();
    }

}
