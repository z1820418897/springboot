package com.gcrobot.doorkeeper.util;

import java.io.Serializable;

public class PageHelp implements Serializable{

    private static final long serialVersionUID = 1L;

    private int page;
    private int limit;

    private int start;
    private int end;


    public int getStart() {
        return start;
    }
    public void setStart(int start) {
        this.start = start;
    }
    public int getEnd() {
        return end;
    }
    public void setEnd(int end) {
        this.end = end;
    }
    public int getPage() {
        return page;
    }
    public void setPage(int page) {
        this.page = page;
    }
    public int getLimit() {
        return limit;
    }
    public void setLimit(int limit) {
        this.limit = limit;
    }
    public static long getSerialversionuid() {
        return serialVersionUID;
    }


}
