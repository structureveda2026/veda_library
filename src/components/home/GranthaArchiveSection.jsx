import React, { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, BookOpen, Sparkles } from "lucide-react";
import { GRANTHA_ARCHIVE } from "../../data/libraryHomeData.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

// Card images
import gitaImg from "../../assets/images/library/cards/card-gita.jpg";
import ramayanaImg from "../../assets/images/library/cards/card-ramayana.jpg";
import mahabharataImg from "../../assets/images/library/cards/card-mahabharata.jpg";
import upanishadImg from "../../assets/images/library/cards/card-upanishad.jpg";
import puranaImg from "../../assets/images/library/cards/card-purana.jpg";
import astrologyImg from "../../assets/images/library/cards/card-astrology.jpg";
import samskaraImg from "../../assets/images/library/cards/card-samskara.jpg";
import vastuImg from "../../assets/images/library/cards/card-vastu.jpg";

const GRANTHA_IMAGES = {
  "card-gita.jpg": gitaImg,
  "card-ramayana.jpg": ramayanaImg,
  "card-mahabharata.jpg": mahabharataImg,
  "card-upanishad.jpg": upanishadImg,
  "card-purana.jpg": puranaImg,
  "card-astrology.jpg": astrologyImg,
  "card-samskara.jpg": samskaraImg,
  "card-vastu.jpg": vastuImg
};

export default function GranthaArchiveSection({ onNavigateCollections }) {
  const [showAll, setShowAll] = useState(false);
  const { isHindi } = useLanguage();

  // Show only 4 cards by default, or all 8 cards when "View All" is clicked
  const displayedGranthas = showAll ? GRANTHA_ARCHIVE : GRANTHA_ARCHIVE.slice(0, 4);

  return (
    <section id="granthas" className="py-12 sm:py-16 bg-[#fffdf8] border-y border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800">
                {isHindi ? "शास्त्रीय ग्रंथ संग्रह" : "CLASSICAL CORPUS"}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {isHindi ? "ग्रंथ संग्रह का अन्वेषण करें" : "Explore Grantha"}
            </h2>
            <p className={`text-xs sm:text-sm text-stone-600 mt-0.5 ${isHindi ? "font-devanagari" : ""}`}>
              {isHindi
                ? "प्रमुख भारतीय ग्रंथों को उनके विषय, अध्याय और संदर्भ के साथ explore करें।"
                : "Explore principal Indian scriptures by subject, chapter, and canonical context."}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Toggle View All (8 Granthas) / Show Less (4 Granthas) */}
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full bg-amber-100/70 hover:bg-amber-200/80 text-amber-950 border border-amber-300/70 transition-all cursor-pointer shadow-2xs"
            >
              <span>
                {showAll
                  ? isHindi
                    ? "संक्षिप्त करें (४ ग्रंथ)"
                    : "Show Less (4 Texts)"
                  : isHindi
                  ? "समस्त ८ ग्रंथ देखें"
                  : "View All (8 Texts)"}
              </span>
              {showAll ? (
                <ChevronUp className="w-3.5 h-3.5 text-amber-900" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-amber-900" />
              )}
            </button>

            {/* Direct Link to Collections / Grantha Archive */}
            <button
              type="button"
              onClick={onNavigateCollections}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-amber-800 hover:text-amber-950 px-2 py-1 transition-colors cursor-pointer group"
            >
              <span>{isHindi ? "समस्त ग्रंथ सूची" : "View Grantha Archive"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Dynamic Compact Cards Grid (4 by default, 8 when View All clicked) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fadeIn">
          {displayedGranthas.map((grantha, idx) => {
            const imgSrc = GRANTHA_IMAGES[grantha.imageKey] || gitaImg;
            const title = isHindi ? grantha.name : grantha.enName;
            const subtitleTag = isHindi ? grantha.enName : grantha.name;

            return (
              <div
                key={idx}
                onClick={onNavigateCollections}
                className="group flex flex-col bg-white rounded-xl border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* 16:9 Thumbnail Image */}
                <div className="relative aspect-16/9 overflow-hidden bg-stone-900">
                  <img
                    src={imgSrc}
                    alt={grantha.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-white/90 text-stone-800 backdrop-blur-xs shadow-2xs">
                    {grantha.category}
                  </span>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-serif text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors ${isHindi ? "font-devanagari" : ""}`}>
                      {title}
                    </h3>
                    <p className="text-[11px] text-amber-800 font-medium">
                      {subtitleTag}
                    </p>
                    <p className="text-[10px] text-stone-400 mt-0.5">
                      {isHindi ? "रचयिता:" : "Author:"} <strong className="text-stone-600">{grantha.author}</strong>
                    </p>
                    <p className="text-[11px] text-stone-500 font-devanagari mt-1.5 line-clamp-2 leading-relaxed">
                      {grantha.summary}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-100 text-xs font-semibold text-amber-700 group-hover:text-amber-900 flex items-center justify-between transition-colors">
                    <span>{isHindi ? "ग्रंथ पढ़ें" : "Read Scripture"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional Helper Strip when expanded */}
        {showAll && (
          <div className="mt-5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="text-stone-700 font-medium flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>
                {isHindi
                  ? "प्रस्थानत्रयी, आदिकाव्य, इतिहास, उपनिषद, पुराण, दर्शन एवं आयुर्वेद के अमर ग्रंथ संग्रह।"
                  : "Principal scriptures of Prasthanatrayi, Epics, Upanishads, Puranas, and Classical Darshanas."}
              </span>
            </span>
            <button
              type="button"
              onClick={onNavigateCollections}
              className="font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
            >
              <span>{isHindi ? "संपूर्ण ग्रंथ संग्रह देखें" : "Explore Complete Corpus"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
