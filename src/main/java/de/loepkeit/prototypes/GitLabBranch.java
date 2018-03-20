package de.loepkeit.prototypes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GitLabBranch {
	
	int id;
	String description;
	String name_with_namespace;
	String path;
	String path_with_namespace;
	String created_at;
	String default_branch;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getName_with_namespace() {
		return name_with_namespace;
	}
	public void setName_with_namespace(String name_with_namespace) {
		this.name_with_namespace = name_with_namespace;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getPath_with_namespace() {
		return path_with_namespace;
	}
	public void setPath_with_namespace(String path_with_namespace) {
		this.path_with_namespace = path_with_namespace;
	}
	public String getCreated_at() {
		return created_at;
	}
	public void setCreated_at(String created_at) {
		this.created_at = created_at;
	}
	public String getDefault_branch() {
		return default_branch;
	}
	public void setDefault_branch(String default_branch) {
		this.default_branch = default_branch;
	}
	
	

}
