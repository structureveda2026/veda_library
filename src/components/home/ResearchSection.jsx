import React from "react";
import { ArrowRight } from "lucide-react";
import { RESEARCH_MODULES } from "../../data/libraryHomeData.js";
import IconHelper from "../common/IconHelper.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function ResearchSection({ onNavigateKnowledge }) {
  const { isHindi } = useLanguage();

  return (
    <section id="research" className="py-12 sm:py-16 bg-[#fffdf8] border-y border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800">
              {isHindi ? "शास्त्रीय शोध एवं संदर्भ" : "SCHOLARLY INQUIRY"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
              {isHindi ? "अनुसंधान एवं संदर्भ" : "Research & References"}
            </h2>
            <p className={`text-xs sm:text-sm text-stone-600 mt-0.5 ${isHindi ? "font-devanagari" : ""}`}>
              {isHindi
                ? "स्रोत, भाष्य, टीका, संस्करण और अन्य संदर्भों के माध्यम से ज्ञान को अधिक गहराई से explore करें।"
                : "Explore knowledge in depth through manuscripts, commentaries, critical editions, and scholarly references."}
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateKnowledge}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-amber-800 hover:text-amber-950 group self-start sm:self-auto cursor-pointer"
          >
            <span>{isHindi ? "अनुसंधान देखें" : "Explore Research"}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Research Modules Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESEARCH_MODULES.map((mod, idx) => (
            <div
              key={idx}
              onClick={onNavigateKnowledge}
              className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all flex items-start gap-3.5 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <IconHelper name={mod.icon} className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {mod.title}
                </h3>
                <p className="text-[11px] text-stone-500 font-devanagari mt-0.5 leading-relaxed">
                  {mod.desc}
                </p>
                <span className="inline-block mt-2 text-[11px] font-semibold text-amber-700 group-hover:text-amber-900">
                  {isHindi ? "संग्रह देखें →" : "Browse Archive →"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
