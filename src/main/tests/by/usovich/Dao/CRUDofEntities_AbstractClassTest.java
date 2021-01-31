package by.usovich.Dao;

import by.usovich.Repository.dao.IMP.CRUDofEntitiesImp;
import org.hibernate.Session;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.testng.Assert.assertTrue;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "/BeansContextForTests.xml"})
public class CRUDofEntities_AbstractClassTest extends CRUDofEntitiesImp {

    Session sessionIsOpen;

    @Before
    public void setUp_SessionFactory() {

        sessionIsOpen = sessionFactory.openSession();
    }

    @Test
    public void sessionFactory_checkIsOpenSession_expectSuccessful() {

        assertTrue(sessionIsOpen.isOpen());
    }

    @Test
    public void sessionFactory_checkIsCurrentSession_expectSuccessful() {

        assertTrue(sessionFactory.getCurrentSession().isOpen());
    }

    @After
    public void tearDownSession() {

        sessionIsOpen.close();

    }


}
