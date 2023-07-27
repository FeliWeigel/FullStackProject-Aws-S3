package com.wmdev.WmFullStackProffesional.repository;

import com.wmdev.WmFullStackProffesional.entities.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
