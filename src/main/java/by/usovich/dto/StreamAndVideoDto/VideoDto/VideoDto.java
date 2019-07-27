package by.usovich.dto.StreamAndVideoDto.VideoDto;

/**
 * Created by yanus on 8/19/2017.
 */
public class VideoDto {

    private String _id;

    private String _titel;

    private String _name;

    private String _refVideo;

    private String _refImage;

    private String _data;

    public VideoDto(String _titel, String _name, String _refVideo, String _refImage, String _data) {
        this._titel = _titel;
        this._name = _name;
        this._refVideo = _refVideo;
        this._refImage = _refImage;
        this._data = _data;
    }

    public VideoDto(String _id, String _titel, String _name, String _refVideo, String _refImage, String _data) {
        this._id = _id;
        this._titel = _titel;
        this._name = _name;
        this._refVideo = _refVideo;
        this._refImage = _refImage;
        this._data = _data;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
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
