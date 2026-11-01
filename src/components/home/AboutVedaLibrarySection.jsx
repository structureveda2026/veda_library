import React from "react";
import { ArrowRight, Sparkles, BookOpen, Layers, Compass } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";

const HIGHLIGHTS = [
  {
    icon: BookOpen,
    title: "प्रामाणिक ग्रंथ व दर्शन",
    enTitle: "Authentic Canon & Darshana",
    desc: "वेद, उपनिषद, षड्दर्शन एवं पुराणों का त्रुटिरहित शुद्ध देवनागरी पाठ व प्रामाणिक भाष्य।",
    enDesc: "Pure Devanagari recensions, classical commentaries and philosophical systems.",
    accent: "#D9A441",
  },
  {
    icon: Layers,
    title: "त्रिभाषी व सुगम संरचना",
    enTitle: "Structured Trilingual Access",
    desc: "प्रत्येक मंत्र व सूत्र का सस्वर पदपाठ, संस्कृत अन्वय, हिंदी भावार्थ एवं English अर्थ।",
    enDesc: "Padapatha, Sanskrit syntax, Hindi purport and English translations for every text.",
    accent: "#D9A441",
  },
  {
    icon: Compass,
    title: "साधना व शास्त्रीय अनुसंधान",
    enTitle: "Sadhana & Vedic Research",
    desc: "मंत्र-स्तोत्र, नित्य पूजा, ज्योतिष, वास्तु एवं शोधार्थियों के लिए संदर्भ ग्रंथसूची।",
    enDesc: "Daily mantras, stotras, rituals, Jyotisha, Vastu, and scholar bibliographies.",
    accent: "#D9A441",
  },
];

export default function AboutVedaLibrarySection({ onNavigateKnowledge }) {
  const { isHindi } = useLanguage();

  return (
    <section id="about" className="py-8 sm:py-10 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E5E5E5] text-[11px] font-bold uppercase tracking-widest text-[#555555] mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
            <span className="text-[#111111]">VEDA LIBRARY</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] leading-tight mb-3">
            {isHindi ? "एक स्थान पर भारतीय ज्ञान परंपरा" : "Indian Knowledge Tradition at One Place"}
          </h2>
          <p className={`text-sm sm:text-base text-[#555555] max-w-2xl mx-auto font-medium leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>
            {isHindi
              ? "भारतीय वैदिक एवं शास्त्रीय ज्ञान को व्यवस्थित रूप से संग्रहित, संरक्षित और समझने हेतु निर्मित एक डिजिटल संदर्भ संग्रह।"
              : "A structured digital archive dedicated to systematically preserving, clarifying, and illuminating India's eternal intellectual heritage."}
          </p>
        </div>

        {/* Crisp Modern Feature Cards with Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl p-6 border border-[#E5E5E5] shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-[#D9A441] transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105 shadow-xs border border-[#E5E5E5] bg-white"
                >
                  <Icon className="w-6 h-6 text-[#D9A441]" />
                </div>
                <h3 className="text-base font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors mb-2">
                  {isHindi ? item.title : item.enTitle}
                </h3>
                <p className={`text-xs sm:text-sm text-[#555555] leading-relaxed font-normal ${isHindi ? "font-devanagari" : ""}`}>
                  {isHindi ? item.desc : item.enDesc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Narrative & Navigation Callout */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className={`text-xs sm:text-sm text-[#555555] leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>
            {isHindi
              ? "चारों वेद, उपनिषद, पुराण, दर्शन, मंत्र, स्तोत्र, ज्योतिष, वास्तु, संस्कार एवं तीर्थ—समस्त शास्त्रीय विषयों का संदर्भ सहित व्यवस्थित अनुशीलन।"
              : "From the Rigveda to classical Upanishads, Puranas, Mantras, Stotras, Jyotisha and Vastu—explore sacred traditions with canonical clarity."}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={onNavigateKnowledge}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-bold text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <span>{isHindi ? "ज्ञान अन्वेषण करें" : "Explore Knowledge Archive"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
