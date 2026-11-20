import React from "react";
import { ArrowRight } from "lucide-react";
import { TOPIC_CHIPS } from "../../data/libraryHomeData.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function TopicDiscoverySection({ onNavigateKnowledge }) {
  const { isHindi } = useLanguage();

  return (
    <section id="topics" className="py-6 sm:py-7 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-[0.3rem] sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#555555] bg-white px-2.5 py-0.5 rounded-full border border-[#E5E5E5] shadow-xs mb-1.5">
          {isHindi ? "सहज विषय अन्वेषण" : "INTUITIVE DISCOVERY"}
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mt-1">
          {isHindi ? "विषय अनुसार अन्वेषण करें" : "Explore by Topic"}
        </h2>
        <p className={`text-xs sm:text-sm text-[#555555] mt-1 max-w-xl mx-auto ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi
            ? "यदि आपको किसी विशेष वेद या ग्रंथ का नाम नहीं पता, तो अपनी रुचि के विषय से खोज शुरू करें।"
            : "If you don't have a specific text in mind, start exploring canonical knowledge by your topic of interest."}
        </p>

        {/* 18 Compact Chips Grid */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-4xl mx-auto mt-4 sm:mt-5">
          {TOPIC_CHIPS.map((topic) => (
            <button
              key={topic.name}
              type="button"
              onClick={onNavigateKnowledge}
              className="group flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white border border-[#E5E5E5] hover:border-[#D9A441] hover:bg-[#FFD21F]/15 shadow-2xs transition-all duration-200 cursor-pointer"
            >
              <span className={`text-xs font-semibold text-[#111111] group-hover:text-[#111111] transition-colors ${isHindi ? "font-devanagari" : ""}`}>
                {isHindi ? topic.name : (topic.enName || topic.name)}
              </span>
              <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-full bg-white text-[#555555] border border-[#E5E5E5] group-hover:border-[#D9A441] transition-colors">
                {topic.count}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 sm:mt-5">
          <button
            type="button"
            onClick={onNavigateKnowledge}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#111111] hover:text-[#D9A441] uppercase tracking-wider cursor-pointer transition-colors"
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
