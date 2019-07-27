package by.usovich.dto;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by yansolo on 19.05.2018.
 */
public class TourneyJsonDto {

    public TourneyJsonDto() {
    }


    int counter = 0;
    Map<String,Map>  Map = new LinkedHashMap<String, Map>();

   JSONArray jsonArray = new JSONArray();



    public Map<String, Map> getMap() {

        return Map;
    }

    public JSONArray getJsonArray() {
        return jsonArray;
    }

    public void putPost(TourneyDto post){

        putNewsInMap(post);
      //  putPostInJson(post);

    }

    public void putNewsInMap(TourneyDto post){

        try {
            Map<String, String> map = new LinkedHashMap<String, String>();


            map.put("Name", post.getName());
            map.put("Fund", post.getFund() + "");
            map.put("RefImage", post.getImgLogo());
            map.put("Date", post.getDate());

            Map.put(counter + "",map);
        }catch (Exception E){

            System.out.println("Errro in Dto(Post) : problem with parse object to json");

        }
        counter++;
    }

    public void putPostInJsonForViewPage (TourneyDto post){
        try {
            // jsonObject.put("Id", counter + "");
            JSONObject jsonObject = new JSONObject();

            jsonObject.put("id",post.getId());
            jsonObject.put("titel",post.getTitel());
            jsonObject.put("any",post.getFund());
            jsonObject.put("anyKey","Fund");
            jsonObject.put("name",post.getName());
            jsonObject.put("date",post.getDate());
            jsonObject.put("Image",post.getImgLogo());

            jsonArray.put(jsonObject);

        }catch (JSONException E){

            System.out.println("Errro in Dto(Post) : problem with parse object to json");

        }
        //  map.put(counter + "",post);
        counter++;
    }
}
