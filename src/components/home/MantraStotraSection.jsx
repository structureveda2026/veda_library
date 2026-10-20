import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Volume2,
  VolumeX,
  Sparkles,
  Copy,
  Check,
  Languages,
  BookOpen,
  Flame,
  ChevronDown,
  ChevronUp,
  Feather
} from "lucide-react";
import { getMantraById } from "../../data/vedicMantrasData.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

// Curated Sacred Mahamantras & Stotras for Home Experience
const SACRED_HOME_MANTRAS_CONFIG = [
  // 1. वैदिक महामंत्र
  {
    id: "rv-7-59-12",
    category: "वैदिक महामंत्र",
    title: "महामृत्युंजय महामंत्र",
    sourceBadge: "ऋग्वेद ७.५९.१२ — संजीवनी महामंत्र",
    featuredTag: "संजीवनी महामंत्र",
    spiritualPurport: "अकाल मृत्यु, भय एवं दैहिक-दैविक-भौतिक तापों का शमन; साधक को आरोग्य, दीर्घायु एवं अमृतत्व (मोक्ष) की प्राप्ति।",
    shortSource: "ऋग्वेद (शाकल शाखा)"
  },
  {
    id: "rv-3-62-10",
    category: "वैदिक महामंत्र",
    title: "गायत्री महामंत्र",
    sourceBadge: "ऋग्वेद ३.६२.१० / यजुर्वेद ३६.३ — वेदमाता महामंत्र",
    featuredTag: "वेदमाता महामंत्र",
    spiritualPurport: "सविता नारायण के दिव्य तेज द्वारा साधक की मेधा, प्रज्ञा और अंतःप्रेरणा की जागृति; सनातन संस्कृति का परम गुरुमंत्र।",
    shortSource: "ऋग्वेद / यजुर्वेद"
  },
  {
    id: "rv-1-1-1",
    category: "वैदिक महामंत्र",
    title: "अग्नि सूक्त (प्रथम ऋचा)",
    sourceBadge: "ऋग्वेद १.१.१ — मंगलाचरण ऋचा",
    featuredTag: "ऋग्वेद प्रथम ऋचा",
    spiritualPurport: "यज्ञिय चेतना और अंतःअग्नि का प्रज्वलन; सर्वविध ज्ञान, ऐश्वर्य, सद्गुण एवं दिव्य तेज का मंगलाचरण।",
    shortSource: "ऋग्वेद मण्डल १"
  },
  {
    id: "rv-10-90-1",
    category: "वैदिक महामंत्र",
    title: "पुरुष सूक्त (विराट् पुरुष)",
    sourceBadge: "ऋग्वेद १०.९०.१ — विराट् ब्रह्माण्ड सूक्त",
    featuredTag: "विराट् ब्रह्माण्ड सूक्त",
    spiritualPurport: "समस्त चराचर सृष्टि में एक ही परम विराट् चेतना का दर्शन — अनेकता में एकात्मता का मूल वैदिक आधार।",
    shortSource: "ऋग्वेद मण्डल १०"
  },

  // 2. उपनिषद महावाक्य
  {
    id: "up-kena-1",
    category: "उपनिषद महावाक्य",
    title: "केनोपनिषद् (जिज्ञासा मन्त्र)",
    sourceBadge: "सामवेद तलवकार — केनोपनिषद् १.१",
    featuredTag: "सामवेद उपनिषद्",
    spiritualPurport: "मन, वाणी, प्राण और नेत्रों के परे जो मूल प्रकाशक चैतन्य तत्व है, उस अविनाशी ब्रह्म की आध्यात्मिक जिज्ञासा।",
    shortSource: "केनोपनिषद् (सामवेद)"
  },
  {
    id: "vs-40-1",
    category: "उपनिषद महावाक्य",
    title: "ईशावास्योपनिषद् (ईशा वास्यमिदम्)",
    sourceBadge: "शुक्ल यजुर्वेद वाजसनेयि — ईशावास्योपनिषद् ४०.१",
    featuredTag: "ईशावास्य महावाक्य",
    spiritualPurport: "सम्पूर्ण ब्रह्माण्ड में ईश्वर की व्याप्ति का अनुभव करते हुए अनासक्त भाव से त्यागपूर्वक जीवन जीने का शाश्वत संदेश।",
    shortSource: "ईशावास्योपनिषद्"
  },
  {
    id: "up-mandukya-1",
    category: "उपनिषद महावाक्य",
    title: "माण्डूक्योपनिषद् (अयमात्मा ब्रह्म)",
    sourceBadge: "अथर्ववेद शौनक — माण्डूक्योपनिषद् १-२",
    featuredTag: "अयमात्मा ब्रह्म",
    spiritualPurport: "समस्त अस्तित्व ओंकार है, और यह जीवात्मा ही साक्षात् ब्रह्म है ('अयमात्मा ब्रह्म' — अथर्ववेदीय महावाक्य)।",
    shortSource: "माण्डूक्योपनिषद्"
  },
  {
    id: "up-tait-1-11",
    category: "उपनिषद महावाक्य",
    title: "तैत्तिरीयोपनिषद् (दीक्षांत उपदेश)",
    sourceBadge: "कृष्ण यजुर्वेद तैत्तिरीय — शिक्षावल्ली १.११",
    featuredTag: "दीक्षांत अनुशासन",
    spiritualPurport: "सत्यं वद, धर्मं चर — गुरुकुल का सार्वकालिक अनुशासन; सदाचार, स्वाध्याय व माता-पिता-गुरु को देवतुल्य मानना।",
    shortSource: "तैत्तिरीयोपनिषद्"
  },
  {
    id: "up-chandogya-6-8-7",
    category: "उपनिषद महावाक्य",
    title: "छान्दोग्योपनिषद् (तत्त्वमसि महावाक्य)",
    sourceBadge: "सामवेद कौथुम — छान्दोग्योपनिषद् ६.८.७",
    featuredTag: "तत्त्वमसि महावाक्य",
    spiritualPurport: "जो यह परम सूक्ष्म सत्य तत्व है, वही संपूर्ण विश्व का आत्मस्वरूप है; 'हे श्वेतकेतु! वह ब्रह्म तू ही है' (तत्त्वमसि)।",
    shortSource: "छान्दोग्योपनिषद्"
  },

  // 3. गीता एवं स्तोत्र
  {
    id: "bg-2-47",
    category: "गीता एवं स्तोत्र",
    title: "श्रीमद्भगवद्गीता (कर्मण्येवाधिकारस्ते)",
    sourceBadge: "महाभारत भीष्मपर्व — गीता २.४७",
    featuredTag: "निष्काम कर्मयोग",
    spiritualPurport: "कर्म पर तुम्हारा अधिकार है, फल पर कभी नहीं — फल की आसक्ति और अकर्मण्यता दोनों से मुक्त होकर निष्काम कर्मयोग।",
    shortSource: "श्रीमद्भगवद्गीता"
  },
  {
    id: "vr-aditya-hridaya",
    category: "गीता एवं स्तोत्र",
    title: "आदित्य हृदय स्तोत्र",
    sourceBadge: "वाल्मीकि रामायण — युद्धकाण्ड सर्ग १०५",
    featuredTag: "विजय प्रदाता स्तोत्र",
    spiritualPurport: "सूर्य नारायण की उपासना से आंतरिक दुर्बलताओं, भय व समस्त शत्रुओं पर विजय; अक्षय तेज और ऊर्जा की प्राप्ति।",
    shortSource: "वाल्मीकि रामायण"
  },
  {
    id: "vs-36-17",
    category: "गीता एवं स्तोत्र",
    title: "वैदिक विश्व शान्ति पाठ",
    sourceBadge: "शुक्ल यजुर्वेद वाजसनेयि — अध्याय ३६.१७",
    featuredTag: "वैदिक शान्ति पाठ",
    spiritualPurport: "द्युलोक, अंतरिक्ष, पृथ्वी, जल, औषधियों व ब्रह्माण्ड के समस्त घटकों में अखंड शांति और विश्व कल्याण की वैदिक प्रार्थना।",
    shortSource: "वाजसनेयि संहिता"
  }
];

const CATEGORY_TABS_CONFIG = [
  { id: "all", labelHi: "समस्त महामंत्र", labelEn: "All Mantras", count: 12 },
  { id: "vedic", labelHi: "वैदिक महामंत्र", labelEn: "Vedic Mantras", count: 4 },
  { id: "upanishad", labelHi: "उपनिषद महावाक्य", labelEn: "Upanishad Mahavakyas", count: 5 },
  { id: "gita_stotra", labelHi: "गीता एवं स्तोत्र", labelEn: "Gita & Stotras", count: 3 }
];

export default function MantraStotraSection({ onNavigateKnowledge }) {
  const navigate = useNavigate();
  const { isHindi } = useLanguage();

  const categoryTabs = CATEGORY_TABS_CONFIG.map((tab) => ({
    id: tab.id,
    label: isHindi ? tab.labelHi : tab.labelEn,
    count: tab.count
  }));

  // State Management
  const [activeCategoryTab, setActiveCategoryTab] = useState("all");
  const [copiedId, setCopiedId] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [langMode, setLangMode] = useState("all"); // 'all' | 'hindi' | 'english' | 'hinglish'
  const [fontSizeIndex, setFontSizeIndex] = useState(1); // 0: Normal, 1: Medium, 2: Large
  const [showAllMantras, setShowAllMantras] = useState(false);

  // Font sizing styles for Devanagari Sanskrit text
  const fontSizes = [
    { label: "अ", title: "सामान्य अक्षर", shlokaClass: "text-base sm:text-lg leading-relaxed sm:leading-[2]" },
    { label: "अ+", title: "मध्यम अक्षर", shlokaClass: "text-lg sm:text-xl lg:text-[22px] leading-loose sm:leading-[2.2]" },
    { label: "अ++", title: "वृहत् अक्षर", shlokaClass: "text-xl sm:text-2xl lg:text-[26px] leading-[2.2] sm:leading-[2.4]" }
  ];

  // Enrich items with verified Shastric data from library dataset
  const enrichedMantras = useMemo(() => {
    return SACRED_HOME_MANTRAS_CONFIG.map((cfg) => {
      const live = getMantraById(cfg.id);
      return {
        ...cfg,
        sanskrit: live?.sanskrit || "",
        hindiTranslation: live?.hindiTranslation || "",
        englishTranslation: live?.englishTranslation || cfg.englishTranslation || "",
        hinglishTranslation: live?.hinglishTranslation || cfg.hinglishTranslation || "",
        spiritualPurport: live?.shastricContext || cfg.spiritualPurport,
        rishi: live?.rishi || "वैदिक ऋषि परंपरा",
        devata: live?.devata || "परमात्मा / अभीष्ट देव",
        chhanda: live?.chhanda || "वैदिक छंद",
        sectionRef: live?.sectionRef || cfg.sourceBadge
      };
    });
  }, []);

  // Filter based on active category
  const filteredMantras = useMemo(() => {
    if (activeCategoryTab === "all") return enrichedMantras;
    if (activeCategoryTab === "vedic") {
      return enrichedMantras.filter((m) => m.category === "वैदिक महामंत्र");
    }
    if (activeCategoryTab === "upanishad") {
      return enrichedMantras.filter((m) => m.category === "उपनिषद महावाक्य");
    }
    if (activeCategoryTab === "gita_stotra") {
      return enrichedMantras.filter((m) => m.category === "गीता एवं स्तोत्र");
    }
    return enrichedMantras;
  }, [activeCategoryTab, enrichedMantras]);

  // Display limit for "समस्त महामंत्र": initial 4 cards or expand to all
  const displayedMantras = useMemo(() => {
    if (activeCategoryTab !== "all") {
      return filteredMantras;
    }
    return showAllMantras ? filteredMantras : filteredMantras.slice(0, 4);
  }, [activeCategoryTab, filteredMantras, showAllMantras]);

  // Copy shloka text to clipboard
  const handleCopy = (text, id, e) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  // Web Speech API: Chanting Audio Pronunciation
  const handleToggleSpeech = (mantra, e) => {
    if (e) e.stopPropagation();
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("आपके ब्राउज़र में Web Speech Synthesis उपलब्ध नहीं है।");
      return;
    }

    if (playingId === mantra.id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean Vedic svara combining accents and verse numbering for crystal clear TTS pronunciation
    const cleanSpeechText = mantra.sanskrit
      .replace(/[\u0951\u0952\u1CD0-\u1CFF\u0331\u0300-\u036F]/g, "")
      .replace(/[।॥०-९0-9|]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    utterance.rate = 0.82; // Calm, respectful chanting pace
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices() || [];
    const devanagariVoice =
      voices.find((v) => v.lang.startsWith("sa") || v.lang.startsWith("hi")) || null;

    if (devanagariVoice) {
      utterance.voice = devanagariVoice;
    } else {
      utterance.lang = "hi-IN";
    }

    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);

    setPlayingId(mantra.id);
    window.speechSynthesis.speak(utterance);
  };

  // Stop speech if unmounted
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Navigate to full mantra reader page
  const handleOpenMantraReader = (id, e) => {
    if (e) e.stopPropagation();
    if (playingId) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
    }
    navigate(`/library/mantra/${id}`);
  };

  return (
    <section id="mantras" className="py-14 sm:py-20 bg-[#fffaf0] border-b border-amber-200/60 relative overflow-hidden">
      {/* Subtle traditional sacred background motif */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-5 pb-6 border-b border-amber-200/50">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-amber-800">
                {isHindi ? "दिव्य ध्वनि • नित्य स्वाध्याय एवं साधना" : "DIVINE VIBRATIONS • DAILY SADHANA"}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
              {isHindi ? "मंत्र, सूक्त एवं स्तोत्र" : "Mantra, Sukta & Stotra"}
            </h2>
            <p className={`text-xs sm:text-sm text-stone-700 mt-1 max-w-3xl leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>
              {isHindi
                ? "वैदिक महामंत्र, उपनिषद महावाक्य एवं पावन स्तोत्र संग्रह। शुद्ध सस्वर वैदिक पाठ, पदच्छेद, ऋषि-देवता परिचय, उच्चारित ध्वनि एवं प्रामाणिक आध्यात्मिक भावार्थ सहित।"
                : "Sacred Vedic Mahamantras, Upanishadic Mahavakyas & divine Stotras with authentic Pada-Patha, Rishi-Devata, audio recitation, and commentary."}
            </p>
          </div>

          {/* Header Controls: Font Size Scaler + 3-Language Selector + View Archive Link */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start lg:self-auto">
            {/* Font Sizing Toggle (Devanagari Readability Control) */}
            <div className="flex items-center bg-white/90 border border-amber-300/80 rounded-xl p-1 shadow-2xs">
              <span className="text-[11px] font-medium text-stone-600 px-2 font-devanagari hidden sm:inline">
                {isHindi ? "अक्षर आकार:" : "Text Size:"}
              </span>
              {fontSizes.map((f, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFontSizeIndex(idx)}
                  title={f.title}
                  className={`px-2.5 py-1 rounded-lg text-xs font-devanagari font-bold transition-all cursor-pointer ${
                    fontSizeIndex === idx
                      ? "bg-amber-700 text-white shadow-2xs"
                      : "text-stone-700 hover:bg-amber-50"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* 3-Language Translation Selector (Hindi • English • Hinglish) */}
            <div className="flex items-center p-0.5 rounded-xl border border-amber-300/80 bg-white/90 shadow-2xs text-xs font-semibold">
              {[
                { id: "all", label: isHindi ? "सभी ३ भाषाएँ" : "All 3 Langs" },
                { id: "hindi", label: "हिन्दी" },
                { id: "english", label: "English" },
                { id: "hinglish", label: isHindi ? "हिंग्लिश" : "Hinglish" }
              ].map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLangMode(l.id)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    langMode === l.id
                      ? "bg-amber-800 text-white font-bold shadow-2xs"
                      : "text-stone-700 hover:bg-amber-50"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* View Full Mantra Library */}
            <button
              type="button"
              onClick={onNavigateKnowledge || (() => navigate("/library/mantra-stotra"))}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-950 px-2.5 py-1.5 transition-colors cursor-pointer group"
            >
              <span>{isHindi ? "सम्पूर्ण मंत्र संग्रह" : "Full Mantra Archive"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Category Filtering Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categoryTabs.map((tab) => {
            const isActive = activeCategoryTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveCategoryTab(tab.id);
                  if (playingId) {
                    window.speechSynthesis.cancel();
                    setPlayingId(null);
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-800 to-amber-700 text-white shadow-md shadow-amber-900/15 border border-amber-700"
                    : "bg-white/90 text-stone-700 border border-amber-200/80 hover:border-amber-400 hover:bg-amber-50/70"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-amber-100 text-amber-900"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mantra Cards Grid (High contrast, crystal-clear typography, sacred borders) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 animate-fadeIn">
          {displayedMantras.map((mantra) => {
            const isPlayingThis = playingId === mantra.id;
            const isCopied = copiedId === mantra.id;

            return (
              <div
                key={mantra.id}
                className="group flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#fffefc] via-white to-[#fffdf7] border-2 border-amber-200/90 hover:border-amber-400/90 shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden p-5 sm:p-6"
              >
                {/* Sacred Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400/30 via-amber-600 to-amber-400/30 group-hover:from-amber-500 group-hover:via-amber-700 group-hover:to-amber-500 transition-all" />

                <div>
                  {/* Card Header: Category Badge + Source + Quick Copy */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-amber-100/90">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-100/90 border border-amber-300/80 text-amber-950 text-[11px] font-bold">
                        <Flame className="w-3 h-3 text-amber-700" />
                        {mantra.featuredTag}
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold text-amber-900/90 font-devanagari">
                        {mantra.sourceBadge}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Quick Copy Button */}
                      <button
                        type="button"
                        onClick={(e) => handleCopy(mantra.sanskrit, mantra.id, e)}
                        title="Copy Sanskrit text"
                        className="p-1.5 rounded-lg border border-stone-200 hover:border-amber-300 bg-stone-50/80 hover:bg-amber-50 text-stone-600 hover:text-amber-900 transition-colors cursor-pointer"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Shastra Meta Tags: Rishi, Devata, Chhanda */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3 mb-2 text-[11px] sm:text-xs text-stone-600 font-devanagari">
                    <span className="px-2 py-0.5 rounded-md bg-amber-50/70 border border-amber-200/60">
                      ऋषि: <strong className="text-stone-800 font-semibold">{mantra.rishi}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-50/70 border border-amber-200/60">
                      देवता: <strong className="text-stone-800 font-semibold">{mantra.devata}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-50/70 border border-amber-200/60">
                      छंद: <strong className="text-stone-800 font-semibold">{mantra.chhanda}</strong>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors mt-2 mb-3">
                    {mantra.title}
                  </h3>

                  {/* Sacred Sanskrit Text Box */}
                  <div className="rounded-xl bg-[#fffdf8] border-2 border-amber-200/90 shadow-2xs p-4 sm:p-5 relative my-3">
                    <p
                      className={`font-devanagari font-bold text-stone-950 text-center whitespace-pre-line tracking-wide select-text ${fontSizes[fontSizeIndex].shlokaClass}`}
                    >
                      {mantra.sanskrit}
                    </p>
                  </div>

                  {/* 3-Language Expositions (Hindi • English • Hinglish) */}
                  <div className="mt-3.5 space-y-2.5">
                    {(langMode === "all" || langMode === "hindi") && mantra.hindiTranslation && (
                      <p className="text-xs sm:text-sm text-stone-700 font-devanagari leading-relaxed">
                        <strong className="text-stone-900 font-bold">हिन्दी भावार्थ: </strong>
                        {mantra.hindiTranslation}
                      </p>
                    )}

                    {(langMode === "all" || langMode === "english") && mantra.englishTranslation && (
                      <p className="text-xs sm:text-sm text-stone-700 font-serif italic leading-relaxed">
                        <strong className="text-stone-900 font-sans font-bold not-italic">English: </strong>
                        "{mantra.englishTranslation}"
                      </p>
                    )}

                    {(langMode === "all" || langMode === "hinglish") && mantra.hinglishTranslation && (
                      <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
                        <strong className="text-stone-900 font-bold">सरल हिंग्लिश: </strong>
                        {mantra.hinglishTranslation}
                      </p>
                    )}

                    {/* Highlighted Spiritual Purport (आध्यात्मिक मर्म / फलश्रुति) */}
                    <div className="p-3 rounded-xl bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-amber-50/90 border border-amber-200/80 text-amber-950 text-xs sm:text-[13px] font-devanagari flex items-start gap-2 shadow-2xs">
                      <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <div className="leading-relaxed">
                        <strong className="text-amber-900 font-bold">आध्यात्मिक मर्म: </strong>
                        {mantra.spiritualPurport}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer Bar */}
                <div className="mt-5 pt-3.5 border-t border-amber-100/90 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    {/* 1. उच्चारण सुनें (Listen Chanting Pronunciation via Web Speech API) */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleSpeech(mantra, e)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                        isPlayingThis
                          ? "bg-amber-600 text-white animate-pulse"
                          : "bg-amber-100/80 hover:bg-amber-200 text-amber-950 border border-amber-300/80"
                      }`}
                    >
                      {isPlayingThis ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>रोकें (Chanting...)</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-amber-800" />
                          <span>उच्चारण सुनें</span>
                        </>
                      )}
                    </button>

                    {/* 2. कॉपी (Copy Mantra text) */}
                    <button
                      type="button"
                      onClick={(e) => handleCopy(mantra.sanskrit, mantra.id, e)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-950 border border-amber-200/80 transition-colors cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">कॉपी हुआ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-500" />
                          <span>कॉपी</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* 3. पूर्ण भावार्थ व जप विधि (Read Full Meaning & Japa Details -> /library/mantra/${m.id}) */}
                  <button
                    type="button"
                    onClick={(e) => handleOpenMantraReader(mantra.id, e)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white shadow-xs hover:shadow-md transition-all cursor-pointer group"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>पूर्ण भावार्थ व जप विधि</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All / Show Less Toggle (Active when "समस्त महामंत्र" selected) */}
        {activeCategoryTab === "all" && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowAllMantras((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-amber-300 hover:border-amber-500 text-amber-950 font-bold text-xs sm:text-sm shadow-xs hover:shadow-md hover:bg-amber-50 transition-all cursor-pointer"
            >
              <span>
                {showAllMantras
                  ? "संक्षिप्त दृश्य (४ मुख्य महामंत्र)"
                  : "समस्त १२ महामंत्र व स्तोत्र देखें (View All 12 Mantras)"}
              </span>
              {showAllMantras ? (
                <ChevronUp className="w-4 h-4 text-amber-800" />
              ) : (
                <ChevronDown className="w-4 h-4 text-amber-800" />
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/library/mantra-stotra")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>मंत्र व स्तोत्र साधना केंद्र (Mantra Archive)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
