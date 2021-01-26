package by.usovich.service;

/**
 * Created by yanus on 9/6/2017.
 */
public interface CommonChatServiceInterface {

    String getLastMessage(String nick);

    String setMessage(String nick, String content);

    String getLastMessages();
}
