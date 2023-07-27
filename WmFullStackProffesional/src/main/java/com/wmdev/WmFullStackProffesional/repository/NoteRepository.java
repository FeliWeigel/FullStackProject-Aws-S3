package com.wmdev.WmFullStackProffesional.repository;

import com.wmdev.WmFullStackProffesional.entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
