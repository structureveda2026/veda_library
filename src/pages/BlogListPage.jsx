import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  "Lord Shiva",
  "Rudrabhishek",
  "Navgrah",
  "Vedic Astrology",
  "Mantras",
  "Vastu Tips",
  "Ayurveda",
  "Daily Sadhana",
  "Rigveda",
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

  const featuredBlog = blogs.find((b) => b.isFeatured) || (blogs.length > 0 ? blogs[0] : null);
  const regularBlogs = blogs.filter((b) => b.id !== featuredBlog?.id);

  return (
    <div className="bg-[#FBF9F5] min-h-screen pb-20">
      {/* 1. Top Vedic Ribbon & Breadcrumb */}
      <div className="bg-[#FFFDF9] border-b border-amber-200/70 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Breadcrumb Links */}
          <nav className="flex items-center gap-2 text-slate-500 font-medium">
            <Link
              to="/library"
              className="hover:text-amber-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-amber-700" />
              <span>{isHindi ? "पुस्तकालय" : "Library"}</span>
            </Link>
            <span className="text-amber-400">›</span>
            <span className="text-[#78350F] font-bold">
              {isHindi ? "शास्त्रीय आलेख एवं शोध" : "Articles & Blogs"}
            </span>
          </nav>

          {/* Vedic Mantra Motto - Pure Devanagari */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-devanagari font-semibold text-[#78350F] bg-amber-50/80 border border-amber-200/80 px-3 py-0.5 rounded-full shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            <span>ऋग्वेदो यजुर्वेदः सामवेदोऽथर्वणस्तथा • ज्ञानं परमं बलम्</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Header Section with Authentic Vedic Panoramic Banner Strictly Preserved */}
      <section className="relative overflow-hidden bg-slate-950 border-b border-amber-200/80 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        {/* Real Panoramic Banner Background */}
        <div className="absolute inset-0">
          <img
            src={bannerArticlesHero}
            alt="Veda Library Articles & Blogs Hero Banner"
            className="w-full h-full object-cover object-center filter brightness-90 saturate-110"
          />
          {/* Multi-layer spiritual vignette for sublime readability & depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/65 to-slate-950/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.75)_100%)]" />
        </div>

        {/* Content Container on top */}
        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-200 text-xs font-bold shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-devanagari">
              {isHindi ? "वेद व्याख्या एवं शास्त्रीय आलेख" : "Vedic Insights & Commentary"}
            </span>
            <span>•</span>
            <span className="tracking-wide">{isHindi ? "विद्वत विमर्श" : "Scholarly Insights"}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-md">
            {isHindi ? "वेद पुस्तकालय आलेख एवं शोध संग्रह" : "Veda Library Blogs & Articles"}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-amber-100/90 leading-relaxed font-sans drop-shadow-xs">
            {isHindi
              ? "विद्वानों एवं आचार्यों द्वारा रचित प्रामाणिक वैदिक अनुसंधान, पूजा-अनुष्ठान विधान, ज्योतिषीय मार्गदर्शन एवं शास्त्रीय विश्लेषण।"
              : "Authentic commentary, Vedic research, ritual explanations, astrology guides, and shastric wisdom authored by seasoned scholars and practitioners."}
          </p>

          {/* Search Bar & Instant Filter */}
          <div className="max-w-2xl mx-auto pt-3">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-xl rounded-2xl">
              <div className="absolute left-4 text-amber-600 pointer-events-none">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={
                  isHindi
                    ? "लेख, मंत्र, श्लोक, विषय अथवा रचयिता खोजें..."
                    : "Search articles, mantras, shlokas, topics or authors..."
                }
                className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all shadow-md"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-24 p-1.5 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                {isHindi ? "खोजें" : "Search"}
              </button>
            </form>
          </div>

          {/* Popular Tag Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3">
            <span className="text-xs font-semibold text-amber-200/90 flex items-center gap-1 mr-1">
              <Tag className="w-3 h-3 text-amber-400" />
              {isHindi ? "प्रमुख विषय:" : "Trending Topics:"}
            </span>
            {POPULAR_TAGS.map((tag) => {
              const isActive = currentTag.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  onClick={() => updateParams({ tag: isActive ? "" : tag })}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all cursor-pointer backdrop-blur-xs ${
                    isActive
                      ? "bg-amber-500 text-slate-950 font-extrabold shadow-sm ring-1 ring-amber-300"
                      : "bg-black/40 hover:bg-black/60 text-amber-100 border border-amber-400/30 hover:border-amber-300"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
            {currentTag && (
              <button
                onClick={() => updateParams({ tag: "" })}
                className="text-[11px] font-bold text-amber-300 hover:text-amber-200 ml-1 underline cursor-pointer"
              >
                {isHindi ? "टैग हटाएं" : "Clear Tag"}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Prominent Categories Header & Grid at the TOP (8 Topics Strictly Preserved) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-3xl border border-amber-200/70 p-4 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-700 text-white flex items-center justify-center font-bold shadow-xs">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>{isHindi ? "विषय श्रेणियाँ" : "Topic Categories"}</span>
                  <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded-full bg-amber-50 text-[#78350F] border border-amber-200/80">
                    {isHindi ? "८ श्रेणियाँ" : "8 Topics"}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 font-sans">
                  {isHindi
                    ? "प्रामाणिक वैदिक एवं शास्त्रीय विषयों के अनुसार आलेख पढ़ें"
                    : "Browse Vedic insights by canonical topic and category"}
                </p>
              </div>
            </div>

            {currentCategory !== "All" && (
              <button
                onClick={() => updateParams({ category: "All" })}
                className="self-start sm:self-auto text-xs font-bold text-[#78350F] hover:text-amber-950 flex items-center gap-1 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                <span>{isHindi ? "समस्त लेख देखें" : "Show All Articles"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
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

              return (
                <button
                  key={topic.key}
                  onClick={() => updateParams({ category: topic.key })}
                  className={`group relative rounded-2xl border transition-all text-left flex flex-col justify-between overflow-hidden cursor-pointer ${
                    isActive
                      ? "bg-amber-50/80 border-amber-600 shadow-md ring-2 ring-amber-500/70 -translate-y-0.5"
                      : "bg-white hover:bg-amber-50/40 border-amber-200/70 hover:border-amber-400 hover:shadow-xs"
                  }`}
                >
                  {/* Image Container with Elegant Aspect Ratio, Overlay & Badges */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
                    <img
                      src={topic.image}
                      alt={topic.label}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    />
                    {/* Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-black/20" />

                    {/* Count Badge Top-Right */}
                    {count !== null && (
                      <span
                        className={`absolute top-1.5 right-1.5 text-[10px] font-bold px-1.5 py-0.2 rounded-full backdrop-blur-xs border ${
                          isActive
                            ? "bg-amber-500 text-slate-950 border-amber-300 font-extrabold shadow-xs"
                            : "bg-black/60 text-amber-200 border-amber-400/40"
                        }`}
                      >
                        {count}
                      </span>
                    )}

                    {/* Topic Icon Bottom-Left */}
                    <div
                      className={`absolute bottom-1.5 left-1.5 w-5 h-5 rounded-md flex items-center justify-center backdrop-blur-xs ${
                        isActive
                          ? "bg-amber-500 text-slate-950 shadow-xs"
                          : "bg-black/55 text-amber-300 border border-amber-400/30"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Title & Hindi Subtitle */}
                  <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-center">
                    <div
                      className={`font-serif font-bold text-xs sm:text-[13px] leading-tight line-clamp-1 transition-colors ${
                        isActive ? "text-[#78350F]" : "text-slate-900 group-hover:text-amber-800"
                      }`}
                    >
                      {isHindi ? topic.labelHi : topic.label}
                    </div>
                    <div
                      className={`text-[10px] ${isHindi ? "font-sans" : "font-devanagari"} mt-0.5 line-clamp-1 font-medium ${
                        isActive ? "text-[#78350F] font-semibold" : "text-slate-500"
                      }`}
                    >
                      {isHindi ? topic.label : topic.labelHi}
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
            <div className="flex items-center justify-between pb-3 border-b border-amber-200/70">
              <span className="font-semibold text-xs sm:text-sm text-slate-700">
                {currentCategory !== "All"
                  ? `${currentCategory} (${pagination.total} ${isHindi ? "लेख" : "Articles"})`
                  : isHindi
                  ? `कुल ${pagination.total} लेख उपलब्ध`
                  : `Showing ${pagination.total} Articles`}
              </span>

              <div className="flex items-center gap-1.5 bg-white border border-amber-200/80 rounded-xl px-2.5 py-1.5 shadow-2xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
                <select
                  value={currentSort}
                  onChange={(e) => updateParams({ sort: e.target.value })}
                  className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="createdAt">{isHindi ? "नवीनतम (Newest First)" : "Newest First"}</option>
                  <option value="viewsCount">{isHindi ? "सर्वाधिक पठित (Most Read)" : "Most Read"}</option>
                  <option value="title">{isHindi ? "अकारादि क्रम (A-Z)" : "Alphabetical (A-Z)"}</option>
                </select>
              </div>
            </div>

            {/* Active Filters Strip (if any) */}
            {(currentSearch || currentTag || (currentCategory && currentCategory !== "All")) && (
              <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-white border border-amber-200/80 text-xs shadow-xs">
                <span className="font-bold text-[#78350F] flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-amber-700" />
                  {isHindi ? "सक्रिय फ़िल्टर:" : "Active Filters:"}
                </span>

                {currentCategory && currentCategory !== "All" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 font-semibold text-slate-800">
                    {isHindi ? "श्रेणी: " : "Category: "}{currentCategory}
                    <button
                      onClick={() => updateParams({ category: "All" })}
                      className="text-slate-400 hover:text-slate-800 ml-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {currentTag && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 font-semibold text-slate-800">
                    {isHindi ? "टैग: #" : "Tag: #"}{currentTag}
                    <button
                      onClick={() => updateParams({ tag: "" })}
                      className="text-slate-400 hover:text-slate-800 ml-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {currentSearch && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 font-semibold text-slate-800">
                    {isHindi ? "खोज: " : "Search: "}"{currentSearch}"
                    <button
                      onClick={handleClearSearch}
                      className="text-slate-400 hover:text-slate-800 ml-1 cursor-pointer"
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
                  className="text-xs font-bold text-[#78350F] hover:text-amber-950 underline ml-auto cursor-pointer"
                >
                  {isHindi ? "सभी फ़िल्टर रीसेट करें" : "Reset All Filters"}
                </button>
              </div>
            )}

            {/* Featured Article Spotlight (shown on Page 1 if no search/tag) */}
            {currentPage === 1 && !currentSearch && !currentTag && featuredBlog && (
              <div className="space-y-3">
                <FeaturedBlogCard blog={featuredBlog} />
              </div>
            )}

            {/* Articles Grid / Loading / Empty States */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {[1, 2, 3, 4].map((idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-amber-200/60 p-4 space-y-4 animate-pulse shadow-xs"
                  >
                    <div className="aspect-[16/10] bg-amber-100/60 rounded-xl" />
                    <div className="space-y-2">
                      <div className="h-4 bg-amber-100/80 rounded w-1/3" />
                      <div className="h-6 bg-amber-100 rounded w-4/5" />
                      <div className="h-4 bg-amber-100/60 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-3xl border border-amber-200/80 p-8 space-y-4 shadow-sm max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center text-[#78350F] mx-auto">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  {isHindi ? "कोई लेख नहीं मिला" : "No Articles Found"}
                </h3>
                <p className="text-sm text-slate-600">
                  {isHindi
                    ? "आपकी खोज या चुने गए फ़िल्टर के अनुसार कोई लेख नहीं मिला। कृपया अन्य शब्द खोजें या समस्त लेख देखें।"
                    : "We could not find any articles matching your search or filters. Try adjusting your search query or view all articles."}
                </p>
                <button
                  onClick={() => {
                    setSearchInput("");
                    setSearchParams({});
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{isHindi ? "समस्त लेख देखें" : "Show All Articles"}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-700" />
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
              <div className="pt-8 border-t border-amber-200/80 flex items-center justify-center gap-2">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => updateParams({ page: pagination.page - 1 })}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-amber-200/80 text-xs font-bold text-slate-700 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs cursor-pointer"
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
                          ? "bg-amber-800 text-white shadow-xs"
                          : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-200/80"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => updateParams({ page: pagination.page + 1 })}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-amber-200/80 text-xs font-bold text-slate-700 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs cursor-pointer"
                >
                  <span>{isHindi ? "अगला" : "Next"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
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
