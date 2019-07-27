package by.usovich.service;


import by.usovich.dto.StreamAndVideoDto.StreamDto.StreamJsonDto;

/**
 * Created by yanus on 8/19/2017.
 */
public interface StreamServiceInterface {

    public StreamJsonDto getStreamAtNameGame(String nameTheme, String numberOfPosts);

   // public StreamJsonDto getStreamAtNameGame(String nameTheme, String numberOfPosts, String displayedOfPosts);
}
