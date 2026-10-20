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

export default function FeaturedBlogCard({ blog }) {
  if (!blog) return null;
  const { isHindi } = useLanguage();

  const formatDate = (dateString) => {
    if (!dateString) return "विशेष संपादकीय";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "विशेष संपादकीय";
    }
  };

  // Image strictly preserved with authentic sacred fallback
  const imageSrc = blog.featuredImage || bannerFireRitualImg;

  return (
    <div className="group bg-white rounded-3xl border border-amber-200/80 hover:border-amber-400 shadow-xs hover:shadow-xl hover:shadow-amber-950/5 transition-all duration-300 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left: Content Information (7 cols) */}
        <div className="p-6 sm:p-8 lg:p-10 lg:col-span-7 flex flex-col justify-between space-y-5">
          <div className="space-y-3.5">
            {/* Top Pill / Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isHindi ? "विशेष संपादकीय लेख" : "Featured Insight"}</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-[#78350F] text-xs font-bold">
                {blog.category || "Vedic Wisdom"}
              </span>
            </div>

            {/* Main Article Title - Deep Slate #1E293B & Warm Saffron */}
            <div>
              <Link
                to={`/library/articles/${blog.slug}`}
                className="group-hover:text-[#78350F] transition-colors"
              >
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                  {blog.title}
                </h2>
              </Link>
              {blog.titleHi && (
                <p className="font-devanagari text-base sm:text-lg font-bold text-[#78350F] mt-2">
                  {blog.titleHi}
                </p>
              )}
            </div>

            {/* Subtitle / Excerpt with comfortable line spacing */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 font-sans">
              {blog.excerpt || blog.excerptHi || "Read the comprehensive scholarly treatise and sacred commentary from the traditional corpus."}
            </p>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {blog.tags.slice(0, 4).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#FFFDF9] text-[#78350F] border border-amber-200/70"
                  >
                    #{tag.replace(/^#/, "")}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Row: Author + Read Button */}
          <div className="pt-4 border-t border-amber-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {blog.authorAvatar ? (
                <img
                  src={blog.authorAvatar}
                  alt={blog.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-300"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center text-[#78350F]">
                  <User className="w-5 h-5" />
                </div>
              )}
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">
                  {blog.author || "Veda Structure Team"}
                </span>
                <div className="flex items-center gap-2 text-slate-400 text-[11px] mt-0.5">
                  <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#78350F] font-semibold">
                    <Clock className="w-3 h-3 text-amber-600" />
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>{isHindi ? "संपूर्ण लेख पढ़ें" : "Read Full Article"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right: Featured Thumbnail Strictly Preserved (5 cols) */}
        <div className="p-4 sm:p-6 lg:p-8 lg:col-span-5 relative h-full flex items-center">
          <Link
            to={`/library/articles/${blog.slug}`}
            className="block w-full relative rounded-2xl overflow-hidden aspect-[4/3] border border-amber-200/90 group-hover:border-amber-400 transition-colors shadow-md"
          >
            <img
              src={imageSrc}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.src = bannerFireRitualImg;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-amber-100 font-devanagari font-semibold bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-300/30">
              <span>{isHindi ? "प्रामाणिक वैदिक शोध संग्रह" : "Authentic Vedic Research Archive"}</span>
              <span className="text-amber-400 font-bold">✦</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
