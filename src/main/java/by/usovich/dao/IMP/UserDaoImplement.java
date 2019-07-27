package by.usovich.dao.IMP;

import by.usovich.dao.UserDaoInterface;
import by.usovich.entity.UserEntity;


import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureQuery;
import java.util.List;

/**
 * Created by yanus on 7/14/2017.
 */
@Repository("userDaoImp")
@Transactional(noRollbackFor=Exception.class)
public class UserDaoImplement implements UserDaoInterface {

    @Resource(name = "sessionFactory")
    public SessionFactory sessionFactory;

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

    public boolean isLoginExists(String login){

        String HQL = "FROM UserEntity WHERE user_nick=:login";
        String paramInHQL ="login";

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

        if(postEntity == null){
            return false;
        }
        return postEntity.size() > 0;

    }


    public boolean isEmailExists(String email){

        String postHQL = "FROM UserEntity WHERE user_email=:email";
        String paramInHQL ="email";

        List postEntity = null;
        try {
            postEntity = getListAtHQL(postHQL,email,paramInHQL,sessionFactory);

        } catch (Exception e) {
            e.printStackTrace();
        }

        if(postEntity == null){
            return false;
        }
        return postEntity.size() > 0;

    }


    public boolean isPassword(String password){

        String postHQL = "FROM UserEntity WHERE user_password=:password";
        String paramInHQL ="password";

        List postEntity = null;

        try {
            postEntity = getListAtHQL(postHQL,password,paramInHQL,sessionFactory);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if(postEntity == null){
            return false;
        }
        return postEntity.size() > 0;

    }

    @Override
    public void createUser(UserEntity userEntity) {

        sessionFactory.getCurrentSession().save(userEntity);
    //    log.info("UserEntiry add in BD ");

    }


    @Override
    //fail
    public void deleteUser(UserEntity userEntity) {

        sessionFactory.getCurrentSession().delete(userEntity);
      //  log.info("UserEntiry delete from BD ");
    }

    @Override
    public void updateUser(UserEntity userEntity) {

        sessionFactory.getCurrentSession().update(userEntity);

    }


    public List getUserEntityByLogin(String login) {

        String HQL = "FROM UserEntity WHERE user_nick=:login";
        String paramInHQL ="login";

        List postEntity = null;
        try {
            postEntity = getListAtHQL(HQL,login,paramInHQL,sessionFactory);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if(postEntity == null){
            return null;
        }
        return postEntity;
    }


    private List getListAtHQL(String HQL, String required, String paramInHQL, SessionFactory sessionFactory) {//Топовое блбла но как назвать не знаю//ToDo

            Session session = sessionFactory.getCurrentSession();
            Query query = session.createQuery(HQL);
            query.setParameter(paramInHQL, required);
            return query.getResultList();

    }
}
