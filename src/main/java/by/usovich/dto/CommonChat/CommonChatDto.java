package by.usovich.dto.CommonChat;

import by.usovich.dto.NewsDto.NewsDto;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by yanus on 9/6/2017.
 */
public class CommonChatDto {

    public CommonChatDto() {
    }

    int counter = 0;
    Map<String, NewsDto> map = new LinkedHashMap<String, NewsDto>();

    public Map<String, NewsDto> getMap() {

        return map;
    }

    public void putMessage(NewsDto post) {

        putNewsInMap(post);

    }

    public void putNewsInMap(NewsDto post) {


        map.put(counter + "", post);
        counter++;
    }
}
