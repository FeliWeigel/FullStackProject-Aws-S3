package com.wmdev.WmFullStackProffesional.exception;

public class NullRequestBodyException extends RuntimeException{
    public NullRequestBodyException(String message){
        super(message);
    }
}
