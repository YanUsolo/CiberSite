package by.usovich.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by yansolo on 19.05.2018.
 */
@Entity
@Table(name = "tourney")
public class TourneyEntity implements Serializable{
    @Id
    @Column(name = "tourney_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int _id;

    @Column(name = "tourney_name")
    private String _name;

    @Column(name = "tourney_titel")
    private String _titel;

    @Column(name = "tourney_refImage")
    private String _refImage;


    //ToDo//Need use type Date
    @Column(name = "tourney_date")
    private String _date;

    @Column(name = "tourney_fund")
    private long _fund;

    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

    public String get_name() {
        return _name;
    }

    public void set_name(String _name) {
        this._name = _name;
    }

    public String get_refImage() {
        return _refImage;
    }

    public void set_refImage(String _refImage) {
        this._refImage = _refImage;
    }

    public String get_date() {
        return _date;
    }

    public void set_date(String _date) {
        this._date = _date;
    }

    public long get_fund() {
        return _fund;
    }

    public void set_fund(long _fund) {
        this._fund = _fund;
    }

    public String get_titel() {
        return _titel;
    }

    public void set_titel(String _titel) {
        this._titel = _titel;
    }
}
