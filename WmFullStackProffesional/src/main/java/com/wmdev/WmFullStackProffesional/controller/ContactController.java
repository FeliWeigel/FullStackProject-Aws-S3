package com.wmdev.WmFullStackProffesional.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/contacts")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
class ContactController {
}
