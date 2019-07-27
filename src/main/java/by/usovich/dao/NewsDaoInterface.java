package by.usovich.dao;

import by.usovich.entity.NewsEntity;

import java.util.*;

/**
 * Created by yanus on 15.05.2017.
 */
public interface NewsDaoInterface {

    List getNewsAtTitel(String nameGameTable);

    void createNews(NewsEntity newsEntity);

    void deleteNews(NewsEntity newsEntity);

    NewsEntity getNewsById(int id);

}
