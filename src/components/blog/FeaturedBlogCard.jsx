import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Clock,
  Eye,
  Calendar,
  ArrowRight,
  User,
  BookOpen,
} from "lucide-react";
import bannerFireRitualImg from "../../assets/images/library/banners/banner-fire-ritual.png";
import { useLanguage } from "../../context/LanguageContext.jsx";

const CATEGORY_MAP = {
  "All": "समस्त लेख",
  "Vedic Astrology": "वैदिक ज्योतिष",
  "Mantras & Stotrams": "मंत्र एवं स्तोत्र",
  "Vastu Shastra": "वास्तु शास्त्र",
  "Puja & Rituals": "पूजा एवं अनुष्ठान",
  "Vrat & Katha": "व्रत एवं कथा",
  "Rudraksha & Gemstones": "रुद्राक्ष एवं रत्न",
  "Ayurveda & Health": "आयुर्वेद एवं स्वास्थ्य",
  "Vedic Wisdom": "वैदिक ज्ञान",
};

const TAG_MAP = {
  "Lord Shiva": "भगवान शिव",
  "Rudrabhishek": "रुद्राभिषेक",
  "Krishna Yajurveda": "कृष्ण यजुर्वेद",
  "Mantra Sadhana": "मंत्र साधना",
  "Puja & Rituals": "पूजा एवं अनुष्ठान",
  "Navgrah": "नवग्रह",
  "Vedic Astrology": "वैदिक ज्योतिष",
  "Mantras": "मंत्र साधना",
  "Vastu Tips": "वास्तु शास्त्र",
  "Ayurveda": "आयुर्वेद",
  "Daily Sadhana": "दैनिक साधना",
  "Rigveda": "ऋग्वेद",
  "Gayatri Mantra": "गायत्री मंत्र",
  "Vedic Wisdom": "वैदिक ज्ञान",
};

export default function FeaturedBlogCard({ blog }) {
  if (!blog) return null;
  const { isHindi } = useLanguage();

  const formatDate = (dateString) => {
    if (!dateString) return isHindi ? "विशेष संपादकीय" : "Featured Editorial";
    try {
      const date = new Date(dateString);
      if (isHindi) {
        return date.toLocaleDateString("hi-IN", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      }
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return isHindi ? "विशेष संपादकीय" : "Featured Editorial";
    }
  };

  const imageSrc = blog.featuredImage || bannerFireRitualImg;

  const isSpiritualCategory = (cat = "") => {
    const c = cat.toLowerCase();
    return (
      c.includes("puja") ||
      c.includes("ritual") ||
      c.includes("mantra") ||
      c.includes("stotram") ||
      c.includes("sadhana") ||
      c.includes("shiva") ||
      c.includes("yagya") ||
      c.includes("vrat")
    );
  };

  const spiritual = isSpiritualCategory(blog.category || "");
  const categoryLabel = isHindi
    ? (CATEGORY_MAP[blog.category] || blog.category)
    : (blog.category || "Vedic Wisdom");
  const displayTitle = isHindi ? (blog.titleHi || blog.title) : blog.title;
  const displayExcerpt = isHindi
    ? (blog.excerptHi || blog.excerpt)
    : (blog.excerpt || blog.excerptHi);
  const displayAuthor = isHindi
    ? (blog.authorHi || (blog.author === "Veda Structure Team" ? "वेद स्ट्रक्चर टीम" : blog.author))
    : (blog.author || "Veda Structure Team");

  return (
    <div className="group bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#D9A441] shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
        {/* Left: Content Information (7 cols) - Compact & Balanced */}
        <div className="p-4 sm:p-5 lg:p-6 lg:col-span-7 flex flex-col justify-between space-y-3 bg-white">
          <div className="space-y-2">
            {/* Top Pill / Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[#111111] text-[11px] font-bold shadow-xs">
                <Sparkles className="w-3 h-3" />
                <span>{isHindi ? "विशेष संपादकीय लेख" : "Featured Insight"}</span>
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-xs ${
                  spiritual
                    ? "bg-[#C62828] text-white"
                    : "bg-stone-100 text-[#111111] border border-[#E5E5E5]"
                }`}
              >
                {categoryLabel}
              </span>
            </div>

            {/* Single Clean Title (No duplicate second title) */}
            <div>
              <Link
                to={`/library/articles/${blog.slug}`}
                className="group-hover:text-[#D9A441] transition-colors"
              >
                <h2 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-[#111111] leading-snug">
                  {displayTitle}
                </h2>
              </Link>
            </div>

            {/* Subtitle / Excerpt with clean compact line height */}
            <p className="text-[#555555] text-xs sm:text-sm leading-relaxed line-clamp-2 font-devanagari">
              {displayExcerpt}
            </p>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {blog.tags.slice(0, 4).map((tag, idx) => {
                  const cleanTag = tag.replace(/^#/, "");
                  const tagDisplay = isHindi ? (TAG_MAP[cleanTag] || cleanTag) : cleanTag;
                  return (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-50 text-[#555555] border border-[#E5E5E5]"
                    >
                      #{tagDisplay}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Row: Author + Read Button */}
          <div className="pt-2.5 border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              {blog.authorAvatar ? (
                <img
                  src={blog.authorAvatar}
                  alt={displayAuthor}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-[#D9A441]"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-stone-100 border border-[#E5E5E5] flex items-center justify-center text-[#111111]">
                  <User className="w-4 h-4" />
                </div>
              )}
              <div className="text-xs">
                <span className="font-bold text-[#111111] block">
                  {displayAuthor}
                </span>
                <div className="flex items-center gap-1.5 text-[#555555] text-[11px] mt-0.5">
                  <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#111111] font-semibold">
                    <Clock className="w-3 h-3 text-[#D9A441]" />
                    {blog.readTime || (isHindi ? "७ मिनट पठन" : "7 min read")}
                  </span>
                  {typeof blog.viewsCount !== "undefined" && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {blog.viewsCount} {isHindi ? "बार देखा गया" : "views"}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Link
              to={`/library/articles/${blog.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFD21F] hover:bg-[#ffe052] text-[#111111] font-bold text-xs shadow-xs transition-all cursor-pointer border border-[#FFD21F]"
            >
              <span>{isHindi ? "संपूर्ण लेख पढ़ें" : "Read Full Article"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right: Featured Thumbnail - Compact & Elegant (5 cols) */}
        <div className="p-3 sm:p-4 lg:col-span-5 relative h-full flex items-center">
          <Link
            to={`/library/articles/${blog.slug}`}
            className="block w-full relative rounded-xl overflow-hidden aspect-[16/10] border border-[#E5E5E5] group-hover:border-[#D9A441] transition-colors shadow-2xs bg-stone-100"
          >
            <img
              src={imageSrc}
              alt={displayTitle}
              className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-103 transition-all duration-500"
              onError={(e) => {
                e.currentTarget.src = bannerFireRitualImg;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white font-devanagari font-semibold bg-black/65 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/20">
              <span>{isHindi ? "प्रामाणिक वैदिक शोध संग्रह" : "Authentic Vedic Research Archive"}</span>
              <span className="text-[#FFD21F] font-bold">✦</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
