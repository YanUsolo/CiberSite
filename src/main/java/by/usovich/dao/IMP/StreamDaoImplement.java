package by.usovich.dao.IMP;

import by.usovich.dao.StreamsDaoInterface;
import by.usovich.entity.StreamEntity;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by yanus on 8/19/2017.
 */
@Repository("streamDaoImp")
@Transactional
public class StreamDaoImplement implements StreamsDaoInterface {

    public Logger log = Logger.getLogger(StreamDaoImplement.class);

    @Resource(name = "sessionFactory")
    public SessionFactory sessionFactory;

    public List getStreamAtTitel(String titel) {


        System.out.println(" Stream DAO(titel : " + titel + ")");
        String postHQL = "FROM StreamEntity WHERE Streams_titel=:titel";

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
    public void createStream(StreamEntity streamEntity) {

        sessionFactory.getCurrentSession().save(streamEntity);
        log.info("Stream entity add in BD ");


    }

    @Override
    public void deleteStream(StreamEntity streamEntity) {

        sessionFactory.getCurrentSession().delete(streamEntity);
        log.info("UserEntiry delete from BD ");
    }

    @Override
    public StreamEntity getStreamById(int id) {
        System.out.println("DAO(Id : " + id + ")");
        String postHQL = "FROM StreamEntity WHERE streams_id=:id";

        //titel = "tableDOTA";
        List streamEntity = null;
        org.hibernate.query.Query query = null;
        Session session = null;


        try {
            session = sessionFactory.getCurrentSession();
            query = session.createQuery(postHQL);
            query.setParameter("id", id+ "");
            streamEntity = query.getResultList();

        } catch (Exception e) {
            System.out.println("Exception : " + e);
        }

        if(streamEntity == null){
            return null;
        }

        if(streamEntity.size() > 0){
            return (StreamEntity) streamEntity.get(0);
        }

        return null;
    }

}
