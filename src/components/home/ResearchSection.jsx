import React from "react";
import { ArrowRight } from "lucide-react";
import { RESEARCH_MODULES } from "../../data/libraryHomeData.js";
import IconHelper from "../common/IconHelper.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function ResearchSection({ onNavigateKnowledge }) {
  const { isHindi } = useLanguage();

  return (
    <section id="research" className="py-6 sm:py-8 bg-white border-y border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-5 gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#D9A441]">
              {isHindi ? "शास्त्रीय शोध एवं संदर्भ" : "SCHOLARLY INQUIRY"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mt-0.5">
              {isHindi ? "अनुसंधान एवं संदर्भ" : "Research & References"}
            </h2>
            <p className={`text-xs sm:text-sm text-[#555555] mt-0.5 ${isHindi ? "font-devanagari" : ""}`}>
              {isHindi
                ? "स्रोत, भाष्य, टीका, संस्करण और अन्य संदर्भों के माध्यम से ज्ञान को अधिक गहराई से explore करें।"
                : "Explore knowledge in depth through manuscripts, commentaries, critical editions, and scholarly references."}
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateKnowledge}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#D9A441] group self-start sm:self-auto cursor-pointer transition-colors"
          >
            <span>{isHindi ? "अनुसंधान देखें" : "Explore Research"}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Research Modules Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {RESEARCH_MODULES.map((mod, idx) => (
            <div
              key={idx}
              onClick={onNavigateKnowledge}
              className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#E5E5E5] shadow-2xs hover:shadow-md hover:border-[#D9A441] transition-all flex items-start gap-3 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-[#FFD21F]/15 text-[#D9A441] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD21F] group-hover:text-[#111111] transition-colors">
                <IconHelper name={mod.icon} className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className={`font-serif text-sm sm:text-base font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors ${isHindi ? "font-devanagari" : ""}`}>
                  {isHindi ? (mod.titleHi || mod.title) : (mod.titleEn || mod.title)}
                </h3>
                <p className={`text-[11px] text-[#555555] mt-0.5 leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>
                  {isHindi ? (mod.descHi || mod.desc) : (mod.descEn || mod.desc)}
                </p>
                <span className="inline-block mt-1.5 text-[10px] sm:text-[11px] font-semibold text-[#111111] group-hover:text-[#D9A441] transition-colors">
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
