import React from "react";
import { PRINCIPLES } from "../../data/libraryHomeData.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function PrinciplesSection() {
  const { isHindi } = useLanguage();

  return (
    <section id="principles" className="py-12 sm:py-16 bg-[#fffdf8] border-y border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-200">
            {isHindi ? "शास्त्रीय प्रामाणिकता" : "SCHOLARLY INTEGRITY"}
          </span>
          <h2 className={`font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1.5 ${isHindi ? "font-devanagari" : ""}`}>
            {isHindi ? "ज्ञान प्रस्तुति के सिद्धांत" : "Our Approach to Knowledge"}
          </h2>
          <p className={`text-xs sm:text-sm text-stone-600 mt-1 ${isHindi ? "font-devanagari" : ""}`}>
            {isHindi
              ? "Veda Library ज्ञान को सतही रूप से नहीं, अपितु प्रामाणिक शास्त्रीय आधार पर प्रस्तुत करती है।"
              : "Veda Library presents knowledge not superficially, but grounded firmly in canonical authority."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRINCIPLES.map((prin) => (
            <div
              key={prin.num}
              className="p-4 sm:p-5 rounded-xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all"
            >
              <span className="text-xl font-serif font-bold text-amber-600">
                {prin.num}
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900 mt-1">
                {prin.title}
              </h3>
              <p className="text-xs text-stone-600 font-devanagari mt-1.5 leading-relaxed">
                {prin.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
