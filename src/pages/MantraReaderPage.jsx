import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import SEO from "../components/common/SEO.jsx";
import {
  Home,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  Share2,
  Bookmark,
  BookmarkCheck,
  Eye,
  Type,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Flame,
  Info,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Volume1,
  Play,
  Pause,
  Square,
  RotateCcw,
  Languages,
  Search,
  X,
  Filter,
  Heart,
  Maximize2,
  Minimize2,
  Settings,
  List,
  Grid,
  HelpCircle,
  Compass,
  Feather,
  Bell,
  CheckCircle2,
  Headphones,
  FileText,
  AlignLeft,
  Palette
} from "lucide-react";
import { getMantraById, ALL_VEDIC_MANTRAS } from "../data/vedicMantrasData.js";
import { findNodeById } from "../data/vedaHierarchyTree.js";
import VedicLibraryService from "../services/vedicLibraryService.js";
import bannerRigveda from "../assets/images/library/banners/banner-rigveda.jpg";
import bannerYajurveda from "../assets/images/library/banners/banner-yajurveda.jpg";
import bannerSamaveda from "../assets/images/library/banners/banner-samaveda.jpg";
import bannerAtharvaveda from "../assets/images/library/banners/banner-atharvaveda.jpg";
import bannerSanctum from "../assets/images/library/banners/banner-sanctum.png";
import bannerFireRitual from "../assets/images/library/banners/banner-fire-ritual.png";
import bannerKashiGhat from "../assets/images/library/banners/banner-kashi-ghat.png";
import bannerSacredDetails from "../assets/images/library/banners/banner-sacred-details.png";

const VEDA_BANNERS = {
  rigveda: bannerRigveda,
  yajurveda: bannerYajurveda,
  samaveda: bannerSamaveda,
  atharvaveda: bannerAtharvaveda
};

// ============================================================================
// 1. FOUR SACRED READING THEMES (चतुर्विध पठन वातावरण)
// ============================================================================
const THEMES = {
  sattvic: {
    id: "sattvic",
    name: "सात्विक",
    subName: "Vedic Pure White",
    icon: Sun,
    pageBg: "bg-white text-[#111111]",
    headerBg: "bg-white border-[#E5E5E5] text-[#111111]",
    cardBg: "bg-white border-[#E5E5E5] shadow-xs text-[#111111]",
    cardSubtle: "bg-white border-[#E5E5E5] text-[#555555]",
    sanctuaryBg: "bg-white border-[#E5E5E5] shadow-xs",
    sanctuaryText: "text-[#111111]",
    transliterationColor: "text-[#555555]",
    accent: "text-[#D9A441]",
    accentBg: "bg-[#FFD21F] text-[#111111] font-bold",
    badge: "bg-[#FFD21F] text-[#111111] border-[#FFD21F] font-bold",
    buttonPrimary: "bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-bold shadow-xs",
    buttonSecondary: "bg-white hover:bg-stone-50 text-[#111111] border-[#E5E5E5] hover:border-[#D9A441] shadow-xs",
    chipBg: "bg-white hover:bg-[#FFD21F]/15 border-[#E5E5E5] text-[#555555]",
    chipActive: "bg-[#FFD21F] border-[#FFD21F] text-[#111111] font-bold ring-2 ring-[#FFD21F]/40 shadow-xs",
    highlightWord: "bg-[#FFD21F]/30 text-[#111111] ring-2 ring-[#FFD21F] shadow-xs rounded px-1",
    subtleBorder: "border-[#E5E5E5]",
    isDark: false
  },
  dhyana: {
    id: "dhyana",
    name: "ध्यान",
    subName: "Dhyana Midnight Amber",
    icon: Moon,
    pageBg: "bg-[#120e0a] text-[#fef3c7]",
    headerBg: "bg-[#1a130d] border-amber-950/90 text-[#fef3c7]",
    cardBg: "bg-[#1b140d] border-amber-950/80 shadow-md text-[#fef3c7]",
    cardSubtle: "bg-[#241910] border-amber-950 text-amber-200/90",
    sanctuaryBg: "bg-gradient-to-b from-[#24170d] via-[#1a110a] to-[#20140c] border-amber-700/60 shadow-2xl",
    sanctuaryText: "text-[#ffeed4]",
    transliterationColor: "text-amber-200/80",
    accent: "text-amber-400",
    accentBg: "bg-amber-600 text-stone-950 font-bold",
    badge: "bg-[#2d1b0e] text-amber-200 border-amber-800",
    buttonPrimary: "bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold shadow-md",
    buttonSecondary: "bg-[#25180d] hover:bg-[#342213] text-amber-200 border-amber-900/80",
    chipBg: "bg-[#23170c] hover:bg-amber-950/90 border-amber-900/80 text-amber-100",
    chipActive: "bg-amber-900/90 border-amber-400 text-amber-100 font-bold ring-2 ring-amber-400/80 shadow-md",
    highlightWord: "bg-amber-500/30 text-amber-100 ring-2 ring-amber-400 shadow-md rounded px-1",
    subtleBorder: "border-amber-950/80",
    isDark: true
  },
  tamrapatra: {
    id: "tamrapatra",
    name: "ताम्रपत्र",
    subName: "Ancient Sepia Parchment",
    icon: Feather,
    pageBg: "bg-[#f6eee0] text-[#3c2415]",
    headerBg: "bg-[#efe3ce] border-[#ddcbb1] text-[#3c2415]",
    cardBg: "bg-[#faf3e6] border-[#decbb0] shadow-2xs text-[#3c2415]",
    cardSubtle: "bg-[#f2e4cf] border-[#d8be9a] text-[#4a2e16]",
    sanctuaryBg: "bg-gradient-to-b from-[#fdf7ec] via-[#f7ebd4] to-[#f0dfc1] border-[#cca779] shadow-md",
    sanctuaryText: "text-[#321a0c]",
    transliterationColor: "text-[#583319]",
    accent: "text-[#92400e]",
    accentBg: "bg-[#92400e] text-white",
    badge: "bg-[#ebdabf] text-[#6b370d] border-[#d8be9a]",
    buttonPrimary: "bg-[#92400e] hover:bg-[#78350f] text-white shadow-2xs",
    buttonSecondary: "bg-[#f5e9d5] hover:bg-[#ebdabf] text-[#5c300c] border-[#d8be9a]",
    chipBg: "bg-[#f4e7d1] hover:bg-[#ebd7b7] border-[#d8be9a] text-[#3c2415]",
    chipActive: "bg-[#ebd2a8] border-[#9f692b] text-[#2c1404] font-bold ring-2 ring-[#c68e4a]/70 shadow-xs",
    highlightWord: "bg-[#dfbe89] text-[#281303] ring-2 ring-[#a06828] shadow-xs rounded px-1",
    subtleBorder: "border-[#d8be9a]/80",
    isDark: false
  },
  crisp: {
    id: "crisp",
    name: "सुस्पष्ट",
    subName: "High Contrast Clean White",
    icon: Eye,
    pageBg: "bg-[#ffffff] text-[#111827]",
    headerBg: "bg-[#f9fafb] border-gray-200 text-[#111827]",
    cardBg: "bg-white border-gray-200 shadow-2xs text-[#111827]",
    cardSubtle: "bg-[#f9fafb] border-gray-200 text-[#374151]",
    sanctuaryBg: "bg-gradient-to-b from-[#ffffff] via-[#fafafa] to-[#f4f4f5] border-gray-300 shadow-md",
    sanctuaryText: "text-[#09090b]",
    transliterationColor: "text-gray-700",
    accent: "text-gray-900",
    accentBg: "bg-black text-white",
    badge: "bg-gray-100 text-gray-900 border-gray-300",
    buttonPrimary: "bg-black hover:bg-gray-800 text-white shadow-2xs",
    buttonSecondary: "bg-white hover:bg-gray-100 text-gray-900 border-gray-300",
    chipBg: "bg-[#f9fafb] hover:bg-gray-100 border-gray-200 text-gray-900",
    chipActive: "bg-gray-100 border-gray-900 text-black font-bold ring-2 ring-gray-900 shadow-xs",
    highlightWord: "bg-yellow-200 text-black ring-2 ring-yellow-400 shadow-xs rounded px-1",
    subtleBorder: "border-gray-200",
    isDark: false
  }
};

// ============================================================================
// 2. FONT SIZES SCALER PRESETS (अक्षर आकार विन्यास)
// ============================================================================
const FONT_SIZES = [
  { id: "compact", label: "A--", title: "अति लघु (Compact)", cls: "text-lg sm:text-xl", lineCls: "leading-[1.7] sm:leading-[1.75]" },
  { id: "small", label: "A-", title: "लघु (Medium)", cls: "text-xl sm:text-2xl", lineCls: "leading-[1.7] sm:leading-[1.75]" },
  { id: "default", label: "A", title: "सामान्य (Default)", cls: "text-2xl sm:text-3xl", lineCls: "leading-[1.75] sm:leading-[1.8]" },
  { id: "large", label: "A+", title: "विशाल (Large)", cls: "text-3xl sm:text-4xl", lineCls: "leading-[1.8] sm:leading-[1.85]" },
  { id: "extralarge", label: "A++", title: "महाविशाल (Extra Large)", cls: "text-4xl sm:text-5xl", lineCls: "leading-[1.85] sm:leading-[1.9]" }
];

// Helper to strip Vedic swara diacritics and punctuation for clean speech synthesis & word matching
function cleanSanskritForSpeech(text = "") {
  return text
    .replace(/[\u0951\u0952\u1CDA]/g, "") // strip udatta, anudatta, svarita
    .replace(/[।॥०-९0-9||\n]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeWordForMatching(word = "") {
  return word
    .replace(/[\u0951\u0952\u1CDA]/g, "")
    .replace(/[।,॥\s\dऽ\-–—()]/g, "")
    .trim()
    .toLowerCase();
}

// Web Audio API Temple Bell Chime
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
      gain.gain.linearRampToValueAtTime(0.28, now + delay + 0.04);
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

export default function MantraReaderPage({ onOpenSearch }) {
  const { isHindi, isEnglish } = useLanguage();
  const { mantraId = "rv-1-1-1", category = "veda", subject = "rigveda" } = useParams();
  const navigate = useNavigate();

  // --------------------------------------------------------------------------
  // Persistent Settings & States
  // --------------------------------------------------------------------------
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("veda_reader_theme") || "sattvic";
  });
  const [fontSizeIndex, setFontSizeIndex] = useState(() => {
    const saved = localStorage.getItem("veda_reader_fontsize_idx");
    return saved !== null ? Number(saved) : 2; // Default to index 2: "text-2xl sm:text-3xl"
  });
  const [fontFamily, setFontFamily] = useState(() => {
    return localStorage.getItem("veda_reader_font_family") || "serif"; // 'serif', 'sans'
  });
  const [activeTab, setActiveTab] = useState(() => (isHindi ? "hindi" : "english"));
  const [viewAllTranslations, setViewAllTranslations] = useState(false);

  useEffect(() => {
    setActiveTab(isHindi ? "hindi" : "english");
  }, [isHindi]);
  const [showPadapatha, setShowPadapatha] = useState(true);
  const [padapathaViewMode, setPadapathaViewMode] = useState("grid"); // 'grid' | 'table'
  const [padapathaFilter, setPadapathaFilter] = useState("");
  const [activeWordMatch, setActiveWordMatch] = useState(null);

  // Focus & Fullscreen
  const [focusMode, setFocusMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Digital Japa Mala Recitation Counter
  const [showJapa, setShowJapa] = useState(false);
  const [japaCount, setJapaCount] = useState(0);
  const [japaTarget, setJapaTarget] = useState(108); // 11, 21, 54, 108
  const [japaSound, setJapaSound] = useState(true);
  const [todayTotalJapa, setTodayTotalJapa] = useState(() => {
    const todayKey = `veda_japa_${new Date().toISOString().slice(0, 10)}`;
    return Number(localStorage.getItem(todayKey) || 0);
  });

  // Audio / Speech Synthesis (उच्चारण व सस्वर पाठ)
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);
  const [isPausedSpeech, setIsPausedSpeech] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0); // 0.75, 1.0, 1.25
  const [speechTarget, setSpeechTarget] = useState("sanskrit"); // 'sanskrit' | 'hindi'
  const [audioWaveTick, setAudioWaveTick] = useState(0);

  // Utilities, Search & Bookmarks
  const [copied, setCopied] = useState(false);
  const [showFinder, setShowFinder] = useState(false);
  const [finderQuery, setFinderQuery] = useState("");
  const [finderVeda, setFinderVeda] = useState("all");
  const [finderDeity, setFinderDeity] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoritesList, setFavoritesList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("veda_library_favorites") || "[]");
    } catch {
      return [];
    }
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [siblingSearch, setSiblingSearch] = useState("");
  const [liveMantra, setLiveMantra] = useState(null);

  const themeObj = THEMES[currentTheme] || THEMES.sattvic;
  const currentFontSize = FONT_SIZES[fontSizeIndex] || FONT_SIZES[2];

  // Save Theme and Settings to localStorage
  useEffect(() => {
    localStorage.setItem("veda_reader_theme", currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem("veda_reader_fontsize_idx", String(fontSizeIndex));
  }, [fontSizeIndex]);

  useEffect(() => {
    localStorage.setItem("veda_reader_font_family", fontFamily);
  }, [fontFamily]);

  // Toast Helper
  const triggerToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  }, []);

  // Fetch live mantra from backend on mantraId change
  useEffect(() => {
    let isMounted = true;
    VedicLibraryService.getMantraById(mantraId)
      .then((res) => {
        if (isMounted && res && res.mantra) {
          setLiveMantra(res.mantra);
        }
      })
      .catch(() => {});

    // Stop speaking when switching mantras
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeech(false);
      setIsPausedSpeech(false);
    }
    // Deselect matched words
    setActiveWordMatch(null);

    return () => {
      isMounted = false;
    };
  }, [mantraId]);

  const fallbackMantra = getMantraById(mantraId) || ALL_VEDIC_MANTRAS[0];
  const mantra = liveMantra || fallbackMantra;

  // Sibling Mantras
  const siblingMantras = useMemo(() => {
    if (mantra.siblings && Array.isArray(mantra.siblings) && mantra.siblings.length > 0) {
      return mantra.siblings;
    }
    return (mantra.chapterMantraIds || [])
      .map((id) => getMantraById(id))
      .filter(Boolean);
  }, [mantra.siblings, mantra.chapterMantraIds]);

  const filteredSiblings = useMemo(() => {
    if (!siblingSearch.trim()) return siblingMantras;
    const q = siblingSearch.toLowerCase().trim();
    return siblingMantras.filter((s) => {
      return (
        String(s.mantraNumber || "").includes(q) ||
        (s.sanskrit || "").toLowerCase().includes(q) ||
        (s.hindiTranslation || "").toLowerCase().includes(q)
      );
    });
  }, [siblingMantras, siblingSearch]);

  const matchingMantras = useMemo(() => {
    return ALL_VEDIC_MANTRAS.filter((m) => {
      if (finderVeda !== "all" && m.vedaId !== finderVeda) return false;
      if (finderDeity !== "all") {
        const d = `${m.devata || ""} ${m.textName || ""}`.toLowerCase();
        if (finderDeity === "shiva" && !d.includes("शिव") && !d.includes("रुद्र") && !d.includes("shiva") && !d.includes("त्र्यम्बक")) return false;
        if (finderDeity === "vishnu" && !d.includes("विष्णु") && !d.includes("पुरुष") && !d.includes("narayan") && !d.includes("कृष्ण")) return false;
        if (finderDeity === "devi" && !d.includes("गायत्री") && !d.includes("देवी") && !d.includes("सविता") && !d.includes("सरस्वती") && !d.includes("लक्ष्मी") && !d.includes("भूमि")) return false;
        if (finderDeity === "surya" && !d.includes("सूर्य") && !d.includes("सविता") && !d.includes("आदित्य") && !d.includes("भास्कर")) return false;
        if (finderDeity === "agni" && !d.includes("अग्नि") && !d.includes("यज्ञ") && !d.includes("सोम") && !d.includes("पलाश")) return false;
      }
      if (!finderQuery.trim()) return true;
      const q = finderQuery.toLowerCase().trim();
      return (
        (m.id && m.id.toLowerCase().includes(q)) ||
        (m.textName && m.textName.toLowerCase().includes(q)) ||
        (m.sectionRef && m.sectionRef.toLowerCase().includes(q)) ||
        (m.sanskrit && m.sanskrit.toLowerCase().includes(q)) ||
        (m.hindiTranslation && m.hindiTranslation.toLowerCase().includes(q)) ||
        (m.rishi && m.rishi.toLowerCase().includes(q)) ||
        (m.devata && m.devata.toLowerCase().includes(q))
      );
    });
  }, [finderQuery, finderVeda, finderDeity]);

  // Audio wave ticker animation when speaking
  useEffect(() => {
    if (!isPlayingSpeech || isPausedSpeech) return;
    const interval = setInterval(() => {
      setAudioWaveTick((t) => (t + 1) % 100);
    }, 120);
    return () => clearInterval(interval);
  }, [isPlayingSpeech, isPausedSpeech]);

  // Web Speech API Pronunciation Engine
  const handleToggleSpeech = () => {
    if (!window.speechSynthesis) {
      triggerToast("आपके ब्राउज़र में स्पीच सिंथेसिस उपलब्ध नहीं है।");
      return;
    }

    if (isPlayingSpeech) {
      if (isPausedSpeech) {
        window.speechSynthesis.resume();
        setIsPausedSpeech(false);
      } else {
        window.speechSynthesis.pause();
        setIsPausedSpeech(true);
      }
      return;
    }

    window.speechSynthesis.cancel();

    const textToSpeak =
      speechTarget === "hindi"
        ? mantra.hindiTranslation
        : cleanSanskritForSpeech(mantra.sanskrit);

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = speechRate;
    utterance.lang = speechTarget === "hindi" ? "hi-IN" : "hi-IN"; // hi-IN delivers great Sanskrit pronunciation

    // Attempt to pick optimal Indian or Hindi voice
    const voices = window.speechSynthesis.getVoices();
    const optimalVoice = voices.find(
      (v) => v.lang.startsWith("hi") || v.lang.startsWith("sa") || v.name.includes("India")
    );
    if (optimalVoice) {
      utterance.voice = optimalVoice;
    }

    utterance.onstart = () => {
      setIsPlayingSpeech(true);
      setIsPausedSpeech(false);
    };

    utterance.onend = () => {
      setIsPlayingSpeech(false);
      setIsPausedSpeech(false);
    };

    utterance.onerror = () => {
      setIsPlayingSpeech(false);
      setIsPausedSpeech(false);
    };

    utterance.onpause = () => setIsPausedSpeech(true);
    utterance.onresume = () => setIsPausedSpeech(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeech = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingSpeech(false);
    setIsPausedSpeech(false);
  };

  const handleChangeSpeechRate = (newRate) => {
    setSpeechRate(newRate);
    if (isPlayingSpeech) {
      handleStopSpeech();
      triggerToast(`उच्चारण गति: ${newRate}x सेट की गई। पुनः सुनें।`);
    }
  };

  // Japa Recitation Counter Logic
  const handleIncrementJapa = () => {
    const newCount = japaCount + 1;
    setJapaCount(newCount);

    if (japaSound) {
      playTempleChime(528, newCount >= japaTarget ? 108 : 1);
    }

    // Update today total
    const todayKey = `veda_japa_${new Date().toISOString().slice(0, 10)}`;
    const newToday = todayTotalJapa + 1;
    setTodayTotalJapa(newToday);
    localStorage.setItem(todayKey, String(newToday));

    if (newCount === japaTarget) {
      triggerToast(`॥ ${japaTarget} जप पूर्ण • ॐ तत्सत् ॥`);
    }
  };

  const handleResetJapa = () => {
    setJapaCount(0);
    triggerToast("जप माला रीसेट की गई।");
  };

  // Keyboard navigation & Shortcuts (← / → / Space / Esc / F)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "ArrowLeft" && mantra.previousId) {
        e.preventDefault();
        navigate(`/library/mantra/${mantra.previousId}`);
      } else if (e.key === "ArrowRight" && mantra.nextId) {
        e.preventDefault();
        navigate(`/library/mantra/${mantra.nextId}`);
      } else if (e.code === "Space" && showJapa) {
        e.preventDefault();
        handleIncrementJapa();
      } else if (e.key === "Escape") {
        setShowFinder(false);
        setShowFavorites(false);
      } else if (e.key.toLowerCase() === "f" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setFocusMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mantra, navigate, showJapa, japaCount, japaTarget, japaSound, todayTotalJapa]);

  // Fullscreen Handler
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  // 1-Click Copy with Scholarly Citation
  const handleCopyMantra = () => {
    const textToCopy = `॥ ॐ ॥
${mantra.sanskrit}

— ${mantra.textName} (${mantra.sectionRef} • मंत्र ${mantra.mantraNumber})
ऋषि: ${mantra.rishi || "वैदिक ऋषि"} | देवता: ${mantra.devata || "परमेश्वर"} | छन्द: ${mantra.chhanda || "वैदिक छन्द"}

सरल हिन्दी भावार्थ:
${mantra.hindiTranslation}

English Translation:
${mantra.englishTranslation || ""}

सरल हिंग्लिश व्याख्या:
${mantra.hinglishTranslation || ""}

स्रोत: Veda Library — https://vedalibrary.org`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    triggerToast("मंत्र पूर्ण शास्त्रीय संदर्भ सहित कॉपी किया गया!");
    setTimeout(() => setCopied(false), 2200);
  };

  // Bookmark / Favorite Toggle
  const isBookmarked = favoritesList.includes(mantra.id);
  const handleToggleFavorite = () => {
    let updated;
    if (isBookmarked) {
      updated = favoritesList.filter((id) => id !== mantra.id);
      triggerToast("मंत्र पसंदीदा सूची से हटाया गया।");
    } else {
      updated = [...favoritesList, mantra.id];
      triggerToast("मंत्र पसंदीदा सूची में सहेजा गया!");
    }
    setFavoritesList(updated);
    localStorage.setItem("veda_library_favorites", JSON.stringify(updated));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${mantra.textName} - मंत्र ${mantra.mantraNumber}`,
          text: `${mantra.sanskrit}\n\n${mantra.hindiTranslation}`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      handleCopyMantra();
    }
  };

  // Padapatha filtered list
  const filteredPadapatha = useMemo(() => {
    if (!mantra.padapatha) return [];
    if (!padapathaFilter.trim()) return mantra.padapatha;
    const q = padapathaFilter.toLowerCase().trim();
    return mantra.padapatha.filter(
      (p) =>
        (p.word && p.word.toLowerCase().includes(q)) ||
        (p.meaning && p.meaning.toLowerCase().includes(q))
    );
  }, [mantra.padapatha, padapathaFilter]);

  // Construct Synthetic Prose Order (अन्वय - Anvaya) if not directly supplied
  const syntheticAnvaya = useMemo(() => {
    if (mantra.anvaya) return mantra.anvaya;
    if (mantra.padapatha && mantra.padapatha.length > 0) {
      return mantra.padapatha.map((p) => p.word).join(" ") + " इति अन्वयक्रमः।";
    }
    return mantra.sanskrit;
  }, [mantra]);

  // Split Sanskrit verse into interactive word tokens
  const renderedSanskritTokens = useMemo(() => {
    const lines = (mantra.sanskrit || "").split("\n");
    return lines.map((line, lineIdx) => {
      const tokens = line.split(/(\s+|[।॥])/);
      return (
        <span key={lineIdx} className="block my-1">
          {tokens.map((token, tokIdx) => {
            const trimmed = token.trim();
            if (!trimmed || trimmed === "।" || trimmed === "॥") {
              return (
                <span
                  key={tokIdx}
                  className={trimmed === "।" || trimmed === "॥" ? "text-[#D9A441] font-bold px-0.5 select-none" : ""}
                >
                  {token}
                </span>
              );
            }

            const normToken = normalizeWordForMatching(trimmed);
            // Check if matches active hovered word
            const isMatched =
              activeWordMatch &&
              (normalizeWordForMatching(activeWordMatch) === normToken ||
                normToken.includes(normalizeWordForMatching(activeWordMatch)) ||
                normalizeWordForMatching(activeWordMatch).includes(normToken));

            // Find matching padapatha
            const matchingPada = (mantra.padapatha || []).find((p) => {
              const pNorm = normalizeWordForMatching(p.word);
              return pNorm === normToken || normToken.includes(pNorm) || pNorm.includes(normToken);
            });

            return (
              <span
                key={tokIdx}
                onClick={() => {
                  setActiveWordMatch((prev) => (prev === trimmed ? null : trimmed));
                }}
                onMouseEnter={() => setActiveWordMatch(trimmed)}
                onMouseLeave={() => setActiveWordMatch((prev) => (prev === trimmed ? null : prev))}
                title={matchingPada ? `${matchingPada.word} : ${matchingPada.meaning}` : trimmed}
                className={`transition-all duration-200 cursor-pointer inline-block rounded-md px-1 py-0.5 mx-0.5 ${
                  isMatched
                    ? themeObj.highlightWord
                    : "hover:bg-amber-500/20 hover:scale-105"
                }`}
              >
                {token}
              </span>
            );
          })}
        </span>
      );
    });
  }, [mantra.sanskrit, mantra.padapatha, activeWordMatch, themeObj]);

  // Mala progress percentage & circumference
  const malaProgress = Math.min(100, Math.round((japaCount / japaTarget) * 100));
  const circleRadius = 42;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeOffset = circleCircumference - (malaProgress / 100) * circleCircumference;

  // Dynamic SEO metadata calculation (Document Section 11 & Mantra Specification)
  const mantraDisplayTitle =
    mantra.title ||
    `${mantra.textName || "वैदिक मंत्र"}${mantra.mantraNumber ? ` • मंत्र ${mantra.mantraNumber}` : ""}`;

  const seoTitle = `${mantraDisplayTitle} — देवता: ${mantra.devata || "वैदिक"}, ऋषि: ${mantra.rishi || "वैदिक"} (${mantra.source || mantra.vedaName || "वेद"}) | Veda Library`;

  const seoDescription =
    `${mantraDisplayTitle} (${mantra.sectionRef || ""}) — मूल संस्कृत देवनागरी ऋचा, पद-पाठ, अन्वय, हिन्दी एवं English भावार्थ। देवता: ${mantra.devata || "वैदिक"}, ऋषि: ${mantra.rishi || "वैदिक"}, छन्द: ${mantra.chhandas || "वैदिक"} | Veda Library`
      .trim()
      .slice(0, 160);

  const canonicalPath = `/library/mantra/${mantra.id || mantraId}`;

  const breadcrumbElements = [
    {
      "@type": "ListItem",
      position: 1,
      name: "होम (Home)",
      item: "https://library.vedastructure.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "वेद लाइब्रेरी (Veda Library)",
      item: "https://library.vedastructure.com/library",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "वेद (The Vedas)",
      item: "https://library.vedastructure.com/library/veda",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: mantra.vedaName || "वैदिक संहिता",
      item: `https://library.vedastructure.com/library/veda/${mantra.vedaId || "rigveda"}`,
    },
    {
      "@type": "ListItem",
      position: 5,
      name: mantraDisplayTitle,
      item: `https://library.vedastructure.com${canonicalPath}`,
    },
  ];

  const jsonLdSchema = [
    {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbElements,
    },
    {
      "@type": "CreativeWork",
      name: mantraDisplayTitle,
      headline: `${mantraDisplayTitle} (${mantra.sectionRef || ""})`,
      text: mantra.sanskrit,
      inLanguage: ["sa", "hi", "en"],
      genre: "Vedic Mantra / Shloka",
      url: `https://library.vedastructure.com${canonicalPath}`,
      about: {
        "@type": "Thing",
        name: mantra.devata || "वैदिक देवता",
        description: `उपास्य देवता: ${mantra.devata || "वैदिक"}`,
      },
      creator: {
        "@type": "Person",
        name: mantra.rishi || "वैदिक ऋषि",
        jobTitle: "मन्त्र द्रष्टा ऋषि",
      },
      isPartOf: {
        "@type": "Book",
        name: mantra.source || mantra.textName || "वेद संहिता",
        isPartOf: {
          "@type": "WebSite",
          name: "Veda Library",
          url: "https://library.vedastructure.com/",
        },
      },
      publisher: {
        "@type": "Organization",
        name: "Veda Library",
        url: "https://library.vedastructure.com/",
      },
      description:
        mantra.hindiTranslation ||
        mantra.englishTranslation ||
        "वैदिक ऋचा एवं भावार्थ",
    },
    {
      "@type": "ItemPage",
      name: seoTitle,
      url: `https://library.vedastructure.com${canonicalPath}`,
      description: seoDescription,
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-amber-300 selection:text-amber-950 pb-20 sm:pb-12 ${
        themeObj.pageBg
      }`}
    >
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalPath}
        schema={jsonLdSchema}
        keywords={[
          mantra.title || mantra.textName,
          mantra.devata,
          mantra.rishi,
          mantra.chhandas,
          mantra.vedaName,
          "वैदिक मंत्र",
          "ऋचा",
          "Veda Library",
        ].filter(Boolean)}
      />
      {/* ==================================================================== */}
      {/* FLOATING TOAST NOTIFICATION                                          */}
      {/* ==================================================================== */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-amber-900 text-amber-100 border border-amber-500 shadow-2xl text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 1. BREADCRUMB BAR (Hidden in Focus Mode)                             */}
      {/* ==================================================================== */}
      {!focusMode && (
        <div className={`border-b py-2.5 px-4 sm:px-6 lg:px-8 text-xs transition-colors ${themeObj.headerBg}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap font-medium">
              <Link to="/" className="hover:text-amber-700 transition-colors flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span>{isHindi ? "होम" : "Home"}</span>
              </Link>
              <span className="opacity-50">›</span>
              <Link to="/library" className="hover:text-amber-700 transition-colors">
                {isHindi ? "लाइब्रेरी" : "Library"}
              </Link>
              <span className="opacity-50">›</span>
              <Link to="/library/veda" className="hover:text-amber-700 transition-colors">
                {isHindi ? "वेद" : "Vedas"}
              </Link>
              <span className="opacity-50">›</span>
              <Link
                to={`/library/veda/${mantra.vedaId || "rigveda"}`}
                className="hover:text-amber-700 font-semibold transition-colors"
              >
                {mantra.vedaName}
              </Link>
              <span className="opacity-50">›</span>
              <span className="truncate max-w-[150px] opacity-80">{mantra.shakha}</span>
              <span className="opacity-50">›</span>
              <span className="truncate max-w-[160px] font-semibold">{mantra.textName}</span>
              <span className="opacity-50">›</span>
              <span className={`px-2 py-0.5 rounded-full font-bold border ${themeObj.badge}`}>
                {isHindi ? `मंत्र ${mantra.mantraNumber}` : `Mantra ${mantra.mantraNumber}`}
              </span>
            </div>

            {/* Quick Favorites Counter Badge */}
            <button
              type="button"
              onClick={() => setShowFavorites(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-xl transition-colors opacity-85 hover:opacity-100 cursor-pointer"
            >
              <Heart className={`w-3.5 h-3.5 ${favoritesList.length > 0 ? "fill-amber-600 text-amber-600" : ""}`} />
              <span>{isHindi ? `पसंदीदा (${favoritesList.length})` : `Favorites (${favoritesList.length})`}</span>
            </button>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. SACRED READING TOOLBAR & CONTROLS BANNER                          */}
      {/* ==================================================================== */}
      <header
        className={`border-b py-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-30 backdrop-blur-md transition-colors ${
          themeObj.headerBg
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Row A: Back + Section Tag + Next/Prev */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${themeObj.buttonSecondary}`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isHindi ? "सूची" : "Back"}</span>
              </button>

              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${themeObj.accentBg}`}>
                {mantra.textName}
              </span>

              <span className="text-xs font-semibold opacity-90">
                {mantra.sectionRef} • {isHindi ? `ऋचा ${mantra.mantraNumber}` : `Verse ${mantra.mantraNumber}`}
              </span>
            </div>

            {/* TOP NAVIGATION BUTTONS (Prev / Next) */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                disabled={!mantra.previousId}
                onClick={() => mantra.previousId && navigate(`/library/mantra/${mantra.previousId}`)}
                title={isHindi ? "पिछला मंत्र (कीबोर्ड: ←)" : "Previous Mantra (←)"}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  !mantra.previousId
                    ? "opacity-35 cursor-not-allowed bg-stone-100 text-stone-400 border-stone-200"
                    : themeObj.buttonSecondary
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{isHindi ? "पिछला" : "Previous"}</span>
              </button>

              <button
                type="button"
                disabled={!mantra.nextId}
                onClick={() => mantra.nextId && navigate(`/library/mantra/${mantra.nextId}`)}
                title={isHindi ? "अगला मंत्र (कीबोर्ड: →)" : "Next Mantra (→)"}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  !mantra.nextId
                    ? "opacity-35 cursor-not-allowed bg-stone-100 text-stone-400 border-stone-200"
                    : themeObj.buttonPrimary
                }`}
              >
                <span>{isHindi ? "अगला" : "Next"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Bookmark Button */}
              <button
                type="button"
                onClick={handleToggleFavorite}
                title={isBookmarked ? (isHindi ? "पसंदीदा से हटाएं" : "Remove from favorites") : (isHindi ? "पसंदीदा में सहेजें" : "Save to favorites")}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  isBookmarked
                    ? "bg-amber-600 text-white border-amber-700 shadow-xs"
                    : themeObj.buttonSecondary
                }`}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4 fill-white" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{isBookmarked ? (isHindi ? "सहेजा गया" : "Saved") : (isHindi ? "सहेजें" : "Save")}</span>
              </button>

              {/* Focus Mode Toggle */}
              <button
                type="button"
                onClick={() => setFocusMode((p) => !p)}
                title={focusMode ? (isHindi ? "विस्तृत दृश्य में लौटें (F)" : "Exit Focus Mode (F)") : (isHindi ? "ध्यान मोड - एकाग्र पठन (F)" : "Focus Mode (F)")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  focusMode
                    ? "bg-amber-500 text-stone-950 border-amber-400 ring-2 ring-amber-400"
                    : themeObj.buttonSecondary
                }`}
              >
                {focusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{focusMode ? (isHindi ? "सामान्य दृश्य" : "Normal View") : (isHindi ? "ध्यान मोड" : "Focus Mode")}</span>
              </button>
            </div>
          </div>

          {/* Row B: Comprehensive Reading Controls (Themes • Font Scaler • Script • Audio • Japa) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-amber-200/40">
            {/* 1. Theme Switcher (सात्विक • ध्यान • ताम्रपत्र • सुस्पष्ट) */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-75 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-amber-600" />
                <span>{isHindi ? "थीम:" : "Theme:"}</span>
              </span>
              <div className="flex items-center p-0.5 rounded-xl border border-amber-200/60 bg-black/5 dark:bg-white/5 text-xs font-bold">
                {Object.values(THEMES).map((th) => {
                  const IconC = th.icon;
                  const isActive = currentTheme === th.id;
                  return (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => setCurrentTheme(th.id)}
                      title={`${th.name} (${th.subName})`}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer text-xs ${
                        isActive
                          ? "bg-amber-600 text-white font-bold shadow-2xs scale-102"
                          : "opacity-75 hover:opacity-100 hover:bg-black/5"
                      }`}
                    >
                      <IconC className="w-3 h-3" />
                      <span>{th.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Font Scaler (5 Sizes) */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-75 flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-amber-600" />
                <span>{isHindi ? "आकार:" : "Size:"}</span>
              </span>
              <div className="flex items-center p-0.5 rounded-xl border border-amber-200/60 bg-black/5 dark:bg-white/5 text-xs font-bold">
                {FONT_SIZES.map((sz, idx) => (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => setFontSizeIndex(idx)}
                    title={sz.title}
                    className={`px-2 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                      fontSizeIndex === idx
                        ? "bg-amber-600 text-white shadow-2xs"
                        : "opacity-75 hover:opacity-100 hover:bg-black/5"
                    }`}
                  >
                    {sz.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Font Style (Serif Vedic vs Clean Sans) */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <div className="flex items-center p-0.5 rounded-xl border border-amber-200/60 bg-black/5 dark:bg-white/5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setFontFamily("serif")}
                  title={isHindi ? "शास्त्रीय वैदिक लिपि (Classical Noto Serif)" : "Classical Noto Serif"}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-serif ${
                    fontFamily === "serif"
                      ? "bg-amber-600 text-white font-bold shadow-2xs"
                      : "opacity-75 hover:opacity-100 hover:bg-black/5"
                  }`}
                >
                  {isHindi ? "शास्त्रीय (Serif)" : "Serif"}
                </button>
                <button
                  type="button"
                  onClick={() => setFontFamily("sans")}
                  title={isHindi ? "आधुनिक सुस्पष्ट लिपि (Modern Clean Sans)" : "Modern Clean Sans"}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-sans ${
                    fontFamily === "sans"
                      ? "bg-amber-600 text-white font-bold shadow-2xs"
                      : "opacity-75 hover:opacity-100 hover:bg-black/5"
                  }`}
                >
                  {isHindi ? "सुस्पष्ट (Sans)" : "Sans"}
                </button>
              </div>
            </div>

            {/* 5. Utility Actions: Copy • Share • Japa Mala • Search */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Japa Mala Toggle */}
              <button
                type="button"
                onClick={() => setShowJapa((prev) => !prev)}
                title={isHindi ? "जप माला काउंटर (Japa Mala Bead Counter)" : "Japa Mala Bead Counter"}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  showJapa
                    ? "bg-amber-700 text-white border-amber-800 ring-2 ring-amber-400 shadow-sm"
                    : themeObj.buttonSecondary
                }`}
              >
                <Bell className="w-3.5 h-3.5 text-amber-500" />
                <span>{isHindi ? "जप माला" : "Japa Mala"} {japaCount > 0 ? `(${japaCount}/${japaTarget})` : ""}</span>
              </button>

              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopyMantra}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${themeObj.buttonSecondary}`}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isHindi ? "कॉपी हुआ!" : "Copied!") : (isHindi ? "कॉपी" : "Copy")}</span>
              </button>

              {/* Share */}
              <button
                type="button"
                onClick={handleShare}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${themeObj.buttonSecondary}`}
                title={isHindi ? "मंत्र साझा करें" : "Share Mantra"}
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>

              {/* Search / Jump Button */}
              <button
                type="button"
                onClick={() => setShowFinder((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  showFinder ? "bg-amber-600 text-white border-amber-700" : themeObj.buttonSecondary
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>{showFinder ? (isHindi ? "बंद करें" : "Close") : (isHindi ? "मंत्र खोजें" : "Find Mantra")}</span>
              </button>
            </div>
          </div>

          {/* Quick Mantra Jump Modal / Drawer */}
          {showFinder && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border mt-3 transition-all space-y-4 shadow-xl ${
                themeObj.cardBg
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <h3 className="font-serif text-sm font-bold text-amber-900 dark:text-amber-300">
                    {isHindi ? "वेदमंत्र त्वरित खोज एवं जम्प (Live Vedic Finder)" : "Live Vedic Finder & Direct Jump"}
                  </h3>
                </div>

                {/* Veda Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
                  {[
                    { id: "all", label: isHindi ? "सभी वेद" : "All Vedas" },
                    { id: "rigveda", label: isHindi ? "ऋग्वेद" : "Rigveda" },
                    { id: "yajurveda", label: isHindi ? "यजुर्वेद" : "Yajurveda" },
                    { id: "samaveda", label: isHindi ? "सामवेद" : "Samaveda" },
                    { id: "atharvaveda", label: isHindi ? "अथर्ववेद" : "Atharvaveda" },
                    { id: "upanishad", label: isHindi ? "उपनिषद" : "Upanishad" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setFinderVeda(tab.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        finderVeda === tab.id
                          ? "bg-amber-700 text-white font-bold shadow-2xs"
                          : themeObj.chipBg
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deity Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                <span className="text-[11px] font-bold text-[#555555] shrink-0 mr-1">
                  {isHindi ? "देवता (Deity):" : "Deity:"}
                </span>
                {[
                  { id: "all", label: isHindi ? "समस्त देव" : "All Deities" },
                  { id: "shiva", label: isHindi ? "भगवान शिव" : "Lord Shiva" },
                  { id: "vishnu", label: isHindi ? "भगवान विष्णु" : "Lord Vishnu" },
                  { id: "devi", label: isHindi ? "देवी व सावित्री" : "Devi & Savitri" },
                  { id: "surya", label: isHindi ? "सूर्य देव" : "Surya Deva" },
                  { id: "agni", label: isHindi ? "अग्नि व यज्ञ" : "Agni & Yajna" }
                ].map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setFinderDeity(chip.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      finderDeity === chip.id
                        ? "bg-[#FFD21F] text-[#111111] border-[#FFD21F] shadow-2xs font-extrabold"
                        : themeObj.chipBg
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={finderQuery}
                  onChange={(e) => setFinderQuery(e.target.value)}
                  placeholder={isHindi ? "मंत्र संख्या (उदा: 1.1.1), सूक्त (उदा: Purusha), या संस्कृत शब्द..." : "Mantra number (e.g. 1.1.1), Sukta (e.g. Purusha), or Sanskrit word..."}
                  className="w-full pl-9 pr-8 py-2 rounded-xl text-xs border border-amber-300/80 bg-black/5 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500 font-devanagari"
                  autoFocus
                />
                {finderQuery && (
                  <button
                    type="button"
                    onClick={() => setFinderQuery("")}
                    className="p-1 text-stone-400 hover:text-stone-700 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Mantra Results Grid */}
              <div className="max-h-64 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {matchingMantras.length === 0 ? (
                  <div className="py-6 text-center text-xs text-stone-400">
                    {isHindi ? "कोई मंत्र नहीं मिला। कृपया भिन्न कीवर्ड या मंत्र संख्या टाइप करें।" : "No mantra found. Please try another keyword or mantra number."}
                  </div>
                ) : (
                  matchingMantras.map((m) => {
                    const isCurrent = m.id === mantra.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => {
                          navigate(`/library/mantra/${m.id}`);
                          setShowFinder(false);
                        }}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isCurrent
                            ? "bg-amber-100/90 border-amber-500 text-amber-950 font-bold ring-1 ring-amber-500"
                            : themeObj.chipBg
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-600 text-white">
                              {m.textName} • {m.mantraNumber}
                            </span>
                            <span className="text-[10px] opacity-75 font-mono">{m.sectionRef}</span>
                          </div>
                          <p className="font-devanagari text-xs truncate font-medium">{m.sanskrit}</p>
                          <p className="font-devanagari text-[11px] opacity-75 truncate">{m.hindiTranslation}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Favorites List Modal / Drawer */}
          {showFavorites && (
            <div className={`p-4 sm:p-5 rounded-2xl border mt-3 transition-all space-y-3 shadow-xl ${themeObj.cardBg}`}>
              <div className="flex items-center justify-between border-b pb-2.5 border-amber-200/50">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 fill-amber-600 text-amber-600" />
                  <h3 className="font-serif text-sm font-bold">
                    {isHindi ? `आपके सहेजे गए प्रिय मंत्र (${favoritesList.length})` : `Your Saved Favorite Mantras (${favoritesList.length})`}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFavorites(false)}
                  className="p-1 rounded-lg hover:bg-black/5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {favoritesList.length === 0 ? (
                <div className="py-6 text-center text-xs opacity-60">
                  {isHindi ? "अभी कोई पसंदीदा मंत्र नहीं सहेजा गया है। मंत्र पढ़ते समय 'सहेजें' बटन दबाएँ।" : "No favorite mantras saved yet. Click the 'Save' button while reading."}
                </div>
              ) : (
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                  {favoritesList.map((favId) => {
                    const favMantra = getMantraById(favId);
                    if (!favMantra) return null;
                    return (
                      <div
                        key={favId}
                        onClick={() => {
                          navigate(`/library/mantra/${favId}`);
                          setShowFavorites(false);
                        }}
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${themeObj.chipBg}`}
                      >
                        <div className="min-w-0 flex-1">
                          <strong className="text-xs font-serif block text-amber-800 dark:text-amber-300">
                            {favMantra.textName} • मंत्र {favMantra.mantraNumber}
                          </strong>
                          <p className="text-[11px] font-devanagari truncate">{favMantra.sanskrit}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ==================================================================== */}
      {/* 2.5 SACRED VEDIC HERO BANNER (Veda, Shakha, Rishi & Devata)          */}
      {/* ==================================================================== */}
      {!focusMode && (
        <section className="relative overflow-hidden bg-[#170e07] text-white border-b border-amber-900/60 py-5 sm:py-8 lg:py-10 px-3.5 sm:px-6 lg:px-8 shadow-xl">
          {/* Authentic Real Banner with opacity 80-85% and subtle luminous overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={VEDA_BANNERS[mantra.vedaId] || bannerSanctum}
              alt={`${mantraDisplayTitle} — देवता: ${mantra.devata || "वैदिक"}, ऋषि: ${mantra.rishi || "वैदिक"} | Veda Library`}
              className="w-full h-full object-cover object-center opacity-80 sm:opacity-85 scale-102 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140b05] via-[#1c1108]/65 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-[#140b05]/80" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto space-y-3.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F] text-[#111111] text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>{mantra.vedaName || "वैदिक संहिता"}</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/15 border border-white/30 text-amber-200 text-xs font-semibold backdrop-blur-xs">
                {mantra.shakha || "प्रामाणिक शाखा"}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#C62828] text-white text-xs font-bold shadow-xs">
                ऋचा {mantra.mantraNumber}
              </span>
            </div>

            <div>
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                {mantra.textName}
              </h1>
              <p className="font-sans text-xs sm:text-sm text-amber-200/90 mt-1.5 font-medium">
                {mantra.sectionRef} • संहिता पाठ
              </p>
            </div>

            <p className="text-xs sm:text-sm text-amber-100/90 max-w-3xl leading-relaxed">
              ऋषि: <strong className="text-white font-semibold">{mantra.rishi || "वैदिक ऋषि"}</strong> • देवता: <strong className="text-white font-semibold">{mantra.devata || "परमेश्वर / अग्नि"}</strong> • छन्द: <strong className="text-[#FFD21F] font-bold">{mantra.chhanda || "गायत्री"}</strong> • स्वर: <span className="text-amber-200">{mantra.svara || "उदात्त-अनुदात्त-स्वरित"}</span>
            </p>
          </div>
        </section>
      )}

      {/* ==================================================================== */}
      {/* 3. MAIN SACRED SANCTUARY CONTAINER                                   */}
      {/* ==================================================================== */}
      <div className="max-w-7xl mx-auto px-[0.3rem] sm:px-6 lg:px-8 py-5 sm:py-8 pb-24 sm:pb-28 lg:pb-8 space-y-6 sm:space-y-8">
        
        {/* Mobile Horizontal Quick Numbers Strip (< lg) */}
        {!focusMode && siblingMantras.length > 1 && (
          <div className={`lg:hidden p-3 rounded-xl sm:rounded-2xl border shadow-2xs transition-all ${themeObj.cardBg}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>सूक्त के समस्त {siblingMantras.length} मंत्र:</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${themeObj.badge}`}>
                {siblingMantras.findIndex((s) => s.id === mantra.id) + 1} / {siblingMantras.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {siblingMantras.map((sib, sIdx) => {
                const isActive = sib.id === mantra.id;
                return (
                  <button
                    key={sib.id}
                    type="button"
                    onClick={() => navigate(`/library/mantra/${sib.id}`)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border shrink-0 ${
                      isActive
                        ? "bg-amber-600 text-white border-amber-700 shadow-xs scale-105"
                        : themeObj.chipBg
                    }`}
                  >
                    मंत्र {sib.mantraNumber || sIdx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 2-Column Responsive Layout (Main Sanctuary + Sticky Navigator) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================================================================ */}
          {/* LEFT COLUMN: Main Reading Sanctuary Canvas (lg:col-span-8)       */}
          {/* ================================================================ */}
          <main className={focusMode ? "lg:col-span-12 max-w-4xl mx-auto space-y-6" : "lg:col-span-8 space-y-6"}>
            
            {/* Shastric Meta Strip: Rishi • Devata • Chhanda • Svara */}
            <div className={`p-4 rounded-2xl border transition-all ${themeObj.cardBg}`}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-devanagari text-center divide-y sm:divide-y-0 sm:divide-x divide-amber-200/50">
                <div className="pt-2 sm:pt-0">
                  <span className="block text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                    ऋषि (Sage)
                  </span>
                  <strong className="font-serif text-sm">{mantra.rishi || "वैदिक ऋषि"}</strong>
                </div>
                <div className="pt-2 sm:pt-0 sm:pl-3">
                  <span className="block text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                    देवता (Deity)
                  </span>
                  <strong className="font-serif text-sm">{mantra.devata || "परमेश्वर / अग्नि"}</strong>
                </div>
                <div className="pt-2 sm:pt-0 sm:pl-3">
                  <span className="block text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                    छन्द (Meter)
                  </span>
                  <strong className="font-serif text-sm">{mantra.chhanda || "गायत्री"}</strong>
                </div>
                <div className="pt-2 sm:pt-0 sm:pl-3">
                  <span className="block text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                    स्वर / पाठ
                  </span>
                  <strong className="font-serif text-sm">{mantra.svara || "सस्वर वैदिक पाठ"}</strong>
                </div>
              </div>
            </div>

            {/* ============================================================== */}
            {/* CORE MANTRA SANCTUARY CARD (सर्वोत्कृष्ट पठन मन्दिर)            */}
            {/* ============================================================== */}
            <section
              className={`relative px-3.5 sm:px-7 md:px-8 py-5 sm:py-7 md:py-8 rounded-3xl border border-t-4 border-t-[#D9A441] border-l-4 border-l-[#D9A441] overflow-hidden transition-all duration-300 shadow-sm ${
                themeObj.sanctuaryBg
              } ${themeObj.subtleBorder}`}
            >
              {/* Subtle Vedic Watermark */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply">
                <img
                  src={VEDA_BANNERS[mantra.vedaId] || bannerSanctum}
                  alt={`${mantraDisplayTitle} — वैदिक पृष्ठभूमि कला | Veda Library`}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Sacred Corner Filigrees */}
              <div className="absolute top-4 left-5 text-[#D9A441] text-base font-serif select-none font-bold">
                ॥ ॐ ॥
              </div>
              <div className="absolute top-4 right-5 text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-[#111111] dark:text-stone-300 border border-[#E5E5E5] select-none">
                ऋचा {mantra.mantraNumber}
              </div>

              {/* Devanagari Sanskrit Block */}
              <div className="text-center py-5 sm:py-7">
                <div
                  style={{ lineHeight: 1.8 }}
                  className={`font-devanagari font-bold tracking-wide select-text transition-all ${
                    fontFamily === "serif" ? "font-serif" : "font-sans"
                  } ${currentFontSize.cls} ${themeObj.sanctuaryText}`}
                >
                  {renderedSanskritTokens}
                </div>

                {/* Bottom Decorative Ornament */}
                <div className="text-center text-[#D9A441] text-sm font-serif select-none mt-3 font-bold">
                  ॥ इति ॥
                </div>
              </div>

              {/* Word Highlight Notice if active */}
              {activeWordMatch && (
                <div className="mt-4 pt-3 border-t border-amber-200/50 flex items-center justify-center gap-2 text-xs font-devanagari animate-fade-in">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span className="font-bold text-amber-800 dark:text-amber-300">
                    चयनित पद: {activeWordMatch}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveWordMatch(null)}
                    className="underline text-[11px] opacity-70 hover:opacity-100 cursor-pointer ml-1"
                  >
                    (हटाएं)
                  </button>
                </div>
              )}
            </section>

            {/* ============================================================== */}
            {/* INTERACTIVE AUDIO & PRONUNCIATION BAR (उच्चारण व सस्वर पाठ)     */}
            {/* ============================================================== */}
            <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${themeObj.cardBg}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Left: Play/Pause controls & Title */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleToggleSpeech}
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold transition-all shadow-md cursor-pointer ${
                      isPlayingSpeech && !isPausedSpeech
                        ? "bg-amber-600 text-white ring-4 ring-amber-300 animate-pulse"
                        : themeObj.buttonPrimary
                    }`}
                    title={
                      isPlayingSpeech
                        ? isPausedSpeech
                          ? "पुनः चलाएं (Resume)"
                          : "रोकें (Pause)"
                        : "सस्वर पाठ सुनें (Listen Recitation)"
                    }
                  >
                    {isPlayingSpeech && !isPausedSpeech ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </button>

                  {isPlayingSpeech && (
                    <button
                      type="button"
                      onClick={handleStopSpeech}
                      title="पूरी तरह बंद करें"
                      className="p-2.5 rounded-xl border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer transition-colors"
                    >
                      <Square className="w-4 h-4 fill-red-700" />
                    </button>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <Headphones className="w-4 h-4 text-amber-600" />
                      <strong className="text-xs sm:text-sm font-bold">
                        {isPlayingSpeech
                          ? isPausedSpeech
                            ? (isHindi ? "पाठ स्थगित (Paused)" : "Recitation Paused")
                            : (isHindi ? "सस्वर उच्चारण चल रहा है..." : "Chanting in progress...")
                          : (isHindi ? "सस्वर पाठ एवं शुद्ध उच्चारण" : "Authentic Chanting & Pronunciation")}
                      </strong>
                    </div>
                    <span className="text-[11px] opacity-75">
                      {isHindi ? "वेब स्पीच सिंथेसाइज़र द्वारा प्रामाणिक ध्वनि" : "Authentic voice via Web Speech Synthesizer"}
                    </span>
                  </div>
                </div>

                {/* Center: Audio Wave Visualizer while playing */}
                {isPlayingSpeech && !isPausedSpeech && (
                  <div className="flex items-end gap-1 h-6 px-3 py-1 bg-amber-500/10 rounded-xl">
                    {[16, 24, 12, 28, 18, 26, 14, 22].map((height, i) => (
                      <div
                        key={i}
                        className="w-1 bg-amber-600 rounded-full transition-all duration-150"
                        style={{
                          height: `${Math.max(4, (height + (audioWaveTick * (i + 1)) % 16)) % 28}px`
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Right: Target Voice Switcher & Speed Controls */}
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Language Mode: Sanskrit vs Hindi */}
                  <div className="flex items-center p-0.5 rounded-xl border border-amber-200/60 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => {
                        setSpeechTarget("sanskrit");
                        if (isPlayingSpeech) handleStopSpeech();
                      }}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        speechTarget === "sanskrit" ? "bg-amber-600 text-white font-bold" : "opacity-75"
                      }`}
                    >
                      {isHindi ? "संस्कृत" : "Sanskrit"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSpeechTarget("hindi");
                        if (isPlayingSpeech) handleStopSpeech();
                      }}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        speechTarget === "hindi" ? "bg-amber-600 text-white font-bold" : "opacity-75"
                      }`}
                    >
                      {isHindi ? "हिंदी भावार्थ" : "Hindi Meaning"}
                    </button>
                  </div>

                  {/* Speed Controls: 0.75x, 1.0x, 1.25x */}
                  <div className="flex items-center p-0.5 rounded-xl border border-amber-200/60 text-xs font-bold">
                    {[
                      { rate: 0.75, label: `0.75x (${isHindi ? "धीमी" : "Slow"})` },
                      { rate: 1.0, label: `1.0x (${isHindi ? "सामान्य" : "Normal"})` },
                      { rate: 1.25, label: `1.25x (${isHindi ? "द्रुत" : "Fast"})` }
                    ].map((sp) => (
                      <button
                        key={sp.rate}
                        type="button"
                        onClick={() => handleChangeSpeechRate(sp.rate)}
                        className={`px-2 py-1 rounded-lg transition-colors cursor-pointer text-[11px] ${
                          speechRate === sp.rate ? "bg-amber-600 text-white font-bold" : "opacity-75"
                        }`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================== */}
            {/* DIGITAL JAPA MALA & RECITATION COUNTER (जप माला काउंटर)        */}
            {/* ============================================================== */}
            {showJapa && (
              <div
                className={`p-6 sm:p-8 rounded-3xl border border-[#E5E5E5] border-t-4 border-t-[#D9A441] shadow-xs transition-all space-y-6 ${
                  themeObj.cardBg
                }`}
              >
                <div className="flex items-center justify-between border-b pb-3 border-[#E5E5E5]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#FFD21F] text-[#111111] flex items-center justify-center font-bold text-sm shadow-2xs">
                      ॐ
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#111111] dark:text-amber-300">
                        {isHindi ? "डिजिटल जप माला काउंटर" : "Digital Japa Mala Counter"}
                      </h3>
                      <p className="text-[11px] opacity-75">
                        {isHindi ? "मंत्र का श्रद्धापूर्वक अनुष्ठान एवं जप संख्या का व्यवस्थित संकलन" : "Devotional chanting count and systematic tracking"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Chime Sound Mute/Unmute */}
                    <button
                      type="button"
                      onClick={() => setJapaSound((p) => !p)}
                      title={japaSound ? (isHindi ? "मंदिर घंटी ध्वनि चालू है" : "Chime sound enabled") : (isHindi ? "ध्वनि म्यूट है" : "Sound muted")}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${themeObj.buttonSecondary}`}
                    >
                      {japaSound ? <Volume2 className="w-4 h-4 text-[#D9A441]" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={handleResetJapa}
                      title={isHindi ? "माला रीसेट करें" : "Reset Mala"}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${themeObj.buttonSecondary}`}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Target Counter Switcher Chips */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold opacity-75">{isHindi ? "संकल्प लक्ष्य:" : "Target:"}</span>
                    {[11, 21, 54, 108].map((target) => (
                      <button
                        key={target}
                        type="button"
                        onClick={() => {
                          setJapaTarget(target);
                          triggerToast(isHindi ? `जप लक्ष्य: ${target} बार निर्धारित किया गया।` : `Japa target set to ${target} chants.`);
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          japaTarget === target
                            ? "bg-[#FFD21F] text-[#111111] border-[#FFD21F] shadow-2xs font-extrabold"
                            : themeObj.chipBg
                        }`}
                      >
                        {target} {isHindi ? "बार" : "chants"}
                      </button>
                    ))}
                  </div>

                  <span className="text-xs font-semibold opacity-75">
                    {isHindi ? "आज का कुल जप: " : "Today's Total: "}<strong className="text-[#C62828] font-mono text-sm">{todayTotalJapa}</strong>
                  </span>
                </div>

                {/* Visual Bead Progress Ring & Count Action Area */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
                  {/* Circular SVG Ring */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      {/* Background Ring */}
                      <circle
                        cx="50"
                        cy="50"
                        r={circleRadius}
                        className="stroke-[#E5E5E5] dark:stroke-amber-950/60 fill-none"
                        strokeWidth="7"
                      />
                      {/* Active Progress Ring */}
                      <circle
                        cx="50"
                        cy="50"
                        r={circleRadius}
                        className="stroke-[#FFD21F] transition-all duration-300 ease-out fill-none"
                        strokeWidth="7"
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={strokeOffset}
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="absolute text-center flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold font-mono text-[#111111] dark:text-amber-300 leading-none">
                        {japaCount}
                      </span>
                      <span className="text-[10px] font-bold opacity-60 uppercase mt-0.5">
                        {isHindi ? "लक्ष्य" : "Target"} {japaTarget}
                      </span>
                      <span className="text-[10px] font-semibold text-[#D9A441]">
                        {malaProgress}% {isHindi ? "पूर्ण" : "done"}
                      </span>
                    </div>
                  </div>

                  {/* Main Tactile Japa Count Button */}
                  <div className="flex flex-col items-center sm:items-start gap-3">
                    <button
                      type="button"
                      onClick={handleIncrementJapa}
                      className="group px-8 py-4 rounded-2xl bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-serif text-lg font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-3 border border-[#D9A441]"
                    >
                      <Bell className="w-5 h-5 text-[#C62828] group-hover:rotate-12 transition-transform" />
                      <span>{isHindi ? "॥ जप करें (+१) ॥" : "॥ Count Japa (+1) ॥"}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const newCount = japaCount + 10;
                          setJapaCount(newCount);
                          if (japaSound) playTempleChime(528, 1);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${themeObj.buttonSecondary}`}
                      >
                        {isHindi ? "+10 शीघ्र जोड़ें" : "+10 Quick Add"}
                      </button>
                      <span className="text-[11px] opacity-60">
                        {isHindi ? (
                          <>(कीबोर्ड: <strong>Spacebar</strong> दबाकर भी जप कर सकते हैं)</>
                        ) : (
                          <>(Press <strong>Spacebar</strong> to count)</>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Completion Banner */}
                {japaCount >= japaTarget && (
                  <div className="p-4 rounded-2xl bg-[#FFD21F]/15 border border-[#FFD21F] text-center space-y-1.5 animate-bounce">
                    <div className="font-serif text-lg font-bold text-[#111111] flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#D9A441]" />
                      <span>{isHindi ? `॥ ${japaTarget} जप संकल्प पूर्ण • ॐ तत्सत् ॥` : `॥ ${japaTarget} Chants Completed • Om Tat Sat ॥`}</span>
                      <Sparkles className="w-5 h-5 text-[#D9A441]" />
                    </div>
                    <p className="text-xs opacity-80">
                      {isHindi
                        ? "आपका पवित्र अनुष्ठान पूर्ण हुआ। प्रभु की कृपा व शांति सदा आपके साथ रहे।"
                        : "Your sacred practice is complete. May peace and grace remain with you always."}
                    </p>
                    <button
                      type="button"
                      onClick={handleResetJapa}
                      className="mt-2 px-4 py-1.5 rounded-xl bg-[#C62828] text-white text-xs font-bold shadow-xs cursor-pointer hover:bg-[#B71C1C] transition-colors"
                    >
                      {isHindi ? "नई माला प्रारंभ करें" : "Start New Mala"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================== */}
            {/* MULTI-TRANSLATION TABS & COMBINED VIEW                           */}
            {/* ============================================================== */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-6 ${themeObj.cardBg}`}>
              
              {/* Tabs Navigation Header + 'View All Together' Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-amber-200/50">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs font-bold">
                  {[
                    { id: "hindi", label: isHindi ? "सरल हिन्दी भावार्थ" : "Hindi Meaning", icon: BookOpen },
                    { id: "english", label: isHindi ? "English अनुवाद" : "English Translation", icon: Info },
                    { id: "hinglish", label: isHindi ? "Hinglish व्याख्या" : "Hinglish Guide", icon: Languages },
                    { id: "anvaya", label: isHindi ? "अन्वय (Prose Order)" : "Anvaya (Prose Order)", icon: AlignLeft },
                    { id: "shastric", label: isHindi ? "शास्त्रीय संदर्भ व फल" : "Context & Benefits", icon: Flame }
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = activeTab === tab.id && !viewAllTranslations;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(tab.id);
                          setViewAllTranslations(false);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap border ${
                          isActive
                            ? "bg-[#FFD21F] text-[#111111] border-[#FFD21F] shadow-xs font-bold"
                            : themeObj.chipBg
                        }`}
                      >
                        <TabIcon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* View All Together Toggle */}
                <button
                  type="button"
                  onClick={() => setViewAllTranslations((p) => !p)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shrink-0 ${
                    viewAllTranslations
                      ? "bg-[#FFD21F] text-[#111111] border-[#FFD21F] shadow-xs font-bold ring-2 ring-[#FFD21F]/40"
                      : themeObj.buttonSecondary
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>{viewAllTranslations ? (isHindi ? "एकल टैब दृश्य" : "Single Tab Mode") : (isHindi ? "एक साथ सभी भाषाएँ देखें" : "View All Translations")}</span>
                </button>
              </div>

              {/* Render Content: Single Tab Mode OR View All Together Mode */}
              <div className="space-y-6">
                {/* 1. HINDI TRANSLATION */}
                {(viewAllTranslations || activeTab === "hindi") && (
                  <div className={`p-5 rounded-2xl border transition-all ${themeObj.cardSubtle}`}>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-amber-600" />
                        <h4 className="font-serif text-sm sm:text-base font-bold text-amber-900 dark:text-amber-300">
                          प्रामाणिक सरल हिन्दी भावार्थ (Authentic Hindi Meaning)
                        </h4>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                        वेद भाष्य
                      </span>
                    </div>
                    <p className="font-devanagari text-sm sm:text-base leading-relaxed select-text font-normal">
                      {mantra.hindiTranslation}
                    </p>
                  </div>
                )}

                {/* 2. ENGLISH TRANSLATION */}
                {(viewAllTranslations || activeTab === "english") && (
                  <div className={`p-5 rounded-2xl border transition-all ${themeObj.cardSubtle}`}>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-amber-600" />
                        <h4 className="font-serif text-sm sm:text-base font-bold text-amber-900 dark:text-amber-300">
                          Authentic English Translation & Exposition
                        </h4>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                        Scholarly English
                      </span>
                    </div>
                    <p className="font-serif text-sm sm:text-base leading-relaxed select-text font-normal">
                      {mantra.englishTranslation || mantra.hindiTranslation}
                    </p>
                  </div>
                )}

                {/* 3. HINGLISH EXPLANATION */}
                {(viewAllTranslations || activeTab === "hinglish") && (
                  <div className={`p-5 rounded-2xl border transition-all ${themeObj.cardSubtle}`}>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Languages className="w-4 h-4 text-amber-600" />
                        <h4 className="font-serif text-sm sm:text-base font-bold text-amber-900 dark:text-amber-300">
                          सरल हिंग्लिश व्याख्या (Youth & Global Learner Guide)
                        </h4>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                        Hinglish Guide
                      </span>
                    </div>
                    <p className="font-sans text-sm sm:text-base leading-relaxed select-text">
                      {mantra.hinglishTranslation || mantra.hindiTranslation}
                    </p>
                  </div>
                )}

                {/* 4. ANVAYA (PROSE ORDER) */}
                {(viewAllTranslations || activeTab === "anvaya") && (
                  <div className={`p-5 rounded-2xl border transition-all ${themeObj.cardSubtle}`}>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <AlignLeft className="w-4 h-4 text-amber-600" />
                        <h4 className="font-serif text-sm sm:text-base font-bold text-amber-900 dark:text-amber-300">
                          वैदिक अन्वय (Prose Syntactic Order - कर्ता, कर्म, क्रिया क्रम)
                        </h4>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                        अन्वयक्रम
                      </span>
                    </div>
                    <p className="font-devanagari text-sm sm:text-base leading-loose select-text font-medium text-amber-950 dark:text-amber-200">
                      {syntheticAnvaya}
                    </p>
                    <p className="mt-2 text-[11px] opacity-75">
                      (अन्वय से संस्कृत श्लोक का गद्यात्मक वाक्य क्रम स्पष्ट होता है जिससे प्रत्येक शब्द का संबंध सरलता से समझ आता है।)
                    </p>
                  </div>
                )}

                {/* 5. SHASTRIC CONTEXT & VINIYOGA */}
                {(viewAllTranslations || activeTab === "shastric") && (
                  <div className={`p-5 rounded-2xl border transition-all ${themeObj.cardSubtle}`}>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-amber-600" />
                        <h4 className="font-serif text-sm sm:text-base font-bold text-amber-900 dark:text-amber-300">
                          शास्त्रीय संदर्भ, याज्ञिक विनियोग एवं जप फल (Shastric Context & Fruit)
                        </h4>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                        याज्ञिक प्रयोग
                      </span>
                    </div>
                    <div className="font-devanagari text-xs sm:text-sm leading-relaxed space-y-3">
                      {mantra.viniyoga && (
                        <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-400/40 text-xs">
                          <span className="text-amber-900 dark:text-amber-300 block mb-1 font-bold text-xs sm:text-sm">
                            ॥ प्रामाणिक वैदिक विनियोग (Ritual Application) ॥
                          </span>
                          <p className="font-devanagari font-medium text-amber-950 dark:text-amber-200 leading-relaxed select-text">
                            {mantra.viniyoga}
                          </p>
                        </div>
                      )}
                      <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-amber-200/40">
                        <span className="text-amber-900 dark:text-amber-300 block mb-1 font-bold text-xs uppercase tracking-wider">
                          शास्त्रीय संदर्भ व परिचय
                        </span>
                        <p className="leading-relaxed select-text">{mantra.shastricContext}</p>
                      </div>
                      {mantra.bhashyaSummary && (
                        <div className="p-3.5 rounded-xl bg-amber-900/5 dark:bg-amber-100/5 border border-amber-300/40 text-xs leading-relaxed">
                          <span className="text-amber-900 dark:text-amber-300 block mb-1 font-bold text-xs sm:text-sm">
                            ॥ शास्त्रीय वेदभाष्य व व्याख्या (Scholarly Bhashya) ॥
                          </span>
                          <p className="font-devanagari text-stone-800 dark:text-stone-200 leading-relaxed select-text">
                            {mantra.bhashyaSummary}
                          </p>
                        </div>
                      )}
                      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-xs">
                        <span className="text-amber-800 dark:text-amber-300 block mb-1 font-bold text-xs sm:text-sm">
                          ॥ जप फल व आध्यात्मिक साधना लाभ (Sadhana Phala) ॥
                        </span>
                        <p className="leading-relaxed select-text">
                          {mantra.sadhanaPhala || "इस पवित्र वैदिक मंत्र का नित्य सस्वर पाठ करने से बुद्धि की प्रखरता, आध्यात्मिक तेज, अग्नि तत्व का संतुलन तथा परम ऐश्वर्य की प्राप्ति होती है।"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ============================================================== */}
            {/* INTERACTIVE WORD-BY-WORD (पदार्थ / Padapatha) EXPLORER          */}
            {/* ============================================================== */}
            {showPadapatha && mantra.padapatha && mantra.padapatha.length > 0 && (
              <div className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-5 ${themeObj.cardBg}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 border-amber-200/50">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-amber-900 dark:text-amber-300">
                        पदच्छेद एवं पदार्थ विन्यास (Interactive Padapatha Explorer)
                      </h3>
                      <p className="text-[11px] opacity-75">
                        किसी भी पद पर क्लिक करें - मुख्य मंत्र में उसका स्थान उजागर होगा
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* View Switcher: Grid vs Table */}
                    <div className="flex items-center p-0.5 rounded-xl border border-amber-200/60 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setPadapathaViewMode("grid")}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          padapathaViewMode === "grid" ? "bg-amber-600 text-white" : "opacity-75"
                        }`}
                        title="कार्ड दृश्य"
                      >
                        <Grid className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPadapathaViewMode("table")}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          padapathaViewMode === "table" ? "bg-amber-600 text-white" : "opacity-75"
                        }`}
                        title="तालिका दृश्य"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-300/80 bg-amber-100/70 text-amber-900">
                      {mantra.padapatha.length} पद
                    </span>
                  </div>
                </div>

                {/* Padapatha Filter Input if > 5 words */}
                {mantra.padapatha.length > 5 && (
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={padapathaFilter}
                      onChange={(e) => setPadapathaFilter(e.target.value)}
                      placeholder="पद या अर्थ खोजें..."
                      className="w-full pl-8 pr-7 py-1.5 rounded-xl text-xs border border-amber-200/70 bg-black/5 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-amber-500 font-devanagari"
                    />
                    {padapathaFilter && (
                      <button
                        type="button"
                        onClick={() => setPadapathaFilter("")}
                        className="p-1 text-stone-400 hover:text-stone-700 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}

                {/* View Mode 1: Interactive Cards Grid */}
                {padapathaViewMode === "grid" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredPadapatha.map((item, idx) => {
                      const isMatched =
                        activeWordMatch &&
                        normalizeWordForMatching(activeWordMatch) === normalizeWordForMatching(item.word);
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            setActiveWordMatch((prev) => (prev === item.word ? null : item.word));
                          }}
                          onMouseEnter={() => setActiveWordMatch(item.word)}
                          onMouseLeave={() => setActiveWordMatch((prev) => (prev === item.word ? null : prev))}
                          className={`p-3 rounded-2xl border text-xs font-devanagari transition-all cursor-pointer ${
                            isMatched
                              ? themeObj.chipActive
                              : themeObj.chipBg
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-bold text-sm text-amber-800 dark:text-amber-300">
                              {item.word}
                            </span>
                            <span className="text-[9px] opacity-60 font-mono">#{idx + 1}</span>
                          </div>
                          <span className="block opacity-85 leading-relaxed">{item.meaning}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* View Mode 2: Classical Tabular View */}
                {padapathaViewMode === "table" && (
                  <div className="overflow-x-auto rounded-2xl border border-amber-200/60">
                    <table className="w-full text-left text-xs font-devanagari border-collapse">
                      <thead className="bg-amber-100/60 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200">
                        <tr>
                          <th className="py-2.5 px-3 font-bold border-b border-amber-200/60">क्र.</th>
                          <th className="py-2.5 px-3 font-bold border-b border-amber-200/60">वैदिक पद</th>
                          <th className="py-2.5 px-3 font-bold border-b border-amber-200/60">पदार्थ (अर्थ)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-200/40">
                        {filteredPadapatha.map((item, idx) => {
                          const isMatched =
                            activeWordMatch &&
                            normalizeWordForMatching(activeWordMatch) === normalizeWordForMatching(item.word);
                          return (
                            <tr
                              key={idx}
                              onClick={() => {
                                setActiveWordMatch((prev) => (prev === item.word ? null : item.word));
                              }}
                              className={`transition-colors cursor-pointer ${
                                isMatched ? "bg-amber-200/60 dark:bg-amber-900/60 font-bold" : "hover:bg-amber-500/10"
                              }`}
                            >
                              <td className="py-2.5 px-3 opacity-60 font-mono">{idx + 1}</td>
                              <td className="py-2.5 px-3 font-bold text-amber-800 dark:text-amber-300">
                                {item.word}
                              </td>
                              <td className="py-2.5 px-3 opacity-90">{item.meaning}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================== */}
            {/* SOURCE & BIBLIOGRAPHIC REFERENCE CARD (स्रोत एवं संदर्भ)        */}
            {/* ============================================================== */}
            <div className={`p-6 sm:p-7 rounded-3xl border transition-all space-y-4 ${themeObj.cardBg}`}>
              <div className="flex items-center justify-between border-b pb-3 border-[#E5E5E5]">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#D9A441]" />
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#111111]">
                    स्रोत, संस्करण एवं संदर्भ विवरण (Source & Bibliographic Reference)
                  </h3>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[#111111] border border-[#FFD21F]">
                  प्रामाणिक श्रुति
                </span>
              </div>

              <div className="border border-[#E5E5E5] rounded-xl overflow-hidden shadow-xs bg-white">
                <table className="w-full text-xs font-devanagari divide-y divide-[#E5E5E5] min-w-[280px]">
                  <tbody className="divide-y divide-[#E5E5E5]">
                    <tr className="bg-[#F9F9F9]">
                      <td className="px-3.5 py-2.5 font-bold text-[#555555] w-1/3 shrink-0">मूल ग्रंथ / संहिता</td>
                      <td className="px-3.5 py-2.5 text-[#111111] font-bold">{mantra.textName} ({mantra.vedaName})</td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-bold text-[#555555]">शाखा / संस्करण</td>
                      <td className="px-3.5 py-2.5 text-[#111111]">{mantra.shakha || "प्रामाणिक वैदिक शाखा परंपरा"}</td>
                    </tr>
                    <tr className="bg-[#F9F9F9]">
                      <td className="px-3.5 py-2.5 font-bold text-[#555555]">मण्डल / सूक्त / ऋचा संख्या</td>
                      <td className="px-3.5 py-2.5 text-[#111111] font-semibold">{mantra.sectionRef} • ऋचा {mantra.mantraNumber}</td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-bold text-[#555555]">ऋषि (Seer)</td>
                      <td className="px-3.5 py-2.5 text-[#111111]">{mantra.rishi || "वैदिक ऋषि"}</td>
                    </tr>
                    <tr className="bg-[#F9F9F9]">
                      <td className="px-3.5 py-2.5 font-bold text-[#555555]">देवता (Presiding Deity)</td>
                      <td className="px-3.5 py-2.5 text-[#111111]">{mantra.devata || "परमेश्वर / अग्नि"}</td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-bold text-[#555555]">छन्द (Vedic Meter)</td>
                      <td className="px-3.5 py-2.5 text-[#D9A441] font-bold">{mantra.chhanda || "गायत्री"}</td>
                    </tr>
                    <tr className="bg-[#F9F9F9]">
                      <td className="px-3.5 py-2.5 font-bold text-[#555555]">समीक्षक एवं संपादन</td>
                      <td className="px-3.5 py-2.5 text-[#111111] font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Veda Library Editorial Board (विद्वत परिषद द्वारा सत्यापित)</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ============================================================== */}
            {/* SEQUENTIAL NAVIGATION BAR AT BOTTOM                             */}
            {/* ============================================================== */}
            <div
              className={`p-4 sm:p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm transition-all ${
                themeObj.cardBg
              }`}
            >
              {mantra.previousId ? (
                <button
                  type="button"
                  onClick={() => navigate(`/library/mantra/${mantra.previousId}`)}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs border transition-all cursor-pointer ${themeObj.buttonSecondary}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>← पिछला मंत्र ({mantra.previousId})</span>
                </button>
              ) : (
                <div className="text-xs opacity-50 italic">प्रथम मंत्र (First Mantra)</div>
              )}

              <div className="text-center">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                  {mantra.textName} • मंत्र {mantra.mantraNumber}
                </span>
                <span className="block text-[11px] opacity-60 mt-0.5">
                  कीबोर्ड पर ← / → दबाकर सीधे नेविगेट करें
                </span>
              </div>

              {mantra.nextId ? (
                <button
                  type="button"
                  onClick={() => navigate(`/library/mantra/${mantra.nextId}`)}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs border transition-all cursor-pointer ${themeObj.buttonPrimary}`}
                >
                  <span>अगला मंत्र ({mantra.nextId}) →</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="text-xs opacity-50 italic">अंतिम मंत्र (Last Mantra)</div>
              )}
            </div>
          </main>

          {/* ================================================================ */}
          {/* RIGHT COLUMN: Sticky Mantra Navigator Sidebar (lg:col-span-4)   */}
          {/* ================================================================ */}
          {!focusMode && (
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
              {siblingMantras.length > 0 && (
                <div className={`p-5 rounded-3xl border transition-all shadow-xs ${themeObj.cardBg}`}>
                  {/* Header & Progress Info */}
                  <div className="flex items-center justify-between border-b pb-3 mb-3 border-amber-200/60">
                    <div>
                      <h3 className="font-serif font-bold text-sm sm:text-base flex items-center gap-1.5 text-amber-900 dark:text-amber-300">
                        <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>समस्त मंत्र सूची ({siblingMantras.length})</span>
                      </h3>
                      <p className="text-[11px] opacity-75 font-medium">{mantra.textName}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${themeObj.badge}`}>
                        {siblingMantras.findIndex((s) => s.id === mantra.id) + 1} / {siblingMantras.length}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-amber-100 dark:bg-amber-950/60 rounded-full h-1.5 mb-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-600 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${((siblingMantras.findIndex((s) => s.id === mantra.id) + 1) / siblingMantras.length) * 100}%`
                      }}
                    />
                  </div>

                  {/* Quick Number Badges Grid (1 to N) */}
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider block mb-1.5">
                      संख्या अनुसार तुरंत खोलें (1 to {siblingMantras.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {siblingMantras.map((sib, sIdx) => {
                        const isActive = sib.id === mantra.id;
                        return (
                          <button
                            key={sib.id}
                            type="button"
                            onClick={() => navigate(`/library/mantra/${sib.id}`)}
                            title={`मंत्र ${sib.mantraNumber || sIdx + 1} खोलें`}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center border ${
                              isActive
                                ? "bg-amber-600 text-white border-amber-700 shadow-sm scale-110 font-black ring-2 ring-amber-400"
                                : themeObj.chipBg
                            }`}
                          >
                            {sIdx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Search Input within siblings (if > 4 mantras) */}
                  {siblingMantras.length > 4 && (
                    <div className="relative mb-3">
                      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={siblingSearch}
                        onChange={(e) => setSiblingSearch(e.target.value)}
                        placeholder="मंत्र सं. या शब्द खोजें..."
                        className="w-full pl-7 pr-7 py-1.5 rounded-xl text-xs border border-amber-200/70 bg-black/5 dark:bg-white/5 focus:outline-none"
                      />
                      {siblingSearch && (
                        <button
                          type="button"
                          onClick={() => setSiblingSearch("")}
                          className="p-0.5 text-stone-400 hover:text-stone-700 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Detailed Scrollable Mantra List with Text Snippets */}
                  <div className="max-h-[360px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                    {filteredSiblings.map((sib, sIdx) => {
                      const isActive = sib.id === mantra.id;
                      return (
                        <div
                          key={sib.id}
                          onClick={() => navigate(`/library/mantra/${sib.id}`)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 text-xs ${
                            isActive
                              ? "bg-amber-100/90 dark:bg-amber-900/60 border-amber-500 ring-1 ring-amber-400 shadow-xs font-bold"
                              : themeObj.chipBg
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-md font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 border ${
                              isActive
                                ? "bg-amber-600 text-white border-amber-700 font-extrabold"
                                : "bg-black/5 dark:bg-white/10"
                            }`}
                          >
                            {sIdx + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <strong className="text-[11px]">मंत्र {sib.mantraNumber}</strong>
                              {isActive && (
                                <span className="text-[9px] font-bold text-amber-800 bg-amber-200/90 px-1.5 py-0.2 rounded">
                                  वाचन में
                                </span>
                              )}
                            </div>
                            <p className="font-devanagari text-[11px] opacity-75 line-clamp-1">
                              {sib.sanskrit}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quick Reading Instruction Card */}
              <div className={`p-4 rounded-2xl border text-xs transition-all ${themeObj.cardBg}`}>
                <div className="flex items-center gap-2 mb-1.5 font-bold text-amber-800 dark:text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>सुगम पठन निर्देश</span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-75">
                  • कीबोर्ड पर <kbd className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-950 border border-amber-300 rounded font-mono text-[10px]">←</kbd> और <kbd className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-950 border border-amber-300 rounded font-mono text-[10px]">→</kbd> से अगला/पिछला मंत्र खोलें।
                  <br />
                  • <kbd className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-950 border border-amber-300 rounded font-mono text-[10px]">F</kbd> दबाकर ध्यान मोड में जाएँ।
                  <br />
                  • जप माला खुली होने पर <kbd className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-950 border border-amber-300 rounded font-mono text-[10px]">Space</kbd> से गणना करें।
                </p>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 4. STICKY MOBILE BOTTOM BAR (Thumb-Friendly Experience on Mobile)     */}
      {/* ==================================================================== */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-t border-amber-200/80 shadow-2xl py-2 px-3">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          {/* Previous Button - Section 40: Minimum 44px Touch Target */}
          <button
            type="button"
            disabled={!mantra.previousId}
            onClick={() => mantra.previousId && navigate(`/library/mantra/${mantra.previousId}`)}
            className={`flex-1 min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1 transition-all cursor-pointer ${
              !mantra.previousId ? "opacity-30 cursor-not-allowed" : themeObj.buttonSecondary
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>पिछला</span>
          </button>

          {/* Quick Audio Play Button - Section 40: Minimum 44px Touch Target */}
          <button
            type="button"
            onClick={handleToggleSpeech}
            className={`min-h-[44px] min-w-[44px] p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              isPlayingSpeech && !isPausedSpeech
                ? "bg-amber-600 text-white ring-2 ring-amber-400"
                : themeObj.buttonSecondary
            }`}
            title="पाठ सुनें"
          >
            {isPlayingSpeech && !isPausedSpeech ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>

          {/* Quick Japa Mala Counter - Section 40: Minimum 44px Touch Target */}
          <button
            type="button"
            onClick={() => setShowJapa((p) => !p)}
            className={`min-h-[44px] min-w-[44px] p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              showJapa ? "bg-amber-700 text-white ring-2 ring-amber-400" : themeObj.buttonSecondary
            }`}
            title="जप माला"
          >
            <Bell className="w-5 h-5 text-amber-500" />
          </button>

          {/* Bookmark Button - Section 40: Minimum 44px Touch Target */}
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`min-h-[44px] min-w-[44px] p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              isBookmarked ? "bg-amber-600 text-white" : themeObj.buttonSecondary
            }`}
            title="सहेजें"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 fill-white" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>

          {/* Next Button - Section 40: Minimum 44px Touch Target */}
          <button
            type="button"
            disabled={!mantra.nextId}
            onClick={() => mantra.nextId && navigate(`/library/mantra/${mantra.nextId}`)}
            className={`flex-1 min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1 transition-all cursor-pointer ${
              !mantra.nextId ? "opacity-30 cursor-not-allowed" : themeObj.buttonPrimary
            }`}
          >
            <span>अगला</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
