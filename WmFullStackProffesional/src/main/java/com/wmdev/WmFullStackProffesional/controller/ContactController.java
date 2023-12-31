package com.wmdev.WmFullStackProffesional.controller;

import com.wmdev.WmFullStackProffesional.entities.Contact;
import com.wmdev.WmFullStackProffesional.entities.Task;
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

    @GetMapping("/all/{userToken}")
    public ResponseEntity<List<Contact>> getAllContacts(@PathVariable String userToken){
        return new ResponseEntity<>(contactService.getAllContactsByUser(userToken), HttpStatus.OK);
    }

    @PostMapping("/add/{userToken}")
    public ResponseEntity<Object> addNewContact(@PathVariable String userToken,@RequestBody Contact contact){
        return contactService.addNewContact(contact,userToken);
    }

    @PutMapping("/update/{userToken}")
    public ResponseEntity<Object> updateContact(@RequestBody Contact contact, @PathVariable String userToken){
        return contactService.updateContact(contact, userToken);
    }

    @DeleteMapping("/delete/{contactId}/{userToken}")
    public ResponseEntity<Contact> deleteContact(@PathVariable String userToken, @PathVariable Long contactId){
        return new ResponseEntity<>(contactService.deleteContact(contactId, userToken), HttpStatus.OK);
    }

    @DeleteMapping("/delete/all/{userToken}")
    public ResponseEntity<String> deleteAllContacts(@PathVariable String userToken){
        return new ResponseEntity<>(contactService.removeAllContactsByUser(userToken), HttpStatus.OK);
    }

    @GetMapping("/count/{userToken}")
    public ResponseEntity<Integer> countContacts(@PathVariable String userToken){
        return new ResponseEntity<>(contactService.countContactsByUser(userToken), HttpStatus.OK);
    }

}
