import React from "react";
import { ROADMAP_STAGES } from "../../data/libraryHomeData.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function RoadmapSection() {
  const { isHindi } = useLanguage();

  return (
    <section id="roadmap" className="py-12 sm:py-16 bg-[#fffaf0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-200">
            {isHindi ? "विकास योजना" : "FUTURE HORIZON"}
          </span>
          <h2 className={`font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1.5 ${isHindi ? "font-devanagari" : ""}`}>
            {isHindi ? "पुस्तकालय का विस्तार" : "The Library is Growing"}
          </h2>
          <p className={`text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed max-w-xl mx-auto ${isHindi ? "font-devanagari" : ""}`}>
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
                    ? "bg-white border-amber-400 shadow-2xs"
                    : "bg-stone-50/70 border-stone-200 opacity-80"
                }`}
              >
                <div>
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 ${
                      isActive
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    Phase {item.step}
                  </span>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-stone-500 font-devanagari mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-3 pt-1.5 border-t border-stone-100">
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider ${
                      isActive ? "text-emerald-700" : "text-stone-400"
                    }`}
                  >
                    {item.status}
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
