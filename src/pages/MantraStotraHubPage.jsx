import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ArrowRight,
  Home,
  Flame,
  Filter,
  Tag,
  Clock,
  Eye,
  SlidersHorizontal,
  X,
  Compass,
} from "lucide-react";
import {
  MANTRAS_STOTRAS_LIST,
  MANTRA_CATEGORIES,
} from "../data/mantraStotraData.js";
import { FALLBACK_BLOG_CATEGORIES, FALLBACK_BLOGS } from "../data/blogFallbackData.js";
import AstromantraSidebar from "../components/blog/AstromantraSidebar.jsx";
import bannerAltar from "../assets/images/library/banners/banner-altar.png";

const DEITIES = [
  { id: "all", label: "All Deities (समस्त देव)" },
  { id: "shiva", label: "Lord Shiva (भगवान शिव)" },
  { id: "vishnu", label: "Lord Vishnu (भगवान विष्णु)" },
  { id: "devi", label: "Maa Lakshmi & Durga (देवी)" },
  { id: "surya", label: "Surya Deva (सूर्य देव)" },
  { id: "vedic", label: "Vedic Rites / Cosmic (वैदिक)" },
];

export default function MantraStotraHubPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get("category") || "all";
  const currentDeity = searchParams.get("deity") || "all";
  const currentSearch = searchParams.get("search") || "";
  const currentTag = searchParams.get("tag") || "";

  const [searchInput, setSearchInput] = useState(currentSearch);
  const [copiedId, setCopiedId] = useState(null);
  const [playingAudioId, setPlayingAudioId] = useState(null);

  // Update query params helper
  const updateParams = (newParams) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "" || value === "all") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
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

  // Copy Shloka
  const handleCopyShloka = (m, e) => {
    e.preventDefault();
    e.stopPropagation();
    const text = `${m.keyVerse.sanskrit}\n\nभावार्थ: ${m.keyVerse.meaningHi}`;
    navigator.clipboard.writeText(text);
    setCopiedId(m.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Audio Chant Simulation
  const handleToggleAudio = (mId, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (playingAudioId === mId) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(mId);
      // Auto-stop after 8 seconds
      setTimeout(() => {
        setPlayingAudioId((prev) => (prev === mId ? null : prev));
      }, 8000);
    }
  };

  // Filtered List
  const filteredMantras = useMemo(() => {
    return MANTRAS_STOTRAS_LIST.filter((item) => {
      // Category filter
      if (currentCategory !== "all" && item.category !== currentCategory) {
        return false;
      }

      // Deity filter
      if (currentDeity !== "all") {
        const deityText = `${item.deity.en} ${item.deity.hi}`.toLowerCase();
        if (currentDeity === "shiva" && !deityText.includes("shiva") && !deityText.includes("शिव") && !deityText.includes("tryambaka")) {
          return false;
        }
        if (currentDeity === "vishnu" && !deityText.includes("vishnu") && !deityText.includes("विष्णु") && !deityText.includes("purusha")) {
          return false;
        }
        if (currentDeity === "devi" && !deityText.includes("lakshmi") && !deityText.includes("लक्ष्मी") && !deityText.includes("savitri") && !deityText.includes("गायत्री")) {
          return false;
        }
        if (currentDeity === "surya" && !deityText.includes("surya") && !deityText.includes("सूर्य") && !deityText.includes("aditya")) {
          return false;
        }
        if (currentDeity === "vedic" && !deityText.includes("virat") && !deityText.includes("विराट्") && !deityText.includes("purusha")) {
          return false;
        }
      }

      // Tag filter
      if (currentTag && !item.tags.some((t) => t.toLowerCase() === currentTag.toLowerCase())) {
        return false;
      }

      // Search query
      if (currentSearch) {
        const q = currentSearch.toLowerCase();
        const matchesTitle = item.title.en.toLowerCase().includes(q) || item.title.hi.includes(q);
        const matchesSubtitle = item.subtitle.en.toLowerCase().includes(q) || item.subtitle.hi.includes(q);
        const matchesVerse = item.keyVerse.sanskrit.includes(q) || item.keyVerse.transliteration.toLowerCase().includes(q);
        const matchesDeity = item.deity.en.toLowerCase().includes(q) || item.deity.hi.includes(q);
        const matchesRishi = item.canonAnga?.rishi?.en.toLowerCase().includes(q) || item.canonAnga?.rishi?.hi.includes(q);
        return matchesTitle || matchesSubtitle || matchesVerse || matchesDeity || matchesRishi;
      }

      return true;
    });
  }, [currentCategory, currentDeity, currentSearch, currentTag]);

  return (
    <div className="bg-[#fffaf0] min-h-screen pb-20">
      {/* 1. Sacred Vedic Ribbon & Breadcrumb */}
      <div className="bg-[#fffdf8] border-b border-amber-200/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <nav className="flex items-center gap-2 text-stone-500 font-medium">
            <Link
              to="/library"
              className="hover:text-amber-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Library</span>
            </Link>
            <span>›</span>
            <span className="text-amber-900 font-bold">Mantra & Stotra Sanctuary (मंत्र एवं स्तोत्र साधना)</span>
          </nav>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-devanagari font-semibold text-amber-900/90 bg-amber-100/70 border border-amber-300/60 px-3 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            <span>ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्</span>
          </div>
        </div>
      </div>

      {/* 2. Astromantra-Grade Hero Header */}
      <section className="relative overflow-hidden bg-[#170e07] text-white border-b border-amber-900/60 pt-12 pb-14 px-4 sm:px-6 lg:px-8 shadow-xl">
        {/* Real Authentic Altar Banner Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={bannerAltar}
            alt="Vedic Mantra Altar"
            className="w-full h-full object-cover object-center opacity-75 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140b05] via-[#1c1108]/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-[#140b05]/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-devanagari">षडङ्ग विधान एवं सस्वर पाठ</span>
            <span>•</span>
            <span>Authentic Chanting Archive</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            Vedic Mantras, Stotras & Suktas
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-amber-100/90 leading-relaxed font-sans drop-shadow-xs">
            Sanskrit verses with complete 6-Fold Vedic Canon (Rishi, Chhandas, Devata, Beejam, Shakti, Keelakam), pronunciation guide, Japa Vidhi rules, and four-dimensional benefits.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto pt-3">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-lg rounded-2xl">
              <div className="absolute left-4 text-amber-600 pointer-events-none">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search mantras (e.g. Maha Mrityunjaya, Gayatri, Shiva Tandava, Kanakadhara)..."
                className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-amber-300 text-sm text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all shadow-md"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-24 p-1.5 rounded-full text-stone-400 hover:text-stone-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>

          {/* Deity Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {DEITIES.map((deity) => {
              const isActive = currentDeity === deity.id;
              return (
                <button
                  key={deity.id}
                  onClick={() => updateParams({ deity: deity.id })}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all cursor-pointer backdrop-blur-sm ${
                    isActive
                      ? "bg-amber-500 text-white shadow-md ring-2 ring-amber-300 font-bold"
                      : "bg-[#1f130b]/80 border border-amber-700/50 text-amber-200/90 hover:bg-amber-900/60 hover:text-white"
                  }`}
                >
                  {deity.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Main 70/30 Astromantra Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 68-70% (8 Cols on LG) */}
          <main className="lg:col-span-8 space-y-6">
            {/* Category Filter Pills & Counter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/70">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {MANTRA_CATEGORIES.map((cat) => {
                  const isActive = currentCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => updateParams({ category: cat.id })}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? "bg-amber-700 text-white shadow-2xs font-bold"
                          : "bg-white text-stone-700 hover:bg-amber-100 border border-amber-200"
                      }`}
                    >
                      <span>{cat.nameHi}</span>
                    </button>
                  );
                })}
              </div>

              {/* Count Indicator */}
              <div className="text-xs font-semibold text-stone-600 flex-shrink-0">
                <span>उपलब्ध: </span>
                <strong className="text-amber-900 font-bold">{filteredMantras.length}</strong>
                <span> पावन मंत्र व स्तोत्र</span>
              </div>
            </div>

            {/* Active Filters Bar (if active) */}
            {(currentSearch || currentTag || currentCategory !== "all" || currentDeity !== "all") && (
              <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-xs">
                <span className="font-bold text-amber-950 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-amber-700" />
                  Active Filters:
                </span>

                {currentCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-amber-300 font-semibold text-stone-800">
                    Category: {MANTRA_CATEGORIES.find((c) => c.id === currentCategory)?.nameHi || currentCategory}
                    <button onClick={() => updateParams({ category: "all" })} className="text-stone-400 hover:text-stone-800 ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {currentDeity !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-amber-300 font-semibold text-stone-800">
                    Deity: {DEITIES.find((d) => d.id === currentDeity)?.label || currentDeity}
                    <button onClick={() => updateParams({ deity: "all" })} className="text-stone-400 hover:text-stone-800 ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {currentSearch && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-amber-300 font-semibold text-stone-800">
                    Search: "{currentSearch}"
                    <button onClick={handleClearSearch} className="text-stone-400 hover:text-stone-800 ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={() => setSearchParams({})}
                  className="text-xs font-bold text-amber-900 hover:text-amber-950 underline ml-auto cursor-pointer"
                >
                  Reset All
                </button>
              </div>
            )}

            {/* Mantras & Stotras Stream Cards */}
            {filteredMantras.length === 0 ? (
              <div className="bg-white rounded-2xl border border-amber-200 p-10 text-center space-y-3">
                <BookOpen className="w-10 h-10 text-amber-600 mx-auto opacity-70" />
                <h3 className="font-serif text-lg font-bold text-stone-800">
                  कोई मंत्र या स्तोत्र नहीं मिला (No Mantras Found)
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  कृपया भिन्न कीवर्ड अथवा श्रेणी का चयन करें।
                </p>
                <button
                  onClick={() => setSearchParams({})}
                  className="px-4 py-2 rounded-xl bg-amber-700 text-white font-bold text-xs"
                >
                  सभी मंत्र देखें
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredMantras.map((mantra) => {
                  const isAudioPlaying = playingAudioId === mantra.id;
                  const isCopied = copiedId === mantra.id;

                  return (
                    <article
                      key={mantra.id}
                      className="bg-white rounded-2xl border-2 border-amber-200/80 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                    >
                      {/* Top Header Strip */}
                      <div className="bg-gradient-to-r from-amber-50 via-[#fffbf3] to-amber-50 px-5 py-3 border-b border-amber-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-900 text-amber-100 font-bold text-[10px] uppercase tracking-wider">
                            {mantra.categoryLabel?.hi || mantra.category}
                          </span>
                          <span className="text-stone-400">•</span>
                          <span className="font-semibold text-amber-950 flex items-center gap-1 text-[11px]">
                            <Flame className="w-3.5 h-3.5 text-amber-600" />
                            {mantra.deity?.hi || mantra.deity?.en}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-stone-500 text-[11px] font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-600" />
                            {mantra.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-amber-600" />
                            {mantra.viewsCount?.toLocaleString()} पाठ
                          </span>
                        </div>
                      </div>

                      {/* Card Content Area */}
                      <div className="p-5 sm:p-6 space-y-4">
                        {/* Bilingual Titles */}
                        <div>
                          <Link
                            to={`/library/mantra-stotra/${mantra.slug}`}
                            className="group-hover:text-amber-800 transition-colors"
                          >
                            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                              {mantra.title.hi}
                            </h2>
                            <p className="font-sans text-xs sm:text-sm font-semibold text-stone-600 mt-1">
                              {mantra.title.en}
                            </p>
                          </Link>
                          <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                            {mantra.subtitle.hi}
                          </p>
                        </div>

                        {/* Sacred Altar Shloka Box (Devanagari Box) */}
                        <div className="relative rounded-2xl bg-gradient-to-br from-[#fffdf8] via-[#fcf5e7] to-[#faedd0] border-2 border-amber-300/80 p-5 shadow-inner">
                          {/* Top Om Emblem */}
                          <div className="flex items-center justify-between pb-3 border-b border-amber-300/60 text-xs">
                            <span className="font-devanagari font-bold text-amber-950 flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-amber-700 text-white flex items-center justify-center text-[10px] font-bold">
                                ॐ
                              </span>
                              मूल संस्कृत श्लोक एवं पाठ
                            </span>

                            <div className="flex items-center gap-1.5">
                              {/* Audio Simulation Button */}
                              <button
                                onClick={(e) => handleToggleAudio(mantra.id, e)}
                                title="सस्वर ध्वनि उच्चारण"
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                                  isAudioPlaying
                                    ? "bg-amber-700 text-white shadow-xs animate-pulse"
                                    : "bg-white/80 hover:bg-amber-100 text-stone-700 border border-amber-200"
                                }`}
                              >
                                {isAudioPlaying ? (
                                  <>
                                    <VolumeX className="w-3.5 h-3.5" />
                                    <span>ध्वनि तरंग...</span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                                    <span>ध्वनि श्रवण</span>
                                  </>
                                )}
                              </button>

                              {/* Copy Shloka Button */}
                              <button
                                onClick={(e) => handleCopyShloka(mantra, e)}
                                title="श्लोक कॉपी करें"
                                className="p-1.5 rounded-lg bg-white/80 hover:bg-amber-100 text-stone-700 border border-amber-200 transition-colors cursor-pointer"
                              >
                                {isCopied ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5 text-amber-800" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Sanskrit Recitation Text (Pure Authentic Devanagari) */}
                          <div className="py-3 text-center">
                            <p className="font-devanagari text-base sm:text-lg font-bold text-amber-950 leading-relaxed whitespace-pre-line">
                              {mantra.keyVerse.sanskrit}
                            </p>
                          </div>

                          {/* Quick Meaning Preview */}
                          <div className="pt-3 border-t border-amber-300/60 text-xs text-stone-700 font-devanagari line-clamp-2">
                            <strong className="text-amber-900">भावार्थ: </strong>
                            {mantra.keyVerse.meaningHi}
                          </div>
                        </div>

                        {/* 6-Fold Vedic Canon (षडङ्ग विधान) Strip */}
                        {mantra.canonAnga && (
                          <div className="bg-amber-50/70 rounded-xl p-3 border border-amber-200/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                            <span className="font-bold text-amber-950 flex items-center gap-1 text-[11px]">
                              <Sparkles className="w-3 h-3 text-amber-700" />
                              षडङ्ग विधान:
                            </span>
                            <span className="text-stone-700">
                              <strong className="text-stone-900 font-semibold">ऋषि:</strong>{" "}
                              {mantra.canonAnga.rishi?.hi}
                            </span>
                            <span className="text-stone-700">
                              <strong className="text-stone-900 font-semibold">छन्द:</strong>{" "}
                              {mantra.canonAnga.chhandas?.hi}
                            </span>
                            <span className="text-stone-700">
                              <strong className="text-stone-900 font-semibold">देवता:</strong>{" "}
                              {mantra.canonAnga.devata?.hi}
                            </span>
                          </div>
                        )}

                        {/* Sadhana Vidhi Quick Strip */}
                        {mantra.vidhi && (
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-stone-600">
                            <span>
                              <strong className="text-stone-800 font-semibold">मुहूर्त:</strong>{" "}
                              {mantra.vidhi.muhurat?.hi}
                            </span>
                            <span>•</span>
                            <span>
                              <strong className="text-stone-800 font-semibold">माला:</strong>{" "}
                              {mantra.vidhi.mala?.hi}
                            </span>
                            <span>•</span>
                            <span>
                              <strong className="text-stone-800 font-semibold">जप संख्या:</strong>{" "}
                              {mantra.vidhi.sankhya?.hi}
                            </span>
                          </div>
                        )}

                        {/* Action Footer */}
                        <div className="pt-3 border-t border-amber-100 flex items-center justify-between">
                          <div className="flex flex-wrap gap-1.5">
                            {mantra.tags?.slice(0, 3).map((tag) => (
                              <button
                                key={tag}
                                onClick={() => updateParams({ tag })}
                                className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/60 hover:bg-amber-100 transition-colors"
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>

                          <Link
                            to={`/library/mantra-stotra/${mantra.slug}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white shadow-xs hover:shadow-md transition-all group-hover:translate-x-0.5 cursor-pointer"
                          >
                            <span>पूर्ण पाठ, विधि एवं फलश्रुति</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </main>

          {/* Right Column: 30-32% Astromantra Sidebar (4 Cols on LG) */}
          <aside className="lg:col-span-4 sticky top-20 space-y-6">
            <AstromantraSidebar
              categories={FALLBACK_BLOG_CATEGORIES}
              trendingArticles={FALLBACK_BLOGS}
              currentTag={currentTag}
              onSelectTag={(tag) => updateParams({ tag })}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
