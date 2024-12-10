package com.example.carrentelsystembackend.security.service.impl;

import com.example.carrentelsystembackend.security.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.*;


@Service
public class JwtServiceImpl implements JwtService {
    @Value("${jwt.secret}")
    private String secretKey;
    long expirationTime = 86400000L; // 1 jour en millisecondes

    @Override
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    @Override
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>(); // Stocker les données inclus dans le JWT
        List<String> roles = new ArrayList<>();
        for (GrantedAuthority authority : userDetails.getAuthorities()) {
            roles.add(authority.getAuthority());
        }
        claims.put("sub", userDetails.getUsername());
        claims.put("roles", roles);
        claims.putAll(extraClaims);
        return Jwts.builder()
                .setClaims(claims) // Les données inclus dans le JWT
                .setIssuedAt(new Date()) // Utilisez setIssuedAt à la place d'issuedAt
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime)) // Utilisez setExpiration
                .signWith(getSignInKey())
                .compact();
    }

    @Override
    public SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey); // Décoder la clé secrète
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Méthode pour extraire tous les claims du JWT
    @Override
    public Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSignInKey())
                    .build()
                    .parseClaimsJws(token) // Utilisez le token ici au lieu de secretKey
                    .getBody();
        } catch (Exception e) {
            e.printStackTrace();
            return null; // En cas d'erreur
        }
    }

    // Méthode générique pour extraire un claim spécifique
    @Override
    public <T> T extractClaim(String token, String claimName, Class<T> claimType) {
        Claims claims = extractAllClaims(token); // Passez le token ici
        return claims.get(claimName, claimType);
    }

    // Méthodes spécifiques pour extraire des claims courants
    @Override
    public String extractUsername(String token) {
        Claims claims = extractAllClaims(token); // Passez le token à la méthode
        return claims.getSubject(); // "sub" correspond au nom d'utilisateur dans les claims
    }

    @Override
    public List<String> extractRoles(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("roles", List.class);
    }

    @Override
    public boolean isTokenExpired(String token) {
        Claims claims = extractAllClaims(token); // Passez le token ici
        Date expiration = claims.getExpiration();
        return expiration.before(new Date());
    }

    @Override
    public Boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token); // Passez le token ici
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
