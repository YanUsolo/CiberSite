package by.usovich.dto.NewsDto;

/**
 * Created by yanus on 10/8/2017.
 */
public class CreateNewsDto {

    private String titel;

    private String name;

    private String content;

    private String refImage;

    private String date;

    public CreateNewsDto() {

    }

    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}


