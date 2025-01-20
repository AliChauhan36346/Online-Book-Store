package com.pirateBooks.bookStore_backend.manager;

import java.util.HashMap;
import java.util.Map;

public class BookStoreManager {

    // Singleton instance
    private static BookStoreManager instance;

    // System-wide states
    private Map<Integer, String> books; // BookID -> BookTitle
    private Map<Integer, String> orders; // OrderID -> OrderDetails
    private Map<Integer, String> customers; // CustomerID -> CustomerDetails

    // Private constructor
    private BookStoreManager() {
        books = new HashMap<>();
        orders = new HashMap<>();
        customers = new HashMap<>();
    }

    // Singleton getInstance method
    public static synchronized BookStoreManager getInstance() {
        if (instance == null) {
            instance = new BookStoreManager();
        }
        return instance;
    }

    // Operations for books
    public void addBook(int bookId, String bookTitle) {
        books.put(bookId, bookTitle);
    }

    public String getBook(int bookId) {
        return books.get(bookId);
    }

    public void removeBook(int bookId) {
        books.remove(bookId);
    }

    // Operations for orders
    public void placeOrder(int orderId, String orderDetails) {
        orders.put(orderId, orderDetails);
    }

    public String getOrder(int orderId) {
        return orders.get(orderId);
    }

    // Operations for customers
    public void addCustomer(int customerId, String customerDetails) {
        customers.put(customerId, customerDetails);
    }

    public String getCustomer(int customerId) {
        return customers.get(customerId);
    }
}
