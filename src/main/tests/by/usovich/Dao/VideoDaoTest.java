package by.usovich.Dao;

import by.usovich.Repository.dao.VideoDaoInterface;
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
public class VideoDaoTest {


    //Announcement Given field
    String[] arrayTitleTrue;
    String[] arrayTitleFalse;

    Integer[] arrayIdTrue;
    Integer[] arrayIdFalse;

    @Autowired
    VideoDaoInterface videoDaoInterface;


    @Before
    public void setUp() {

        arrayTitleTrue = new String[]{"cs", "wot", "dota"};
        arrayTitleFalse = new String[]{"css", "wotaF", "parakort", "doka"};

        arrayIdTrue = new Integer[]{1, 4, 6, 3, 2};
        arrayIdFalse = new Integer[]{30, 12312, 5675467, 6789679, 1243};
    }


    @Test
    public void getVideoAtTitel_checkHasEnitiesByTitle_Successful() {

        for (String title : arrayTitleTrue) {
            assertTrue(videoDaoInterface.getVideoAtTitel(title).size() > 0);
        }
    }


    @Test
    public void getVideoAtTitel_checkHasEnitiesByTitle_notSuccessful() {

        for (String title : arrayTitleFalse) {
            assertFalse(videoDaoInterface.getVideoAtTitel(title).size() > 0);
        }
    }


    @Test
    public void getVideoById_Successful() {

        for (Integer id : arrayIdTrue) {
            assertTrue(videoDaoInterface.getVideoById(id).get_id() == id);
        }
    }


    @Test(expected = NullPointerException.class)
    public void getVideoById_notSuccessful() {

        for (Integer id : arrayIdFalse) {
            assertFalse(videoDaoInterface.getVideoById(id).get_id() == id);
        }
    }
}
