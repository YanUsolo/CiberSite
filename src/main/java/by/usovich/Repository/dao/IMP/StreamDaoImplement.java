package by.usovich.Repository.dao.IMP;

import by.usovich.Repository.dao.StreamsDaoInterface;
import by.usovich.entity.StreamEntity;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by yanus on 8/19/2017.
 */
@Repository("streamDaoImp")
//@Transactional
@Transactional(noRollbackFor = Exception.class)
public class StreamDaoImplement extends CRUDofEntitiesImp implements StreamsDaoInterface {

    public Logger log = Logger.getLogger(StreamDaoImplement.class);

    @Override
    public List getStreamAtTitle(String titel) {

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

    public StreamEntity getStreamById(int id) {
        String postHQL = "FROM StreamEntity WHERE streams_id=:id";

        //titel = "tableDOTA";
        List streamEntity = null;
        org.hibernate.query.Query query = null;
        Session session = null;


        try {
            session = sessionFactory.getCurrentSession();
            query = session.createQuery(postHQL);
            query.setParameter("id", id + "");
            streamEntity = query.getResultList();

        } catch (Exception e) {
            System.out.println("Exception : " + e);
        }

        if (streamEntity == null) {
            return null;
        }

        if (streamEntity.size() > 0) {
            return (StreamEntity) streamEntity.get(0);
        }

        return null;
    }


}
