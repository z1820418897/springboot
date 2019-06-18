package com.gcrobot.doorkeeper.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Slf4j
@Controller
public class ViewController {


    @RequestMapping("/user/login")
    public String login(@RequestParam(value = "username",defaultValue = "") String username,
                        @RequestParam(value = "password",defaultValue = "") String password,
                        @RequestParam(value = "remember",defaultValue = "") String remember,
                        Map<String,Object> map, HttpSession session, HttpServletRequest request){

        log.info("账号请求登录："+username+"---"+remember);

        if (!StringUtils.isEmpty(username) && "123".equals(password)){
            session.setAttribute("username",username);
            return "redirect:/index.html";
        }else if(StringUtils.isEmpty(username)){

            return "redirect:/login.html";
        }else{
            map.put("msg","账号或密码错误");
            request.setAttribute("msg","账号或密码错误");
            return "login";
        }

    }


}
