package com.pirateBooks.bookStore_backend.repository;

import com.pirateBooks.bookStore_backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
//import com.pirateBooks.bookStore_backend.entity.User;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByUser_UserId(int userId); // Use the correct property path
}