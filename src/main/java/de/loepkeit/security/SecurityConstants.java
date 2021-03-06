package de.loepkeit.security;

import org.springframework.beans.factory.annotation.Value;

public class SecurityConstants {
	
	@Value("${secret}")
    public static final String SECRET = "test123";
	@Value("${expiration_time}")
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days 120000;
	
    public static final String TOKEN_PREFIX = "Bearer ";
    
    public static final String HEADER_STRING = "Authorization";
    
    public static final String SIGN_UP_URL = "/user/sign-up";
    
    public static final String LOGIN_URL = "/login";

}
