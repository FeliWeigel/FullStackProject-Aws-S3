package com.wmdev.WmFullStackProffesional.controller;

import com.wmdev.WmFullStackProffesional.entities.Contact;
import com.wmdev.WmFullStackProffesional.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contacts")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
class ContactController {

    private final ContactService contactService;

    @GetMapping("/all")
    public ResponseEntity<List<Contact>> getAllContacts(@RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(contactService.getAllContactsByUser(userToken), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addNewContact(@RequestHeader(name = "Authorization") String authHeader,@RequestBody Contact contact){
        String userToken = extractToken(authHeader);
        return contactService.addNewContact(contact,userToken);
    }

    @PutMapping("/update")
    public ResponseEntity<Object> updateContact(@RequestBody Contact contact, @RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return contactService.updateContact(contact, userToken);
    }

    @DeleteMapping("/delete/{contactId}")
    public ResponseEntity<Contact> deleteContact(@RequestHeader(name = "Authorization") String authHeader, @PathVariable Long contactId){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(contactService.deleteContact(contactId, userToken), HttpStatus.OK);
    }

    @DeleteMapping("/delete/all")
    public ResponseEntity<String> deleteAllContacts(@RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(contactService.removeAllContactsByUser(userToken), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> countContacts(@RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(contactService.countContactsByUser(userToken), HttpStatus.OK);
    }

    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }

}
