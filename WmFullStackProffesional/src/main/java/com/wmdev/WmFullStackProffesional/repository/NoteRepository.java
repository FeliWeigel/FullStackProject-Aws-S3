package com.wmdev.WmFullStackProffesional.repository;

import com.wmdev.WmFullStackProffesional.entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    @Query(value = """
          select n from Note n inner join User u\s
          on n.user.id = u.id\s
          where u.id = :id \s
      """)
    List<Note> allNotesByUser(Long id);
}
