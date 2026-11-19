import React from "react";
import { ROADMAP_STAGES } from "../../data/libraryHomeData.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function RoadmapSection() {
  const { isHindi } = useLanguage();

  return (
    <section id="roadmap" className="py-8 sm:py-10 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#111111] bg-[#FFD21F] px-2.5 py-0.5 rounded-full border border-[#FFD21F]">
            {isHindi ? "विकास योजना" : "FUTURE HORIZON"}
          </span>
          <h2 className={`font-serif text-2xl sm:text-3xl font-bold text-[#111111] mt-2 ${isHindi ? "font-devanagari" : ""}`}>
            {isHindi ? "पुस्तकालय का विस्तार" : "The Library is Growing"}
          </h2>
          <p className={`text-xs sm:text-sm text-[#555555] mt-1 leading-relaxed max-w-xl mx-auto ${isHindi ? "font-devanagari" : ""}`}>
            {isHindi
              ? "Veda Library को चरणबद्ध रूप से विकसित किया जा रहा है। वर्तमान में हमारा focus structured text collection और source-based knowledge organization पर है।"
              : "Veda Library is being expanded in structured phases, currently focusing on authentic textual collections and canonical categorization."}
          </p>
        </div>

        {/* 6 Roadmap Steps Compact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {ROADMAP_STAGES.map((item) => {
            const isActive = item.status === "Active";
            return (
              <div
                key={item.step}
                className={`p-3 sm:p-3.5 rounded-xl border transition-all text-center flex flex-col justify-between ${
                  isActive
                    ? "bg-white border-[#D9A441] shadow-2xs"
                    : "bg-white border-[#E5E5E5]"
                }`}
              >
                <div>
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 ${
                      isActive
                        ? "bg-[#FFD21F] text-[#111111]"
                        : "bg-white text-[#555555] border border-[#E5E5E5]"
                    }`}
                  >
                    Phase {item.step}
                  </span>
                  <h3 className={`font-serif text-sm sm:text-base font-bold text-[#111111] ${isHindi ? "font-devanagari" : ""}`}>
                    {isHindi ? (item.titleHi || item.title) : (item.titleEn || item.title)}
                  </h3>
                  <p className={`text-[10px] text-[#555555] mt-1 leading-snug ${isHindi ? "font-devanagari" : ""}`}>
                    {isHindi ? (item.descHi || item.desc) : (item.descEn || item.desc)}
                  </p>
                </div>

                <div className="mt-3 pt-1.5 border-t border-[#E5E5E5]">
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider ${
                      isActive ? "text-[#D9A441]" : "text-[#555555]"
                    }`}
                  >
                    {isHindi ? (item.statusHi || item.status) : (item.statusEn || item.status)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
