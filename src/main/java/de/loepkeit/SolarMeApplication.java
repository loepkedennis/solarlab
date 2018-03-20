package de.loepkeit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import de.loepkeit.security.JWTAuthenticationFilter;

@SpringBootApplication
public class SolarMeApplication {
	

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    

	public static void main(String[] args) {
		SpringApplication.run(SolarMeApplication.class, args);
	}
}
