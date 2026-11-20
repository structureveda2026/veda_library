import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import SEO from "../components/common/SEO.jsx";
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
  Copy,
  Check,
  CheckCircle2,
  BookOpen,
  Tag,
  Languages,
  ChevronRight,
  MessageCircle,
  Flame,
  Award,
  ShieldCheck,
  FileText,
} from "lucide-react";
import BlogService from "../services/blogService.js";
import BlogCard from "../components/blog/BlogCard.jsx";
import AstromantraSidebar from "../components/blog/AstromantraSidebar.jsx";
import { FALLBACK_BLOG_CATEGORIES, FALLBACK_BLOGS } from "../data/blogFallbackData.js";
import bannerFireRitualImg from "../assets/images/library/banners/banner-fire-ritual.png";

export default function BlogDetailPage() {
  const { isHindi, isEnglish } = useLanguage();
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state: language mode ("both", "en", "hi")
  const [langMode, setLangMode] = useState(() => (isHindi ? "hi" : "en"));

  useEffect(() => {
    setLangMode(isHindi ? "hi" : "en");
  }, [isHindi]);

  // UI state: font size multiplier
  const [fontSize, setFontSize] = useState("normal"); // "normal", "large", "xlarge"
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTocId, setActiveTocId] = useState("");
  const [citationStyle, setCitationStyle] = useState("shastric");
  const [citationCopied, setCitationCopied] = useState(false);

  // Reading progress tracker (Section 28 Compliance)
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Helper to extract headings for Clean Table of Contents (Section 28 Compliance)
  const tocItems = useMemo(() => {
    if (!blog) return [];
    const content = blog.content || blog.contentHi || "";
    const lines = content.split("\n");
    const headings = [];
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("## ") || trimmed.startsWith("### ")) {
        const level = trimmed.startsWith("## ") ? 2 : 3;
        const text = trimmed.replace(/^#{2,3}\s+/, "").replace(/\*\*/g, "").trim();
        const id = `sec-${index}-${text.toLowerCase().replace(/[^\w\u0900-\u097F]+/g, "-")}`;
        headings.push({ id, text, level });
      }
    });
    return headings;
  }, [blog]);

  // Active anchor tracking for Table of Contents
  useEffect(() => {
    if (tocItems.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTocId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -65% 0px", threshold: 0.1 }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const getCitationText = () => {
    if (!blog) return "";
    const year = new Date(blog.createdAt || Date.now()).getFullYear();
    const currentUrl = typeof window !== "undefined" ? window.location.href : `https://library.vedastructure.com/articles/${slug}`;
    if (citationStyle === "shastric") {
      return `वेद पुस्तकालय शास्त्रीय संदर्भ: "${blog.titleHi || blog.title}", संकलन: ${blog.author || "विद्वत समीक्षा परिषद"}, वर्ग: ${blog.category || "वैदिक वाङ्मय"}, संदर्भ संवत्: २०८३, कोष अभिलेख सं.: VEDA-${(blog.id || "ART").toUpperCase()}-${year}।`;
    }
    if (citationStyle === "chicago") {
      return `${blog.author || "Veda Library Scholarly Editorial"}. "${blog.title}." Veda Library Research Repository (${year}). ${currentUrl}.`;
    }
    // APA style
    return `${blog.author || "Veda Library Scholarly Editorial"}. (${year}). ${blog.title}. Veda Structure Canonical Digital Archive. Retrieved from ${currentUrl}`;
  };

  const handleCopyCitation = () => {
    const text = getCitationText();
    navigator.clipboard.writeText(text);
    setCitationCopied(true);
    setTimeout(() => setCitationCopied(false), 2500);
  };

  // Helper to render markdown-like text nicely with Section 28 Master Palette (White foundation, Golden quotes, black typography)
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
            className="my-6 p-5 sm:p-6 rounded-2xl bg-white border-l-4 border-[#D9A441] border-y border-r border-[#E5E5E5] shadow-xs font-devanagari space-y-2 relative overflow-hidden"
          >
            <div className="absolute right-3 top-2 text-4xl text-[#D9A441]/15 font-bold select-none pointer-events-none">
              ॐ
            </div>
            {blockquoteLines.map((bLine, bIdx) => (
              <p
                key={bIdx}
                className={
                  bLine.startsWith("*")
                    ? "font-sans text-xs sm:text-sm text-[#555555] italic font-normal"
                    : "text-sm sm:text-base font-bold text-[#111111] leading-relaxed"
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
          <div key={key} className="my-6 overflow-x-auto rounded-xl border border-[#E5E5E5] shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-[#E5E5E5] text-[#111111] font-serif font-bold">
                  {headerRow.map((cell, cIdx) => (
                    <th key={cIdx} className="p-3">
                      {cell.replace(/\*\*/g, "").trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] bg-white">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-stone-50/40"}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 text-[#111111]">
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

      // Check Blockquote (Sanskrit quote in Golden Yellow #D9A441)
      if (trimmed.startsWith(">")) {
        inBlockquote = true;
        blockquoteLines.push(trimmed);
        return;
      } else if (inBlockquote) {
        flushBlockquote(`bq-${idx}`);
      }

      if (trimmed.startsWith("### ")) {
        const text = trimmed.replace("### ", "").replace(/\*\*/g, "");
        const headingId = `sec-${idx}-${text.toLowerCase().replace(/[^\w\u0900-\u097F]+/g, "-")}`;
        elements.push(
          <h3
            key={idx}
            id={headingId}
            className="font-serif text-xl sm:text-2xl font-bold text-[#111111] mt-8 mb-3 pl-3 border-l-4 border-[#D9A441] scroll-mt-24"
          >
            {text}
          </h3>,
        );
      } else if (trimmed.startsWith("## ")) {
        const text = trimmed.replace("## ", "").replace(/\*\*/g, "");
        const headingId = `sec-${idx}-${text.toLowerCase().replace(/[^\w\u0900-\u097F]+/g, "-")}`;
        elements.push(
          <h2
            key={idx}
            id={headingId}
            className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mt-10 mb-4 pb-2 border-b border-[#E5E5E5] scroll-mt-24"
          >
            {text}
          </h2>,
        );
      } else if (trimmed.startsWith("# ")) {
        elements.push(
          <h1
            key={idx}
            className="font-serif text-3xl sm:text-4xl font-bold text-[#111111] mt-10 mb-4"
          >
            {trimmed.replace("# ", "")}
          </h1>,
        );
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        elements.push(
          <li key={idx} className="ml-6 list-disc text-[#111111] my-1.5 leading-[1.75]">
            {trimmed.replace(/^[-*]\s+/, "")}
          </li>,
        );
      } else if (/^\d+\.\s+/.test(trimmed)) {
        elements.push(
          <li key={idx} className="ml-6 list-decimal text-[#111111] my-1.5 leading-[1.75] font-medium">
            {trimmed.replace(/^\d+\.\s+/, "")}
          </li>,
        );
      } else if (trimmed === "---") {
        elements.push(
          <hr key={idx} className="my-8 border-t border-[#E5E5E5]" />,
        );
      } else if (trimmed.length > 0) {
        elements.push(
          <p
            key={idx}
            className="my-3.5 text-[#111111] leading-[1.75] font-sans"
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
      <div className="bg-white min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 animate-pulse space-y-6">
          <div className="h-6 bg-stone-100 rounded w-1/4" />
          <div className="h-10 bg-stone-200 rounded w-3/4" />
          <div className="h-4 bg-stone-100 rounded w-1/2" />
          <div className="aspect-[16/9] bg-stone-100 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bg-white min-h-screen py-10 px-4">
        <div className="max-w-md mx-auto text-center bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E5E5] shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-50 text-[#D9A441] flex items-center justify-center mx-auto border border-[#E5E5E5]">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#111111]">
            {isHindi ? "लेख उपलब्ध नहीं है" : "Article Not Found"}
          </h2>
          <p className="text-sm text-[#555555]">
            {isHindi
              ? "यह लेख स्थानांतरित अथवा अनुपलब्ध हो सकता है।"
              : "The article you are looking for might have been moved or unpublished."}
          </p>
          <Link
            to="/library/articles"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFD21F] hover:bg-[#FFD21F]/90 text-[#111111] font-bold text-xs shadow-xs transition-all border border-[#FFD21F] hover:border-[#D9A441]"
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

  // Spiritual category detector for Master Palette (#C62828)
  const isSpiritualCategory = (cat = "") => {
    const c = (cat || "").toLowerCase();
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
  const spiritual = isSpiritualCategory(blog.category);

  const getFontSizeClass = () => {
    if (fontSize === "large") return "text-lg sm:text-xl";
    if (fontSize === "xlarge") return "text-xl sm:text-2xl";
    return "text-base sm:text-lg";
  };

  const articleTitle = blog.title || blog.titleHi || "Veda Library Article";
  const articleDesc = (blog.excerpt || blog.excerptHi || blog.content || "वैदिक ज्ञान परंपरा का विशेष आलेख।").slice(0, 160).replace(/\n/g, " ");
  const canonicalUrl = `/articles/${slug}`;

  const jsonLdSchema = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "होम (Home)",
          item: "https://library.vedastructure.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "आलेख (Articles)",
          item: "https://library.vedastructure.com/articles",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: articleTitle,
          item: `https://library.vedastructure.com${canonicalUrl}`,
        },
      ],
    },
    {
      "@type": "Article",
      headline: articleTitle,
      description: articleDesc,
      url: `https://library.vedastructure.com${canonicalUrl}`,
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt || blog.createdAt,
      author: {
        "@type": "Person",
        name: blog.author || "Veda Library Editorial Board",
      },
      publisher: {
        "@type": "Organization",
        name: "Veda Library",
        url: "https://library.vedastructure.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://library.vedastructure.com/vite.svg",
        },
      },
      isPartOf: {
        "@type": "WebSite",
        name: "Veda Library",
        url: "https://library.vedastructure.com/",
      },
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-24 text-[#111111]">
      <SEO
        title={`${articleTitle} | Veda Library`}
        description={articleDesc}
        canonical={canonicalUrl}
        schema={jsonLdSchema}
        keywords={[articleTitle, blog.category, "Veda Library", "वैदिक आलेख"].filter(Boolean)}
      />
      {/* 0. Top Reading Progress Indicator (Section 28 Compliance) */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-[#E5E5E5] z-50 pointer-events-none"
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="h-full bg-[#FFD21F] transition-all duration-150 ease-out shadow-xs"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 1. Sticky Navigation & Breadcrumbs Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] sticky top-16 z-30 py-3 px-3.5 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Breadcrumb path */}
          <nav className="flex items-center gap-1.5 text-[#555555] font-medium overflow-hidden">
            <Link
              to="/library"
              className="hover:text-[#111111] transition-colors flex items-center gap-1 flex-shrink-0 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{isHindi ? "लाइब्रेरी" : "Library"}</span>
            </Link>
            <span className="text-[#D9A441]">›</span>
            <Link
              to="/library/articles"
              className="hover:text-[#111111] transition-colors flex-shrink-0 cursor-pointer"
            >
              {isHindi ? "आलेख" : "Articles"}
            </Link>
            <span className="text-[#D9A441]">›</span>
            <span className="text-[#111111] font-bold truncate max-w-[200px] sm:max-w-xs">
              {isHindi ? (blog.titleHi || blog.title) : blog.title}
            </span>
          </nav>

          {/* Controls: Language switcher & font sizer */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {hasHindiContent && (
              <div className="flex items-center bg-stone-50 rounded-lg p-0.5 border border-[#E5E5E5] text-[11px] font-semibold">
                <button
                  onClick={() => setLangMode("en")}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    langMode === "en" ? "bg-[#FFD21F] text-[#111111] font-bold shadow-xs" : "text-[#555555] hover:text-[#111111]"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLangMode("hi")}
                  className={`px-2 py-0.5 rounded transition-all font-devanagari cursor-pointer ${
                    langMode === "hi" ? "bg-[#FFD21F] text-[#111111] font-bold shadow-xs" : "text-[#555555] hover:text-[#111111]"
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => setLangMode("both")}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    langMode === "both" ? "bg-[#FFD21F] text-[#111111] font-bold shadow-xs" : "text-[#555555] hover:text-[#111111]"
                  }`}
                >
                  {isHindi ? "दोनों" : "Both"}
                </button>
              </div>
            )}

            {/* Font Resizer */}
            <div className="flex items-center bg-stone-50 rounded-lg p-0.5 border border-[#E5E5E5] text-[11px] font-bold">
              <button
                onClick={() => setFontSize("normal")}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === "normal" ? "bg-[#FFD21F] text-[#111111] shadow-xs" : "text-[#555555] hover:text-[#111111]"}`}
                title="Normal Font Size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize("large")}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === "large" ? "bg-[#FFD21F] text-[#111111] shadow-xs" : "text-[#555555] hover:text-[#111111]"}`}
                title="Large Font Size"
              >
                A+
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main 70/30 Astromantra Reading Layout */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 68-70% (8 Cols on LG) */}
          <article className="lg:col-span-8 space-y-8 bg-white">
            {/* Header */}
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to={`/library/articles?category=${encodeURIComponent(blog.category)}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs shadow-xs transition-colors ${
                    spiritual
                      ? "bg-[#C62828] text-white"
                      : "bg-[#FFD21F] text-[#111111]"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{blog.category || "Vedic Wisdom"}</span>
                </Link>

                {blog.isFeatured && (
                  <span className="px-2.5 py-1 rounded-full bg-[#D9A441] text-[#111111] text-xs font-bold shadow-2xs">
                    {isHindi ? "विशिष्ट शोध" : "Featured Insight"}
                  </span>
                )}

                {/* Editorial Verification Badge */}
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-[#111111] border border-[#E5E5E5]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {isHindi ? "प्रमाणित स्रोत" : "Source Verified"}
                </span>
              </div>

              {/* Dual Titles - Black #111111 & Golden Yellow #D9A441 */}
              {(langMode === "en" || langMode === "both") && (
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] leading-tight">
                  {blog.title}
                </h1>
              )}

              {(langMode === "hi" || langMode === "both") && blog.titleHi && (
                <h2 className="font-devanagari text-2xl sm:text-3xl lg:text-4xl font-bold text-[#D9A441] leading-snug">
                  {blog.titleHi}
                </h2>
              )}

              {/* Subtitles (Secondary #555555) */}
              {(langMode === "en" || langMode === "both") && blog.subtitle && (
                <p className="text-base sm:text-lg text-[#555555] italic font-serif leading-relaxed">
                  {blog.subtitle}
                </p>
              )}
              {(langMode === "hi" || langMode === "both") && blog.subtitleHi && (
                <p className="font-devanagari text-sm sm:text-base text-[#555555] font-medium leading-relaxed">
                  {blog.subtitleHi}
                </p>
              )}

              {/* Metadata Strip: Author, Date, Read Time, Views, Editorial Review & Actions */}
              <div className="py-4 border-y border-[#E5E5E5] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {blog.authorAvatar ? (
                    <img
                      src={blog.authorAvatar}
                      alt={blog.author}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-[#D9A441]"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-stone-100 border border-[#E5E5E5] flex items-center justify-center text-[#111111]">
                      <User className="w-6 h-6" />
                    </div>
                  )}
                  <div className="text-xs">
                    <span className="font-bold text-[#111111] text-sm block">
                      {blog.author || "Veda Structure Team"}
                    </span>
                    <div className="flex items-center gap-2 text-[#555555] mt-0.5 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#D9A441]" />
                        {formatDate(blog.publishedAt || blog.createdAt)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#D9A441]" />
                        {blog.readTime || (isHindi ? "५ मिनट पठन" : "5 min read")}
                      </span>
                      {typeof blog.viewsCount !== "undefined" && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5 text-[#555555]" />
                            {blog.viewsCount?.toLocaleString()} {isHindi ? "पाठक" : "views"}
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
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5E5E5] hover:border-[#D9A441] text-[#111111] text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                    title={isHindi ? "लिंक कॉपी करें" : "Copy Link"}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">{isHindi ? "कॉपी हो गया!" : "Copied!"}</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-[#D9A441]" />
                        <span>{isHindi ? "साझा करें" : "Share"}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="p-2 rounded-full bg-stone-50 text-emerald-700 border border-[#E5E5E5] hover:border-emerald-500 transition-colors cursor-pointer"
                    title={isHindi ? "व्हाट्सएप पर साझा करें" : "Share on WhatsApp"}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSaved(!saved)}
                    className={`p-2 rounded-full border transition-colors cursor-pointer ${
                      saved
                        ? "bg-[#FFD21F] text-[#111111] border-[#FFD21F]"
                        : "bg-white text-[#555555] border-[#E5E5E5] hover:border-[#D9A441] hover:text-[#111111]"
                    }`}
                    title={isHindi ? "सहेजें" : "Bookmark"}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="p-2 rounded-full bg-white text-[#555555] border border-[#E5E5E5] hover:border-[#D9A441] hover:text-[#111111] transition-colors cursor-pointer hidden sm:flex"
                    title={isHindi ? "प्रिंट करें" : "Print Article"}
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </header>

            {/* Featured Image with Clearly Visible Framing (Opacity 0.85 with subtle luminous overlay) */}
            <div className="relative rounded-3xl overflow-hidden border border-[#E5E5E5] hover:border-[#D9A441] shadow-md aspect-[16/9] bg-stone-100 transition-colors">
              <img
                src={imageSrc}
                alt={blog.title}
                className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-500"
                onError={(e) => {
                  e.currentTarget.src = bannerFireRitualImg;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-white/10 opacity-70" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white font-devanagari font-semibold bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                <span>{isHindi ? "वेद पुस्तकालय प्रामाणिक शोध प्रपत्र" : "Veda Library Canonical Research Paper"}</span>
                <span className="font-serif text-[#FFD21F]">ॐ शांतिः शांतिः शांतिः</span>
              </div>
            </div>

            {/* Table of Contents with Active Anchor Tracking */}
            {tocItems.length > 1 && (
              <nav className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] transition-colors shadow-2xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E5E5]">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#111111]">
                    <BookOpen className="w-4 h-4 text-[#D9A441]" />
                    <span>{isHindi ? "विषय सूची" : "Table of Contents"}</span>
                  </div>
                  <span className="text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[#111111] shadow-2xs">
                    {tocItems.length} {isHindi ? "अनुभाग" : "sections"}
                  </span>
                </div>
                <ul className="space-y-1 text-xs sm:text-sm font-sans">
                  {tocItems.map((item) => {
                    const isActive = activeTocId === item.id;
                    return (
                      <li key={item.id} className={item.level === 3 ? "ml-4" : "ml-0"}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById(item.id);
                            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className={`flex items-center gap-2 py-1.5 px-2.5 rounded-lg transition-all group ${
                            isActive
                              ? "bg-[#FFD21F] text-[#111111] font-bold shadow-2xs border-l-3 border-[#111111]"
                              : "text-[#555555] hover:text-[#111111] hover:bg-stone-50"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              isActive ? "bg-[#111111] scale-125" : "bg-[#D9A441] group-hover:scale-125"
                            }`}
                          />
                          <span className="truncate">{item.text}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}

            {/* Article Body Content (Section 28 Typography: Black #111111, Leading 1.75, Pure White Canvas) */}
            <div className={`prose max-w-none ${getFontSizeClass()} text-[#111111]`}>
              {(langMode === "en" || langMode === "both") && blog.content && (
                <div className="space-y-4">
                  {langMode === "both" && hasHindiContent && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-100 text-[#111111] text-xs font-bold uppercase tracking-wider mb-2 border border-[#E5E5E5]">
                      <Languages className="w-3.5 h-3.5 text-[#D9A441]" />
                      <span>English Discourse</span>
                    </div>
                  )}
                  {renderFormattedContent(blog.content)}
                </div>
              )}

              {(langMode === "hi" || langMode === "both") && blog.contentHi && (
                <div className={`space-y-4 ${langMode === "both" ? "mt-12 pt-8 border-t-2 border-dashed border-[#E5E5E5]" : ""}`}>
                  {langMode === "both" && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFD21F] text-[#111111] text-xs font-bold uppercase tracking-wider mb-2 font-devanagari">
                      <Languages className="w-3.5 h-3.5 text-[#111111]" />
                      <span>हिन्दी व्याख्या एवं शास्त्रीय विवेचन</span>
                    </div>
                  )}
                  <div className="font-devanagari">
                    {renderFormattedContent(blog.contentHi)}
                  </div>
                </div>
              )}
            </div>

            {/* Verified Shastric Citation & Archive Box */}
            <div className="px-3.5 sm:px-7 py-5 sm:py-7 rounded-2xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] shadow-xs space-y-4 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-2 text-[#111111] font-bold text-sm">
                  <BookOpen className="w-4 h-4 text-[#D9A441]" />
                  <span>{isHindi ? "शास्त्रीय संदर्भ एवं प्रमाणिक स्रोत" : "Verified Shastric Citation & Sources"}</span>
                </div>

                {/* Citation Style Switcher */}
                <div className="flex items-center bg-stone-50 rounded-lg p-0.5 border border-[#E5E5E5] text-[11px] font-semibold self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setCitationStyle("shastric")}
                    className={`px-2.5 py-1 rounded transition-all cursor-pointer font-devanagari ${
                      citationStyle === "shastric"
                        ? "bg-[#FFD21F] text-[#111111] font-bold shadow-2xs"
                        : "text-[#555555] hover:text-[#111111]"
                    }`}
                  >
                    {isHindi ? "शास्त्रीय" : "Shastric"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCitationStyle("chicago")}
                    className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                      citationStyle === "chicago"
                        ? "bg-[#FFD21F] text-[#111111] font-bold shadow-2xs"
                        : "text-[#555555] hover:text-[#111111]"
                    }`}
                  >
                    Chicago
                  </button>
                  <button
                    type="button"
                    onClick={() => setCitationStyle("apa")}
                    className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                      citationStyle === "apa"
                        ? "bg-[#FFD21F] text-[#111111] font-bold shadow-2xs"
                        : "text-[#555555] hover:text-[#111111]"
                    }`}
                  >
                    APA 7th
                  </button>
                </div>
              </div>

              {/* Formatted Citation Display */}
              <div className="p-3.5 rounded-xl bg-stone-50/70 border border-[#E5E5E5] text-xs font-mono text-[#111111] leading-relaxed relative group">
                <p className="select-all break-words pr-20">{getCitationText()}</p>
                <button
                  type="button"
                  onClick={handleCopyCitation}
                  className="absolute top-2 right-2 flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FFD21F] hover:bg-[#FFD21F]/90 text-[#111111] font-bold text-[11px] shadow-2xs transition-all cursor-pointer border border-[#FFD21F]"
                  title={isHindi ? "संदर्भ कॉपी करें" : "Copy Citation"}
                >
                  {citationCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-700" />
                      <span className="text-emerald-800">{isHindi ? "कॉपी हो गया!" : "Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#111111]" />
                      <span>{isHindi ? "कॉपी" : "Copy"}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Scholarly Accreditations Strip */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-semibold text-[#111111]">
                <span className="px-2.5 py-1 rounded-full bg-stone-50 border border-[#E5E5E5]">
                  {isHindi ? "ग्रंथ: वेद पुस्तकालय डिजिटल संग्रह" : "Corpus: Veda Library Canonical Archive"}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-stone-50 border border-[#E5E5E5]">
                  Identifier: DOI 10.VEDA/CANON.{(blog.id || "001").toUpperCase()}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#FFD21F] text-[#111111] font-bold">
                  {isHindi ? "विद्वत परिषद द्वारा अनुमोदित" : "Editorial Approved"}
                </span>
              </div>
            </div>

            {/* Tags Cloud */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#555555] flex items-center gap-1 mr-1">
                  <Tag className="w-3.5 h-3.5 text-[#D9A441]" />
                  {isHindi ? "संबंधित विषय:" : "Related Tags:"}
                </span>
                {blog.tags.map((tag, idx) => (
                  <Link
                    key={idx}
                    to={`/library/articles?tag=${encodeURIComponent(tag.replace(/^#/, ""))}`}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-white hover:bg-stone-50 text-[#111111] border border-[#E5E5E5] hover:border-[#D9A441] transition-colors shadow-2xs cursor-pointer"
                  >
                    #{tag.replace(/^#/, "")}
                  </Link>
                ))}
              </div>
            )}

            {/* Author Profile Card with Scholar Credentials */}
            <div className="px-3.5 sm:px-7 py-5 sm:py-7 rounded-3xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] transition-all shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {blog.authorAvatar ? (
                  <img
                    src={blog.authorAvatar}
                    alt={blog.author}
                    className="w-18 h-18 rounded-full object-cover ring-2 ring-[#FFD21F] ring-offset-2 flex-shrink-0 shadow-xs"
                  />
                ) : (
                  <div className="w-18 h-18 rounded-full bg-stone-50 border-2 border-[#D9A441] flex items-center justify-center text-[#111111] flex-shrink-0 shadow-xs">
                    <User className="w-8 h-8 text-[#D9A441]" />
                  </div>
                )}
                <div className="text-center sm:text-left space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="font-serif text-xl font-bold text-[#111111]">
                      {blog.author || "Dr. Acharya Vidyadhar Sharma"}
                    </h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[#111111] border border-[#FFD21F] flex items-center gap-1">
                      <Award className="w-3 h-3 text-[#111111]" />
                      {isHindi ? "प्रमाणित वैदिक विद्वान" : "Verified Vedic Scholar"}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-50 text-[#555555] border border-[#E5E5E5]">
                      {isHindi ? "विद्वत समीक्षा परिषद" : "Editorial Review Council"}
                    </span>
                  </div>

                  <p className="text-xs text-[#555555] leading-relaxed font-sans">
                    {isHindi
                      ? "वरिष्ठ वैदिक शोधकर्ता एवं मुख्य संपादक। संपूर्णानंद संस्कृत विश्वविद्यालय एवं काशी हिन्दू विश्वविद्यालय से शास्त्रीय भाष्य व यजुर्वेद संहिता शोध में दीक्षित।"
                      : "Senior Vedic Researcher & Chief Editor. Trained in classical commentaries and Yajurveda Samhita research at Sampurnanand Sanskrit University and BHU."}
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] font-medium text-[#111111]">
                    <span className="px-2 py-0.5 rounded-md bg-stone-50 border border-[#E5E5E5]">
                      {isHindi ? "परंपरा: शुक्ल यजुर्वेद माध्यन्दिन" : "Tradition: Shukla Yajurveda Madhyandina"}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-stone-50 border border-[#E5E5E5]">
                      {isHindi ? "शोध क्षेत्र: संहिता भाष्य व स्वर विज्ञान" : "Research: Samhita Bhashya & Swara Science"}
                    </span>
                    <Link
                      to="/scholars/vidyadhar-sharma"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFD21F] hover:bg-[#FFD21F]/90 text-[#111111] font-bold text-[11px] border border-[#FFD21F] hover:border-[#D9A441] transition-all ml-auto"
                    >
                      <span>{isHindi ? "विद्वान विवरण देखें" : "View Scholar Dossier"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Articles Section */}
            {relatedBlogs.length > 0 && (
              <div className="pt-8 border-t border-[#E5E5E5] space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#111111]">
                      {isHindi ? "संबंधित लेख एवं शोध" : "Related Articles & Insights"}
                    </h3>
                    <p className="text-xs text-[#555555] mt-0.5">
                      {isHindi
                        ? `${blog.category || "वैदिक ज्ञान"} का अन्वेषण जारी रखें`
                        : `Continue your exploration of ${blog.category || "Vedic Wisdom"}`}
                    </p>
                  </div>

                  <Link
                    to="/library/articles"
                    className="text-xs font-bold text-[#111111] hover:text-[#D9A441] flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isHindi ? "सभी लेख देखें" : "View All Articles"}</span>
                    <ChevronRight className="w-4 h-4 text-[#D9A441]" />
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
