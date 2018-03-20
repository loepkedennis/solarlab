package de.loepkeit.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
public class Task {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long taskid;
	@Column(unique=true)
	@NotNull
	private String id;
	private String name;
	private String desc;
	private String projectId;
	private String mergeby;
	private boolean autobranch;
	
	@JsonBackReference
	@ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.REFRESH})
	@NotNull
	private ApplicationUser user;

	public Task() { }

	public Task(String desc) {
		this.desc = desc;
	}

	public String getId() {
		return id;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public long getTaskid() {
		return taskid;
	}

	public void setTaskid(long taskid) {
		this.taskid = taskid;
	}

	public boolean isAutobranch() {
		return autobranch;
	}

	public void setAutobranch(boolean autobranch) {
		this.autobranch = autobranch;
	}

	public ApplicationUser getUser() {
		return user;
	}

	public void setUser(ApplicationUser user) {
		this.user = user;
	}

	public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMergeby() {
		return mergeby;
	}

	public void setMergeby(String mergeby) {
		this.mergeby = mergeby;
	}
	
	
	
	
}
