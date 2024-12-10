package com.example.carrentelsystembackend.security.web;

import com.example.carrentelsystembackend.security.dto.AccountResponseDTO;
import com.example.carrentelsystembackend.security.service.AuthentificationService;
import com.example.carrentelsystembackend.security.dto.LoginResquestDTO;
import com.example.carrentelsystembackend.security.entity.User;
import com.example.carrentelsystembackend.security.service.JwtService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    private AuthentificationService authentificationService;
    private  JwtService jwtService;
    private  AuthenticationManager authenticationManager;


    public AccountController(AuthentificationService authentificationService,JwtService jwtService,AuthenticationManager authenticationManager) {
        this.authentificationService=authentificationService;
        this.authenticationManager=authenticationManager;
        this.jwtService=jwtService;
    }

    @GetMapping("/hello")
    public String Hello(){

        return "Hello Spring Security";
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User request) {

        return ResponseEntity.ok(authentificationService.register(request));
    }

    // UsernamePasswordAuthenticationToken : une instance qui encapsule toutes les donnees de user des l authentification.
    // authenticationManager : PREND l INSTANCE ET lui attribuer les authorizations et les roles .


    @PostMapping("/login")
    public ResponseEntity<AccountResponseDTO> login(@RequestBody LoginResquestDTO loginResquest){
        try{
            // Recuperier user if exist
            var user=authentificationService.login(loginResquest);
            // Verifier infos User
            Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginResquest.getEmail(),loginResquest.getPassword()));
            // Sauvgarder l user dans le context de l'application
            SecurityContextHolder.getContext().setAuthentication(authentication);
            //Creer le tocken
            String jwtToken=jwtService.generateToken(user);
            // stoker token dans le header du response
            HttpHeaders responseHttpHeaders=new HttpHeaders();
            responseHttpHeaders.add("Access-Control-Expose-Headers","Authorization");
            responseHttpHeaders.add("Authorization","Bearer"+jwtToken);

            return ResponseEntity.ok()
                    .headers(responseHttpHeaders)
                    .body(AccountResponseDTO.builder()
                            .message("Utilisateur authentifié avec succès")
                            .token(jwtToken)
                            .build());
        }catch (Exception e) {
            // Gestion des autres exceptions générales
            return ResponseEntity.status(500)  // Code HTTP 500 pour une erreur interne du serveur
                    .body(AccountResponseDTO.builder()
                            .message("Erreur interne du serveur : Authentification Failed !!.")
                            .build());
        }


    }
}
