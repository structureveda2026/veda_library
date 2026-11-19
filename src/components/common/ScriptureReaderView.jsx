import React, { useState, useEffect, useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  BookOpen,
  Sparkles,
  Copy,
  Check,
  Share2,
  Volume2,
  VolumeX,
  Type,
  ArrowRight,
  Flame,
  List,
  Eye,
  SlidersHorizontal,
} from "lucide-react";

/**
 * Universal Scripture & Sutra Reader Component
 * Sourced from authentic shastras, strictly compliant with Client 5 Master Colors:
 * #FFFFFF (65% Canvas), #FFD21F (15% Brand/CTA), #111111 (12% Text), #D9A441 (5% Gold), #C62828 (3% Red)
 *
 * Craftsmanship Standards:
 * - Pure Devanagari Sanskrit verses in Noto Serif Devanagari (0% Roman/IAST transliteration)
 * - Sacred golden quotation / danda ornaments (॥ ॐ ॥, ॥ इति ॥, border-l-4 #D9A441)
 * - Segmented trilingual tabs (हिन्दी, English, हिंग्लिश, त्रिभाषी All 3)
 * - 1-Click Copy verse & Native Share
 * - Font size adjuster (A-, A, A+)
 * - Web Speech API audio chanter with serene Vedic cadence (0.85 rate)
 * - Chapters Table with crisp 1px borders, subtle hover row highlight, and jump-to-verse actions
 */
export default function ScriptureReaderView({ scripture, initialChapterId = null }) {
  const { isHindi, isEnglish } = useLanguage();

  if (!scripture || !scripture.chapters || scripture.chapters.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E5E5E5] bg-white p-8 text-center text-[#555555] font-devanagari">
        <BookOpen className="w-8 h-8 text-[#D9A441] mx-auto mb-2" />
        <p className="text-base font-bold text-[#111111]">
          {isHindi ? "इस ग्रंथ का पाठ संकलन लोड हो रहा है..." : "Loading scripture text compilation..."}
        </p>
      </div>
    );
  }
  const [selectedChapterId, setSelectedChapterId] = useState(
    initialChapterId && scripture.chapters.some((c) => c.id === initialChapterId)
      ? initialChapterId
      : scripture.chapters[0]?.id || "",
  );
  const [viewMode, setViewMode] = useState("reader"); // "reader" | "chapters"
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpTo, setJumpTo] = useState("");
  const [searchText, setSearchText] = useState("");
  const [readerLanguage, setReaderLanguage] = useState(isEnglish ? "english" : "all"); // "all" | "hindi" | "english" | "hinglish"
  const [fontSize, setFontSize] = useState("default"); // "small" | "default" | "large"

  useEffect(() => {
    if (isEnglish) {
      setReaderLanguage("english");
    } else {
      setReaderLanguage("all");
    }
  }, [isEnglish]);
  const [copiedNumber, setCopiedNumber] = useState(null);
  const [playingNumber, setPlayingNumber] = useState(null);
  const [tableSearch, setTableSearch] = useState("");
  const [tableJumpVerse, setTableJumpVerse] = useState({});

  const selectedChapter =
    scripture.chapters.find((chapter) => chapter.id === selectedChapterId) ||
    scripture.chapters[0];

  useEffect(() => {
    if (scripture?.chapters?.length > 0) {
      if (!scripture.chapters.some((c) => c.id === selectedChapterId)) {
        setSelectedChapterId(scripture.chapters[0].id);
      }
    }
  }, [scripture]);

  useEffect(() => {
    if (initialChapterId && scripture.chapters.some((c) => c.id === initialChapterId)) {
      setSelectedChapterId(initialChapterId);
    }
  }, [initialChapterId]);

  useEffect(() => {
    setCurrentPage(1);
    setJumpTo("");
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setPlayingNumber(null);
  }, [selectedChapterId, pageSize]);

  // Clean speech synthesis cleanup
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeech = (item) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (playingNumber === item.number) {
      window.speechSynthesis.cancel();
      setPlayingNumber(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(item.devanagari);
    utterance.lang = "hi-IN";
    utterance.rate = 0.85; // Serene Vedic cadence
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setPlayingNumber(null);
    };

    utterance.onerror = () => {
      setPlayingNumber(null);
    };

    setPlayingNumber(item.number);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyVerse = (item) => {
    const textToCopy = `“${item.devanagari}”\n\nश्लोक / सूत्र: ${item.number}\n${
      item.hindi ? `हिन्दी भावार्थ: ${item.hindi}\n` : ""
    }${item.english ? `English Translation: ${item.english}\n` : ""}${
      item.hinglish ? `सरल हिंग्लिश व्याख्या: ${item.hinglish}\n` : ""
    }— ${scripture.title} (Veda Library)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedNumber(item.number);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const handleShareVerse = (item) => {
    if (navigator.share) {
      navigator
        .share({
          title: `${scripture.title} — श्लोक ${item.number}`,
          text: `“${item.devanagari}”\n\n${item.hindi || item.english || ""}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      handleCopyVerse(item);
    }
  };

  // Pure Devanagari Sanskrit search filter (NO transliteration)
  const filteredItems = useMemo(() => {
    if (!selectedChapter) return [];
    if (!searchText.trim()) return selectedChapter.items;

    const q = searchText.trim().toLowerCase();
    return selectedChapter.items.filter((item) => {
      return (
        String(item.number).includes(q) ||
        (item.devanagari && item.devanagari.toLowerCase().includes(q)) ||
        (item.hindi && item.hindi.toLowerCase().includes(q)) ||
        (item.english && item.english.toLowerCase().includes(q)) ||
        (item.hinglish && item.hinglish.toLowerCase().includes(q)) ||
        (item.commentary && item.commentary.toLowerCase().includes(q))
      );
    });
  }, [selectedChapter, searchText]);

  const availableCount = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(availableCount / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const visibleItems = filteredItems.slice(startIndex, startIndex + pageSize);

  const handleJump = () => {
    const value = Number(jumpTo);
    if (!Number.isFinite(value) || value < 1) return;

    const itemIndex = filteredItems.findIndex(
      (item) => Number(item.number) === value,
    );
    if (itemIndex !== -1) {
      const targetPage = Math.floor(itemIndex / pageSize) + 1;
      setCurrentPage(targetPage);
      return;
    }

    const targetPage = Math.min(
      Math.max(1, value <= totalPages ? value : Math.ceil(value / pageSize)),
      totalPages,
    );
    setCurrentPage(targetPage);
  };

  const navigatePage = (direction) => {
    setCurrentPage((prev) =>
      Math.min(Math.max(1, prev + direction), totalPages),
    );
  };

  const isPaginated = totalPages > 1;
  const showPageSizeSelect = availableCount > 10;

  // Pagination window helper
  const getPaginationNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (safePage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (safePage >= totalPages - 3) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", safePage - 1, safePage, safePage + 1, "...", totalPages];
  };

  // Font sizing classes
  const fontSizes = {
    small: "text-base sm:text-lg leading-[1.85]",
    default: "text-lg sm:text-xl md:text-2xl leading-[2.15]",
    large: "text-xl sm:text-2xl md:text-3xl leading-[2.35]",
  };

  // Filtered Chapters for the Chapters Table
  const filteredChapters = useMemo(() => {
    if (!tableSearch.trim()) return scripture.chapters;
    const q = tableSearch.trim().toLowerCase();
    return scripture.chapters.filter((ch, idx) => {
      return (
        String(idx + 1).includes(q) ||
        ch.title.toLowerCase().includes(q) ||
        (ch.id && ch.id.toLowerCase().includes(q))
      );
    });
  }, [scripture.chapters, tableSearch]);

  const handleChapterTableSelect = (chapterId, verseNumber = null) => {
    setSelectedChapterId(chapterId);
    setViewMode("reader");
    if (verseNumber) {
      const targetChapter = scripture.chapters.find((c) => c.id === chapterId);
      if (targetChapter) {
        const itemIndex = targetChapter.items.findIndex(
          (item) => Number(item.number) === Number(verseNumber),
        );
        if (itemIndex !== -1) {
          const targetPage = Math.floor(itemIndex / pageSize) + 1;
          setCurrentPage(targetPage);
        }
      }
    }
  };

  return (
    <div className="rounded-2xl border border-[#E5E5E5] bg-white p-5 md:p-6 shadow-xs">
      {/* 1. Header Controls: Chapter Selector & View Mode & Font Resizer */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between pb-4 border-b border-[#E5E5E5]">
        {/* Left: Chapter Selector & View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Segmented View Mode Switcher */}
          <div className="inline-flex rounded-xl bg-stone-50 p-1 border border-[#E5E5E5] gap-1">
            <button
              type="button"
              onClick={() => setViewMode("reader")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                viewMode === "reader"
                  ? "bg-[#FFD21F] text-[#111111] font-bold shadow-2xs border border-[#FFD21F]"
                  : "text-[#555555] hover:text-[#111111] hover:bg-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#111111]" />
              <span>{isHindi ? "पाठांश वाचन" : "Text Reader"}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("chapters")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                viewMode === "chapters"
                  ? "bg-[#FFD21F] text-[#111111] font-bold shadow-2xs border border-[#FFD21F]"
                  : "text-[#555555] hover:text-[#111111] hover:bg-white"
              }`}
            >
              <List className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{isHindi ? "अध्याय सारणी" : "Chapter Index"} ({scripture.chapters.length})</span>
            </button>
          </div>

          {viewMode === "reader" && (
            <div className="flex items-center gap-2 flex-wrap">
              <label className="text-xs font-bold uppercase tracking-wider text-[#555555]">
                {isHindi ? "अध्याय:" : "Chapter:"}
              </label>
              <select
                value={selectedChapterId}
                onChange={(e) => setSelectedChapterId(e.target.value)}
                className="rounded-xl border border-[#E5E5E5] bg-white px-3 py-2 text-xs font-semibold text-[#111111] focus:border-[#D9A441] outline-none max-w-full sm:max-w-md shadow-2xs"
              >
                {scripture.chapters.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.title} ({chapter.items.length} {isHindi ? "श्लोक/सूत्र" : "verses/sutras"})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Right: Font Sizing Controls & Page Size */}
        <div className="flex flex-wrap items-center gap-2.5">
          {viewMode === "reader" && (
            <>
              {/* Font Resizer (A-, A, A+) */}
              <div className="flex items-center gap-1 bg-stone-50 border border-[#E5E5E5] rounded-xl p-1 shadow-2xs">
                <span className="text-[11px] font-bold text-[#555555] px-1.5 flex items-center gap-1">
                  <Type className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>{isHindi ? "अक्षर:" : "Font:"}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setFontSize("small")}
                  title={isHindi ? "छोटा अक्षर" : "Small Font"}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                    fontSize === "small"
                      ? "bg-[#FFD21F] text-[#111111] shadow-2xs border border-[#FFD21F]"
                      : "text-[#555555] hover:text-[#111111] hover:bg-white"
                  }`}
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize("default")}
                  title={isHindi ? "सामान्य अक्षर" : "Default Font"}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                    fontSize === "default"
                      ? "bg-[#FFD21F] text-[#111111] shadow-2xs border border-[#FFD21F]"
                      : "text-[#555555] hover:text-[#111111] hover:bg-white"
                  }`}
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize("large")}
                  title={isHindi ? "बड़ा अक्षर" : "Large Font"}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                    fontSize === "large"
                      ? "bg-[#FFD21F] text-[#111111] shadow-2xs border border-[#FFD21F]"
                      : "text-[#555555] hover:text-[#111111] hover:bg-white"
                  }`}
                >
                  A+
                </button>
              </div>

              {showPageSizeSelect && (
                <div className="flex items-center gap-1.5">
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="rounded-xl border border-[#E5E5E5] bg-white px-3 py-2 text-xs font-semibold text-[#111111] focus:border-[#D9A441] outline-none shadow-2xs"
                  >
                    <option value={10}>{isHindi ? "10 प्रति पृष्ठ" : "10 per page"}</option>
                    <option value={20}>{isHindi ? "20 प्रति पृष्ठ" : "20 per page"}</option>
                  </select>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW A: CHAPTERS TABLE (अध्याय सारणी with 1px borders, subtle hover, jump actions) */}
      {/* ========================================================================= */}
      {viewMode === "chapters" ? (
        <div className="mt-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#111111] flex items-center gap-2">
                <List className="w-4 h-4 text-[#D9A441]" />
                <span>{isHindi ? "समस्त अध्याय सारणी एवं त्वरित श्लोक चयन" : "Chapter Index & Direct Verse Selection"}</span>
              </h3>
              <p className="text-xs text-[#555555] font-devanagari mt-0.5">
                {isHindi
                  ? "किसी भी अध्याय पर क्लिक करके तुरंत उसका पाठ आरंभ करें अथवा सीधे अभीष्ट श्लोक संख्या पर जाएँ।"
                  : "Click any chapter to begin reading or jump directly to desired verse number."}
              </p>
            </div>

            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-[#D9A441] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                placeholder={isHindi ? "अध्याय खोजें..." : "Search chapter..."}
                className="w-full pl-8 pr-7 py-2 rounded-xl border border-[#E5E5E5] bg-white text-xs focus:border-[#D9A441] outline-none text-[#111111] shadow-2xs"
              />
              {tableSearch && (
                <button
                  type="button"
                  onClick={() => setTableSearch("")}
                  className="p-1 text-[#555555] hover:text-[#111111] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Crisp 1px Border Table */}
          <div className="rounded-2xl border border-[#E5E5E5] overflow-hidden bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-[#E5E5E5] text-[#555555] font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4 w-14 text-center">#</th>
                    <th className="py-3 px-4">{isHindi ? "अध्याय शीर्षक / सूक्त" : "Chapter Title / Sukta"}</th>
                    <th className="py-3 px-4 w-32 text-center">{isHindi ? "श्लोक परिमाण" : "Verse Count"}</th>
                    <th className="py-3 px-4 w-44 text-center">{isHindi ? "त्वरित श्लोक चयन" : "Direct Verse Jump"}</th>
                    <th className="py-3 px-4 w-36 text-right">{isHindi ? "पठन क्रिया" : "Action"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {filteredChapters.map((chapter, index) => {
                    const isCurrent = chapter.id === selectedChapterId;
                    const verseInput = tableJumpVerse[chapter.id] || "";

                    return (
                      <tr
                        key={chapter.id}
                        className={`transition-colors duration-150 cursor-pointer ${
                          isCurrent
                            ? "bg-[#FFD21F]/10 font-medium"
                            : "hover:bg-amber-500/5 bg-white"
                        }`}
                        onClick={() => handleChapterTableSelect(chapter.id)}
                      >
                        {/* Number */}
                        <td className="py-3.5 px-4 text-center font-bold text-[#111111]">
                          <span
                            className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-xs ${
                              isCurrent
                                ? "bg-[#FFD21F] text-[#111111] font-bold border border-[#FFD21F]"
                                : "bg-stone-100 text-[#555555]"
                            }`}
                          >
                            {index + 1}
                          </span>
                        </td>

                        {/* Title */}
                        <td className="py-3.5 px-4 font-serif text-sm font-bold text-[#111111]">
                          <div className="flex items-center gap-2">
                            <span>{chapter.title}</span>
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-full bg-[#FFD21F] text-[#111111] text-[10px] font-bold border border-[#FFD21F]">
                                {isHindi ? "सक्रिय" : "Active"}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Verse Count */}
                        <td className="py-3.5 px-4 text-center text-[#555555] font-semibold">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-50 border border-[#E5E5E5] text-[11px]">
                            <BookOpen className="w-3 h-3 text-[#D9A441]" />
                            <span>{chapter.items.length} {isHindi ? "श्लोक" : "verses"}</span>
                          </span>
                        </td>

                        {/* Quick Jump to Verse Input */}
                        <td
                          className="py-3.5 px-4 text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="inline-flex items-center gap-1.5">
                            <input
                              type="number"
                              min="1"
                              max={chapter.items.length}
                              placeholder={isHindi ? "श्लोक #" : "Verse #"}
                              value={verseInput}
                              onChange={(e) =>
                                setTableJumpVerse((prev) => ({
                                  ...prev,
                                  [chapter.id]: e.target.value,
                                }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && verseInput) {
                                  handleChapterTableSelect(chapter.id, verseInput);
                                }
                              }}
                              className="w-16 px-2 py-1 text-xs rounded-lg border border-[#E5E5E5] bg-white text-[#111111] outline-none focus:border-[#D9A441] text-center"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (verseInput) {
                                  handleChapterTableSelect(chapter.id, verseInput);
                                }
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#FFD21F] hover:bg-[#ffe052] text-[#111111] font-bold text-xs shadow-2xs border border-[#FFD21F] cursor-pointer"
                            >
                              {isHindi ? "जाएँ" : "Go"}
                            </button>
                          </div>
                        </td>

                        {/* Read Action Button */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleChapterTableSelect(chapter.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#FFD21F] text-[#111111] font-bold text-xs border border-[#E5E5E5] hover:border-[#FFD21F] shadow-2xs transition-all cursor-pointer"
                          >
                            <span>{isHindi ? "पाठ पढ़ें" : "Read"}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#D9A441]" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* VIEW B: SCRIPTURE READER VIEW (Pure Devanagari, Trilingual Tabs, Copy/Share) */
        /* ========================================================================= */
        <>
          {/* 2. Middle Stats Bar & In-Chapter Search */}
          <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="rounded-xl border border-[#E5E5E5] bg-stone-50/70 p-3.5 text-xs sm:text-sm text-[#111111] flex flex-col md:flex-row md:items-center justify-between gap-2.5 w-full shadow-2xs">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <div>
                  <span className="font-bold text-[#111111]">{isHindi ? "पारंपरिक कुल परिमाण:" : "Traditional Total Corpus:"}</span>{" "}
                  <span className="font-semibold text-[#555555]">{scripture.sourceTotal}</span>
                </div>
                <span className="hidden md:inline text-[#D9A441]">•</span>
                <div>
                  <span className="font-bold text-[#111111]">{isHindi ? "अध्याय में उपलब्ध:" : "Available in Chapter:"}</span>{" "}
                  <span className="font-bold text-[#D9A441]">{availableCount} {isHindi ? "श्लोक/सूत्र" : "verses/sutras"}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#111111] bg-[#FFD21F] px-2.5 py-1 rounded-md border border-[#FFD21F]">
                  {isPaginated ? (isHindi ? "क्रमबद्ध पृष्ठीय वाचन" : "Paginated View") : (isHindi ? "सम्पूर्ण पाठांश दृश्य" : "Complete Chapter View")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="relative min-w-[200px]">
                <Search className="w-3.5 h-3.5 text-[#D9A441] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder={isHindi ? "श्लोक, अनुवाद या सूत्र खोजें..." : "Search verse, translation or sutra..."}
                  className="w-full pl-8 pr-7 py-2 rounded-xl border border-[#E5E5E5] bg-white text-xs focus:border-[#D9A441] outline-none font-devanagari text-[#111111] shadow-2xs"
                />
              </div>
              {searchText && (
                <button
                  type="button"
                  onClick={() => setSearchText("")}
                  className="rounded-xl border border-[#E5E5E5] bg-white px-2.5 py-2 text-xs font-bold text-[#555555] hover:bg-stone-50 cursor-pointer shadow-2xs"
                >
                  {isHindi ? "हटाएँ" : "Clear"}
                </button>
              )}
            </div>
          </div>

          {/* 3. Segmented Trilingual Tabs Bar (हिन्दी • English • हिंग्लिश • त्रिभाषी All 3) */}
          <div className="mt-4 flex items-center justify-between flex-wrap gap-2.5 p-3 rounded-2xl bg-[#FFFFFF] border border-[#E5E5E5] shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#111111]">
              <Sparkles className="w-4 h-4 text-[#D9A441]" />
              <span>{isHindi ? "व्याख्या एवं भावार्थ भाषा:" : "Translation & Meaning Mode:"}</span>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto text-xs font-bold p-1 rounded-xl bg-stone-50 border border-[#E5E5E5]">
              {[
                { id: "all", label: isHindi ? "त्रिभाषी दृश्य" : "All 3 Languages" },
                { id: "hindi", label: isHindi ? "हिन्दी भावार्थ" : "Hindi Meaning" },
                { id: "english", label: isHindi ? "English अनुवाद" : "English Translation" },
                { id: "hinglish", label: isHindi ? "सरल हिंग्लिश" : "Hinglish Guide" },
              ].map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setReaderLanguage(lang.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    readerLanguage === lang.id
                      ? "bg-[#FFD21F] text-[#111111] shadow-2xs font-bold border border-[#FFD21F]"
                      : "text-[#555555] hover:text-[#111111] hover:bg-white"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Top Pagination Controls (if paginated) */}
          {isPaginated && (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#E5E5E5] pb-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safePage <= 1}
                  onClick={() => navigatePage(-1)}
                  className="inline-flex items-center gap-1 rounded-xl border border-[#E5E5E5] hover:border-[#D9A441] bg-white px-3 py-2 text-xs font-bold text-[#111111] disabled:opacity-40 hover:bg-stone-50 cursor-pointer disabled:cursor-not-allowed shadow-2xs transition-all"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>{isHindi ? "पिछला" : "Previous"}</span>
                </button>
                <button
                  type="button"
                  disabled={safePage >= totalPages}
                  onClick={() => navigatePage(1)}
                  className="inline-flex items-center gap-1 rounded-xl border border-[#E5E5E5] hover:border-[#D9A441] bg-white px-3 py-2 text-xs font-bold text-[#111111] disabled:opacity-40 hover:bg-stone-50 cursor-pointer disabled:cursor-not-allowed shadow-2xs transition-all"
                >
                  <span>{isHindi ? "अगला" : "Next"}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D9A441]" />
                </button>
                <span className="text-xs text-[#555555]">
                  {isHindi ? `पृष्ठ ${safePage} / ${totalPages}` : `Page ${safePage} of ${totalPages}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#555555]">{isHindi ? "श्लोक संख्या:" : "Jump to verse:"}</span>
                <input
                  type="number"
                  min="1"
                  value={jumpTo}
                  onChange={(e) => setJumpTo(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleJump()}
                  placeholder={isHindi ? "संख्या..." : "Verse #..."}
                  className="w-20 rounded-xl border border-[#E5E5E5] bg-white px-2.5 py-1.5 text-xs text-[#111111] outline-none focus:border-[#D9A441]"
                />
                <button
                  type="button"
                  onClick={handleJump}
                  className="rounded-xl bg-[#FFD21F] hover:bg-[#ffe052] px-3 py-1.5 text-xs font-bold text-[#111111] cursor-pointer shadow-2xs border border-[#FFD21F] transition-colors"
                >
                  {isHindi ? "जाएँ" : "Go"}
                </button>
              </div>
            </div>
          )}

          {/* 5. Verses Reading Cards */}
          <div className="mt-5 space-y-6">
            {visibleItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#E5E5E5] p-8 text-center text-[#555555]">
                <p className="text-sm font-bold text-[#111111]">
                  {isHindi
                    ? "इस खोज अथवा अध्याय में कोई श्लोक/सूत्र उपलब्ध नहीं है।"
                    : "No verses or sutras available in this search/chapter."}
                </p>
              </div>
            ) : (
              visibleItems.map((item) => {
                const isPlayingThis = playingNumber === item.number;
                const isCopiedThis = copiedNumber === item.number;

                return (
                  <article
                    key={item.number}
                    className="group rounded-2xl border border-[#E5E5E5] hover:border-[#D9A441] bg-white p-5 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Top Golden Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#D9A441]" />

                    {/* Verse Header Row */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-[#E5E5E5] gap-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFD21F] text-[#111111] text-xs font-bold border border-[#FFD21F] shadow-2xs">
                          <Flame className="w-3 h-3 text-[#C62828]" />
                          <span>{isHindi ? `श्लोक / सूत्र ${item.number}` : `Verse / Sutra ${item.number}`}</span>
                        </span>
                        <span className="text-xs text-[#555555] font-serif hidden sm:inline">
                          {selectedChapter.title.split("•")[0]?.trim()}
                        </span>
                      </div>

                      {/* Actions: Audio Chanting, Copy & Share */}
                      <div className="flex items-center gap-1.5">
                        {/* Audio Chanter via Web Speech API */}
                        <button
                          type="button"
                          onClick={() => handleToggleSpeech(item)}
                          title={isPlayingThis ? (isHindi ? "सस्वर उच्चारण रोकें" : "Stop chanting") : (isHindi ? "सस्वर वैदिक उच्चारण सुनें" : "Listen to Vedic recitation")}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-2xs ${
                            isPlayingThis
                              ? "bg-[#FFD21F] text-[#111111] border border-[#FFD21F] animate-pulse"
                              : "bg-white hover:bg-stone-50 text-[#111111] border border-[#E5E5E5] hover:border-[#D9A441]"
                          }`}
                        >
                          {isPlayingThis ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-[#C62828]" />
                              <span className="hidden sm:inline">{isHindi ? "रोकें" : "Stop"}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-[#D9A441]" />
                              <span className="hidden sm:inline">{isHindi ? "सस्वर पाठ" : "Recitation"}</span>
                            </>
                          )}
                        </button>

                        {/* 1-Click Copy Button */}
                        <button
                          type="button"
                          onClick={() => handleCopyVerse(item)}
                          title={isHindi ? "श्लोक एवं अनुवाद कॉपी करें" : "Copy verse & translation"}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-[#E5E5E5] hover:border-[#D9A441] bg-white text-[#555555] hover:text-[#111111] transition-colors cursor-pointer shadow-2xs"
                        >
                          {isCopiedThis ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-[11px] font-bold text-emerald-600 hidden sm:inline">{isHindi ? "कॉपी हुआ" : "Copied"}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#555555]" />
                              <span className="text-[11px] font-semibold text-[#555555] hidden sm:inline">{isHindi ? "कॉपी" : "Copy"}</span>
                            </>
                          )}
                        </button>

                        {/* Native Share Button */}
                        <button
                          type="button"
                          onClick={() => handleShareVerse(item)}
                          title={isHindi ? "श्लोक साझा करें" : "Share verse"}
                          className="p-1.5 rounded-xl border border-[#E5E5E5] hover:border-[#D9A441] bg-white text-[#555555] hover:text-[#111111] transition-colors cursor-pointer shadow-2xs"
                        >
                          <Share2 className="w-3.5 h-3.5 text-[#D9A441]" />
                        </button>
                      </div>
                    </div>

                    {/* Pure Devanagari Sanskrit Altar Box with Golden Quotation / Danda Ornaments */}
                    <div className="my-5 rounded-2xl border border-[#E5E5E5] border-l-4 border-l-[#D9A441] bg-white p-5 sm:p-8 shadow-xs text-center relative overflow-hidden group/altar">
                      {/* Sacred Top Danda Emblem */}
                      <div className="flex items-center justify-center gap-2 mb-3 text-[#D9A441]">
                        <span className="h-[1px] w-8 sm:w-16 bg-[#D9A441]/40" />
                        <span className="font-serif text-sm tracking-widest font-bold">॥ ॐ ॥</span>
                        <span className="h-[1px] w-8 sm:w-16 bg-[#D9A441]/40" />
                      </div>

                      {/* Pure Sanskrit Verse (0% Roman Transliteration) in Noto Serif Devanagari */}
                      <p
                        className={`font-serif font-bold text-[#111111] whitespace-pre-line select-text tracking-wide ${
                          fontSizes[fontSize] || fontSizes.default
                        }`}
                      >
                        {item.devanagari}
                      </p>

                      {/* Sacred Bottom Danda Closure */}
                      <div className="flex items-center justify-center gap-2 mt-4 text-[#D9A441]">
                        <span className="h-[1px] w-8 sm:w-16 bg-[#D9A441]/40" />
                        <span className="font-serif text-xs font-bold tracking-wider">॥ इति ॥</span>
                        <span className="h-[1px] w-8 sm:w-16 bg-[#D9A441]/40" />
                      </div>
                    </div>

                    {/* Segmented Trilingual Translations Display */}
                    <div className="space-y-3">
                      {/* 1. Hindi Translation */}
                      {item.hindi && (readerLanguage === "all" || readerLanguage === "hindi") && (
                        <div className="p-4 rounded-xl bg-stone-50/70 border border-[#E5E5E5] text-xs sm:text-sm text-[#111111] font-devanagari leading-relaxed shadow-2xs">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[#111111] font-bold text-[10px] border border-[#FFD21F]">
                              {isHindi ? "हिन्दी भावार्थ" : "Hindi Meaning"}
                            </span>
                          </div>
                          <p>{item.hindi}</p>
                        </div>
                      )}

                      {/* 2. English Translation */}
                      {item.english && (readerLanguage === "all" || readerLanguage === "english") && (
                        <div className="p-4 rounded-xl bg-stone-50/70 border border-[#E5E5E5] text-xs sm:text-sm text-[#111111] leading-relaxed shadow-2xs font-serif">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[#111111] font-bold text-[10px] border border-[#FFD21F] font-sans">
                              {isHindi ? "English अनुवाद" : "English Translation"}
                            </span>
                          </div>
                          <p className="italic text-[#111111]">"{item.english}"</p>
                        </div>
                      )}

                      {/* 3. Hinglish Explanation */}
                      {(item.hinglish || item.hindi) && (readerLanguage === "all" || readerLanguage === "hinglish") && (
                        <div className="p-4 rounded-xl bg-stone-50/70 border border-[#E5E5E5] text-xs sm:text-sm text-[#111111] leading-relaxed font-sans shadow-2xs">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[#111111] font-bold text-[10px] border border-[#FFD21F]">
                              {isHindi ? "सरल हिंग्लिश व्याख्या" : "Hinglish Guide"}
                            </span>
                          </div>
                          <p className="text-[#555555]">{item.hinglish || item.hindi}</p>
                        </div>
                      )}

                      {/* Shastric Commentary if available */}
                      {item.commentary && (
                        <div className="rounded-xl border border-[#E5E5E5] bg-stone-50 p-4 text-xs sm:text-sm leading-relaxed text-[#555555] font-devanagari">
                          <div className="flex items-center gap-1.5 font-bold text-[#111111] mb-1">
                            <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                            <span>{isHindi ? "शास्त्रीय भाष्य एवं दार्शनिक रहस्य:" : "Shastric Commentary & Philosophical Insight:"}</span>
                          </div>
                          <p>{item.commentary}</p>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* 6. Bottom Numbered Pagination */}
          {isPaginated && (
            <div className="mt-6 pt-4 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => {
                  navigatePage(-1);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1 rounded-xl border border-[#E5E5E5] hover:border-[#D9A441] bg-white px-3 py-2 text-xs font-bold text-[#111111] disabled:opacity-40 hover:bg-stone-50 cursor-pointer disabled:cursor-not-allowed shadow-2xs transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>{isHindi ? "पिछला पृष्ठ" : "Previous Page"}</span>
              </button>

              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {getPaginationNumbers().map((item, idx) => {
                  if (item === "...") {
                    return (
                      <span key={`dots-${idx}`} className="px-2 text-xs text-[#555555]">
                        ...
                      </span>
                    );
                  }
                  const pageNo = item;
                  return (
                    <button
                      key={pageNo}
                      type="button"
                      onClick={() => {
                        setCurrentPage(pageNo);
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className={`min-w-[36px] min-h-[36px] rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center justify-center ${
                        currentPage === pageNo
                          ? "bg-[#FFD21F] text-[#111111] shadow-2xs border border-[#FFD21F] font-extrabold"
                          : "bg-white text-[#555555] hover:bg-stone-50 hover:text-[#111111] hover:border-[#D9A441] border border-[#E5E5E5]"
                      }`}
                    >
                      {pageNo}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => {
                  navigatePage(1);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1 rounded-xl border border-[#E5E5E5] hover:border-[#D9A441] bg-white px-3 py-2 text-xs font-bold text-[#111111] disabled:opacity-40 hover:bg-stone-50 cursor-pointer disabled:cursor-not-allowed shadow-2xs transition-all"
              >
                <span>{isHindi ? "अगला पृष्ठ" : "Next Page"}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#D9A441]" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
