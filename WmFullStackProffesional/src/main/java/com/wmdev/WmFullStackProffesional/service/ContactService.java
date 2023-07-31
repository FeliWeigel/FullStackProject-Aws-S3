package com.wmdev.WmFullStackProffesional.service;

import com.wmdev.WmFullStackProffesional.entities.Contact;
import com.wmdev.WmFullStackProffesional.exception.InvalidTokenException;
import com.wmdev.WmFullStackProffesional.exception.NullRequestBodyException;
import com.wmdev.WmFullStackProffesional.exception.ObjectNotFoundException;
import com.wmdev.WmFullStackProffesional.repository.ContactRepository;
import com.wmdev.WmFullStackProffesional.repository.UserRepository;
import com.wmdev.WmFullStackProffesional.security.jwt.JwtService;
import com.wmdev.WmFullStackProffesional.security.jwt.TokenRepository;
import com.wmdev.WmFullStackProffesional.user.User;
import lombok.RequiredArgsConstructor;
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

    public Contact addNewContact(Contact contact, String userToken){
        var token = tokenRepository.findByToken(userToken).orElse(null);
        final String username;
        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }
        if(contact.getNumber() == null || contact.getName() == null){
            throw new NullRequestBodyException("Error, incomplete request body.");
        }

        username = jwtService.extractUsername(userToken);
        User userSaved = userRepository.findByUsername(username).orElse(null);
        if(userSaved != null){
            contact.setUser(userSaved);
            return contactRepository.save(contact);
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

                throw new ObjectNotFoundException("Contact nor found for user with id: " + userSaved.getId());
            }

            throw new ObjectNotFoundException("Contact nor found!");
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }
}
