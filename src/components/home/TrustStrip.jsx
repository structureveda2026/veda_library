import React from "react";
import { BookOpen, Sparkles, Languages, HeartHandshake } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";

const PILLARS = [
  {
    icon: BookOpen,
    title: "प्रामाणिक मूल पाठ",
    enTitle: "Canonical Texts",
    subtitle: "वेद संहिता, उपनिषद एवं आचार्यों का भाष्य",
    enSubtitle: "Authentic scriptures with classical commentary",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    accent: "#EA580C",
  },
  {
    icon: Sparkles,
    title: "शुद्ध देवनागरी पाठ",
    enTitle: "Pure Devanagari",
    subtitle: "त्रुटिरहित सस्वर वैदिक पाठ व छंद",
    enSubtitle: "Flawless accented Vedic verses and meters",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accent: "#059669",
  },
  {
    icon: Languages,
    title: "त्रिभाषी मानक",
    enTitle: "3-Language Standard",
    subtitle: "हिंदी, English एवं सरल हिंग्लिश भावार्थ",
    enSubtitle: "Hindi, English and simple Hinglish translations",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    accent: "#2563EB",
  },
  {
    icon: HeartHandshake,
    title: "100% निःशुल्क व सुगम",
    enTitle: "Open Knowledge",
    subtitle: "समस्त सनातन साधकों व पाठकों हेतु सुलभ",
    enSubtitle: "Accessible to all seekers and scholars worldwide",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    accent: "#7C3AED",
  },
];

export default function TrustStrip() {
  const { isHindi } = useLanguage();

  return (
    <div className="bg-[#FAF6EF]/90 border-b border-amber-200/60 py-6 sm:py-8 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {PILLARS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group flex items-center gap-3.5 p-4 rounded-2xl bg-white/95 border border-amber-200/80 hover:border-amber-400/90 shadow-2xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-xs"
                  style={{ backgroundColor: `${item.accent}14`, color: item.accent }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-[#1E293B] leading-snug group-hover:text-[#78350F] transition-colors">
                    {isHindi ? item.title : item.enTitle}
                  </h4>
                  <p className="text-xs text-stone-600 font-medium leading-tight mt-0.5 truncate">
                    {isHindi ? item.subtitle : item.enSubtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
