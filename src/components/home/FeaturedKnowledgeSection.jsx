import React, { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";

const FEATURED_TABS_CONFIG = [
  { id: "All", labelHi: "समस्त", labelEn: "All" },
  { id: "Articles", labelHi: "आलेख", labelEn: "Articles" },
  { id: "Mantra", labelHi: "मंत्र", labelEn: "Mantra" },
  { id: "Grantha", labelHi: "ग्रंथ", labelEn: "Grantha" },
  { id: "Topics", labelHi: "विषय", labelEn: "Topics" },
];

const FEATURED_ITEMS = [
  {
    id: "purusha-sukta",
    type: "Articles",
    badge: "FEATURED ARTICLE",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    title: "पुरुष सूक्त का परिचय",
    desc: "वैदिक संदर्भ और महत्व — ऋग्वेद १०.९० से विराट् पुरुष की अवधारणा का विस्तृत विश्लेषण।",
    source: "ऋग्वेद १०.९०",
    cta: "Read Article",
  },
  {
    id: "gayatri-mantra",
    type: "Mantra",
    badge: "VEDIC MANTRA",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    title: "गायत्री महामंत्र",
    desc: "ऋग्वेद ३.६२.१० — विश्वामित्र ऋषि द्वारा द्रष्ट, सवितृ देवता, गायत्री छंद — संपूर्ण पदच्छेद व अर्थ।",
    source: "ऋग्वेद ३.६२.१०",
    cta: "Explore Mantra",
  },
  {
    id: "bhagavad-gita",
    type: "Grantha",
    badge: "GRANTHA",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    title: "श्रीमद्भगवद्गीता",
    desc: "१८ अध्याय, ७०० श्लोक — कर्मयोग, ज्ञानयोग और भक्तियोग का अमर उपदेश। महाभारत के भीष्मपर्व से।",
    source: "महाभारत, भीष्मपर्व",
    cta: "Read Grantha",
  },
  {
    id: "dharma-topic",
    type: "Topics",
    badge: "TOPIC",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
    title: "धर्म — अर्थ एवं परिभाषा",
    desc: "वेदों, उपनिषदों और स्मृतियों में धर्म की परिभाषा — सनातन धर्म और वैदिक जीवन दर्शन का सारांश।",
    source: "वैदिक विषय",
    cta: "Explore Topic",
  },
  {
    id: "rudra-sukta",
    type: "Articles",
    badge: "FEATURED ARTICLE",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    title: "रुद्राध्याय — शतरुद्रीय",
    desc: "यजुर्वेद के रुद्राध्याय का परिचय — ११ अनुवाक, नमकम् और चमकम् की संरचना एवं विधि-विधान।",
    source: "कृष्ण यजुर्वेद १६",
    cta: "Read Article",
  },
  {
    id: "upanishad-intro",
    type: "Grantha",
    badge: "GRANTHA",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    title: "प्रमुख उपनिषद",
    desc: "ईश, केन, कठ, मुण्डक, माण्डूक्य — आत्मज्ञान व परम ब्रह्म की प्रत्यक्ष अनुभूति का मार्ग।",
    source: "वेदांत / श्रुति",
    cta: "Explore Upanishads",
  },
];

export default function FeaturedKnowledgeSection({ onNavigateKnowledge }) {
  const [activeTab, setActiveTab] = useState("All");
  const { isHindi } = useLanguage();

  const filteredItems =
    activeTab === "All"
      ? FEATURED_ITEMS
      : FEATURED_ITEMS.filter((item) => item.type === activeTab);

  return (
    <section id="featured" className="py-12 sm:py-16 bg-[#fffdf8] border-b border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800">
                {isHindi ? "विशिष्ट ज्ञान" : "FEATURED KNOWLEDGE"}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {isHindi ? "प्रमुख ज्ञान सामग्री" : "Featured Knowledge"}
            </h2>
            <p className={`text-xs sm:text-sm text-stone-600 mt-0.5 ${isHindi ? "font-devanagari" : ""}`}>
              {isHindi
                ? "इस समय Library में पढ़े और explore किए जा रहे प्रमुख विषय।"
                : "Prominent topics and scriptures currently explored in the library."}
            </p>
          </div>
        </div>

        {/* Filter Tabs: All | Articles | Mantra | Grantha | Topics */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 no-scrollbar">
          {FEATURED_TABS_CONFIG.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-amber-700 text-white border-amber-700 shadow-sm"
                  : "bg-white text-stone-600 border-stone-200 hover:border-amber-300 hover:text-amber-800"
              }`}
            >
              {isHindi ? tab.labelHi : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Cards Grid — 6 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={onNavigateKnowledge}
              className="group flex flex-col bg-white rounded-xl border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all duration-300 p-5 cursor-pointer"
            >
              {/* Type Badge */}
              <span
                className={`inline-flex self-start px-2 py-0.5 rounded text-[10px] font-bold border mb-3 ${item.badgeColor}`}
              >
                {item.badge}
              </span>

              {/* Title */}
              <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-devanagari text-xs text-stone-500 leading-relaxed flex-1 line-clamp-3">
                {item.desc}
              </p>

              {/* Source + CTA */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] text-stone-400 font-medium">{item.source}</span>
                <span className="text-xs font-bold text-amber-700 group-hover:text-amber-900 flex items-center gap-1 transition-colors">
                  {item.cta} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state when tab filter yields no results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-10 text-stone-500 text-sm font-devanagari">
            इस श्रेणी में शीघ्र ही सामग्री उपलब्ध होगी।
          </div>
        )}
      </div>
    </section>
  );
}
