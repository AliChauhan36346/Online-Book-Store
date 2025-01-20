"use client"; // Enable client-side functionality

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q"); // Get the search query from the URL
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch search results from the backend
    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/books/search?q=${query}`);
                setSearchResults(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setLoading(false);
            }
        };

        if (query) {
            fetchSearchResults();
        }
    }, [query]);

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
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl font-bold text-purple-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Navbar */}
            <Navbar />

            {/* Search Results */}
            <div className="container mx-auto p-6 pt-24"> {/* Add padding-top to avoid overlap with navbar */}
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Search Results for "{query}"
                </h1>

                {/* Display search results */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {searchResults.map((book) => (
                        <div
                            key={book.bookId}
                            className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            {/* Book Cover Image */}
                            <img
                                src={book.imagePath}
                                alt={book.title}
                                className="w-full h-64 object-cover rounded-md mb-4"
                            />

                            {/* Book Title */}
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                {book.title}
                            </h2>

                            {/* Author Name */}
                            <p className="text-sm text-gray-600 mb-2">
                                by <span className="font-semibold">{book.authorName}</span>
                            </p>

                            {/* Genre */}
                            <p className="text-sm text-gray-600 mb-2">
                                Genre: <span className="font-semibold">{book.genreName}</span>
                            </p>

                            {/* Price */}
                            <p className="text-lg font-bold text-purple-600 mb-4">
                                ${book.price.toFixed(2)}
                            </p>

                            {/* Add to Cart Button */}
                            <button
                                className="w-full px-4 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition-colors duration-300 shadow-sm"
                                onClick={() => handleAddToCart(book.bookId)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>

                {/* No Results Found */}
                {searchResults.length === 0 && (
                    <div className="text-center text-gray-600">
                        No books found for your search query.
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}