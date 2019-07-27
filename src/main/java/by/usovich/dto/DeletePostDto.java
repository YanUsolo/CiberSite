package by.usovich.dto;

/**
 * Created by yanus on 10/8/2017.
 */
public class DeletePostDto {

    private String titel;

    private String type;

    private String id;

    public DeletePostDto() {

    }

    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
