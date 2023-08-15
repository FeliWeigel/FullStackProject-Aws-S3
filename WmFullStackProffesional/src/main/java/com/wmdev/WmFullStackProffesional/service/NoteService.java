package com.wmdev.WmFullStackProffesional.service;

import com.wmdev.WmFullStackProffesional.entities.Contact;
import com.wmdev.WmFullStackProffesional.entities.Note;
import com.wmdev.WmFullStackProffesional.entities.Task;
import com.wmdev.WmFullStackProffesional.exception.InvalidTokenException;
import com.wmdev.WmFullStackProffesional.exception.NullRequestBodyException;
import com.wmdev.WmFullStackProffesional.exception.ResourceNotFoundException;
import com.wmdev.WmFullStackProffesional.repository.NoteRepository;
import com.wmdev.WmFullStackProffesional.repository.UserRepository;
import com.wmdev.WmFullStackProffesional.security.jwt.JwtService;
import com.wmdev.WmFullStackProffesional.security.jwt.TokenRepository;
import com.wmdev.WmFullStackProffesional.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final NoteRepository noteRepository;

    public List<Note> getAllNotesByUser(String userToken){
        var token = tokenRepository.findByToken(userToken).orElse(null);
        final String username;
        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(userToken);
        User userSaved = userRepository.findByUsername(username).orElse(null);
        if(userSaved != null){
            return noteRepository.allNotesByUser(userSaved.getId());
        }

        throw new UsernameNotFoundException("User with requested username not found.");

    }

    public ResponseEntity<Object> addNote(Note note, String userToken){
        var token = tokenRepository.findByToken(userToken).orElse(null);
        String username;
        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }
        if(note.getTitle() == null){
            return new ResponseEntity<>(new NullRequestBodyException("Error, the title cannot be null."), HttpStatus.BAD_REQUEST);
        }

        username = jwtService.extractUsername(userToken);
        User userSaved = userRepository.findByUsername(username).orElse(null);
        if(userSaved != null){
            note.setUser(userSaved);
            return new ResponseEntity<>(noteRepository.save(note), HttpStatus.OK);
        }

        throw new UsernameNotFoundException("User with requested username not found.");

    }
    public ResponseEntity<Object> updateNote(Note noteUpdated, String userToken){
        String username;
        if(userToken == null || tokenRepository.findByToken(userToken).isEmpty()){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }
        if(noteUpdated.getTitle() == null){
            return new ResponseEntity<>(new NullRequestBodyException("Error, the title cannot be null."), HttpStatus.BAD_REQUEST);
        }

        username = jwtService.extractUsername(userToken);
        var user = userRepository.findByUsername(username).orElse(null);
        if(user != null){
            Note noteSaved = noteRepository.findById(noteUpdated.getId()).orElse(null);
            if(noteSaved != null){
                noteSaved.setTitle(noteUpdated.getTitle());
                noteSaved.setText(noteUpdated.getText());
                return new ResponseEntity<>(noteRepository.save(noteSaved), HttpStatus.OK);
            }

            throw new ResourceNotFoundException("Contact not found!");

        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }

    public Note deleteNote(Long id, String userToken){
        String username;
        var token = tokenRepository.findByToken(userToken).orElse(null);
        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(userToken);
        User userSaved = userRepository.findByUsername(username).orElse(null);
        Note noteSaved = noteRepository.findById(id).orElse(null);


        if(userSaved != null){
            List<Note> noteList = noteRepository.allNotesByUser(userSaved.getId());
            if(noteSaved != null){
                if(noteList.contains(noteSaved)){
                    noteRepository.delete(noteSaved);
                    return noteSaved;
                }

                throw new ResourceNotFoundException("Note not found for user with id: " + userSaved.getId());
            }

            throw new ResourceNotFoundException("Note not found!");
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }

    public String removeAllNotesByUser(String userToken){
        final String username;
        var token = tokenRepository.findByToken(userToken).orElse(null);

        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(userToken);
        var userSaved = userRepository.findByUsername(username).orElse(null);

        if(userSaved != null){
            List<Note> userNotes = noteRepository.allNotesByUser(userSaved.getId());
            noteRepository.deleteAll(userNotes);
            return "All deleted!";
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }

    public Integer countNotesByUser(String userToken){
        final String username;
        var token = tokenRepository.findByToken(userToken).orElse(null);

        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(userToken);
        var userSaved = userRepository.findByUsername(username).orElse(null);

        if(userSaved != null){
            List<Note> noteList = noteRepository.allNotesByUser(userSaved.getId());
            return noteList.size();
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }
}
