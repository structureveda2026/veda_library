import React from "react";
import { BROWSE_BY_SOURCE } from "../../data/libraryHomeData.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function BrowseBySourceSection({ onNavigateKnowledge }) {
  const { isHindi } = useLanguage();

  return (
    <section className="py-8 bg-[#FFFFFF] border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`font-serif text-lg sm:text-xl font-bold text-[#111111] mb-3 ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi ? "स्रोत अनुसार अन्वेषण करें" : "Browse by Source"}
        </h2>

        {/* 2 Rows of 5 Rounded Buttons (Compact & Sleek) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {BROWSE_BY_SOURCE.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={onNavigateKnowledge}
              className={`px-3 py-2 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] hover:bg-[#FFD21F]/15 shadow-2xs hover:shadow-xs text-center text-xs sm:text-sm font-semibold text-[#111111] transition-all cursor-pointer ${isHindi ? "font-devanagari" : "font-serif"}`}
            >
              {isHindi ? (item.hiLabel || item.label) : item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
