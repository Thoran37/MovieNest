import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const SocialMediaLinks = () => (
  <div className="flex justify-center md:justify-start space-x-6 mb-6">
    <a
      href="https://facebook.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="text-gray-400 hover:text-blue-600 transition duration-300 ease-in-out"
    >
      <FaFacebookF size={24} />
    </a>
    <a
      href="https://twitter.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out"
    >
      <FaTwitter size={24} />
    </a>
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="text-gray-400 hover:text-pink-500 transition duration-300 ease-in-out"
    >
      <FaInstagram size={24} />
    </a>
  </div>
);

const FooterLinks = () => (
  <div className="text-center md:text-left">
    <SocialMediaLinks />
    <Link
      to="/contact"
      className="block text-sm mb-2 hover:text-blue-400 transition duration-300 ease-in-out"
      aria-label="Contact Us"
    >
      Contact Us
    </Link>
    <Link
      to="/privacy"
      className="block text-sm mb-2 hover:text-blue-400 transition duration-300 ease-in-out"
      aria-label="Privacy Policy"
    >
      Privacy Policy
    </Link>
    <Link
      to="/terms"
      className="block text-sm mb-2 hover:text-blue-400 transition duration-300 ease-in-out"
      aria-label="Terms of Service"
    >
      Terms of Service
    </Link>
  </div>
);

const NewsletterSignup = () => (
  <div className="md:text-left">
    <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
    <p className="text-sm mb-4">Sign up for our newsletter to receive the latest news and updates.</p>
    <form className="flex">
      <input
        type="email"
        placeholder="Your email address"
        className="px-4 py-2 text-gray-800 rounded-l-md"
        aria-label="Email address"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Subscribe
      </button>
    </form>
  </div>
);

const AboutSection = () => (
  <div className="text-center md:text-left">
    <h2 className="text-xl font-bold mb-2">MovieNest</h2>
    <p className="text-sm mb-4">
      Your go-to place for discovering the best movies. Find reviews, ratings, and watch the latest films.
    </p>
    <Link to="/about" className="text-blue-400 hover:text-blue-600 transition duration-300 ease-in-out">
      Learn More
    </Link>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-12 md:py-16 md:pb-0 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AboutSection />
          <NewsletterSignup />
          <FooterLinks />
        </div>
      </div>

      <div className="bg-gray-700 text-gray-300 py-4 text-center mt-8 mb-0">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MovieNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
