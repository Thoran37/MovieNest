import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-gray-100 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold hover:text-blue-400 transition duration-300 ease-in-out">
          MovieNest
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:text-blue-400 transition duration-300 ease-in-out"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-blue-400 transition duration-300 ease-in-out"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-blue-400 transition duration-300 ease-in-out"
            >
              Contact
            </Link>
          </li>
        </ul>
        <div>
          <button className="bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-lg shadow-lg">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}
