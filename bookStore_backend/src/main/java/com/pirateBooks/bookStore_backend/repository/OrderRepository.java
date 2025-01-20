package com.pirateBooks.bookStore_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pirateBooks.bookStore_backend.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}
