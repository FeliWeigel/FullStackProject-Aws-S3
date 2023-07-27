package com.wmdev.WmFullStackProffesional.exception;

import org.springframework.http.HttpStatus;

public class NullRequestBodyException extends RuntimeException{
    public NullRequestBodyException(String message){
        super(message);
    }
}
