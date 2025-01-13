//package com.example.carrentelsystembackend.Service.impl;
//
//import com.example.carrentelsystembackend.Service.PaymentService;
//import com.example.carrentelsystembackend.Service.StripeService;
//import com.example.carrentelsystembackend.entity.Payment;
//import com.example.carrentelsystembackend.entity.Reservation;
//import com.example.carrentelsystembackend.exception.OurException;
//import com.example.carrentelsystembackend.repository.PaymentRepository;
//import com.example.carrentelsystembackend.repository.ReservationRepository;
//import com.example.carrentelsystembackend.security.entity.User;
//import com.stripe.exception.StripeException;
//import com.stripe.model.PaymentIntent;
//import jakarta.transaction.Transactional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Service
//@Transactional
//public class PaymentServiceImpl implements PaymentService {
//    private PaymentRepository paymentRepository;
//    private ReservationRepository reservationRepository;
//    private StripeService stripeService;
//
//    public PaymentServiceImpl(PaymentRepository paymentRepository, ReservationRepository reservationRepository, StripeService stripeService) {
//        this.paymentRepository = paymentRepository;
//        this.reservationRepository = reservationRepository;
//        this.stripeService = stripeService;
//    }
//
//    @Override
//    // Initialize payment for a booking
//    public Payment initializePayment(Long bookingId) {
//        Reservation reservation = reservationRepository.findById(bookingId)
//                .orElseThrow(() -> new OurException("Booking not found"));
//
//        Payment payment = new Payment();
//        payment.setReservation(reservation);
//        payment.setAmount(calculateAmount(reservation));
//        payment.setCurrency("USD");
//        payment.setPaymentStatus("PENDING");
//        payment.setPaymentDate(LocalDateTime.now());
//
//        // Create Stripe PaymentIntent
//        try {
//            PaymentIntent intent = stripeService.createPaymentIntent(
//                    payment.getAmount(),
//                    payment.getCurrency()
//            );
//            payment.setStripePaymentIntentId(intent.getId());
//            payment.setStripeClientSecret(intent.getClientSecret());
//        } catch (StripeException e) {
//            throw new RuntimeException("Failed to initialize payment", e);
//        }
//
//        return paymentRepository.save(payment);
//    }
//@Override
//    // Process payment
//    public Payment processPayment(Long paymentId, String paymentMethod, String transactionId) {
//        Payment payment = paymentRepository.findById(paymentId)
//                .orElseThrow(() -> new OurException("Payment not found"));
//
//        payment.setPaymentMethod(paymentMethod);
//        payment.setTransactionId(transactionId);
//        payment.setPaymentStatus("COMPLETED");
//
//        return paymentRepository.save(payment);
//    }
//@Override
//    // Get all payments for admin
//    public List<Payment> getAllPayments() {
//        return paymentRepository.findAll();
//    }
//@Override
//    // Get user payments
//    public List<Payment> getUserPayments(User user) {
//        return paymentRepository.findByReservation_User(user);
//    }
//@Override
//    public BigDecimal calculateAmount(Reservation reservation) {
//        // Implement your pricing logic here
//        return BigDecimal.valueOf(100); // Placeholder
//    }
//}