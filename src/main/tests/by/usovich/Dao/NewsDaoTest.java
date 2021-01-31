package by.usovich.Dao;

import by.usovich.Repository.dao.NewsDaoInterface;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "/BeansContextForTests.xml"})
public class NewsDaoTest {

    @Autowired
    NewsDaoInterface newsDaoInterface;

    //Announcement Given field
    String[] arrayTitleTrue;
    String[] arrayTitleFalse;

    @Before
    public void setUp_getNewsAtTitel() {

        arrayTitleTrue = new String[]{"cs", "wot", "dota", "paragon"};
        arrayTitleFalse = new String[]{"css", "wotaF", "parakort", "doka"};
    }

    @Test
    public void getNewsAtTitel_HaveSomeRecordByTitle_Successful() {

        for (String title : arrayTitleTrue) {

            assertTrue(newsDaoInterface.getNewsAtTitel(title).size() > 0);
        }
    }

    @Test
    public void getNewsAtTitel_HaveSomeRecordByTitle_NotSuccessful() {

        for (String title : arrayTitleFalse) {

            assertFalse(newsDaoInterface.getNewsAtTitel(title).size() > 0);
        }
    }

}

