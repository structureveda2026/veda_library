import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Eye,
  ArrowRight,
  BookOpen,
  User,
  Sparkles,
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

export default function BlogCard({ blog }) {
  if (!blog) return null;
  const { isHindi } = useLanguage();

  const formatDate = (dateString) => {
    if (!dateString) return isHindi ? "ज्ञान परंपरा" : "Vedic Tradition";
    try {
      const date = new Date(dateString);
      if (isHindi) {
        return date.toLocaleDateString("hi-IN", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return isHindi ? "ज्ञान परंपरा" : "Vedic Tradition";
    }
  };

  // Image strictly preserved with authentic sacred fallback
  const imageSrc = blog.featuredImage || bannerFireRitualImg;

  // Spiritual category detection for Master Palette (#C62828)
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
    <article className="group bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#D9A441] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-0.5">
      {/* Image Container with Elegant Framing & Clearly Visible Image (0.80 - 0.85 opacity with luminous overlay) */}
      <Link
        to={`/library/articles/${blog.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-stone-100"
      >
        <img
          src={imageSrc}
          alt={displayTitle}
          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.src = bannerFireRitualImg;
          }}
        />
        {/* Subtle luminous overlay preserving artwork clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/10 opacity-70 group-hover:opacity-40 transition-opacity" />

        {/* Category Badge: Yellow #FFD21F with #111111 text, Spiritual category: Red #C62828 */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs ${
              spiritual
                ? "bg-[#C62828] text-white"
                : "bg-[#FFD21F] text-[#111111]"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{categoryLabel}</span>
          </span>
          {blog.isFeatured && (
            <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D9A441] text-[#111111] shadow-xs">
              {isHindi ? "विशेष" : "Featured"}
            </span>
          )}
        </div>

        {/* Estimated Reading Time Pill */}
        <div className="absolute bottom-2.5 right-2.5 z-10">
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/70 text-white backdrop-blur-xs">
            <Clock className="w-3 h-3 text-[#FFD21F]" />
            <span>{blog.readTime || (isHindi ? "५ मिनट पठन" : "5 min read")}</span>
          </span>
        </div>
      </Link>

      {/* Card Body with Pure White Canvas & Compact Typography */}
      <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div className="space-y-2">
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {blog.tags.slice(0, 3).map((tag, idx) => {
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

          {/* Single Clean Title (Zero duplicate title) */}
          <div>
            <Link
              to={`/library/articles/${blog.slug}`}
              className="group-hover:text-[#D9A441] transition-colors"
            >
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#111111] leading-snug line-clamp-2">
                {displayTitle}
              </h3>
            </Link>
          </div>

          {/* Excerpt with comfortable line spacing */}
          <p className="text-xs text-[#555555] leading-relaxed line-clamp-2 font-devanagari">
            {displayExcerpt}
          </p>
        </div>

        {/* Card Footer: Author & Meta Info */}
        <div className="pt-2.5 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#555555]">
          <div className="flex items-center gap-2">
            {blog.authorAvatar ? (
              <img
                src={blog.authorAvatar}
                alt={displayAuthor}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-[#D9A441]"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-stone-100 border border-[#E5E5E5] flex items-center justify-center text-[#111111]">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
            <div className="text-[11px]">
              <span className="font-semibold text-[#111111] block leading-tight">
                {displayAuthor}
              </span>
              <span className="text-[10px] text-[#555555]">
                {formatDate(blog.publishedAt || blog.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {typeof blog.viewsCount !== "undefined" && (
              <div className="flex items-center gap-1 text-[11px] text-[#555555]">
                <Eye className="w-3 h-3 text-[#555555]" />
                <span>{blog.viewsCount}</span>
              </div>
            )}

            <Link
              to={`/library/articles/${blog.slug}`}
              className="w-6 h-6 rounded-full bg-[#FFD21F] hover:bg-[#ffe052] text-[#111111] flex items-center justify-center transition-all duration-300 shadow-2xs border border-[#FFD21F]"
              aria-label="Read Article"
            >
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
