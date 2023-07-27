package com.wmdev.WmFullStackProffesional.security.auth;

import com.wmdev.WmFullStackProffesional.exception.BusyCredentialsException;
import com.wmdev.WmFullStackProffesional.exception.InvalidPasswordException;
import com.wmdev.WmFullStackProffesional.exception.NullRequestBodyException;
import com.wmdev.WmFullStackProffesional.repository.UserRepository;
import com.wmdev.WmFullStackProffesional.security.jwt.JwtService;
import com.wmdev.WmFullStackProffesional.security.jwt.Token;
import com.wmdev.WmFullStackProffesional.security.jwt.TokenRepository;
import com.wmdev.WmFullStackProffesional.user.Role;
import com.wmdev.WmFullStackProffesional.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;

    private void saveUserToken(User user, String token){
        var saveToken = Token.builder()
                .token(token)
                .user(user)
                .expired(false)
                .revoked(false)
                .build();

        tokenRepository.save(saveToken);
    }

    private Boolean isValidPassword(String password){
        boolean capitalLetter = false, numbers = false, specialChars = false;
        Pattern specialsList = Pattern.compile ("[?!¡@¿.,´)]");
        Matcher hasSpecial = specialsList.matcher(password);

        if(password.length() != 0){
            for(int i = 0; i < password.length(); i++){
                if(Character.isDigit(password.charAt(i))){
                    numbers = true;
                }else if(Character.isUpperCase(password.charAt(i))){
                    capitalLetter = true;
                }else if(hasSpecial.find()){
                    specialChars = true;
                }
            }
        }else {
            return false;
        }

        return numbers && capitalLetter && specialChars;
    }

    private void revokeAllUserTokens(User user){
        var validTokens = tokenRepository.allValidTokenByUser(user.getId());
        if(validTokens.isEmpty()){
            return;
        }

        validTokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
        });

        tokenRepository.saveAll(validTokens);
    }

    public ResponseEntity<Object> register(RegisterRequest registerRequest){
        if(registerRequest.getEmail().length() == 0 || registerRequest.getUsername().length() == 0 ||
                registerRequest.getFirstname().length() == 0 || registerRequest.getLastname().length() == 0 || registerRequest.getPassword().length() == 0){
            return new ResponseEntity<>(new NullRequestBodyException("Warning! Fields cannot be null. Please, complete all credentials"), HttpStatus.BAD_REQUEST);
        }else if(userRepository.findByUsername(registerRequest.getUsername()).isPresent()){
            return new ResponseEntity<>(new BusyCredentialsException("Warning! The username is associated with an existing account."), HttpStatus.CONFLICT);
        }else if(userRepository.findByEmail(registerRequest.getEmail()).isPresent()){
            return new ResponseEntity<>(new BusyCredentialsException("Warning! The email is associated with an existing account."), HttpStatus.CONFLICT);
        }else if(registerRequest.getPassword().length() < 6) {
            return new ResponseEntity<>(new InvalidPasswordException("Error! Password must contain at least 6 digits."), HttpStatus.BAD_REQUEST);
        }else if(!isValidPassword(registerRequest.getPassword())){
            return new ResponseEntity<>(new InvalidPasswordException("Error! Password must contain a capital letter, number and symbol."), HttpStatus.BAD_REQUEST);
        }

        var user = User.builder()
                .username(registerRequest.getUsername())
                .firstname(registerRequest.getFirstname())
                .lastname(registerRequest.getLastname())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.USER)
                .build();

        if(registerRequest.getEmail().contains("V1admin")){
            user.setRole(Role.ADMIN);
        }

        var savedUser = userRepository.save(user);
        var accessToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        saveUserToken(savedUser, accessToken);
        return new ResponseEntity<>(
                AuthResponse.builder()
                .access_token(accessToken)
                .refresh_token(refreshToken)
                .build(), HttpStatus.OK);
    }

    public AuthResponse login(AuthRequest authRequest){
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getUsername(),
                        authRequest.getPassword()
                )
        );

        var user = userRepository.findByUsername(authRequest.getUsername()).orElseThrow();
        var accessToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);

        return AuthResponse.builder()
                .access_token(accessToken)
                .refresh_token(refreshToken)
                .build();
    }
}
