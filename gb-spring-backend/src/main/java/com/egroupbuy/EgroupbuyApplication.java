package com.egroupbuy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class EgroupbuyApplication {

	public static void main(String[] args) {
		SpringApplication.run(EgroupbuyApplication.class, args);
	}

}
