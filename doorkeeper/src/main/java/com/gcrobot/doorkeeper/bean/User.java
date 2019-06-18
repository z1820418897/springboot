package com.gcrobot.doorkeeper.bean;

import java.io.Serializable;

public class User implements Serializable {

    private Integer userid;//int(10)
    private String username;//varchar(20)
    private String password;//varchar(16)
    private Integer type;//int(2)

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }


}
