package com.wmdev.WmFullStackProffesional.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/notes")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class NoteController {

    @GetMapping("/hello")
    public String helloWorld(){
        return "hello world!";
    }
}
