import React, { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
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
  "card-vastu.jpg": vastuImg,
};

export default function GranthaArchiveSection({ onNavigateCollections }) {
  const [showAll, setShowAll] = useState(false);
  const { isHindi } = useLanguage();

  // Show 4 cards by default, or all 8 cards when "View All" is toggled
  const displayedGranthas = showAll ? GRANTHA_ARCHIVE : GRANTHA_ARCHIVE.slice(0, 4);

  return (
    <section
      id="granthas"
      className="py-6 sm:py-8 bg-white border-b border-[#E5E5E5] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#FFD21F]/40 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#111111]">
                {isHindi ? "शास्त्रीय ग्रंथ संग्रह" : "CLASSICAL CORPUS"}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111]">
              {isHindi ? "ग्रंथ संग्रह का अन्वेषण करें" : "Explore Grantha Archive"}
            </h2>
            <p
              className={`text-xs sm:text-sm text-[#555555] mt-1 ${
                isHindi ? "font-devanagari" : ""
              }`}
            >
              {isHindi
                ? "प्रमुख भारतीय ग्रंथों को उनके विषय, अध्याय, प्रामाणिक भाष्य और संदर्भ के साथ खोजें।"
                : "Explore canonical Indian scriptures by subject, chapter, and traditional context."}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Toggle View All (8 Granthas) / Show Less (4 Granthas) */}
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-4 py-2 rounded-full bg-white hover:bg-[#FFD21F] text-[#111111] border border-[#E5E5E5] hover:border-[#FFD21F] transition-all cursor-pointer shadow-xs active:scale-95"
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
                <ChevronUp className="w-4 h-4 text-[#111111]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#111111]" />
              )}
            </button>

            {/* Direct Link to Collections / Grantha Archive */}
            <button
              type="button"
              onClick={onNavigateCollections}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#111111] hover:text-[#D9A441] px-2 py-1 transition-colors cursor-pointer group"
            >
              <span>{isHindi ? "समस्त ग्रंथ सूची" : "View Archive"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Dynamic Cards Grid: Crisp 1px border (#E5E5E5), hover golden border (#D9A441), Refined Badges in #FFD21F */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayedGranthas.map((grantha, idx) => {
            const imgSrc = GRANTHA_IMAGES[grantha.imageKey] || gitaImg;
            const title = isHindi ? grantha.name : grantha.enName;
            const categoryText = isHindi ? grantha.category : (grantha.enCategory || grantha.category);
            const authorText = isHindi ? grantha.author : (grantha.enAuthor || grantha.author);
            const summaryText = isHindi ? grantha.summary : (grantha.enSummary || grantha.summary);

            return (
              <div
                key={idx}
                onClick={onNavigateCollections}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-[#E5E5E5] shadow-xs hover:shadow-lg hover:border-[#D9A441] hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div>
                  {/* 16:9 Thumbnail Image with Dark Vignette */}
                  <div className="relative aspect-16/9 overflow-hidden bg-[#111111]">
                    <img
                      src={imgSrc}
                      alt={grantha.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Refined Category Badge in Brand Yellow #FFD21F with Deep Black #111111 text */}
                    <span className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FFD21F] text-[#111111] border border-[#FFD21F] shadow-xs ${isHindi ? "font-devanagari" : ""}`}>
                      {categoryText}
                    </span>
                  </div>

                  {/* Card Content with High-Contrast Typography */}
                  <div className="p-4 sm:p-5">
                    <h3
                      className={`font-serif text-lg font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors leading-tight ${
                        isHindi ? "font-devanagari" : ""
                      }`}
                    >
                      {title}
                    </h3>
                    <p className={`text-[11px] text-[#555555] mt-1.5 ${isHindi ? "font-devanagari" : ""}`}>
                      {isHindi ? "रचयिता / परम्परा:" : "Author / Tradition:"}{" "}
                      <strong className="text-[#111111] font-bold">
                        {authorText}
                      </strong>
                    </p>
                    <p className={`text-xs text-[#555555] mt-2 line-clamp-2 leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>
                      {summaryText}
                    </p>
                  </div>
                </div>

                {/* Bottom CTA Bar with arrow slide micro-interaction */}
                <div className="p-4 sm:p-5 pt-0">
                  <div className="pt-3 border-t border-[#E5E5E5] text-xs font-bold text-[#111111] group-hover:text-[#D9A441] flex items-center justify-between transition-colors">
                    <span>{isHindi ? "ग्रंथ का अध्ययन करें" : "Read Scripture"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Helper Strip when expanded */}
        {showAll && (
          <div className="mt-6 p-4 rounded-2xl bg-white border border-[#FFD21F]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-[#555555] font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D9A441] shrink-0" />
              <span>
                {isHindi
                  ? "प्रस्थानत्रयी, आदिकाव्य, इतिहास, उपनिषद, पुराण, दर्शन एवं आयुर्वेद के अमर प्रामाणिक ग्रंथ संग्रह।"
                  : "Preserving the canonical Prasthanatrayi, Epics, Upanishads, Puranas, and Darshanas."}
              </span>
            </span>
            <button
              type="button"
              onClick={onNavigateCollections}
              className="text-[#111111] hover:text-[#D9A441] font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>{isHindi ? "समस्त ग्रंथ आर्काइव में खोजें" : "Explore Archive"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
