package by.usovich.dto;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by yanus on 8/3/2017.
 */
public class UserDto {

    private String login;
    private String email;

    private String country;

    private Map<String, String> games = new HashMap<String, String>();

    public UserDto() {
    }

    public UserDto(String nick, String email, String password, String repassword, String country) {
        this.login = nick;
        this.email = email;
        this.country = country;

        games.put("dota", 0 + "");
        games.put("cs", 0 + "");
        games.put("paragon", 0 + "");
        games.put("wot", 0 + "");
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setGame(Map<String, String> games) {
        this.games = games;
    }

    public String getGame(String key) {
        return games.get(key);
    }

}
