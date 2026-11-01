import React, { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";

const FEATURED_TABS_CONFIG = [
  { id: "All", labelHi: "समस्त सामग्री", labelEn: "All Content" },
  { id: "Articles", labelHi: "आलेख", labelEn: "Articles" },
  { id: "Mantra", labelHi: "मंत्र व सूक्त", labelEn: "Mantra & Sukta" },
  { id: "Grantha", labelHi: "शास्त्रीय ग्रंथ", labelEn: "Grantha" },
  { id: "Topics", labelHi: "वैदिक विषय", labelEn: "Topics" },
];

const FEATURED_ITEMS = [
  {
    id: "purusha-sukta",
    type: "Articles",
    badge: "FEATURED ARTICLE",
    title: "पुरुष सूक्त का परिचय",
    desc: "वैदिक संदर्भ और महत्व — ऋग्वेद १०.९० से विराट् पुरुष की अवधारणा, सृष्टि प्रक्रिया एवं यज्ञीय चेतना का विस्तृत विश्लेषण।",
    source: "ऋग्वेद १०.९०",
    cta: "Read Article",
  },
  {
    id: "gayatri-mantra",
    type: "Mantra",
    badge: "VEDIC MANTRA",
    title: "गायत्री महामंत्र",
    desc: "ऋग्वेद ३.६२.१० — विश्वामित्र ऋषि द्वारा द्रष्ट, सवितृ देवता, गायत्री छंद — संपूर्ण सस्वर पदच्छेद, अन्वय व तात्विक अर्थ।",
    source: "ऋग्वेद ३.६२.१०",
    cta: "Explore Mantra",
  },
  {
    id: "bhagavad-gita",
    type: "Grantha",
    badge: "GRANTHA",
    title: "श्रीमद्भगवद्गीता",
    desc: "१८ अध्याय, ७०० श्लोक — कर्मयोग, ज्ञानयोग और भक्तियोग का अमर उपदेश। महाभारत के भीष्मपर्व से उद्धृत सार्वकालिक नीति।",
    source: "महाभारत, भीष्मपर्व",
    cta: "Read Grantha",
  },
  {
    id: "dharma-topic",
    type: "Topics",
    badge: "TOPIC",
    title: "धर्म — अर्थ एवं शास्त्रीय परिभाषा",
    desc: "वेदों, उपनिषदों और स्मृतियों में धर्म की परिभाषा — धारणाद्धर्म इत्याहुर्धर्मो धारयते प्रजाः। सनातन जीवन दर्शन का सारांश।",
    source: "वैदिक जीवन दर्शन",
    cta: "Explore Topic",
  },
  {
    id: "rudra-sukta",
    type: "Articles",
    badge: "FEATURED ARTICLE",
    title: "रुद्राध्याय — शतरुद्रीय",
    desc: "यजुर्वेद के रुद्राध्याय का परिचय — ११ अनुवाक, नमकम् और चमकम् की संरचना, फलश्रुति एवं वैदिक अभिषेक विधि-विधान।",
    source: "कृष्ण यजुर्वेद १६",
    cta: "Read Article",
  },
  {
    id: "upanishad-intro",
    type: "Grantha",
    badge: "GRANTHA",
    title: "प्रमुख उपनिषद संग्रह",
    desc: "ईश, केन, कठ, मुण्डक, माण्डूक्य, तैत्तिरीय — आत्मज्ञान, ब्रह्मविद्या व परम सत्य की प्रत्यक्ष अनुभूति का अमूल्य पथ।",
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
    <section
      id="featured"
      className="py-10 sm:py-14 bg-white border-b border-[#E5E5E5] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#FFD21F]/40 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#111111]">
                {isHindi ? "विशिष्ट ज्ञान" : "FEATURED KNOWLEDGE"}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111]">
              {isHindi ? "प्रमुख ज्ञान सामग्री" : "Featured Knowledge"}
            </h2>
            <p
              className={`text-xs sm:text-sm text-[#555555] mt-1 ${
                isHindi ? "font-devanagari" : ""
              }`}
            >
              {isHindi
                ? "इस समय पुस्तकालय में अनुशंसित और सर्वाधिक अध्ययन किए जा रहे विशिष्ट वैदिक विषय।"
                : "Prominent scriptures, hymns, and treatises currently recommended in the library."}
            </p>
          </div>
        </div>

        {/* Filter Tabs: Shadcn Pill Design */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 no-scrollbar">
          {FEATURED_TABS_CONFIG.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#FFD21F] text-[#111111] font-bold border border-[#FFD21F] shadow-xs"
                    : "bg-white text-[#555555] border border-[#E5E5E5] hover:border-[#FFD21F] hover:bg-[#FFD21F]/15 hover:text-[#111111]"
                }`}
              >
                {isHindi ? tab.labelHi : tab.labelEn}
              </button>
            );
          })}
        </div>

        {/* Cards Grid: Crisp 1px border (#E5E5E5), hover golden border (#D9A441), Refined Badges in #FFD21F */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={onNavigateKnowledge}
              className="group flex flex-col justify-between bg-white rounded-2xl border border-[#E5E5E5] shadow-xs hover:shadow-lg hover:border-[#D9A441] hover:-translate-y-1 transition-all duration-300 p-5 sm:p-6 cursor-pointer"
            >
              <div>
                {/* Refined Card Badge in Brand Yellow #FFD21F with Deep Black #111111 text */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#FFD21F] text-[#111111] border border-[#FFD21F] shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                    <span>{item.badge}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-[#555555] font-devanagari truncate max-w-[50%] text-right">
                    {item.source}
                  </span>
                </div>

                {/* High-Contrast Title */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors leading-snug mb-2 font-devanagari">
                  {item.title}
                </h3>

                {/* High-Contrast Description */}
                <p className="font-devanagari text-xs sm:text-sm text-[#555555] leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>

              {/* Bottom CTA with arrow slide micro-interaction */}
              <div className="mt-5 pt-3.5 border-t border-[#E5E5E5] flex items-center justify-between">
                <span className="text-xs font-bold text-[#111111] group-hover:text-[#D9A441] flex items-center gap-1.5 transition-colors">
                  <span>{item.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </span>
                <span className="text-[10px] font-semibold text-[#555555] uppercase tracking-wider">
                  Read Online
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-[#555555] text-sm font-devanagari">
            इस श्रेणी में शीघ्र ही और सामग्री उपलब्ध होगी।
          </div>
        )}
      </div>
    </section>
  );
}
