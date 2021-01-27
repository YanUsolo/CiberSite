package by.usovich.dao.IMP;

import by.usovich.dao.NewsDaoInterface;
import by.usovich.entity.NewsEntity;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by yanus on 15.05.2017.
 */
@Repository("newsDaoImp")
//@Transactional
@Transactional(noRollbackFor = Exception.class)
public class NewsDaoImplement extends CRUDofEntitiesImp implements NewsDaoInterface {

    public Logger log = Logger.getLogger(NewsDaoImplement.class);

    public List getNewsAtTitel(String titel) {

        String postHQL = "FROM NewsEntity WHERE news_titel=:titel";

        //titel = "tableDOTA";
        List newsEntityList = null;
        org.hibernate.query.Query query = null;
        Session session = null;


        try {
            session = sessionFactory.getCurrentSession();
            query = session.createQuery(postHQL);
            query.setParameter("titel", titel);
            newsEntityList = query.getResultList();

        } catch (Exception e) {
            System.out.println("Exception : " + e);
        }

        if (newsEntityList == null) {

            newsEntityList = new ArrayList();
        }


        return newsEntityList;
    }

    @Override
    public NewsEntity getNewsById(int id) {
        System.out.println("DAO(Id : " + id + ")");
        String postHQL = "FROM NewsEntity WHERE news_id=:id";

        //titel = "tableDOTA";
        List newsEntity = null;
        org.hibernate.query.Query query = null;
        Session session = null;

        try {
            session = sessionFactory.getCurrentSession();
            query = session.createQuery(postHQL);
            query.setParameter("id", id + "");
            newsEntity = query.getResultList();

        } catch (Exception e) {
            System.out.println("Exception : " + e);
        }

        if (newsEntity == null) {
            return null;
        }


        if (newsEntity.size() > 0) {
            return (NewsEntity) newsEntity.get(0);
        }

        return null;
    }

}
