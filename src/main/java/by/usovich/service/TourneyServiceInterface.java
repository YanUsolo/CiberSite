package by.usovich.service;

import by.usovich.dto.NewsDto.NewsJsonDto;
import by.usovich.dto.TourneyDto;
import by.usovich.dto.TourneyJsonDto;

/**
 * Created by yansolo on 19.05.2018.
 */
public interface TourneyServiceInterface {

    TourneyJsonDto getTourneyAtNameGame(String nameTheme, String numberOfPosts);

    TourneyJsonDto getTourneyAtNameGame(String nameTheme);

}
