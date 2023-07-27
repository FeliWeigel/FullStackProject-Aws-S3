package com.wmdev.WmFullStackProffesional.security.auth;

import static org.junit.jupiter.api.Assertions.*;

import com.wmdev.WmFullStackProffesional.repository.UserRepository;
import com.wmdev.WmFullStackProffesional.user.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AuthControllerTest {

    private TestRestTemplate testRestTemplate;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RestTemplateBuilder restTemplateBuilder;

    @LocalServerPort
    private Integer port;

    @BeforeEach
    void setUp() {
        restTemplateBuilder = restTemplateBuilder.rootUri("http://localhost:" + port);
        testRestTemplate = new TestRestTemplate(restTemplateBuilder);
    }

    @Test
    void userRegister(){
        RegisterRequest registerRequest = RegisterRequest.builder()
                .username("adminTest")
                .firstname("admin")
                .lastname("test")
                .email("V1admin@gmail.com")
                .password("Admin.123")
                .build();

        RegisterRequest registerRequest2 = RegisterRequest.builder()
                .username("userTest")
                .firstname("user")
                .lastname("test")
                .email("user@gmail.com")
                .password("User123")
                .build();

        RegisterRequest registerRequest3 = RegisterRequest.builder()
                .username("userTest")
                .firstname("user")
                .password("User123")
                .build();

        ResponseEntity<Object> response = testRestTemplate.postForEntity("/api/v1/auth/register", registerRequest, Object.class);
        ResponseEntity<Object> conflictResponse = testRestTemplate.postForEntity("/api/v1/auth/register", registerRequest, Object.class);
        ResponseEntity<Object> invalidPassResponse = testRestTemplate.postForEntity("/api/v1/auth/register", registerRequest2, Object.class);
        ResponseEntity<Object> incompleteCredentialsResponse = testRestTemplate.postForEntity("/api/v1/auth/register", registerRequest3, Object.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(Role.ADMIN, userRepository.findByUsername("adminTest").get().getRole());

        assertEquals(HttpStatus.CONFLICT, conflictResponse.getStatusCode());
        assertEquals(HttpStatus.BAD_REQUEST, invalidPassResponse.getStatusCode());
        assertEquals(HttpStatus.BAD_REQUEST, incompleteCredentialsResponse.getStatusCode());

    }

    @Test
    void userLogin(){
        AuthRequest authRequest = AuthRequest.builder()
                .username("adminTest")
                .password("Admin.123")
                .build();

        AuthRequest authRequest2 = AuthRequest.builder()
                .username("randomUser")
                .password("password")
                .build();
        ResponseEntity<Object> response200 = testRestTemplate.postForEntity("/api/v1/auth/login", authRequest, Object.class);
        ResponseEntity<Object> response403 = testRestTemplate.postForEntity("/api/v1/auth/login", authRequest2, Object.class);

        assertEquals(HttpStatus.OK, response200.getStatusCode());
        assertEquals(HttpStatus.FORBIDDEN, response403.getStatusCode());
    }

}