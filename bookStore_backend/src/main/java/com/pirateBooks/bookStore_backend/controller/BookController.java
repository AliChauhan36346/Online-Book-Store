package com.pirateBooks.bookStore_backend.controller;

import com.pirateBooks.bookStore_backend.dto.BookDto;
import com.pirateBooks.bookStore_backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/by-genre")
    
    public ResponseEntity<Map<String, List<BookDto>>> getBooksByGenre() {
        Map<String, List<BookDto>> booksByGenre = bookService.getBooksByGenre();
        return ResponseEntity.ok(booksByGenre);
    }

    // New endpoint to search books
    @GetMapping("/search")
    public List<BookDto> searchBooks(@RequestParam String q) {
        return bookService.searchBooks(q);
    }
}