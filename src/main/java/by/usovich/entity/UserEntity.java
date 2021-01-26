package by.usovich.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by yanus on 7/11/2017.
 */
@Entity
@Table(name = "user", schema = "cibersite")
public class UserEntity implements Serializable {


    @Id
    @Column(name = "user_id", insertable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int _id;

    @Column(name = "user_nick")
    private String _login;

    @Column(name = "user_email")
    private String _email;

    @Column(name = "user_password")
    private String _password;


    @Column(name = "user_country")
    private String _country;


    @Column(name = "fk_games_id", insertable = false, updatable = false)
    private boolean fk_games_id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_games_id", referencedColumnName = "games_id")
    private GamesEntity gamesEntity;

    public UserEntity() {
    }

    public UserEntity(String _login, String _email, String _password, String _country) {
        this._login = _login;
        this._email = _email;
        this._password = _password;
        this._country = _country;
    }

    public boolean isFk_games_id() {
        return fk_games_id;
    }

    public void setFk_games_id(boolean fk_games_id) {
        this.fk_games_id = fk_games_id;
    }

    public GamesEntity getGamesEntity() {
        return gamesEntity;
    }

    public void setGamesEntity(GamesEntity gamesEntity) {
        this.gamesEntity = gamesEntity;
    }

    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

    public String get_login() {
        return _login;
    }

    public void set_login(String _login) {
        this._login = _login;
    }

    public String get_email() {
        return _email;
    }

    public void set_email(String _email) {
        this._email = _email;
    }

    public String get_password() {
        return _password;
    }

    public void set_password(String _password) {
        this._password = _password;
    }

    public String get_country() {
        return _country;
    }

    public void set_country(String _country) {
        this._country = _country;
    }

}