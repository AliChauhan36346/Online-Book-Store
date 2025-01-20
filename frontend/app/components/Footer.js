// app/components/Footer.js
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="glass p-8 mt-8">
            <div className="container mx-auto text-center">
                <div className="flex justify-center space-x-6 mb-4">
                    <Link href="/privacy" className="text-gray-700 hover:text-gray-900">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-gray-700 hover:text-gray-900">
                        Terms of Service
                    </Link>
                    <Link href="/contact" className="text-gray-700 hover:text-gray-900">
                        Contact Us
                    </Link>
                </div>
                <div className="flex justify-center space-x-4">
                    <Link href="https://twitter.com" className="text-gray-700 hover:text-gray-900">
                        Twitter
                    </Link>
                    <Link href="https://facebook.com" className="text-gray-700 hover:text-gray-900">
                        Facebook
                    </Link>
                    <Link href="https://instagram.com" className="text-gray-700 hover:text-gray-900">
                        Instagram
                    </Link>
                </div>
                <p className="mt-4 text-gray-600">
                    &copy; {new Date().getFullYear()} Bookstore. All rights reserved.
                </p>
            </div>
        </footer>
    );
}