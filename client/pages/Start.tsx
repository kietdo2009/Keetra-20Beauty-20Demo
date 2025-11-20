import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Start() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-blue-50 overflow-hidden flex items-center justify-center relative">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-spin-slow"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-spin-slow" style={{ animationDelay: "10s" }}></div>

      {/* Top Right - Click me button with dropdown */}
      <div className="absolute top-8 right-8 z-20">
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-200 flex items-center gap-2 active:scale-95"
          >
            Click me
            <ChevronDown
              size={20}
              className={`transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl overflow-hidden z-30 animate-fade-in">
              <button
                onClick={() => {
                  // Randomize UI and lights
                  window.dispatchEvent(new CustomEvent("randomize"));
                  setShowDropdown(false);
                }}
                className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 text-gray-800 font-medium"
              >
                Surprise me
              </button>
              <Link
                to="/customize"
                onClick={() => setShowDropdown(false)}
                className="block px-6 py-4 hover:bg-gray-50 transition-colors text-gray-800 font-medium"
              >
                Customize my experience
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main content - centered buttons */}
      <div className="relative z-10 w-full max-w-5xl px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-16">
          {/* Left side - Help me decide button */}
          <div className="flex-1 flex justify-end">
            <Link
              to="/quiz"
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-500 group-active:scale-95"></div>
              <button className="relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-12 rounded-2xl shadow-xl transition-all duration-200 text-xl w-full sm:w-auto">
                Help me decide
              </button>
            </Link>
          </div>

          {/* Center divider with text */}
          <div className="hidden sm:flex flex-col items-center gap-4">
            <div className="w-1 h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">or</span>
            <div className="w-1 h-24 bg-gradient-to-t from-gray-300 to-transparent"></div>
          </div>

          {/* Right side - Search for it button */}
          <div className="flex-1 flex justify-start">
            <Link
              to="/search"
              className="group relative"
            >
              <button className="relative bg-white hover:bg-gray-50 text-gray-800 font-bold py-4 px-12 rounded-2xl shadow-xl transition-all duration-200 text-xl border-2 border-gray-200 hover:border-gray-300 w-full sm:w-auto">
                Search for it
              </button>
            </Link>
          </div>
        </div>

        {/* Welcome text */}
        <div className="text-center mt-20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Welcome to Beauty Hub
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-2">
            Discover your perfect beauty products
          </p>
          <p className="text-gray-500">Find what you're looking for or let us help you discover something new</p>
        </div>
      </div>
    </div>
  );
}
