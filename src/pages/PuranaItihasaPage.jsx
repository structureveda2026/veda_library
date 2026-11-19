import React, { useState, useMemo } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  Search,
  Filter,
  Layers,
  Scroll,
  Crown,
  Flame,
  Shield,
  Heart,
  ChevronRight,
  Compass,
  X,
  Info,
  ExternalLink,
  Copy,
  Check,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  PANCHA_LAKSHANA,
  MAHAPURANAS_DATA,
  UPAPURANAS_DATA,
} from "../data/puranaData.js";
import SEO from "../components/common/SEO.jsx";
import {
  ITIHASA_EPISTEMOLOGY,
  RAMAYANA_DATA,
  MAHABHARATA_DATA,
} from "../data/itihasaData.js";
import ScriptureReaderView from "../components/common/ScriptureReaderView.jsx";
import PuranaItihasaTaxonomyView from "../components/knowledge/PuranaItihasaTaxonomyView.jsx";
import { getScriptureReaderData } from "../data/scriptures/index.js";
import bannerTempleGhat from "../assets/images/library/banners/banner-temple-ghat.jpg";
import cardPuranaImg from "../assets/images/library/cards/card-purana.jpg";
import cardRamayanaImg from "../assets/images/library/cards/card-ramayana.jpg";
import { useLanguage } from "../context/LanguageContext.jsx";
import cardMahabharataImg from "../assets/images/library/cards/card-mahabharata.jpg";
import cardGitaImg from "../assets/images/library/cards/card-gita.jpg";

const READER_PURANAS_LIST = [
  { id: "shrimad-bhagavata", name: "श्रीमद्भागवत", shlokas: "१८,०००", guna: "सात्त्विक" },
  { id: "vishnu-purana", name: "विष्णु पुराण", shlokas: "२३,०००", guna: "सात्त्विक" },
  { id: "shiva-purana", name: "शिव पुराण", shlokas: "२४,०००", guna: "तामस" },
  { id: "markandeya-purana", name: "मार्कण्डेय / दुर्गा सप्तशती", shlokas: "९,०००", guna: "राजस" },
  { id: "padma-purana", name: "पद्म पुराण", shlokas: "५५,०००", guna: "सात्त्विक" },
  { id: "brahma-purana", name: "ब्रह्म पुराण", shlokas: "१०,०००", guna: "राजस" },
  { id: "garuda-purana", name: "गरुड़ पुराण", shlokas: "१९,०००", guna: "सात्त्विक" },
  { id: "brahmanda-purana", name: "ब्रह्माण्ड पुराण", shlokas: "१२,०००", guna: "राजस" },
  { id: "brahmavaivarta-purana", name: "ब्रह्मवैवर्त पुराण", shlokas: "१८,०००", guna: "राजस" },
  { id: "agni-purana", name: "अग्नि पुराण", shlokas: "१५,४००", guna: "राजस" },
  { id: "bhavishya-purana", name: "भविष्य पुराण", shlokas: "१४,५००", guna: "राजस" },
  { id: "varaha-purana", name: "वराह पुराण", shlokas: "२४,०००", guna: "सात्त्विक" },
  { id: "vamana-purana", name: "वामन पुराण", shlokas: "१०,०००", guna: "राजस" },
  { id: "kurma-purana", name: "कूर्म पुराण", shlokas: "१७,०००", guna: "तामस" },
  { id: "matsya-purana", name: "मत्स्य पुराण", shlokas: "१४,०००", guna: "तामस" },
  { id: "linga-purana", name: "लिंग पुराण", shlokas: "११,०००", guna: "तामस" },
  { id: "narada-purana", name: "नारद पुराण", shlokas: "२५,०००", guna: "सात्त्विक" },
  { id: "skanda-purana", name: "स्कन्द पुराण", shlokas: "८१,१००", guna: "तामस" },
];

const TAB_BANNERS = {
  purana: cardPuranaImg,
  ramayana: cardRamayanaImg,
  mahabharata: cardGitaImg,
  panchalakshana: bannerTempleGhat,
  taxonomy: cardPuranaImg,
  reader: cardRamayanaImg,
};

const READER_ITIHASAS_LIST = [
  { id: "bhagavad-gita", name: "श्रीमद्भगवद्गीता", shlokas: "७००", epic: "महाभारत भीष्मपर्व" },
  { id: "valmiki-ramayana", name: "वाल्मीकि रामायण", shlokas: "२४,०००", epic: "आदिकाव्य (७ काण्ड)" },
  { id: "mahabharata", name: "महाभारत", shlokas: "१,००,०००", epic: "पंचम वेद (१८ पर्व)" },
];

export default function PuranaItihasaPage({ onOpenSearch }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isHindi } = useLanguage();

  // Tab state: 'reader', 'taxonomy', 'purana', 'ramayana', 'mahabharata', 'panchalakshana'
  const initialTab = searchParams.get("tab") || "purana";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Reader state
  const initialSlug = searchParams.get("slug") || "shrimad-bhagavata";
  const [selectedReaderSlug, setSelectedReaderSlug] = useState(initialSlug);
  const [readerCategory, setReaderCategory] = useState(
    READER_ITIHASAS_LIST.some((i) => i.id === initialSlug) ? "itihasa" : "purana"
  );
  const [readerInitialChapterId, setReaderInitialChapterId] = useState(null);

  // Copy & Audio simulation
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

  const currentReaderScripture = useMemo(() => {
    return getScriptureReaderData(selectedReaderSlug);
  }, [selectedReaderSlug]);

  const handleSelectReaderText = (slug, chapterId = null) => {
    setSelectedReaderSlug(slug);
    setReaderInitialChapterId(chapterId);
    if (READER_ITIHASAS_LIST.some((i) => i.id === slug)) {
      setReaderCategory("itihasa");
    } else {
      setReaderCategory("purana");
    }
    setActiveTab("reader");
    setSearchParams({ tab: "reader", slug });
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [gunaFilter, setGunaFilter] = useState("all");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
    setSearchQuery("");
  };

  // Filtered Puranas
  const filteredPuranas = useMemo(() => {
    return MAHAPURANAS_DATA.filter((p) => {
      const matchGuna =
        gunaFilter === "all" ||
        (gunaFilter === "sattvika" && p.guna.includes("सात्त्विक")) ||
        (gunaFilter === "rajasa" && p.guna.includes("राजस")) ||
        (gunaFilter === "tamasa" && p.guna.includes("तामस"));

      if (!matchGuna) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        p.name.toLowerCase().includes(q) ||
        p.enName.toLowerCase().includes(q) ||
        p.presidingDeity.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.majorKhandas.some((k) => k.toLowerCase().includes(q)) ||
        p.keyNarratives.some((n) => n.toLowerCase().includes(q))
      );
    });
  }, [gunaFilter, searchQuery]);

  return (
    <div className="bg-white min-h-screen text-[#111111] pb-24">
      <SEO
        title={isHindi ? "पुराण एवं इतिहास" : "Purana & Itihasa"}
        description={isHindi ? "पुराण, रामायण, महाभारत और भारतीय ऐतिहासिक ग्रंथों का प्रामाणिक संग्रह।" : "Authentic collection of Puranas, Ramayana, Mahabharata, and Indian historical texts."}
        canonical="/library/purana-itihasa"
      />
      {/* 1. Scholarly Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#170e06] via-[#221308] to-[#120a04] text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 border-b border-amber-900/60 shadow-xl">
        {/* Sacred Entity-Matched Purana / Itihasa Banner with 80-85% Opacity and Luminous Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={TAB_BANNERS[activeTab] || bannerTempleGhat}
            alt="Vedic Temple Heritage"
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
              {isHindi ? "पुराण एवं इतिहास" : "Purana & Itihasa"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            {/* Left 7 Cols: Title & Shloka Banner */}
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFD21F] text-[#111111] border border-[#FFD21F] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>{isHindi ? "पुराण एवं इतिहास सागर" : "Purana & Itihasa Archive"}</span>
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
                {isHindi ? "पुराण एवं इतिहास" : "Purana & Itihasa"}
                <span className="block text-xl sm:text-2xl font-normal text-amber-200/95 mt-1 font-sans">
                  The Sacred Chronologies, Epics & Cosmic Histories
                </span>
              </h1>

              <p className="text-amber-100/90 text-sm sm:text-base font-devanagari leading-relaxed max-w-3xl drop-shadow-xs">
                {isHindi
                  ? "१८ महापुराण, वाल्मीकि रामायण, महाभारत एवं श्रीमद्भगवद्गीता — वेदों के अमूर्त ज्ञान को प्रत्यक्ष जीवन, आख्यान, अवतार लीला और धर्म की कसौटी पर कसने वाली भारत की सनातन ज्ञान परंपरा।"
                  : "18 Mahapuranas, Valmiki Ramayana, Mahabharata & Bhagavad Gita — the eternal Sanatana traditions embodying Vedic wisdom into living narratives, divine epics, and righteousness."}
              </p>

              {/* Classical Sanskrit Aphorism Banner with Audio & Copy */}
              <div className="mt-4 p-4 rounded-2xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#D9A441] text-[#111111] text-xs sm:text-sm font-devanagari leading-relaxed shadow-lg">
                <div className="flex items-center justify-between gap-3 pb-2 mb-2 border-b border-[#E5E5E5]">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                    {isHindi ? "पुराण-इतिहास प्रामाण्य श्लोक" : "Purana & Itihasa Epistemic Verse"}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleToggleSound("hero-itihasa-quote", e)}
                      title={isHindi ? "सस्वर पाठ" : "Recitation"}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                        playingId === "hero-itihasa-quote"
                          ? "bg-[#FFD21F] text-[#111111] shadow-xs animate-pulse font-bold"
                          : "bg-white hover:bg-stone-50 text-[#111111] border border-[#E5E5E5]"
                      }`}
                    >
                      {playingId === "hero-itihasa-quote" ? (
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
                          "hero-itihasa-quote",
                          `${ITIHASA_EPISTEMOLOGY.pramanaQuote}\n— ${ITIHASA_EPISTEMOLOGY.pramanaSource}: ${ITIHASA_EPISTEMOLOGY.pramanaMeaning}`,
                          e
                        )
                      }
                      title={isHindi ? "श्लोक कॉपी करें" : "Copy Verse"}
                      className="p-1.5 rounded-lg bg-white hover:bg-stone-50 text-[#111111] border border-[#E5E5E5] transition-colors cursor-pointer"
                    >
                      {copiedId === "hero-itihasa-quote" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-[#D9A441]" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="font-serif font-bold text-base sm:text-lg text-[#111111] leading-snug">
                  {ITIHASA_EPISTEMOLOGY.pramanaQuote}
                </p>
                <p className="text-[#555555] text-xs mt-1.5 font-sans">
                  — {ITIHASA_EPISTEMOLOGY.pramanaSource}: {ITIHASA_EPISTEMOLOGY.pramanaMeaning}
                </p>
              </div>
            </div>

            {/* Right 4 Cols: Featured Vignette & Metrics */}
            <div className="lg:col-span-4 space-y-4">
              {/* Preserved Royal Sacred Image Vignette */}
              <div className="bg-white/95 backdrop-blur-md border-2 border-amber-200/90 rounded-2xl p-3 shadow-lg overflow-hidden group">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-amber-300/60 shadow-inner">
                  <img
                    src={TAB_BANNERS[activeTab] || bannerTempleGhat}
                    alt="Sanatan Epics & Puranas"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/70 px-2 py-0.5 rounded backdrop-blur-xs">
                      {isHindi ? "सनातन ज्ञान-विरासत" : "Sanatana Heritage"}
                    </span>
                    <p className="font-serif text-xs font-semibold text-amber-100 mt-1 line-clamp-1">
                      {isHindi ? "वेदव्यास एवं वाल्मीकि विरचित महाग्रंथ" : "Epics composed by Vedavyasa & Valmiki"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Metrics Badge Box */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-2xl p-3.5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    १८
                  </div>
                  <div className="text-[11px] text-[#1E293B] font-bold uppercase tracking-wider">
                    {isHindi ? "महापुराण" : "Mahapuranas"}
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5 font-medium">
                    {isHindi ? "~४,००,००० श्लोक" : "~400,000 Verses"}
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-2xl p-3.5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    २४,०००
                  </div>
                  <div className="text-[11px] text-[#1E293B] font-bold uppercase tracking-wider">
                    {isHindi ? "रामायण श्लोक" : "Ramayana Verses"}
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5 font-medium">
                    {isHindi ? "७ काण्ड • ५०० सर्ग" : "7 Kandas • 500 Sargas"}
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-2xl p-3.5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    १,००,०००
                  </div>
                  <div className="text-[11px] text-[#1E293B] font-bold uppercase tracking-wider">
                    {isHindi ? "महाभारत श्लोक" : "Mahabharata Verses"}
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5 font-medium">
                    {isHindi ? "१८ पर्व + हरिवंश" : "18 Parvas + Harivamsa"}
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-2xl p-3.5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    ५
                  </div>
                  <div className="text-[11px] text-[#1E293B] font-bold uppercase tracking-wider">
                    {isHindi ? "पंच लक्षण" : "Pancha Lakshana"}
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5 font-medium">
                    {isHindi ? "सृष्टि व वंशावली" : "Cosmology & Dynasties"}
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
                label: "मूल श्लोक वाचन",
                en: "Scripture Reader",
                icon: BookOpen,
              },
              {
                id: "taxonomy",
                label: "गहन विभाजन व आख्यान",
                en: "Taxonomy & Jewels",
                icon: Layers,
              },
              {
                id: "purana",
                label: "१८ महापुराण",
                en: "18 Mahapuranas",
                icon: Crown,
              },
              {
                id: "ramayana",
                label: "वाल्मीकि रामायण",
                en: "Valmiki Ramayana",
                icon: Heart,
              },
              {
                id: "mahabharata",
                label: "महाभारत एवं गीता",
                en: "Mahabharata & Gita",
                icon: Shield,
              },
              {
                id: "panchalakshana",
                label: "लक्षण व उपपुराण",
                en: "Pancha Lakshana",
                icon: Compass,
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
        {/* TAB: SCRIPTURE READER VIEW */}
        {/* ========================================================================= */}
        {activeTab === "reader" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header / Selector Controls */}
            <div className="bg-white rounded-3xl border border-amber-200/70 p-6 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-amber-200/70">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-[#78350F] border border-amber-200/80 mb-2 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>AUTHENTIC SCRIPTURE READER • {isHindi ? "प्रामाणिक श्लोक वाचन" : "Original Verse Reader"}</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E293B]">
                    {currentReaderScripture?.label || (isHindi ? "पुराण एवं इतिहास मूल श्लोक पाठ" : "Purana & Itihasa Root Verses")}
                  </h2>
                  <p className="text-xs text-stone-600 font-devanagari mt-1">
                    {currentReaderScripture?.editionNote || (isHindi ? "गीताप्रेस गोरखपुर एवं बीओआरआई पुणे प्रामाणिक मूल पाठ" : "Gita Press Gorakhpur & BORI Pune authentic root text")}
                  </p>
                </div>

                {/* Category Switcher: Puranas vs Itihasas */}
                <div className="flex items-center bg-[#FBF9F5] p-1.5 rounded-2xl border border-amber-200/80 shadow-2xs gap-1.5 self-start md:self-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setReaderCategory("purana");
                      setSelectedReaderSlug("shrimad-bhagavata");
                      setReaderInitialChapterId(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      readerCategory === "purana"
                        ? "bg-gradient-to-r from-amber-700 to-amber-800 text-white shadow-xs font-bold"
                        : "text-stone-700 hover:text-[#78350F] hover:bg-white"
                    }`}
                  >
                    {isHindi ? `१८ महापुराण (${READER_PURANAS_LIST.length})` : `18 Mahapuranas (${READER_PURANAS_LIST.length})`}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setReaderCategory("itihasa");
                      setSelectedReaderSlug("bhagavad-gita");
                      setReaderInitialChapterId(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      readerCategory === "itihasa"
                        ? "bg-gradient-to-r from-amber-700 to-amber-800 text-white shadow-xs font-bold"
                        : "text-stone-700 hover:text-[#78350F] hover:bg-white"
                    }`}
                  >
                    {isHindi ? `इतिहास एवं महाकाव्य (${READER_ITIHASAS_LIST.length})` : `Epics & Itihasas (${READER_ITIHASAS_LIST.length})`}
                  </button>
                </div>
              </div>

              {/* Quick Pills Selector */}
              <div className="pt-4">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2 font-devanagari">
                  {readerCategory === "purana" ? (isHindi ? "महापुराण चुनें (Click to Read):" : "Select Mahapurana (Click to Read):") : (isHindi ? "इतिहास व आख्यान चुनें (Click to Read):" : "Select Epic & Narrative (Click to Read):")}
                </span>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {(readerCategory === "purana" ? READER_PURANAS_LIST : READER_ITIHASAS_LIST).map((item) => {
                    const isSelected = selectedReaderSlug === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedReaderSlug(item.id);
                          setReaderInitialChapterId(null);
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                          isSelected
                            ? "bg-gradient-to-r from-amber-700 to-amber-800 text-white border-amber-800 shadow-xs font-bold"
                            : "bg-[#FBF9F5] text-[#1E293B] border-amber-200/70 hover:bg-white hover:text-[#78350F] hover:-translate-y-0.5"
                        }`}
                      >
                        <span>{item.name}</span>
                        <span className="text-[10px] opacity-80 ml-1.5 font-normal">
                          ({item.shlokas})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Render Universal Scripture Reader */}
            {currentReaderScripture ? (
              <ScriptureReaderView
                scripture={currentReaderScripture}
                initialChapterId={readerInitialChapterId}
              />
            ) : (
              <div className="bg-white rounded-3xl border border-amber-200/70 p-8 text-center shadow-xs">
                <p className="text-stone-600 font-devanagari">{isHindi ? "चयनित ग्रंथ का विवरण उपलब्ध नहीं है।" : "Details not available for the selected scripture."}</p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: TAXONOMY VIEW */}
        {/* ========================================================================= */}
        {activeTab === "taxonomy" && (
          <div className="animate-fadeIn">
            <PuranaItihasaTaxonomyView onSelectReaderText={handleSelectReaderText} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 1: 18 MAHAPURANAS (BENTO-STYLE ARCHITECTURE) */}
        {/* ========================================================================= */}
        {activeTab === "purana" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header & Canonical Filter Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E5E5] shadow-xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#D9A441]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D9A441] font-devanagari">
                    {isHindi ? "पद्म पुराण • उत्तरखण्ड वर्गीकरण" : "Padma Purana • Uttara Khanda Classification"}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                  {isHindi ? "अष्टादश महापुराण" : "The 18 Mahapuranas"}
                </h2>
                <p className="text-xs text-[#555555] font-devanagari mt-1">
                  {isHindi ? "सात्त्विक, राजस एवं तामस त्रिगुणानुसार १८ महापुराणों का सुव्यवस्थित बेन्टो ग्रिड संग्रह" : "Systematic Bento grid collection of the 18 Mahapuranas according to Sattvika, Rajasa, and Tamasa gunas"}
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Canonical Guna Filter Chips */}
                <div className="flex items-center gap-1 bg-stone-50 p-1 rounded-xl border border-[#E5E5E5] text-xs">
                  {[
                    { id: "all", label: isHindi ? "सभी महापुराण (१८)" : "All Mahapuranas (18)" },
                    { id: "sattvika", label: isHindi ? "सात्त्विक (६)" : "Sattvika (6)" },
                    { id: "rajasa", label: isHindi ? "राजस (६)" : "Rajasa (6)" },
                    { id: "tamasa", label: isHindi ? "तामस (६)" : "Tamasa (6)" },
                  ].map((gf) => (
                    <button
                      key={gf.id}
                      onClick={() => setGunaFilter(gf.id)}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                        gunaFilter === gf.id
                          ? "bg-[#FFD21F] text-[#111111] font-bold shadow-2xs"
                          : "text-[#555555] hover:text-[#111111] hover:bg-white"
                      }`}
                    >
                      {gf.label}
                    </button>
                  ))}
                </div>

                {/* Text Search in Puranas */}
                <div className="relative min-w-[220px]">
                  <Search className="w-3.5 h-3.5 text-[#555555] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isHindi ? "पुराण, देवता या कथा खोजें..." : "Search Purana, deity or narrative..."}
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
            </div>

            {/* Bento Epistemology Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-[#E5E5E5] hover:border-[#D9A441] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 text-[#111111] font-bold text-sm mb-2">
                  <Crown className="w-4 h-4 text-[#D9A441]" />
                  <span>{isHindi ? "वैष्णव / सात्त्विक पुराण (विष्णु महिमा)" : "Vaishnava / Sattvika Puranas (Vishnu Glory)"}</span>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed font-devanagari">
                  {isHindi
                    ? "भागवत, विष्णु, पद्म, वराह, गरुड़ एवं नारद पुराण — भक्ति, अवतार-चरित्र, मोक्ष-मार्ग और चित्त-शुद्धि के सात्त्विक आयाम।"
                    : "Bhagavata, Vishnu, Padma, Varaha, Garuda & Narada Puranas — Sattvic paths of devotion, incarnations, and spiritual liberation."}
                </p>
              </div>
              <div className="bg-white border border-[#E5E5E5] hover:border-[#D9A441] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 text-[#111111] font-bold text-sm mb-2">
                  <Sparkles className="w-4 h-4 text-[#D9A441]" />
                  <span>{isHindi ? "ब्राह्म / राजस पुराण (सृष्टि व तीर्थ)" : "Brahma / Rajasa Puranas (Creation & Tirthas)"}</span>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed font-devanagari">
                  {isHindi
                    ? "ब्रह्म, ब्रह्माण्ड, ब्रह्मवैवर्त, मार्कण्डेय, भविष्य एवं वामन — सृष्टि-क्रम, मन्वन्तर, सूर्य व राजवंश तथा शक्ति महात्म्य।"
                    : "Brahma, Brahmanda, Brahmavaivarta, Markandeya, Bhavishya & Vamana — creation cycles, manvantaras, solar dynasties & Shakti wisdom."}
                </p>
              </div>
              <div className="bg-white border border-[#E5E5E5] hover:border-[#D9A441] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center gap-2 text-[#111111] font-bold text-sm mb-2">
                  <Flame className="w-4 h-4 text-[#C62828]" />
                  <span>{isHindi ? "शैव / तामस पुराण (लय व तपश्चर्या)" : "Shaiva / Tamasa Puranas (Dissolution & Austerities)"}</span>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed font-devanagari">
                  {isHindi
                    ? "शिव, लिंग, स्कन्द, अग्नि, मत्स्य एवं कूर्म — संहार, ज्योतिर्लिंग, योग-साधना, ज्ञान-तप एवं शिव-शक्ति का तात्विक रहस्य।"
                    : "Shiva, Linga, Skanda, Agni, Matsya & Kurma — dissolution, Jyotirlingas, yoga sadhana, esoteric wisdom of Shiva-Shakti."}
                </p>
              </div>
            </div>

            {/* 18 Mahapuranas Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPuranas.map((p, idx) => {
                const isSattvika = p.guna.includes("सात्त्विक");
                const isRajasa = p.guna.includes("राजस");
                const isFeaturedBhagavata = p.slug === "shrimad-bhagavata" && gunaFilter === "all" && !searchQuery;

                const canonicalBadge = isSattvika
                  ? "bg-[#D9A441]/10 text-[#111111] border-[#D9A441]/40"
                  : isRajasa
                  ? "bg-[#FFD21F]/20 text-[#111111] border-[#FFD21F]"
                  : "bg-[#C62828]/10 text-[#C62828] border-[#C62828]/30";

                return (
                  <div
                    key={p.id}
                    onClick={() => navigate(`/library/purana/${p.slug}`)}
                    className={`bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#D9A441] shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden cursor-pointer ${
                      isFeaturedBhagavata ? "md:col-span-2 lg:col-span-2 border-[#D9A441] ring-1 ring-[#D9A441]/30" : ""
                    }`}
                  >
                    {isFeaturedBhagavata && (
                      <div className="absolute top-0 right-0 bg-[#FFD21F] text-[#111111] text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-2xs">
                        {isHindi ? "मुकुटमणि महापुराण • विशेष" : "Crown Jewel Mahapurana • Featured"}
                      </div>
                    )}

                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-stone-50 text-[#111111] border border-[#E5E5E5]">
                          #{p.order}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${canonicalBadge}`}>
                            {p.guna}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-50 text-[#111111] border border-[#E5E5E5]">
                            {p.shlokas}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors">
                        {p.name}
                      </h3>
                      <div className="text-xs text-[#D9A441] font-semibold mt-0.5 font-sans">
                        {p.enName} {p.alternateName && `• ${p.alternateName}`}
                      </div>

                      {/* Presiding Deity */}
                      <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#555555] font-devanagari">
                        <Crown className="w-3.5 h-3.5 text-[#D9A441] flex-shrink-0" />
                        <span>
                          {isHindi ? "उपास्य देव:" : "Presiding Deity:"} <strong className="text-[#111111]">{p.presidingDeity}</strong>
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#555555] font-devanagari mt-2.5 leading-relaxed line-clamp-3">
                        {p.desc}
                      </p>

                      {/* Major Sections & Key Narratives */}
                      <div className="mt-4 pt-3 border-t border-[#E5E5E5] space-y-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#555555] block mb-1">
                            {isHindi ? "प्रमुख खण्ड / संहिता:" : "Major Khandas / Samhitas:"}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {p.majorKhandas.slice(0, isFeaturedBhagavata ? 5 : 3).map((kh, kidx) => (
                              <span
                                key={kidx}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-stone-50 border border-[#E5E5E5] text-[#111111] font-devanagari font-medium"
                              >
                                {kh}
                              </span>
                            ))}
                            {p.majorKhandas.length > (isFeaturedBhagavata ? 5 : 3) && (
                              <span className="text-[10px] px-1.5 py-0.5 text-[#555555] font-semibold">
                                +{p.majorKhandas.length - (isFeaturedBhagavata ? 5 : 3)}
                              </span>
                            )}
                          </div>
                        </div>

                        {p.keyNarratives && p.keyNarratives.length > 0 && (
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#555555] block mb-1">
                              {isHindi ? "मुख्य आख्यान:" : "Key Narratives:"}
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {p.keyNarratives.slice(0, 3).map((kn, knidx) => (
                                <span
                                  key={knidx}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#E5E5E5] text-[#555555] font-devanagari"
                                >
                                  {kn}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-5 pt-3.5 border-t border-[#E5E5E5] flex items-center justify-between gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/library/purana/${p.slug}`);
                        }}
                        className="text-xs font-bold text-[#555555] hover:text-[#111111] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Info className="w-3.5 h-3.5 text-[#D9A441]" />
                        <span>{isHindi ? "शास्त्रीय विवरण" : "Scholarly Details"}</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectReaderText(p.slug);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FFD21F] hover:bg-[#FFD21F]/90 text-[#111111] font-bold text-xs transition-colors cursor-pointer shadow-2xs border border-[#FFD21F] hover:border-[#D9A441]"
                          title={isHindi ? "मूल श्लोक एवं पाठ पढ़ें" : "Read Verses & Text"}
                        >
                          <BookOpen className="w-3 h-3 text-[#111111]" />
                          <span>{isHindi ? "श्लोक वाचन" : "Read Verses"}</span>
                        </button>

                        <Link
                          to={`/library/purana/${p.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white text-[#111111] hover:border-[#D9A441] border border-[#E5E5E5] font-bold text-xs transition-colors"
                          title={isHindi ? "विस्तृत अध्ययन करें" : "Explore Structure"}
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
        {/* TAB 2: VALMIKI RAMAYANA */}
        {/* ========================================================================= */}
        {activeTab === "ramayana" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Ramayana Overview Banner */}
            <div className="bg-white rounded-3xl border border-amber-200/70 shadow-xs p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-[#78350F] border border-amber-200/70">
                  <Heart className="w-3.5 h-3.5 text-amber-700" />
                  <span>{isHindi ? "आदिकाव्य • महर्षि वाल्मीकि विरचित" : "Adi Kavya • Composed by Maharshi Valmiki"}</span>
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#1E293B]">
                  {isHindi ? "श्रीमद्वाल्मीकि रामायण" : "Srimad Valmiki Ramayana"}
                </h2>
                <p className="text-sm text-stone-600 font-devanagari leading-relaxed">
                  {isHindi
                    ? "२४,००० पावन श्लोकों में निबद्ध यह महाकाव्य 'मर्यादा पुरुषोत्तम' भगवान श्रीराम के दिव्य चरित्र, सत्यनिष्ठा, भ्रातृ-प्रेम, धर्म-पालन और शरणागति का अमर आलोक है।"
                    : "Composed in 24,000 sacred verses, this epic depicts Maryada Purushottama Lord Rama's righteousness, truthful conduct, devotion, and compassion."}
                </p>

                {/* Gayatri Ramayana Connection Highlight with Copy */}
                <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-amber-200/80 text-xs font-devanagari text-[#1E293B]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <strong className="text-[#78350F] block">
                      {isHindi ? "गायत्री रामायण का पावन रहस्य:" : "Sacred Mystery of Gayatri Ramayana:"}
                    </strong>
                    <button
                      onClick={(e) =>
                        handleCopyVerse(
                          "gayatri-ramayana",
                          RAMAYANA_DATA.gayatriConnection,
                          e
                        )
                      }
                      title={isHindi ? "कॉपी करें" : "Copy"}
                      className="p-1 rounded bg-white hover:bg-amber-100 text-stone-600 border border-amber-200/60 transition-colors cursor-pointer"
                    >
                      {copiedId === "gayatri-ramayana" ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-amber-800" />
                      )}
                    </button>
                  </div>
                  <p className="text-stone-700">{RAMAYANA_DATA.gayatriConnection}</p>
                </div>
              </div>

              {/* Ramayana Metric Box & Direct Action */}
              <div className="flex sm:flex-col gap-3 w-full lg:w-auto">
                <div className="bg-[#FBF9F5] p-4 rounded-2xl border border-amber-200/80 text-center min-w-[140px] shadow-2xs">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    ७
                  </div>
                  <div className="text-xs font-bold text-[#1E293B]">
                    {isHindi ? "काण्ड (Books)" : "Kandas (Books)"}
                  </div>
                </div>
                <div className="bg-[#FBF9F5] p-4 rounded-2xl border border-amber-200/80 text-center min-w-[140px] shadow-2xs">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    ~५००
                  </div>
                  <div className="text-xs font-bold text-[#1E293B]">
                    {isHindi ? "सर्ग (Cantos)" : "Sargas (Cantos)"}
                  </div>
                </div>
                <Link
                  to="/library/itihasa/valmiki-ramayana"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-700 to-amber-800 text-white text-xs font-bold hover:from-amber-800 hover:to-amber-900 transition-colors shadow-2xs"
                >
                  <span>{isHindi ? "विस्तृत रामायण संरचना" : "Detailed Ramayana Structure"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 7 Kandas Interactive Journey */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1E293B] mb-4 flex items-center gap-2">
                <Scroll className="w-5 h-5 text-amber-700" />
                <span>{isHindi ? "रामायण के सात काण्ड (The 7 Kandas Journey)" : "The 7 Kandas of Ramayana"}</span>
              </h3>

              <div className="space-y-4">
                {RAMAYANA_DATA.kandas.map((kd) => (
                  <div
                    key={kd.id}
                    className="bg-white rounded-2xl border border-amber-200/70 hover:border-amber-400 p-5 sm:p-6 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-50 text-[#78350F] border border-amber-200/60">
                            {isHindi ? `काण्ड #${kd.order}` : `Kanda #${kd.order}`}
                          </span>
                          <span className="text-xs text-stone-500 font-semibold font-devanagari">
                            {kd.sargas} {isHindi ? "सर्ग" : "Sargas"} • {kd.shlokas.toLocaleString()} {isHindi ? "श्लोक" : "Verses"}
                          </span>
                        </div>
                        <h4 className="font-serif text-xl font-bold text-[#1E293B]">
                          {kd.name}{" "}
                          <span className="text-sm font-sans font-normal text-stone-500">
                            ({kd.enName})
                          </span>
                        </h4>
                        <p className="text-xs sm:text-sm text-stone-600 font-devanagari mt-1 leading-relaxed">
                          {kd.desc}
                        </p>
                      </div>

                      <div className="text-xs font-semibold text-[#78350F] bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/80 self-start lg:self-center whitespace-nowrap">
                        {isHindi ? "संदेश:" : "Message:"} {kd.centralMessage}
                      </div>
                    </div>

                    {/* Key Episodes List */}
                    <div className="mt-4 pt-3.5 border-t border-amber-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                        {isHindi ? "प्रमुख ऐतिहासिक घटनाक्रम एवं आख्यान:" : "Key Historical Episodes & Narratives:"}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {kd.keyEpisodes.map((ep, epIdx) => (
                          <div
                            key={epIdx}
                            className="text-xs text-stone-700 bg-[#FBF9F5] p-2.5 rounded-lg border border-amber-200/60 font-devanagari flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                            <span>{ep}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Kanda Card Action Footer */}
                    <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectReaderText("valmiki-ramayana")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-700 to-amber-800 text-white hover:from-amber-800 hover:to-amber-900 font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-200" />
                        <span>{isHindi ? "काण्ड श्लोक वाचन" : "Read Kanda Verses"}</span>
                      </button>
                      <Link
                        to="/library/itihasa/valmiki-ramayana"
                        className="text-xs font-bold text-[#78350F] hover:text-amber-950 flex items-center gap-1"
                      >
                        <span>{isHindi ? "संपूर्ण काण्ड विवरण" : "Complete Kanda Details"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: MAHABHARATA */}
        {/* ========================================================================= */}
        {activeTab === "mahabharata" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Mahabharata Overview Card */}
            <div className="bg-white rounded-3xl border border-amber-200/70 shadow-xs p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-[#78350F] border border-amber-200/70">
                  <Shield className="w-3.5 h-3.5 text-amber-700" />
                  <span>{isHindi ? "पञ्चम वेद • शतसाहस्री संहिता (१,००,००० श्लोक)" : "Fifth Veda • Shata-sahasri Samhita (100,000 Verses)"}</span>
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#1E293B]">
                  {isHindi ? "महाभारत एवं श्रीमद्भगवद्गीता" : "The Mahabharata & Srimad Bhagavad Gita"}
                </h2>
                <p className="text-sm text-stone-600 font-devanagari leading-relaxed">
                  {isHindi
                    ? "महर्षि वेदव्यास रचित एवं भगवान श्रीगणेश द्वारा लिपिबद्ध विश्व का सबसे विशाल महाकाव्य। धर्म, अर्थ, काम और मोक्ष—मानव जीवन का ऐसा कोई रहस्य नहीं जो महाभारत में समाहित न हो।"
                    : "Composed by Maharshi Vedavyasa and scribed by Lord Ganesha, the world's largest epic embodying Dharma, Artha, Kama, and Moksha."}
                </p>

                {/* Evolutionary Stages */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {MAHABHARATA_DATA.evolutionStages.map((stg, stgIdx) => (
                    <div
                      key={stgIdx}
                      className="px-3 py-1.5 rounded-xl bg-[#FBF9F5] border border-amber-200/70 text-xs font-devanagari text-[#1E293B]"
                    >
                      <strong className="text-[#78350F]">{stg.stage}</strong> ({stg.count}):{" "}
                      <span className="text-stone-600">{stg.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maxim Quote Box & Actions */}
              <div className="flex flex-col gap-3 w-full lg:w-auto min-w-[220px]">
                <div className="bg-[#FBF9F5] p-5 rounded-2xl border border-amber-200/80 text-xs font-devanagari text-[#1E293B] max-w-xs shadow-2xs">
                  <strong className="block text-[#78350F] mb-1 font-bold">
                    {isHindi ? "महाभारत का अमर उद्घोष:" : "Immortal Maxim of Mahabharata:"}
                  </strong>
                  "{MAHABHARATA_DATA.famousMaxim}"
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleSelectReaderText("bhagavad-gita")}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-white text-xs font-bold hover:from-amber-800 hover:to-amber-900 transition-colors shadow-2xs cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-200" />
                    <span>{isHindi ? "श्रीमद्भगवद्गीता (७०० श्लोक वाचन)" : "Bhagavad Gita (700 Verses Reader)"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectReaderText("mahabharata")}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-amber-200/80 text-[#78350F] hover:bg-amber-50 text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    <span>{isHindi ? "महाभारत मूल श्लोक वाचन" : "Mahabharata Root Verses Reader"}</span>
                  </button>
                  <Link
                    to="/library/itihasa/mahabharata"
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold hover:bg-stone-200 transition-colors"
                  >
                    <span>{isHindi ? "महाभारत १८ पर्व संरचना" : "Mahabharata 18 Parvas Structure"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* The 5 Philosophical Jewels Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1E293B]">
                    {isHindi ? "महाभारत के पाँच दार्शनिक रत्न (5 Philosophical Jewels)" : "5 Philosophical Jewels of Mahabharata"}
                  </h3>
                  <p className="text-xs text-stone-600 font-devanagari">
                    {isHindi ? "कुरुक्षेत्र के महायुद्ध के भीतर छुपे अध्यात्म, आत्मविद्या और नीति के अनमोल शिखर" : "Sublime pinnacles of spirituality, self-realization, and wisdom woven into the epic"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {MAHABHARATA_DATA.philosophicalJewels.map((j) => (
                  <div
                    key={j.id}
                    onClick={() => navigate(`/texts/${j.slug || j.id}`)}
                    className="bg-white rounded-2xl border border-amber-200/70 hover:border-amber-400 p-5 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-[#78350F] border border-amber-200/60">
                          {j.location}
                        </span>
                        <span className="text-[10px] text-stone-500 font-bold">
                          {j.size}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#1E293B] group-hover:text-amber-800 transition-colors">
                        {j.title}
                      </h4>
                      <p className="text-xs text-[#78350F] font-semibold mt-0.5">
                        {isHindi ? "वक्ता:" : "Speaker:"} {j.speaker}
                      </p>

                      <div className="mt-3.5 space-y-1.5 pt-3 border-t border-amber-100">
                        {j.coreTeachings.map((ct, ctIdx) => (
                          <div
                            key={ctIdx}
                            className="text-xs text-stone-700 font-devanagari flex items-start gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                            <span>{ct}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/texts/${j.slug || j.id}`);
                        }}
                        className="text-xs font-bold text-stone-600 hover:text-[#1E293B] flex items-center gap-1 cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 text-amber-700" />
                        <span>{isHindi ? "शास्त्रीय अध्ययन" : "Scholarly Study"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (j.id === "bhagavad-gita") handleSelectReaderText("bhagavad-gita");
                          else if (j.id === "vishnu-sahasranama") handleSelectReaderText("mahabharata", "mb-vishnu-sahasranama");
                          else if (j.id === "yaksha-prashna") handleSelectReaderText("mahabharata", "mb-yaksha-prashna");
                          else handleSelectReaderText("mahabharata");
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-700 to-amber-800 text-white hover:from-amber-800 hover:to-amber-900 font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                      >
                        <BookOpen className="w-3 h-3 text-amber-200" />
                        <span>{isHindi ? "मूल श्लोक" : "Root Verses"}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 18 Parvas Timeline List */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1E293B] mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-700" />
                <span>{isHindi ? "महाभारत के अठारह पर्व (The 18 Parvas Timeline)" : "The 18 Parvas of Mahabharata"}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MAHABHARATA_DATA.parvas.map((pv) => (
                  <div
                    key={pv.id}
                    className="p-4 rounded-xl bg-white border border-amber-200/70 hover:border-amber-400 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold text-[#78350F] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                        {isHindi ? `पर्व #${pv.order}` : `Parva #${pv.order}`}
                      </span>
                      <span className="text-[11px] text-stone-500 font-semibold font-devanagari">
                        {pv.adhyayas} {isHindi ? "अध्याय" : "Chapters"} • {pv.shlokas.toLocaleString()} {isHindi ? "श्लोक" : "Verses"}
                      </span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#1E293B]">
                      {pv.name}{" "}
                      <span className="text-xs font-sans font-normal text-stone-500">
                        ({pv.enName})
                      </span>
                    </h4>
                    <p className="text-xs text-stone-600 font-devanagari mt-1.5 leading-relaxed line-clamp-3">
                      {pv.desc}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        if (pv.id === "bhishma-parva") handleSelectReaderText("bhagavad-gita");
                        else if (pv.id === "vana-parva") handleSelectReaderText("mahabharata", "mb-yaksha-prashna");
                        else if (pv.id === "shanti-parva") handleSelectReaderText("mahabharata", "mb-shanti-parva");
                        else if (pv.id === "anushasana-parva") handleSelectReaderText("mahabharata", "mb-vishnu-sahasranama");
                        else handleSelectReaderText("mahabharata");
                      }}
                      className="mt-3 pt-2.5 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-[#78350F] hover:text-amber-950 cursor-pointer w-full"
                    >
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-amber-700" />
                        <span>{isHindi ? "पर्व श्लोक वाचन" : "Read Parva Verses"}</span>
                      </span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: PANCHA LAKSHANA & UPAPURANAS */}
        {/* ========================================================================= */}
        {activeTab === "panchalakshana" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Pancha Lakshana Definition Hero */}
            <div className="bg-white rounded-3xl border border-amber-200/70 shadow-xs p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#78350F] bg-amber-50 px-3 py-1 rounded-full border border-amber-200/70">
                CLASSICAL DEFINITION • पुराण पंचलक्षणम्
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1E293B] mt-2 mb-1">
                {isHindi ? "पुराण के पंच लक्षण" : "Five Characteristics of Puranas (Pancha Lakshana)"}
              </h2>
              <p className="text-xs text-stone-500 mb-4 font-serif italic">
                {PANCHA_LAKSHANA.source}
              </p>

              <div className="p-4 rounded-xl bg-[#FBF9F5] border border-amber-300/80 text-[#78350F] font-serif text-base sm:text-lg mb-4 flex items-center justify-between gap-3 flex-wrap">
                <span className="font-bold">"{PANCHA_LAKSHANA.sanskritVerse}"</span>
                <button
                  onClick={(e) =>
                    handleCopyVerse("pancha-lakshana-verse", PANCHA_LAKSHANA.sanskritVerse, e)
                  }
                  title={isHindi ? "श्लोक कॉपी करें" : "Copy Verse"}
                  className="p-1.5 rounded-lg bg-white hover:bg-amber-100 text-[#78350F] border border-amber-200/80 transition-colors cursor-pointer"
                >
                  {copiedId === "pancha-lakshana-verse" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-amber-800" />
                  )}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 font-devanagari leading-relaxed">
                {PANCHA_LAKSHANA.translation}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleTabChange("taxonomy")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-white font-bold text-xs hover:from-amber-800 hover:to-amber-900 transition-colors shadow-2xs cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-200" />
                  <span>{isHindi ? "दश लक्षण (भागवत १२.७) एवं संपूर्ण १८ उपपुराण विभाजन देखें" : "View 10 Lakshanas (Bhagavata 12.7) & 18 Upapuranas Divisions"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 5 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
                {PANCHA_LAKSHANA.characteristics.map((c, cIdx) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-[#FBF9F5] border border-amber-200/70 shadow-2xs hover:border-amber-400 hover:shadow-xs transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-100/70 text-[#78350F] font-bold flex items-center justify-center text-sm mb-2 border border-amber-200/60">
                      {cIdx + 1}
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#1E293B]">
                      {c.name}
                    </h3>
                    <p className="text-[11px] text-[#78350F] font-semibold mb-2">
                      {c.subtitle}
                    </p>
                    <p className="text-xs text-stone-600 font-devanagari leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 18 Upapuranas Section */}
            <div className="bg-white rounded-3xl border border-amber-200/70 shadow-xs p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1E293B]">
                    {isHindi ? "प्रमुख १८ उपपुराण (The 18 Upapuranas)" : "The 18 Upapuranas"}
                  </h3>
                  <p className="text-xs text-stone-600 font-devanagari">
                    {isHindi ? "कूर्म पुराण एवं बृहद्धर्म पुराण अनुसार विशिष्ट ऋषि व सम्प्रदाय परम्परा के ग्रंथ" : "Scriptures of specific lineages and traditions according to Kurma & Brihaddharma Puranas"}
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-[#78350F] border border-amber-200/70">
                  {isHindi ? "१८ उपलब्ध उपपुराण" : "18 Available Upapuranas"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {UPAPURANAS_DATA.map((up, upIdx) => (
                  <div
                    key={upIdx}
                    className="p-4 rounded-xl bg-[#FBF9F5] border border-amber-200/70 hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-serif text-sm font-bold text-[#1E293B]">
                        {up.name}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100/70 text-[#78350F] border border-amber-200/60">
                        {up.deity}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 font-devanagari leading-relaxed mt-1">
                      {up.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
