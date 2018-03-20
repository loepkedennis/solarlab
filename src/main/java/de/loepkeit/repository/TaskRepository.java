package de.loepkeit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.loepkeit.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
	Task findByUserUsername(String username);
	Task findById(String taskid);
	
}
