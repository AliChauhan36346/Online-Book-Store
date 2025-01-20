package com.pirateBooks.bookStore_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pirateBooks.bookStore_backend.repository.CustomerRepository;
import com.pirateBooks.bookStore_backend.entity.Customer;
import com.pirateBooks.bookStore_backend.entity.Order;
import com.pirateBooks.bookStore_backend.entity.OrderDetail;
import com.pirateBooks.bookStore_backend.entity.Payment;
import com.pirateBooks.bookStore_backend.repository.OrderRepository;
import com.pirateBooks.bookStore_backend.repository.OrderDetailRepository;
import com.pirateBooks.bookStore_backend.repository.PaymentRepository;
import com.pirateBooks.bookStore_backend.service.strategy.PaymentStrategy;
import com.pirateBooks.bookStore_backend.service.strategy.CreditCardPayment;
import com.pirateBooks.bookStore_backend.service.strategy.PayPalPayment;
import com.pirateBooks.bookStore_backend.service.strategy.CashOnDeliveryPayment;


@Service
public class OrderService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    public Customer getCustomerDetails(int userId) {
        return customerRepository.findByUser_UserId(userId) // Use the correct property path
                .orElseThrow(() -> new RuntimeException("Customer not found for user ID: " + userId));
    }

    public Order createOrder(int customerId, double totalAmount) {
        Order order = new Order();
        order.setCustomerId(customerId);
        order.setTotalAmount(totalAmount);
        order.setStatus("Pending"); // Use String instead of enum for simplicity
        return orderRepository.save(order);
    }

    public OrderDetail addOrderDetail(int orderId, int bookId, int quantity, double unitPrice) {
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setOrderId(orderId);
        orderDetail.setBookId(bookId);
        orderDetail.setQuantity(quantity);
        orderDetail.setUnitPrice(unitPrice);
        return orderDetailRepository.save(orderDetail);
    }

    public Payment createPayment(int orderId, String paymentMethod, double amount) {
        Payment payment = new Payment();
        payment.setOrderId(orderId);
    
        try {
            payment.setPaymentMethod(Payment.PaymentMethod.valueOf(paymentMethod.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid payment method: " + paymentMethod);
        }
    
        payment.setAmount(amount);
        return paymentRepository.save(payment);
    }
    
    public boolean processPayment(String paymentMethod, double amount) {
        PaymentStrategy paymentStrategy;
        switch (paymentMethod.toUpperCase()) {
            case "CREDITCARD":
                paymentStrategy = new CreditCardPayment();
                break;
            case "PAYPAL":
                paymentStrategy = new PayPalPayment();
                break;
            case "CASHONDELIVERY":
                paymentStrategy = new CashOnDeliveryPayment();
                break;
            default:
                throw new IllegalArgumentException("Invalid payment method");
        }
        return paymentStrategy.pay(amount);
    }
}