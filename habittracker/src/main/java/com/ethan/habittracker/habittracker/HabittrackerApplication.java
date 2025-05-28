package com.ethan.habittracker.habittracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class HabittrackerApplication {

	public static void main(String[] args) {

		Dotenv dotenv = Dotenv.load();
		
		SpringApplication.run(HabittrackerApplication.class, args);
	}

}
