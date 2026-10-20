import React from "react";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function FinalCtaSection({ onOpenSearch, onNavigateKnowledge }) {
  const { isHindi } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-b from-[#fffaf0] via-[#fff5e0] to-[#faedd0] border-t border-amber-200/80 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-600/30 text-amber-900 text-[11px] font-bold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>VAIDIKA JNANA PARAMPARA</span>
        </div>

        <h2 className={`font-serif text-2xl sm:text-4xl font-bold text-stone-900 leading-tight ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi ? "अपनी ज्ञान यात्रा का आरंभ करें" : "Begin Your Journey into Knowledge"}
        </h2>

        <p className={`text-sm sm:text-base text-stone-700 mt-2 max-w-lg mx-auto leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi
            ? "किसी वेद, ग्रंथ, मंत्र, ऋषि, देवता या विषय से अपनी ज्ञान यात्रा शुरू करें।"
            : "Begin your journey into sacred knowledge through any Veda, scripture, hymn, sage, deity, or tradition."}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onNavigateKnowledge}
            className="px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-600/25 hover:scale-102 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{isHindi ? "पुस्तकालय का अन्वेषण करें" : "Explore the Library"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenSearch}
            className="px-6 py-3 rounded-full bg-white hover:bg-amber-50 border border-stone-300 hover:border-amber-400 text-stone-800 font-bold text-xs sm:text-sm shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4 text-amber-700" />
            <span>{isHindi ? "पुस्तकालय में खोजें" : "Search the Library"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
