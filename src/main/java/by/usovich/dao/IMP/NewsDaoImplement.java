package by.usovich.dao.IMP;

import by.usovich.dao.NewsDaoInterface;

import by.usovich.entity.NewsEntity;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by yanus on 15.05.2017.
 */
@Repository("newsDaoImp")
@Transactional (noRollbackFor = Exception.class)
public class NewsDaoImplement implements NewsDaoInterface {

    public Logger log = Logger.getLogger(NewsDaoImplement.class);

    @Resource(name = "sessionFactory")
    public SessionFactory sessionFactory;

    public List getNewsAtTitel(String titel) {


        System.out.println("DAO(titel : " + titel + ")");
        String postHQL = "FROM NewsEntity WHERE news_titel=:titel";

        //titel = "tableDOTA";
        List postEntity = null;
        org.hibernate.query.Query query = null;
        Session session = null;


        try {
            session = sessionFactory.getCurrentSession();
            query = session.createQuery(postHQL);
            query.setParameter("titel", titel);
            postEntity = query.getResultList();

        } catch (Exception e) {
            System.out.println("Exception : " + e);
        }
        return postEntity;
    }

    @Override
    public void createNews(NewsEntity newsEntity) {

        sessionFactory.getCurrentSession().save(newsEntity);
        log.info("News entity add in BD ");


    }

    @Override
    public void deleteNews(NewsEntity newsEntity) {

        sessionFactory.getCurrentSession().delete(newsEntity);
        log.info("News delete from BD ");
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
            query.setParameter("id", id+ "");
            newsEntity = query.getResultList();

        } catch (Exception e) {
            System.out.println("Exception : " + e);
        }

        if(newsEntity == null){
            return null;
        }

        if(newsEntity.size() > 0){
            return (NewsEntity) newsEntity.get(0);
        }

        return null;
    }
}
