import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { FEATURED_COLLECTIONS } from "../../data/libraryHomeData.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

// Import banner images for collections
import sanctumImg from "../../assets/images/library/banners/banner-sanctum.png";
import sacredDetailsImg from "../../assets/images/library/banners/banner-sacred-details.png";
import fireRitualImg from "../../assets/images/library/banners/banner-fire-ritual.png";
import kashiGhatImg from "../../assets/images/library/banners/banner-kashi-ghat.png";

const COLLECTION_IMAGES = {
  "banner-sanctum.png": sanctumImg,
  "banner-sacred-details.png": sacredDetailsImg,
  "banner-fire-ritual.png": fireRitualImg,
  "banner-kashi-ghat.png": kashiGhatImg
};

export default function FeaturedCollectionsSection({ onNavigateCollections }) {
  const { isHindi } = useLanguage();

  return (
    <section id="featured-collections" className="py-5 sm:py-7 bg-white border-y border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-[0.3rem] sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-2">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">
                {isHindi ? "विशिष्ट संग्रह" : "CURATED ARCHIVES"}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              {isHindi ? "प्रमुख संग्रह" : "Featured Collections"}
            </h2>
            <p className={`text-xs sm:text-sm text-[#555555] mt-0.5 ${isHindi ? "font-devanagari" : ""}`}>
              {isHindi
                ? "पुस्तकालय में सर्वाधिक अध्ययन किए जा रहे विशिष्ट वैदिक संग्रह।"
                : "Most explored and studied curated collections in the library."}
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateCollections}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#D9A441] group self-start sm:self-auto cursor-pointer"
          >
            <span>{isHindi ? "समस्त संग्रह देखें" : "View All Collections"}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Compact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {FEATURED_COLLECTIONS.map((col) => {
            const imgSrc = COLLECTION_IMAGES[col.imageKey] || sanctumImg;
            const title = isHindi ? col.hindiTitle : col.title;
            const count = isHindi ? (col.hindiArticlesCount || col.articlesCount) : col.articlesCount;
            const desc = isHindi ? col.description : (col.enDescription || col.description);

            return (
              <div
                key={col.id}
                onClick={onNavigateCollections}
                className="group flex flex-col bg-white rounded-xl border border-[#E5E5E5] shadow-xs hover:shadow-md hover:border-[#D9A441] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* 16:9 Thumbnail Image */}
                <div className="relative aspect-16/9 overflow-hidden bg-[#111111]">
                  <img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFD21F] text-[#111111] border border-[#FFD21F] shadow-xs">
                    {count}
                  </span>
                </div>

                {/* Content Box */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-serif text-base font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors ${isHindi ? "font-devanagari" : ""}`}>
                      {title}
                    </h3>
                    <p className="text-[11px] text-[#555555] mt-1.5 line-clamp-2 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-2.5 mt-2 border-t border-[#E5E5E5] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111111] group-hover:text-[#D9A441] flex items-center gap-1 transition-colors">
                      {isHindi ? "देखें →" : "Explore →"}
                    </span>
                    <span className="text-[10px] text-[#555555] font-medium">
                      {isHindi ? "प्रामाणिक स्रोत" : "Verified Source"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
