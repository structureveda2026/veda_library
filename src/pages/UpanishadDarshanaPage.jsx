import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  Search,
  Filter,
  Layers,
  Scroll,
  Sun,
  Flame,
  CheckCircle2,
  ChevronRight,
  Compass,
  X,
  Info,
  ExternalLink,
  Brain,
  Eye,
  GraduationCap,
  Copy,
  Check,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  UPANISHAD_ETYMOLOGY,
  MAHAVAKYAS_DATA,
  MUKHYA_UPANISHADS_DATA,
  MUKTIKA_CANON_SUMMARY,
  MUKTIKA_108_UPANISHADS_DATA,
} from "../data/upanishadData.js";
import {
  DARSHANA_ETYMOLOGY,
  SHAD_DARSHANAS_DATA,
  DARSHANA_COMPARISON_MATRIX,
  NASTIKA_DARSHANAS_DATA,
  DARSHANA_NESTED_TAXONOMY_TREE,
} from "../data/darshanaData.js";
import {
  getScriptureReaderData,
  UPANISHADS_SCRIPTURE_DATA,
  DARSHANA_SCRIPTURE_DATA,
} from "../data/scriptures/index.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import ScriptureReaderView from "../components/common/ScriptureReaderView.jsx";
import DarshanaTaxonomyView from "../components/knowledge/DarshanaTaxonomyView.jsx";
import bannerKashiGhat from "../assets/images/library/banners/banner-kashi-ghat.png";
import cardUpanishadImg from "../assets/images/library/cards/card-upanishad.jpg";

export const READER_UPANISHADS = [
  {
    slug: "prashna-upanishad",
    name: "प्रश्नोपनिषद्",
    veda: "अथर्ववेद",
    summary: "६ प्रश्न • सम्पूर्ण ६७ मन्त्र • कबंधी, भार्गव, कौसल्य, सौर्यायणि, सत्यकाम, सुकेशा संवाद",
    totalItems: 67,
    chaptersCount: 6,
    isComplete: true,
  },
  {
    slug: "isha-upanishad",
    name: "ईशावास्योपनिषद्",
    veda: "शुक्ल यजुर्वेद (वाजसनेयि ४०)",
    summary: "सम्पूर्ण १८ मन्त्र • त्यागपूर्वक भोग, निष्काम कर्म, सत्य का साक्षात्कार",
    totalItems: 18,
    chaptersCount: 1,
    isComplete: true,
  },
  {
    slug: "mandukya-upanishad",
    name: "माण्डूक्योपनिषद्",
    veda: "अथर्ववेद",
    summary: "सम्पूर्ण १२ मन्त्र • जाग्रत, स्वप्न, सुषुप्ति व अमात्र तुरीय अवस्था (अ-उ-म)",
    totalItems: 12,
    chaptersCount: 1,
    isComplete: true,
  },
  {
    slug: "taittiriya-upanishad",
    name: "तैत्तिरीयोपनिषद्",
    veda: "कृष्ण यजुर्वेद",
    summary: "३ वल्लियाँ • १८ मन्त्र • शिक्षावल्ली (सत्यं वद धर्मं चर), ब्रह्मानन्दवल्ली (पञ्चकोश विवेक), भृगुवल्ली (अन्नं ब्रह्मेति)",
    totalItems: 18,
    chaptersCount: 3,
  },
  {
    slug: "chandogya-upanishad",
    name: "छान्दोग्योपनिषद्",
    veda: "सामवेद (कौथुम शाखा)",
    summary: "३ प्रपाठक • १४ मन्त्र • ॐकार उद्गीथ १.१, शाण्डिल्य विद्या ३.१४, तत्त्वमसि महावाक्य ६.८ (वट-बीज व लवण-जल दृष्टान्त)",
    totalItems: 14,
    chaptersCount: 3,
  },
  {
    slug: "brihadaranyaka-upanishad",
    name: "बृहदारण्यकोपनिषद्",
    veda: "शुक्ल यजुर्वेद (काण्व/माध्यन्दिन)",
    summary: "३ अध्याय • ८ मन्त्र • पवमान मन्त्र (असतो मा सद्गमय), अहं ब्रह्मास्मि, मैत्रेयी संवाद (आत्मनस्तु कामाय सर्वं प्रियं भवति), नेति नेति",
    totalItems: 8,
    chaptersCount: 3,
  },
  {
    slug: "katha-upanishad",
    name: "कठोपनिषद्",
    veda: "कृष्ण यजुर्वेद (कठ शाखा)",
    summary: "२ अध्याय • ५ मन्त्र • नचिकेता-यम संवाद, अग्नि विद्या, श्रेयस् व प्रेयस्, आत्म-रथ रूपक",
    totalItems: 5,
    chaptersCount: 2,
  },
  {
    slug: "mundaka-upanishad",
    name: "मुण्डकोपनिषद्",
    veda: "अथर्ववेद (शौनक शाखा)",
    summary: "४ मुण्डक • १४ मन्त्र • परा व अपरा विद्या, द्वा सुपर्णा सयुजा सखाया, सत्यमेव जयते नानृतम्",
    totalItems: 14,
    chaptersCount: 4,
  },
  {
    slug: "kena-upanishad",
    name: "केनोपनिषद्",
    veda: "सामवेद (तलवकार शाखा)",
    summary: "१ खंड • २ मन्त्र • केनेषितं पतति प्रेषितं मनः, यक्ष उपाख्यान",
    totalItems: 2,
    chaptersCount: 1,
  },
];

export const READER_DARSHANAS = [
  {
    slug: "yoga",
    name: "योग दर्शन (पातञ्जल योगसूत्र)",
    founder: "महर्षि पतञ्जलि",
    summary: "४ पाद • ३२ प्रमुख सूत्र • समाधि, साधन (अष्टांग योग), विभूति एवं कैवल्य पाद",
    totalItems: 32,
    chaptersCount: 4,
  },
  {
    slug: "vedanta",
    name: "वेदान्त दर्शन (ब्रह्मसूत्र)",
    founder: "महर्षि बादरायण व्यास",
    summary: "४ अध्याय • १५ प्रमुख सूत्र • चतुःसूत्री (अथातो ब्रह्मजिज्ञासा, जन्माद्यस्य यतः...), समन्वय, अविरोध, साधन व फल",
    totalItems: 15,
    chaptersCount: 4,
  },
  {
    slug: "samkhya",
    name: "सांख्य दर्शन (सांख्यकारिका व प्रवचन सूत्र)",
    founder: "महर्षि कपिल / ईश्वरकृष्ण",
    summary: "२ अध्याय • १० कारिकाएँ/सूत्र • दुःखत्रय, २५ तत्त्व, सत्कार्यवाद, प्रकृति-पुरुष विवेक",
    totalItems: 10,
    chaptersCount: 2,
  },
  {
    slug: "nyaya",
    name: "न्याय दर्शन (न्याय सूत्र)",
    founder: "महर्षि अक्षपाद गौतम",
    summary: "१ अध्याय • ७ सूत्र • १६ पदार्थ, ४ प्रमाण, पञ्चावयव अनुमान, निःश्रेयस प्राप्ति",
    totalItems: 7,
    chaptersCount: 1,
  },
  {
    slug: "vaisheshika",
    name: "वैशेषिक दर्शन (वैशेषिक सूत्र)",
    founder: "महर्षि कणाद",
    summary: "२ अध्याय • ५ सूत्र • धर्म लक्षण, द्रव्य-गुण-कर्म, परमाणुवाद (द्व्यणुक-त्र्यणुक)",
    totalItems: 5,
    chaptersCount: 2,
  },
  {
    slug: "mimamsa",
    name: "पूर्व मीमांसा दर्शन (मीमांसा सूत्र)",
    founder: "महर्षि जैमिनि",
    summary: "२ अध्याय • ६ सूत्र • अथातो धर्मजिज्ञासा, चोदनालक्षणोऽर्थो धर्मः, शब्द नित्यत्व व अपूर्व",
    totalItems: 6,
    chaptersCount: 2,
  },
];

export default function UpanishadDarshanaPage({ onOpenSearch }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isHindi } = useLanguage();

  // Tab state: 'reader', 'taxonomy', 'upanishad', 'darshana', 'mahavakya', 'muktika'
  const initialTab = searchParams.get("tab") || "reader";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Reader state
  const initialScripture = searchParams.get("scripture") || "prashna-upanishad";
  const [selectedReaderSlug, setSelectedReaderSlug] = useState(initialScripture);
  const [readerCategory, setReaderCategory] = useState(
    ["yoga", "vedanta", "samkhya", "nyaya", "vaisheshika", "mimamsa"].includes(initialScripture)
      ? "darshanas"
      : "upanishads"
  );

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");

  // 108 Muktika Canon State
  const [muktikaVedaFilter, setMuktikaVedaFilter] = useState("all");
  const [muktikaCategoryFilter, setMuktikaCategoryFilter] = useState("all");
  const [muktikaSearch, setMuktikaSearch] = useState("");

  const filtered108Upanishads = useMemo(() => {
    return (MUKTIKA_108_UPANISHADS_DATA || []).filter((u) => {
      const matchVeda = muktikaVedaFilter === "all" || u.veda.includes(muktikaVedaFilter);
      const matchCat = muktikaCategoryFilter === "all" || u.category === muktikaCategoryFilter;
      if (!matchVeda || !matchCat) return false;
      if (!muktikaSearch.trim()) return true;
      const q = muktikaSearch.toLowerCase().trim();
      return (
        u.name.toLowerCase().includes(q) ||
        u.enName.toLowerCase().includes(q) ||
        u.veda.toLowerCase().includes(q) ||
        u.theme.toLowerCase().includes(q) ||
        u.category.toLowerCase().includes(q)
      );
    });
  }, [muktikaVedaFilter, muktikaCategoryFilter, muktikaSearch]);

  // Copy & Audio state
  const [copiedId, setCopiedId] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  const handleCopyVerse = (id, text, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleSound = (id, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      setTimeout(() => {
        setPlayingId((prev) => (prev === id ? null : prev));
      }, 7000);
    }
  };

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
    const scriptureParam = searchParams.get("scripture");
    if (scriptureParam && scriptureParam !== selectedReaderSlug) {
      setSelectedReaderSlug(scriptureParam);
      if (["yoga", "vedanta", "samkhya", "nyaya", "vaisheshika", "mimamsa"].includes(scriptureParam)) {
        setReaderCategory("darshanas");
      } else {
        setReaderCategory("upanishads");
      }
    }
  }, [searchParams]);

  const handleTabChange = (tabId, scriptureSlug = null) => {
    setActiveTab(tabId);
    const params = { tab: tabId };
    if (scriptureSlug) {
      params.scripture = scriptureSlug;
      setSelectedReaderSlug(scriptureSlug);
    }
    setSearchParams(params);
    setSearchQuery("");
  };

  const currentReaderScripture = useMemo(() => {
    return (
      getScriptureReaderData(selectedReaderSlug) ||
      UPANISHADS_SCRIPTURE_DATA["prashna-upanishad"]
    );
  }, [selectedReaderSlug]);

  // Filtered Upanishads
  const filteredUpanishads = useMemo(() => {
    if (!searchQuery.trim()) return MUKHYA_UPANISHADS_DATA;
    const q = searchQuery.toLowerCase().trim();
    return MUKHYA_UPANISHADS_DATA.filter((u) => {
      return (
        u.name.toLowerCase().includes(q) ||
        u.enName.toLowerCase().includes(q) ||
        u.veda.toLowerCase().includes(q) ||
        u.centralTheme.toLowerCase().includes(q) ||
        u.keyTeachings.some((kt) => kt.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  // Filtered Darshanas
  const filteredDarshanas = useMemo(() => {
    if (!searchQuery.trim()) return SHAD_DARSHANAS_DATA;
    const q = searchQuery.toLowerCase().trim();
    return SHAD_DARSHANAS_DATA.filter((d) => {
      return (
        d.name.toLowerCase().includes(q) ||
        d.enName.toLowerCase().includes(q) ||
        d.founder.toLowerCase().includes(q) ||
        d.nature.toLowerCase().includes(q) ||
        d.pramanas.some((pr) => pr.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  return (
    <div className="bg-white min-h-screen text-[#111111] pb-24">
      {/* 1. Scholarly Royal Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#170e06] via-[#221308] to-[#120a04] text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 border-b border-amber-900/60 shadow-xl">
        {/* Sacred Kashi Ganga Ghat Authentic Real Banner with 80-85% Opacity and Luminous Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={bannerKashiGhat}
            alt="Sacred Kashi Ghat Philosophical Hermitage"
            className="w-full h-full object-cover object-center opacity-80 sm:opacity-85 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120a04] via-[#1a0e06]/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/20 via-transparent to-[#120a04]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-amber-200/90 mb-4 font-serif">
            <Link to="/" className="hover:text-[#FFD21F] transition-colors">
              {isHindi ? "होम" : "Home"}
            </Link>
            <span>/</span>
            <Link to="/library" className="hover:text-[#FFD21F] transition-colors">
              {isHindi ? "वैदिक ज्ञानकोष" : "Veda Library"}
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">
              {isHindi ? "उपनिषद् एवं दर्शन" : "Upanishad & Darshana"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            {/* Left 7 Cols: Title & Shanti Invocation */}
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFD21F] text-[#111111] border border-[#FFD21F] shadow-xs">
                <Brain className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>{isHindi ? "वेदान्त एवं षड्दर्शन दर्शनशास्त्र" : "Upanishad & Darshana Philosophy"}</span>
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
                {isHindi ? "उपनिषद् एवं दर्शन" : "Upanishad & Darshana"}
                <span className="block text-xl sm:text-2xl font-normal text-amber-200/95 mt-1 font-sans">
                  The Pinnacle of Vedic Non-Dual Realization & The Six Astika Systems
                </span>
              </h1>

              <p className="text-amber-100/90 text-sm sm:text-base font-devanagari leading-relaxed max-w-3xl drop-shadow-xs">
                {isHindi
                  ? "वेदों का ज्ञानकाण्ड (वेदान्त) और भारतीय मेधा के ६ सर्वोच्च दार्शनिक तंत्र — आत्मा, परमात्मा, संसार और मुक्ति के परम सत्य का वैज्ञानिक, तार्किक एवं अपरोक्षानुभूतिपरक निरूपण।"
                  : "The pinnacle of Vedic wisdom (Vedanta) and the 6 classical Astika systems — scientific, logical, and direct experiential inquiry into the Self, Supreme Reality, and Liberation."}
              </p>

              {/* Shanti Invocation Royal Banner with Audio & Copy */}
              <div className="mt-4 p-4 rounded-2xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#D9A441] text-[#111111] text-xs sm:text-sm font-devanagari leading-relaxed shadow-lg">
                <div className="flex items-center justify-between gap-3 pb-2 mb-2 border-b border-[#E5E5E5]">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                    {isHindi ? "ईशावास्य एवं बृहदारण्यक उपनिषद् शांति पाठ" : "Isha & Brihadaranyaka Upanishad Shanti Patha"}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) =>
                        handleToggleSound("hero-shanti", e)
                      }
                      title={isHindi ? "ध्वनि श्रवण" : "Listen Audio"}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                        playingId === "hero-shanti"
                          ? "bg-[#FFD21F] text-[#111111] shadow-xs animate-pulse font-bold"
                          : "bg-white hover:bg-stone-50 text-[#111111] border border-[#E5E5E5]"
                      }`}
                    >
                      {playingId === "hero-shanti" ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>{isHindi ? "ध्वनि तरंग..." : "Playing..."}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#D9A441]" />
                          <span>{isHindi ? "सस्वर पाठ" : "Recitation"}</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={(e) =>
                        handleCopyVerse(
                          "hero-shanti",
                          "ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते। पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते॥ ॐ शान्तिः शान्तिः शान्तिः॥",
                          e
                        )
                      }
                      title={isHindi ? "मंत्र कॉपी करें" : "Copy Mantra"}
                      className="p-1.5 rounded-lg bg-white hover:bg-stone-50 text-[#111111] border border-[#E5E5E5] transition-colors cursor-pointer"
                    >
                      {copiedId === "hero-shanti" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-[#D9A441]" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="font-serif font-bold text-base sm:text-lg text-[#111111] leading-snug">
                  ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते। पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते॥
                </p>
                <p className="text-[#555555] text-xs mt-1.5 font-sans">
                  {isHindi
                    ? '"परब्रह्म पूर्ण है, यह जगत भी पूर्ण है; पूर्ण से पूर्ण ही प्रकट होता है। पूर्ण में से पूर्ण निकाल लेने पर भी पूर्ण ही शेष रहता है।"'
                    : '"The Supreme Brahman is infinite, and this world is infinite. The infinite proceeds from the infinite. Even taking the infinite from the infinite, the infinite alone remains."'}
                </p>
              </div>
            </div>

            {/* Right 4 Cols: Vignette Card with cardUpanishadImg + Royal Metrics */}
            <div className="lg:col-span-4 space-y-4">
              {/* Sacred Meditation Image Vignette Card */}
              <div className="bg-white/95 backdrop-blur-md border-2 border-amber-200/90 rounded-2xl p-3 shadow-lg overflow-hidden group">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-amber-300/60 shadow-inner">
                  <img
                    src={cardUpanishadImg}
                    alt="Sacred Upanishadic Dhyana"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/70 px-2 py-0.5 rounded backdrop-blur-xs">
                      {isHindi ? "ब्रह्मविद्या एवं ध्यान" : "Brahmavidya & Meditation"}
                    </span>
                    <p className="font-serif text-xs font-semibold text-amber-100 mt-1 line-clamp-1">
                      {isHindi ? "श्रीमद् आद्य शंकराचार्य अद्वैत परम्परा" : "Adi Shankaracharya Advaita Tradition"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Metrics Badge Box */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-2xl p-3.5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    ११
                  </div>
                  <div className="text-[11px] text-[#1E293B] font-bold uppercase tracking-wider">
                    {isHindi ? "मुख्य उपनिषद्" : "Principal Upanishads"}
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5 font-medium">
                    {isHindi ? "शंकर भाष्य युक्त" : "With Shankara Bhashya"}
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-2xl p-3.5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    ४
                  </div>
                  <div className="text-[11px] text-[#1E293B] font-bold uppercase tracking-wider">
                    {isHindi ? "महावाक्य" : "Mahavakyas"}
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5 font-medium">
                    {isHindi ? "चार वेदों के सूत्र" : "Sutras of 4 Vedas"}
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-2xl p-3.5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    ६
                  </div>
                  <div className="text-[11px] text-[#1E293B] font-bold uppercase tracking-wider">
                    {isHindi ? "षड्दर्शन" : "Shad-Darshanas"}
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5 font-medium">
                    {isHindi ? "आस्तिक दर्शन परंपरा" : "Astika Traditions"}
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-2xl p-3.5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    १०८
                  </div>
                  <div className="text-[11px] text-[#1E293B] font-bold uppercase tracking-wider">
                    {isHindi ? "मुक्तिक कोष" : "Muktika Canon"}
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5 font-medium">
                    {isHindi ? "कल्याणकारी उपनिषद" : "108 Upanishads"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Navigation Tabs */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] px-4 sm:px-6 lg:px-8 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2">
            {[
              {
                id: "reader",
                label: "मूल ग्रंथ श्लोक एवं सूत्र वाचन",
                en: "Scripture & Sutra Reader",
                icon: BookOpen,
              },
              {
                id: "taxonomy",
                label: "दर्शन वर्गीकरण एवं उप-परंपराएँ",
                en: "Philosophical Taxonomy",
                icon: Layers,
              },
              {
                id: "upanishad",
                label: "११ मुख्य उपनिषद्",
                en: "11 Principal Upanishads",
                icon: Scroll,
              },
              {
                id: "darshana",
                label: "षड्दर्शन (६ दर्शन)",
                en: "The 6 Astika Schools",
                icon: Brain,
              },
              {
                id: "mahavakya",
                label: "४ महावाक्य",
                en: "4 Great Mahavakyas",
                icon: Sparkles,
              },
              {
                id: "muktika",
                label: "१०८ मुक्तिक कोष",
                en: "108 Muktika Canon",
                icon: Sun,
              },
            ].map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleTabChange(t.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? "bg-[#FFD21F] text-[#111111] border-[#FFD21F] shadow-xs font-bold scale-[1.02]"
                      : "bg-white text-[#111111] hover:border-[#D9A441] border-[#E5E5E5] shadow-2xs"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-[#111111]" : "text-[#D9A441]"}`}
                  />
                  <span>{isHindi ? t.label : t.en}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onOpenSearch && onOpenSearch("")}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-amber-200/80 text-stone-600 hover:text-[#1E293B] text-xs bg-white hover:bg-amber-50/60 transition-all cursor-pointer shadow-2xs"
          >
            <Search className="w-3.5 h-3.5 text-amber-700" />
            <span>{isHindi ? "त्वरित खोज (Ctrl+K)" : "Quick Search (Ctrl+K)"}</span>
          </button>
        </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ========================================================================= */}
        {/* TAB 0A: SCRIPTURE & SUTRA PAGINATED READER */}
        {/* ========================================================================= */}
        {activeTab === "reader" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Reader Header Banner */}
            <div className="bg-white rounded-3xl border border-amber-200/70 p-6 sm:p-7 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-[#78350F] border border-amber-200/80 mb-2 shadow-2xs">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>{isHindi ? "प्रामाणिक उपनिषद् एवं दर्शन सूत्र वाचन" : "Authentic Scripture & Sutra Paginated Reader"}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1E293B]">
                  {isHindi ? "मूल ग्रंथ श्लोक एवं सूत्र वाचन" : "Scripture & Sutra Reader"}
                </h2>
                <p className="text-stone-600 text-xs sm:text-sm font-devanagari mt-1 max-w-2xl leading-relaxed">
                  {isHindi
                    ? "उपनिषदों के प्रामाणिक मन्त्र एवं षड्दर्शनों के मूल सूत्र — १० या २० प्रति पृष्ठ क्रमबद्ध वाचन, देवनागरी पाठ, हिन्दी भावार्थ, English अनुवाद, सरल हिंग्लिश व्याख्या एवं शास्त्राधारित भाष्य।"
                    : "Authentic Upanishadic mantras & classical Shad-Darshana sutras with original Devanagari, Hindi meaning, English translation, and scholarly commentary."}
                </p>
              </div>

              {/* Category Switcher: Upanishads vs Darshanas */}
              <div className="flex items-center gap-2 bg-[#FBF9F5] p-1.5 rounded-2xl border border-amber-200/80 shadow-2xs shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setReaderCategory("upanishads");
                    setSelectedReaderSlug("prashna-upanishad");
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    readerCategory === "upanishads"
                      ? "bg-gradient-to-r from-amber-700 to-amber-800 text-white shadow-xs font-bold"
                      : "text-stone-700 hover:text-[#78350F] hover:bg-white"
                  }`}
                >
                  {isHindi ? "उपनिषद् (९ ग्रंथ)" : "Upanishads (9 Texts)"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReaderCategory("darshanas");
                    setSelectedReaderSlug("yoga");
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    readerCategory === "darshanas"
                      ? "bg-gradient-to-r from-amber-700 to-amber-800 text-white shadow-xs font-bold"
                      : "text-stone-700 hover:text-[#78350F] hover:bg-white"
                  }`}
                >
                  {isHindi ? "षड्दर्शन सूत्र (६ दर्शन)" : "Shad-Darshana Sutras (6 Schools)"}
                </button>
              </div>
            </div>

            {/* Scripture Selector Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200/70 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-devanagari">
                  {readerCategory === "upanishads"
                    ? (isHindi ? "वाचन हेतु उपनिषद् चुनें:" : "Select Upanishad to Read:")
                    : (isHindi ? "वाचन हेतु दर्शन सूत्र चुनें:" : "Select Darshana Sutras to Read:")}
                </span>
                <span className="text-[11px] text-[#78350F] font-bold">
                  {isHindi ? "चयनित:" : "Selected:"} {currentReaderScripture?.label}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {(readerCategory === "upanishads" ? READER_UPANISHADS : READER_DARSHANAS).map((item) => {
                  const isSelected = selectedReaderSlug === item.slug;
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => setSelectedReaderSlug(item.slug)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-gradient-to-r from-amber-700 to-amber-800 text-white border-amber-800 shadow-xs"
                          : "bg-[#FBF9F5] text-[#1E293B] hover:bg-white hover:text-[#78350F] border-amber-200/70 hover:-translate-y-0.5"
                      }`}
                    >
                      <span>{item.name}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          isSelected ? "bg-amber-900/60 text-amber-100" : "bg-amber-100/70 text-[#78350F]"
                        }`}
                      >
                        {item.totalItems} {readerCategory === "upanishads" ? (isHindi ? "मन्त्र" : "mantras") : (isHindi ? "सूत्र" : "sutras")}
                      </span>
                      {item.isComplete && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                            isSelected ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isHindi ? "पूर्ण पाठ" : "Complete"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Paginated ScriptureReaderView */}
            <ScriptureReaderView scripture={currentReaderScripture} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 0B: PHILOSOPHY TAXONOMY & NESTED SUB-SCHOOLS */}
        {/* ========================================================================= */}
        {activeTab === "taxonomy" && (
          <DarshanaTaxonomyView
            onSelectReaderText={(schoolId) => {
              setReaderCategory("darshanas");
              setSelectedReaderSlug(schoolId);
              handleTabChange("reader", schoolId);
            }}
          />
        )}

        {/* ========================================================================= */}
        {/* TAB 1: 11 MUKHYA UPANISHADS (BENTO-STYLE ARCHITECTURE) */}
        {/* ========================================================================= */}
        {activeTab === "upanishad" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header & Filter Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E5E5] shadow-xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#D9A441]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D9A441] font-devanagari">
                    {isHindi ? "प्रस्थानत्रयी • वेदान्त ज्ञानकाण्ड" : "Prasthanatrayi • Vedanta Jnana-Kanda"}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                  {isHindi ? "एकादश मुख्योपनिषद्" : "11 Principal Upanishads"}
                </h2>
                <p className="text-xs text-[#555555] font-devanagari mt-1">
                  {isHindi
                    ? "आदि शंकराचार्य भाष्य युक्त — ईश, केन, कठ, प्रश्न, मुण्डक, माण्डूक्य, तैत्तिरीय, ऐतरेय, छान्दोग्य, बृहदारण्यक एवं श्वेताश्वतर"
                    : "Commented upon by Adi Shankaracharya — Isha, Kena, Katha, Prashna, Mundaka, Mandukya, Taittiriya, Aitareya, Chandogya, Brihadaranyaka & Shvetashvatara"}
                </p>
              </div>

              {/* Text Search */}
              <div className="relative min-w-[240px]">
                <Search className="w-3.5 h-3.5 text-[#555555] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isHindi ? "उपनिषद, वेद या सूत्र खोजें..." : "Search Upanishads, Vedas or Sutras..."}
                  className="w-full pl-8 pr-7 py-2 rounded-xl text-xs bg-white border border-[#E5E5E5] focus:border-[#D9A441] focus:ring-1 focus:ring-[#FFD21F] focus:outline-none placeholder:text-[#555555] font-devanagari text-[#111111]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-[#555555] hover:text-[#111111] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Bento Research Overviews */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-[#E5E5E5] hover:border-[#D9A441] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 text-[#111111] font-bold text-sm mb-2">
                  <Brain className="w-4 h-4 text-[#D9A441]" />
                  <span>{isHindi ? "दार्शनिक जिज्ञासा (Core Inquiry)" : "Core Philosophical Inquiry"}</span>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed font-devanagari">
                  {isHindi
                    ? "उपनिषदों का मूल अनुसंधान: “अहं कौन हूँ?”, “चेतना का अधिष्ठान क्या है?”, और “संसार के परे नित्य अमृत पद क्या है?”"
                    : "The Upanishadic quest: 'Who am I?', 'What is the ground of consciousness?', and 'What is the immortal truth beyond worldliness?'"}
                </p>
              </div>
              <div className="bg-white border border-[#E5E5E5] hover:border-[#D9A441] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 text-[#111111] font-bold text-sm mb-2">
                  <Sparkles className="w-4 h-4 text-[#D9A441]" />
                  <span>{isHindi ? "साक्षी चेतना (Transcendence)" : "Witness Consciousness (Sakshi)"}</span>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed font-devanagari">
                  {isHindi
                    ? "ईश, कठ, माण्डूक्य और बृहदारण्यक आत्मा, ब्रह्म, अविद्या, विवेक एवं तुरीय साक्षी-चेतना के अमर सत्य को उद्घाटित करते हैं।"
                    : "Isha, Katha, Mandukya & Brihadaranyaka reveal the eternal truth of Atman, Brahman, Viveka, and Turiya witness awareness."}
                </p>
              </div>
              <div className="bg-white border border-[#E5E5E5] hover:border-[#D9A441] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 text-[#111111] font-bold text-sm mb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D9A441]" />
                  <span>{isHindi ? "जीवन-मुक्ति साधना (Living Realization)" : "Living Realization (Jivanmukti)"}</span>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed font-devanagari">
                  {isHindi
                    ? "नैतिक आचरण (सत्यं वद धर्मं चर), पञ्चकोश विवेक, ॐकार ध्यान एवं अनासक्ति से इसी जीवन में आत्म-साक्षात्कार।"
                    : "Self-realization in this very life through ethical living, Panchakosha discernment, Omkara meditation, and detachment."}
                </p>
              </div>
            </div>

            {/* 11 Mukhya Upanishads Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredUpanishads.map((u, idx) => {
                const isFeatured = u.slug === "mandukya-upanishad" || u.slug === "isha-upanishad" || u.slug === "brihadaranyaka-upanishad";

                return (
                  <div
                    key={u.id}
                    onClick={() => navigate(`/library/upanishad/${u.slug}`)}
                    className={`bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#D9A441] shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group relative cursor-pointer ${
                      u.slug === "brihadaranyaka-upanishad" ? "md:col-span-2 lg:col-span-2 border-[#D9A441]/70" : ""
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-stone-50 text-[#111111] border border-[#E5E5E5]">
                          #{idx + 1}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#111111] border border-[#FFD21F]">
                            {u.veda.split(" ")[0]}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-50 text-[#111111] border border-[#E5E5E5]">
                            {u.mantrasCount}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors">
                        {u.name}
                      </h3>
                      <div className="text-xs text-[#D9A441] font-semibold mt-0.5 font-sans">
                        {u.veda} • {u.enName}
                      </div>

                      {/* Central Theme */}
                      <p className="text-xs text-[#555555] font-devanagari mt-2.5 leading-relaxed line-clamp-3">
                        {u.centralTheme}
                      </p>

                      {/* Shanti Mantra Snippet with Copy Button */}
                      <div className="mt-3 p-3.5 rounded-xl bg-stone-50/80 border border-[#E5E5E5] text-xs font-devanagari text-[#111111] relative group/shanti">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9A441]">
                            {isHindi ? "शान्ति पाठ:" : "Shanti Patha:"}
                          </span>
                          <button
                            onClick={(e) => handleCopyVerse(u.id, u.shantiMantra, e)}
                            title={isHindi ? "शान्ति पाठ कॉपी करें" : "Copy Shanti Patha"}
                            className="p-1 rounded bg-white hover:bg-stone-100 text-[#111111] border border-[#E5E5E5] transition-colors cursor-pointer"
                          >
                            {copiedId === u.id ? (
                              <Check className="w-3 h-3 text-emerald-700" />
                            ) : (
                              <Copy className="w-3 h-3 text-[#111111]" />
                            )}
                          </button>
                        </div>
                        <p className="italic line-clamp-2 text-[#111111] leading-relaxed">
                          {u.shantiMantra}
                        </p>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-5 pt-3.5 border-t border-[#E5E5E5] flex items-center justify-between gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/library/upanishad/${u.slug}`);
                        }}
                        className="text-xs font-bold text-[#555555] hover:text-[#111111] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Info className="w-3.5 h-3.5 text-[#D9A441]" />
                        <span>{isHindi ? "दार्शनिक सार" : "Philosophical Essence"}</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setReaderCategory("upanishads");
                            setSelectedReaderSlug(u.slug);
                            handleTabChange("reader", u.slug);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FFD21F] hover:bg-[#FFD21F]/90 text-[#111111] font-bold text-xs transition-colors shadow-2xs cursor-pointer border border-[#FFD21F] hover:border-[#D9A441]"
                          title={isHindi ? "मूल मन्त्र एवं अनुवाद पढ़ें" : "Read Verses & Translation"}
                        >
                          <BookOpen className="w-3 h-3 text-[#111111]" />
                          <span>{isHindi ? "मन्त्र वाचन" : "Read Verses"}</span>
                        </button>
                        <Link
                          to={`/library/upanishad/${u.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white text-[#111111] hover:border-[#D9A441] border border-[#E5E5E5] font-bold text-xs transition-colors"
                          title={isHindi ? "विस्तृत उपनिषद संरचना" : "Detailed Structure"}
                        >
                          <span>{isHindi ? "संरचना" : "Structure"}</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-[#D9A441]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: 4 MAHAVAKYAS */}
        {/* ========================================================================= */}
        {activeTab === "mahavakya" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl border border-amber-200/70 shadow-xs p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#78350F] bg-amber-50 px-3 py-1 rounded-full border border-amber-200/70">
                {isHindi ? "VEDIC FOUNDATION • चार वेदों के सार-सूत्र" : "VEDIC FOUNDATION • 4 Vedas Quintessence"}
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1E293B] mt-2 mb-2">
                {isHindi ? "चार वेदों के चार महावाक्य" : "The 4 Great Mahavakyas of the Vedas"}
              </h2>
              <p className="text-sm text-stone-600 font-devanagari leading-relaxed max-w-3xl">
                {isHindi
                  ? "वेदों के ज्ञानकाण्ड का सार चार महावाक्यों में संघनित है। ये केवल विचार नहीं हैं, बल्कि लक्षण, उपदेश, अनुभव और साक्षात्कार के रूप में साधक की अंतःचेतना को ब्रह्ममय बनाने वाले महामंत्र हैं।"
                  : "The essence of the Vedic Jnana-Kanda distilled into four great aphorisms, elevating the seeker's consciousness to non-dual Brahman."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MAHAVAKYAS_DATA.map((mv) => (
                <div
                  key={mv.id}
                  className="bg-white rounded-2xl border border-amber-200/70 hover:border-amber-400 p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-[#78350F] border border-amber-200/70">
                        {mv.category}
                      </span>
                      <span className="text-xs text-stone-600 font-semibold font-devanagari">
                        {mv.veda}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-3xl font-extrabold text-[#78350F] tracking-wide mb-1">
                        {mv.text}
                      </h3>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={(e) => handleToggleSound(mv.id, e)}
                          title={isHindi ? "महावाक्य श्रवण" : "Listen Mahavakya"}
                          className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                            playingId === mv.id
                              ? "bg-amber-700 text-white border-amber-700 animate-pulse"
                              : "bg-amber-50 text-[#78350F] border-amber-200/80 hover:bg-amber-100"
                          }`}
                        >
                          {playingId === mv.id ? (
                            <VolumeX className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4 text-amber-800" />
                          )}
                        </button>
                        <button
                          onClick={(e) => handleCopyVerse(mv.id, `${mv.text} — ${mv.meaning} (${mv.upanishad})`, e)}
                          title={isHindi ? "महावाक्य कॉपी करें" : "Copy Mahavakya"}
                          className="p-1.5 rounded-lg bg-amber-50 text-[#78350F] border border-amber-200/80 hover:bg-amber-100 transition-colors cursor-pointer"
                        >
                          {copiedId === mv.id ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-amber-800" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-sm font-sans font-bold text-[#1E293B] mt-1 mb-3">
                      {mv.meaning}
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-amber-200/70 text-xs font-devanagari text-stone-700 leading-relaxed mb-4">
                      {mv.desc}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs text-stone-500 font-devanagari">
                    <span>
                      {isHindi ? "स्रोत:" : "Source:"} <strong className="text-[#1E293B]">{mv.upanishad}</strong>
                    </span>
                    <span className="text-[#78350F] font-bold flex items-center gap-1">
                      <span>{isHindi ? "अपरोक्षानुभूति" : "Direct Realization"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SHAD-DARSHANAS */}
        {/* ========================================================================= */}
        {activeTab === "darshana" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Darshana Intro Card */}
            <div className="bg-white rounded-3xl border border-amber-200/70 shadow-xs p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-[#78350F] border border-amber-200/70">
                  <Brain className="w-3.5 h-3.5 text-amber-700" />
                  <span>{isHindi ? "भारतीय दर्शन • षड्दर्शन (Six Astika Systems)" : "Indian Philosophy • Six Astika Systems"}</span>
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#1E293B]">
                  {isHindi ? "षड्दर्शन: सत्य के छह शाश्वत दृष्टिकोण" : "Six Systems: The Eternal Perspectives of Truth"}
                </h2>
                <p className="text-sm text-stone-600 font-devanagari leading-relaxed">
                  {isHindi
                    ? '"दृश्यते यथार्थतत्त्वं अनेनेति दर्शनम्" — सत्य का यथार्थ साक्षात्कार ही दर्शन है। न्याय-वैशेषिक, सांख्य-योग और मीमांसा-वेदान्त — ये तीन युग्म परस्पर विरोधी नहीं, बल्कि बुद्धि की सूक्ष्मता के अनुसार साधक को स्थूल तर्क से सर्वोच्च अद्वैत ब्रह्मज्ञान तक ले जाने वाली सुव्यवस्थित सोपान हैं।'
                    : '"That by which truth is perceived is Darshana." Nyaya-Vaisheshika, Samkhya-Yoga, and Mimamsa-Vedanta form complementary steps leading the intellect from empirical logic to non-dual supreme realization.'}
                </p>
              </div>

              {/* Astika Definition Box */}
              <div className="bg-[#FBF9F5] p-4 rounded-2xl border border-amber-200/80 text-xs font-devanagari text-[#1E293B] max-w-xs shrink-0 shadow-2xs">
                <strong className="block text-[#78350F] mb-1 font-bold">
                  {isHindi ? "आस्तिक दर्शन की परिभाषा:" : "Definition of Astika Darshana:"}
                </strong>
                {isHindi
                  ? "वेदों की परम प्रामाणिकता को स्वीकार कर मोक्ष एवं आत्म-साक्षात्कार की ओर ले जाने वाले ६ प्रमुख सनातन दर्शन।"
                  : "The six classical orthodox schools accepting Vedic epistemic authority, guiding towards liberation and Self-realization."}
              </div>
            </div>

            {/* 6 Darshanas Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDarshanas.map((d) => (
                <div
                  key={d.id}
                  onClick={() => navigate(`/library/darshana/${d.id}`)}
                  className="bg-white rounded-2xl border border-amber-200/70 hover:border-amber-400 p-5 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-stone-500">
                        {isHindi ? "युग्म:" : "Paired with:"} {d.pairedWith}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-[#78350F] border border-amber-200/70">
                        {d.pramanas.length} {isHindi ? "प्रमाण" : "pramanas"}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#1E293B] group-hover:text-[#78350F] transition-colors">
                      {d.name}{" "}
                      <span className="text-sm font-sans font-normal text-stone-500">
                        ({d.enName})
                      </span>
                    </h3>

                    <div className="text-xs text-stone-600 font-devanagari mt-1">
                      <strong>{isHindi ? "प्रवर्तक:" : "Founder:"}</strong> {d.founder} •{" "}
                      <strong>{isHindi ? "मूल ग्रंथ:" : "Root Text:"}</strong> {d.foundationalText}
                    </div>

                    <div className="mt-3 p-2.5 rounded-xl bg-[#FBF9F5] border border-amber-200/70 text-xs font-devanagari text-stone-700 leading-relaxed">
                      <strong>{isHindi ? "स्वरूप:" : "Nature:"}</strong> {d.nature}
                    </div>

                    <div className="mt-3 text-xs text-stone-600 font-devanagari">
                      <strong>{isHindi ? "स्वीकृत प्रमाण:" : "Epistemic Means (Pramanas):"}</strong> {d.pramanas.join(", ")}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/library/darshana/${d.id}`);
                      }}
                      className="text-xs font-bold text-stone-600 hover:text-[#1E293B] flex items-center gap-1 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-amber-700" />
                      <span>{isHindi ? "सिद्धांत" : "Principles"}</span>
                    </button>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setReaderCategory("darshanas");
                          setSelectedReaderSlug(d.id);
                          handleTabChange("reader", d.id);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-700 to-amber-800 text-white hover:from-amber-800 hover:to-amber-900 font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                        title={isHindi ? "मूल सूत्र वाचन" : "Read Root Sutras"}
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-200" />
                        <span>{isHindi ? "सूत्र वाचन" : "Read Sutras"}</span>
                      </button>
                      <Link
                        to={`/library/darshana/${d.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 text-[#78350F] hover:bg-amber-100 border border-amber-200/70 font-bold text-xs transition-colors"
                        title={isHindi ? "विस्तृत सूत्र संरचना" : "Detailed Structure"}
                      >
                        <span>{isHindi ? "विस्तृत संरचना" : "Detailed Structure"}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Matrix Table */}
            <div className="bg-white rounded-3xl border border-amber-200/70 shadow-xs p-6 overflow-x-auto">
              <h3 className="font-serif text-xl font-bold text-[#1E293B] mb-3">
                {isHindi ? "षड्दर्शन तुलनात्मक सारणी" : "Comparative Philosophical Matrix of Shad-Darshanas"}
              </h3>
              <table className="w-full text-xs font-devanagari text-left border-collapse">
                <thead>
                  <tr className="border-b border-amber-200/70 bg-[#FBF9F5] text-[#1E293B]">
                    <th className="py-2.5 px-3 font-bold">{isHindi ? "दर्शन" : "Philosophy"}</th>
                    <th className="py-2.5 px-3 font-bold">{isHindi ? "आचार्य" : "Founder"}</th>
                    <th className="py-2.5 px-3 font-bold">{isHindi ? "प्रमाण" : "Epistemology"}</th>
                    <th className="py-2.5 px-3 font-bold">{isHindi ? "परमतत्व का स्वरूप" : "Supreme Reality"}</th>
                    <th className="py-2.5 px-3 font-bold">{isHindi ? "बंधन का कारण" : "Cause of Bondage"}</th>
                    <th className="py-2.5 px-3 font-bold">{isHindi ? "मुक्ति का साधन" : "Means of Liberation"}</th>
                  </tr>
                </thead>
                <tbody>
                  {DARSHANA_COMPARISON_MATRIX.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="border-b border-stone-100 hover:bg-[#FBF9F5] transition-colors"
                    >
                      <td className="py-2.5 px-3 font-bold text-[#78350F]">
                        {row.school}
                      </td>
                      <td className="py-2.5 px-3 text-[#1E293B]">
                        {row.founder}
                      </td>
                      <td className="py-2.5 px-3 text-stone-700">
                        {row.pramanasCount} {isHindi ? "प्रमाण" : "pramanas"}
                      </td>
                      <td className="py-2.5 px-3 text-stone-700">
                        {row.reality}
                      </td>
                      <td className="py-2.5 px-3 text-stone-700">
                        {row.bondageCause}
                      </td>
                      <td className="py-2.5 px-3 text-emerald-800 font-semibold">
                        {row.path}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: 108 MUKTIKA CANON (BENTO-STYLE ARCHITECTURE) */}
        {/* ========================================================================= */}
        {activeTab === "muktika" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header & Canonical Vedic Epistemology */}
            <div className="bg-white rounded-3xl border border-[#E5E5E5] shadow-xs p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFD21F] px-3.5 py-1 rounded-full shadow-2xs border border-[#FFD21F]">
                  108 MUKTIKA CANON • {isHindi ? "भगवान श्रीराम-हनुमान संवाद" : "Lord Rama & Hanuman Dialogue"}
                </span>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-stone-50 border border-[#E5E5E5] text-[#111111]">
                  {isHindi ? "कुल १०८ उपनिषद संगणना" : "Total 108 Upanishads Canon"}
                </span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#111111]">
                {isHindi ? "१०८ मुक्तिक उपनिषद् कोष" : "The 108 Muktika Canon"}
              </h2>
              <p className="text-sm text-[#555555] font-devanagari leading-relaxed">
                {isHindi
                  ? "मुक्तिक उपनिषद में मर्यादा पुरुषोत्तम भगवान श्रीराम ने पवनपुत्र श्री हनुमान जी को समस्त १०८ उपनिषदों का प्रामाणिक क्रम एवं मुक्ति-मार्ग का उपदेश दिया। वेदों (ऋक्, यजुष्, साम, अथर्व) एवं साधना-परंपराओं (सामान्य वेदान्त, संन्यास, शाक्त, वैष्णव, शैव, योग) के अनुसार इनका सुव्यवस्थित विभाजन।"
                  : "In the Muktika Upanishad, Lord Rama imparts to Hanuman the canonical order of the 108 Upanishads and the path to liberation, organized across the four Vedas and seven traditions."}
              </p>

              {/* By Veda Bento Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
                {MUKTIKA_CANON_SUMMARY.byVeda.map((bv, bIdx) => {
                  const isSelected = muktikaVedaFilter === bv.veda;
                  return (
                    <button
                      key={bIdx}
                      type="button"
                      onClick={() => setMuktikaVedaFilter(isSelected ? "all" : bv.veda)}
                      className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#FFD21F] border-[#FFD21F] shadow-sm -translate-y-0.5 text-[#111111]"
                          : "bg-white hover:bg-stone-50 border-[#E5E5E5] hover:border-[#D9A441]"
                      }`}
                    >
                      <div className="font-serif text-2xl font-black text-[#111111]">
                        {bv.count}
                      </div>
                      <div className="text-xs font-bold text-[#111111] mt-0.5">
                        {bv.veda}
                      </div>
                      <div className="text-[10px] text-[#555555] mt-1 line-clamp-1">
                        {bv.key.join(", ")}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter & Search Bar for 108 Upanishads Bento Grid */}
            <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-3.5 h-3.5 text-[#555555] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={muktikaSearch}
                    onChange={(e) => setMuktikaSearch(e.target.value)}
                    placeholder={isHindi ? "१०८ उपनिषदों में नाम, वेद या विषय खोजें..." : "Search name, Veda or theme in 108 Upanishads..."}
                    className="w-full pl-8 pr-7 py-2 rounded-xl text-xs bg-white border border-[#E5E5E5] focus:border-[#D9A441] focus:ring-1 focus:ring-[#FFD21F] focus:outline-none placeholder:text-[#555555] font-devanagari text-[#111111]"
                  />
                  {muktikaSearch && (
                    <button
                      onClick={() => setMuktikaSearch("")}
                      className="p-1 text-[#555555] hover:text-[#111111] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Counter */}
                <div className="text-xs font-bold text-[#111111] self-start md:self-auto flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D9A441]" />
                  <span>{isHindi ? `प्रदर्शित: ${filtered108Upanishads.length} / १०८ उपनिषद` : `Showing: ${filtered108Upanishads.length} / 108 Upanishads`}</span>
                  {(muktikaVedaFilter !== "all" || muktikaCategoryFilter !== "all" || muktikaSearch) && (
                    <button
                      type="button"
                      onClick={() => {
                        setMuktikaVedaFilter("all");
                        setMuktikaCategoryFilter("all");
                        setMuktikaSearch("");
                      }}
                      className="text-[11px] text-[#D9A441] hover:underline font-semibold cursor-pointer ml-1"
                    >
                      {isHindi ? "फ़िल्टर रीसेट" : "Reset Filter"}
                    </button>
                  )}
                </div>
              </div>

              {/* 7 Tradition Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                <span className="text-[11px] font-bold text-[#555555] whitespace-nowrap mr-1">
                  {isHindi ? "परंपरा:" : "Tradition:"}
                </span>
                {[
                  { id: "all", labelHi: "समस्त ७ परंपराएँ", labelEn: "All 7 Traditions" },
                  { id: "दशोपनिषद् / मुख्योपनिषद्", labelHi: "दशोपनिषद् / मुख्योपनिषद्", labelEn: "Principal / Mukhya" },
                  { id: "सामान्य वेदान्त", labelHi: "सामान्य वेदान्त", labelEn: "Samanya Vedanta" },
                  { id: "संन्यास उपनिषद्", labelHi: "संन्यास उपनिषद्", labelEn: "Sannyasa Upanishads" },
                  { id: "शाक्त उपनिषद्", labelHi: "शाक्त उपनिषद्", labelEn: "Shakta Upanishads" },
                  { id: "वैष्णव उपनिषद्", labelHi: "वैष्णव उपनिषद्", labelEn: "Vaishnava Upanishads" },
                  { id: "शैव उपनिषद्", labelHi: "शैव उपनिषद्", labelEn: "Shaiva Upanishads" },
                  { id: "योग उपनिषद्", labelHi: "योग उपनिषद्", labelEn: "Yoga Upanishads" },
                ].map((cat) => {
                  const isSelected = muktikaCategoryFilter === cat.id;
                  const label = isHindi ? cat.labelHi : cat.labelEn;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setMuktikaCategoryFilter(cat.id)}
                      className={`px-3 py-1 rounded-full whitespace-nowrap font-medium text-[11px] border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#FFD21F] text-[#111111] border-[#FFD21F] font-bold shadow-2xs"
                          : "bg-white text-[#555555] border-[#E5E5E5] hover:border-[#D9A441] hover:text-[#111111]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 108 Upanishads Bento Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered108Upanishads.map((u) => {
                const isMukhya = u.category.includes("दशोपनिषद्");
                const uSlug =
                  u.slug ||
                  (u.enName
                    ? `${u.enName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")}-upanishad`
                    : `upanishad-${u.order}`);
                const readerMatch = READER_UPANISHADS.find((r) =>
                  u.enName.toLowerCase().includes(r.slug.replace("-upanishad", "")) ||
                  r.name.includes(u.name.replace("ोपनिषद्", "").replace("पनिषद्", ""))
                );

                return (
                  <div
                    key={u.order}
                    onClick={() => navigate(`/library/upanishad/${uSlug}`)}
                    className={`p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between group cursor-pointer ${
                      isMukhya ? "border-[#D9A441]/50 bg-stone-50/20" : ""
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-stone-100 text-[#111111] border border-[#E5E5E5]">
                          #{u.order}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#111111] border border-[#FFD21F] truncate max-w-[130px]">
                          {u.veda}
                        </span>
                      </div>

                      {/* Name */}
                      <h4 className="font-serif text-lg font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors leading-snug">
                        {u.name}
                      </h4>
                      <div className="text-[11px] font-medium text-[#D9A441] mt-0.5 font-sans">
                        {u.enName} Upanishad • <span className="text-[#555555]">{u.category.split(" ")[0]}</span>
                      </div>

                      {/* Sacred Theme */}
                      <p className="text-xs text-[#555555] font-devanagari mt-2 leading-relaxed line-clamp-3">
                        {u.theme}
                      </p>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-4 pt-2.5 border-t border-[#E5E5E5] flex items-center justify-between gap-1 text-[11px]">
                      <span className="text-[#555555] font-devanagari text-[10px]">
                        {isHindi ? `मुक्तिक क्रम #${u.order}` : `Muktika #${u.order}`}
                      </span>

                      {readerMatch ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setReaderCategory("upanishads");
                            setSelectedReaderSlug(readerMatch.slug);
                            handleTabChange("reader", readerMatch.slug);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FFD21F] hover:bg-[#FFD21F]/90 text-[#111111] font-bold text-[10px] shadow-2xs border border-[#FFD21F] cursor-pointer"
                        >
                          <BookOpen className="w-3 h-3 text-[#111111]" />
                          <span>{isHindi ? "मूल पाठ" : "Root Text"}</span>
                        </button>
                      ) : (
                        <span className="text-[10px] font-semibold text-[#D9A441] group-hover:underline flex items-center gap-0.5">
                          <span>{isHindi ? "संरचना" : "Structure"}</span>
                          <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filtered108Upanishads.length === 0 && (
              <div className="p-6 sm:p-8 text-center bg-white rounded-2xl border border-[#E5E5E5] text-[#555555]">
                <p className="text-sm font-devanagari">{isHindi ? "कोई उपनिषद नहीं मिला। कृपया अन्य शब्द या श्रेणी चुनें।" : "No Upanishad found. Please try another keyword or category."}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
