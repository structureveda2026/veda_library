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

  return (
    <article className="group bg-white rounded-2xl border border-amber-200/70 hover:border-amber-400/80 shadow-xs hover:shadow-xl hover:shadow-amber-950/5 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Image Container with Elegant Aspect Ratio */}
      <Link
        to={`/library/articles/${blog.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-amber-50"
      >
        <img
          src={imageSrc}
          alt={blog.title || "Veda Library Article"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.src = bannerFireRitualImg;
          }}
        />
        {/* Subtle Vignette Gradient for crisp contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Badge - Serene Warm Saffron */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/95 text-[#78350F] border border-amber-200/80 backdrop-blur-md shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>{blog.category || "Vedic Wisdom"}</span>
          </span>
          {blog.isFeatured && (
            <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xs">
              {isHindi ? "विशेष" : "Featured"}
            </span>
          )}
        </div>

        {/* Estimated Reading Time Pill */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-900/75 text-amber-100 backdrop-blur-md">
            <Clock className="w-3 h-3 text-amber-300" />
            <span>{blog.readTime || (isHindi ? "५ मिनट पठन" : "5 min read")}</span>
          </span>
        </div>
      </Link>

      {/* Card Body with High-Contrast Typography & Comfortable Spacing */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {blog.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#FFFDF9] text-[#78350F] border border-amber-200/60"
                >
                  #{tag.replace(/^#/, "")}
                </span>
              ))}
            </div>
          )}

          {/* Bilingual Title: Deep Slate #1E293B & Warm Saffron */}
          <div>
            <Link
              to={`/library/articles/${blog.slug}`}
              className="group-hover:text-[#78350F] transition-colors"
            >
              <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-snug line-clamp-2">
                {blog.title}
              </h3>
            </Link>
            {blog.titleHi && (
              <p className="font-devanagari text-xs font-semibold text-[#78350F] mt-1 line-clamp-1">
                {blog.titleHi}
              </p>
            )}
          </div>

          {/* Excerpt with comfortable line spacing */}
          <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-2 font-sans">
            {blog.excerpt || blog.excerptHi || "Read the comprehensive Vedic treatise, spiritual commentary and authentic shastric insights."}
          </p>
        </div>

        {/* Card Footer: Author & Meta Info */}
        <div className="pt-3 border-t border-amber-100/90 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            {blog.authorAvatar ? (
              <img
                src={blog.authorAvatar}
                alt={blog.author}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-amber-300"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center text-[#78350F]">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
            <div className="text-[11px]">
              <span className="font-semibold text-slate-800 block leading-tight">
                {blog.author || "Veda Structure Team"}
              </span>
              <span className="text-[10px] text-slate-400">
                {formatDate(blog.publishedAt || blog.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {typeof blog.viewsCount !== "undefined" && (
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>{blog.viewsCount}</span>
              </div>
            )}

            <Link
              to={`/library/articles/${blog.slug}`}
              className="w-7 h-7 rounded-full bg-amber-50 group-hover:bg-amber-700 text-[#78350F] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs"
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
