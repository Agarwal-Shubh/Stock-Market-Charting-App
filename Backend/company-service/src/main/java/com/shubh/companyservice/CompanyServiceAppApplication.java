package com.shubh.companyservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class CompanyServiceAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(CompanyServiceAppApplication.class, args);
	}

}
