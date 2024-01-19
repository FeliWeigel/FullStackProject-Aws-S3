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

    @GetMapping("/all")
    public ResponseEntity<Object> getAllUserTasks(@RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(taskService.allTasksFromUser(userToken), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addTaskToList(@RequestBody Task task, @RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return taskService.addTask(task, userToken);
    }

    @PutMapping("/update")
    public ResponseEntity<Object> updateTask(@RequestBody Task task, @RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return taskService.updateTask(task, userToken);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Task> deleteTask(@RequestHeader(name = "Authorization") String authHeader, @PathVariable Long id){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(taskService.deleteTask(id, userToken), HttpStatus.OK);
    }

    @DeleteMapping("/delete/all")
    public ResponseEntity<String> deleteAllTasks(@RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(taskService.removeAllTasksByUser(userToken), HttpStatus.OK);
    }

    @PutMapping("/complete")
    public ResponseEntity<Task> completeTask(@RequestBody Task task, @RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(taskService.completeTask(task, userToken), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> countTasks(@RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(taskService.countTasksByUser(userToken), HttpStatus.OK);
    }

    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
}
