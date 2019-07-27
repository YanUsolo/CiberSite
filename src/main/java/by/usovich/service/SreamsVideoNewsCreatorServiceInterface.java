package by.usovich.service;

import by.usovich.dto.StreamAndVideoDto.CreateStreamAndVideoDto;

/**
 * Created by yanus on 10/4/2017.
 */
public interface SreamsVideoNewsCreatorServiceInterface {

    public boolean setVideoOrStream(CreateStreamAndVideoDto videoAndStreamDto);
}
