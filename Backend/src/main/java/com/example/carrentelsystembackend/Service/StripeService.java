//package com.example.carrentelsystembackend.Service;
//
//import com.stripe.exception.StripeException;
//import com.stripe.model.Event;
//import com.stripe.model.PaymentIntent;
//import com.stripe.model.Refund;
//import com.stripe.param.PaymentIntentUpdateParams;
//import org.springframework.stereotype.Service;
//
//import java.math.BigDecimal;
//
//@Service
//
//public interface StripeService {
//    public PaymentIntent createPaymentIntent(BigDecimal amount, String currency) throws StripeException;
//    public PaymentIntent retrievePaymentIntent(String paymentIntentId) throws StripeException;
//    public PaymentIntent cancelPaymentIntent(String paymentIntentId) throws StripeException;
//    public PaymentIntent updatePaymentIntent(String paymentIntentId, PaymentIntentUpdateParams params)
//            throws StripeException ;
//    public void handleStripeEvent(String payload, String sigHeader) throws StripeException;
//    public void handlePaymentIntentSucceeded(PaymentIntent paymentIntent);
//    public void handlePaymentIntentFailed(PaymentIntent paymentIntent);
//    public BigDecimal calculateStripeFee(BigDecimal amount);
//    public Refund createRefund(String paymentIntentId) throws StripeException;
//    public Event handleWebhook(String payload, String sigHeader) throws StripeException;
//}