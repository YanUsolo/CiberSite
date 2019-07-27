package by.usovich.service.Imp;

import by.usovich.service.CommonChatServiceInterface;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

/**
 * Created by yanus on 9/6/2017.
 */
@Service("cChatService")
public class CommonChatServiceImplement implements CommonChatServiceInterface {

    private static final Logger log = Logger.getLogger(CommonChatServiceImplement.class);

    @Override
    public String getLastMessage(String nick) {
        return null;
    }

    @Override
    public String setMessage(String nick, String content) {
        return null;
    }

    @Override
    public String getLastMessages() {
        return null;
    }
}
