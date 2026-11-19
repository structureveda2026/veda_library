import React from "react";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function FinalCtaSection({ onOpenSearch, onNavigateKnowledge }) {
  const { isHindi } = useLanguage();

  return (
    <section className="py-7 sm:py-9 bg-white border-t border-[#E5E5E5] text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white border border-[#E5E5E5] text-[#555555] text-[11px] font-bold tracking-widest uppercase mb-2 sm:mb-2.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
          <span className="text-[#111111]">VAIDIKA JNANA PARAMPARA</span>
        </div>

        <h2 className={`font-serif text-2xl sm:text-3xl font-bold text-[#111111] leading-tight ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi ? "अपनी ज्ञान यात्रा का आरंभ करें" : "Begin Your Journey into Knowledge"}
        </h2>

        <p className={`text-xs sm:text-sm text-[#555555] mt-1.5 max-w-lg mx-auto leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi
            ? "किसी वेद, ग्रंथ, मंत्र, ऋषि, देवता या विषय से अपनी ज्ञान यात्रा शुरू करें।"
            : "Begin your journey into sacred knowledge through any Veda, scripture, hymn, sage, deity, or tradition."}
        </p>

        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onNavigateKnowledge}
            className="px-5 sm:px-6 py-2.5 rounded-full bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-bold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>{isHindi ? "पुस्तकालय का अन्वेषण करें" : "Explore the Library"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenSearch}
            className="px-5 sm:px-6 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-[#E5E5E5] hover:border-[#D9A441] text-[#111111] font-bold text-xs sm:text-sm shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#555555]" />
            <span>{isHindi ? "पुस्तकालय में खोजें" : "Search the Library"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
