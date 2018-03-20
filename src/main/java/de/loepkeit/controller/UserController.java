package de.loepkeit.controller;

import static de.loepkeit.security.SecurityConstants.TOKEN_PREFIX;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.loepkeit.model.ApplicationUser;
import de.loepkeit.model.Setting;
import de.loepkeit.repository.ApplicationUserRepository;
import de.loepkeit.security.SecurityConstants;
import io.jsonwebtoken.Jwts;

@RestController
@RequestMapping("/user")
public class UserController {
    
	@Autowired
	private ApplicationUserRepository applicationUserRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    
    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    
    public UserController(ApplicationUserRepository applicationUserRepository,
                          BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.applicationUserRepository = applicationUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    
    @PostMapping("/sign-up")
    public void signUp(@Valid @RequestBody ApplicationUser user) {
    		
    		if(applicationUserRepository.findByUsername( user.getUsername())!=null) {
    			log.error("### Email Adresse schon vorhanden!");
    			throw new IllegalArgumentException("User bereits vorhanden!");
    		}
    		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
    		Setting setting = new Setting();
    		setting.setUser(user);
    		setting.setGitlabapitoken("");
        user.setApplicationSettings(setting);
        applicationUserRepository.save(user);
    }
    
	@GetMapping
	public ApplicationUser getUser(@RequestHeader(value="Authorization")  String authHeader) {
	    String user = Jwts.parser()
                .setSigningKey(SecurityConstants.SECRET)
                .parseClaimsJws(authHeader.replace(TOKEN_PREFIX, ""))
                .getBody()
                .getSubject();
	    
		return applicationUserRepository.findByUsername(user);	
	}

	@PutMapping
	public void editTask(@RequestHeader(value="Authorization")  String authHeader, @RequestBody ApplicationUser updateuser) {
	    String user = Jwts.parser()
                .setSigningKey(SecurityConstants.SECRET)
                .parseClaimsJws(authHeader.replace(TOKEN_PREFIX, ""))
                .getBody()
                .getSubject();
		ApplicationUser existingUser = applicationUserRepository.findByUsername(user);
		//Assert.notNull(existingTask, "Task not found");
		if(updateuser.getPassword() != null && !updateuser.getPassword().isEmpty()) {
			existingUser.setPassword(bCryptPasswordEncoder.encode(updateuser.getPassword()));
		}
		if(updateuser.getUsername() != null && !updateuser.getUsername().isEmpty()) {
			existingUser.setUsername(updateuser.getUsername());
		}
		applicationUserRepository.save(existingUser);
		
	}
	
	@PostMapping
	public ApplicationUser updateUser(@RequestHeader(value="Authorization")  String authHeader, @RequestBody ApplicationUser updateuser) {
		String user = Jwts.parser()
                .setSigningKey(SecurityConstants.SECRET)
                .parseClaimsJws(authHeader.replace(TOKEN_PREFIX, ""))
                .getBody()
                .getSubject();
		ApplicationUser appuser = applicationUserRepository.findByUsername(user); 
		appuser.setFirstname(updateuser.getFirstname());
		appuser.setLastname(updateuser.getLastname());
		appuser.setPassword(bCryptPasswordEncoder.encode(updateuser.getPassword()));

		applicationUserRepository.save(appuser);
		
		return appuser;
	}
    
    @ExceptionHandler
    void handleIllegalArgumentException(
      IllegalArgumentException e, HttpServletResponse response) throws IOException {
      response.sendError(HttpStatus.BAD_REQUEST.value());
    }
    

}
