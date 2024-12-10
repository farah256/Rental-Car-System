package com.example.carrentelsystembackend.security.service.impl;


import com.example.carrentelsystembackend.security.service.AuthentificationService;
import com.example.carrentelsystembackend.security.dto.LoginResquestDTO;
import com.example.carrentelsystembackend.security.entity.User;
import com.example.carrentelsystembackend.security.repository.UserRepository;
import com.example.carrentelsystembackend.security.service.JwtService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthentificationServiceImpl implements AuthentificationService {
    private final  UserRepository userRepository;
    private final  PasswordEncoder passwordEncoder;

    public AuthentificationServiceImpl(UserRepository userRepository,PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder=passwordEncoder;
    }

    @Override
    public User register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            // Lancer une exception ResponseStatusException avec un code 400 (Bad Request)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User userSaved=userRepository.save(user);
        return userSaved;

    }


    @Override
    public UserDetails login(LoginResquestDTO request) {
        try {
            var user=userRepository.findByEmail(request.getEmail()).orElseThrow(()->new UsernameNotFoundException("Utilisatur Introuvable"));
            return user;

        }catch (UsernameNotFoundException e){
            throw new UsernameNotFoundException("Erreur : Utilisateur introuvable", e);
        }

    }
}
