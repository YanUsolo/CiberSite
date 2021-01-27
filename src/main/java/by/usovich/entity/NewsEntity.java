package by.usovich.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by yanus on 15.05.2017.
 */

@Entity
@Table(name = "news", schema = "cibersite", catalog = "")
public class NewsEntity implements Serializable {


    @Id
    @Column(name = "news_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int _id;

    @Column(name = "news_titel")
    private String _titel;

    @Column(name = "news_content")
    private String _content;

    @Column(name = "news_name")
    private String _name;


    //ToDo//Need use type Date
    @Column(name = "news_date")
    private String _date;

    @Column(name = "news_refImage")
    private String _image;


    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

    public String get_titel() {
        return _titel;
    }

    public void set_titel(String _titel) {
        this._titel = _titel;
    }

    public String get_content() {
        return _content;
    }

    public void set_content(String _content) {
        this._content = _content;
    }

    public String get_name() {
        return _name;
    }

    public void set_name(String _name) {
        this._name = _name;
    }

    public String get_date() {
        return _date;
    }

    public void set_date(String _date) {
        this._date = _date;
    }

    public String get_image() {
        return _image;
    }

    public void set_image(String _image) {
        this._image = _image;
    }


}

