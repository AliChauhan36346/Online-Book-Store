"use client"; // Add this if you are using client-side interactivity
import Navbar from "../components/Navbar"; // Adjust the import based on your folder structure
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch cart items from the backend
    useEffect(() => {
        const fetchCartItems = async () => {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
                alert("Please log in to view your cart.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/cart/${user.userId}/items`);
                setCartItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cart items:", error);
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    // Function to handle removing an item from the cart
    const handleRemoveItem = async (cartItemId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/cart/items/${cartItemId}`);
            if (response.data.success) {
                alert("Item removed from cart successfully!");
                // Refresh the cart items
                const updatedCartItems = cartItems.filter((item) => item.cartItemId !== cartItemId);
                setCartItems(updatedCartItems);
            } else {
                alert("Failed to remove item from cart.");
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
            alert("An error occurred while removing the item from the cart.");
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    // Calculate the total amount
    const subtotal = cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    const shipping = 5.0;
    const tax = 8.32;
    const totalAmount = subtotal + shipping + tax;

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navbar */}
            <Navbar />
            {/* Add margin-top to prevent content overlap */}
            <div className="container mx-auto px-4 py-8 mt-20">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1 bg-white shadow rounded-lg p-6">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.cartItemId} className="flex items-center justify-between border-b pb-4 mb-4">
                                    <div className="flex items-center">
                                        <img
                                            src={item.imagePath} // Replace with the actual image path from the backend
                                            alt={item.title}
                                            className="w-20 h-20 rounded-lg object-cover"
                                        />
                                        <div className="ml-4">
                                            <p className="font-semibold">{item.title}</p>
                                            <p className="text-sm text-gray-600">
                                                Quantity: {item.quantity}
                                            </p>
                                            <p className="text-sm text-green-500">In stock</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-lg">${item.unitPrice.toFixed(2)}</p>
                                        <button
                                            className="text-red-500 hover:text-red-700 mt-2"
                                            onClick={() => handleRemoveItem(item.cartItemId)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>
                    {/* Order Summary */}
                    <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-bold mb-6">Order summary</h2>
                        <div className="flex justify-between mb-4">
                            <p className="text-gray-600">Subtotal</p>
                            <p className="font-semibold">${subtotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between mb-4">
                            <p className="text-gray-600">Shipping estimate</p>
                            <p className="font-semibold">${shipping.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between mb-4">
                            <p className="text-gray-600">Tax estimate</p>
                            <p className="font-semibold">${tax.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between font-bold text-lg mb-6">
                            <p>Order total</p>
                            <p>${totalAmount.toFixed(2)}</p>
                        </div>
                        <Link
                            href={{
                                pathname: "/checkout",
                                query: {
                                    cartItems: JSON.stringify(cartItems),
                                    totalAmount: totalAmount.toFixed(2),
                                },
                            }}
                            className="w-full block px-4 py-2 text-center bg-purple-500 text-white rounded-full hover:bg-purple-600"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}