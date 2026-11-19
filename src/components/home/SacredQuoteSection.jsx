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
};

export default function SacredQuoteSection() {
  const { isHindi } = useLanguage();
  const currentLang = isHindi ? "hi" : "en";
  const [activeTab, setActiveTab] = useState(currentLang);
  const [copied, setCopied] = useState(false);

  // Sync activeTab with global language changes unless manually overridden
  React.useEffect(() => {
    setActiveTab(isHindi ? "hi" : "en");
  }, [isHindi]);

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
    <section className="py-2.5 sm:py-3.5 bg-white border-b border-[#E5E5E5] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        {/* Compact Bespoke Sacred Quote Banner */}
        <div className="relative rounded-xl sm:rounded-2xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#D9A441] shadow-2xs py-2.5 sm:py-3.5 px-3.5 sm:px-6 text-center transition-all overflow-hidden group">
          {/* Subtle Watermark Silhouette */}
          <div className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none mix-blend-multiply">
            <img
              src={templeHeroImg}
              alt="Sacred Architecture Texture"
              className="w-full h-full object-cover object-bottom"
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Top Bar: Left Insight Badge, Right Lang Toggle & Copy Button */}
            <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#FFD21F]/60 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#111111] shadow-2xs">
                <Sparkles className="w-3 h-3 text-[#D9A441]" />
                <span>
                  {isHindi
                    ? "दार्शनिक उपनिषद् सूत्र"
                    : "Sacred Upanishadic Insight"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Language Pill Switcher */}
                <div className="inline-flex items-center p-0.5 rounded-full bg-stone-50 border border-[#E5E5E5] shadow-2xs">
                  {Object.entries(TRANSLATIONS).map(([key, item]) => {
                    const isActive = activeTab === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveTab(key)}
                        className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-all duration-150 cursor-pointer ${
                          isActive
                            ? "bg-[#FFD21F] text-[#111111] shadow-2xs"
                            : "text-[#555555] hover:text-[#111111]"
                        }`}
                      >
                        {key === "hi" ? "हिन्दी" : "English"}
                      </button>
                    );
                  })}
                </div>

                {/* Copy Verse Button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full bg-white hover:bg-[#FFD21F] border border-[#E5E5E5] hover:border-[#FFD21F] text-[10px] sm:text-[11px] font-semibold text-[#111111] transition-all cursor-pointer shadow-2xs active:scale-95"
                  title="Copy verse and meaning"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#D9A441]" />
                      <span className="text-[#111111] font-bold">
                        {isHindi ? "कॉपी हुआ!" : "Copied!"}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#555555]" />
                      <span>{isHindi ? "कॉपी" : "Copy"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sacred Sanskrit Verse */}
            <h3 className="font-serif text-base sm:text-xl font-bold text-[#111111] leading-tight tracking-normal font-devanagari my-1 sm:my-1.5">
              ॥ {shloka} ॥
            </h3>

            {/* Translation Meaning */}
            <p
              className={`text-xs sm:text-sm text-[#444444] font-medium leading-relaxed max-w-2xl mx-auto mb-1 ${
                activeTab === "en"
                  ? "font-serif italic"
                  : "font-devanagari"
              }`}
            >
              “{TRANSLATIONS[activeTab]?.text}”
            </p>

            {/* Compact Attribution Line */}
            <div className="pt-1 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-[#D9A441] font-bold">
              <span className="w-1 h-1 rounded-full bg-[#D9A441]" />
              <span className="tracking-wide">
                {isHindi
                  ? "तैत्तिरीयोपनिषद् २.९.१ (ब्रह्मानन्दवल्ली)"
                  : "Taittiriya Upanishad 2.9.1 (Brahmanandavalli)"}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#D9A441]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
