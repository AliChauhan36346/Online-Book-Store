// package com.pirateBooks.bookStore_backend.service.strategy;

// public class PaymentProcessor {
//     private PaymentStrategy paymentStrategy;

//     // Set the payment strategy dynamically
//     public void setPaymentStrategy(PaymentStrategy paymentStrategy) {
//         this.paymentStrategy = paymentStrategy;
//     }

//     // Process payment using the selected strategy
//     public String processPayment(double amount) {
//         if (paymentStrategy == null) {
//             throw new IllegalStateException("Payment strategy is not set!");
//         }
//         return paymentStrategy.processPayment(amount);
//     }
// }
