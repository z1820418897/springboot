package com.gcrobot.doorkeeper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@SpringBootApplication
public class DoorkeeperApplication {
    public static void main(String[] args) {
        SpringApplication.run(DoorkeeperApplication.class, args);
    }
}
