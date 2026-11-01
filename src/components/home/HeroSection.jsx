import React, { useState, useEffect, useRef } from "react";
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

export default function HeroSection({
  onOpenSearch,
  onNavigateKnowledge,
  onNavigateCollections,
}) {
  const [localQuery, setLocalQuery] = useState("");
  const searchInputRef = useRef(null);
  const { isHindi } = useLanguage();

  // Keyboard shortcut indicator logic (⌘K on Mac, Ctrl+K on Windows/Linux)
  const isMac =
    typeof window !== "undefined" &&
    /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
        if (onOpenSearch) {
          onOpenSearch(localQuery);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [localQuery, onOpenSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onOpenSearch) onOpenSearch(localQuery);
  };

  const handlePillClick = (tag) => {
    setLocalQuery(tag);
    if (onOpenSearch) onOpenSearch(tag);
  };

  return (
    <section className="relative overflow-hidden bg-[#111111] pt-5 sm:pt-6 pb-6 sm:pb-8 border-b border-[#111111]">
      {/* Background Sacred Vedic Dawn Sanctuary Artwork with Tasteful Cinematic Black Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={bannerVedaHero}
          alt="Sacred Vedic Wisdom Sanctuary"
          className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000 opacity-85"
        />
        {/* Tasteful Dark Vedic Atmospheric Overlay for Royal Ambiance & High-Contrast Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_25%,_rgba(0,0,0,0.85)_100%)]" />
      </div>

      {/* Sacred Rotating Mandala Background Aura - Delicate Gold Spiritual Sacred Geometry */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
        <div className="w-[750px] h-[750px] sm:w-[950px] sm:h-[950px] rounded-full border border-[#D9A441]/25 opacity-40 animate-spin-slow flex items-center justify-center">
          <div className="w-[580px] h-[580px] sm:w-[750px] sm:h-[750px] rounded-full border border-[#D9A441]/15 border-dashed flex items-center justify-center">
            <div className="w-[420px] h-[420px] sm:w-[550px] sm:h-[550px] rounded-full border border-[#D9A441]/20" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Eyebrow Pill with Sacred Lotus Glow - Perfectly Aligned */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-[#D9A441]/40 shadow-sm text-xs font-semibold tracking-wider uppercase mb-2.5 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD21F] animate-pulse" />
          <span className="text-white font-medium tracking-wide">
            {isHindi
              ? "॥ ॐ तत्सत् ॥ वैदिक ज्ञान परंपरा का डिजिटल गर्भगृह"
              : "🔱 VEDA STRUCTURE • DIGITAL VEDIC SANCTUM"}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-ping" />
        </div>

        {/* Master Heading: High contrast White typography with Radiant Brand Yellow #FFD21F */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[52px] font-bold text-white leading-none sm:leading-[1.02] tracking-tight mb-1 max-w-4xl drop-shadow-md text-center">
          {isHindi ? (
            <span className="font-devanagari block">
              <span className="block">वैदिक एवं सनातन भारतीय ज्ञान परंपरा का</span>
              <span className="text-[#FFD21F] block -mt-1 sm:-mt-2 font-extrabold relative">
                पावन डिजिटल संग्रह
              </span>
            </span>
          ) : (
            <span className="font-serif font-bold block">
              <span className="block">Explore the Wisdom of Vedic &amp;</span>
              <span className="text-[#FFD21F] block -mt-1 sm:-mt-2 font-extrabold">
                Indian Traditions
              </span>
            </span>
          )}
        </h1>

        {/* Subtitle - Crisp high-legibility light text on dark sanctuary */}
        <p className="text-sm sm:text-base md:text-lg text-[#E5E5E5] font-normal !leading-snug max-w-2xl mx-auto mt-0.5 sm:mt-1 mb-3 drop-shadow-xs text-center font-devanagari sm:font-sans">
          {isHindi
            ? "चारों वेद, वेदाङ्ग, उपनिषद, पुराण, दर्शन, मंत्र, स्तोत्र, ज्योतिष एवं वास्तु का प्रामाणिक, त्रिभाषी व त्रुटिरहित संदर्भ-युक्त संग्रह।"
            : "A structured, searchable, source-referenced digital library for the 4 Vedas, Upanishads, Puranas, Mantras, Shastras and classical Vedic knowledge."}
        </p>

        {/* Master Search Engine Bar - Refined with subtle inner shadow, crisp 1px border, #FFD21F focus ring & ⌘K/Ctrl+K shortcut */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-2xl mx-auto mb-3.5 group"
        >
          <div className="relative flex items-center bg-white rounded-full border-2 border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.35)] focus-within:border-[#FFD21F] focus-within:ring-4 focus-within:ring-[#FFD21F]/30 hover:border-[#FFD21F]/70 transition-all duration-300 p-1.5 pl-4 sm:pl-6">
            <Search className="w-5 h-5 text-[#555555] flex-shrink-0 mr-3 group-focus-within:text-[#111111] transition-colors" />
            <input
              ref={searchInputRef}
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onClick={() => onOpenSearch && onOpenSearch(localQuery)}
              placeholder={
                isHindi
                  ? "वेद, ग्रंथ, मंत्र, श्लोक, देवता, सूक्त खोजें..."
                  : "Search Veda, Grantha, Mantra, Shloka, Deity, Sukta..."
              }
              className="w-full min-w-0 bg-transparent text-[#111111] placeholder:text-[#666666] focus:outline-none text-sm sm:text-base font-semibold pr-2"
            />
            {/* Keyboard shortcut indicator: ⌘K / Ctrl+K */}
            <div className="hidden sm:inline-flex items-center gap-1 mr-2 select-none pointer-events-none">
              <kbd className="inline-flex items-center justify-center min-w-[22px] h-6 px-1.5 text-[11px] font-mono font-bold text-[#555555] bg-[#F5F5F5] border border-[#E5E5E5] rounded-md shadow-2xs">
                {isMac ? "⌘" : "Ctrl"}
              </kbd>
              <kbd className="inline-flex items-center justify-center min-w-[22px] h-6 px-1.5 text-[11px] font-mono font-bold text-[#555555] bg-[#F5F5F5] border border-[#E5E5E5] rounded-md shadow-2xs">
                K
              </kbd>
            </div>
            <button
              type="submit"
              className="min-h-[44px] px-6 sm:px-8 py-2.5 rounded-full bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 flex-shrink-0 cursor-pointer active:scale-[0.98]"
            >
              <span>{isHindi ? "खोजें" : "Search"}</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </button>
          </div>
        </form>

        {/* Trending Search Pills - Clean pill buttons with subtle hover elevation */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#E5E5E5] mb-5 max-w-4xl mx-auto">
          <span className="font-bold text-white flex items-center gap-1 mr-1">
            <Flame className="w-3.5 h-3.5 text-[#FFD21F]" />
            {isHindi ? "प्रचलित खोज:" : "Trending:"}
          </span>
          {TRENDING_TAGS.map((tag) => {
            const isActive = localQuery === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handlePillClick(tag)}
                className={`min-h-[34px] px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer font-medium text-xs flex items-center gap-1 ${
                  isActive
                    ? "bg-[#FFD21F] text-[#111111] border border-[#FFD21F] font-bold shadow-sm"
                    : "bg-black/40 text-[#E5E5E5] border border-white/20 hover:bg-[#FFD21F] hover:text-[#111111] hover:border-[#FFD21F] hover:shadow-sm hover:-translate-y-0.5 active:scale-[0.97] backdrop-blur-sm"
                }`}
              >
                <span>{tag}</span>
              </button>
            );
          })}
        </div>

        {/* Dual Premium CTAs: Primary #FFD21F with deep black #111111 text & subtle active micro-interaction; Secondary with backdrop blur and golden border #D9A441 */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6 max-w-xl mx-auto">
          <button
            type="button"
            onClick={onNavigateKnowledge}
            className="w-full sm:w-auto min-h-[48px] px-7 sm:px-8 py-3.5 rounded-full bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-black text-sm sm:text-base shadow-lg shadow-[#FFD21F]/20 hover:shadow-xl hover:shadow-[#FFD21F]/30 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] group"
          >
            <BookOpen className="w-5 h-5 text-[#111111] shrink-0" />
            <span>
              {isHindi
                ? "पुस्तकालय का अन्वेषण करें (Browse Library)"
                : "Browse Library"}
            </span>
            <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() =>
              onNavigateKnowledge &&
              onNavigateKnowledge("/category/mantra-stotra")
            }
            className="w-full sm:w-auto min-h-[48px] px-7 sm:px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border-2 border-[#D9A441] hover:border-[#FFD21F] text-white font-bold text-sm sm:text-base shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] backdrop-blur-md"
          >
            <Volume2 className="w-5 h-5 text-[#FFD21F] shrink-0" />
            <span>
              {isHindi
                ? "पावन मंत्र व स्तोत्र संग्रह"
                : "Sacred Mantras & Stotras"}
            </span>
          </button>
        </div>

        {/* Quick Vedic Trust Strip Pills */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 px-4 py-2.5 sm:px-6 sm:py-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 text-xs font-medium text-[#E5E5E5] shadow-xs">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#FFD21F]" />
            <span className="text-white font-bold">
              ४ वेद संहिताएँ (१०,५५२+ मन्त्र)
            </span>
          </span>
          <span className="hidden sm:inline text-[#D9A441]">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#FFD21F]" />
            <span className="text-white font-bold">१०८ उपनिषद् व षड्दर्शन</span>
          </span>
          <span className="hidden sm:inline text-[#D9A441]">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#FFD21F]" />
            <span className="text-white font-bold">
              १८ महापुराण व रामायण-महाभारत
            </span>
          </span>
          <span className="hidden sm:inline text-[#D9A441]">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#FFD21F]" />
            <span className="text-white font-bold">
              त्रिभाषी मानक (हिंदी, Eng, हिंग्लिश)
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
