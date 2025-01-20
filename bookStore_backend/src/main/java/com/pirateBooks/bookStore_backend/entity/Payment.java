package com.pirateBooks.bookStore_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PaymentID")
    private int paymentId;

    @Column(name = "OrderID", nullable = false)
    private int orderId;

    @Column(name = "PaymentDate")
    private LocalDateTime paymentDate;

    @Enumerated(EnumType.STRING) // Store enum values as strings in the database
    @Column(name = "PaymentMethod", nullable = false)
    private PaymentMethod paymentMethod; // Use the PaymentMethod enum

    @Column(name = "Amount", nullable = false)
    private double amount;

    // Define the PaymentMethod enum
    public enum PaymentMethod {
        CREDIT_CARD, PAYPAL, CASH_ON_DELIVERY, BANK_TRANSFER
    }

    // Getters and Setters
    public int getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}