package by.usovich.dto;

/**
 * Created by yansolo on 19.05.2018.
 */
public class TourneyDto {

    private String id;

    private String titel;

    private String name;

    private String date;

    private long fund;

    private String imgLogo;

    public TourneyDto(String name, String date, long fund, String imgLogo) {
        this.name = name;
        this.date = date;
        this.fund = fund;
        this.imgLogo = imgLogo;
    }

    public TourneyDto(String id, String name, String date, long fund, String imgLogo) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.fund = fund;
        this.imgLogo = imgLogo;
    }

    public TourneyDto(String id, String titel, String name, String date, long fund, String imgLogo) {
        this.id = id;
        this.titel = titel;
        this.name = name;
        this.date = date;
        this.fund = fund;
        this.imgLogo = imgLogo;
    }

    public TourneyDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public long getFund() {
        return fund;
    }

    public void setFund(long fund) {
        this.fund = fund;
    }

    public String getImgLogo() {
        return imgLogo;
    }

    public void setImgLogo(String imgLogo) {
        this.imgLogo = imgLogo;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }
}
