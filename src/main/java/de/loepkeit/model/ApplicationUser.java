package de.loepkeit.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;



@Entity
public class ApplicationUser {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    
    @Column(unique=true)
    @Email
    @NotNull
    private String username;
    
    private String firstname;
    
    private String lastname;
    
    @NotNull
    private String password;
    
    @JsonBackReference
    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Setting applicationSettings;
    
    @JsonManagedReference
    @OneToMany(cascade=CascadeType.PERSIST,  orphanRemoval=true)
    private Set<Task> tasks = new HashSet<Task>();
    
    public long getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
	public Setting getApplicationSettings() {
		return applicationSettings;
	}
	public void setApplicationSettings(Setting applicationSettings) {
		this.applicationSettings = applicationSettings;
	}
	public Set<Task> getTasks() {
		return tasks;
	}
	public void setTasks(Set<Task> tasks) {
		this.tasks = tasks;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
       
	
}
