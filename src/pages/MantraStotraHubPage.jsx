import React, { useState, useMemo, useEffect } from "react";
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
  Bell,
  RotateCcw,
  Share2,
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

/**
 * Auspicious Temple Bell Acoustic Synthesizer (Web Audio API)
 */
function playTempleChime(freq = 528, count = 1) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const playTone = (frequency, delay = 0, duration = 1.4) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, now + delay);

      // Bell decay envelope
      gain.gain.setValueAtTime(0.001, now + delay);
      gain.gain.linearRampToValueAtTime(0.25, now + delay + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + duration);
    };

    if (count >= 108) {
      // 3-tone auspicious chord for completing 108 Mala
      playTone(528, 0.0, 1.8);
      playTone(660, 0.15, 2.0);
      playTone(792, 0.3, 2.4);
    } else {
      playTone(freq, 0, 1.2);
    }
  } catch {
    // AudioContext blocked or not supported
  }
}

export default function MantraStotraHubPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get("category") || "all";
  const currentDeity = searchParams.get("deity") || "all";
  const currentSearch = searchParams.get("search") || "";
  const currentTag = searchParams.get("tag") || "";

  const [searchInput, setSearchInput] = useState(currentSearch);
  const [copiedId, setCopiedId] = useState(null);
  const [playingAudioId, setPlayingAudioId] = useState(null);

  // Digital Japa Mala State (108 Chants)
  const [showJapaMala, setShowJapaMala] = useState(false);
  const [japaCount, setJapaCount] = useState(0);
  const [japaTarget, setJapaTarget] = useState(108);
  const [malasDone, setMalasDone] = useState(0);
  const [japaSound, setJapaSound] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Keyboard Space listener for Japa Mala counting
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showJapaMala) return;
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        handleIncrementJapa();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showJapaMala, japaCount, japaTarget, japaSound]);

  // Clean Web Speech API cleanup
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleIncrementJapa = () => {
    const next = japaCount + 1;
    if (japaSound) {
      playTempleChime(528, next >= japaTarget ? 108 : 1);
    }

    if (next >= japaTarget) {
      setJapaCount(0);
      setMalasDone((prev) => prev + 1);
      triggerToast(`॥ ${japaTarget} जप पूर्ण • १ माला सिद्धि ॥`);
    } else {
      setJapaCount(next);
    }
  };

  const handleResetJapa = () => {
    setJapaCount(0);
    triggerToast("जप संख्या रीसेट की गई");
  };

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

  // 1-Click Copy Shloka
  const handleCopyShloka = (m, e) => {
    e.preventDefault();
    e.stopPropagation();
    const text = `“${m.keyVerse.sanskrit}”\n\n${m.title.hi} (${m.title.en})\nहिन्दी भावार्थ: ${m.keyVerse.meaningHi}\nEnglish: ${m.keyVerse.meaningEn || ""}\n— स्रोत: Veda Library`;
    navigator.clipboard.writeText(text);
    setCopiedId(m.id);
    triggerToast("मंत्र श्लोक व भावार्थ कॉपी किया गया!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Native Share
  const handleShareShloka = (m, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator
        .share({
          title: `${m.title.hi} — Veda Library`,
          text: `“${m.keyVerse.sanskrit}”\n\n${m.keyVerse.meaningHi}`,
          url: `${window.location.origin}/library/mantra-stotra/${m.slug}`,
        })
        .catch(() => {});
    } else {
      handleCopyShloka(m, e);
    }
  };

  // Real Web Speech API Audio Chant
  const handleToggleAudio = (mantra, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window === "undefined" || !window.speechSynthesis) {
      triggerToast("ब्राउज़र में स्पीच सिंथेसिस उपलब्ध नहीं है।");
      return;
    }

    if (playingAudioId === mantra.id) {
      window.speechSynthesis.cancel();
      setPlayingAudioId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = mantra.keyVerse.sanskrit.replace(/[।॥\n]/g, " ").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "hi-IN";
    utterance.rate = 0.85; // Serene Vedic cadence

    utterance.onend = () => {
      setPlayingAudioId(null);
    };

    utterance.onerror = () => {
      setPlayingAudioId(null);
    };

    setPlayingAudioId(mantra.id);
    window.speechSynthesis.speak(utterance);
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
        if (
          currentDeity === "shiva" &&
          !deityText.includes("shiva") &&
          !deityText.includes("शिव") &&
          !deityText.includes("tryambaka")
        ) {
          return false;
        }
        if (
          currentDeity === "vishnu" &&
          !deityText.includes("vishnu") &&
          !deityText.includes("विष्णु") &&
          !deityText.includes("purusha")
        ) {
          return false;
        }
        if (
          currentDeity === "devi" &&
          !deityText.includes("lakshmi") &&
          !deityText.includes("लक्ष्मी") &&
          !deityText.includes("savitri") &&
          !deityText.includes("गायत्री") &&
          !deityText.includes("दुर्गा") &&
          !deityText.includes("durga")
        ) {
          return false;
        }
        if (
          currentDeity === "surya" &&
          !deityText.includes("surya") &&
          !deityText.includes("सूर्य") &&
          !deityText.includes("aditya")
        ) {
          return false;
        }
        if (
          currentDeity === "vedic" &&
          !deityText.includes("virat") &&
          !deityText.includes("विराट्") &&
          !deityText.includes("purusha") &&
          !deityText.includes("agnisukta")
        ) {
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
        const matchesVerse = item.keyVerse.sanskrit.includes(q) || item.keyVerse.transliteration?.toLowerCase().includes(q);
        const matchesDeity = item.deity.en.toLowerCase().includes(q) || item.deity.hi.includes(q);
        const matchesRishi =
          item.canonAnga?.rishi?.en?.toLowerCase().includes(q) || item.canonAnga?.rishi?.hi?.includes(q);
        return matchesTitle || matchesSubtitle || matchesVerse || matchesDeity || matchesRishi;
      }

      return true;
    });
  }, [currentCategory, currentDeity, currentSearch, currentTag]);

  // Japa progress computation
  const japaProgress = Math.min(100, Math.round((japaCount / japaTarget) * 100));
  const circleRadius = 38;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeOffset = circumference - (japaProgress / 100) * circumference;

  return (
    <div className="bg-white min-h-screen pb-20 text-[#111111]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#111111] text-white border border-[#D9A441] shadow-2xl text-xs font-bold">
            <Sparkles className="w-4 h-4 text-[#FFD21F]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* 1. Sacred Vedic Ribbon & Breadcrumb */}
      <div className="bg-white border-b border-[#E5E5E5] py-3.5 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <nav className="flex items-center gap-2 text-[#555555] font-medium">
            <Link
              to="/library"
              className="hover:text-[#D9A441] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>Library</span>
            </Link>
            <span className="text-[#D9A441]">›</span>
            <span className="text-[#111111] font-bold">Mantra & Stotra Sanctuary (मंत्र एवं स्तोत्र साधना)</span>
          </nav>

          <div className="flex items-center gap-2">
            {/* Digital Japa Mala Toggle Button */}
            <button
              type="button"
              onClick={() => setShowJapaMala((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs border ${
                showJapaMala
                  ? "bg-[#FFD21F] text-[#111111] border-[#FFD21F]"
                  : "bg-white hover:bg-stone-50 text-[#111111] border-[#E5E5E5] hover:border-[#D9A441]"
              }`}
            >
              <Bell className="w-3.5 h-3.5 text-[#C62828]" />
              <span>डिजिटल जप माला {japaCount > 0 ? `(${japaCount}/${japaTarget})` : "(108)"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Astromantra-Grade Hero Header */}
      <section className="relative overflow-hidden bg-[#111111] text-white border-b border-[#E5E5E5] pt-12 pb-14 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerAltar}
            alt="Vedic Mantra Altar"
            className="w-full h-full object-cover object-center opacity-85 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/45 to-[#111111]/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D9A441]/15 via-transparent to-[#111111]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD21F] text-[#111111] text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
            <span className="font-devanagari">षडङ्ग विधान एवं सस्वर पाठ</span>
            <span>•</span>
            <span>Authentic Chanting Archive</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            Vedic Mantras, Stotras & Suktas
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/90 leading-relaxed font-sans drop-shadow-xs">
            शुद्ध देवनागरी संस्कृत मन्त्र, षडङ्ग विधान (ऋषि, छन्द, देवता, बीज, शक्ति, कीलकम्), सस्वर ध्वनि उच्चारण एवं जप विधि।
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto pt-3">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-lg rounded-2xl">
              <div className="absolute left-4 text-[#D9A441] pointer-events-none">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="मंत्र या स्तोत्र खोजें (उदा: महामृत्युंजय, गायत्री, शिव ताण्डव, कनकधारा, पुरुष सूक्त)..."
                className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#E5E5E5] text-sm text-[#111111] placeholder:text-[#555555] focus:outline-none focus:ring-2 focus:ring-[#FFD21F] focus:border-[#D9A441] transition-all shadow-md font-devanagari"
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
                className="absolute right-2 px-5 py-2 rounded-xl bg-[#FFD21F] hover:bg-[#ffe052] text-[#111111] font-bold text-xs shadow-md transition-all cursor-pointer border border-[#FFD21F]"
              >
                खोजें
              </button>
            </form>
          </div>

          {/* Deity Filter Pills in Hero */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {DEITIES.map((deity) => {
              const isActive = currentDeity === deity.id;
              return (
                <button
                  key={deity.id}
                  onClick={() => updateParams({ deity: deity.id })}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer backdrop-blur-sm ${
                    isActive
                      ? "bg-[#FFD21F] text-[#111111] shadow-md border border-[#FFD21F] ring-2 ring-[#FFD21F]/40 font-bold"
                      : "bg-[#111111]/80 border border-white/20 text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {deity.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2.5 INTERACTIVE DIGITAL JAPA MALA COUNTER (108 CHANTS) */}
      {showJapaMala && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 animate-fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E5E5] border-t-4 border-t-[#D9A441] shadow-md space-y-6">
            <div className="flex items-center justify-between border-b pb-4 border-[#E5E5E5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFD21F] text-[#111111] border border-[#FFD21F] flex items-center justify-center font-bold text-lg shadow-2xs">
                  ॐ
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#111111]">
                    डिजिटल जप माला काउंटर (Digital Japa Mala • 108 Chants)
                  </h3>
                  <p className="text-xs text-[#555555] font-devanagari">
                    मंत्र का एकाग्रचित्त जप करें। प्रत्येक जप पर टैप करें अथवा कीबोर्ड का Space दबाएँ।
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setJapaSound((p) => !p)}
                  title={japaSound ? "मंदिर घंटी ध्वनि चालू है" : "ध्वनि म्यूट है"}
                  className="p-2 rounded-xl border border-[#E5E5E5] hover:border-[#D9A441] bg-white text-[#111111] transition-colors cursor-pointer shadow-2xs"
                >
                  {japaSound ? <Volume2 className="w-4 h-4 text-[#D9A441]" /> : <VolumeX className="w-4 h-4 text-[#555555]" />}
                </button>
                <button
                  type="button"
                  onClick={handleResetJapa}
                  title="माला रीसेट करें"
                  className="p-2 rounded-xl border border-[#E5E5E5] hover:border-[#D9A441] bg-white text-[#111111] transition-colors cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="w-4 h-4 text-[#555555]" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowJapaMala(false)}
                  className="p-2 rounded-xl border border-[#E5E5E5] hover:bg-stone-50 text-[#555555] transition-colors cursor-pointer shadow-2xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Target Presets & Stats */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-[#555555]">संकल्प लक्ष्य:</span>
                {[11, 21, 54, 108].map((target) => (
                  <button
                    key={target}
                    type="button"
                    onClick={() => {
                      setJapaTarget(target);
                      setJapaCount(0);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      japaTarget === target
                        ? "bg-[#FFD21F] text-[#111111] border border-[#FFD21F] shadow-2xs"
                        : "bg-white text-[#555555] border border-[#E5E5E5] hover:border-[#D9A441]"
                    }`}
                  >
                    {target} जप
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs font-bold">
                <span className="px-3 py-1 rounded-xl bg-stone-50 border border-[#E5E5E5] text-[#111111]">
                  पूर्ण माला: <strong className="text-[#D9A441]">{malasDone}</strong>
                </span>
                <span className="px-3 py-1 rounded-xl bg-stone-50 border border-[#E5E5E5] text-[#111111]">
                  प्रगति: <strong className="text-[#C62828]">{japaProgress}%</strong>
                </span>
              </div>
            </div>

            {/* Big Tap Bead Counter Centerpiece */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative flex items-center justify-center">
                {/* SVG Progress Ring */}
                <svg className="w-44 h-44 -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r={circleRadius}
                    className="stroke-[#E5E5E5]"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="88"
                    cy="88"
                    r={circleRadius}
                    className="stroke-[#FFD21F] transition-all duration-300"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                {/* Inner Tap Button */}
                <button
                  type="button"
                  onClick={handleIncrementJapa}
                  className="absolute w-28 h-28 rounded-full bg-white border-2 border-[#D9A441] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer group"
                >
                  <span className="font-serif text-3xl font-extrabold text-[#111111] group-hover:text-[#D9A441] transition-colors">
                    {japaCount}
                  </span>
                  <span className="text-[10px] font-bold text-[#555555] uppercase tracking-wider">
                    / {japaTarget}
                  </span>
                  <span className="text-[10px] font-bold text-[#C62828] mt-0.5">
                    ॐ जपें
                  </span>
                </button>
              </div>

              <p className="text-xs text-[#555555] font-devanagari mt-3">
                टैप करें अथवा कीबोर्ड का <strong>Spacebar</strong> दबाएँ
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main 70/30 Astromantra Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 68-70% (8 Cols on LG) */}
          <main className="lg:col-span-8 space-y-6">
            {/* Category Filter Pills & Counter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E5E5]">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
                {MANTRA_CATEGORIES.map((cat) => {
                  const isActive = currentCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => updateParams({ category: cat.id })}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                        isActive
                          ? "bg-[#FFD21F] text-[#111111] border-[#FFD21F] shadow-2xs font-bold ring-2 ring-[#FFD21F]/30"
                          : "bg-white text-[#555555] hover:text-[#111111] hover:border-[#D9A441] border-[#E5E5E5]"
                      }`}
                    >
                      <span>{cat.nameHi}</span>
                    </button>
                  );
                })}
              </div>

              {/* Count Indicator */}
              <div className="text-xs font-semibold text-[#555555] shrink-0">
                <span>उपलब्ध: </span>
                <strong className="text-[#111111] font-bold">{filteredMantras.length}</strong>
                <span> पावन मंत्र व स्तोत्र</span>
              </div>
            </div>

            {/* In-Stream Deity Filter Chips (Single-Click Filtering) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-[#555555] font-bold mr-1 shrink-0 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#C62828]" />
                <span>देवता:</span>
              </span>
              {DEITIES.map((deity) => {
                const isActive = currentDeity === deity.id;
                return (
                  <button
                    key={deity.id}
                    onClick={() => updateParams({ deity: deity.id })}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                      isActive
                        ? "bg-[#FFD21F] text-[#111111] border-[#FFD21F] shadow-2xs font-bold ring-2 ring-[#FFD21F]/30"
                        : "bg-white text-[#555555] hover:text-[#111111] hover:border-[#D9A441] border-[#E5E5E5]"
                    }`}
                  >
                    <span>{deity.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Filters Bar (if active) */}
            {(currentSearch || currentTag || currentCategory !== "all" || currentDeity !== "all") && (
              <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-stone-50 border border-[#E5E5E5] text-xs">
                <span className="font-bold text-[#111111] flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-[#D9A441]" />
                  Active Filters:
                </span>

                {currentCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E5E5E5] font-semibold text-[#111111]">
                    Category: {MANTRA_CATEGORIES.find((c) => c.id === currentCategory)?.nameHi || currentCategory}
                    <button onClick={() => updateParams({ category: "all" })} className="text-stone-400 hover:text-stone-800 ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {currentDeity !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E5E5E5] font-semibold text-[#111111]">
                    Deity: {DEITIES.find((d) => d.id === currentDeity)?.label || currentDeity}
                    <button onClick={() => updateParams({ deity: "all" })} className="text-stone-400 hover:text-stone-800 ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {currentSearch && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E5E5E5] font-semibold text-[#111111]">
                    Search: "{currentSearch}"
                    <button onClick={handleClearSearch} className="text-stone-400 hover:text-stone-800 ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={() => setSearchParams({})}
                  className="text-xs font-bold text-[#111111] hover:text-[#D9A441] underline ml-auto cursor-pointer"
                >
                  रीसेट करें (Reset All)
                </button>
              </div>
            )}

            {/* Mantras & Stotras Stream Cards */}
            {filteredMantras.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E5E5E5] p-10 text-center space-y-3">
                <BookOpen className="w-10 h-10 text-[#D9A441] mx-auto opacity-70" />
                <h3 className="font-serif text-lg font-bold text-[#111111]">
                  कोई मंत्र या स्तोत्र नहीं मिला (No Mantras Found)
                </h3>
                <p className="text-xs text-[#555555] max-w-sm mx-auto">
                  कृपया भिन्न कीवर्ड अथवा श्रेणी का चयन करें।
                </p>
                <button
                  onClick={() => setSearchParams({})}
                  className="px-4 py-2 rounded-xl bg-[#FFD21F] hover:bg-[#ffe052] text-[#111111] font-bold text-xs shadow-xs cursor-pointer transition-colors border border-[#FFD21F]"
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
                      className="bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#D9A441] shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group relative"
                    >
                      {/* Top Golden Accent Line on Hover */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#D9A441] transition-colors z-10" />

                      {/* Top Header Strip */}
                      <div className="bg-stone-50 px-5 py-3 border-b border-[#E5E5E5] flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[#111111] font-bold text-[10px] uppercase tracking-wider border border-[#FFD21F]">
                            {mantra.categoryLabel?.hi || mantra.category}
                          </span>
                          <span className="text-[#E5E5E5]">•</span>
                          <span className="font-bold text-[#C62828] flex items-center gap-1 text-[11px]">
                            <Flame className="w-3.5 h-3.5 text-[#C62828]" />
                            {mantra.deity?.hi || mantra.deity?.en}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-[#555555] text-[11px] font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#D9A441]" />
                            {mantra.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-[#D9A441]" />
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
                            className="group-hover:text-[#D9A441] transition-colors"
                          >
                            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111111] leading-snug">
                              {mantra.title.hi}
                            </h2>
                            <p className="font-sans text-xs sm:text-sm font-semibold text-[#555555] mt-1">
                              {mantra.title.en}
                            </p>
                          </Link>
                          <p className="text-xs text-[#555555] mt-1 line-clamp-2">
                            {mantra.subtitle.hi}
                          </p>
                        </div>

                        {/* Sacred Altar Shloka Box with Golden Border #D9A441 & Pure Devanagari */}
                        <div className="relative rounded-2xl bg-white border border-[#E5E5E5] border-t-4 border-t-[#D9A441] border-l-4 border-l-[#D9A441] p-5 sm:p-6 shadow-2xs">
                          {/* Top Om Ornament Bar */}
                          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] text-xs">
                            <span className="font-devanagari font-bold text-[#111111] flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-[#FFD21F] text-[#111111] flex items-center justify-center text-[10px] font-bold border border-[#FFD21F]">
                                ॐ
                              </span>
                              <span>मूल संस्कृत मंत्र एवं सस्वर पाठ</span>
                            </span>

                            <div className="flex items-center gap-1.5">
                              {/* Web Speech API Audio Recitation Button */}
                              <button
                                onClick={(e) => handleToggleAudio(mantra, e)}
                                title="सस्वर वैदिक उच्चारण सुनें"
                                className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs ${
                                  isAudioPlaying
                                    ? "bg-[#FFD21F] text-[#111111] border border-[#FFD21F] animate-pulse"
                                    : "bg-white hover:bg-stone-50 text-[#111111] border border-[#E5E5E5] hover:border-[#D9A441]"
                                }`}
                              >
                                {isAudioPlaying ? (
                                  <>
                                    <VolumeX className="w-3.5 h-3.5 text-[#C62828]" />
                                    <span>ध्वनि चल रही...</span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="w-3.5 h-3.5 text-[#D9A441]" />
                                    <span>सस्वर पाठ</span>
                                  </>
                                )}
                              </button>

                              {/* 1-Click Copy Shloka Button */}
                              <button
                                onClick={(e) => handleCopyShloka(mantra, e)}
                                title="श्लोक व अर्थ कॉपी करें"
                                className="p-1.5 rounded-xl bg-white hover:bg-stone-50 text-[#555555] hover:text-[#111111] border border-[#E5E5E5] hover:border-[#D9A441] transition-colors cursor-pointer shadow-2xs"
                              >
                                {isCopied ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5 text-[#D9A441]" />
                                )}
                              </button>

                              {/* Native Share Button */}
                              <button
                                onClick={(e) => handleShareShloka(mantra, e)}
                                title="श्लोक साझा करें"
                                className="p-1.5 rounded-xl bg-white hover:bg-stone-50 text-[#555555] hover:text-[#111111] border border-[#E5E5E5] hover:border-[#D9A441] transition-colors cursor-pointer shadow-2xs"
                              >
                                <Share2 className="w-3.5 h-3.5 text-[#D9A441]" />
                              </button>
                            </div>
                          </div>

                          {/* Pure Devanagari Sanskrit Recitation Text in Noto Serif Devanagari */}
                          <div className="py-4 text-center">
                            {/* Sacred Top Danda Ornament */}
                            <div className="flex items-center justify-center gap-2 mb-2.5 text-[#D9A441]">
                              <span className="h-[1px] w-8 sm:w-16 bg-[#D9A441]/40" />
                              <span className="font-serif text-xs font-bold tracking-widest">॥ ॐ ॥</span>
                              <span className="h-[1px] w-8 sm:w-16 bg-[#D9A441]/40" />
                            </div>

                            <p className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#111111] leading-[2.1] whitespace-pre-line select-text tracking-wide">
                              {mantra.keyVerse.sanskrit}
                            </p>

                            {/* Sacred Bottom Danda Ornament */}
                            <div className="flex items-center justify-center gap-2 mt-3 text-[#D9A441]">
                              <span className="h-[1px] w-8 sm:w-16 bg-[#D9A441]/40" />
                              <span className="font-serif text-[11px] font-bold tracking-wider">॥ इति ॥</span>
                              <span className="h-[1px] w-8 sm:w-16 bg-[#D9A441]/40" />
                            </div>
                          </div>

                          {/* Trilingual Translations Preview */}
                          <div className="pt-3 border-t border-[#E5E5E5] space-y-2 text-xs">
                            {/* Hindi Meaning */}
                            <div className="text-[#111111] font-devanagari leading-relaxed">
                              <span className="px-2 py-0.5 rounded-md bg-[#FFD21F] text-[#111111] font-bold text-[10px] mr-1.5">
                                हिन्दी भावार्थ:
                              </span>
                              {mantra.keyVerse.meaningHi}
                            </div>

                            {/* English Meaning */}
                            {mantra.keyVerse.meaningEn && (
                              <div className="text-[#555555] font-serif italic leading-relaxed pt-1 border-t border-[#E5E5E5]/60">
                                <span className="not-italic font-sans px-2 py-0.5 rounded-md bg-stone-100 text-[#111111] font-bold text-[10px] mr-1.5">
                                  English:
                                </span>
                                "{mantra.keyVerse.meaningEn}"
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 6-Fold Vedic Canon (षडङ्ग विधान) Strip */}
                        {mantra.canonAnga && (
                          <div className="bg-stone-50 rounded-xl p-3 border border-[#E5E5E5] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                            <span className="font-bold text-[#111111] flex items-center gap-1 text-[11px]">
                              <Sparkles className="w-3 h-3 text-[#D9A441]" />
                              षडङ्ग विधान:
                            </span>
                            <span className="text-[#555555]">
                              <strong className="text-[#111111] font-semibold">ऋषि:</strong>{" "}
                              {mantra.canonAnga.rishi?.hi}
                            </span>
                            <span className="text-[#555555]">
                              <strong className="text-[#111111] font-semibold">छन्द:</strong>{" "}
                              {mantra.canonAnga.chhandas?.hi}
                            </span>
                            <span className="text-[#555555]">
                              <strong className="text-[#111111] font-semibold">देवता:</strong>{" "}
                              {mantra.canonAnga.devata?.hi}
                            </span>
                          </div>
                        )}

                        {/* Sadhana Vidhi Quick Strip */}
                        {mantra.vidhi && (
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-[#555555]">
                            <span>
                              <strong className="text-[#111111] font-semibold">मुहूर्त:</strong>{" "}
                              {mantra.vidhi.muhurat?.hi}
                            </span>
                            <span>•</span>
                            <span>
                              <strong className="text-[#111111] font-semibold">माला:</strong>{" "}
                              {mantra.vidhi.mala?.hi}
                            </span>
                            <span>•</span>
                            <span>
                              <strong className="text-[#111111] font-semibold">जप संख्या:</strong>{" "}
                              {mantra.vidhi.sankhya?.hi}
                            </span>
                          </div>
                        )}

                        {/* Action Footer */}
                        <div className="pt-3 border-t border-[#E5E5E5] flex items-center justify-between">
                          <div className="flex flex-wrap gap-1.5">
                            {mantra.tags?.slice(0, 3).map((tag) => (
                              <button
                                key={tag}
                                onClick={() => updateParams({ tag })}
                                className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-50 text-[#555555] border border-[#E5E5E5] hover:border-[#D9A441] transition-colors"
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>

                          <Link
                            to={`/library/mantra-stotra/${mantra.slug}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#FFD21F] hover:bg-[#ffe052] text-[#111111] shadow-xs hover:shadow-md transition-all group-hover:translate-x-0.5 cursor-pointer border border-[#FFD21F]"
                          >
                            <span>पूर्ण पाठ, विधि एवं फलश्रुति</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#111111]" />
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
