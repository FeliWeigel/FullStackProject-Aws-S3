package com.wmdev.WmFullStackProffesional.controller;

import com.wmdev.WmFullStackProffesional.entities.Task;
import com.wmdev.WmFullStackProffesional.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/tasks")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping("/all/{token}")
    @CrossOrigin("http://localhost:5173")
    public ResponseEntity<Object> getAllUserTasks(@PathVariable String token){
        return new ResponseEntity<>(taskService.allTasksFromUser(token), HttpStatus.OK);
    }

    @PostMapping("/add/{token}")
    public ResponseEntity<Object> addTaskToList(@RequestBody Task task, @PathVariable String token){
        return new ResponseEntity<>(taskService.addTask(task, token), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}/{token}")
    public ResponseEntity<Object> addTaskToList(@PathVariable String token, @PathVariable Long id){
        return new ResponseEntity<>(taskService.deleteTask(id, token), HttpStatus.OK);
    }
}
