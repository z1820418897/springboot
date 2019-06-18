package com.gcrobot.doorkeeper.mapper;

import com.gcrobot.doorkeeper.bean.User;
import com.gcrobot.doorkeeper.util.PageHelp;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    public List<User> selectUserByAll();
    public void insertUser(User user);


    /**
     * 分页
     * */
    public Integer findUserCount();
    public List<User> findAllUser(PageHelp pageHelp);


}
