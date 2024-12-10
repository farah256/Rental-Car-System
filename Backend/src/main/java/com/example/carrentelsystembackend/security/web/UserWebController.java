package com.example.carrentelsystembackend.security.web;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserWebController {

    @GetMapping("/hello")
    public String Hello(){

        return "Hello Spring Security";
    }





}
