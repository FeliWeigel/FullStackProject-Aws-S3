package com.wmdev.WmFullStackProffesional.repository;

import com.wmdev.WmFullStackProffesional.entities.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    @Query(value = """
          select c from Contact c inner join User u\s
          on c.user.id = u.id\s
          where u.id = :id \s
      """)
    List<Contact> allContactsByUser(Long id);
}
