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

export default function BlogCard({ blog }) {
  if (!blog) return null;
  const { isHindi } = useLanguage();

  const formatDate = (dateString) => {
    if (!dateString) return "ज्ञान परंपरा";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "ज्ञान परंपरा";
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

  return (
    <article className="group bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#D9A441] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Image Container with Elegant Framing & Clearly Visible Image (0.80 - 0.85 opacity with luminous overlay) */}
      <Link
        to={`/library/articles/${blog.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-stone-100"
      >
        <img
          src={imageSrc}
          alt={blog.title || "Veda Library Article"}
          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.src = bannerFireRitualImg;
          }}
        />
        {/* Subtle luminous overlay preserving artwork clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/10 opacity-70 group-hover:opacity-40 transition-opacity" />

        {/* Category Badge: Yellow #FFD21F with #111111 text, Spiritual category: Red #C62828 */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-wrap gap-1.5">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs ${
              spiritual
                ? "bg-[#C62828] text-white"
                : "bg-[#FFD21F] text-[#111111]"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{blog.category || "Vedic Wisdom"}</span>
          </span>
          {blog.isFeatured && (
            <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D9A441] text-[#111111] shadow-xs">
              {isHindi ? "विशेष" : "Featured"}
            </span>
          )}
        </div>

        {/* Estimated Reading Time Pill */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-black/70 text-white backdrop-blur-md">
            <Clock className="w-3 h-3 text-[#FFD21F]" />
            <span>{blog.readTime || (isHindi ? "५ मिनट पठन" : "5 min read")}</span>
          </span>
        </div>
      </Link>

      {/* Card Body with Pure White Canvas & Section 28 Typography */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
        <div className="space-y-2.5">
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {blog.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-50 text-[#555555] border border-[#E5E5E5] hover:border-[#D9A441] transition-colors"
                >
                  #{tag.replace(/^#/, "")}
                </span>
              ))}
            </div>
          )}

          {/* Bilingual Title: Black #111111 & Golden Yellow #D9A441 */}
          <div>
            <Link
              to={`/library/articles/${blog.slug}`}
              className="group-hover:text-[#D9A441] transition-colors"
            >
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#111111] leading-snug line-clamp-2">
                {blog.title}
              </h3>
            </Link>
            {blog.titleHi && (
              <p className="font-devanagari text-xs font-semibold text-[#D9A441] mt-1 line-clamp-1">
                {blog.titleHi}
              </p>
            )}
          </div>

          {/* Excerpt with comfortable line spacing (leading 1.75) */}
          <p className="text-xs sm:text-[13px] text-[#111111]/80 leading-[1.75] line-clamp-2 font-sans">
            {blog.excerpt || blog.excerptHi || "Read the comprehensive Vedic treatise, spiritual commentary and authentic shastric insights."}
          </p>
        </div>

        {/* Card Footer: Author & Meta Info (Secondary text #555555) */}
        <div className="pt-3 border-t border-[#E5E5E5] flex items-center justify-between text-xs text-[#555555]">
          <div className="flex items-center gap-2">
            {blog.authorAvatar ? (
              <img
                src={blog.authorAvatar}
                alt={blog.author}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-[#D9A441]"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-stone-100 border border-[#E5E5E5] flex items-center justify-center text-[#111111]">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
            <div className="text-[11px]">
              <span className="font-semibold text-[#111111] block leading-tight">
                {blog.author || "Veda Structure Team"}
              </span>
              <span className="text-[10px] text-[#555555]">
                {formatDate(blog.publishedAt || blog.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {typeof blog.viewsCount !== "undefined" && (
              <div className="flex items-center gap-1 text-[11px] text-[#555555]">
                <Eye className="w-3.5 h-3.5 text-[#555555]" />
                <span>{blog.viewsCount}</span>
              </div>
            )}

            <Link
              to={`/library/articles/${blog.slug}`}
              className="w-7 h-7 rounded-full bg-[#FFD21F] hover:bg-[#FFD21F]/90 text-[#111111] flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:scale-105 border border-[#E5E5E5] hover:border-[#D9A441]"
              aria-label="Read Article"
            >
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
