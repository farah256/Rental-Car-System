//package com.example.carrentelsystembackend.config;
//
//import com.stripe.Stripe;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class StripeConfiguration {
//    @Value("${stripe.secret.key}")
//    private String stripeSecretKey;
//
//    @Bean
//    public String initStripe() {
//         return Stripe.apiKey = stripeSecretKey;
//
//    }
//}