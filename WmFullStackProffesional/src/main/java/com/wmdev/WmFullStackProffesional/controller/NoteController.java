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
    public ResponseEntity<List<Note>> getAllNotes(@PathVariable String userToken){
        return new ResponseEntity<>(noteService.getAllNotesByUser(userToken), HttpStatus.OK);
    }

    @PostMapping("/add/{userToken}")
    public ResponseEntity<Note> addNote(@PathVariable String userToken,@RequestBody Note note){
        return new ResponseEntity<>(noteService.addNote(note, userToken), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{noteId}/{userToken}")
    public ResponseEntity<Note> deleteNote(@PathVariable String userToken, @PathVariable Long noteId){
        return new ResponseEntity<>(noteService.deleteNote(noteId, userToken), HttpStatus.OK);
    }

}
