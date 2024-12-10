package com.example.carrentelsystembackend.security.service;

import com.example.carrentelsystembackend.security.dto.LoginResquestDTO;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import com.example.carrentelsystembackend.security.entity.User;

@Service
public interface AuthentificationService {
    public User register(User user);
    public UserDetails login(LoginResquestDTO login);
}
