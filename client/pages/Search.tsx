import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search as SearchIcon, Home, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { mockProducts, searchProducts, filterByTag, getRandomProducts } from "@/lib/mock-data";

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [results, setResults] = useState(getRandomProducts(8));

  const allTags = Array.from(new Set(mockProducts.flatMap((p) => p.tags))).slice(0, 6);

  // Rotate carousel every 5 seconds
  useEffect(() => {
    if (!showResults && results.length > 0) {
      const timer = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % results.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [showResults, results.length]);

  const handleSearch = () => {
    if (query.trim()) {
      const searchResults = searchProducts(query);
      navigate("/search-results", { state: { results: searchResults, query } });
    }
  };

  const handleTagClick = (tag: string) => {
    const tagResults = filterByTag(tag);
    navigate("/search-results", { state: { results: tagResults, query: tag } });
  };

  const currentProduct = results[carouselIndex];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900">Search Products</h1>
        <Link
          to="/"
          className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2 px-6 rounded-full shadow-md transition-all border border-gray-200"
        >
          <Home size={20} className="inline" />
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 py-12">
        {/* Search bar */}
        <div className="w-full max-w-2xl mb-8">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon size={20} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowKeyboard(true)}
                onBlur={() => setShowKeyboard(false)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
            {query.length >= 1 && (
              <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full transition-all active:scale-95"
              >
                Search
              </button>
            )}
          </div>
        </div>

        {/* Category tags */}
        <div className="w-full max-w-2xl mb-12">
          <p className="text-sm text-gray-600 mb-3 font-semibold">Browse by category:</p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:border-blue-500 hover:bg-blue-50 transition-all active:scale-95 capitalize"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Product carousel */}
        {!showKeyboard && results.length > 0 && (
          <div className="w-full max-w-2xl">
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 animate-fade-in">
              {/* Product image */}
              <div className="aspect-square bg-white rounded-2xl overflow-hidden mb-6 shadow-md relative group">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover"
                />

                {/* Navigation arrows */}
                {results.length > 1 && (
                  <>
                    <button
                      onClick={() => setCarouselIndex((prev) => (prev - 1 + results.length) % results.length)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 shadow-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={24} className="text-gray-800" />
                    </button>
                    <button
                      onClick={() => setCarouselIndex((prev) => (prev + 1) % results.length)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 shadow-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={24} className="text-gray-800" />
                    </button>
                  </>
                )}
              </div>

              {/* Product info */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentProduct.name}</h3>
                <p className="text-gray-600 mb-3">{currentProduct.category}</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-gray-900">${currentProduct.price}</span>
                  {currentProduct.inStock && (
                    <span className="text-sm text-green-600 font-semibold">In stock</span>
                  )}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {currentProduct.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Product actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/product/${currentProduct.id}`)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all active:scale-95"
                >
                  View Details
                </button>
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                  <MapPin size={20} />
                  Find me
                </button>
              </div>
            </div>

            {/* Carousel indicators */}
            {results.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {results.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === carouselIndex ? "bg-blue-500 w-8" : "bg-gray-300 w-2"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
