package com.example.carrentelsystembackend.security.service.impl;

import com.example.carrentelsystembackend.security.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class OurUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;


    public OurUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return (UserDetails) userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("Cet Utilisateur n'exisste pas!!"));
    }

}