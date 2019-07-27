package by.usovich.dto.NewsDto;

//import org.json.simple.JSONObject;


import java.util.Date;

/**
 * Created by yanus on 15.05.2017.
 */
public class NewsDto {

    private String _id;

    private String _titel;

    private String _content;

    private String _name;

    private String _newsId;

    private String _person;

    private String _date;

    private String _image;


    public NewsDto(String titel, String content,String name, String date, String image,String newsId) {
        this._titel = titel;
        this._content = content;
        this._name = name;
        this._newsId = newsId;
        this._date = date;
        this._image = image;
    }

    public NewsDto(String id,String titel, String content,String name, String date, String image,String newsId,String person) {
        this._id = id;
        this._titel = titel;
        this._content = content;
        this._name = name;
        this._newsId = newsId;
        this._date = date;
        this._image = image;
        this._person = person;
    }

    public String get_titel() {
        return _titel;
    }

    public void set_titel(String titel) {
        this._titel = titel;
    }

    public String get_content() {
        return _content;
    }

    public void set_content(String content) {
        this._content = content;
    }

    public String get_date() {
        return _date;
    }

    public void set_date(String date) {
        this._date = date;
    }

    public String get_image() {
        return _image;
    }

    public void set_image(String _image) {
        this._image = _image;
    }

    public String get_newsId() {return _newsId;}

    public void set_newsId(String _newsId) {
        this._newsId = _newsId;
    }

    public String get_name() {
        return _name;
    }

    public void set_name(String _name) {
        this._name = _name;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String get_person() {
        return _person;
    }

    public void set_person(String _person) {
        this._person = _person;
    }
}
