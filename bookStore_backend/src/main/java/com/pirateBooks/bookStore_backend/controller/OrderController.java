package com.pirateBooks.bookStore_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import com.pirateBooks.bookStore_backend.service.OrderService;
import com.pirateBooks.bookStore_backend.entity.Customer;
import com.pirateBooks.bookStore_backend.entity.Order;
import org.springframework.web.bind.annotation.*;
//import com.pirateBooks.bookStore_backend.entity.Payment;
import com.pirateBooks.bookStore_backend.entity.OrderDetail;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/customer/{userId}")
    public Customer getCustomerDetails(@PathVariable int userId) {
        return orderService.getCustomerDetails(userId); // Use the updated method
    }

    @PostMapping("/create")
    public Order createOrder(@RequestParam int customerId, @RequestParam double totalAmount) {
        return orderService.createOrder(customerId, totalAmount);
    }

    @PostMapping("/add-detail")
    public OrderDetail addOrderDetail(
            @RequestParam int orderId,
            @RequestParam int bookId,
            @RequestParam int quantity,
            @RequestParam double unitPrice
    ) {
        return orderService.addOrderDetail(orderId, bookId, quantity, unitPrice);
    }

    @PostMapping("/payment")
    public String createPayment(
            @RequestParam int orderId,
            @RequestParam String paymentMethod,
            @RequestParam double amount
    ) {
        boolean paymentSuccess = orderService.processPayment(paymentMethod, amount);
        if (paymentSuccess) {
            orderService.createPayment(orderId, paymentMethod, amount);
            return "Payment successful!";
        } else {
            return "Payment failed!";
        }
    }
}