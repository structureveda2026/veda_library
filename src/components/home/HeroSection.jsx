import React, { useState } from "react";
import {
  Search,
  ArrowRight,
  Sparkles,
  BookOpen,
  Volume2,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { HERO_CONTENT } from "../../data/libraryHomeData.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import bannerVedaHero from "../../assets/images/library/banners/banner-veda-hero-clean.jpg";

const TRENDING_TAGS = [
  "ऋग्वेद संहिता",
  "महामृत्युंजय मंत्र",
  "गायत्री महामंत्र",
  "श्री सूक्त",
  "भगवद्गीता",
  "रुद्राभिषेक",
  "विष्णु सहस्रनाम",
  "ईशावास्योपनिषद्",
];

export default function HeroSection({ onOpenSearch, onNavigateKnowledge, onNavigateCollections }) {
  const [localQuery, setLocalQuery] = useState("");
  const { isHindi } = useLanguage();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onOpenSearch) onOpenSearch(localQuery);
  };

  const handlePillClick = (tag) => {
    setLocalQuery(tag);
    if (onOpenSearch) onOpenSearch(tag);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FDF7ED] to-[#F7EFE1] pt-12 pb-16 md:pt-16 md:pb-20 border-b border-amber-200/60 shadow-xs">
      {/* Background Sacred Vedic Dawn Sanctuary Artwork */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={bannerVedaHero}
          alt="Sacred Vedic Wisdom Sanctuary at Dawn"
          className="w-full h-full object-cover object-center opacity-85 scale-102 transition-transform duration-1000"
        />
        {/* Soft atmospheric golden morning glow & gentle vignette for natural richness & readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9]/65 via-[#FDF7ED]/45 to-[#F7EFE1]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/45 via-transparent to-amber-950/20" />
      </div>

      {/* Sacred Rotating Mandala Background Aura (Light Spiritual Theme) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
        <div className="w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] rounded-full border border-amber-300/30 opacity-35 animate-spin-slow flex items-center justify-center">
          <div className="w-[550px] h-[550px] sm:w-[700px] sm:h-[700px] rounded-full border border-amber-400/20 border-dashed flex items-center justify-center">
            <div className="w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full border border-amber-300/30" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow Pill with Sacred Lotus Glow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-amber-300 shadow-2xs text-[#78350F] text-xs font-bold tracking-wider uppercase mb-5 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
          <span>{isHindi ? "🔱 सनातन वैदिक ज्ञान एवं ग्रंथ परंपरा का पावन डिजिटल संग्रह" : "🔱 Canonical Vedic & Traditional Knowledge Archive"}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
        </div>

        {/* Main Majestic Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-2 leading-none drop-shadow-xs">
          <span className="bg-gradient-to-r from-[#5A1F03] via-[#9A3412] to-[#451402] bg-clip-text text-transparent">
            VEDA LIBRARY
          </span>
        </h1>

        <p className={`font-serif text-xl sm:text-2xl md:text-3xl text-[#451A03] font-bold mb-3 tracking-wide drop-shadow-2xs ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi ? "वैदिक एवं भारतीय ज्ञान परंपरा का पावन डिजिटल संग्रह" : HERO_CONTENT.enTitle}
        </p>

        {/* Subtitle */}
        <p className={`text-sm sm:text-base md:text-lg text-stone-900 mb-3 max-w-3xl mx-auto font-semibold leading-relaxed drop-shadow-2xs ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi
            ? "चारों वेद, वेदाङ्ग, उपनिषद, पुराण, दर्शन, मंत्र, स्तोत्र, ज्योतिष एवं वास्तु का प्रामाणिक, त्रिभाषी व त्रुटिरहित संग्रह।"
            : "A structured canonical archive of the 4 Vedas, Upanishads, Puranas, Mantras, Shastras & classical traditions with word-by-word meanings."}
        </p>

        {/* Supporting tag with soft frosted pill */}
        <div className="inline-block px-4 py-1 rounded-full bg-white/80 backdrop-blur-xs border border-amber-300/70 shadow-2xs mb-7 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-stone-800 font-semibold">
            {isHindi
              ? "शुद्ध देवनागरी पाठ • सस्वर वैदिक स्वर • त्रिभाषी भावार्थ (हिंदी, English, सरल हिंग्लिश)"
              : "Pure Devanagari Sanskrit • Padapatha • 3-Language Translations (Hindi, English, Hinglish)"}
          </p>
        </div>

        {/* Master Search Engine Bar (Inspired by Bhaktilok) */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative max-w-2xl mx-auto mb-4 group"
        >
          <div className="relative flex items-center bg-white rounded-full shadow-xl border-2 border-orange-400/90 group-hover:border-orange-500 transition-all p-1.5 pl-4 sm:pl-5 ring-4 ring-orange-500/10">
            <Search className="w-5 h-5 text-orange-600 flex-shrink-0 mr-2.5" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onClick={() => onOpenSearch && onOpenSearch(localQuery)}
              placeholder={isHindi ? "वेद, ग्रंथ, मंत्र, श्लोक, देवता, सूक्त खोजें..." : "Search Veda, Grantha, Mantra, Shloka, Deity, Sukta..."}
              className="w-full bg-transparent text-[#1E293B] placeholder:text-stone-400 focus:outline-none text-xs sm:text-sm md:text-base font-semibold pr-2"
            />
            <button
              type="submit"
              className="px-5 sm:px-7 py-2.5 rounded-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-600/30 hover:shadow-lg transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
            >
              <span>{isHindi ? "खोजें" : "Search"}</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </button>
          </div>
        </form>

        {/* Trending Search Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] sm:text-xs text-stone-600 mb-8 max-w-3xl mx-auto">
          <span className="font-bold text-orange-800 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-600" />
            {isHindi ? "प्रचलित खोज:" : "Trending:"}
          </span>
          {TRENDING_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handlePillClick(tag)}
              className="px-2.5 py-0.5 rounded-full bg-white/90 hover:bg-orange-50 text-stone-700 hover:text-orange-900 border border-amber-200/90 shadow-2xs font-medium transition-all cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Dual Premium CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
          <button
            type="button"
            onClick={onNavigateKnowledge}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-orange-600/25 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>{isHindi ? "चारों वेदों का अन्वेषण करें" : "Explore The Four Vedas"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onNavigateKnowledge && onNavigateKnowledge("/library/mantra-stotra")}
            className="px-7 py-3.5 rounded-full bg-white hover:bg-orange-50/80 border-2 border-amber-300 text-stone-800 font-bold text-sm shadow-xs hover:border-orange-400 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-orange-600" />
            <span>{isHindi ? "पावन मंत्र व स्तोत्र संग्रह" : "Sacred Mantras & Stotras"}</span>
          </button>
        </div>

        {/* Quick Vedic Trust Strip Pills */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-4 py-2 rounded-2xl bg-amber-100/60 border border-amber-200/80 text-xs font-semibold text-[#78350F] shadow-2xs">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span className="text-[#78350F] font-bold">४ वेद संहिताएँ (१०,५५२+ मन्त्र)</span>
          </span>
          <span className="text-amber-400">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span className="text-[#78350F] font-bold">१०८ उपनिषद् व षड्दर्शन</span>
          </span>
          <span className="text-amber-400">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span className="text-[#78350F] font-bold">१८ महापुराण व रामायण-महाभारत</span>
          </span>
          <span className="text-amber-400">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span className="text-[#78350F] font-bold">त्रिभाषी मानक (हिंदी, Eng, हिंग्लिश)</span>
          </span>
        </div>
      </div>
    </section>
  );
}
