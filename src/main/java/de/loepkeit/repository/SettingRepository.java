package de.loepkeit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.loepkeit.model.Setting;

public interface SettingRepository extends JpaRepository<Setting, Long> {
	Setting findByUserUsername(String username);
	
}
