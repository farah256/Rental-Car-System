package com.example.carrentelsystembackend.security.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;


public interface JwtService {
    public String generateToken(UserDetails userDetails);
    public String generateToken(Map<String,Object> extraClaims, UserDetails userDetails); // ceartion du tocken -> lui affecter les payloads (claims).
    public SecretKey getSignInKey();//Créer une clé cryptographique pour signer le JWT.

    public Claims extractAllClaims(String token);
    public <T> T extractClaim(String token, String claimName, Class<T> claimType);
    public String extractUsername(String token);
    public List<String> extractRoles(String token);
    public boolean isTokenExpired(String token);
    public Boolean isTokenValid(String token, UserDetails userDetails);



}
