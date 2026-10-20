import React, { useState } from "react";
import { Copy, Check, Quote, Sparkles } from "lucide-react";
import { SACRED_QUOTE } from "../../data/libraryHomeData.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import templeHeroImg from "../../assets/images/library/banners/banner-temple-hero.jpg";

const TRANSLATIONS = {
  hi: {
    label: "हिन्दी भावार्थ",
    text:
      SACRED_QUOTE.hindiTranslation ||
      "जहाँ से वाणी मन सहित, उस परब्रह्म को प्राप्त किए बिना लौट आती है (परमसत्य वाणी और बुद्धि की सीमा से परे है)।",
  },
  en: {
    label: "English Meaning",
    text:
      SACRED_QUOTE.translation ||
      "Where words return, along with the mind, unable to reach the Supreme Consciousness.",
  },
  hinglish: {
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
    const copyContent = `“${shloka}”\n\n${TRANSLATIONS[activeTab]?.label}: "${activeText}"\n\n— ${source}\n(via Veda Library)`;
    navigator.clipboard.writeText(copyContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF6EF]/60 border-b border-amber-200/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* White Glass Card */}
        <div className="relative rounded-3xl bg-white/95 backdrop-blur-md border border-amber-200/90 shadow-xl shadow-amber-950/5 ring-1 ring-amber-200/50 p-6 sm:p-10 md:p-12 text-center transition-all overflow-hidden">
          {/* Subtle Temple Architecture Texture (Preserved) */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-multiply">
            <img
              src={templeHeroImg}
              alt="Temple Architecture Silhouette"
              className="w-full h-full object-cover object-bottom"
            />
          </div>

          {/* Subtle spiritual ambient aura watermark */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
            <div className="w-[450px] h-[450px] rounded-full border border-amber-300/20 opacity-30 animate-spin-slow flex items-center justify-center">
              <div className="w-[320px] h-[320px] rounded-full border border-amber-400/20 border-dashed" />
            </div>
            <div className="absolute inset-0 bg-radial from-amber-100/40 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Sacred Tag & Copy Button Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-[11px] font-bold uppercase tracking-wider text-[#78350F]">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>{isHindi ? "दार्शनिक उपनिषद् सूत्र" : "Sacred Upanishadic Insight"}</span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-50 hover:bg-amber-100/70 border border-amber-200 text-xs font-semibold text-[#78350F] transition-all cursor-pointer shadow-2xs hover:scale-105"
                title="Copy shloka and meaning"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">{isHindi ? "प्रतिलिपि बन गई!" : "Copied!"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-700" />
                    <span>{isHindi ? "कॉपी करें" : "Copy"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Sacred Quote Icon */}
            <Quote className="w-9 h-9 text-orange-500/25 mx-auto mb-3" />

            {/* Pure Devanagari Sanskrit Shloka */}
            <h3 className="font-devanagari text-2xl sm:text-3xl md:text-4xl font-bold text-[#78350F] mb-4 tracking-wide leading-relaxed">
              “{shloka}”
            </h3>

            {/* 3-Language Tabs / Toggle */}
            <div className="inline-flex items-center p-1 rounded-full bg-amber-100/60 border border-amber-200/80 mb-5 shadow-2xs">
              {Object.entries(TRANSLATIONS).map(([key, item]) => {
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-white text-[#78350F] shadow-xs"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Translation Text */}
            <div className="min-h-[56px] flex items-center justify-center mb-6">
              <p className={`text-base sm:text-lg text-[#1E293B] font-medium leading-relaxed max-w-xl mx-auto ${
                activeTab === "en" ? "font-serif italic" : "font-devanagari"
              }`}>
                “{TRANSLATIONS[activeTab]?.text}”
              </p>
            </div>

            {/* Canonical Source Reference */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/70 border border-amber-300/70 text-xs font-bold text-[#78350F]">
              <span>{source}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
