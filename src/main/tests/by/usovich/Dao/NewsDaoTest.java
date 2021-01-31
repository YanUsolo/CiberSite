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

    int[] arrayUserIdTrue;
    int[] arrayUserIdfalse;

    @Before
    public void setUp_getNewsAtTitel() {

        arrayTitleTrue = new String[]{"cs", "wot", "dota", "paragon"};
        arrayTitleFalse = new String[]{"css", "wotaF", "parakort", "doka"};
    }

    @Before
    public void setUp_getNewsById() {

        arrayUserIdTrue = new int[]{2, 3, 1, 4};
        arrayUserIdfalse = new int[]{100, 500, 1000, 11111};
    }


    @Test
    public void getNewsAtTitel_HaveSomeRecordByTitle_Successful() {

        for (String titel : arrayTitleTrue) {

            assertTrue(newsDaoInterface.getNewsAtTitel(titel).size() > 0);
        }
    }


    @Test
    public void getNewsAtTitel_HaveSomeRecordByTitle_NotSuccessful() {

        for (String titel : arrayTitleFalse) {

            assertFalse(newsDaoInterface.getNewsAtTitel(titel).size() > 0);
        }
    }


    @Test
    public void getNewsById_HaveSomeRecordById_Successful() {

        for (int id : arrayUserIdTrue) {

            assertTrue(newsDaoInterface.getNewsById(id).get_id() == id);
        }
    }

    @Test(expected = NullPointerException.class)
    public void getNewsById_HaveSomeRecordById_NotSuccessful() {

        for (int id : arrayUserIdfalse) {

            assertFalse(newsDaoInterface.getNewsById(id).get_id() == id);
        }
    }


}

