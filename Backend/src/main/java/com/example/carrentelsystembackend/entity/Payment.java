//package com.example.carrentelsystembackend.entity;
//
//import jakarta.persistence.*;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//
//@Entity
//public class Payment {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @OneToOne
//    @JoinColumn(name = "reservation_id")
//    private Reservation reservation;
//
//    private BigDecimal amount;
//    private String currency;
//    private String paymentStatus;
//    private String paymentMethod;
//    private LocalDateTime paymentDate;
//    private String transactionId;
//    private String stripePaymentIntentId;
//    private String stripeClientSecret;
//
//    public Payment() {
//    }
//
//    public Payment(Long id, Reservation reservation, BigDecimal amount, String currency, String paymentStatus, String paymentMethod, LocalDateTime paymentDate, String transactionId, String stripePaymentIntentId, String stripeClientSecret) {
//        this.id = id;
//        this.reservation = reservation;
//        this.amount = amount;
//        this.currency = currency;
//        this.paymentStatus = paymentStatus;
//        this.paymentMethod = paymentMethod;
//        this.paymentDate = paymentDate;
//        this.transactionId = transactionId;
//        this.stripePaymentIntentId = stripePaymentIntentId;
//        this.stripeClientSecret = stripeClientSecret;
//    }
//
//    public Payment(Reservation reservation, BigDecimal amount, String currency, String paymentStatus, String paymentMethod, LocalDateTime paymentDate, String transactionId, String stripePaymentIntentId, String stripeClientSecret) {
//        this.reservation = reservation;
//        this.amount = amount;
//        this.currency = currency;
//        this.paymentStatus = paymentStatus;
//        this.paymentMethod = paymentMethod;
//        this.paymentDate = paymentDate;
//        this.transactionId = transactionId;
//        this.stripePaymentIntentId = stripePaymentIntentId;
//        this.stripeClientSecret = stripeClientSecret;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public Reservation getReservation() {
//        return reservation;
//    }
//
//    public void setReservation(Reservation reservation) {
//        this.reservation = reservation;
//    }
//
//    public BigDecimal getAmount() {
//        return amount;
//    }
//
//    public void setAmount(BigDecimal amount) {
//        this.amount = amount;
//    }
//
//    public String getCurrency() {
//        return currency;
//    }
//
//    public void setCurrency(String currency) {
//        this.currency = currency;
//    }
//
//    public String getPaymentStatus() {
//        return paymentStatus;
//    }
//
//    public void setPaymentStatus(String paymentStatus) {
//        this.paymentStatus = paymentStatus;
//    }
//
//    public String getPaymentMethod() {
//        return paymentMethod;
//    }
//
//    public void setPaymentMethod(String paymentMethod) {
//        this.paymentMethod = paymentMethod;
//    }
//
//    public LocalDateTime getPaymentDate() {
//        return paymentDate;
//    }
//
//    public void setPaymentDate(LocalDateTime paymentDate) {
//        this.paymentDate = paymentDate;
//    }
//
//    public String getTransactionId() {
//        return transactionId;
//    }
//
//    public void setTransactionId(String transactionId) {
//        this.transactionId = transactionId;
//    }
//
//    public String getStripePaymentIntentId() {
//        return stripePaymentIntentId;
//    }
//
//    public void setStripePaymentIntentId(String stripePaymentIntentId) {
//        this.stripePaymentIntentId = stripePaymentIntentId;
//    }
//
//    public String getStripeClientSecret() {
//        return stripeClientSecret;
//    }
//
//    public void setStripeClientSecret(String stripeClientSecret) {
//        this.stripeClientSecret = stripeClientSecret;
//    }
//}