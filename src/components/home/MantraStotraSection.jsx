import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Volume2,
  VolumeX,
  Sparkles,
  Copy,
  Check,
  BookOpen,
  Flame,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { getMantraById } from "../../data/vedicMantrasData.js";
import { useLanguage } from "../../context/LanguageContext.jsx";

// Curated Sacred Mahamantras & Stotras with Full Hindi and English Metadata
const SACRED_HOME_MANTRAS_CONFIG = [
  // 1. वैदिक महामंत्र
  {
    id: "rv-7-59-12",
    category: "वैदिक महामंत्र",
    categoryEn: "Vedic Mahamantra",
    title: "महामृत्युंजय महामंत्र",
    titleEn: "Mahamrityunjaya Mahamantra",
    sourceBadge: "ऋग्वेद ७.५९.१२ — संजीवनी महामंत्र",
    sourceBadgeEn: "Rigveda 7.59.12 — Sanjeevani Mantra",
    featuredTag: "संजीवनी महामंत्र",
    featuredTagEn: "Sanjeevani Mantra",
    rishi: "महर्षि वसिष्ठ",
    rishiEn: "Maharishi Vasishtha",
    devata: "त्र्यम्बक रुद्र (शिव)",
    devataEn: "Tryambaka Rudra (Shiva)",
    chhanda: "अनुष्टुप्",
    chhandaEn: "Anushtup",
    spiritualPurport: "अकाल मृत्यु, भय एवं दैहिक-दैविक-भौतिक तापों का शमन; साधक को आरोग्य, दीर्घायु एवं अमृतत्व (मोक्ष) की प्राप्ति।",
    spiritualPurportEn: "Liberation from untimely death, fear, and threefold afflictions; bestows health, vitality, and spiritual immortality.",
    shortSource: "ऋग्वेद (शाकल शाखा)",
    shortSourceEn: "Rigveda (Shakala Shakha)"
  },
  {
    id: "rv-3-62-10",
    category: "वैदिक महामंत्र",
    categoryEn: "Vedic Mahamantra",
    title: "गायत्री महामंत्र",
    titleEn: "Gayatri Mahamantra",
    sourceBadge: "ऋग्वेद ३.६२.१० / यजुर्वेद ३६.३ — वेदमाता महामंत्र",
    sourceBadgeEn: "Rigveda 3.62.10 / Yajurveda 36.3",
    featuredTag: "वेदमाता महामंत्र",
    featuredTagEn: "Vedamata Gayatri",
    rishi: "महर्षि विश्वामित्र",
    rishiEn: "Maharishi Vishvamitra",
    devata: "सविता देव",
    devataEn: "Savitur (Supreme Light)",
    chhanda: "गायत्री छंद",
    chhandaEn: "Gayatri Metre",
    spiritualPurport: "सविता नारायण के दिव्य तेज द्वारा साधक की मेधा, प्रज्ञा और अंतःप्रेरणा की जागृति; सनातन संस्कृति का परम गुरुमंत्र।",
    spiritualPurportEn: "Awakening of transcendent intellect, wisdom, and inner illumination by the supreme solar light of Savitur.",
    shortSource: "ऋग्वेद / यजुर्वेद",
    shortSourceEn: "Rigveda / Yajurveda"
  },
  {
    id: "rv-1-1-1",
    category: "वैदिक महामंत्र",
    categoryEn: "Vedic Mahamantra",
    title: "अग्नि सूक्त (प्रथम ऋचा)",
    titleEn: "Agni Sukta (Inaugural Verse)",
    sourceBadge: "ऋग्वेद १.१.१ — मंगलाचरण ऋचा",
    sourceBadgeEn: "Rigveda 1.1.1 — Inaugural Hymn",
    featuredTag: "ऋग्वेद प्रथम ऋचा",
    featuredTagEn: "Rigveda First Verse",
    rishi: "मधुच्छन्दा वैश्वामित्र",
    rishiEn: "Madhuchhanda Vaishvamitra",
    devata: "अग्नि देव",
    devataEn: "Agni Deva (Divine Priest)",
    chhanda: "गायत्री छंद",
    chhandaEn: "Gayatri Metre",
    spiritualPurport: "यज्ञिय चेतना और अंतःअग्नि का प्रज्वलन; सर्वविध ज्ञान, ऐश्वर्य, सद्गुण एवं दिव्य तेज का मंगलाचरण।",
    spiritualPurportEn: "Kindling of internal and ritual fire; auspicious invocation of all-illuminating knowledge and spiritual wealth.",
    shortSource: "ऋग्वेद मण्डल १",
    shortSourceEn: "Rigveda Mandala 1"
  },
  {
    id: "rv-10-90-1",
    category: "वैदिक महामंत्र",
    categoryEn: "Vedic Mahamantra",
    title: "पुरुष सूक्त (विराट् पुरुष)",
    titleEn: "Purusha Sukta (Cosmic Being)",
    sourceBadge: "ऋग्वेद १०.९०.१ — विराट् ब्रह्माण्ड सूक्त",
    sourceBadgeEn: "Rigveda 10.90.1 — Cosmic Hymn",
    featuredTag: "विराट् ब्रह्माण्ड सूक्त",
    featuredTagEn: "Cosmic Purusha Hymn",
    rishi: "नारायण ऋषि",
    rishiEn: "Narayana Rishi",
    devata: "विराट् पुरुष",
    devataEn: "Cosmic Purusha",
    chhanda: "अनुष्टुप् छंद",
    chhandaEn: "Anushtup Metre",
    spiritualPurport: "समस्त चराचर सृष्टि में एक ही परम विराट् चेतना का दर्शन — अनेकता में एकात्मता का मूल वैदिक आधार।",
    spiritualPurportEn: "Vision of one single cosmic consciousness pervading the entire universe — the Vedic root of universal oneness.",
    shortSource: "ऋग्वेद मण्डल १०",
    shortSourceEn: "Rigveda Mandala 10"
  },

  // 2. उपनिषद महावाक्य
  {
    id: "up-kena-1",
    category: "उपनिषद महावाक्य",
    categoryEn: "Upanishad Mahavakya",
    title: "केनोपनिषद् (जिज्ञासा मन्त्र)",
    titleEn: "Kena Upanishad (Enquiry Verse)",
    sourceBadge: "सामवेद तलवकार — केनोपनिषद् १.१",
    sourceBadgeEn: "Samaveda — Kena Upanishad 1.1",
    featuredTag: "सामवेद उपनिषद्",
    featuredTagEn: "Samaveda Upanishad",
    rishi: "सामवेदीय महर्षि",
    rishiEn: "Samavedic Seers",
    devata: "परब्रह्म",
    devataEn: "Parabrahma",
    chhanda: "अनुष्टुप्",
    chhandaEn: "Anushtup",
    spiritualPurport: "मन, वाणी, प्राण और नेत्रों के परे जो मूल प्रकाशक चैतन्य तत्व है, उस अविनाशी ब्रह्म की आध्यात्मिक जिज्ञासा।",
    spiritualPurportEn: "Spiritual inquiry into the immortal Brahman which is the conscious impeller behind mind, speech, life-force, and senses.",
    shortSource: "केनोपनिषद् (सामवेद)",
    shortSourceEn: "Kena Upanishad (Samaveda)"
  },
  {
    id: "vs-40-1",
    category: "उपनिषद महावाक्य",
    categoryEn: "Upanishad Mahavakya",
    title: "ईशावास्योपनिषद् (ईशा वास्यमिदम्)",
    titleEn: "Isha Upanishad (All is Pervaded by God)",
    sourceBadge: "शुक्ल यजुर्वेद वाजसनेयि — ईशावास्योपनिषद् ४०.१",
    sourceBadgeEn: "Shukla Yajurveda — Isha Upanishad 40.1",
    featuredTag: "ईशावास्य महावाक्य",
    featuredTagEn: "Ishavasya Mahavakya",
    rishi: "महर्षि दध्यङ् आथर्वण",
    rishiEn: "Maharishi Dadhyang Atharvana",
    devata: "ईश्वर (आत्मा)",
    devataEn: "Ishvara (Atman)",
    chhanda: "अनुष्टुप्",
    chhandaEn: "Anushtup",
    spiritualPurport: "सम्पूर्ण ब्रह्माण्ड में ईश्वर की व्याप्ति का अनुभव करते हुए अनासक्त भाव से त्यागपूर्वक जीवन जीने का शाश्वत संदेश।",
    spiritualPurportEn: "The eternal imperative to live detachedly through renunciation while experiencing the divine presence in everything.",
    shortSource: "ईशावास्योपनिषद्",
    shortSourceEn: "Isha Upanishad"
  },
  {
    id: "up-mandukya-1",
    category: "उपनिषद महावाक्य",
    categoryEn: "Upanishad Mahavakya",
    title: "माण्डूक्योपनिषद् (अयमात्मा ब्रह्म)",
    titleEn: "Mandukya Upanishad (This Self is Brahman)",
    sourceBadge: "अथर्ववेद शौनक — माण्डूक्योपनिषद् १-२",
    sourceBadgeEn: "Atharvaveda — Mandukya Upanishad 1-2",
    featuredTag: "अयमात्मा ब्रह्म",
    featuredTagEn: "Ayam Atma Brahma",
    rishi: "महर्षि मण्डूक",
    rishiEn: "Maharishi Manduka",
    devata: "तुरीय ब्रह्म",
    devataEn: "Turiya Brahman",
    chhanda: "गद्य सूत्र",
    chhandaEn: "Prose Sutra",
    spiritualPurport: "समस्त अस्तित्व ओंकार है, और यह जीवात्मा ही साक्षात् ब्रह्म है ('अयमात्मा ब्रह्म' — अथर्ववेदीय महावाक्य)।",
    spiritualPurportEn: "All manifest and unmanifest reality is Omkara, and this individual consciousness is non-different from supreme Brahman.",
    shortSource: "माण्डूक्योपनिषद्",
    shortSourceEn: "Mandukya Upanishad"
  },
  {
    id: "up-tait-1-11",
    category: "उपनिषद महावाक्य",
    categoryEn: "Upanishad Mahavakya",
    title: "तैत्तिरीयोपनिषद् (दीक्षांत उपदेश)",
    titleEn: "Taittiriya Upanishad (Convocation Address)",
    sourceBadge: "कृष्ण यजुर्वेद तैत्तिरीय — शिक्षावल्ली १.११",
    sourceBadgeEn: "Krishna Yajurveda — Shikshavalli 1.11",
    featuredTag: "दीक्षांत अनुशासन",
    featuredTagEn: "Graduation Ethics",
    rishi: "वरुण व भृगु",
    rishiEn: "Varuna & Bhrigu",
    devata: "सत्य एवं धर्म",
    devataEn: "Satya & Dharma",
    chhanda: "वैदिक गद्य",
    chhandaEn: "Vedic Prose",
    spiritualPurport: "सत्यं वद, धर्मं चर — गुरुकुल का सार्वकालिक अनुशासन; सदाचार, स्वाध्याय व माता-पिता-गुरु को देवतुल्य मानना।",
    spiritualPurportEn: "Speak the truth, practice righteousness — timeless Gurukula ethics; devotion to parents, teachers, and daily study.",
    shortSource: "तैत्तिरीयोपनिषद्",
    shortSourceEn: "Taittiriya Upanishad"
  },
  {
    id: "up-chandogya-6-8-7",
    category: "उपनिषद महावाक्य",
    categoryEn: "Upanishad Mahavakya",
    title: "छान्दोग्योपनिषद् (तत्त्वमसि महावाक्य)",
    titleEn: "Chandogya Upanishad (That Thou Art)",
    sourceBadge: "सामवेद कौथुम — छान्दोग्योपनिषद् ६.८.७",
    sourceBadgeEn: "Samaveda — Chandogya Upanishad 6.8.7",
    featuredTag: "तत्त्वमसि महावाक्य",
    featuredTagEn: "Tat Tvam Asi",
    rishi: "महर्षि उद्दालक आरुणि",
    rishiEn: "Maharishi Uddalaka Aruni",
    devata: "सत् ब्रह्म",
    devataEn: "Sat Brahman",
    chhanda: "अनुष्टुप्",
    chhandaEn: "Anushtup",
    spiritualPurport: "जो यह परम सूक्ष्म सत्य तत्व है, वही संपूर्ण विश्व का आत्मस्वरूप है; 'हे श्वेतकेतु! वह ब्रह्म तू ही है' (तत्त्वमसि)।",
    spiritualPurportEn: "That which is the subtle essence is the Self of all universe; That is Truth, That is the Self, Thou Art That, O Shvetaketu.",
    shortSource: "छान्दोग्योपनिषद्",
    shortSourceEn: "Chandogya Upanishad"
  },

  // 3. गीता एवं स्तोत्र
  {
    id: "bg-2-47",
    category: "गीता एवं स्तोत्र",
    categoryEn: "Gita & Stotras",
    title: "श्रीमद्भगवद्गीता (कर्मण्येवाधिकारस्ते)",
    titleEn: "Bhagavad Gita (Right to Action Alone)",
    sourceBadge: "महाभारत भीष्मपर्व — गीता २.४७",
    sourceBadgeEn: "Mahabharata — Gita 2.47",
    featuredTag: "निष्काम कर्मयोग",
    featuredTagEn: "Nishkama Karma Yoga",
    rishi: "महर्षि वेदव्यास",
    rishiEn: "Maharishi Vedavyasa",
    devata: "भगवान श्रीकृष्ण",
    devataEn: "Lord Sri Krishna",
    chhanda: "अनुष्टुप् छंद",
    chhandaEn: "Anushtup Metre",
    spiritualPurport: "कर्म पर तुम्हारा अधिकार है, फल पर कभी नहीं — फल की आसक्ति और अकर्मण्यता दोनों से मुक्त होकर निष्काम कर्मयोग।",
    spiritualPurportEn: "Thy right is to action alone, never to its fruits; let not the fruit of action be thy motive, nor be attached to inaction.",
    shortSource: "श्रीमद्भगवद्गीता",
    shortSourceEn: "Shrimad Bhagavad Gita"
  },
  {
    id: "vr-aditya-hridaya",
    category: "गीता एवं स्तोत्र",
    categoryEn: "Gita & Stotras",
    title: "आदित्य हृदय स्तोत्र",
    titleEn: "Aditya Hridaya Stotra",
    sourceBadge: "वाल्मीकि रामायण — युद्धकाण्ड सर्ग १०५",
    sourceBadgeEn: "Valmiki Ramayana — Yuddha Kanda 105",
    featuredTag: "विजय प्रदाता स्तोत्र",
    featuredTagEn: "Hymn of Victory",
    rishi: "महर्षि अगस्त्य",
    rishiEn: "Maharishi Agastya",
    devata: "भगवान सूर्य नारायण",
    devataEn: "Lord Surya Narayana",
    chhanda: "अनुष्टुप् छंद",
    chhandaEn: "Anushtup Metre",
    spiritualPurport: "सूर्य नारायण की उपासना से आंतरिक दुर्बलताओं, भय व समस्त शत्रुओं पर विजय; अक्षय तेज और ऊर्जा की प्राप्ति।",
    spiritualPurportEn: "Sun-god meditation imparted by Sage Agastya to Sri Rama for conquest over inner doubts, enemies, and supreme vitality.",
    shortSource: "वाल्मीकि रामायण",
    shortSourceEn: "Valmiki Ramayana"
  },
  {
    id: "vs-36-17",
    category: "गीता एवं स्तोत्र",
    categoryEn: "Gita & Stotras",
    title: "वैदिक विश्व शान्ति पाठ",
    titleEn: "Vedic Universal Peace Prayer",
    sourceBadge: "शुक्ल यजुर्वेद वाजसनेयि — अध्याय ३६.१७",
    sourceBadgeEn: "Shukla Yajurveda — Chapter 36.17",
    featuredTag: "वैदिक शान्ति पाठ",
    featuredTagEn: "Vedic Shanti Patha",
    rishi: "वैदिक महर्षि",
    rishiEn: "Vedic Seers",
    devata: "समस्त विश्व / शान्ति",
    devataEn: "Universal Peace (Brahman)",
    chhanda: "निचृद् अनुष्टुप्",
    chhandaEn: "Nicrit Anushtup",
    spiritualPurport: "द्युलोक, अंतरिक्ष, पृथ्वी, जल, औषधियों व ब्रह्माण्ड के समस्त घटकों में अखंड शांति और विश्व कल्याण की वैदिक प्रार्थना।",
    spiritualPurportEn: "Universal prayer for enduring harmony across heavens, space, earth, waters, flora, deities, and all existence.",
    shortSource: "वाजसनेयि संहिता",
    shortSourceEn: "Vajasaneyi Samhita"
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
  const [userLangMode, setUserLangMode] = useState(null);
  const langMode = userLangMode || (isHindi ? "hindi" : "english");
  const [fontSizeIndex, setFontSizeIndex] = useState(1);
  const [showAllMantras, setShowAllMantras] = useState(false);

  // Sync langMode with global navbar language toggle
  useEffect(() => {
    setUserLangMode(isHindi ? "hindi" : "english");
  }, [isHindi]);

  // Font sizing styles for Devanagari Sanskrit text
  const fontSizes = [
    { label: "अ", title: "सामान्य अक्षर", shlokaClass: "text-base sm:text-lg leading-relaxed sm:leading-[1.8]" },
    { label: "अ+", title: "मध्यम अक्षर", shlokaClass: "text-lg sm:text-xl lg:text-[22px] leading-relaxed sm:leading-[1.8]" },
    { label: "अ++", title: "वृहत् अक्षर", shlokaClass: "text-xl sm:text-2xl lg:text-[26px] leading-relaxed sm:leading-[1.9]" }
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
        spiritualPurport: live?.shastricContext || cfg.spiritualPurport,
        rishi: live?.rishi || cfg.rishi || "वैदिक ऋषि परंपरा",
        devata: live?.devata || cfg.devata || "परमात्मा / अभीष्ट देव",
        chhanda: live?.chhanda || cfg.chhanda || "वैदिक छंद",
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
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    if (playingId === mantra.id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    const cleanSpeechText = mantra.sanskrit
      .replace(/[\u0951\u0952\u1CD0-\u1CFF\u0331\u0300-\u036F]/g, "")
      .replace(/[।॥०-९0-9|]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    utterance.rate = 0.85;
    utterance.pitch = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const devanagariVoice =
      voices.find((v) => v.lang === "hi-IN" || v.lang === "hi_IN" || v.lang.startsWith("hi")) ||
      voices.find((v) => v.lang.startsWith("sa"));

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

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleOpenMantraReader = (id, e) => {
    if (e) e.stopPropagation();
    if (playingId) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
    }
    navigate(`/library/mantra/${id}`);
  };

  return (
    <section id="mantras" className="py-6 sm:py-8 bg-white border-b border-[#E5E5E5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-[0.3rem] sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-5 gap-3.5 pb-4 border-b border-[#E5E5E5]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FFD21F]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#555555]">
                {isHindi ? "दिव्य ध्वनि • नित्य स्वाध्याय एवं साधना" : "DIVINE VIBRATIONS • DAILY SADHANA"}
              </span>
            </div>
            <h2 className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight ${isHindi ? "font-devanagari" : ""}`}>
              {isHindi ? "मंत्र, सूक्त एवं स्तोत्र" : "Mantra, Sukta & Stotra"}
            </h2>
            <p className={`text-xs sm:text-sm text-[#555555] mt-1 max-w-3xl leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>
              {isHindi
                ? "वैदिक महामंत्र, उपनिषद महावाक्य एवं पावन स्तोत्र संग्रह। शुद्ध सस्वर वैदिक पाठ, पदच्छेद, ऋषि-देवता परिचय, उच्चारित ध्वनि एवं प्रामाणिक आध्यात्मिक भावार्थ सहित।"
                : "Sacred Vedic Mahamantras, Upanishadic Mahavakyas & divine Stotras with authentic Pada-Patha, Rishi-Devata, audio recitation, and commentary."}
            </p>
          </div>

          {/* Header Controls: Font Size Scaler + 2-Language Selector + View Archive Link */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start lg:self-auto">
            {/* Font Sizing Toggle */}
            <div className="flex items-center bg-white border border-[#E5E5E5] rounded-xl p-1 shadow-xs">
              <span className="text-[11px] font-medium text-[#555555] px-2 font-devanagari hidden sm:inline">
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
                      ? "bg-[#FFD21F] text-[#111111] shadow-xs"
                      : "text-[#555555] hover:bg-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Clean 2-Language Translation Selector (हिन्दी / English) */}
            <div className="flex items-center p-0.5 rounded-xl border border-[#E5E5E5] bg-white shadow-xs text-xs font-semibold">
              {[
                { id: "hindi", label: "हिन्दी भावार्थ" },
                { id: "english", label: "English Meaning" },
              ].map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setUserLangMode(l.id)}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    langMode === l.id
                      ? "bg-[#FFD21F] text-[#111111] font-bold shadow-xs"
                      : "text-[#555555] hover:bg-white"
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
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#111111] hover:text-[#D9A441] px-2.5 py-1.5 transition-colors cursor-pointer group"
            >
              <span>{isHindi ? "सम्पूर्ण मंत्र संग्रह" : "Full Mantra Archive"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Category Filtering Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
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
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[#FFD21F] text-[#111111] font-bold shadow-2xs border border-[#FFD21F]"
                    : "bg-white text-[#555555] border border-[#E5E5E5] hover:border-[#FFD21F] hover:bg-[#FFD21F]/15 hover:text-[#111111]"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-[#111111] text-[#FFD21F]" : "bg-white text-[#555555] border border-[#E5E5E5]"
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mantra Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-4.5 animate-fadeIn">
          {displayedMantras.map((mantra) => {
            const isPlayingThis = playingId === mantra.id;
            const isCopied = copiedId === mantra.id;

            const featuredTag = isHindi ? mantra.featuredTag : (mantra.featuredTagEn || mantra.featuredTag);
            const sourceBadge = isHindi ? mantra.sourceBadge : (mantra.sourceBadgeEn || mantra.sourceBadge);
            const title = isHindi ? mantra.title : (mantra.titleEn || mantra.title);
            const rishi = isHindi ? mantra.rishi : (mantra.rishiEn || mantra.rishi);
            const devata = isHindi ? mantra.devata : (mantra.devataEn || mantra.devata);
            const chhanda = isHindi ? mantra.chhanda : (mantra.chhandaEn || mantra.chhanda);
            const spiritualPurport = isHindi ? mantra.spiritualPurport : (mantra.spiritualPurportEn || mantra.spiritualPurport);

            return (
              <div
                key={mantra.id}
                onClick={() => handleOpenMantraReader(mantra.id)}
                className="group flex flex-col justify-between rounded-xl sm:rounded-2xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] shadow-2xs hover:shadow-md transition-all duration-300 relative overflow-hidden p-3.5 sm:p-4.5 cursor-pointer"
              >
                {/* Golden Yellow Shloka Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#D9A441]" />

                <div>
                  {/* Card Header: Category Badge + Source + Quick Copy */}
                  <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#E5E5E5]">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FFD21F] text-[#111111] text-[10px] sm:text-[11px] font-bold border border-[#FFD21F]">
                        <Flame className="w-2.5 h-2.5 text-[#C62828]" />
                        {featuredTag}
                      </span>
                      <span className={`text-[10px] sm:text-[11px] font-semibold text-[#555555] ${isHindi ? "font-devanagari" : ""}`}>
                        {sourceBadge}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleCopy(mantra.sanskrit, mantra.id, e)}
                        title={isHindi ? "संस्कृत मूल पाठ कॉपी करें" : "Copy Sanskrit text"}
                        className="p-1 rounded-md border border-[#E5E5E5] hover:border-[#D9A441] bg-white text-[#555555] hover:text-[#111111] transition-colors cursor-pointer"
                      >
                        {isCopied ? (
                          <Check className="w-3 h-3 text-[#D9A441]" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Shastra Meta Tags: Rishi, Devata, Chhanda */}
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2 mb-1.5 text-[10px] sm:text-[11px] text-[#666666]">
                    <span>{isHindi ? "ऋषि: " : "Seer: "}<strong className="text-[#111111] font-semibold">{rishi}</strong></span>
                    <span>•</span>
                    <span>{isHindi ? "देवता: " : "Deity: "}<strong className="text-[#111111] font-semibold">{devata}</strong></span>
                    <span>•</span>
                    <span>{isHindi ? "छंद: " : "Metre: "}<strong className="text-[#111111] font-semibold">{chhanda}</strong></span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-serif text-base sm:text-lg font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors mt-1 mb-2 ${isHindi ? "font-devanagari" : ""}`}>
                    {title}
                  </h3>

                  {/* Sacred Sanskrit Text Box (Always authentic Devanagari) */}
                  <div className="rounded-lg bg-stone-50 border border-[#E5E5E5] shadow-2xs p-3 sm:p-3.5 relative my-2">
                    <p
                      className={`font-devanagari font-bold text-[#111111] text-center whitespace-pre-line tracking-wide select-text text-sm sm:text-base leading-relaxed`}
                    >
                      {mantra.sanskrit}
                    </p>
                  </div>

                  {/* Translation Exposition (Strictly matching selected mode) */}
                  <div className="mt-2.5 space-y-2">
                    {langMode === "hindi" && mantra.hindiTranslation && (
                      <p className="text-xs sm:text-[13px] text-[#555555] font-devanagari leading-relaxed">
                        <strong className="text-[#111111] font-bold">हिन्दी भावार्थ: </strong>
                        {mantra.hindiTranslation}
                      </p>
                    )}

                    {langMode === "english" && mantra.englishTranslation && (
                      <p className="text-xs sm:text-[13px] text-[#555555] font-serif italic leading-relaxed">
                        <strong className="text-[#111111] font-sans font-bold not-italic">English Meaning: </strong>
                        "{mantra.englishTranslation}"
                      </p>
                    )}

                    {/* Highlighted Spiritual Purport */}
                    <div className="p-2 sm:p-2.5 rounded-lg bg-stone-50 border border-[#E5E5E5] text-[#555555] text-[11px] sm:text-xs flex items-start gap-1.5 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#D9A441] mt-0.5 shrink-0" />
                      <div className="leading-snug">
                        <strong className="text-[#D9A441] font-bold">
                          {isHindi ? "आध्यात्मिक मर्म: " : "Spiritual Purport: "}
                        </strong>
                        <span className={isHindi ? "font-devanagari" : ""}>{spiritualPurport}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer Bar */}
                <div className="mt-3.5 pt-2.5 border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleToggleSpeech(mantra, e)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                        isPlayingThis
                          ? "bg-[#FFD21F] text-[#111111] border border-[#FFD21F] animate-pulse"
                          : "bg-white hover:bg-stone-50 text-[#111111] border border-[#E5E5E5] hover:border-[#D9A441]"
                      }`}
                    >
                      {isPlayingThis ? (
                        <>
                          <VolumeX className="w-3 h-3 text-[#C62828]" />
                          <span>{isHindi ? "रोकें" : "Stop"}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3 text-[#D9A441]" />
                          <span>{isHindi ? "सुनें" : "Listen Chanting"}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleCopy(mantra.sanskrit, mantra.id, e)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold bg-white hover:bg-stone-50 text-[#555555] hover:text-[#111111] border border-[#E5E5E5] hover:border-[#D9A441] transition-colors cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-[#D9A441]" />
                          <span className="text-[#111111] font-bold">{isHindi ? "कॉपी हुआ" : "Copied!"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#555555]" />
                          <span>{isHindi ? "कॉपी" : "Copy"}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleOpenMantraReader(mantra.id, e)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>{isHindi ? "पूर्ण भावार्थ व जप विधि" : "Full Meaning & Chanting Guide"}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All / Show Less Toggle */}
        {activeCategoryTab === "all" && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowAllMantras((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E5E5E5] hover:border-[#D9A441] text-[#111111] font-bold text-xs sm:text-sm shadow-xs hover:shadow-sm hover:bg-white transition-all cursor-pointer"
            >
              <span>
                {showAllMantras
                  ? (isHindi ? "संक्षिप्त करें (४ मुख्य मंत्र)" : "Show Less (4 Mantras)")
                  : (isHindi ? "समस्त १२ महामंत्र व स्तोत्र देखें" : "View All 12 Mantras & Stotras")}
              </span>
              {showAllMantras ? (
                <ChevronUp className="w-4 h-4 text-[#111111]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#111111]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/library/mantra-stotra")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-bold text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#111111]" />
              <span>{isHindi ? "मंत्र व स्तोत्र साधना केंद्र" : "Mantra & Stotra Archive"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
