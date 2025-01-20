"use client"; // Enable client-side functionality

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Navbar */}
            <Navbar />

            {/* About Section */}
            <div className="container mx-auto p-6 pt-24"> {/* Add padding-top to avoid overlap with navbar */}
                <h1 className="text-3xl font-bold text-gray-800 mb-8">About Us</h1>

                {/* Mission Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
                    <p className="text-gray-600">
                        At Ink & Imagination, our mission is to bring the joy of reading to everyone. We believe that books have the power to inspire, educate, and transform lives. Whether you're a lifelong reader or just starting your journey, we're here to help you discover your next favorite book.
                    </p>
                </div>

                {/* Team Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {/* Team Member 1 */}
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <img
                                src="https://via.placeholder.com/150" // Replace with actual image URL
                                alt="Team Member 1"
                                className="w-24 h-24 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold text-gray-800">Muhammad Shahzad</h3>
                            <p className="text-gray-600">Founder & CEO</p>
                        </div>

                        {/* Team Member 2 */}
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <img
                                src="https://via.placeholder.com/150" // Replace with actual image URL
                                alt="Team Member 2"
                                className="w-24 h-24 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold text-gray-800">-</h3>
                            <p className="text-gray-600">-</p>
                        </div>

                        {/* Team Member 3 */}
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <img
                                src="https://via.placeholder.com/150" // Replace with actual image URL
                                alt="Team Member 3"
                                className="w-24 h-24 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold text-gray-800">-</h3>
                            <p className="text-gray-600">-</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}