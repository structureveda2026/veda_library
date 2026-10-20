import React from "react";
import { ArrowRight } from "lucide-react";
import { TOPIC_CHIPS } from "../../data/libraryHomeData.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function TopicDiscoverySection({ onNavigateKnowledge }) {
  const { isHindi } = useLanguage();

  return (
    <section id="topics" className="py-12 sm:py-16 bg-[#fffdf8] border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-200">
          {isHindi ? "सहज विषय अन्वेषण" : "INTUITIVE DISCOVERY"}
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1.5">
          {isHindi ? "विषय अनुसार अन्वेषण करें" : "Explore by Topic"}
        </h2>
        <p className={`text-xs sm:text-sm text-stone-600 mt-1 max-w-xl mx-auto ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi
            ? "यदि आपको किसी विशेष वेद या ग्रंथ का नाम नहीं पता, तो अपनी रुचि के विषय से खोज शुरू करें।"
            : "If you don't have a specific text in mind, start exploring canonical knowledge by your topic of interest."}
        </p>

        {/* 18 Compact Chips Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mt-6">
          {TOPIC_CHIPS.map((topic) => (
            <button
              key={topic.name}
              type="button"
              onClick={onNavigateKnowledge}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 hover:border-amber-400 hover:bg-amber-50 shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer"
            >
              <span className={`text-xs font-semibold text-stone-800 group-hover:text-amber-900 transition-colors ${isHindi ? "font-devanagari" : ""}`}>
                {isHindi ? topic.name : (topic.enName || topic.name)}
              </span>
              <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-full bg-stone-100 text-stone-500 group-hover:bg-amber-200/60 group-hover:text-amber-900 transition-colors">
                {topic.count}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={onNavigateKnowledge}
            className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 uppercase tracking-wider cursor-pointer"
          >
            <span>
              {isHindi
                ? "समस्त ५००+ शास्त्रीय विषय देखें"
                : "Explore All Topics (500+ Canonical Subjects)"}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
