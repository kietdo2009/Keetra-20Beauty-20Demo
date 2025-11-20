import { useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, MapPin, ChevronDown } from "lucide-react";
import { Product } from "@/lib/mock-data";

type SortOption = "for-you" | "most-popular" | "price-high" | "price-low";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>("for-you");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const results: Product[] = location.state?.results || [];
  const query = location.state?.query || "All Products";

  const sortedResults = useMemo(() => {
    const sorted = [...results];

    switch (sortBy) {
      case "most-popular":
        return sorted.sort((a, b) => b.popularity - a.popularity);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "for-you":
      default:
        return sorted;
    }
  }, [results, sortBy]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "for-you", label: "For you" },
    { value: "most-popular", label: "Most popular" },
    { value: "price-high", label: "Price high to low" },
    { value: "price-low", label: "Price low to high" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
          <p className="text-sm text-gray-600 mt-1">
            {sortedResults.length} products found for "{query}"
          </p>
        </div>
        <Link
          to="/"
          className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2 px-6 rounded-full shadow-md transition-all border border-gray-200"
        >
          <Home size={20} className="inline" />
        </Link>
      </div>

      {/* Sort dropdown */}
      <div className="px-6 py-4 flex justify-end sticky top-16 z-10 bg-white border-b border-gray-100">
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="text-sm font-semibold">Sort by:</span>
            <span className="text-sm font-semibold text-gray-900">
              {sortOptions.find((o) => o.value === sortBy)?.label}
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${showSortDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {showSortDropdown && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-20 border border-gray-200 animate-fade-in">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value);
                    setShowSortDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 ${
                    sortBy === option.value ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-800"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results grid */}
      <div className="flex-1 px-6 py-8">
        {sortedResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {sortedResults.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all animate-fade-in"
              >
                {/* Product card */}
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="w-full h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="aspect-square bg-gray-100 overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.virtual_try_on && (
                      <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Try on
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col bg-white">
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.category}</p>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-xl font-bold text-gray-900">${product.price}</span>
                      {product.inStock && (
                        <span className="text-xs text-green-600 font-semibold">In stock</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <MapPin size={16} />
                      Find
                    </button>
                  </div>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <p className="text-xl text-gray-600 mb-4">No products found</p>
              <Link
                to="/search"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
              >
                Try another search
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
