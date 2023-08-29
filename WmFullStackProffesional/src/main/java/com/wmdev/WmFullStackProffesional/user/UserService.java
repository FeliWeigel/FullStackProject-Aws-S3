package com.wmdev.WmFullStackProffesional.user;

import com.wmdev.WmFullStackProffesional.aws.S3Buckets;
import com.wmdev.WmFullStackProffesional.aws.S3Service;
import com.wmdev.WmFullStackProffesional.exception.BusyCredentialsException;
import com.wmdev.WmFullStackProffesional.exception.InvalidTokenException;
import com.wmdev.WmFullStackProffesional.exception.NullRequestBodyException;
import com.wmdev.WmFullStackProffesional.exception.ResourceNotFoundException;
import com.wmdev.WmFullStackProffesional.repository.UserRepository;
import com.wmdev.WmFullStackProffesional.security.jwt.JwtService;
import com.wmdev.WmFullStackProffesional.security.jwt.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final S3Service s3Service;
    private final S3Buckets s3Buckets;
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public User getUserProfile(String userToken){
        final String username;
        var token = tokenRepository.findByToken(userToken).orElse(null);
        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(userToken);
        var userSaved = userRepository.findByUsername(username);

        if(userSaved.isPresent()){
            return User.builder()
                    .firstname(userSaved.get().getFirstname())
                    .lastname(userSaved.get().getLastname())
                    .username(userSaved.get().getUsername())
                    .email(userSaved.get().getEmail())
                    .profileImageId(userSaved.get().getProfileImageId())
                    .role(Role.USER)
                    .build();
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }

    public ResponseEntity<Object> updateUserProfile(String userToken, UserUpdateRequest userUpdateRequest){
        final String username;
        var token = tokenRepository.findByToken(userToken).orElse(null);
        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(userToken);
        User userSaved = userRepository.findByUsername(username).orElse(null);

        if(userSaved != null){
            if(!userUpdateRequest.getUsername().isBlank() && !userUpdateRequest.getEmail().isBlank()){
                if(userRepository.findByUsername(userUpdateRequest.getUsername()).isPresent()){
                    return new ResponseEntity<>(
                            new BusyCredentialsException("Warning! The username is associated with an existing account."),
                            HttpStatus.CONFLICT
                    );
                }else if(userRepository.findByEmail(userUpdateRequest.getEmail()).isPresent()){
                    return new ResponseEntity<>(
                            new BusyCredentialsException("Warning! The email is associated with an existing account."),
                            HttpStatus.CONFLICT
                    );
                }

                userSaved.setUsername(userUpdateRequest.getUsername());
                userSaved.setEmail(userUpdateRequest.getEmail());
                SecurityContextHolder.clearContext();
                return new ResponseEntity<>(userRepository.save(userSaved), HttpStatus.OK);
            }

            return new ResponseEntity<>(new NullRequestBodyException("Fields cannot be null!"), HttpStatus.BAD_REQUEST);
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }

    public String uploadUserProfileImage(String userToken, MultipartFile file){
        final String username;
        var token = tokenRepository.findByToken(userToken).orElse(null);
        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(userToken);
        User userSaved = userRepository.findByUsername(username).orElse(null);

        if(userSaved != null){
            String profileImageId = UUID.randomUUID().toString();
            try {
                s3Service.putObject(
                        "profile-images/%s/%s".formatted(userSaved.getId(), profileImageId),
                        s3Buckets.getGlobal(),
                        file.getBytes()
                );

                userSaved.setProfileImageId(profileImageId);
                userRepository.save(userSaved);
                return profileImageId;
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }

    public byte[] getUserProfileImage(String userToken){
        final String username;
        var token = tokenRepository.findByToken(userToken).orElse(null);
        if(token == null){
            throw new InvalidTokenException("The token is null or invalid to be authorized.");
        }

        username = jwtService.extractUsername(userToken);
        var userSaved = userRepository.findByUsername(username);

        if(userSaved.isPresent()){
            if(userSaved.get().getProfileImageId() == null || userSaved.get().getProfileImageId().isBlank()){
                throw new ResourceNotFoundException("The resource is undefined.");
            }

            byte[] profileImage = s3Service.getObject(
                    "profile-images/%s/%s".formatted(userSaved.get().getId(), userSaved.get().getProfileImageId()),
                    s3Buckets.getGlobal()
            );

            return profileImage;
        }

        throw new UsernameNotFoundException("User with requested username not found.");
    }
}
