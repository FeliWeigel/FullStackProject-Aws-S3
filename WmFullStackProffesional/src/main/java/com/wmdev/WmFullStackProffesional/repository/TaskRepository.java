package com.wmdev.WmFullStackProffesional.repository;

import com.wmdev.WmFullStackProffesional.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query(value = """
          select t from Task t inner join User u\s
          on t.user.id = u.id\s
          where u.id = :id \s
      """)
    List<Task> allTasksByUser(Long id);
}
