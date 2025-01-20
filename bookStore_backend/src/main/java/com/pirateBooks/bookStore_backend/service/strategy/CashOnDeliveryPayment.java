package com.pirateBooks.bookStore_backend.service.strategy;

public class CashOnDeliveryPayment implements PaymentStrategy {
    @Override
    public boolean pay(double amount) {
        System.out.println("Paid $" + amount + " via Cash on Delivery");
        return true; // Simulate successful payment
    }
}
