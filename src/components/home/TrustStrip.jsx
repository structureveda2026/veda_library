import React from "react";
import { BookOpen, Sparkles, Languages, HeartHandshake, ShieldCheck, Flame } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";

const PILLARS = [
  {
    icon: BookOpen,
    statHi: "४ वेद • १०८ उपनिषद्",
    statEn: "4 Vedas • 108 Upanishads",
    title: "प्रामाणिक मूल पाठ",
    enTitle: "Canonical Scriptures",
    subtitle: "संहिता, ब्राह्मण, आरण्यक एवं आचार्यों के प्रामाणिक भाष्य",
    enSubtitle: "Samhitas, Brahmanas, Aranyakas with classical commentaries",
  },
  {
    icon: Flame,
    statHi: "१०,५५२+ सस्वर मन्त्र",
    statEn: "10,552+ Accented Verses",
    title: "शुद्ध देवनागरी पाठ",
    enTitle: "Pure Devanagari Texts",
    subtitle: "त्रुटिरहित सस्वर वैदिक पाठ, पदच्छेद, ऋषि, छंद व देवता",
    enSubtitle: "Flawless accented Vedic verses, Rishi, Chhanda & Devata",
  },
  {
    icon: Languages,
    statHi: "३ भाषा मानक",
    statEn: "Trilingual Standard",
    title: "त्रिभाषी अन्वय व अर्थ",
    enTitle: "3-Language Standard",
    subtitle: "विशुद्ध हिंदी, English एवं सरल हिंग्लिश में भावार्थ",
    enSubtitle: "Original Sanskrit, Hindi, English and accessible Hinglish",
  },
  {
    icon: ShieldCheck,
    statHi: "१००% निःशुल्क व सुगम",
    statEn: "100% Free & Open Access",
    title: "मुक्त सनातन ज्ञान",
    enTitle: "Open Knowledge Corpus",
    subtitle: "समस्त साधकों, छात्रों एवं शोधार्थियों हेतु सार्वजनिक",
    enSubtitle: "Preserved and accessible to seekers and scholars worldwide",
  },
];

export default function TrustStrip() {
  const { isHindi } = useLanguage();

  return (
    <section className="bg-white border-b border-[#E5E5E5] shadow-xs relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E5E5]">
          {PILLARS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group flex items-start gap-3.5 p-4 sm:p-5 transition-colors duration-200 hover:bg-[#FFD21F]/10"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 shadow-xs border border-[#E5E5E5] bg-white group-hover:border-[#FFD21F]">
                  <Icon className="w-5 h-5 text-[#D9A441]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold text-[#D9A441] uppercase tracking-wider mb-0.5">
                    {isHindi ? item.statHi : item.statEn}
                  </div>
                  <h4 className="text-sm font-bold text-[#111111] leading-snug">
                    {isHindi ? item.title : item.enTitle}
                  </h4>
                  <p className="text-xs text-[#555555] font-normal leading-relaxed mt-0.5 line-clamp-2">
                    {isHindi ? item.subtitle : item.enSubtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
