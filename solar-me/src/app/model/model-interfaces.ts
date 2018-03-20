export interface Tag {
  label: string;
}
export interface User {
  username?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  tasks?: Task[];
}

export interface Setting {
  gitlaburl?: string;
	gitlabapitoken?: string;
	trellourl?: string;
	trellotoken?: string;
  trellokey?: string;
	
}

export interface Profil{
  username?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  passwordw?: string;
  key?: string;
}

export interface Gitlab{
  id?: number;
  name_with_namespace?: string;
  http_url_to_repo?: string;
  web_url?: string;
}

export interface Trello{
  id?: string;
  name?: string;
  idBoard?: string;
  pos?: number;
}

export interface Task {
  id?: string;
  name?: string;
  desc?: string;
  projectId?: number;
  taskid?: number;
  mergeby?: string;
  
}


