//package com.example.carrentelsystembackend.web;
//
//import com.example.carrentelsystembackend.Service.PaymentService;
//import com.example.carrentelsystembackend.Service.StripeService;
//import com.example.carrentelsystembackend.dto.PaymentRequest;
//import com.example.carrentelsystembackend.entity.Payment;
//import com.example.carrentelsystembackend.security.entity.User;
//import com.stripe.exception.StripeException;
//import com.stripe.model.Event;
//import com.stripe.model.PaymentIntent;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//// Payment Controller
//@RestController
//@RequestMapping("/api/account/payments")
//public class PaymentController {
//    private PaymentService paymentService;
//    private StripeService stripeService;
//
//    public PaymentController(PaymentService paymentService, StripeService stripeService) {
//        this.paymentService = paymentService;
//        this.stripeService = stripeService;
//    }
//
//    @PostMapping("/initialize/{bookingId}")
//    public ResponseEntity<Payment> initializePayment(@PathVariable Long bookingId) {
//        return ResponseEntity.ok(paymentService.initializePayment(bookingId));
//    }
//
//    @PostMapping("/process/{paymentId}")
//    public ResponseEntity<Payment> processPayment(
//            @PathVariable Long paymentId,
//            @RequestBody PaymentRequest request) {
//        return ResponseEntity.ok(paymentService.processPayment(
//                paymentId, request.getPaymentMethod(), request.getTransactionId()));
//    }
//
//    @GetMapping("/all")
//    public ResponseEntity<List<Payment>> getAllPayments() {
//        return ResponseEntity.ok(paymentService.getAllPayments());
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Payment>> getUserPayments(
//            @AuthenticationPrincipal User user) {
//        return ResponseEntity.ok(paymentService.getUserPayments(user));
//    }
//    @PostMapping("/create-payment-intent")
//    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody PaymentRequest request) {
//        try {
//            PaymentIntent intent = stripeService.createPaymentIntent(
//                    request.getAmount(),
//                    request.getCurrency()
//            );
//
//            Map<String, String> response = new HashMap<>();
//            response.put("clientSecret", intent.getClientSecret());
//
//            return ResponseEntity.ok(response);
//        } catch (StripeException e) {
//            throw new RuntimeException("Failed to create payment intent", e);
//        }
//    }
//
//    @PostMapping("/webhook")
//    public ResponseEntity<String> handleStripeWebhook(
//            @RequestBody String payload,
//            @RequestHeader("Stripe-Signature") String sigHeader) {
//        try {
//            Event event = stripeService.handleWebhook(payload, sigHeader);
//
//            // Handle different event types
//            switch (event.getType()) {
//                case "payment_intent.succeeded":
//                    PaymentIntent paymentIntent = (PaymentIntent) event.getData().getObject();
//                    paymentService.processPayment(
//                            Long.valueOf(paymentIntent.getId()),
//                            "STRIPE",
//                            paymentIntent.getId()
//                    );
//                    break;
//                // Handle other event types as needed
//            }
//
//            return ResponseEntity.ok().build();
//        } catch (StripeException e) {
//            return ResponseEntity.status(400).body("Webhook error");
//        }
//    }
//}