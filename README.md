# SolarLab

SolarLab ist ein Webservice, der für die Integration von GitLab und Trello geschrieben wurde.
Im Moment befindet sich der Service in der Beta Phase. Sobald der Service "stable" ist wird dieser auf
www.loepke-it.de verfügbar sein.

Dennoch ist es möglich, den Service lokal zu starten, da er eine InMemory Datenbank verfügt und alle nötigen 
Abhängigkeiten über Maven verwaltet werden.

Folgende Komponenten wurden verwenden:
- Maven
- Spring-Boot Backendserver
  - JPA Datenhaltung (InMemory H2 Datenbank)
  - JWT Token
  - Jackson Rest
  - Swagger
- AngularJS Fontend

Um den Webservice lokal zu starten und diesen über localhost:8080 aufrufen zu können muss folgender Befehl in die
Konsole eingegeben werden: 

 mvn spring-boot:run

Es ist hier zu beachten, dass Maven installiert ist und ein Java Umgebung in Version 8.

Auf den N mvn spring-boot:run

Auf den folgenden Seiten finden Sie die Rest API. Somit können mit externen Tools auf den Service zugreifen.





