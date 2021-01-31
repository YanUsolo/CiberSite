package by.usovich.Repository.dao.IMP;

import by.usovich.Repository.dao.NewsDaoInterface;
import by.usovich.entity.NewsEntity;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.transaction.RollbackException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yanus on 15.05.2017.
 */
@Repository("newsDaoImp")
@Transactional(noRollbackFor = RollbackException.class)
public class NewsDaoImplement extends CRUDofEntitiesImp implements NewsDaoInterface {

    public Logger log = Logger.getLogger(NewsDaoImplement.class);


    public List getNewsAtTitel(String title) {

        String postHQL = "FROM NewsEntity WHERE news_title =: title";

        Map<String, String> parametersMap = new HashMap<>();

        parametersMap.put("title", title);

        return getListEntities(postHQL, parametersMap);
    }

    public NewsEntity getNewsById(long id) {

        return (NewsEntity) readEntity(NewsEntity.class, (int) id);
    }


}
