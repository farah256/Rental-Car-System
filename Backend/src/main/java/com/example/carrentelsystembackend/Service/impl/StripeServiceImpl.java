//package com.example.carrentelsystembackend.Service.impl;
//
//import com.example.carrentelsystembackend.Service.StripeService;
//import com.example.carrentelsystembackend.entity.Payment;
//import com.example.carrentelsystembackend.exception.OurException;
//import com.example.carrentelsystembackend.repository.PaymentRepository;
//import com.stripe.exception.SignatureVerificationException;
//import com.stripe.exception.StripeException;
//import com.stripe.model.Event;
//import com.stripe.model.PaymentIntent;
//import com.stripe.model.Refund;
//import com.stripe.net.Webhook;
//import com.stripe.param.PaymentIntentCreateParams;
//import com.stripe.param.PaymentIntentUpdateParams;
//import com.stripe.param.RefundCreateParams;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import java.math.BigDecimal;
//import java.math.RoundingMode;
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class StripeServiceImpl implements StripeService {
//    @Value("${stripe.secret.key}")
//    private String stripeSecretKey;
//
//    @Value("${stripe.webhook.secret}")
//    private String webhookSecret;
//
//    private PaymentRepository paymentRepository;
//    @Autowired
//    public StripeServiceImpl(PaymentRepository paymentRepository,
//                             @Value("${stripe.secret.key}") String stripeSecretKey,
//                             @Value("${stripe.webhook.secret}") String webhookSecret) {
//        this.paymentRepository = paymentRepository;
//        this.stripeSecretKey = stripeSecretKey;
//        this.webhookSecret = webhookSecret;
//    }
//
//
//    @Override
//    public PaymentIntent createPaymentIntent(BigDecimal amount, String currency) throws StripeException {
//        try {
//            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
//                    .setAmount(amount.multiply(BigDecimal.valueOf(100)).longValue())
//                    .setCurrency(currency.toLowerCase())
//                    .setAutomaticPaymentMethods(
//                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
//                                    .setEnabled(true)
//                                    .build()
//                    )
//                    .build();
//
//            PaymentIntent paymentIntent = PaymentIntent.create(params);
//            System.out.println("Created PaymentIntent: " + paymentIntent.getId());
//            return paymentIntent;
//
//        } catch (StripeException e) {
//            System.err.println("Error creating PaymentIntent: " + e.getMessage());
//            throw e;
//        }
//    }
//
//
//
//    @Override
//    public PaymentIntent retrievePaymentIntent(String paymentIntentId) throws StripeException {
//        try {
//            return PaymentIntent.retrieve(paymentIntentId);
//        } catch (StripeException e) {
//            System.err.println("Error retrieving PaymentIntent: " + e.getMessage());
//            throw e;
//        }
//    }
//
//    @Override
//    public PaymentIntent cancelPaymentIntent(String paymentIntentId) throws StripeException {
//        try {
//            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
//            return paymentIntent.cancel();
//        } catch (StripeException e) {
//            System.err.println("Error canceling PaymentIntent: " + e.getMessage());
//            throw e;
//        }
//    }
//
//    @Override
//    public PaymentIntent updatePaymentIntent(String paymentIntentId, PaymentIntentUpdateParams params)
//            throws StripeException {
//        try {
//            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
//            return paymentIntent.update(params);
//        } catch (StripeException e) {
//            System.err.println("Error updating PaymentIntent: " + e.getMessage());
//            throw e;
//        }
//    }
//
//    @Override
//    public void handleStripeEvent(String payload, String sigHeader) throws StripeException {
//        Event event;
//        try {
//            event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
//        } catch (SignatureVerificationException e) {
//            System.err.println("Invalid signature: " + e.getMessage());
//            throw e;
//        }
//
//        switch (event.getType()) {
//            case "payment_intent.succeeded":
//                handlePaymentIntentSucceeded((PaymentIntent) event.getData().getObject());
//                break;
//            case "payment_intent.payment_failed":
//                handlePaymentIntentFailed((PaymentIntent) event.getData().getObject());
//                break;
//            default:
//                System.out.println("Unhandled event type: " + event.getType());
//        }
//    }
//
//    @Override
//    public void handlePaymentIntentSucceeded(PaymentIntent paymentIntent) {
//        String bookingId = paymentIntent.getMetadata().get("bookingId");
//        Payment payment = paymentRepository.findByStripePaymentIntentId(paymentIntent.getId())
//                .orElseThrow(() -> new OurException("Payment not found"));
//
//        payment.setPaymentStatus("COMPLETED");
//        payment.setTransactionId(paymentIntent.getId());
//        payment.setPaymentMethod("STRIPE");
//        paymentRepository.save(payment);
//
//        System.out.println("Payment succeeded for booking: " + bookingId);
//    }
//
//    @Override
//    public void handlePaymentIntentFailed(PaymentIntent paymentIntent) {
//        String bookingId = paymentIntent.getMetadata().get("bookingId");
//        Payment payment = paymentRepository.findByStripePaymentIntentId(paymentIntent.getId())
//                .orElseThrow(() -> new OurException("Payment not found"));
//
//        payment.setPaymentStatus("FAILED");
//        payment.setTransactionId(paymentIntent.getId());
//        paymentRepository.save(payment);
//
//        System.err.println("Payment failed for booking: " + bookingId);
//    }
//
//    @Override
//    public BigDecimal calculateStripeFee(BigDecimal amount) {
//        BigDecimal percentageFee = amount.multiply(new BigDecimal("0.029"));
//        BigDecimal flatFee = new BigDecimal("0.30");
//        return percentageFee.add(flatFee).setScale(2, RoundingMode.HALF_UP);
//    }
//
//    @Override
//    public Refund createRefund(String paymentIntentId) throws StripeException {
//        try {
//            RefundCreateParams params = RefundCreateParams.builder()
//                    .setPaymentIntent(paymentIntentId)
//                    .build();
//
//            Refund refund = Refund.create(params);
//            System.out.println("Created refund for PaymentIntent: " + paymentIntentId);
//            return refund;
//        } catch (StripeException e) {
//            System.err.println("Error creating refund: " + e.getMessage());
//            throw e;
//        }
//    }
//
//    @Override
//    public Event handleWebhook(String payload, String sigHeader) throws StripeException {
//        return Webhook.constructEvent(payload, sigHeader, webhookSecret);
//    }
//}