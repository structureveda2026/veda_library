import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SEO from "../components/common/SEO.jsx";
import {
  Search,
  BookOpen,
  Sparkles,
  Filter,
  ArrowRight,
  RefreshCw,
  Home,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Tag,
  X,
  Compass,
  Flame,
  Calendar,
  Award,
  Copy,
  Check,
  CheckCircle2,
  Languages,
  User,
  ShieldCheck,
} from "lucide-react";
import BlogService from "../services/blogService.js";
import BlogCard from "../components/blog/BlogCard.jsx";
import FeaturedBlogCard from "../components/blog/FeaturedBlogCard.jsx";
import AstromantraSidebar from "../components/blog/AstromantraSidebar.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

// 8 Generated High-Res Devotional Category Images - Strictly Preserved
import imgCatAllArticles from "../assets/images/library/cards/cat-all-articles.jpg";
import imgCatAstrology from "../assets/images/library/cards/cat-vedic-astrology.jpg";
import imgCatMantra from "../assets/images/library/cards/cat-mantra-stotrams.jpg";
import imgCatVastu from "../assets/images/library/cards/cat-vastu-shastra.jpg";
import imgCatPuja from "../assets/images/library/cards/cat-puja-rituals.jpg";
import imgCatVrat from "../assets/images/library/cards/cat-vrat-katha.jpg";
import imgCatRudraksha from "../assets/images/library/cards/cat-rudraksha-gemstones.jpg";
import imgCatAyurveda from "../assets/images/library/cards/cat-ayurveda-health.jpg";
import bannerArticlesHero from "../assets/images/library/banners/banner-articles-hero.jpg";

// 8 Canonical Categories with authentic imagery
const CATEGORY_TOPICS = [
  {
    key: "All",
    label: "All Articles",
    labelHi: "समस्त लेख",
    count: 12,
    icon: BookOpen,
    image: imgCatAllArticles,
  },
  {
    key: "Vedic Astrology",
    label: "Vedic Astrology",
    labelHi: "वैदिक ज्योतिष",
    count: 3,
    icon: Sparkles,
    image: imgCatAstrology,
  },
  {
    key: "Mantras & Stotrams",
    label: "Mantras & Stotrams",
    labelHi: "मंत्र एवं स्तोत्र",
    count: 3,
    icon: Compass,
    image: imgCatMantra,
  },
  {
    key: "Vastu Shastra",
    label: "Vastu Shastra",
    labelHi: "वास्तु शास्त्र",
    count: 2,
    icon: Home,
    image: imgCatVastu,
  },
  {
    key: "Puja & Rituals",
    label: "Puja & Rituals",
    labelHi: "पूजा एवं अनुष्ठान",
    count: 2,
    icon: Flame,
    image: imgCatPuja,
  },
  {
    key: "Vrat & Katha",
    label: "Vrat & Katha",
    labelHi: "व्रत एवं कथा",
    count: 1,
    icon: Calendar,
    image: imgCatVrat,
  },
  {
    key: "Rudraksha & Gemstones",
    label: "Rudraksha & Gemstones",
    labelHi: "रुद्राक्ष एवं रत्न",
    count: 1,
    icon: Award,
    image: imgCatRudraksha,
  },
  {
    key: "Ayurveda & Health",
    label: "Ayurveda & Health",
    labelHi: "आयुर्वेद एवं स्वास्थ्य",
    count: 1,
    icon: Sparkles,
    image: imgCatAyurveda,
  },
];

const POPULAR_TAGS = [
  { key: "Lord Shiva", hi: "भगवान शिव" },
  { key: "Rudrabhishek", hi: "रुद्राभिषेक" },
  { key: "Navgrah", hi: "नवग्रह" },
  { key: "Vedic Astrology", hi: "वैदिक ज्योतिष" },
  { key: "Mantras", hi: "मंत्र साधना" },
  { key: "Vastu Tips", hi: "वास्तु शास्त्र" },
  { key: "Ayurveda", hi: "आयुर्वेद" },
  { key: "Daily Sadhana", hi: "दैनिक साधना" },
  { key: "Rigveda", hi: "ऋग्वेद" },
];

export default function BlogListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isHindi } = useLanguage();

  const currentCategory = searchParams.get("category") || "All";
  const currentTag = searchParams.get("tag") || "";
  const currentSearch = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentSort = searchParams.get("sort") || "createdAt";

  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 8,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(currentSearch);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [langMode, setLangMode] = useState("both"); // "both", "hi", "en"
  const [activeSectionId, setActiveSectionId] = useState("thematic-categories");
  const [citationStyle, setCitationStyle] = useState("shastric");
  const [citationCopied, setCitationCopied] = useState(false);

  // Reading progress tracker
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

  // Active anchor tracking for Table of Contents
  useEffect(() => {
    const sections = [
      "thematic-categories",
      "featured-treatise",
      "articles-archive",
      "scholars-spotlight",
      "citation-standards",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0.1 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [blogs]);

  const getRepositoryCitation = () => {
    const year = new Date().getFullYear();
    const url = "https://library.vedastructure.com/articles";
    if (citationStyle === "shastric") {
      return `वेद पुस्तकालय शोध प्रपत्र संग्रह: "वैदिक वाङ्मय, संहिता भाष्य एवं दार्शनिक शोध ग्रन्थावली", संपादन: विद्वत परिषद एवं वैदिक अध्ययन केंद्र, संदर्भ संवत्: २०८३, कोष सं.: VEDA-LIB-ARCHIVE-${year}।`;
    }
    if (citationStyle === "chicago") {
      return `Veda Library Editorial Board. "Veda Structure Articles & Research Archive: Canonical Shastric Treatises." Veda Library Sacred Digital Repository (${year}). ${url}.`;
    }
    return `Veda Library Editorial Board. (${year}). Vedic Insights & Canonical Shastric Commentary. Veda Structure Canonical Digital Archive. Retrieved from ${url}`;
  };

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(getRepositoryCitation());
    setCitationCopied(true);
    setTimeout(() => setCitationCopied(false), 2500);
  };

  // Sync search input with url search param
  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  // Load categories
  useEffect(() => {
    async function loadCategories() {
      try {
        const catList = await BlogService.getCategories();
        setCategories(catList);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }
    loadCategories();
  }, []);

  // Fetch blogs when filters change
  useEffect(() => {
    let isCancelled = false;

    async function fetchBlogs() {
      setLoading(true);
      try {
        const response = await BlogService.getBlogPosts({
          page: currentPage,
          limit: 8,
          category: currentCategory === "All" ? "" : currentCategory,
          tag: currentTag,
          search: currentSearch,
          sort: currentSort,
          order: currentSort === "title" ? "ASC" : "DESC",
        });

        if (!isCancelled && response) {
          setBlogs(response.blogs || []);
          setPagination(response.pagination || { total: 0, page: 1, totalPages: 1 });
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    fetchBlogs();
    return () => {
      isCancelled = true;
    };
  }, [currentCategory, currentTag, currentSearch, currentPage, currentSort]);

  // Update query params helper
  const updateParams = (newParams) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "" || value === "All") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    // Reset to page 1 unless page is explicitly changed
    if (!("page" in newParams)) {
      next.delete("page");
    }
    setSearchParams(next);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ search: searchInput.trim() });
  };

  const handleClearSearch = () => {
    setSearchInput("");
    updateParams({ search: "" });
  };

  // Helper to dynamically get category counts
  const getCategoryCount = (key) => {
    if (key === "All") {
      const allCat = categories.find((c) => (typeof c === "string" ? c : c.category) === "All");
      return allCat?.count || 12;
    }
    const found = categories.find(
      (c) => (typeof c === "string" ? c : c.category)?.toLowerCase() === key.toLowerCase(),
    );
    if (found && typeof found.count !== "undefined") return found.count;
    const staticTopic = CATEGORY_TOPICS.find((t) => t.key.toLowerCase() === key.toLowerCase());
    return staticTopic?.count ?? null;
  };

  // Helper to detect spiritual topics for Master Palette (#C62828)
  const isSpiritualTopic = (key = "") => {
    const k = key.toLowerCase();
    return (
      k.includes("puja") ||
      k.includes("ritual") ||
      k.includes("mantra") ||
      k.includes("stotram") ||
      k.includes("vrat")
    );
  };

  const featuredBlog = blogs.find((b) => b.isFeatured) || (blogs.length > 0 ? blogs[0] : null);
  const regularBlogs = blogs.filter((b) => b.id !== featuredBlog?.id);

  return (
    <div className="bg-white min-h-screen pb-20">
      <SEO
        title={isHindi ? "वैदिक लेख और ब्लॉग" : "Vedic Articles & Blogs"}
        description={isHindi ? "वैदिक ज्ञान, शास्त्र, पुराण, उपनिषद और भारतीय परंपरा पर लेखों का संग्रह।" : "Collection of articles on Vedic knowledge, shastras, Puranas, Upanishads, and Indian tradition."}
        canonical="/library/articles"
      />
      {/* 0. Top Reading Progress Bar (#FFD21F) */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#E5E5E5] z-50 pointer-events-none"
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

      {/* 1. Top Vedic Ribbon & Breadcrumb */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] sticky top-16 z-30 py-3 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Breadcrumb Links */}
          <nav className="flex items-center gap-2 text-[#555555] font-medium">
            <Link
              to="/library"
              className="hover:text-[#111111] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{isHindi || langMode === "hi" ? "पुस्तकालय" : "Library"}</span>
            </Link>
            <span className="text-[#D9A441]">›</span>
            <span className="text-[#111111] font-bold">
              {isHindi || langMode === "hi" ? "शास्त्रीय आलेख एवं शोध" : "Articles & Research Papers"}
            </span>
          </nav>

          {/* Dual-Language Switcher (हिन्दी / English / Both) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-stone-50 rounded-lg p-0.5 border border-[#E5E5E5] text-[11px] font-semibold shadow-2xs">
              <button
                type="button"
                onClick={() => setLangMode("en")}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  langMode === "en" ? "bg-[#FFD21F] text-[#111111] font-bold shadow-xs" : "text-[#555555] hover:text-[#111111]"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLangMode("hi")}
                className={`px-2.5 py-1 rounded transition-all font-devanagari cursor-pointer ${
                  langMode === "hi" ? "bg-[#FFD21F] text-[#111111] font-bold shadow-xs" : "text-[#555555] hover:text-[#111111]"
                }`}
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => setLangMode("both")}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  langMode === "both" ? "bg-[#FFD21F] text-[#111111] font-bold shadow-xs" : "text-[#555555] hover:text-[#111111]"
                }`}
              >
                Both
              </button>
            </div>

            {/* Vedic Motto Badge */}
            <div className="hidden md:flex items-center gap-2 text-[11px] font-devanagari font-semibold text-[#111111] bg-white border border-[#E5E5E5] px-3 py-1 rounded-full shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] animate-pulse" />
              <span>ऋग्वेदो यजुर्वेदः सामवेदोऽथर्वणस्तथा • ज्ञानं परमं बलम्</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents / Thematic Directory with Active Anchor Tracking */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
          {[
            { id: "thematic-categories", label: "विषय श्रेणियाँ", en: "Topic Categories" },
            { id: "featured-treatise", label: "विशिष्ट शोध आलेख", en: "Featured Treatise" },
            { id: "articles-archive", label: "शोध प्रपत्र संग्रह", en: "Articles Archive" },
            { id: "scholars-spotlight", label: "विद्वत शोध मंडल", en: "Scholars Dossier" },
            { id: "citation-standards", label: "शास्त्रीय उद्धरण विधि", en: "Citation Guide" },
          ].map((sec) => {
            const isActive = activeSectionId === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(sec.id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`px-3 py-1.5 rounded-full border whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#FFD21F] text-[#111111] border-[#FFD21F] font-bold shadow-2xs scale-102"
                    : "bg-white text-[#555555] hover:text-[#111111] border-[#E5E5E5] hover:border-[#D9A441]"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#111111]" : "bg-[#D9A441]"}`} />
                <span>{isHindi || langMode === "hi" ? sec.label : sec.en}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* 2. Hero Header Section with Authentic Vedic Panoramic Banner Strictly Preserved */}
      <section className="relative overflow-hidden bg-white border-b border-[#E5E5E5] py-5 sm:py-7 px-4 sm:px-6 lg:px-8">
        {/* Real Panoramic Banner Background */}
        <div className="absolute inset-0">
          <img
            src={bannerArticlesHero}
            alt="Veda Library Articles & Blogs Hero Banner"
            className="w-full h-full object-cover object-center opacity-85 filter brightness-95"
          />
          {/* Subtle luminous spiritual overlay preserving banner details */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75 backdrop-blur-[0.5px]" />
        </div>

        {/* Content Container on top */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21F] text-[#111111] text-[11px] font-bold shadow-xs">
            <Sparkles className="w-3 h-3 text-[#111111]" />
            <span className="font-devanagari">
              {isHindi ? "वेद व्याख्या एवं शास्त्रीय आलेख" : "Vedic Insights & Commentary"}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight drop-shadow-md">
            {isHindi ? "वेद पुस्तकालय आलेख एवं शोध संग्रह" : "Veda Library Blogs & Articles"}
          </h1>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-white/90 leading-snug font-sans drop-shadow-xs">
            {isHindi
              ? "विद्वानों द्वारा रचित प्रामाणिक वैदिक अनुसंधान, पूजा विधान एवं शास्त्रीय विश्लेषण।"
              : "Authentic commentary, Vedic research, ritual guides, and classical shastric analysis."}
          </p>

          {/* Search Bar & Instant Filter */}
          <div className="max-w-xl mx-auto pt-1">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-md rounded-xl">
              <div className="absolute left-3.5 text-[#D9A441] pointer-events-none">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={
                  isHindi
                    ? "लेख, मंत्र, श्लोक, विषय खोजें..."
                    : "Search articles, mantras, shlokas, topics..."
                }
                className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-white border border-[#E5E5E5] text-xs sm:text-sm text-[#111111] placeholder:text-[#555555] focus:outline-none focus:ring-2 focus:ring-[#FFD21F] focus:border-[#FFD21F] transition-all"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-20 p-1 rounded-full text-[#555555] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 rounded-lg bg-[#FFD21F] hover:bg-[#FFD21F]/90 text-[#111111] font-bold text-xs shadow-2xs transition-all cursor-pointer border border-[#FFD21F]"
              >
                {isHindi ? "खोजें" : "Search"}
              </button>
            </form>
          </div>

          {/* Popular Tag Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            <span className="text-[11px] font-semibold text-white/90 flex items-center gap-1 mr-0.5">
              <Tag className="w-3 h-3 text-[#FFD21F]" />
              {isHindi ? "प्रमुख विषय:" : "Trending:"}
            </span>
            {POPULAR_TAGS.map((t, idx) => {
              const isActive = currentTag.toLowerCase() === t.key.toLowerCase();
              return (
                <button
                  key={t.key}
                  onClick={() => updateParams({ tag: isActive ? "" : t.key })}
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                    idx >= 4 ? "hidden sm:inline-block" : "inline-block"
                  } ${
                    isActive
                      ? "bg-[#FFD21F] text-[#111111] font-extrabold shadow-sm ring-1 ring-white"
                      : "bg-black/50 hover:bg-black/70 text-white border border-white/20 hover:border-[#FFD21F]"
                  }`}
                >
                  #{isHindi ? t.hi : t.key}
                </button>
              );
            })}
            {currentTag && (
              <button
                onClick={() => updateParams({ tag: "" })}
                className="text-[11px] font-bold text-[#FFD21F] hover:text-white ml-1 underline cursor-pointer"
              >
                {isHindi ? "टैग हटाएं" : "Clear Tag"}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Prominent Categories Header & Grid at the TOP (8 Topics Strictly Preserved) */}
      <section id="thematic-categories" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-3xl border border-[#E5E5E5] p-4 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E5E5]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FFD21F] text-[#111111] flex items-center justify-center font-bold shadow-xs">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#111111] flex items-center gap-2">
                  <span>{isHindi ? "विषय श्रेणियाँ" : "Topic Categories"}</span>
                  <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded-full bg-stone-100 text-[#111111] border border-[#E5E5E5]">
                    {isHindi ? "८ श्रेणियाँ" : "8 Topics"}
                  </span>
                </h2>
                <p className="text-xs text-[#555555] font-sans">
                  {isHindi
                    ? "प्रामाणिक वैदिक एवं शास्त्रीय विषयों के अनुसार आलेख पढ़ें"
                    : "Browse Vedic insights by canonical topic and category"}
                </p>
              </div>
            </div>

            {currentCategory !== "All" && (
              <button
                onClick={() => updateParams({ category: "All" })}
                className="self-start sm:self-auto text-xs font-bold text-[#111111] hover:text-[#D9A441] flex items-center gap-1 bg-stone-50 hover:bg-stone-100 border border-[#E5E5E5] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                <span>{isHindi ? "समस्त लेख देखें" : "Show All Articles"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D9A441]" />
              </button>
            )}
          </div>

          {/* 8 Category Topic Cards Grid with High-Res Devotional Vedic Images Strictly Preserved */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
            {CATEGORY_TOPICS.map((topic) => {
              const Icon = topic.icon;
              const count = getCategoryCount(topic.key);
              const isActive =
                topic.key === "All"
                  ? currentCategory === "All" || !currentCategory
                  : currentCategory.toLowerCase() === topic.key.toLowerCase();
              const spiritual = isSpiritualTopic(topic.key);

              return (
                <button
                  key={topic.key}
                  onClick={() => updateParams({ category: topic.key })}
                  className={`group relative rounded-2xl border transition-all text-left flex flex-col justify-between overflow-hidden cursor-pointer ${
                    isActive
                      ? "bg-stone-50/80 border-[#D9A441] shadow-md ring-2 ring-[#FFD21F] -translate-y-0.5"
                      : "bg-white hover:bg-stone-50/40 border-[#E5E5E5] hover:border-[#D9A441] hover:shadow-xs"
                  }`}
                >
                  {/* Image Container with Elegant Aspect Ratio, Overlay & Badges (Opacity 0.85) */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-900">
                    <img
                      src={topic.image}
                      alt={topic.label}
                      className="w-full h-full object-cover object-center opacity-85 group-hover:opacity-100 group-hover:scale-108 transition-all duration-500"
                    />
                    {/* Subtle Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Count Badge Top-Right: Red #C62828 for spiritual, Yellow #FFD21F for active */}
                    {count !== null && (
                      <span
                        className={`absolute top-1.5 right-1.5 text-[10px] font-bold px-1.5 py-0.2 rounded-full backdrop-blur-xs border ${
                          isActive
                            ? "bg-[#FFD21F] text-[#111111] border-[#FFD21F] font-extrabold shadow-xs"
                            : spiritual
                            ? "bg-[#C62828] text-white border-red-400"
                            : "bg-black/60 text-white border-white/20"
                        }`}
                      >
                        {count}
                      </span>
                    )}

                    {/* Topic Icon Bottom-Left */}
                    <div
                      className={`absolute bottom-1.5 left-1.5 w-5 h-5 rounded-md flex items-center justify-center backdrop-blur-xs ${
                        isActive
                          ? "bg-[#FFD21F] text-[#111111] shadow-xs"
                          : "bg-black/60 text-[#FFD21F] border border-white/20"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-center bg-white">
                    <div
                      className={`font-serif font-bold text-xs sm:text-[13px] leading-tight line-clamp-1 transition-colors text-center ${
                        isActive ? "text-[#D9A441]" : "text-[#111111] group-hover:text-[#D9A441]"
                      }`}
                    >
                      {isHindi ? topic.labelHi : topic.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Main Body Content (70/30 Reading Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 70% (8 Cols on LG) */}
          <main className="lg:col-span-8 space-y-6">
            {/* Sort & Count Controls Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
              <span className="font-semibold text-xs sm:text-sm text-[#555555]">
                {currentCategory !== "All"
                  ? `${currentCategory} (${pagination.total} ${isHindi ? "लेख" : "Articles"})`
                  : isHindi
                  ? `कुल ${pagination.total} लेख उपलब्ध`
                  : `Showing ${pagination.total} Articles`}
              </span>

              <div className="flex items-center gap-1.5 bg-white border border-[#E5E5E5] rounded-xl px-2.5 py-1.5 shadow-2xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#D9A441]" />
                <select
                  value={currentSort}
                  onChange={(e) => updateParams({ sort: e.target.value })}
                  className="bg-transparent text-xs font-semibold text-[#111111] focus:outline-none cursor-pointer"
                >
                  <option value="createdAt">{isHindi ? "नवीनतम (Newest First)" : "Newest First"}</option>
                  <option value="viewsCount">{isHindi ? "सर्वाधिक पठित (Most Read)" : "Most Read"}</option>
                  <option value="title">{isHindi ? "अकारादि क्रम (A-Z)" : "Alphabetical (A-Z)"}</option>
                </select>
              </div>
            </div>

            {/* Active Filters Strip (if any) */}
            {(currentSearch || currentTag || (currentCategory && currentCategory !== "All")) && (
              <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-white border border-[#E5E5E5] text-xs shadow-xs">
                <span className="font-bold text-[#111111] flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-[#D9A441]" />
                  {isHindi ? "सक्रिय फ़िल्टर:" : "Active Filters:"}
                </span>

                {currentCategory && currentCategory !== "All" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FFD21F] text-[#111111] font-bold">
                    {isHindi ? "श्रेणी: " : "Category: "}{currentCategory}
                    <button
                      onClick={() => updateParams({ category: "All" })}
                      className="text-[#111111] hover:opacity-70 ml-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {currentTag && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 text-[#111111] border border-[#E5E5E5] font-semibold">
                    {isHindi ? "टैग: #" : "Tag: #"}{currentTag}
                    <button
                      onClick={() => updateParams({ tag: "" })}
                      className="text-[#555555] hover:text-[#111111] ml-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {currentSearch && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 text-[#111111] border border-[#E5E5E5] font-semibold">
                    {isHindi ? "खोज: " : "Search: "}"{currentSearch}"
                    <button
                      onClick={handleClearSearch}
                      className="text-[#555555] hover:text-[#111111] ml-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={() => {
                    setSearchInput("");
                    setSearchParams({});
                  }}
                  className="text-xs font-bold text-[#555555] hover:text-[#111111] underline ml-auto cursor-pointer"
                >
                  {isHindi ? "सभी फ़िल्टर रीसेट करें" : "Reset All Filters"}
                </button>
              </div>
            )}

            {/* Featured Article Spotlight (shown on Page 1 if no search/tag) */}
            {currentPage === 1 && !currentSearch && !currentTag && featuredBlog && (
              <div id="featured-treatise" className="scroll-mt-28 space-y-3">
                <FeaturedBlogCard blog={featuredBlog} />
              </div>
            )}

            {/* Articles Grid / Loading / Empty States */}
            <div id="articles-archive" className="scroll-mt-28">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {[1, 2, 3, 4].map((idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-[#E5E5E5] p-4 space-y-4 animate-pulse shadow-xs"
                  >
                    <div className="aspect-[16/10] bg-stone-100 rounded-xl" />
                    <div className="space-y-2">
                      <div className="h-4 bg-stone-100 rounded w-1/3" />
                      <div className="h-6 bg-stone-200 rounded w-4/5" />
                      <div className="h-4 bg-stone-100 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <div className="py-8 text-center bg-white rounded-3xl border border-[#E5E5E5] p-6 sm:p-8 space-y-4 shadow-sm max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-stone-50 border border-[#E5E5E5] flex items-center justify-center text-[#D9A441] mx-auto">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#111111]">
                  {isHindi ? "कोई लेख नहीं मिला" : "No Articles Found"}
                </h3>
                <p className="text-sm text-[#555555]">
                  {isHindi
                    ? "आपकी खोज या चुने गए फ़िल्टर के अनुसार कोई लेख नहीं मिला। कृपया अन्य शब्द खोजें या समस्त लेख देखें।"
                    : "We could not find any articles matching your search or filters. Try adjusting your search query or view all articles."}
                </p>
                <button
                  onClick={() => {
                    setSearchInput("");
                    setSearchParams({});
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFD21F] hover:bg-[#FFD21F]/90 text-[#111111] font-bold text-xs shadow-xs transition-all cursor-pointer border border-[#FFD21F] hover:border-[#D9A441]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{isHindi ? "समस्त लेख देखें" : "Show All Articles"}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111111] flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#D9A441]" />
                    <span>
                      {currentCategory !== "All"
                        ? (isHindi ? `${currentCategory} से संबंधित लेख` : `${currentCategory} Articles`)
                        : (isHindi ? "नवीनतम शास्त्रीय आलेख एवं ज्योतिषीय मार्गदर्शिका" : "Recent Articles & Astrological Guides")}
                    </span>
                  </h2>
                </div>

                {/* 2-Column Responsive Grid on 70% width */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(currentPage === 1 && !currentSearch && !currentTag ? regularBlogs : blogs).map(
                    (blog) => (
                      <BlogCard key={blog.id || blog.slug} blog={blog} />
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Pagination Bar */}
            {pagination.totalPages > 1 && (
              <div className="pt-8 border-t border-[#E5E5E5] flex items-center justify-center gap-2">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => updateParams({ page: pagination.page - 1 })}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-[#E5E5E5] text-xs font-bold text-[#555555] hover:text-[#111111] hover:border-[#D9A441] disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{isHindi ? "पिछला" : "Previous"}</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => updateParams({ page: pageNum })}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        pagination.page === pageNum
                          ? "bg-[#FFD21F] text-[#111111] border border-[#FFD21F] shadow-xs"
                          : "bg-white text-[#555555] hover:text-[#111111] hover:border-[#D9A441] border border-[#E5E5E5]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => updateParams({ page: pagination.page + 1 })}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-[#E5E5E5] text-xs font-bold text-[#555555] hover:text-[#111111] hover:border-[#D9A441] disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs cursor-pointer"
                >
                  <span>{isHindi ? "अगला" : "Next"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
            </div>

            {/* Scholar Dossier Spotlight Card with Scholar Credentials */}
            <div
              id="scholars-spotlight"
              className="scroll-mt-28 p-6 sm:p-7 rounded-3xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] transition-all shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80"
                    alt="Dr. Acharya Vidyadhar Sharma"
                    className="w-18 h-18 rounded-full object-cover ring-2 ring-[#FFD21F] ring-offset-2 flex-shrink-0 shadow-xs"
                  />
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FFD21F] text-[#111111] flex items-center justify-center text-xs font-bold shadow-2xs">
                    ॐ
                  </span>
                </div>
                <div className="text-center sm:text-left space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="font-serif text-xl font-bold text-[#111111]">
                      {isHindi ? "डॉ. आचार्य विद्याधर शर्मा" : "Dr. Acharya Vidyadhar Sharma"}
                    </h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[#111111] border border-[#FFD21F] flex items-center gap-1 shadow-2xs">
                      <Award className="w-3 h-3 text-[#111111]" />
                      {isHindi ? "मुख्य संपादक एवं शोध अध्यक्ष" : "Chief Editor & Research Head"}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-50 text-[#555555] border border-[#E5E5E5]">
                      {isHindi ? "विद्वत समीक्षा परिषद" : "Scholarly Review Council"}
                    </span>
                  </div>

                  <p className="text-xs text-[#555555] leading-relaxed font-sans">
                    {isHindi
                      ? "काशी हिन्दू विश्वविद्यालय एवं संपूर्णानंद संस्कृत विश्वविद्यालय के पूर्व शोधार्थी। चारों वेदों की संहिताओं, वैदिक स्वर विज्ञान एवं यजुर्वेद माध्यन्दिन शाखा के भाष्य संरक्षण में ३०+ वर्षों का अकादमिक व पारंपरिक अनुभव।"
                      : "Alumnus of Banaras Hindu University and Sampurnanand Sanskrit University. 30+ years of scholarly experience in Vedic accent preservation and Madhyandina commentary."}
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] font-medium text-[#111111]">
                    <span className="px-2.5 py-1 rounded-md bg-stone-50 border border-[#E5E5E5]">
                      {isHindi ? "परंपरा: शुक्ल यजुर्वेद वाजसनेयी" : "Tradition: Shukla Yajurveda Vajasaneyi"}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-stone-50 border border-[#E5E5E5]">
                      {isHindi ? "प्रकाशित शोध: ३ प्रमुख ग्रन्थ, ४८ समीक्षाएँ" : "Publications: 3 Treatises, 48 Reviews"}
                    </span>
                    <Link
                      to="/scholars/vidyadhar-sharma"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFD21F] hover:bg-[#FFD21F]/90 text-[#111111] font-bold text-[11px] border border-[#FFD21F] hover:border-[#D9A441] transition-all ml-auto"
                    >
                      <span>{isHindi ? "समस्त विद्वान मंडल देखें" : "View All Scholars"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Shastric Citation Box */}
            <div
              id="citation-standards"
              className="scroll-mt-28 p-6 sm:p-7 rounded-2xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] shadow-xs space-y-4 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-2 text-[#111111] font-bold text-sm">
                  <BookOpen className="w-4 h-4 text-[#D9A441]" />
                  <span className="font-devanagari">
                    {isHindi ? "शास्त्रीय उद्धरण एवं संदर्भ प्रमाण" : "Canonical Citation & Reference Standards"}
                  </span>
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
                    शास्त्रीय
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
                <p className="select-all break-words pr-20">{getRepositoryCitation()}</p>
                <button
                  type="button"
                  onClick={handleCopyCitation}
                  className="absolute top-2 right-2 flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FFD21F] hover:bg-[#FFD21F]/90 text-[#111111] font-bold text-[11px] shadow-2xs transition-all cursor-pointer border border-[#FFD21F]"
                  title="Copy Citation"
                >
                  {citationCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-700" />
                      <span className="text-emerald-800">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#111111]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Archive Metadata & Verification Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-semibold text-[#111111]">
                <span className="px-2.5 py-1 rounded-full bg-stone-50 border border-[#E5E5E5]">
                  Digital Repository Corpus: Veda Library Shastric Archive
                </span>
                <span className="px-2.5 py-1 rounded-full bg-stone-50 border border-[#E5E5E5]">
                  Canonical DOI: 10.VEDA-LIBRARY/ARCHIVE
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#FFD21F] text-[#111111] font-bold">
                  Editorial Peer-Reviewed
                </span>
              </div>
            </div>
          </main>

          {/* Right Column: 30% Astromantra Sidebar (4 Cols on LG) */}
          <aside className="lg:col-span-4 sticky top-20 space-y-6">
            <AstromantraSidebar
              categories={categories}
              currentCategory={currentCategory}
              onSelectCategory={(cat) => updateParams({ category: cat })}
              trendingArticles={blogs}
              currentTag={currentTag}
              onSelectTag={(tag) => updateParams({ tag })}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
