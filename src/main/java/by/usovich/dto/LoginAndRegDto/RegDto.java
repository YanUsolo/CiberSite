package by.usovich.dto.LoginAndRegDto;

/**
 * Created by yanus on 7/13/2017.
 */
import java.util.Map;
import java.util.HashMap;
public class RegDto {

    private String login;
    private String email;
    private String password;
    private String repassword;
    private String country;

    private Map games =  new HashMap<String,String>();


    public RegDto(){

        games.put("dota",0 + "");
        games.put("cs",0 + "");
        games.put("paragon",0 + "");
        games.put("wot",0 + "");

    }

    public RegDto(String nick, String email, String password, String repassword, String country) {
        this.login = nick;
        this.email = email;
        this.password = password;
        this.repassword = repassword;
        this.country = country;


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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRepassword() {
        return repassword;
    }

    public void setRepassword(String repassword) {
        this.repassword = repassword;
    }

    public String getGame(String key) {
        return games.get(key).toString();
    }



    public String getCountry() {return country;}

    public void setCountry(String country) {this.country = country;}

    public String toStringForGames(){

        return games.toString();

    }


}
