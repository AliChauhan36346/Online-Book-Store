"use client"; // Add this line to enable client-side functionality

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Navbar({ onCartUpdate }) {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0); // State for cart item count
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const router = useRouter(); // Use the useRouter hook

    useEffect(() => {
        // Retrieve the user object from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            fetchCartItemCount(storedUser.userId); // Fetch cart item count for the logged-in user
        }
    }, [onCartUpdate]); // Add onCartUpdate as a dependency

    // Fetch cart item count from the backend
    const fetchCartItemCount = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/cart/${userId}/item-count`);
            setCartItemCount(response.data);
        } catch (error) {
            console.error("Error fetching cart item count:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/login"; // Redirect to the login page
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Update the URL without causing a full page reload
        if (query.trim()) {
            router.replace(`/search?q=${encodeURIComponent(query)}`, undefined, { shallow: true });
        } else {
            router.replace("/search", undefined, { shallow: true });
        }

        // Retain focus on the search box
        e.target.focus();
    };

    // Get user initials (first letter of first name and first letter of last name)
    const getUserInitials = (user) => {
        if (!user || !user.firstName || !user.lastName) return "U";
        return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    };

    return (
        <nav className="glass p-4 fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold mr-8">
                    <span className="ink">Ink</span>
                    <span className="imagination">& Imagination</span>
                </Link>

                {/* Navigation Links */}
                <div className="flex space-x-6">
                    <Link href="/" className="text-gray-700 hover:text-gray-900">
                        Home
                    </Link>
                    <Link href="/categories" className="text-gray-700 hover:text-gray-900">
                        Categories
                    </Link>
                    <Link href="/about" className="text-gray-700 hover:text-gray-900">
                        About
                    </Link>
                    <Link href="/contact" className="text-gray-700 hover:text-gray-900">
                        Contact
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="flex-1 mx-4">
                    <input
                        type="text"
                        placeholder="Discover your next favorite book..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 rounded-full bg-white bg-opacity-20 border border-gray-200 focus:outline-none focus:border-purple-500"
                    />
                </div>

                {/* Login/Cart Buttons */}
                <div className="flex space-x-4 items-center">
                    {user ? (
                        <div className="relative">
                            {/* User Avatar */}
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="w-10 h-10 flex items-center justify-center bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors duration-300"
                            >
                                {getUserInitials(user)}
                            </button>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                            Login
                        </Link>
                    )}

                    {/* Cart Button */}
                    <Link
                        href="/cart"
                        className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-300 flex items-center space-x-2 relative"
                    >
                        <span>Cart</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        {/* Cart Item Count Badge */}
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}