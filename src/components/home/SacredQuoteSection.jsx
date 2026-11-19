import React, { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import { SACRED_QUOTE } from "../../data/libraryHomeData.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import templeHeroImg from "../../assets/images/library/banners/banner-temple-hero.jpg";

const TRANSLATIONS = {
  hi: {
    key: "hi",
    label: "हिन्दी भावार्थ",
    text:
      SACRED_QUOTE.hindiTranslation ||
      "जहाँ से वाणी मन सहित, उस परब्रह्म को प्राप्त किए बिना लौट आती है (परमसत्य वाणी और बुद्धि की सीमा से परे है)।",
  },
  en: {
    key: "en",
    label: "English Meaning",
    text:
      SACRED_QUOTE.translation ||
      "Where words return, along with the mind, unable to reach the Supreme Consciousness.",
  },
  hinglish: {
    key: "hinglish",
    label: "सरल हिंग्लिश",
    text:
      SACRED_QUOTE.hinglishTranslation ||
      "Jahan se vani man sahit, us Parabrahma ko prapt kiye bina laut aati hai (Param Satya shabdon aur buddhi se pare hai).",
  },
};

export default function SacredQuoteSection() {
  const { isHindi } = useLanguage();
  const [activeTab, setActiveTab] = useState("hi");
  const [copied, setCopied] = useState(false);

  const shloka = SACRED_QUOTE.sanskrit || "यतो वाचो निवर्तन्ते अप्राप्य मनसा सह";
  const source = SACRED_QUOTE.source || "Taittiriya Upanishad (तैत्तिरीयोपनिषद् २.९.१)";

  const handleCopy = () => {
    const activeText = TRANSLATIONS[activeTab]?.text || "";
    const copyContent = `॥ ${shloka} ॥\n\n${TRANSLATIONS[activeTab]?.label}: "${activeText}"\n\n— ${source}\n(via Veda Library • Digital Vedic Wisdom Archive)`;
    navigator.clipboard
      .writeText(copyContent)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  return (
    <section className="py-6 sm:py-8 bg-white border-b border-[#E5E5E5] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bespoke Editorial Quote Card */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#D9A441] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 sm:p-6 md:p-8 text-center transition-all overflow-hidden group">
          
          {/* Subtle Watermark Silhouette */}
          <div className="absolute inset-0 z-0 opacity-[0.035] pointer-events-none mix-blend-multiply">
            <img
              src={templeHeroImg}
              alt="Sacred Architecture Texture"
              className="w-full h-full object-cover object-bottom"
            />
          </div>

          {/* Decorative Golden Corner Accents */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#D9A441]/40 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#D9A441]/40 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#D9A441]/40 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#D9A441]/40 rounded-br-sm pointer-events-none" />

          {/* Golden Watermark Quote Glyphs in Card Background */}
          <div className="absolute -top-4 left-4 text-[96px] sm:text-[130px] font-serif text-[#D9A441]/10 pointer-events-none select-none leading-none">
            “
          </div>
          <div className="absolute -bottom-12 right-4 text-[96px] sm:text-[130px] font-serif text-[#D9A441]/10 pointer-events-none select-none leading-none">
            ”
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Header: Sacred Pill & Copy Button */}
            <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#FFD21F]/50 text-[11px] font-bold uppercase tracking-wider text-[#111111] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>
                  {isHindi
                    ? "दार्शनिक उपनिषद् सूत्र"
                    : "Sacred Upanishadic Insight"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-[#FFD21F] border border-[#E5E5E5] hover:border-[#FFD21F] text-xs font-semibold text-[#111111] transition-all cursor-pointer shadow-xs active:scale-95"
                title="Copy verse and meaning"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span className="text-[#111111] font-bold">
                      {isHindi ? "प्रतिलिपि बन गई!" : "Copied!"}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#555555]" />
                    <span>{isHindi ? "श्लोक कॉपी करें" : "Copy Verse"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Pure Devanagari Sanskrit Verse (Strictly 0% Roman transliteration) */}
            <div className="mt-2 sm:mt-2.5 mb-3 sm:mb-4">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <span className="text-2xl font-serif text-[#D9A441] select-none">❖</span>
                <span className="h-[1px] w-12 bg-gradient-to-r from-[#D9A441]/40 to-transparent" />
              </div>

              <h3 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-[#111111] leading-snug tracking-normal font-devanagari">
                ॥ {shloka} ॥
              </h3>

              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D9A441] to-transparent mx-auto mt-2.5 sm:mt-3" />
            </div>

            {/* Trilingual Segmented Tabs (हिन्दी / English / हिंग्लिश) */}
            <div className="inline-flex items-center p-1 rounded-full bg-white border border-[#E5E5E5] mb-3.5 sm:mb-4 shadow-xs">
              {Object.entries(TRANSLATIONS).map(([key, item]) => {
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#FFD21F] text-[#111111] shadow-xs"
                        : "text-[#555555] hover:text-[#111111] hover:bg-white/60"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Translation Text with High-Contrast Typography */}
            <div className="min-h-[44px] flex items-center justify-center mb-3.5 sm:mb-4">
              <p
                className={`text-base sm:text-lg text-[#111111] font-medium leading-relaxed max-w-xl mx-auto ${
                  activeTab === "en"
                    ? "font-serif italic text-[#111111]"
                    : "font-devanagari"
                }`}
              >
                “{TRANSLATIONS[activeTab]?.text}”
              </p>
            </div>

            {/* Golden Verse Attribution */}
            <div className="pt-3 sm:pt-3.5 border-t border-[#E5E5E5] flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441]" />
              <span className="font-serif font-bold text-[#D9A441] tracking-wide text-xs sm:text-sm">
                तैत्तिरीयोपनिषद् २.९.१ (ब्रह्मानन्दवल्ली)
              </span>
              <span className="text-[#555555]">•</span>
              <span className="text-[#555555] font-semibold">
                Taittiriya Upanishad 2.9.1
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
