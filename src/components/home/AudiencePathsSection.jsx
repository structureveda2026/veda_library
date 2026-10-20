import React from "react";
import { ArrowRight, GraduationCap, Compass, BookOpen } from "lucide-react";
import { AUDIENCE_PATHS } from "../../data/libraryHomeData.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

const PATH_ICONS = [GraduationCap, Compass, BookOpen];

export default function AudiencePathsSection({ onNavigateKnowledge }) {
  const { isHindi } = useLanguage();

  return (
    <section className="py-12 sm:py-16 bg-[#fffaf0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-200">
            {isHindi ? "अध्ययन मार्ग" : "AUDIENCE-DRIVEN NAVIGATION"}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1.5">
            {isHindi ? "अपनी रुचि से शुरुआत करें" : "Start Where You Are"}
          </h2>
          <p className={`text-xs sm:text-sm text-stone-600 mt-1 ${isHindi ? "font-devanagari" : ""}`}>
            {isHindi
              ? "अपनी जिज्ञासा एवं अध्ययन के उद्देश्य के अनुसार अनुकूल मार्ग चुनें।"
              : "Choose the path best suited to your curiosity and purpose of study."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {AUDIENCE_PATHS.map((path, idx) => {
            const Icon = PATH_ICONS[idx] || BookOpen;
            const title = isHindi ? path.role : path.enRole;
            const subtitle = isHindi ? path.enRole : path.role;

            return (
              <div
                key={idx}
                onClick={onNavigateKnowledge}
                className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-lg hover:border-amber-300 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-xl font-bold text-stone-900 ${isHindi ? "font-devanagari" : "font-serif"}`}>
                    {title}
                  </h3>
                  <span className={`text-[11px] font-medium text-amber-800/80 ${isHindi ? "" : "font-devanagari"}`}>
                    {subtitle}
                  </span>
                  <p className="text-xs text-stone-600 font-devanagari mt-2 leading-relaxed">
                    {path.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 text-xs font-bold text-amber-800 group-hover:text-amber-950 flex items-center gap-1 transition-colors">
                  <span>{path.cta}</span>
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
