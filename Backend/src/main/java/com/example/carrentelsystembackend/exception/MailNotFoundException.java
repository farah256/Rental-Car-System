package com.example.carrentelsystembackend.exception;

public class MailNotFoundException extends RuntimeException{
    public MailNotFoundException(String msg){
        super(msg);
    }
}
