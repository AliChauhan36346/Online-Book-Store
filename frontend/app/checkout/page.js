"use client"; // Enable client-side functionality
import Navbar from "../components/Navbar"; // Adjust the path as per your structure
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Use useSearchParams instead of useRouter
import axios from "axios";

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const cartItemsStr = searchParams.get("cartItems");
    const totalAmount = searchParams.get("totalAmount");
    const [cartItems, setCartItems] = useState([]);
    const [customerDetails, setCustomerDetails] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
    });
    const [customerId, setCustomerId] = useState(null); // Add state for customerId

    // Parse cart items from query parameters
    useEffect(() => {
        if (cartItemsStr) {
            setCartItems(JSON.parse(cartItemsStr));
        }
    }, [cartItemsStr]);

    // Fetch customer details from the backend
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            const fetchCustomerDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/orders/customer/${user.userId}`);
                    const customer = response.data;
                    setCustomerDetails({
                        name: `${customer.firstName} ${customer.lastName}`,
                        email: user.email,
                        address: customer.address,
                        city: customer.city,
                        state: customer.state,
                        zip: customer.zipCode,
                        phone: customer.phone,
                    });
                    setCustomerId(customer.customerId); // Set customerId from the response
                } catch (error) {
                    console.error("Error fetching customer details:", error);
                }
            };

            fetchCustomerDetails();
        }
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please log in to proceed with the checkout.");
            return;
        }

        if (!customerId) {
            alert("Customer details are not available. Please try again.");
            return;
        }

        try {
            // Create the order
            const orderResponse = await axios.post("http://localhost:8080/api/orders/create", null, {
                params: {
                    customerId: customerId, // Use customerId instead of userId
                    totalAmount: parseFloat(totalAmount),
                },
            });

            const orderId = orderResponse.data.orderId;

            // Add order details
            for (const item of cartItems) {
                await axios.post("http://localhost:8080/api/orders/add-detail", null, {
                    params: {
                        orderId,
                        bookId: item.bookId,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                    },
                });
            }
            //'CREDIT_CARD','PAYPAL','CASH_ON_DELIVERY'
            // Process payment
            //const paymentMethod = e.target.paymentMethod.value.toUpperCase(); // Convert to uppercase to match backend enum
            const paymentResponse = await axios.post("http://localhost:8080/api/orders/payment", null, {
                params: {
                    orderId,
                    paymentMethod: "PAYPAL", // Hardcoded for now
                    amount: 20,
                },
            });

            if (paymentResponse.data === "Payment successful!") {
                alert("Order placed successfully!");
                // Redirect to the order confirmation page
                //window.location.href = "/order-confirmation";
            } else {
                alert("Payment failed. Please try again.");
            }
        } catch (error) {
            console.error("Error placing the order:", error);
            alert("An error occurred while placing the order.");
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            {/* Add margin-top to prevent overlap */}
            <div className="container mx-auto px-4 py-8 mt-20">
                <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Customer Details Form */}
                    <div className="flex-1 bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-6">Customer Details</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-gray-600 mb-1" htmlFor="name">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={customerDetails.name}
                                    onChange={(e) =>
                                        setCustomerDetails({ ...customerDetails, name: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={customerDetails.email}
                                    onChange={(e) =>
                                        setCustomerDetails({ ...customerDetails, email: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1" htmlFor="address">
                                    Address
                                </label>
                                <input
                                    id="address"
                                    type="text"
                                    value={customerDetails.address}
                                    onChange={(e) =>
                                        setCustomerDetails({ ...customerDetails, address: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-600 mb-1" htmlFor="city">
                                        City
                                    </label>
                                    <input
                                        id="city"
                                        type="text"
                                        value={customerDetails.city}
                                        onChange={(e) =>
                                            setCustomerDetails({ ...customerDetails, city: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1" htmlFor="state">
                                        State
                                    </label>
                                    <input
                                        id="state"
                                        type="text"
                                        value={customerDetails.state}
                                        onChange={(e) =>
                                            setCustomerDetails({ ...customerDetails, state: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1" htmlFor="zip">
                                    ZIP Code
                                </label>
                                <input
                                    id="zip"
                                    type="text"
                                    value={customerDetails.zip}
                                    onChange={(e) =>
                                        setCustomerDetails({ ...customerDetails, zip: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1" htmlFor="phone">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    type="text"
                                    value={customerDetails.phone}
                                    onChange={(e) =>
                                        setCustomerDetails({ ...customerDetails, phone: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                                    required
                                />
                            </div>
                        </form>
                    </div>

                    {/* Payment and Order Summary */}
                    <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="CREDIT_CARD"
                                        className="form-radio text-purple-500"
                                        defaultChecked
                                    />
                                    <span className="ml-2">Credit/Debit Card</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="PAYPAL"
                                        className="form-radio text-purple-500"
                                    />
                                    <span className="ml-2">PayPal</span>
                                </label>
                            </div>
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="CASH_ON_DELIVERY"
                                        className="form-radio text-purple-500"
                                    />
                                    <span className="ml-2">Cash on Delivery</span>
                                </label>
                            </div>
                        </div>
                        <h2 className="text-xl font-bold mt-6 mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-4">
                            <p className="text-gray-600">Subtotal</p>
                            <p className="font-semibold">${cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0).toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between mb-4">
                            <p className="text-gray-600">Shipping</p>
                            <p className="font-semibold">$5.00</p>
                        </div>
                        <div className="flex justify-between mb-4">
                            <p className="text-gray-600">Tax</p>
                            <p className="font-semibold">$8.32</p>
                        </div>
                        <div className="flex justify-between font-bold text-lg mb-6">
                            <p>Total</p>
                            <p>${totalAmount}</p>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
                            onClick={handleSubmit}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}