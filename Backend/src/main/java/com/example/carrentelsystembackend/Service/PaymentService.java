//package com.example.carrentelsystembackend.Service;
//import java.math.BigDecimal;
//import com.example.carrentelsystembackend.entity.Payment;
//import com.example.carrentelsystembackend.entity.Reservation;
//import com.example.carrentelsystembackend.security.entity.User;
//import jakarta.transaction.Transactional;
//import org.springframework.stereotype.Service;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Service
//@Transactional
//public interface PaymentService  {
//
//    public Payment initializePayment(Long bookingId);
//    public Payment processPayment(Long paymentId, String paymentMethod, String transactionId);
//    public List<Payment> getAllPayments();
//    public List<Payment> getUserPayments(User user);
//    public BigDecimal calculateAmount(Reservation reservation);
//}
