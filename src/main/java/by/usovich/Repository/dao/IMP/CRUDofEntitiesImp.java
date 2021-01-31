package by.usovich.Repository.dao.IMP;

import by.usovich.Repository.dao.CRUDofEntitiesInterface;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Transactional(noRollbackFor = Exception.class)
@Repository("CRUDofEntitiesImp")
public abstract class CRUDofEntitiesImp implements CRUDofEntitiesInterface {

    @Resource(name = "sessionFactory")
    public SessionFactory sessionFactory;

    public void createEntity(Object createEntity) {
        sessionFactory.getCurrentSession().save(createEntity);
    }

    public void deleteEntity(Object deleteEntity) {
        sessionFactory.getCurrentSession().delete(deleteEntity);
    }

    public void updateEntity(Object updateEntity) {
        sessionFactory.getCurrentSession().update(updateEntity);
    }

    public void readEntity(long id) {
        sessionFactory.getCurrentSession().find(Object.class, id);
    }

    public List getListEntities(String requestAsHQL, Map<String, String> parameters) {
        Session session = sessionFactory.getCurrentSession();
        Query query = session.createQuery(requestAsHQL);
        for (String key : parameters.keySet()) {
            query.setParameter(key, parameters.get(key));
        }

        return query.getResultList();
    }
}
