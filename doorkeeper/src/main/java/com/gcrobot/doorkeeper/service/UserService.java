package com.gcrobot.doorkeeper.service;

import com.gcrobot.doorkeeper.bean.User;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserService {

    public List<User> selectUserByAll();

    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
    public void insertUser(User user);

    //分页查询
    //查询总条数
    Integer findUserCount();
    //分页查询数据
    List<User> findAllUser(Integer page, Integer limit);
}
