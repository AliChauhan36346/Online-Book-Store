package com.pirateBooks.bookStore_backend.repository;

import com.pirateBooks.bookStore_backend.dto.BookDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;

@Repository
public class BookRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Existing method to get books by genre
    public Map<String, List<BookDto>> getBooksByGenre() {
        String sql = "SELECT b.BookID, b.Title, b.CoverImagePath, b.ISBN, b.Publisher, b.Price, b.StockQuantity, g.GenreName " +
                     "FROM books b " +
                     "JOIN genres g ON b.GenreID = g.GenreID";

        Map<String, List<BookDto>> booksByGenre = new HashMap<>();

        jdbcTemplate.query(sql, (rs) -> {
            Integer bookId = rs.getInt("BookID");
            String title = rs.getString("Title");
            String imagePath = rs.getString("CoverImagePath");
            String isbn = rs.getString("ISBN");
            String publisher = rs.getString("Publisher");
            Double price = rs.getDouble("Price");
            Integer stockQuantity = rs.getInt("StockQuantity");
            String genreName = rs.getString("GenreName");

            BookDto bookDto = new BookDto(title, imagePath, bookId, isbn, publisher, price, stockQuantity);

            booksByGenre.computeIfAbsent(genreName, k -> new ArrayList<>()).add(bookDto);
        });

        return booksByGenre;
    }

    // New method to search books by title, genre, or author
    public List<BookDto> searchBooks(String query) {
        String sql = "SELECT b.BookID, b.Title, b.CoverImagePath, b.ISBN, b.Publisher, b.Price, b.StockQuantity, g.GenreName, " +
                     "CONCAT(a.FirstName, ' ', a.LastName) AS AuthorName " +
                     "FROM books b " +
                     "JOIN genres g ON b.GenreID = g.GenreID " +
                     "JOIN authors a ON b.AuthorID = a.AuthorID " +
                     "WHERE b.Title LIKE ? OR g.GenreName LIKE ? OR CONCAT(a.FirstName, ' ', a.LastName) LIKE ?";

        // Add wildcards to the query for partial matching
        String searchQuery = "%" + query + "%";

        return jdbcTemplate.query(sql, new Object[]{searchQuery, searchQuery, searchQuery}, (rs, rowNum) -> {
            Integer bookId = rs.getInt("BookID");
            String title = rs.getString("Title");
            String imagePath = rs.getString("CoverImagePath");
            String isbn = rs.getString("ISBN");
            String publisher = rs.getString("Publisher");
            Double price = rs.getDouble("Price");
            Integer stockQuantity = rs.getInt("StockQuantity");
            String genreName = rs.getString("GenreName");
            String authorName = rs.getString("AuthorName");

            // Create a BookDto object with the retrieved data
            BookDto bookDto = new BookDto(title, imagePath, bookId, isbn, publisher, price, stockQuantity);
            bookDto.setGenreName(genreName); // Add genre name to the DTO
            bookDto.setAuthorName(authorName); // Add author name to the DTO

            return bookDto;
        });
    }
}