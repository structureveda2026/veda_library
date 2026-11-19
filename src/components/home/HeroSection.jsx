import React, { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, BookOpen, Volume2, Flame } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import bannerVedaHero from "../../assets/images/library/banners/banner-veda-hero-clean.jpg";

const FEATURED_TOPICS = [
  { hi: "ऋग्वेद", en: "Rigveda" },
  { hi: "गायत्री मंत्र", en: "Gayatri Mantra" },
  { hi: "भगवद्गीता", en: "Bhagavad Gita" },
  { hi: "उपनिषद्", en: "Upanishads" },
];

export default function HeroSection({ onOpenSearch, onNavigateKnowledge }) {
  const [localQuery, setLocalQuery] = useState("");
  const searchInputRef = useRef(null);
  const { isHindi } = useLanguage();

  const isMac =
    typeof window !== "undefined" &&
    /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (searchInputRef.current) searchInputRef.current.focus();
        if (onOpenSearch) onOpenSearch(localQuery);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [localQuery, onOpenSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onOpenSearch) onOpenSearch(localQuery);
  };

  const handleTagClick = (tag) => {
    setLocalQuery(tag);
    if (onOpenSearch) onOpenSearch(tag);
  };

  return (
    <section className="relative overflow-hidden bg-[#111111] min-h-[calc(100vh-72px)] flex items-center justify-center py-6 sm:py-10 px-4 sm:px-6 lg:px-8 border-b border-[#111111]">
      {/* Background Sacred Vedic Dawn Sanctuary Artwork with Tasteful Cinematic Lighting */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={bannerVedaHero}
          alt="Sacred Vedic Wisdom Sanctuary"
          className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000 opacity-90"
        />
        {/* Rich Atmospheric Overlays for High-Contrast Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.85)_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Master Heading: 2 Clean Rows, Never 3 */}
        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2 sm:mb-3 text-center leading-tight drop-shadow-md">
          {isHindi ? (
            <span className="font-devanagari block">
              सनातन वैदिक ज्ञान परंपरा
              <span className="text-[#FFD21F] block mt-1 sm:mt-2 font-extrabold text-xl sm:text-3xl lg:text-4xl">
                पावन डिजिटल गर्भगृह
              </span>
            </span>
          ) : (
            <span className="font-serif block">
              The Sacred Vedic Canon
              <span className="text-[#FFD21F] block mt-1 sm:mt-2 font-extrabold text-xl sm:text-3xl lg:text-4xl">
                Digital Sanctum
              </span>
            </span>
          )}
        </h1>

        {/* Subtitle - Crisp, concise, scholarly */}
        <p className="text-xs sm:text-sm md:text-base text-[#E5E5E5] font-normal leading-relaxed max-w-xl mx-auto mb-4 sm:mb-6 drop-shadow-xs text-center font-devanagari sm:font-sans">
          {isHindi
            ? "चारों वेद, उपनिषद, दर्शन एवं पावन मंत्रों का प्रामाणिक डिजिटल संग्रह।"
            : "An authentic, searchable digital archive for the Vedas, Upanishads, and sacred scriptures."}
        </p>

        {/* Master Search Engine Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-2xl mx-auto mb-3.5 sm:mb-5 group"
        >
          <div className="relative flex items-center bg-white rounded-full border-2 border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.35)] focus-within:border-[#FFD21F] focus-within:ring-4 focus-within:ring-[#FFD21F]/30 hover:border-[#FFD21F]/70 transition-all duration-300 p-1.5 pl-4 sm:pl-6">
            <Search className="w-5 h-5 text-[#555555] flex-shrink-0 mr-2.5 sm:mr-3 group-focus-within:text-[#111111] transition-colors" />
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
              className="w-full min-w-0 bg-transparent text-[#111111] placeholder:text-[#666666] focus:outline-none text-xs sm:text-sm md:text-base font-semibold pr-2"
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
              className="min-h-[40px] sm:min-h-[44px] px-5 sm:px-8 py-2 rounded-full bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 flex-shrink-0 cursor-pointer active:scale-[0.98]"
            >
              <span>{isHindi ? "खोजें" : "Search"}</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </button>
          </div>
        </form>

        {/* Trending Search Pills - 4 compact, clean pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#E5E5E5] mb-5 sm:mb-6 max-w-2xl mx-auto">
          <span className="font-semibold text-white/90 flex items-center gap-1 mr-1 text-[11px] sm:text-xs">
            <Flame className="w-3.5 h-3.5 text-[#FFD21F]" />
            {isHindi ? "प्रचलित खोज:" : "Trending:"}
          </span>
          {FEATURED_TOPICS.map((tag) => {
            const tagLabel = isHindi ? tag.hi : tag.en;
            const isActive = localQuery === tagLabel;
            return (
              <button
                key={tag.en}
                type="button"
                onClick={() => handleTagClick(tagLabel)}
                className={`min-h-[28px] sm:min-h-[30px] px-2.5 sm:px-3 py-0.5 rounded-full transition-all duration-200 cursor-pointer font-medium text-[11px] sm:text-xs inline-flex items-center ${
                  isActive
                    ? "bg-[#FFD21F] text-[#111111] border border-[#FFD21F] font-bold shadow-xs"
                    : "bg-black/40 text-[#E5E5E5] border border-white/20 hover:bg-[#FFD21F] hover:text-[#111111] hover:border-[#FFD21F] active:scale-[0.97] backdrop-blur-sm"
                }`}
              >
                <span>{tagLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Dual Actions: Primary #FFD21F & Secondary bordered with golden accent */}
        <div className="w-full flex flex-row items-center justify-center gap-2.5 sm:gap-4 max-w-sm sm:max-w-md mx-auto">
          <button
            type="button"
            onClick={onNavigateKnowledge}
            className="flex-1 min-h-[42px] sm:min-h-[46px] px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] group"
          >
            <BookOpen className="w-4 h-4 text-[#111111] shrink-0" />
            <span>{isHindi ? "पुस्तकालय देखें" : "Browse Library"}</span>
            <ArrowRight className="w-4 h-4 shrink-0 hidden sm:inline group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() =>
              onNavigateKnowledge &&
              onNavigateKnowledge("/category/mantra-stotra")
            }
            className="flex-1 min-h-[42px] sm:min-h-[46px] px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/15 border border-[#D9A441] hover:border-[#FFD21F] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] backdrop-blur-md"
          >
            <Volume2 className="w-4 h-4 text-[#FFD21F] shrink-0" />
            <span>{isHindi ? "पावन मंत्र संग्रह" : "Sacred Mantras"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
