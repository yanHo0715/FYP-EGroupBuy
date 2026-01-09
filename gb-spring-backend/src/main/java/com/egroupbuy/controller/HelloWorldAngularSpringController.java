package com.egroupbuy.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 4800)
@RestController
@RequestMapping("/api/gb/")
public class HelloWorldAngularSpringController {
    @GetMapping("/helloworld")
    public String helloworld() {

/* For test database connectivity
        CustomerDA d = new CustomerDA();
        d.signup_new();
*/

        return "Angular+SpringBoot - Hello World!";
    }
}
