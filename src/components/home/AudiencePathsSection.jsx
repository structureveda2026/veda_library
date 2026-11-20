import React from "react";
import { ArrowRight, GraduationCap, Compass, BookOpen } from "lucide-react";
import { AUDIENCE_PATHS } from "../../data/libraryHomeData.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

const PATH_ICONS = [GraduationCap, Compass, BookOpen];

export default function AudiencePathsSection({ onNavigateKnowledge }) {
  const { isHindi } = useLanguage();

  return (
    <section className="py-6 sm:py-8 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-[0.3rem] sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#111111] bg-[#FFD21F] px-2.5 py-0.5 rounded-full border border-[#FFD21F]">
            {isHindi ? "अध्ययन मार्ग" : "AUDIENCE-DRIVEN NAVIGATION"}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mt-2">
            {isHindi ? "अपनी रुचि से शुरुआत करें" : "Start Where You Are"}
          </h2>
          <p className={`text-xs sm:text-sm text-[#555555] mt-1 ${isHindi ? "font-devanagari" : ""}`}>
            {isHindi
              ? "अपनी जिज्ञासा एवं अध्ययन के उद्देश्य के अनुसार अनुकूल मार्ग चुनें।"
              : "Choose the path best suited to your curiosity and purpose of study."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {AUDIENCE_PATHS.map((path, idx) => {
            const Icon = PATH_ICONS[idx] || BookOpen;
            const title = isHindi ? path.role : path.enRole;
            const desc = isHindi ? path.desc : (path.enDesc || path.desc);
            const ctaText = isHindi ? (path.ctaHi || path.cta) : path.cta;

            return (
              <div
                key={idx}
                onClick={onNavigateKnowledge}
                className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#E5E5E5] shadow-2xs hover:shadow-md hover:border-[#D9A441] transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#FFD21F]/15 text-[#D9A441] flex items-center justify-center mb-2.5 group-hover:bg-[#FFD21F] group-hover:text-[#111111] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors ${isHindi ? "font-devanagari" : "font-serif"}`}>
                    {title}
                  </h3>
                  <p className={`text-xs text-[#555555] mt-1.5 leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>
                    {desc}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#E5E5E5] text-xs font-bold text-[#111111] group-hover:text-[#D9A441] flex items-center gap-1 transition-colors">
                  <span>{ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
