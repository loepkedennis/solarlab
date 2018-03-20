package de.loepkeit.config;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;

import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import de.loepkeit.prototypes.GitLabBranch;
import de.loepkeit.repository.TaskRepository;





@Component
public class Schedule {

    
    private static final Logger log = LoggerFactory.getLogger(Schedule.class);
	
	@Autowired
	private TaskRepository taskrepository;
	
	@Scheduled(cron = "*/59 * * * * * ")
	public void mergeFutureBranch() throws InterruptedException {
		//calendarItems = calendarclient.neu();
		//taskItems = taskclient.neu();
		
		/*
		for (CalendarEntry eintrag: calendarItems) {
			DateFormat dfmt = new SimpleDateFormat( "dd.MM.yyyy" );
			Date heute = new Date();
			if(eintrag.getNotificationDate().equals(dfmt.format(heute))) {
				
				SimpleMailMessage msg = new SimpleMailMessage();
				msg.setFrom("shepherd@loepke-it.de");
				msg.setTo("shepherd@loepke-it.de");
				msg.setSubject("[Erinnerungen]");
				msg.setText("Diese eMail soll dich an deine Termine erinnern");
				
				sender.send(msg);
				
			}
		}
		*/
		//taskrepository.findAll()
		
		RestTemplate restTemplate = new RestTemplate();
		String fooResourceUrl
		  = "https://gitlab.com/api/v4/groups/2198287/projects?private_token=8SvBtG-9SfqiK9C4LgXV";
		
		ResponseEntity<List<GitLabBranch>> rateResponse =
		        restTemplate.exchange(fooResourceUrl,
		                    HttpMethod.GET, null, new ParameterizedTypeReference<List<GitLabBranch>>() {
		            });
		List<GitLabBranch> branches = rateResponse.getBody();
		log.info("### Die Listgröße beträgt:"+ branches.size());
		log.info("### Branchid von Liste 1:"+branches.get(0).getId());
		
		
		}
		
	
}
