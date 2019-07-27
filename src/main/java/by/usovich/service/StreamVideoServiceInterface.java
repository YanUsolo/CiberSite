package by.usovich.service;

import by.usovich.dto.StreamAndVideoDto.CreateStreamAndVideoDto;
import by.usovich.dto.StreamAndVideoDto.StreamDto.StreamJsonDto;
import by.usovich.dto.StreamAndVideoDto.VideoDto.VideoJsonDto;

/**
 * Created by yansolo on 06.05.2018.
 */
public interface StreamVideoServiceInterface {

    boolean setVideoOrStream(CreateStreamAndVideoDto videoAndStreamDto);

    VideoJsonDto getVideoAtNameGame(int countView, String nameTheme, String numberOfPosts);

    StreamJsonDto getStreamAtNameGame(int countView ,String nameTheme, String numberOfPosts);

    VideoJsonDto getVideoAtNameGame(String nameTheme);

    StreamJsonDto getStreamAtNameGame(String nameTheme);

    boolean deleteStreamVideo(String type,int id);
}
