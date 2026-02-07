"use client";

import { useState } from "react";
import ProductList from "@/components/ProductList";
import CategoryFilter from "@/components/CategoryFilter";
import { Search, ShoppingBasket, Truck, ShieldCheck } from "lucide-react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      {/* Search & Hero */}
      <div className="bg-green-600 py-8 md:py-12 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-5xl font-extrabold text-white mb-4 md:mb-6">
            Order from a wide range of fresh items and pick up when order is ready
          </h1>
          <p className="text-green-100 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto font-medium">
            Shop from our wide range of items and daily essentials.
          </p>

          <div className="max-w-2xl mx-auto relative group mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl bg-white text-gray-900 border-none shadow-lg outline-none focus:ring-2 focus:ring-green-400 text-base md:text-lg transition-all"
            />
          </div>

          {/* Compact Offers Button */}
          <button
            onClick={() => window.location.href = '/offers'}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold text-sm md:text-base hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
          >
            <span className="text-lg">🎁</span>
            <span>View Special Offers</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto w-full px-4 -mt-6">
        <div className="bg-white grid grid-cols-3 gap-0 md:gap-4 p-2 md:p-6 rounded-2xl shadow-md border border-gray-100">
          <div className="flex flex-col items-center justify-center text-center gap-1 md:gap-3 p-1 md:p-4">
            <div className="bg-green-50 p-1.5 md:p-3 rounded-full text-green-600"><ShoppingBasket size={16} className="md:w-6 md:h-6" /></div>
            <div>
              <p className="font-bold text-gray-900 text-[10px] md:text-base">Wide Variety</p>
              <p className="text-[8px] md:text-xs text-gray-500">1000+ items</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center gap-1 md:gap-3 p-1 md:p-4 md:border-x border-gray-100">
            <div className="bg-orange-50 p-1.5 md:p-3 rounded-full text-orange-600"><Truck size={16} className="md:w-6 md:h-6" /></div>
            <div>
              <p className="font-bold text-gray-900 text-[10px] md:text-base">Self Pickup</p>
              <p className="text-[8px] md:text-xs text-gray-500">Fast & Convenient</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center gap-1 md:gap-3 p-1 md:p-4">
            <div className="bg-blue-50 p-1.5 md:p-3 rounded-full text-blue-600"><ShieldCheck size={16} className="md:w-6 md:h-6" /></div>
            <div>
              <p className="font-bold text-gray-900 text-[10px] md:text-base">Quality Checked</p>
              <p className="text-[8px] md:text-xs text-gray-500">100% Guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Filter */}
        <div className="w-full md:w-64 flex-shrink-0">
          <h3 className="font-bold text-gray-900 mb-4 px-1">Categories</h3>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-8 overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {searchQuery ? `Results for "${searchQuery}"` : selectedCategory || "Featured Products"}
            </h2>
            <div className="h-1 w-20 bg-green-500 rounded-full mt-2"></div>
          </div>

          <ProductList category={selectedCategory} search={searchQuery} />
        </div>
      </div>

      {/* Pickup Reminder */}
      <div className="bg-blue-50 py-8 border-y border-blue-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-blue-800 font-semibold flex items-center justify-center gap-2">
            🚀 APP COMING SOON - Only Store Pickup Available for now.
          </p>
        </div>
      </div>
    </div>
  );
}
