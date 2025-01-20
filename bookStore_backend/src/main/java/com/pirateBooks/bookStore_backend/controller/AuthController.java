package com.pirateBooks.bookStore_backend.controller;

import com.pirateBooks.bookStore_backend.dto.LoginRequest;
import com.pirateBooks.bookStore_backend.dto.RegisterRequest;
import com.pirateBooks.bookStore_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import com.pirateBooks.bookStore_backend.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from frontend on port 3000
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            String response = authService.register(request);
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    try {
        User user = authService.login(request);

        // Return the user object
        return ResponseEntity.ok().body(user);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
}