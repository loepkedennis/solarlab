package de.loepkeit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.loepkeit.model.ApplicationUser;
import de.loepkeit.model.Setting;
import de.loepkeit.model.Task;
import de.loepkeit.repository.ApplicationUserRepository;
import de.loepkeit.repository.TaskRepository;
import de.loepkeit.security.SecurityConstants;
import io.jsonwebtoken.Jwts;

import static de.loepkeit.security.SecurityConstants.TOKEN_PREFIX;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/tasks")
public class TaskController {

	@Autowired
	private TaskRepository taskRepository;
	
	@Autowired
	private ApplicationUserRepository applicationUserRepository;

	public TaskController(TaskRepository taskRepository) {
		this.taskRepository = taskRepository;
	}
	
	@PutMapping()
	public void editTask(@RequestHeader(value="Authorization")  String authHeader, @RequestBody Task task) {
		String user = Jwts.parser()
                .setSigningKey(SecurityConstants.SECRET)
                .parseClaimsJws(authHeader.replace(TOKEN_PREFIX, ""))
                .getBody()
                .getSubject();
		ApplicationUser appUser = applicationUserRepository.findByUsername(user);
		Task item = taskRepository.findById(task.getId());
		item = task;
		item.setUser(appUser);
		taskRepository.save(item);
	}

	@PostMapping
	public Task addTask(@RequestHeader(value="Authorization")  String authHeader, @RequestBody Task task) {
		String user = Jwts.parser()
                .setSigningKey(SecurityConstants.SECRET)
                .parseClaimsJws(authHeader.replace(TOKEN_PREFIX, ""))
                .getBody()
                .getSubject();
		ApplicationUser appUser = applicationUserRepository.findByUsername(user);
		task.setUser(appUser);
		appUser.getTasks().add(task);
		taskRepository.save(task);
		return task;
		
		
	}
	
	@GetMapping("/{id}")
	public Task getTaskid(@PathVariable String id) {
		Task task =  taskRepository.findById(id);
		if(task != null) {
			return task;
		}
		else {
			throw new IllegalArgumentException("Task nicht gefunden!");
		}
	}
	
    @ExceptionHandler
    void handleIllegalArgumentException(
      IllegalArgumentException e, HttpServletResponse response) throws IOException {
      response.sendError(HttpStatus.NOT_FOUND.value());
    }

	@GetMapping
	public List<Task> getTasks() {
		return taskRepository.findAll();
	}



	@DeleteMapping("/{id}")
	public void deleteTask(@PathVariable String id) {
		Task task = taskRepository.findById(id);
		ApplicationUser user = applicationUserRepository.findByTasksId(id);
		user.getTasks().remove(task);
		applicationUserRepository.save(user);
		//taskRepository.delete(task.getTaskid());
	}
	

}
