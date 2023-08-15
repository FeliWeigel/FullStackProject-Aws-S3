package com.wmdev.WmFullStackProffesional.controller;

import com.wmdev.WmFullStackProffesional.entities.Task;
import com.wmdev.WmFullStackProffesional.service.TaskService;
import io.swagger.models.Response;
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
    public ResponseEntity<Object> getAllUserTasks(@PathVariable String token){
        return new ResponseEntity<>(taskService.allTasksFromUser(token), HttpStatus.OK);
    }

    @PostMapping("/add/{token}")
    public ResponseEntity<Object> addTaskToList(@RequestBody Task task, @PathVariable String token){
        return taskService.addTask(task, token);
    }

    @PutMapping("/update/{token}")
    public ResponseEntity<Object> updateTask(@RequestBody Task task, @PathVariable String token){
        return taskService.updateTask(task, token);
    }

    @DeleteMapping("/delete/{id}/{token}")
    public ResponseEntity<Task> deleteTask(@PathVariable String token, @PathVariable Long id){
        return new ResponseEntity<>(taskService.deleteTask(id, token), HttpStatus.OK);
    }

    @DeleteMapping("/delete/all/{token}")
    public ResponseEntity<String> deleteAllTasks(@PathVariable String token){
        return new ResponseEntity<>(taskService.removeAllTasksByUser(token), HttpStatus.OK);
    }

    @PutMapping("/complete/{token}")
    public ResponseEntity<Task> completeTask(@RequestBody Task task, @PathVariable String token){
        return new ResponseEntity<>(taskService.completeTask(task, token), HttpStatus.OK);
    }

    @GetMapping("/count/{token}")
    public ResponseEntity<Integer> countTasks(@PathVariable String token){
        return new ResponseEntity<>(taskService.countTasksByUser(token), HttpStatus.OK);
    }
}
