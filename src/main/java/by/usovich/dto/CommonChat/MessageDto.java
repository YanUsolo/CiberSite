package by.usovich.dto.CommonChat;

/**
 * Created by yanus on 9/6/2017.
 */
public class MessageDto {

    String _nick;

    String _avatar;

    String _time;

    String _content;

    public MessageDto() {

    }

    public String get_nick() {
        return _nick;
    }

    public void set_nick(String _nick) {
        this._nick = _nick;
    }

    public String get_avatar() {
        return _avatar;
    }

    public void set_avatar(String _avatar) {
        this._avatar = _avatar;
    }

    public String get_time() {
        return _time;
    }

    public void set_time(String _time) {
        this._time = _time;
    }

    public String get_content() {
        return _content;
    }

    public void set_content(String _content) {
        this._content = _content;
    }
}
