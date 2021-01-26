package by.usovich.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by yanus on 7/23/2017.
 */
@Entity
@Table(name = "games", schema = "cibersite")
public class GamesEntity implements Serializable {

    @Id
    @Column(name = "games_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int _id;

    @Column(name = "games_numberVisitDota")
    private int numberVisitDota;

    @Column(name = "games_numberVisitParagon")
    private int numberVisitParagon;

    @Column(name = "games_numberVisitCs")
    private int numberVisitCs;

    @Column(name = "games_numberVisitWOT")
    private int numberVisitWOT;

    @OneToOne(mappedBy = "gamesEntity")
    private UserEntity userEntity;

    public GamesEntity(int numberVisitDota, int numberVisitParagon, int numberVisitCs, int numberVisitWOT) {
        this.numberVisitDota = numberVisitDota;
        this.numberVisitParagon = numberVisitParagon;
        this.numberVisitCs = numberVisitCs;
        this.numberVisitWOT = numberVisitWOT;
    }

    public GamesEntity(int numberVisitDota, int numberVisitParagon, int numberVisitCs, int numberVisitWOT, UserEntity userEntity) {
        this.numberVisitDota = numberVisitDota;
        this.numberVisitParagon = numberVisitParagon;
        this.numberVisitCs = numberVisitCs;
        this.numberVisitWOT = numberVisitWOT;
        this.userEntity = userEntity;
    }

    public GamesEntity() {
    }

    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

    public int getNumberVisitDota() {
        return numberVisitDota;
    }

    public void setNumberVisitDota(int numberVisitDota) {
        this.numberVisitDota = numberVisitDota;
    }

    public int getNumberVisitParagon() {
        return numberVisitParagon;
    }

    public void setNumberVisitParagon(int numberVisitParagon) {
        this.numberVisitParagon = numberVisitParagon;
    }

    public int getNumberVisitCs() {
        return numberVisitCs;
    }

    public void setNumberVisitCs(int numberVisitCs) {
        this.numberVisitCs = numberVisitCs;
    }

    public int getNumberVisitWOT() {
        return numberVisitWOT;
    }

    public void setNumberVisitWOT(int numberVisitWOT) {
        this.numberVisitWOT = numberVisitWOT;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }
}
