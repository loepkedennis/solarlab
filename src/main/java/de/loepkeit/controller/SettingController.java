package de.loepkeit.controller;

import static de.loepkeit.security.SecurityConstants.TOKEN_PREFIX;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.loepkeit.model.ApplicationUser;
import de.loepkeit.model.Setting;
import de.loepkeit.repository.ApplicationUserRepository;
import de.loepkeit.repository.SettingRepository;
import de.loepkeit.security.SecurityConstants;
import io.jsonwebtoken.Jwts;

@RestController
@RequestMapping("/setting")
public class SettingController {
	
	private static final Logger log = LoggerFactory.getLogger(SettingController.class);
	
	@Autowired
	private SettingRepository settingRepository;
	
	@Autowired
	private ApplicationUserRepository applicationUserRepository;
	
	@PostMapping
	public void addSetting(@RequestBody Setting setting) {
		settingRepository.save(setting);
	}
	
	@PostMapping(path="/user")
	public Setting postSetting(@RequestHeader(value="Authorization")  String authHeader, @RequestBody Setting setting) {
		String user = Jwts.parser()
                .setSigningKey(SecurityConstants.SECRET)
                .parseClaimsJws(authHeader.replace(TOKEN_PREFIX, ""))
                .getBody()
                .getSubject();
		Setting usersetting = settingRepository.findByUserUsername(user);
		log.info("TEST "+user);
		usersetting.setGitlabapitoken(setting.getGitlabapitoken());
		usersetting.setGitlaburl(setting.getGitlaburl());
		usersetting.setTrellokey(setting.getTrellokey());
		usersetting.setTrellotoken(setting.getTrellotoken());
		usersetting.setTrellourl(setting.getTrellourl());
		settingRepository.save(usersetting);
		
		return usersetting;
	}
	
	@GetMapping(path="/user")
	public Setting getSetting(@RequestHeader(value="Authorization")  String authHeader) {
		String user = Jwts.parser()
                .setSigningKey(SecurityConstants.SECRET)
                .parseClaimsJws(authHeader.replace(TOKEN_PREFIX, ""))
                .getBody()
                .getSubject();
		ApplicationUser appuser = applicationUserRepository.findByUsername(user);
		log.info(appuser.getUsername());
		return settingRepository.findByUserUsername(user);
	}
	
	@GetMapping
	public List<Setting> getSettings() {
		return settingRepository.findAll();
	}

}
