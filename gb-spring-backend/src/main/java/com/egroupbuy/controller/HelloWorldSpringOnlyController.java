package com.egroupbuy.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldSpringOnlyController {
    @RequestMapping("/")
    public String hello()
    {
        return "SpringBoot Backend - Hello World! ";
    }
}