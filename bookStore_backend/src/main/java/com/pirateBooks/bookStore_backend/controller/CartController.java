package com.pirateBooks.bookStore_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import com.pirateBooks.bookStore_backend.service.CartService;
import org.springframework.web.bind.annotation.*;
//import com.pirateBooks.bookStore_backend.entity.Cart;
import com.pirateBooks.bookStore_backend.entity.CartItem;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/add-item")
    public CartItem addCartItem(@RequestParam int userId, @RequestParam int bookId, @RequestParam int quantity,
            @RequestParam double unitPrice) {
        return cartService.addCartItem(userId, bookId, quantity, unitPrice);
    }

    @GetMapping("/{userId}/items")
    public List<CartItem> getCartItems(@PathVariable int userId) {
        return cartService.getCartItems(userId);
    }

    @GetMapping("/{userId}/item-count")
    public int getCartItemCount(@PathVariable int userId) {
        return cartService.getCartItemCount(userId);
    }
}