import React from "react";
import { BookOpen, Flame, Languages, ShieldCheck } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";

const PILLARS = [
  {
    icon: BookOpen,
    statHi: "४ वेद • १०८ उपनिषद्",
    statEn: "4 Vedas • 108 Upanishads",
    title: "प्रामाणिक मूल पाठ",
    enTitle: "Canonical Scriptures",
  },
  {
    icon: Flame,
    statHi: "१०,५५२+ सस्वर मन्त्र",
    statEn: "10,552+ Accented Verses",
    title: "शुद्ध देवनागरी पाठ",
    enTitle: "Pure Devanagari Texts",
  },
  {
    icon: Languages,
    statHi: "३ भाषा मानक",
    statEn: "Trilingual Standard",
    title: "त्रिभाषी अन्वय व अर्थ",
    enTitle: "3-Language Standard",
  },
  {
    icon: ShieldCheck,
    statHi: "१००% निःशुल्क व सुगम",
    statEn: "100% Free & Open Access",
    title: "मुक्त सनातन ज्ञान",
    enTitle: "Open Knowledge Corpus",
  },
];

export default function TrustStrip() {
  const { isHindi } = useLanguage();

  return (
    <section className="bg-white border-b border-[#E5E5E5] shadow-xs relative z-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y-0 divide-x sm:divide-x divide-[#E5E5E5]">
          {PILLARS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group flex items-center gap-2.5 sm:gap-3.5 p-3 sm:p-5 transition-colors duration-200 hover:bg-[#FFD21F]/10"
              >
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 shadow-xs border border-[#E5E5E5] bg-white group-hover:border-[#FFD21F]">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#D9A441]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] sm:text-[10px] font-bold text-[#D9A441] uppercase tracking-wider mb-0.5 truncate">
                    {isHindi ? item.statHi : item.statEn}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#111111] leading-tight truncate">
                    {isHindi ? item.title : item.enTitle}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
