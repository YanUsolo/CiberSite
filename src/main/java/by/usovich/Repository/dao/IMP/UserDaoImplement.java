package by.usovich.Repository.dao.IMP;

import by.usovich.Repository.dao.UserDaoInterface;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureQuery;
import java.util.List;

/**
 * Created by yanus on 7/14/2017.
 */
@Repository("userDaoImp")
//@Transactional
@Transactional(noRollbackFor = Exception.class)
public class UserDaoImplement extends CRUDofEntitiesImp implements UserDaoInterface {


    @Override
    public Integer getVisitSite() {

        StoredProcedureQuery query = null;
        try {
            //postEntity = getListAtHQL(HQL,login,paramInHQL,sessionFactory);
            Session session = sessionFactory.getCurrentSession();
            query = session
                    .createStoredProcedureQuery("getAllVisit")
                    .registerStoredProcedureParameter(1, Integer.class,
                            ParameterMode.OUT);


            query.execute();

            //  System.out.println("" + query.getOutputParameterValue(1));

        } catch (Exception e) {
            e.printStackTrace();
        }

        Integer Int = (Integer) query.getOutputParameterValue(1);


        return Int;
    }

    //   public Logger log = Logger.getLogger(UserDaoImplement.class);

    public boolean isLoginExists(String login) {

        String HQL = "FROM UserEntity WHERE user_nick = :login";
        String paramInHQL = "login";

        List postEntity = null;
        try {
            //postEntity = getListAtHQL(HQL,login,paramInHQL,sessionFactory);
            Session session = sessionFactory.getCurrentSession();
            Query query = session.createQuery(HQL);
            query.setParameter(paramInHQL, login);
            postEntity = query.getResultList();
            //    return query.getResultList();


        } catch (Exception e) {
            e.printStackTrace();
        }

        if (postEntity == null) {
            return false;
        }
        return postEntity.size() > 0;

    }


    public boolean isEmailExists(String email) {

        String postHQL = "FROM UserEntity WHERE user_email=:email";
        String paramInHQL = "email";

        List postEntity = null;
        try {
            postEntity = getListAtHQL(postHQL, email, paramInHQL, sessionFactory);

        } catch (Exception e) {
            e.printStackTrace();
        }

        if (postEntity == null) {
            return false;
        }
        return postEntity.size() > 0;
    }

    public boolean isPassword(String password) {

        String postHQL = "FROM UserEntity WHERE user_password=:password";
        String paramInHQL = "password";

        List postEntity = null;

        try {
            postEntity = getListAtHQL(postHQL, password, paramInHQL, sessionFactory);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (postEntity == null) {
            return false;
        }
        return postEntity.size() > 0;

    }


    public List getUserEntityByLogin(String login) {
        String HQL = "FROM UserEntity WHERE user_nick=:login";
        String paramInHQL = "login";


        List postEntity = null;
        try {
            postEntity = getListAtHQL(HQL, login, paramInHQL, sessionFactory);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (postEntity == null) {
            return null;
        }
        return postEntity;
    }


    private List getListAtHQL(String HQL, String required, String paramInHQL, SessionFactory sessionFactory) {
        Session session = sessionFactory.getCurrentSession();
        Query query = session.createQuery(HQL);
        query.setParameter(paramInHQL, required);
        return query.getResultList();
    }
}
