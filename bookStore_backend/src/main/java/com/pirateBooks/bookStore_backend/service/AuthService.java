package com.pirateBooks.bookStore_backend.service;

import com.pirateBooks.bookStore_backend.dto.LoginRequest;
import com.pirateBooks.bookStore_backend.dto.RegisterRequest;
import com.pirateBooks.bookStore_backend.entity.Customer;
import com.pirateBooks.bookStore_backend.entity.User;
import com.pirateBooks.bookStore_backend.repository.CustomerRepository;
import com.pirateBooks.bookStore_backend.repository.UserRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public String register(RegisterRequest request) {
        // Check if the email is already registered
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Create a new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // In a real application, hash the password
        userRepository.save(user);

        // Create a new customer
        Customer customer = new Customer();
        customer.setUser(user);
        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
        customer.setCity(request.getCity());
        customer.setState(request.getState());
        customer.setZipCode(request.getZipCode());
        customerRepository.save(customer);

        return "User registered successfully!";
    }

    public User login(LoginRequest request) {
        // Find the user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
    
        // Check if the password matches
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
    
        // Return the user object
        return user;
    }
}