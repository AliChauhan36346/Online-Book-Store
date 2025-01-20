package com.pirateBooks.bookStore_backend.service;

import com.pirateBooks.bookStore_backend.dto.BookDto;
import com.pirateBooks.bookStore_backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Map<String, List<BookDto>> getBooksByGenre() {
        return bookRepository.getBooksByGenre();
    }

    // New method to search books
    public List<BookDto> searchBooks(String query) {
        return bookRepository.searchBooks(query);
    }
}