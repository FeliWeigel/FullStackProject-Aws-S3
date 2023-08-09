package com.wmdev.WmFullStackProffesional.repository;

import com.wmdev.WmFullStackProffesional.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    @Modifying
    @Query("UPDATE User u SET u.profileImageId = ?1 WHERE u.id = ?2")
    Integer setProfileImage(String profileImageId, Long userId);
}
