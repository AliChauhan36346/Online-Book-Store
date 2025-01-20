package com.pirateBooks.bookStore_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.pirateBooks.bookStore_backend.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    List<CartItem> findByCartId(int cartId);
    int countByCartId(int cartId);
}
