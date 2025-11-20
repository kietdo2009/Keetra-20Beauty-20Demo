import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Home, MapPin, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { mockProducts } from "@/lib/mock-data";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find((p) => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Product not found</p>
          <Link
            to="/search"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
          >
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-800 hover:text-gray-600 transition-colors font-semibold"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <Link
          to="/"
          className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2 px-6 rounded-full shadow-md transition-all border border-gray-200"
        >
          <Home size={20} className="inline" />
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image gallery */}
            <div className="flex flex-col gap-4">
              {/* Main image */}
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg relative group">
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
                      }
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 shadow-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={24} className="text-gray-800" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 shadow-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={24} className="text-gray-800" />
                    </button>
                  </>
                )}
              </div>

              {/* Image thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex
                          ? "border-blue-500 shadow-lg"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="flex flex-col justify-start">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{product.category}</p>

              {/* Price and stock */}
              <div className="mb-8">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                  {product.inStock ? (
                    <span className="text-lg text-green-600 font-semibold">In stock</span>
                  ) : (
                    <span className="text-lg text-red-600 font-semibold">Out of stock</span>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <p className="text-sm font-semibold text-gray-700 mb-3">Features:</p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full capitalize font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Shades/Sizes */}
              {(product.shades || product.sizes) && (
                <div className="mb-8">
                  {product.shades && (
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Available Shades:</p>
                      <div className="flex flex-wrap gap-2">
                        {product.shades.map((shade) => (
                          <button
                            key={shade}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-gray-800"
                          >
                            {shade}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.sizes && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-3">Available Sizes:</p>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-gray-800"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 mt-auto pt-8">
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                  <MapPin size={20} />
                  Find me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
