package com.gcrobot.doorkeeper.util;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 登录拦截器
 * */
public class LoginHandlerInterceptor implements HandlerInterceptor {


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws ServletException, IOException {
        Object user = request.getSession().getAttribute("username");

        if(user!=null){
            return true;
        }else{
            request.setAttribute("msg","请先登录");
            request.getRequestDispatcher("/login.html").forward(request,response);
            return false;
        }


    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {


    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {



    }
}
