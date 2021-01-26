package by.usovich.dao.IMP;

import by.usovich.dao.VideoDaoInterface;
import by.usovich.entity.VideoEntity;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by yanus on 8/19/2017.
 */
@Repository("videoDaoImp")
//@Transactional
@Transactional(noRollbackFor = Exception.class)
public class VideoDaoImplement extends CRUDofEntitiesImp implements VideoDaoInterface {


    public Logger log = Logger.getLogger(VideoDaoImplement.class);

    public List getVideoAtTitel(String titel) {


        System.out.println(" Video DAO(titel : " + titel + ")");
        String postHQL = "FROM VideoEntity WHERE video_titel=:titel";

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
    public VideoEntity getVideoById(int id) {
        System.out.println("DAO(Id : " + id + ")");
        String postHQL = "FROM VideoEntity WHERE video_id=:id";

        //titel = "tableDOTA";
        List videoEntity = null;
        org.hibernate.query.Query query = null;
        Session session = null;


        try {
            session = sessionFactory.getCurrentSession();
            query = session.createQuery(postHQL);
            query.setParameter("id", id + "");
            videoEntity = query.getResultList();

        } catch (Exception e) {
            System.out.println("Exception : " + e);
        }

        if (videoEntity == null) {
            return null;
        }

        if (videoEntity.size() > 0) {
            return (VideoEntity) videoEntity.get(0);
        }

        return null;
    }


}
