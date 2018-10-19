package io.github.arakat.arakatcommunity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"io.github.arakat.arakatcommunity.*"})
@EntityScan("io.github.arakat.arakatcommunity.model")
@EnableMongoRepositories("io.github.arakat.arakatcommunity.*")
public class ArakatApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArakatApplication.class, args);
	}
}
