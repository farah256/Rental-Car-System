//package com.example.carrentelsystembackend.repository;
//
//import com.example.carrentelsystembackend.entity.Payment;
//import com.example.carrentelsystembackend.security.entity.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface PaymentRepository extends JpaRepository<Payment, Long> {
//    Optional<Payment> findByPaymentStatus(String status);
//    public List<Payment> findByReservation_User(User user);
//    Optional<Payment> findByStripePaymentIntentId(String stripePaymentIntentId);
//
//}