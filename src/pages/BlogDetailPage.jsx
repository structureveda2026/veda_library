import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Home,
  Clock,
  Calendar,
  Eye,
  Sparkles,
  User,
  Share2,
  Bookmark,
  Printer,
  ArrowLeft,
  ArrowRight,
  Check,
  BookOpen,
  Tag,
  Languages,
  ChevronRight,
  MessageCircle,
  Flame,
  Award,
} from "lucide-react";
import BlogService from "../services/blogService.js";
import BlogCard from "../components/blog/BlogCard.jsx";
import AstromantraSidebar from "../components/blog/AstromantraSidebar.jsx";
import { FALLBACK_BLOG_CATEGORIES, FALLBACK_BLOGS } from "../data/blogFallbackData.js";
import bannerFireRitualImg from "../assets/images/library/banners/banner-fire-ritual.png";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state: language mode ("both", "en", "hi")
  const [langMode, setLangMode] = useState("both");
  // UI state: font size multiplier
  const [fontSize, setFontSize] = useState("normal"); // "normal", "large", "xlarge"
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchCat() {
      try {
        const cats = await BlogService.getCategories();
        setCategories(cats);
      } catch (e) {
        setCategories(FALLBACK_BLOG_CATEGORIES);
      }
    }
    fetchCat();
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function loadArticle() {
      setLoading(true);
      setError(null);
      try {
        const result = await BlogService.getBlogPostBySlug(slug);
        if (isCancelled) return;

        if (result && result.blog) {
          setBlog(result.blog);

          // Fetch related articles from same category
          const relatedRes = await BlogService.getBlogPosts({
            category: result.blog.category,
            limit: 4,
          });
          if (!isCancelled && relatedRes?.blogs) {
            setRelatedBlogs(
              relatedRes.blogs.filter(
                (b) => b.slug !== slug && b.id !== result.blog.id,
              ).slice(0, 3),
            );
          }
        } else {
          setError("Article not found");
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Error fetching article details:", err);
          setError("Failed to load article");
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    loadArticle();
    window.scrollTo({ top: 0, behavior: "instant" });

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return "ज्ञान परंपरा";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "ज्ञान परंपरा";
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog?.title || "Veda Library Article");

    if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${title}%20${url}`, "_blank");
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, "_blank");
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    }
  };

  // Helper to render markdown-like text nicely with tables and sacred blockquotes
  const renderFormattedContent = (text) => {
    if (!text) return null;

    const lines = text.split("\n");
    const elements = [];
    let inBlockquote = false;
    let blockquoteLines = [];
    let inTable = false;
    let tableRows = [];

    const flushBlockquote = (key) => {
      if (blockquoteLines.length > 0) {
        elements.push(
          <div
            key={key}
            className="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-l-4 border-amber-500 text-amber-100 shadow-md font-devanagari space-y-2 relative overflow-hidden"
          >
            <div className="absolute right-3 top-2 text-4xl text-amber-500/10 font-bold select-none">
              ॐ
            </div>
            {blockquoteLines.map((bLine, bIdx) => (
              <p
                key={bIdx}
                className={
                  bLine.startsWith("*")
                    ? "font-sans text-xs sm:text-sm text-amber-200/90 italic font-normal"
                    : "text-sm sm:text-base font-semibold leading-relaxed"
                }
              >
                {bLine.replace(/^>\s*/, "").replace(/\*\*/g, "").replace(/\*/g, "")}
              </p>
            ))}
          </div>,
        );
        blockquoteLines = [];
        inBlockquote = false;
      }
    };

    const flushTable = (key) => {
      if (tableRows.length > 0) {
        const headerRow = tableRows[0];
        const bodyRows = tableRows.slice(1).filter((r) => !r.every((c) => /^-+$/.test(c.trim())));

        elements.push(
          <div key={key} className="my-6 overflow-x-auto rounded-xl border border-amber-200 shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-amber-100/80 border-b border-amber-200 text-amber-950 font-serif font-bold">
                  {headerRow.map((cell, cIdx) => (
                    <th key={cIdx} className="p-3">
                      {cell.replace(/\*\*/g, "").trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100 bg-white">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-amber-50/30"}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 text-stone-700">
                        {cell.replace(/\*\*/g, "").trim()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        );
        tableRows = [];
        inTable = false;
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // Check Table
      if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
        if (inBlockquote) flushBlockquote(`bq-${idx}`);
        inTable = true;
        const cells = trimmed
          .slice(1, -1)
          .split("|")
          .map((c) => c.trim());
        tableRows.push(cells);
        return;
      } else if (inTable) {
        flushTable(`tbl-${idx}`);
      }

      // Check Blockquote
      if (trimmed.startsWith(">")) {
        inBlockquote = true;
        blockquoteLines.push(trimmed);
        return;
      } else if (inBlockquote) {
        flushBlockquote(`bq-${idx}`);
      }

      if (trimmed.startsWith("### ")) {
        elements.push(
          <h3
            key={idx}
            className="font-serif text-xl sm:text-2xl font-bold text-amber-950 mt-8 mb-3"
          >
            {trimmed.replace("### ", "")}
          </h3>,
        );
      } else if (trimmed.startsWith("## ")) {
        elements.push(
          <h2
            key={idx}
            className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-10 mb-4 pb-2 border-b border-amber-200/80"
          >
            {trimmed.replace("## ", "")}
          </h2>,
        );
      } else if (trimmed.startsWith("# ")) {
        elements.push(
          <h1
            key={idx}
            className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-10 mb-4"
          >
            {trimmed.replace("# ", "")}
          </h1>,
        );
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        elements.push(
          <li key={idx} className="ml-6 list-disc text-stone-700 my-1.5 leading-relaxed">
            {trimmed.replace(/^[-*]\s+/, "")}
          </li>,
        );
      } else if (/^\d+\.\s+/.test(trimmed)) {
        elements.push(
          <li key={idx} className="ml-6 list-decimal text-stone-700 my-1.5 leading-relaxed font-medium">
            {trimmed.replace(/^\d+\.\s+/, "")}
          </li>,
        );
      } else if (trimmed === "---") {
        elements.push(
          <hr key={idx} className="my-8 border-t border-amber-200" />,
        );
      } else if (trimmed.length > 0) {
        elements.push(
          <p
            key={idx}
            className="my-3.5 text-stone-800 leading-relaxed font-sans"
          >
            {trimmed}
          </p>,
        );
      }
    });

    if (inBlockquote) flushBlockquote("bq-last");
    if (inTable) flushTable("tbl-last");

    return elements;
  };

  if (loading) {
    return (
      <div className="bg-[#fffaf0] min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 animate-pulse space-y-6">
          <div className="h-6 bg-amber-100/80 rounded w-1/4" />
          <div className="h-10 bg-amber-100 rounded w-3/4" />
          <div className="h-4 bg-amber-100/70 rounded w-1/2" />
          <div className="aspect-[16/9] bg-amber-100/60 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bg-[#fffaf0] min-h-screen py-20 px-4">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-3xl border border-amber-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Article Not Found (लेख उपलब्ध नहीं है)
          </h2>
          <p className="text-sm text-stone-600">
            The article you are looking for might have been moved or unpublished.
          </p>
          <Link
            to="/library/articles"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </div>
    );
  }

  const hasHindiContent = Boolean(blog.contentHi || blog.titleHi);
  const imageSrc = blog.featuredImage || bannerFireRitualImg;

  const getFontSizeClass = () => {
    if (fontSize === "large") return "text-lg sm:text-xl";
    if (fontSize === "xlarge") return "text-xl sm:text-2xl";
    return "text-base sm:text-lg";
  };

  return (
    <div className="bg-[#fffaf0] min-h-screen pb-24">
      {/* 1. Sticky Navigation & Breadcrumbs Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-amber-200/80 sticky top-16 z-30 py-3 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Breadcrumb path */}
          <nav className="flex items-center gap-1.5 text-stone-500 font-medium overflow-hidden">
            <Link
              to="/library"
              className="hover:text-amber-800 transition-colors flex items-center gap-1 flex-shrink-0 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Library</span>
            </Link>
            <span>›</span>
            <Link
              to="/library/articles"
              className="hover:text-amber-800 transition-colors flex-shrink-0 cursor-pointer"
            >
              Articles
            </Link>
            <span>›</span>
            <span className="text-amber-950 font-bold truncate max-w-[200px] sm:max-w-xs">
              {blog.title}
            </span>
          </nav>

          {/* Controls: Language switcher & font sizer */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {hasHindiContent && (
              <div className="flex items-center bg-amber-50 rounded-lg p-0.5 border border-amber-200 text-[11px] font-semibold">
                <button
                  onClick={() => setLangMode("en")}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    langMode === "en" ? "bg-amber-700 text-white" : "text-stone-700 hover:text-amber-900"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLangMode("hi")}
                  className={`px-2 py-0.5 rounded transition-all font-devanagari cursor-pointer ${
                    langMode === "hi" ? "bg-amber-700 text-white" : "text-stone-700 hover:text-amber-900"
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => setLangMode("both")}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    langMode === "both" ? "bg-amber-700 text-white" : "text-stone-700 hover:text-amber-900"
                  }`}
                >
                  Both
                </button>
              </div>
            )}

            {/* Font Resizer */}
            <div className="flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200 text-[11px] font-bold">
              <button
                onClick={() => setFontSize("normal")}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === "normal" ? "bg-stone-800 text-white" : "text-stone-600"}`}
                title="Normal Font Size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize("large")}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === "large" ? "bg-stone-800 text-white" : "text-stone-600"}`}
                title="Large Font Size"
              >
                A+
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main 70/30 Astromantra Reading Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 68-70% (8 Cols on LG) */}
          <article className="lg:col-span-8 space-y-8">
            {/* Header */}
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to={`/library/articles?category=${encodeURIComponent(blog.category)}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 font-bold text-xs shadow-2xs hover:bg-amber-200 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>{blog.category || "Vedic Wisdom"}</span>
                </Link>

                {blog.isFeatured && (
                  <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold shadow-2xs">
                    Featured Insight
                  </span>
                )}
              </div>

              {/* Dual Titles */}
              {(langMode === "en" || langMode === "both") && (
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
                  {blog.title}
                </h1>
              )}

              {(langMode === "hi" || langMode === "both") && blog.titleHi && (
                <h2 className="font-devanagari text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-900 leading-snug">
                  {blog.titleHi}
                </h2>
              )}

              {/* Subtitles */}
              {(langMode === "en" || langMode === "both") && blog.subtitle && (
                <p className="text-base sm:text-lg text-stone-600 italic font-serif">
                  {blog.subtitle}
                </p>
              )}
              {(langMode === "hi" || langMode === "both") && blog.subtitleHi && (
                <p className="font-devanagari text-sm sm:text-base text-amber-900/90 font-medium">
                  {blog.subtitleHi}
                </p>
              )}

              {/* Metadata Strip: Author, Date, Read Time, Views & Actions */}
              <div className="py-4 border-y border-amber-200/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {blog.authorAvatar ? (
                    <img
                      src={blog.authorAvatar}
                      alt={blog.author}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-400"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-amber-100 border border-amber-400 flex items-center justify-center text-amber-800">
                      <User className="w-6 h-6" />
                    </div>
                  )}
                  <div className="text-xs">
                    <span className="font-bold text-stone-900 text-sm block">
                      {blog.author || "Veda Structure Team"}
                    </span>
                    <div className="flex items-center gap-2 text-stone-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-700" />
                        {formatDate(blog.publishedAt || blog.createdAt)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        {blog.readTime || "5 min read"}
                      </span>
                      {typeof blog.viewsCount !== "undefined" && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5 text-amber-700" />
                            {blog.viewsCount?.toLocaleString()} views
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sharing & Bookmark Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-300 hover:border-amber-500 text-stone-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                    title="Copy Link"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-amber-700" />
                        <span>Share</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="p-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 transition-colors cursor-pointer"
                    title="Share on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSaved(!saved)}
                    className={`p-2 rounded-full border transition-colors cursor-pointer ${
                      saved
                        ? "bg-amber-700 text-white border-amber-700"
                        : "bg-white text-stone-700 border-amber-300 hover:border-amber-500"
                    }`}
                    title="Bookmark"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="p-2 rounded-full bg-white text-stone-700 border border-amber-300 hover:border-amber-500 transition-colors cursor-pointer hidden sm:flex"
                    title="Print Article"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-300/80 shadow-lg aspect-[16/9] bg-amber-50">
              <img
                src={imageSrc}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = bannerFireRitualImg;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-amber-200 font-devanagari font-semibold">
                <span>वेद संस्थान प्रामाणिक शोध प्रपत्र</span>
                <span className="font-serif">ॐ शांतिः शांतिः शांतिः</span>
              </div>
            </div>

            {/* Article Body Content */}
            <div className={`prose max-w-none ${getFontSizeClass()} text-stone-800`}>
              {(langMode === "en" || langMode === "both") && blog.content && (
                <div className="space-y-4">
                  {langMode === "both" && hasHindiContent && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider mb-2">
                      <Languages className="w-3.5 h-3.5 text-amber-700" />
                      <span>English Discourse</span>
                    </div>
                  )}
                  {renderFormattedContent(blog.content)}
                </div>
              )}

              {(langMode === "hi" || langMode === "both") && blog.contentHi && (
                <div className={`space-y-4 ${langMode === "both" ? "mt-12 pt-8 border-t-2 border-dashed border-amber-300" : ""}`}>
                  {langMode === "both" && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-950 text-xs font-bold uppercase tracking-wider mb-2 font-devanagari">
                      <Languages className="w-3.5 h-3.5 text-amber-700" />
                      <span>हिन्दी व्याख्या एवं शास्त्रीय विवेचन</span>
                    </div>
                  )}
                  <div className="font-devanagari">
                    {renderFormattedContent(blog.contentHi)}
                  </div>
                </div>
              )}
            </div>

            {/* Shastric Reference Box */}
            <div className="p-6 rounded-2xl bg-amber-50/90 border border-amber-300/80 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span className="font-devanagari">शास्त्रीय संदर्भ एवं प्रमाणिक स्रोत</span>
                <span>(Shastric Authority & Reference)</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-sans">
                This article is curated under canonical guidelines from the authentic Sanskrit Samhitas, Jyotisha Granthas, and traditional commentaries.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-semibold text-amber-900">
                <span className="px-2.5 py-1 rounded-full bg-white border border-amber-300">
                  Corpus: Veda Library Canonical Archive
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white border border-amber-300">
                  Astromantra Scholarly Standard
                </span>
              </div>
            </div>

            {/* Tags Cloud */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-stone-600 flex items-center gap-1 mr-1">
                  <Tag className="w-3.5 h-3.5 text-amber-700" />
                  Related Tags:
                </span>
                {blog.tags.map((tag, idx) => (
                  <Link
                    key={idx}
                    to={`/library/articles?tag=${encodeURIComponent(tag.replace(/^#/, ""))}`}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-white hover:bg-amber-100 text-stone-800 border border-amber-200 transition-colors shadow-2xs cursor-pointer"
                  >
                    #{tag.replace(/^#/, "")}
                  </Link>
                ))}
              </div>
            )}

            {/* Author Bio Box */}
            <div className="p-6 rounded-3xl bg-white border border-amber-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {blog.authorAvatar ? (
                <img
                  src={blog.authorAvatar}
                  alt={blog.author}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-amber-200 flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-800 flex-shrink-0">
                  <User className="w-8 h-8" />
                </div>
              )}
              <div className="text-center sm:text-left space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    {blog.author || "Veda Structure Team"}
                  </h3>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-700" />
                    Verified Scholar
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Dedicated scholar and researcher at Veda Structure, working on digitizing ancient Indian sciences, Jyotisha epistemology, and classical mantra traditions.
                </p>
              </div>
            </div>

            {/* Related Articles Section */}
            {relatedBlogs.length > 0 && (
              <div className="pt-8 border-t border-amber-200 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-stone-900">
                      Related Articles & Insights (संबंधित लेख)
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Continue your exploration of {blog.category || "Vedic Wisdom"}
                    </p>
                  </div>

                  <Link
                    to="/library/articles"
                    className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Articles</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedBlogs.map((relBlog) => (
                    <BlogCard key={relBlog.id || relBlog.slug} blog={relBlog} />
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Right Column: 30-32% Astromantra Sidebar (4 Cols on LG) */}
          <aside className="lg:col-span-4 sticky top-24 space-y-6">
            <AstromantraSidebar
              categories={categories}
              currentCategory={blog.category}
              trendingArticles={FALLBACK_BLOGS}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
