package com.wmdev.WmFullStackProffesional.controller;

import com.wmdev.WmFullStackProffesional.entities.Note;
import com.wmdev.WmFullStackProffesional.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notes")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @GetMapping("/all/{userToken}")
    public ResponseEntity<List<Note>> getAllNotes(@RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(noteService.getAllNotesByUser(userToken), HttpStatus.OK);
    }

    @GetMapping("/all/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id, @RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(noteService.findNoteById(id, userToken),HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addNote(@RequestHeader(name = "Authorization") String authHeader, @RequestBody Note note){
        String userToken = extractToken(authHeader);
        return noteService.addNote(note, userToken);
    }

    @PutMapping("/update/")
    public ResponseEntity<Object> updateNote(@RequestBody Note note, @RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return noteService.updateNote(note, userToken);
    }

    @DeleteMapping("/delete/{noteId}")
    public ResponseEntity<Note> deleteNote(@RequestHeader(name = "Authorization") String authHeader, @PathVariable Long noteId){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(noteService.deleteNote(noteId, userToken), HttpStatus.OK);
    }

    @DeleteMapping("/delete/all")
    public ResponseEntity<String> deleteAllNotes(@RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(noteService.removeAllNotesByUser(userToken), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> countNotes(@RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(noteService.countNotesByUser(userToken), HttpStatus.OK);
    }

    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }

}
