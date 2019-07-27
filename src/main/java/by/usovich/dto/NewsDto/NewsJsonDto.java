package by.usovich.dto.NewsDto;



import java.util.*;
import org.json.*;
/**
 * Created by yanus on 6/17/2017.
 */
public class NewsJsonDto {

    public NewsJsonDto() {
    }


    int counter = 0;
    Map<String,NewsDto> map = new LinkedHashMap<String, NewsDto>();

    JSONArray jsonArray = new JSONArray();



    public Map<String, NewsDto> getMap() {

        return map;
    }

    public JSONArray getJsonArray() {
        return jsonArray;
    }

    public void putPost(NewsDto post){

        putNewsInMap(post);
        putPostInJson(post);

    }

    public void putNewsInMap(NewsDto post){


        map.put(counter + "",post);
        counter++;
    }

    public void putPostInJson (NewsDto post){
        try {
           // jsonObject.put("Id", counter + "");
            JSONObject jsonObject = new JSONObject();

            jsonObject.put("Title",post.get_titel());
            jsonObject.put("Content",post.get_content());
            jsonObject.put("Name",post.get_name());
            jsonObject.put("NewsId",post.get_newsId());
            jsonObject.put("PublishDate",post.get_date());
            jsonObject.put("Image",post.get_image());

            jsonArray.put(jsonObject);

        }catch (JSONException E){

            System.out.println("Errro in Dto(Post) : problem with parse object to json");

        }
      //  map.put(counter + "",post);
        counter++;
    }

    public void putPostInJsonForViewPage (NewsDto post){
        try {
            // jsonObject.put("Id", counter + "");
            JSONObject jsonObject = new JSONObject();

            jsonObject.put("id",post.get_id());
            jsonObject.put("titel",post.get_titel());
            jsonObject.put("any",post.get_content());
            jsonObject.put("anyKey","Content");
            jsonObject.put("name",post.get_name());
            jsonObject.put("date",post.get_date());
            jsonObject.put("Image",post.get_image());

            jsonArray.put(jsonObject);

        }catch (JSONException E){

            System.out.println("Errro in Dto(Post) : problem with parse object to json");

        }
        //  map.put(counter + "",post);
        counter++;
    }

}
