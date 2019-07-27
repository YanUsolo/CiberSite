package by.usovich.dto.StreamAndVideoDto.VideoDto;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by yanus on 8/21/2017.
 */
public class VideoJsonDto {

    public VideoJsonDto() {
    }


    int counter = 0;
    Map<String,Map> Map = new LinkedHashMap<String, Map>();

    JSONArray jsonArray = new JSONArray();



    public Map<String, Map> getMap() {

        return Map;
    }

    public JSONArray getJsonArray() {
        return jsonArray;
    }

    public void putVideo(VideoDto videoDto){

        putPostInMap(videoDto);
      //  putPostInJson(videoDto);

    }

    public void putPostInMap (VideoDto post){

        try {
            Map<String, String> map = new LinkedHashMap<String, String>();

            map.put("Title", post.get_titel());
            map.put("Name", post.get_name());
            map.put("RefVideo", post.get_refVideo());
            map.put("RefImage", post.get_refImage());
            map.put("Date", post.get_data());

            Map.put(counter + "",map);
        }catch (Exception E){

            System.out.println("Errro in Dto(Post) : problem with parse object to json");

        }
        //  map.put(counter + "",post);
        counter++;
    }

    public void putPostInJson (VideoDto post){
        try {
            // jsonObject.put("Id", counter + "");
            JSONObject jsonObject = new JSONObject();

            jsonObject.put("Title",post.get_titel());
            jsonObject.put("Name",post.get_name());
            jsonObject.put("RefVideo",post.get_refVideo());
            jsonObject.put("RefImage",post.get_refImage());
            jsonObject.put("Data",post.get_data());

            jsonArray.put(jsonObject);

        }catch (JSONException E){

            System.out.println("Errro in Dto(Post) : problem with parse object to json");

        }
        //  map.put(counter + "",post);
        counter++;
    }

    public void putPostInJsonForViewPage(VideoDto post) {
        try {
            JSONObject jsonObject = new JSONObject();

            jsonObject.put("id", post.get_id());
            jsonObject.put("titel", post.get_titel());
            jsonObject.put("any", post.get_refVideo());
            jsonObject.put("anyKey", "RefVideo");
            jsonObject.put("name", post.get_name());
            jsonObject.put("date", post.get_data());
            jsonObject.put("Image", post.get_refImage());

            jsonArray.put(jsonObject);

        } catch (JSONException E) {

            System.out.println("Errro in Dto(Post) : problem with parse object to json");

        }
        //  map.put(counter + "",post);
        counter++;
    }
}
