package de.loepkeit.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import de.loepkeit.model.ApplicationUser;
import de.loepkeit.model.Task;

public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {
    ApplicationUser findByUsername(String username);
    ApplicationUser findByTasksId(String id);
    ApplicationUser findByTasksTaskid(long id);
    
}