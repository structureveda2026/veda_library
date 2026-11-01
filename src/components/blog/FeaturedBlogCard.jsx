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
    <div className="group bg-white rounded-3xl border border-[#E5E5E5] hover:border-[#D9A441] shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left: Content Information (7 cols) */}
        <div className="p-6 sm:p-8 lg:p-10 lg:col-span-7 flex flex-col justify-between space-y-5 bg-white">
          <div className="space-y-3.5">
            {/* Top Pill / Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D9A441] text-[#111111] text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isHindi ? "विशेष संपादकीय लेख" : "Featured Insight"}</span>
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold shadow-xs ${
                  spiritual
                    ? "bg-[#C62828] text-white"
                    : "bg-[#FFD21F] text-[#111111]"
                }`}
              >
                {blog.category || "Vedic Wisdom"}
              </span>
            </div>

            {/* Main Article Title - Black #111111 & Golden Yellow #D9A441 */}
            <div>
              <Link
                to={`/library/articles/${blog.slug}`}
                className="group-hover:text-[#D9A441] transition-colors"
              >
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111] leading-tight">
                  {blog.title}
                </h2>
              </Link>
              {blog.titleHi && (
                <p className="font-devanagari text-base sm:text-lg font-bold text-[#D9A441] mt-2">
                  {blog.titleHi}
                </p>
              )}
            </div>

            {/* Subtitle / Excerpt with comfortable line spacing (leading 1.75) */}
            <p className="text-[#111111]/80 text-sm sm:text-base leading-[1.75] line-clamp-3 font-sans">
              {blog.excerpt || blog.excerptHi || "Read the comprehensive scholarly treatise and sacred commentary from the traditional corpus."}
            </p>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {blog.tags.slice(0, 4).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-stone-50 text-[#555555] border border-[#E5E5E5] hover:border-[#D9A441] transition-colors"
                  >
                    #{tag.replace(/^#/, "")}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Row: Author + Read Button */}
          <div className="pt-4 border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {blog.authorAvatar ? (
                <img
                  src={blog.authorAvatar}
                  alt={blog.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#D9A441]"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-stone-100 border border-[#E5E5E5] flex items-center justify-center text-[#111111]">
                  <User className="w-5 h-5" />
                </div>
              )}
              <div className="text-xs">
                <span className="font-bold text-[#111111] block">
                  {blog.author || "Veda Structure Team"}
                </span>
                <div className="flex items-center gap-2 text-[#555555] text-[11px] mt-0.5">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFD21F] hover:bg-[#FFD21F]/90 text-[#111111] font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer border border-[#E5E5E5] hover:border-[#D9A441]"
            >
              <span>{isHindi ? "संपूर्ण लेख पढ़ें" : "Read Full Article"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right: Featured Thumbnail Strictly Preserved (5 cols) with Opacity 0.85 and subtle luminous overlay */}
        <div className="p-4 sm:p-6 lg:p-8 lg:col-span-5 relative h-full flex items-center">
          <Link
            to={`/library/articles/${blog.slug}`}
            className="block w-full relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#E5E5E5] group-hover:border-[#D9A441] transition-colors shadow-sm bg-stone-100"
          >
            <img
              src={imageSrc}
              alt={blog.title}
              className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              onError={(e) => {
                e.currentTarget.src = bannerFireRitualImg;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 opacity-70 group-hover:opacity-40 transition-opacity" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white font-devanagari font-semibold bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
              <span>{isHindi ? "प्रामाणिक वैदिक शोध संग्रह" : "Authentic Vedic Research Archive"}</span>
              <span className="text-[#FFD21F] font-bold">✦</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
