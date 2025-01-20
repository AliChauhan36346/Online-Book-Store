package com.pirateBooks.bookStore_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pirateBooks.bookStore_backend.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    Cart findByUserId(int userId);
}
