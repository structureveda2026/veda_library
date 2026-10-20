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
  const [selectedUpanishadModal, setSelectedUpanishadModal] = useState(null);
  const [selectedDarshanaModal, setSelectedDarshanaModal] = useState(null);

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
    <div className="bg-[#FBF9F5] min-h-screen text-[#1E293B] pb-24">
      {/* 1. Scholarly Royal Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#170e06] via-[#221308] to-[#120a04] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-900/60 shadow-xl">
        {/* Sacred Kashi Ganga Ghat Authentic Real Banner */}
        <div className="absolute inset-0 z-0">
          <img
            src={bannerKashiGhat}
            alt="Sacred Kashi Ghat Philosophical Hermitage"
            className="w-full h-full object-cover object-center opacity-40 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120a04] via-[#1a0e06]/75 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/20 via-transparent to-[#120a04]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-amber-300/90 mb-4 font-serif">
            <Link to="/" className="hover:text-amber-200 transition-colors">
              होम
            </Link>
            <span>/</span>
            <Link to="/library" className="hover:text-amber-200 transition-colors">
              वैदिक ज्ञानकोष
            </Link>
            <span>/</span>
            <span className="text-amber-100 font-semibold">
              उपनिषद् एवं दर्शन
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            {/* Left 7 Cols: Title & Shanti Invocation */}
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-xs">
                <Brain className="w-3.5 h-3.5 text-amber-300" />
                <span>UPANISHAD & DARSHANA PHILOSOPHY • वेदान्त एवं षड्दर्शन</span>
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
                उपनिषद् एवं दर्शन
                <span className="block text-xl sm:text-2xl font-normal text-amber-200/95 mt-1 font-sans">
                  The Pinnacle of Vedic Non-Dual Realization & The Six Astika Systems
                </span>
              </h1>

              <p className="text-amber-100/90 text-sm sm:text-base font-devanagari leading-relaxed max-w-3xl drop-shadow-xs">
                वेदों का ज्ञानकाण्ड (वेदान्त) और भारतीय मेधा के ६ सर्वोच्च दार्शनिक तंत्र — आत्मा, परमात्मा, संसार और मुक्ति के परम सत्य का वैज्ञानिक, तार्किक एवं अपरोक्षानुभूतिपरक निरूपण।
              </p>

              {/* Shanti Invocation Royal Banner with Audio & Copy */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-amber-300/90 text-[#1E293B] text-xs sm:text-sm font-devanagari leading-relaxed shadow-lg">
                <div className="flex items-center justify-between gap-3 pb-2 mb-2 border-b border-amber-200/70">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#78350F]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    ईशावास्य एवं बृहदारण्यक उपनिषद् शांति पाठ
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) =>
                        handleToggleSound("hero-shanti", e)
                      }
                      title="ध्वनि श्रवण"
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                        playingId === "hero-shanti"
                          ? "bg-amber-700 text-white shadow-xs animate-pulse"
                          : "bg-amber-50 hover:bg-amber-100 text-[#78350F] border border-amber-300/70"
                      }`}
                    >
                      {playingId === "hero-shanti" ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>ध्वनि तरंग...</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                          <span>सस्वर पाठ</span>
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
                      title="मंत्र कॉपी करें"
                      className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#78350F] border border-amber-300/70 transition-colors cursor-pointer"
                    >
                      {copiedId === "hero-shanti" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-amber-800" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="font-serif font-bold text-base sm:text-lg text-[#78350F] leading-snug">
                  ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते। पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते॥
                </p>
                <p className="text-stone-600 text-xs mt-1.5 font-sans">
                  "परब्रह्म पूर्ण है, यह जगत भी पूर्ण है; पूर्ण से पूर्ण ही प्रकट होता है। पूर्ण में से पूर्ण निकाल लेने पर भी पूर्ण ही शेष रहता है।"
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
                      ब्रह्मविद्या एवं ध्यान
                    </span>
                    <p className="font-serif text-xs font-semibold text-amber-100 mt-1 line-clamp-1">
                      श्रीमद् आद्य शंकराचार्य अद्वैत परम्परा
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
                    मुख्य उपनिषद्
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5 font-medium">
                    शंकर भाष्य युक्त
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-2xl p-3.5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    ४
                  </div>
                  <div className="text-[11px] text-[#1E293B] font-bold uppercase tracking-wider">
                    महावाक्य
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5 font-medium">
                    चार वेदों के सूत्र
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-2xl p-3.5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    ६
                  </div>
                  <div className="text-[11px] text-[#1E293B] font-bold uppercase tracking-wider">
                    षड्दर्शन
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5 font-medium">
                    आस्तिक दर्शन परंपरा
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-2xl p-3.5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    १०८
                  </div>
                  <div className="text-[11px] text-[#1E293B] font-bold uppercase tracking-wider">
                    मुक्तिक कोष
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5 font-medium">
                    कल्याणकारी उपनिषद
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Navigation Tabs */}
      <div className="sticky top-16 z-30 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-amber-200/70 px-4 sm:px-6 lg:px-8 py-3 shadow-2xs">
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
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-amber-700 to-amber-800 text-white shadow-sm font-bold scale-[1.02]"
                      : "bg-white text-[#1E293B] hover:text-[#78350F] hover:bg-amber-50/80 border border-amber-200/70 hover:-translate-y-0.5 shadow-2xs"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-amber-200" : "text-amber-700"}`}
                  />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onOpenSearch && onOpenSearch("")}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-amber-200/80 text-stone-600 hover:text-[#1E293B] text-xs bg-white hover:bg-amber-50/60 transition-all cursor-pointer shadow-2xs"
          >
            <Search className="w-3.5 h-3.5 text-amber-700" />
            <span>त्वरित खोज (Ctrl+K)</span>
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
                  <span>AUTHENTIC SCRIPTURE & SUTRA PAGINATED READER</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1E293B]">
                  मूल ग्रंथ श्लोक एवं सूत्र वाचन
                </h2>
                <p className="text-stone-600 text-xs sm:text-sm font-devanagari mt-1 max-w-2xl leading-relaxed">
                  उपनिषदों के प्रामाणिक मन्त्र एवं षड्दर्शनों के मूल सूत्र — १० या २० प्रति पृष्ठ क्रमबद्ध वाचन, देवनागरी पाठ, हिन्दी भावार्थ, English अनुवाद, सरल हिंग्लिश व्याख्या एवं शास्त्राधारित भाष्य।
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
                  उपनिषद् (९ ग्रंथ)
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
                  षड्दर्शन सूत्र (६ दर्शन)
                </button>
              </div>
            </div>

            {/* Scripture Selector Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200/70 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-devanagari">
                  {readerCategory === "upanishads" ? "वाचन हेतु उपनिषद् चुनें:" : "वाचन हेतु दर्शन सूत्र चुनें:"}
                </span>
                <span className="text-[11px] text-[#78350F] font-bold">
                  चयनित: {currentReaderScripture?.label}
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
                        {item.totalItems} {readerCategory === "upanishads" ? "मन्त्र" : "सूत्र"}
                      </span>
                      {item.isComplete && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                            isSelected ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          पूर्ण पाठ
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
        {/* TAB 1: 11 MUKHYA UPANISHADS */}
        {/* ========================================================================= */}
        {activeTab === "upanishad" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-amber-200/70 shadow-xs">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1E293B]">
                  ग्यारह मुख्य उपनिषद् (11 Principal Upanishads)
                </h2>
                <p className="text-xs text-stone-600 font-devanagari mt-1">
                  श्रीमद् आद्य शंकराचार्य भाष्य युक्त — ईश, केन, कठ, प्रश्न, मुण्डक, माण्डूक्य, तैत्तिरीय, ऐतरेय, छान्दोग्य, बृहदारण्यक एवं श्वेताश्वतर
                </p>
              </div>

              {/* Text Search */}
              <div className="relative min-w-[240px]">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="उपनिषद, वेद या सूत्र खोजें..."
                  className="w-full pl-8 pr-7 py-2 rounded-xl text-xs bg-[#FBF9F5] border border-amber-200/80 focus:border-amber-500 focus:bg-white focus:outline-none placeholder:text-stone-400 font-devanagari text-[#1E293B]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-stone-400 hover:text-stone-700 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Deep Research Overview Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-white border border-amber-200/70 rounded-2xl p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-2 text-[#78350F] font-bold text-sm mb-2">
                  <Brain className="w-4 h-4 text-amber-700" />
                  Core Philosophical Inquiries
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-devanagari">
                  उपनिषदों का मूल प्रश्न है — “अहं कौन हूँ?”, “आत्मा क्या है?”, “ब्रह्म किससे जुड़ा है?”, और “संसार के परे अमर मुक्ति का मार्ग क्या है?”
                </p>
              </div>
              <div className="bg-white border border-amber-200/70 rounded-2xl p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-2 text-[#78350F] font-bold text-sm mb-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  Key Vision & Transcendence
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-devanagari">
                  ईश, कठ, बृहदारण्यक, छान्दोग्य और माण्डूक्य जैसे ग्रंथ आत्मा, ब्रह्म, अविद्या, विवेक, साक्षी-चेतना और भगवत्-प्राप्ति के शाश्वत संबंध को स्पष्ट करते हैं।
                </p>
              </div>
              <div className="bg-white border border-amber-200/70 rounded-2xl p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-2 text-[#78350F] font-bold text-sm mb-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700" />
                  Living Realization & Sadhana
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-devanagari">
                  ये ग्रंथ न केवल आध्यात्मिक चिंतन देते हैं, बल्कि नैतिक आचरण (सत्यं वद धर्मं चर), ध्यान, विवेक, वैराग्य और जीवन-मुक्ति के व्यावहारिक आधार प्रस्तुत करते हैं।
                </p>
              </div>
            </div>

            {/* Upanishads Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUpanishads.map((u, idx) => (
                <div
                  key={u.id}
                  className="bg-white rounded-2xl border border-amber-200/70 hover:border-amber-400 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FBF9F5] text-stone-700 border border-amber-200/50">
                        #{idx + 1}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-[#78350F] border border-amber-200/70">
                        {u.mantrasCount}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#1E293B] group-hover:text-[#78350F] transition-colors">
                      {u.name}
                    </h3>
                    <div className="text-xs text-[#78350F] font-semibold mt-0.5 font-sans">
                      {u.veda} • {u.enName}
                    </div>

                    <p className="text-xs text-stone-600 font-devanagari mt-2.5 leading-relaxed line-clamp-3">
                      {u.centralTheme}
                    </p>

                    {/* Shanti Mantra Snippet with Copy Button */}
                    <div className="mt-3 p-3 rounded-xl bg-[#FBF9F5] border border-amber-200/70 text-xs font-devanagari text-[#78350F] relative group/shanti">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                          शांति पाठ:
                        </span>
                        <button
                          onClick={(e) => handleCopyVerse(u.id, u.shantiMantra, e)}
                          title="शांति पाठ कॉपी करें"
                          className="p-1 rounded bg-white hover:bg-amber-100 text-stone-600 border border-amber-200/60 transition-colors cursor-pointer"
                        >
                          {copiedId === u.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-amber-800" />
                          )}
                        </button>
                      </div>
                      <p className="italic line-clamp-2 text-stone-800">
                        {u.shantiMantra}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-amber-100 flex items-center justify-between gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setSelectedUpanishadModal(u)}
                      className="text-xs font-bold text-stone-600 hover:text-[#1E293B] flex items-center gap-1 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-amber-700" />
                      <span>सिद्धांत</span>
                    </button>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setReaderCategory("upanishads");
                          setSelectedReaderSlug(u.slug);
                          handleTabChange("reader", u.slug);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-700 to-amber-800 text-white hover:from-amber-800 hover:to-amber-900 font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                        title="मूल श्लोक वाचन"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-200" />
                        <span>श्लोक वाचन</span>
                      </button>
                      <Link
                        to={`/library/upanishad/${u.slug}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 text-[#78350F] hover:bg-amber-100 border border-amber-200/70 font-bold text-xs transition-colors"
                        title="विस्तृत उपनिषद संरचना"
                      >
                        <span>मंत्र संरचना</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
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
                VEDIC FOUNDATION • चार वेदों के सार-सूत्र
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1E293B] mt-2 mb-2">
                चार वेदों के चार महावाक्य (The 4 Great Mahavakyas)
              </h2>
              <p className="text-sm text-stone-600 font-devanagari leading-relaxed max-w-3xl">
                वेदों के ज्ञानकाण्ड का सार चार महावाक्यों में संघनित है। ये केवल विचार नहीं हैं, बल्कि लक्षण, उपदेश, अनुभव और साक्षात्कार के रूप में साधक की अंतःचेतना को ब्रह्ममय बनाने वाले महामंत्र हैं।
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
                          title="महावाक्य श्रवण"
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
                          title="महावाक्य कॉपी करें"
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
                      स्रोत: <strong className="text-[#1E293B]">{mv.upanishad}</strong>
                    </span>
                    <span className="text-[#78350F] font-bold flex items-center gap-1">
                      <span>अपरोक्षानुभूति</span>
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
                  <span>भारतीय दर्शन • षड्दर्शन (Six Astika Systems)</span>
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#1E293B]">
                  षड्दर्शन: सत्य के छह शाश्वत दृष्टिकोण
                </h2>
                <p className="text-sm text-stone-600 font-devanagari leading-relaxed">
                  "दृश्यते यथार्थतत्त्वं अनेनेति दर्शनम्" — सत्य का यथार्थ साक्षात्कार ही दर्शन है। न्याय-वैशेषिक, सांख्य-योग और मीमांसा-वेदान्त — ये तीन युग्म परस्पर विरोधी नहीं, बल्कि बुद्धि की सूक्ष्मता के अनुसार साधक को स्थूल तर्क से सर्वोच्च अद्वैत ब्रह्मज्ञान तक ले जाने वाली सुव्यवस्थित सोपान हैं।
                </p>
              </div>

              {/* Astika Definition Box */}
              <div className="bg-[#FBF9F5] p-4 rounded-2xl border border-amber-200/80 text-xs font-devanagari text-[#1E293B] max-w-xs shrink-0 shadow-2xs">
                <strong className="block text-[#78350F] mb-1 font-bold">
                  आस्तिक दर्शन की परिभाषा:
                </strong>
                वेदों की परम प्रामाणिकता को स्वीकार कर मोक्ष एवं आत्म-साक्षात्कार की ओर ले जाने वाले ६ प्रमुख सनातन दर्शन।
              </div>
            </div>

            {/* 6 Darshanas Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDarshanas.map((d) => (
                <div
                  key={d.id}
                  className="bg-white rounded-2xl border border-amber-200/70 hover:border-amber-400 p-5 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-stone-500">
                        युग्म: {d.pairedWith}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-[#78350F] border border-amber-200/70">
                        {d.pramanas.length} प्रमाण
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#1E293B] group-hover:text-[#78350F] transition-colors">
                      {d.name}{" "}
                      <span className="text-sm font-sans font-normal text-stone-500">
                        ({d.enName})
                      </span>
                    </h3>

                    <div className="text-xs text-stone-600 font-devanagari mt-1">
                      <strong>प्रवर्तक:</strong> {d.founder} •{" "}
                      <strong>मूल ग्रंथ:</strong> {d.foundationalText}
                    </div>

                    <div className="mt-3 p-2.5 rounded-xl bg-[#FBF9F5] border border-amber-200/70 text-xs font-devanagari text-stone-700 leading-relaxed">
                      <strong>स्वरूप:</strong> {d.nature}
                    </div>

                    <div className="mt-3 text-xs text-stone-600 font-devanagari">
                      <strong>स्वीकृत प्रमाण:</strong> {d.pramanas.join(", ")}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setSelectedDarshanaModal(d)}
                      className="text-xs font-bold text-stone-600 hover:text-[#1E293B] flex items-center gap-1 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-amber-700" />
                      <span>सिद्धांत</span>
                    </button>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setReaderCategory("darshanas");
                          setSelectedReaderSlug(d.id);
                          handleTabChange("reader", d.id);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-700 to-amber-800 text-white hover:from-amber-800 hover:to-amber-900 font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                        title="मूल सूत्र वाचन"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-200" />
                        <span>सूत्र वाचन</span>
                      </button>
                      <Link
                        to={`/library/darshana/${d.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 text-[#78350F] hover:bg-amber-100 border border-amber-200/70 font-bold text-xs transition-colors"
                        title="विस्तृत सूत्र संरचना"
                      >
                        <span>विस्तृत संरचना</span>
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
                षड्दर्शन तुलनात्मक सारणी (Comparative Philosophical Matrix)
              </h3>
              <table className="w-full text-xs font-devanagari text-left border-collapse">
                <thead>
                  <tr className="border-b border-amber-200/70 bg-[#FBF9F5] text-[#1E293B]">
                    <th className="py-2.5 px-3 font-bold">दर्शन</th>
                    <th className="py-2.5 px-3 font-bold">आचार्य</th>
                    <th className="py-2.5 px-3 font-bold">प्रमाण</th>
                    <th className="py-2.5 px-3 font-bold">परमतत्व का स्वरूप</th>
                    <th className="py-2.5 px-3 font-bold">बंधन का कारण</th>
                    <th className="py-2.5 px-3 font-bold">मुक्ति का साधन</th>
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
                        {row.pramanasCount} प्रमाण
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
        {/* TAB 4: 108 MUKTIKA CANON */}
        {/* ========================================================================= */}
        {activeTab === "muktika" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl border border-amber-200/70 shadow-xs p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#78350F] bg-amber-50 px-3 py-1 rounded-full border border-amber-200/70">
                108 MUKTIKA CANON • भगवान श्रीराम-हनुमान संवाद
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1E293B] mt-2 mb-2">
                १०८ मुक्तिक उपनिषद् कोष (The 108 Muktika Canon)
              </h2>
              <p className="text-sm text-stone-600 font-devanagari leading-relaxed">
                मुक्तिक उपनिषद में भगवान श्रीराम ने पवनपुत्र हनुमान जी को १०८ उपनिषदों का क्रम व महात्म्य बताया। वेदों एवं विशिष्ट आध्यात्मिक परंपराओं (सामान्य वेदान्त, संन्यास, शाक्त, वैष्णव, शैव, योग) के अनुसार इनका सुव्यवस्थित विभाजन।
              </p>

              {/* By Veda Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-6">
                {MUKTIKA_CANON_SUMMARY.byVeda.map((bv, bIdx) => (
                  <div
                    key={bIdx}
                    className="p-4 rounded-2xl bg-[#FBF9F5] border border-amber-200/70 text-center hover:border-amber-400 hover:shadow-xs transition-all"
                  >
                    <div className="font-serif text-2xl font-black text-[#78350F]">
                      {bv.count}
                    </div>
                    <div className="text-xs font-bold text-[#1E293B] mt-0.5">
                      {bv.veda}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-1 line-clamp-1">
                      {bv.key.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* By Category Details */}
            <div className="bg-white rounded-3xl border border-amber-200/70 shadow-xs p-6 sm:p-8">
              <h3 className="font-serif text-2xl font-bold text-[#1E293B] mb-4">
                विषयगत ७ श्रेणियाँ (Categorical Classification)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MUKTIKA_CANON_SUMMARY.byCategory.map((cat, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-xl bg-[#FBF9F5] border border-amber-200/70 hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-serif text-base font-bold text-[#1E293B]">
                        {cat.category}
                      </h4>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100/70 text-[#78350F] border border-amber-200/60">
                        {cat.count} उपनिषद
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 font-devanagari mt-1 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: UPANISHAD TEACHINGS MODAL */}
      {/* ========================================================================= */}
      {selectedUpanishadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-amber-200/80 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-xs font-bold text-[#78350F] uppercase px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                  {selectedUpanishadModal.veda}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1E293B] mt-1">
                  {selectedUpanishadModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedUpanishadModal(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm font-devanagari">
              <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-amber-200/70 text-[#78350F] italic">
                <strong>शांति पाठ:</strong>{" "}
                {selectedUpanishadModal.shantiMantra}
                <div className="text-xs text-stone-600 mt-1 not-italic">
                  {selectedUpanishadModal.shantiMeaning}
                </div>
              </div>

              <div>
                <strong className="text-[#78350F] block mb-1">
                  प्रमुख गूढ़ सिद्धांत व आख्यान:
                </strong>
                <ul className="space-y-2">
                  {selectedUpanishadModal.keyTeachings.map((kt, idx) => (
                    <li
                      key={idx}
                      className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80 text-stone-800 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                      <span>{kt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <Link
                to={`/library/upanishad/${selectedUpanishadModal.slug}`}
                onClick={() => setSelectedUpanishadModal(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-white text-xs font-bold hover:from-amber-800 hover:to-amber-900 transition-colors shadow-2xs"
              >
                <span>विस्तृत उपनिषद संरचना देखें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setSelectedUpanishadModal(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold hover:bg-stone-200 transition-colors cursor-pointer"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: DARSHANA MODAL */}
      {/* ========================================================================= */}
      {selectedDarshanaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-amber-200/80 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-xs font-bold text-amber-900 uppercase px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                  प्रवर्तक: {selectedDarshanaModal.founder}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1E293B] mt-1">
                  {selectedDarshanaModal.name} ({selectedDarshanaModal.enName})
                </h3>
              </div>
              <button
                onClick={() => setSelectedDarshanaModal(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm font-devanagari">
              <p>
                <strong>मूल ग्रंथ:</strong>{" "}
                {selectedDarshanaModal.foundationalText}
              </p>
              <p>
                <strong>स्वीकृत प्रमाण:</strong>{" "}
                {selectedDarshanaModal.pramanas.join(", ")}
              </p>
              {selectedDarshanaModal.padarthas && (
                <p>
                  <strong>मूल पदार्थ:</strong> {selectedDarshanaModal.padarthas}
                </p>
              )}

              {selectedDarshanaModal.traditions && (
                <div>
                  <strong className="text-[#78350F] block mb-1">
                    प्रमुख वेदान्त संप्रदाय व आचार्य:
                  </strong>
                  <div className="space-y-2">
                    {selectedDarshanaModal.traditions.map((tr, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200"
                      >
                        <strong className="text-amber-950 block">
                          {tr.name} — {tr.acharya}
                        </strong>
                        <p className="text-stone-700 text-xs mt-0.5">
                          {tr.tenet}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <strong className="text-[#1E293B] block mb-1">
                  दार्शनिक आधारभूत सिद्धांत:
                </strong>
                <ul className="space-y-1.5 list-disc pl-5 text-stone-700">
                  {selectedDarshanaModal.corePhilosophy.map((cp, idx) => (
                    <li key={idx}>{cp}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                <strong>मोक्ष (मुक्ति) की अवधारणा:</strong>{" "}
                {selectedDarshanaModal.mokshaView}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <Link
                to={`/library/darshana/${selectedDarshanaModal.id}`}
                onClick={() => setSelectedDarshanaModal(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-white text-xs font-bold hover:from-amber-800 hover:to-amber-900 transition-colors shadow-2xs"
              >
                <span>विस्तृत सूत्र संरचना देखें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setSelectedDarshanaModal(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold hover:bg-stone-200 transition-colors cursor-pointer"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
