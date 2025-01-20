package com.pirateBooks.bookStore_backend.dto;

public class BookDto {
    private String title;
    private String imagePath;
    private Integer bookId;
    private String isbn;
    private String publisher;
    private Double price;
    private Integer stockQuantity;
    private String genreName; // Add this field
    private String authorName; // Add this field


    public BookDto(String title, String imagePath, Integer bookId, String isbn, String publisher, Double price, Integer stockQuantity) {
        this.title = title;
        this.imagePath = imagePath;
        this.bookId = bookId;
        this.isbn = isbn;
        this.publisher = publisher;
        this.price = price;
        this.stockQuantity = stockQuantity;
    }

    // Getters and setters
    public String getTitle() {
        return title;
    }
    // Add getters and setters for genreName and authorName
    public String getGenreName() {
        return genreName;
    }

    public void setGenreName(String genreName) {
        this.genreName = genreName;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
}