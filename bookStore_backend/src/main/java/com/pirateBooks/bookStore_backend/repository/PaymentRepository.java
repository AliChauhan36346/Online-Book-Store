package com.pirateBooks.bookStore_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pirateBooks.bookStore_backend.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
