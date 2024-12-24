package com.example.carrentelsystembackend.security.util;


import com.example.carrentelsystembackend.security.service.JwtService;
import com.example.carrentelsystembackend.security.service.impl.OurUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Enumeration;

// Il s'execute 1 seule fois a chaque request entrante
// Processus d'Authentification par Token JWT dans le JwtAuthFilter



@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private JwtService jwtService ;
    private OurUserDetailsService accountService;
    public JwtAuthFilter(JwtService jwtService, OurUserDetailsService accountService) {

        this.jwtService = jwtService;
        this.accountService=accountService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        Enumeration<String>headersName= request.getHeaderNames(); //Recuperer tous les headers de request
        while (headersName.hasMoreElements()){
            String headerName= headersName.nextElement();
            String headerValue= request.getHeader(headerName);
        }
        String authHeader = request.getHeader("Authorization");

        if(authHeader==null || !authHeader.startsWith("Bearer")){   // le cas ou l user pas deja authentifie : la cle Authorizartion n existe pas  ou il ne commance pas par Bearer
                                                                    // => on lance les autre filtres
            filterChain.doFilter(request,response);
            return;
        }

        final String jwt = authHeader.substring(7); // retirer le mot "Bearer"
        final String username=jwtService.extractUsername(jwt); // extraire l email depuis token

        if(username !=null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = accountService.loadUserByUsername(username);

            if(jwtService.isTokenValid(jwt,userDetails)){
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request,response);
    }
}























