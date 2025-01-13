//package com.example.carrentelsystembackend.dto;
//
//import org.springframework.stereotype.Component;
//
//import java.math.BigDecimal;
//@Component
//public class PaymentRequest {
//    private BigDecimal amount;
//    private String currency;
//    private String paymentMethod;
//    private String transactionId;
//    private Long bookingId;
//
//    // Default constructor
//    public PaymentRequest() {
//    }
//
//    // Getters and setters
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
//    public String getPaymentMethod() {
//        return paymentMethod;
//    }
//
//    public void setPaymentMethod(String paymentMethod) {
//        this.paymentMethod = paymentMethod;
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
//    public Long getBookingId() {
//        return bookingId;
//    }
//
//    public void setBookingId(Long bookingId) {
//        this.bookingId = bookingId;
//    }
//
//    // toString method for debugging
//    @Override
//    public String toString() {
//        return "PaymentRequest{" +
//                "amount=" + amount +
//                ", currency='" + currency + '\'' +
//                ", paymentMethod='" + paymentMethod + '\'' +
//                ", transactionId='" + transactionId + '\'' +
//                ", bookingId=" + bookingId +
//                '}';
//    }
//}