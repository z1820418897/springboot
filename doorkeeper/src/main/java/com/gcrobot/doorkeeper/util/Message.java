package com.gcrobot.doorkeeper.util;

import java.io.Serializable;

public class Message implements Serializable {

    private String is;
    private String msg;
    private Object obj;

    public String getIs() {
        return is;
    }

    public void setIs(String is) {
        this.is = is;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }


    @Override
    public String toString() {
        return "Message{" +
                "is='" + is + '\'' +
                ", msg='" + msg + '\'' +
                '}';
    }
}
