package com.gcrobot.doorkeeper.controller;

import com.gcrobot.doorkeeper.bean.User;
import com.gcrobot.doorkeeper.service.UserService;
import com.gcrobot.doorkeeper.util.LayuiDataGrid;
import com.gcrobot.doorkeeper.util.Message;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class UserController {


    @Autowired
    private UserService userService;

    @RequestMapping("/selectUserByAll")
    public Message selectUserByAll(){
        log.info("selectUserByAll被访问");

        List<User> users=userService.selectUserByAll();
        Message msg=new Message();
        msg.setIs("true");
        msg.setMsg("你好");

        return msg;
    }

    @PostMapping("/insertUser")
    public Message insertUser(){
        User user=new User();
        user.setUsername("15893997897");
        user.setPassword("123456");
        user.setType(0);
        userService.insertUser(user);
        Message msg=new Message();
        msg.setIs("true");
        msg.setMsg("你好");
        return msg;
    }


    @PostMapping("findAllUser")
    public LayuiDataGrid findAllUser(@RequestParam("page") Integer page, @RequestParam("limit")Integer limit){
        LayuiDataGrid layuiDataGrid = new LayuiDataGrid();

        Integer count=userService.findUserCount();
        List<User> users=userService.findAllUser(page,limit);


        return layuiDataGrid;
    }


    /*@PostMapping("findMenuByType")
    public List<Menu> findMenuByType(){

    }*/


}
