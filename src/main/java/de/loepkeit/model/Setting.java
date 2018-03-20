package de.loepkeit.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Setting {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;
	private String gitlaburl;
	private String gitlabapitoken;
	private String trellourl;
	private String trellotoken;
	private String trellokey;
	
	
	@JsonManagedReference
	@OneToOne(mappedBy="applicationSettings",  cascade=CascadeType.ALL)
	private ApplicationUser user;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getGitlaburl() {
		return gitlaburl;
	}

	public void setGitlaburl(String gitlaburl) {
		this.gitlaburl = gitlaburl;
	}

	public String getGitlabapitoken() {
		return gitlabapitoken;
	}

	public void setGitlabapitoken(String gitlabapitoken) {
		this.gitlabapitoken = gitlabapitoken;
	}

	public String getTrellourl() {
		return trellourl;
	}

	public void setTrellourl(String trellourl) {
		this.trellourl = trellourl;
	}

	public String getTrellotoken() {
		return trellotoken;
	}

	public void setTrellotoken(String trellotoken) {
		this.trellotoken = trellotoken;
	}

	public String getTrellokey() {
		return trellokey;
	}

	public void setTrellokey(String trellokey) {
		this.trellokey = trellokey;
	}

	public ApplicationUser getUser() {
		return user;
	}

	public void setUser(ApplicationUser user) {
		this.user = user;
	}

	
	

}
