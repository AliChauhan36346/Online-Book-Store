package com.pirateBooks.bookStore_backend.service.strategy;

public class CreditCardPayment implements PaymentStrategy {
    @Override
    public boolean pay(double amount) {
        System.out.println("Paid $" + amount + " via Credit/Debit Card");
        return true; // Simulate successful payment
    }
}
