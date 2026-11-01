import React from "react";
import { ArrowRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { RECENTLY_ADDED } from "../../data/libraryHomeData.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

// Card thumbnails
import yagyaFireImg from "../../assets/images/library/cards/card-yagya-fire.jpg";
import pujaImg from "../../assets/images/library/cards/card-puja.jpg";
import rigvedaImg from "../../assets/images/library/cards/card-rigveda.jpg";

const THUMBNAILS = {
  "card-yagya-fire.jpg": yagyaFireImg,
  "card-puja.jpg": pujaImg,
  "card-rigveda.jpg": rigvedaImg,
};

export default function RecentlyAddedSection({ onSelectArticle }) {
  const { isHindi } = useLanguage();

  return (
    <section id="recent" className="py-8 sm:py-10 bg-white border-y border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              {isHindi ? "हाल ही में जोड़े गए" : "Recently Added"}
            </h2>
            <p className={`text-xs sm:text-sm text-[#555555] mt-0.5 ${isHindi ? "font-devanagari" : ""}`}>
              {isHindi
                ? "Veda Library में हाल ही में जोड़े गए ज्ञान-सामग्री को explore करें।"
                : "Explore recently added authentic texts, rituals, and mantras in Veda Library."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectArticle && onSelectArticle("rudrabhisheka")}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#111111] hover:text-[#D9A441] group cursor-pointer transition-colors"
          >
            <span>{isHindi ? "समस्त देखें" : "View All"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Cards Grid — with image, description, Read More CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RECENTLY_ADDED.map((item) => {
            const thumb = THUMBNAILS[item.imageKey] || yagyaFireImg;
            return (
              <div
                key={item.id}
                onClick={() => onSelectArticle && onSelectArticle(item.id)}
                className="group flex flex-col bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#D9A441] shadow-2xs hover:shadow-md transition-all cursor-pointer overflow-hidden"
              >
                {/* Thumbnail Image */}
                <div className="relative h-40 overflow-hidden bg-[#111111] flex-shrink-0">
                  <img
                    src={thumb}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {/* Category badge on image */}
                  <span className="absolute bottom-2 left-3 text-[10px] font-bold text-[#111111] bg-[#FFD21F] px-2.5 py-0.5 rounded shadow-xs">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Status + Time row */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {item.statusType === "verified" && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FFD21F]/15 text-[#111111] border border-[#FFD21F]/40">
                        <CheckCircle2 className="w-3 h-3 text-[#D9A441]" />
                        {item.statusBadge}
                      </span>
                    )}
                    {item.statusType === "approved" && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FFD21F]/15 text-[#111111] border border-[#FFD21F]/40">
                        <CheckCircle2 className="w-3 h-3 text-[#D9A441]" />
                        {item.statusBadge}
                      </span>
                    )}
                    {item.statusType === "review" && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#111111] border border-[#FFD21F]">
                        <AlertCircle className="w-3 h-3 text-[#D9A441]" />
                        {item.statusBadge}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-[10px] text-[#555555] font-medium ml-auto">
                      <Clock className="w-3 h-3" />
                      {item.timeAgo}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-base font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Author & Publication Date — per Document Section 3 item 9 */}
                  <div className="flex items-center gap-2 text-[11px] text-[#555555] mt-1 font-medium">
                    <span>{item.author}</span>
                    <span>•</span>
                    <span>{item.publishedDate}</span>
                  </div>

                  {/* 1-2 Line Description — per document requirement */}
                  <p className="font-devanagari text-xs text-[#555555] mt-1.5 leading-relaxed flex-1 line-clamp-2">
                    {item.desc}
                  </p>

                  {/* Read More CTA — per document requirement */}
                  <div className="mt-3 pt-2.5 border-t border-[#E5E5E5]">
                    <span className="text-xs font-bold text-[#111111] group-hover:text-[#D9A441] flex items-center gap-1 transition-colors">
                      {isHindi ? "अधिक पढ़ें" : "Read More"} <ArrowRight className="w-3 h-3" />
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
