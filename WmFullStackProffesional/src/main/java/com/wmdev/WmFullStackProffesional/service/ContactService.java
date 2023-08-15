package com.wmdev.WmFullStackProffesional.service;

import com.wmdev.WmFullStackProffesional.entities.Contact;
import com.wmdev.WmFullStackProffesional.entities.Task;
import com.wmdev.WmFullStackProffesional.exception.InvalidTokenException;
import com.wmdev.WmFullStackProffesional.exception.NullRequestBodyException;
import com.wmdev.WmFullStackProffesional.exception.ResourceNotFoundException;
import com.wmdev.WmFullStackProffesional.repository.ContactRepository;
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
public class ContactService {


    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final ContactRepository contactRepository;

    public List<Contact> getAllContactsByUser(String userToken){
        var token = tokenRepository.findByToken(userToken).orElse(null);
        final String username;
        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(userToken);
        User userSaved = userRepository.findByUsername(username).orElse(null);
        if(userSaved != null){
            return contactRepository.allContactsByUser(userSaved.getId());
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }

    public ResponseEntity<Object> addNewContact(Contact contact, String userToken){
        var token = tokenRepository.findByToken(userToken).orElse(null);
        final String username;
        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }
        if(contact.getNumber() == null || contact.getFirstname() == null || contact.getLastname() == null){
            return new ResponseEntity<>(new NullRequestBodyException("Error, the fields cannot be null."), HttpStatus.BAD_REQUEST);
        }

        username = jwtService.extractUsername(userToken);
        User userSaved = userRepository.findByUsername(username).orElse(null);
        if(userSaved != null){
            String userLogo = "";
            char fnChar = contact.getFirstname().charAt(0), lnChar = contact.getLastname().charAt(0);
            userLogo += fnChar;
            userLogo += lnChar;

            contact.setLogo(userLogo);
            contact.setUser(userSaved);
            return new ResponseEntity<>(contactRepository.save(contact), HttpStatus.OK);
        }

        throw new UsernameNotFoundException("User with requested username not found.");

    }

    public ResponseEntity<Object> updateContact(Contact contactUpdated, String userToken){
        String username;
        if(userToken == null || tokenRepository.findByToken(userToken).isEmpty()){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }
        if(contactUpdated.getNumber() == null || contactUpdated.getFirstname() == null || contactUpdated.getLastname() == null){
            return new ResponseEntity<>(new NullRequestBodyException("Error, the fields cannot be null."), HttpStatus.BAD_REQUEST);
        }

        username = jwtService.extractUsername(userToken);
        var user = userRepository.findByUsername(username).orElse(null);
        if(user != null){
            Contact contactSaved = contactRepository.findById(contactUpdated.getId()).orElse(null);
            if(contactSaved != null){
                contactSaved.setFirstname(contactUpdated.getFirstname());
                contactSaved.setLastname(contactUpdated.getLastname());
                contactSaved.setNumber(contactUpdated.getNumber());
                return new ResponseEntity<>(contactRepository.save(contactSaved), HttpStatus.OK);
            }

            throw new ResourceNotFoundException("Contact not found!");

        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }

    public Contact deleteContact(Long id, String userToken){
        final String username;
        var token = tokenRepository.findByToken(userToken).orElse(null);
        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(userToken);
        User userSaved = userRepository.findByUsername(username).orElse(null);
        Contact contactSaved = contactRepository.findById(id).orElse(null);


        if(userSaved != null){
            List<Contact> contactList = contactRepository.allContactsByUser(userSaved.getId());
            if(contactSaved != null){
                if(contactList.contains(contactSaved)){
                    contactRepository.delete(contactSaved);
                    return contactSaved;
                }

                throw new ResourceNotFoundException("Contact not found for user with id: " + userSaved.getId());
            }

            throw new ResourceNotFoundException("Contact not found!");
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }

    public String removeAllContactsByUser(String userToken){
        final String username;
        var token = tokenRepository.findByToken(userToken).orElse(null);

        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(userToken);
        var userSaved = userRepository.findByUsername(username).orElse(null);

        if(userSaved != null){
            List<Contact> userContacts = contactRepository.allContactsByUser(userSaved.getId());
            contactRepository.deleteAll(userContacts);
            return "All deleted!";
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }

    public Integer countContactsByUser(String userToken){
        final String username;
        var token = tokenRepository.findByToken(userToken).orElse(null);

        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(userToken);
        var userSaved = userRepository.findByUsername(username).orElse(null);

        if(userSaved != null){
            List<Contact> contactList = contactRepository.allContactsByUser(userSaved.getId());
            return contactList.size();
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }
}
