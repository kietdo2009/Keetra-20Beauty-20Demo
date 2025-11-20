import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { useAppContext } from "@/lib/app-context";

const LIGHT_COLORS = [
  { name: "White", value: "#ffffff" },
  { name: "Warm", value: "#fbbf24" },
  { name: "Pink", value: "#ec4899" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Blue", value: "#0ea5e9" },
  { name: "Green", value: "#10b981" },
];

export default function Customize() {
  const { customize, updateCustomize } = useAppContext();
  const [brightness, setBrightness] = useState(customize.brightness);
  const [selectedColor, setSelectedColor] = useState(customize.lightColor);
  const [syncMusic, setSyncMusic] = useState(customize.syncToMusic);

  const handleSave = () => {
    updateCustomize({
      brightness,
      lightColor: selectedColor,
      syncToMusic: syncMusic,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-800 hover:text-gray-600 transition-colors font-semibold"
        >
          <ArrowLeft size={20} />
          Back
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Customize</h1>
        <Link
          to="/"
          className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2 px-6 rounded-full shadow-md transition-all border border-gray-200"
        >
          <Home size={20} className="inline" />
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl space-y-12 animate-fade-in">
          {/* Brightness control */}
          <div className="space-y-4">
            <div>
              <label className="text-lg font-bold text-gray-900 mb-2 block">Light Brightness</label>
              <p className="text-sm text-gray-600 mb-4">Adjust the brightness of the aisle lights</p>
            </div>

            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Dimmer</span>
                <span className="text-2xl font-bold text-gray-900">{brightness}%</span>
                <span className="text-sm text-gray-600">Brighter</span>
              </div>
            </div>

            {/* Brightness preview */}
            <div
              className="w-full h-32 rounded-lg transition-all duration-200"
              style={{ backgroundColor: `rgba(255, 255, 255, ${brightness / 100})` }}
            >
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 font-semibold">
                Preview
              </div>
            </div>
          </div>

          {/* Color control */}
          <div className="space-y-4">
            <div>
              <label className="text-lg font-bold text-gray-900 mb-2 block">Light Color</label>
              <p className="text-sm text-gray-600 mb-4">Choose the color of the aisle lights</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {LIGHT_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`p-4 rounded-2xl border-2 transition-all active:scale-95 ${
                    selectedColor === color.value
                      ? "border-blue-500 ring-2 ring-blue-300"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className="w-full h-20 rounded-lg mb-3 shadow-md"
                    style={{ backgroundColor: color.value }}
                  ></div>
                  <p className="text-sm font-semibold text-gray-800">{color.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Music sync toggle */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <label className="text-lg font-bold text-gray-900 block">Sync to Music</label>
                <p className="text-sm text-gray-600 mt-1">Lights dance with the music in the store</p>
              </div>
              <button
                onClick={() => setSyncMusic(!syncMusic)}
                className={`relative inline-flex h-10 w-18 items-center rounded-full transition-colors flex-shrink-0 ${
                  syncMusic ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform ${
                    syncMusic ? "translate-x-9" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Save button */}
          <div className="flex gap-3 pt-8 border-t border-gray-200">
            <Link
              to="/"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded-xl transition-all active:scale-95 text-center"
            >
              Cancel
            </Link>
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl transition-all active:scale-95"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
