package by.usovich.service;


import by.usovich.dto.StreamAndVideoDto.VideoDto.VideoJsonDto;

/**
 * Created by yanus on 8/19/2017.
 */
public interface VideoServiceInterface {

    public VideoJsonDto getVideoAtNameGame(int countView, String nameTheme, String numberOfPosts);

    // public VideoJsonDto getVideoAtNameGame(String nameTheme, String numberOfPosts, String displayedOfPosts);
}
