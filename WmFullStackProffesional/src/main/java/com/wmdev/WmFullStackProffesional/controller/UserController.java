package com.wmdev.WmFullStackProffesional.controller;

import com.wmdev.WmFullStackProffesional.repository.UserRepository;
import com.wmdev.WmFullStackProffesional.user.User;
import com.wmdev.WmFullStackProffesional.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    @GetMapping("/all")
    public ResponseEntity<List<User>> getUsers(){
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/user_details/{userToken}")
    public ResponseEntity<User> getUserProfileDetails(@PathVariable("userToken") String userToken){
        return new ResponseEntity<>(userService.getUserProfile(userToken), HttpStatus.OK);
    }

    @PostMapping(
            value = "/update/{userToken}/profile-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<String> uploadProfileImage(@PathVariable("userToken") String userToken, @RequestParam("file") MultipartFile file){
        return new ResponseEntity<>(userService.uploadUserProfileImage(userToken,file), HttpStatus.OK);
    }

    @GetMapping("/user_details/profile-image/{userToken}")
    public ResponseEntity<byte[]> getProfileImage(@PathVariable("userToken") String userToken){
        return new ResponseEntity<>(userService.getUserProfileImage(userToken), HttpStatus.OK);
    }
}
