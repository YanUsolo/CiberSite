package by.usovich.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by yanus on 8/19/2017.
 */
@Entity
@Table(name = "streams")
public class StreamEntity implements Serializable{

    @Id
    @Column(name = "streams_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int _id;

    @Column(name = "streams_titel")
    private String _titel;

    @Column(name = "streams_name")
    private String _name;

    @Column(name = "streams_refVideo")
    private String _refVideo;

    @Column(name = "streams_refImage")
    private String _refImage;

    @Column(name = "streams_data")
    private String _data;

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

    public String get_name() {
        return _name;
    }

    public void set_name(String _name) {
        this._name = _name;
    }

    public String get_refVideo() {
        return _refVideo;
    }

    public void set_refVideo(String _refVideo) {
        this._refVideo = _refVideo;
    }

    public String get_refImage() {
        return _refImage;
    }

    public void set_refImage(String _refImage) {
        this._refImage = _refImage;
    }

    public String get_data() {
        return _data;
    }

    public void set_data(String _data) {
        this._data = _data;
    }
}
