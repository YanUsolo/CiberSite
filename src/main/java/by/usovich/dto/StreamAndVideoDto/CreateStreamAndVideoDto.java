package by.usovich.dto.StreamAndVideoDto;

/**
 * Created by yanus on 10/2/2017.
 */
public class CreateStreamAndVideoDto {

    private String type;

    private String titel;

    private String name;


    private String refVideo;

    private String refImage;

    private String date;

    public CreateStreamAndVideoDto() {

    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRefVideo() {
        return refVideo;
    }

    public void setRefVideo(String refVideo) {
        this.refVideo = refVideo;
    }

    public String getRefImage() {
        return refImage;
    }

    public void setRefImage(String refImage) {
        this.refImage = refImage;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
