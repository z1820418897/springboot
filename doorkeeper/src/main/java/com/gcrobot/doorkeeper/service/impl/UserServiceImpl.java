package com.gcrobot.doorkeeper.service.impl;

import com.gcrobot.doorkeeper.bean.User;
import com.gcrobot.doorkeeper.mapper.UserMapper;
import com.gcrobot.doorkeeper.service.UserService;
import com.gcrobot.doorkeeper.util.PageHelp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;


    @Override
    public List<User> selectUserByAll() {

        List<User> users=userMapper.selectUserByAll();

        return users;
    }


    @Override
    public void insertUser(User user) {
        userMapper.insertUser(user);

    }


    /**
     * @return count 查询总条数
     * */

    @Override
    public Integer findUserCount() {

        Integer count=userMapper.findUserCount();

        return count;
    }

    /**
     * @param page 当前页
     * @param limit 每页多少条
     * @return 集合数据
     * */
    @Override
    public List<User> findAllUser(Integer page, Integer limit) {

        PageHelp pageHelp=new PageHelp();
        pageHelp.setStart((page-1)*limit);
        pageHelp.setEnd(limit);


        List<User> users=userMapper.findAllUser(pageHelp);


        return users;
    }


}
