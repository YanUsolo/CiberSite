package by.usovich.service;

import by.usovich.dto.NewsDto.CreateNewsDto;
import by.usovich.dto.NewsDto.NewsJsonDto;

import javax.servlet.http.HttpSession;

/**
 * Created by yanus on 15.05.2017.
 */
public interface NewsServiceInterface {

    NewsJsonDto getNewsAtNameGame(String nameTheme, String numberOfPosts);

    NewsJsonDto getNewsAtNameGame(String nameTheme);

    NewsJsonDto getNewsAtNameGame(String nameTheme, String newsDeriction, String numberOfPosts, HttpSession session);

    boolean setNewsInBD(CreateNewsDto createNewsDto);

    boolean deleteNews(int id);

}