import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Toggle2 } from "lucide-react";
import { categories, getTopTagsForCategory, mockProducts, Product } from "@/lib/mock-data";

export default function Quiz() {
  const navigate = useNavigate();
  const [inDepth, setInDepth] = useState(false);
  const maxQuestions = inDepth ? 15 : 5;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [applicableProducts, setApplicableProducts] = useState<Product[]>(mockProducts);
  const [isComplete, setIsComplete] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const questions = [
    "What category are you looking for?",
    "What type of product interests you?",
    "Any specific features you want?",
    "Price range preference?",
    "Skin type or hair type?",
    "Specific concern?",
    "Fragrance preference?",
    "Brand preference?",
  ];

  // Inactivity timer - return to start after 1 minute
  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() - lastActivity > 60000) {
        navigate("/");
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [lastActivity, navigate]);

  // Reset activity on interaction
  const handleInteraction = () => {
    setLastActivity(Date.now());
  };

  // Set initial options (categories)
  useEffect(() => {
    if (currentQuestion === 0) {
      setCurrentOptions(categories);
    }
  }, [currentQuestion]);

  // Update options based on previous answers
  useEffect(() => {
    if (selectedAnswers.length > 0 && currentQuestion > 0) {
      if (currentQuestion === 1) {
        // Get top tags for selected category
        const category = selectedAnswers[0];
        const topTags = getTopTagsForCategory(category, 5);
        setCurrentOptions(topTags);
      } else if (currentQuestion > 1) {
        // For subsequent questions, get tags from filtered products
        const category = selectedAnswers[0];
        const filtered = mockProducts.filter((p) => {
          if (p.category !== category) return false;
          for (let i = 1; i < selectedAnswers.length; i++) {
            if (!p.tags.includes(selectedAnswers[i])) return false;
          }
          return true;
        });
        setApplicableProducts(filtered);

        if (filtered.length <= 15 || currentQuestion >= maxQuestions) {
          // End quiz if we have <= 15 products or max questions reached
          setIsComplete(true);
          return;
        }

        // Get next set of tags
        const tagCount: Record<string, number> = {};
        filtered.forEach((p) => {
          p.tags.forEach((tag) => {
            if (!selectedAnswers.includes(tag)) {
              tagCount[tag] = (tagCount[tag] || 0) + 1;
            }
          });
        });

        const nextTags = Object.entries(tagCount)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([tag]) => tag);

        if (nextTags.length > 0) {
          setCurrentOptions(nextTags);
        } else {
          setIsComplete(true);
        }
      }
    }
  }, [selectedAnswers, currentQuestion, maxQuestions]);

  const handleSelectAnswer = (answer: string) => {
    handleInteraction();
    const newAnswers = [...selectedAnswers.slice(0, currentQuestion), answer];
    setSelectedAnswers(newAnswers);

    if (currentQuestion >= maxQuestions - 1 || applicableProducts.length <= 15) {
      setIsComplete(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  if (isComplete) {
    // Redirect to search results with filtered products
    const category = selectedAnswers[0];
    const filtered = mockProducts.filter((p) => {
      if (p.category !== category) return false;
      for (let i = 1; i < selectedAnswers.length; i++) {
        if (!p.tags.includes(selectedAnswers[i])) return false;
      }
      return true;
    });
    return navigate("/search-results", { state: { results: filtered } });
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm font-semibold text-gray-700">In-depth</span>
            <button
              onClick={() => {
                handleInteraction();
                setInDepth(!inDepth);
              }}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                inDepth ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  inDepth ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </label>
        </div>

        <Link
          to="/"
          onClick={handleInteraction}
          className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2 px-6 rounded-full shadow-md transition-all border border-gray-200"
        >
          <Home size={20} className="inline mr-2" />
          Home
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl animate-fade-in">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="text-sm text-gray-500 mb-2">
              Question {currentQuestion + 1} of {maxQuestions}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / maxQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {questions[Math.min(currentQuestion, questions.length - 1)]}
          </h2>

          {/* Options */}
          <div className="grid grid-cols-1 gap-4">
            {currentOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSelectAnswer(option)}
                className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left font-medium text-gray-800 active:scale-95"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
