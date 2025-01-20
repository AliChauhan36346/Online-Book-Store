package com.pirateBooks.bookStore_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDateTime;
import java.util.Collections;
import com.pirateBooks.bookStore_backend.entity.Cart;
import com.pirateBooks.bookStore_backend.repository.CartRepository;
import com.pirateBooks.bookStore_backend.repository.CartItemRepository;
import com.pirateBooks.bookStore_backend.entity.CartItem;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public CartItem addCartItem(int userId, int bookId, int quantity, double unitPrice) {
        // Check if the user already has a cart
        Cart cart = cartRepository.findByUserId(userId);

        // If no cart exists, create one
        if (cart == null) {
            cart = new Cart();
            cart.setUserId(userId);
            cart.setCreatedAt(LocalDateTime.now());
            cart = cartRepository.save(cart);
        }

        // Add the item to the cart
        CartItem cartItem = new CartItem();
        cartItem.setCartId(cart.getCartId());
        cartItem.setBookId(bookId);
        cartItem.setQuantity(quantity);
        cartItem.setUnitPrice(unitPrice);
        cartItem.setAddedAt(LocalDateTime.now());

        return cartItemRepository.save(cartItem);
    }

    public List<CartItem> getCartItems(int userId) {
        // Find the user's cart
        Cart cart = cartRepository.findByUserId(userId);

        if (cart == null) {
            return Collections.emptyList(); // Return an empty list if no cart exists
        }

        // Fetch cart items for the cart
        return cartItemRepository.findByCartId(cart.getCartId());
    }

    public int getCartItemCount(int userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            return 0;
        }
        return cartItemRepository.countByCartId(cart.getCartId());
    }
}