package com.wmdev.WmFullStackProffesional.controller;

import com.wmdev.WmFullStackProffesional.repository.UserRepository;
import com.wmdev.WmFullStackProffesional.user.User;
import com.wmdev.WmFullStackProffesional.user.UserService;
import com.wmdev.WmFullStackProffesional.user.UserUpdateRequest;
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

    @GetMapping("/user_details")
    public ResponseEntity<User> getUserProfileDetails(@RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(userService.getUserProfile(userToken), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Object> updateUser(@RequestHeader(name = "Authorization") String authHeader, @RequestBody UserUpdateRequest userUpdateRequest){
        String userToken = extractToken(authHeader);
        return userService.updateUserProfile(userToken, userUpdateRequest);
    }

    @PostMapping(
            value = "/update/profile-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<String> uploadProfileImage(@RequestHeader(name = "Authorization") String authHeader, @RequestParam("file") MultipartFile file){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(userService.uploadUserProfileImage(userToken,file), HttpStatus.OK);
    }

    @GetMapping(
            value = "/user_details/profile-image",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public ResponseEntity<byte[]> getProfileImage(@RequestHeader(name = "Authorization") String authHeader){
        String userToken = extractToken(authHeader);
        return new ResponseEntity<>(userService.getUserProfileImage(userToken), HttpStatus.OK);
    }

    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
}
