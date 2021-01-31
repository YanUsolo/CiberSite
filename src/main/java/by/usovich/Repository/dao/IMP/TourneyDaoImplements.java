package by.usovich.Repository.dao.IMP;

import by.usovich.Repository.dao.TourneyDaoInterface;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by yansolo on 19.05.2018.
 */
@Repository("tourneyDaoImp")
//@Transactional
@Transactional(noRollbackFor = Exception.class)
public class TourneyDaoImplements extends CRUDofEntitiesImp implements TourneyDaoInterface {

    public Logger log = Logger.getLogger(TourneyDaoImplements.class);

    public List getTourneyAtTitel(String titel) {


        System.out.println("DAO(titel : " + titel + ")");
        String postHQL = "FROM TourneyEntity WHERE tourney_titel=:titel";

        //titel = "tableDOTA";
        List tourneyEntity = null;
        org.hibernate.query.Query query = null;
        Session session = null;


        try {
            session = sessionFactory.getCurrentSession();
            query = session.createQuery(postHQL);
            query.setParameter("titel", titel);
            tourneyEntity = query.getResultList();

        } catch (Exception e) {
            System.out.println("Exception : " + e);
        }
        return tourneyEntity;
    }


}
