package by.usovich.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by yanus on 8/19/2017.
 */
@Entity
@Table(name = "video", schema = "cibersite", catalog = "")
public class VideoEntity implements Serializable {

    @Id
    @Column(name = "video_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int _id;

    @Column(name = "video_titel")
    private String _titel;

    @Column(name = "video_name")
    private String _name;

    @Column(name = "video_refVideo")
    private String _refVideo;

    @Column(name = "video_refImage")
    private String _refImage;

    @Column(name = "video_data")
    private String _data;
    private int videoId;
    private String videoTitel;
    private String videoName;
    private String videoRefVideo;
    private String videoRefImage;
    private String videoData;

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

    @Id
    @Column(name = "video_id", nullable = false)
    public int getVideoId() {
        return videoId;
    }

    public void setVideoId(int videoId) {
        this.videoId = videoId;
    }

    @Basic
    @Column(name = "video_titel", nullable = true, length = 100)
    public String getVideoTitel() {
        return videoTitel;
    }

    public void setVideoTitel(String videoTitel) {
        this.videoTitel = videoTitel;
    }

    @Basic
    @Column(name = "video_name", nullable = true, length = 100)
    public String getVideoName() {
        return videoName;
    }

    public void setVideoName(String videoName) {
        this.videoName = videoName;
    }

    @Basic
    @Column(name = "video_refVideo", nullable = true, length = 100)
    public String getVideoRefVideo() {
        return videoRefVideo;
    }

    public void setVideoRefVideo(String videoRefVideo) {
        this.videoRefVideo = videoRefVideo;
    }

    @Basic
    @Column(name = "video_refImage", nullable = true, length = 100)
    public String getVideoRefImage() {
        return videoRefImage;
    }

    public void setVideoRefImage(String videoRefImage) {
        this.videoRefImage = videoRefImage;
    }

    @Basic
    @Column(name = "video_data", nullable = true, length = 12)
    public String getVideoData() {
        return videoData;
    }

    public void setVideoData(String videoData) {
        this.videoData = videoData;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VideoEntity that = (VideoEntity) o;

        if (videoId != that.videoId) return false;
        if (videoTitel != null ? !videoTitel.equals(that.videoTitel) : that.videoTitel != null) return false;
        if (videoName != null ? !videoName.equals(that.videoName) : that.videoName != null) return false;
        if (videoRefVideo != null ? !videoRefVideo.equals(that.videoRefVideo) : that.videoRefVideo != null)
            return false;
        if (videoRefImage != null ? !videoRefImage.equals(that.videoRefImage) : that.videoRefImage != null)
            return false;
        if (videoData != null ? !videoData.equals(that.videoData) : that.videoData != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = videoId;
        result = 31 * result + (videoTitel != null ? videoTitel.hashCode() : 0);
        result = 31 * result + (videoName != null ? videoName.hashCode() : 0);
        result = 31 * result + (videoRefVideo != null ? videoRefVideo.hashCode() : 0);
        result = 31 * result + (videoRefImage != null ? videoRefImage.hashCode() : 0);
        result = 31 * result + (videoData != null ? videoData.hashCode() : 0);
        return result;
    }
}

