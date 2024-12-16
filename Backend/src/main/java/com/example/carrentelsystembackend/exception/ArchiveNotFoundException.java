package com.example.carrentelsystembackend.exception;

public class ArchiveNotFoundException extends RuntimeException{
    public ArchiveNotFoundException(String msg){
        super(msg);
    }
}
