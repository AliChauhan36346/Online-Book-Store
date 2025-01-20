package com.pirateBooks.bookStore_backend.service.strategy;

public class PayPalPayment implements PaymentStrategy {
    @Override
    public boolean pay(double amount) {
        System.out.println("Paid $" + amount + " via PayPal");
        return true; // Simulate successful payment
    }
}
