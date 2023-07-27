package com.wmdev.WmFullStackProffesional.security.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Object> userRegister(@RequestBody RegisterRequest registerRequest){
        return authService.register(registerRequest);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> userLogin(@RequestBody AuthRequest authRequest){
        return new ResponseEntity<>(authService.login(authRequest), HttpStatus.OK);
    }
}
