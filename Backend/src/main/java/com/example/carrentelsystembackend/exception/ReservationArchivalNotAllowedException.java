package com.example.carrentelsystembackend.exception;

public class ReservationArchivalNotAllowedException extends RuntimeException {
    public ReservationArchivalNotAllowedException(String msg){
        super(msg);
    }
}
