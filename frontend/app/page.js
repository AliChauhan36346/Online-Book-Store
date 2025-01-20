"use client"; // Add this directive at the top of the file

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
    const [booksByGenre, setBooksByGenre] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch books by genre from the backend
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/books/by-genre");
                setBooksByGenre(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching books:", error);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    // Function to handle adding a book to the cart
    const handleAddToCart = async (bookId) => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Please log in to add items to your cart.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/cart/add-item", null, {
                params: {
                    userId: user.userId,
                    bookId,
                    quantity: 1,
                    unitPrice: 10.0, // Replace with the actual price from the book object
                },
            });

            if (response.data) {
                alert("Book added to cart successfully!");
                // Trigger cart update in Navbar
                if (typeof onCartUpdate === "function") {
                    onCartUpdate();
                }
            } else {
                alert("Failed to add book to cart.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("An error occurred while adding the book to the cart.");
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    // Extract genres dynamically from the keys of booksByGenre
    const genres = Object.keys(booksByGenre);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-16">
            {/* Navbar */}
            <Navbar onCartUpdate={() => fetchCartItemCount(user.userId)} /> {/* Pass callback function */}

            {/* Logo */}
            <div className="text-center mt-12">
                <div className="logo">
                    <span className="ink">Ink</span>
                    <span className="imagination">& Imagination</span>
                </div>
            </div>

            {/* Hero Section */}
            <div className="glass p-6 text-center mt-4">
                <p className="text-xl text-gray-600 mb-4">
                    Discover a world of books across various genres.
                </p>
                <button className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600">
                    Explore Now
                </button>
            </div>

            {/* Book Rows */}
            <div className="container mx-auto p-6">
                {genres.map((genre) => (
                    <div key={genre} className="mb-12">
                        {/* Genre Header */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            {genre}
                        </h2>

                        {/* Horizontal Scroll Row */}
                        <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
                            {booksByGenre[genre]?.map((book, index) => (
                                <div
                                    key={index}
                                    className="min-w-[220px] max-w-[280px] flex-shrink-0 bg-white p-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-2xl relative"
                                >
                                    <img
                                        src={book.imagePath}
                                        alt={book.title}
                                        className="w-full h-64 object-cover rounded-md mb-2"
                                    />
                                    <h3 className="text-sm font-semibold text-gray-700">
                                        {book.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        ${book.price.toFixed(2)} {/* Display price */}
                                    </p>

                                    {/* Buttons */}
                                    <div className="mt-4 flex space-x-2">
                                        <button
                                            className="w-32 px-4 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition-colors duration-300 shadow-sm text-sm"
                                            onClick={() => handleAddToCart(book.bookId)}
                                        >
                                            Add to Cart
                                        </button>
                                        {/* <button
                                            className="w-32 px-4 py-2 bg-purple-400 text-white rounded-md hover:bg-purple-500 transition-colors duration-300 shadow-sm text-sm"
                                        >
                                            Buy Now
                                        </button> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}