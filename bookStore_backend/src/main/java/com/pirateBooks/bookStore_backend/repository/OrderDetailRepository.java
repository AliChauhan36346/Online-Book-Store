package com.pirateBooks.bookStore_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pirateBooks.bookStore_backend.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
}
