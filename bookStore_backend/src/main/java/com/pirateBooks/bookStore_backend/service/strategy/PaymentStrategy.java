package com.pirateBooks.bookStore_backend.service.strategy;

public interface PaymentStrategy {
    boolean pay(double amount);
}
