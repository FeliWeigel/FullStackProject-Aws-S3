package com.wmdev.WmFullStackProffesional.service;

import com.wmdev.WmFullStackProffesional.entities.Task;
import com.wmdev.WmFullStackProffesional.exception.InvalidTokenException;
import com.wmdev.WmFullStackProffesional.exception.NullRequestBodyException;
import com.wmdev.WmFullStackProffesional.exception.ResourceNotFoundException;
import com.wmdev.WmFullStackProffesional.repository.TaskRepository;
import com.wmdev.WmFullStackProffesional.repository.UserRepository;
import com.wmdev.WmFullStackProffesional.security.jwt.JwtService;
import com.wmdev.WmFullStackProffesional.security.jwt.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;

    public List<Task> allTasksFromUser(String userToken){
        var token = tokenRepository.findByToken(userToken).orElse(null);
        String username;
        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(token.getToken());
        var userSaved = userRepository.findByUsername(username);
        if(userSaved.isPresent()){
            return taskRepository.allTasksByUser(userSaved.get().getId());
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }

    public ResponseEntity<Object> addTask(Task task, String userToken){
        if(task.getName().length() == 0 || task.getExpirationDate() == null){
            return new ResponseEntity<>(new NullRequestBodyException("Error, the fields cannot be null."), HttpStatus.BAD_REQUEST);
        }
        if(userToken == null || tokenRepository.findByToken(userToken).isEmpty()){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        String username = jwtService.extractUsername(userToken);
        var userSaved = userRepository.findByUsername(username).orElse(null);

        if(userSaved != null){
            Task taskAdded =  Task.builder()
                    .name(task.getName())
                    .expirationDate(task.getExpirationDate())
                    .isCompleted(false)
                    .user(userSaved)
                    .creationDate(LocalDate.now())
                    .build();
            return new ResponseEntity<>(taskRepository.save(taskAdded), HttpStatus.OK);
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }

    public Task deleteTask(Long id, String userToken){
        String username;
        if(userToken == null || tokenRepository.findByToken(userToken).isEmpty()){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(userToken);

        var user = userRepository.findByUsername(username);
        Task taskSaved = taskRepository.findById(id).orElse(null);

        if(user.isPresent()){
            List<Task> taskList = taskRepository.allTasksByUser(user.get().getId());
            if(taskSaved != null){
                if(taskList.contains(taskSaved)){
                    taskRepository.delete(taskSaved);
                    return taskSaved;
                }

                throw new ResourceNotFoundException("Task not found for user: " + user.get().getId());
            }

            throw new ResourceNotFoundException("Task not found!");
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }

    public ResponseEntity<Object> updateTask(Task taskUpdated, String userToken){
        String username;
        if(userToken == null || tokenRepository.findByToken(userToken).isEmpty()){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }
        if(taskUpdated.getName() == null || taskUpdated.getExpirationDate() == null){
            return new ResponseEntity<>(new NullRequestBodyException("Error, the fields cannot be null."), HttpStatus.BAD_REQUEST);
        }

        username = jwtService.extractUsername(userToken);
        var user = userRepository.findByUsername(username).orElse(null);
        if(user != null){
            Task taskSaved = taskRepository.findById(taskUpdated.getId()).orElse(null);
            if(taskSaved != null){
                taskSaved.setName(taskUpdated.getName());
                taskSaved.setExpirationDate(taskUpdated.getExpirationDate());
                taskSaved.setIsCompleted(false);
                return new ResponseEntity<>(taskRepository.save(taskSaved), HttpStatus.OK);
            }

            throw new ResourceNotFoundException("Task not found!");

        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }

    public Task completeTask(Task task, String userToken){
        String username;
        if(userToken == null || tokenRepository.findByToken(userToken).isEmpty()){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(userToken);
        var user = userRepository.findByUsername(username);
        if(user.isPresent()){
            var taskSaved = taskRepository.findById(task.getId()).orElse(null);
            if(taskSaved == null){
                throw new ResourceNotFoundException("Task not found!");
            }

            taskSaved.setIsCompleted(true);
            return taskRepository.save(taskSaved);
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }

    public String removeAllTasksByUser(String userToken){
        final String username;
        var token = tokenRepository.findByToken(userToken).orElse(null);

        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(userToken);
        var userSaved = userRepository.findByUsername(username).orElse(null);

        if(userSaved != null){
            List<Task> userTasks = taskRepository.allTasksByUser(userSaved.getId());
            taskRepository.deleteAll(userTasks);
            return "All deleted!";
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }

    public Integer countTasksByUser(String userToken){
        final String username;
        var token = tokenRepository.findByToken(userToken).orElse(null);

        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(userToken);
        var userSaved = userRepository.findByUsername(username).orElse(null);

        if(userSaved != null){
            List<Task> taskList = taskRepository.allTasksByUser(userSaved.getId());
            return taskList.size();
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }
}
