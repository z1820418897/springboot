package com.gcrobot.doorkeeper;


import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.sql.DataSource;

@RunWith(SpringRunner.class)
@Slf4j
@SpringBootTest
public class DoorkeeperApplicationTests {

    @Autowired
    DataSource dataSource;

    @Test
    public void contextLoads() {

        System.out.println("你好"+dataSource.toString());
        log.debug("aaaaaaaaaa");
    }

}