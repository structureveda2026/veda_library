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
  const [selectedPuranaModal, setSelectedPuranaModal] = useState(null);
  const [selectedJewelModal, setSelectedJewelModal] = useState(null);

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
    <div className="bg-[#FBF9F5] min-h-screen text-[#1E293B] pb-24">
      {/* 1. Scholarly Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#170e06] via-[#221308] to-[#120a04] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-900/60 shadow-xl">
        {/* Sacred Entity-Matched Purana / Itihasa Banner */}
        <div className="absolute inset-0 z-0">
          <img
            src={TAB_BANNERS[activeTab] || bannerTempleGhat}
            alt="Vedic Temple Heritage"
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
              पुराण एवं इतिहास
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            {/* Left 7 Cols: Title & Shloka Banner */}
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>PURANA & ITIHASA ARCHIVE • पुराण एवं इतिहास सागर</span>
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
                पुराण एवं इतिहास
                <span className="block text-xl sm:text-2xl font-normal text-amber-200/95 mt-1 font-sans">
                  The Sacred Chronologies, Epics & Cosmic Histories
                </span>
              </h1>

              <p className="text-amber-100/90 text-sm sm:text-base font-devanagari leading-relaxed max-w-3xl drop-shadow-xs">
                १८ महापुराण, वाल्मीकि रामायण, महाभारत एवं श्रीमद्भगवद्गीता — वेदों के अमूर्त ज्ञान को प्रत्यक्ष जीवन, आख्यान, अवतार लीला और धर्म की कसौटी पर कसने वाली भारत की सनातन ज्ञान परंपरा।
              </p>

              {/* Classical Sanskrit Aphorism Banner with Audio & Copy */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-amber-300/90 text-[#1E293B] text-xs sm:text-sm font-devanagari leading-relaxed shadow-lg">
                <div className="flex items-center justify-between gap-3 pb-2 mb-2 border-b border-amber-200/70">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#78350F]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    पुराण-इतिहास प्रामाण्य श्लोक
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleToggleSound("hero-itihasa-quote", e)}
                      title="सस्वर पाठ"
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                        playingId === "hero-itihasa-quote"
                          ? "bg-amber-700 text-white shadow-xs animate-pulse"
                          : "bg-amber-50 hover:bg-amber-100 text-[#78350F] border border-amber-300/70"
                      }`}
                    >
                      {playingId === "hero-itihasa-quote" ? (
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
                          "hero-itihasa-quote",
                          `${ITIHASA_EPISTEMOLOGY.pramanaQuote}\n— ${ITIHASA_EPISTEMOLOGY.pramanaSource}: ${ITIHASA_EPISTEMOLOGY.pramanaMeaning}`,
                          e
                        )
                      }
                      title="श्लोक कॉपी करें"
                      className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#78350F] border border-amber-300/70 transition-colors cursor-pointer"
                    >
                      {copiedId === "hero-itihasa-quote" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-amber-800" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="font-serif font-bold text-base sm:text-lg text-[#78350F] leading-snug">
                  {ITIHASA_EPISTEMOLOGY.pramanaQuote}
                </p>
                <p className="text-stone-600 text-xs mt-1.5 font-sans">
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
                      सनातन ज्ञान-विरासत
                    </span>
                    <p className="font-serif text-xs font-semibold text-amber-100 mt-1 line-clamp-1">
                      वेदव्यास एवं वाल्मीकि विरचित महाग्रंथ
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
                    महापुराण
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5 font-medium">
                    ~४,००,००० श्लोक
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-2xl p-3.5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    २४,०००
                  </div>
                  <div className="text-[11px] text-[#1E293B] font-bold uppercase tracking-wider">
                    रामायण श्लोक
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5 font-medium">
                    ७ काण्ड • ५०० सर्ग
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-2xl p-3.5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    १,००,०००
                  </div>
                  <div className="text-[11px] text-[#1E293B] font-bold uppercase tracking-wider">
                    महाभारत श्लोक
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5 font-medium">
                    १८ पर्व + हरिवंश
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-amber-200/90 rounded-2xl p-3.5 shadow-sm hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    ५
                  </div>
                  <div className="text-[11px] text-[#1E293B] font-bold uppercase tracking-wider">
                    पंच लक्षण
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5 font-medium">
                    सृष्टि व वंशावली
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
                    <span>AUTHENTIC SCRIPTURE READER • प्रामाणिक श्लोक वाचन</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E293B]">
                    {currentReaderScripture?.label || "पुराण एवं इतिहास मूल श्लोक पाठ"}
                  </h2>
                  <p className="text-xs text-stone-600 font-devanagari mt-1">
                    {currentReaderScripture?.editionNote || "गीताप्रेस गोरखपुर एवं बीओआरआई पुणे प्रामाणिक मूल पाठ"}
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
                    १८ महापुराण ({READER_PURANAS_LIST.length})
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
                    इतिहास एवं महाकाव्य ({READER_ITIHASAS_LIST.length})
                  </button>
                </div>
              </div>

              {/* Quick Pills Selector */}
              <div className="pt-4">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2 font-devanagari">
                  {readerCategory === "purana" ? "महापुराण चुनें (Click to Read):" : "इतिहास व आख्यान चुनें (Click to Read):"}
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
                <p className="text-stone-600 font-devanagari">चयनित ग्रंथ का विवरण उपलब्ध नहीं है।</p>
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
        {/* TAB 1: 18 MAHAPURANAS */}
        {/* ========================================================================= */}
        {activeTab === "purana" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header & Filter Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-amber-200/70 shadow-xs">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1E293B]">
                  अठारह महापुराण (The 18 Mahapuranas)
                </h2>
                <p className="text-xs text-stone-600 font-devanagari mt-1">
                  पद्म पुराण वर्गीकरण अनुसार सात्त्विक, राजस एवं तामस पुराणों का प्रामाणिक संग्रह
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Guna Filter Chips */}
                <div className="flex items-center gap-1 bg-[#FBF9F5] p-1 rounded-xl border border-amber-200/70 text-xs">
                  {[
                    { id: "all", label: "सभी (18)" },
                    {
                      id: "sattvika",
                      label: "सात्त्विक (6)",
                      color: "text-emerald-800",
                    },
                    {
                      id: "rajasa",
                      label: "राजस (6)",
                      color: "text-amber-800",
                    },
                    {
                      id: "tamasa",
                      label: "तामस (6)",
                      color: "text-indigo-800",
                    },
                  ].map((gf) => (
                    <button
                      key={gf.id}
                      onClick={() => setGunaFilter(gf.id)}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                        gunaFilter === gf.id
                          ? "bg-gradient-to-r from-amber-700 to-amber-800 text-white shadow-2xs font-bold"
                          : "text-stone-700 hover:text-[#1E293B] hover:bg-white"
                      }`}
                    >
                      {gf.label}
                    </button>
                  ))}
                </div>

                {/* Text Search in Puranas */}
                <div className="relative min-w-[220px]">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="पुराण, देवता या कथा खोजें..."
                    className="w-full pl-8 pr-7 py-1.5 rounded-xl text-xs bg-[#FBF9F5] border border-amber-200/80 focus:border-amber-500 focus:bg-white focus:outline-none placeholder:text-stone-400 font-devanagari text-[#1E293B]"
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
            </div>

            {/* Deep Research Overview Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-white border border-amber-200/70 rounded-2xl p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-2 text-[#78350F] font-bold text-sm mb-2">
                  <Crown className="w-4 h-4 text-amber-700" />
                  Cosmic Scope & Chronology
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-devanagari">
                  पुराण सृष्टि, समय चक्र (मन्वन्तर), देवता, वंशावली, तीर्थ, अवतार, जीवन-दर्शन और भक्ति-मार्ग को एक समग्र दृष्टि से प्रस्तुत करते हैं।
                </p>
              </div>
              <div className="bg-white border border-amber-200/70 rounded-2xl p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-2 text-[#78350F] font-bold text-sm mb-2">
                  <Flame className="w-4 h-4 text-amber-700" />
                  Moral Structure & Dharma
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-devanagari">
                  रामायण और महाभारत जीवन के विवेक, राजधर्म, परिवार, युद्ध, दंड, प्रेम, त्याग और मोक्ष के गहरे दार्शनिक आयाम खोलते हैं।
                </p>
              </div>
              <div className="bg-white border border-amber-200/70 rounded-2xl p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-2 text-[#78350F] font-bold text-sm mb-2">
                  <Heart className="w-4 h-4 text-amber-700" />
                  Living Sanatan Heritage
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-devanagari">
                  ये ग्रंथ सिर्फ कथाएँ नहीं हैं; वे संस्कृति, पूजा, नारी-पुरुष विवेक, सदाचार, भक्ति और सनातन धर्म की जीवन्त प्राणधारा हैं।
                </p>
              </div>
            </div>

            {/* Mahapuranas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPuranas.map((p) => {
                const isSattvika = p.guna.includes("सात्त्विक");
                const isRajasa = p.guna.includes("राजस");
                const badgeColor = isSattvika
                  ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                  : isRajasa
                    ? "bg-amber-50 text-amber-900 border-amber-200"
                    : "bg-indigo-50 text-indigo-900 border-indigo-200";

                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl border border-amber-200/70 hover:border-amber-400 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FBF9F5] text-stone-700 border border-amber-200/50">
                          #{p.order}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}`}
                          >
                            {p.guna}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-[#78350F] border border-amber-200/70">
                            {p.shlokas}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl font-bold text-[#1E293B] group-hover:text-[#78350F] transition-colors">
                        {p.name}
                      </h3>
                      <div className="text-xs text-[#78350F] font-semibold mt-0.5 font-sans">
                        {p.enName} {p.alternateName && `• ${p.alternateName}`}
                      </div>

                      {/* Presiding Deity */}
                      <div className="mt-2.5 flex items-center gap-1.5 text-xs text-stone-600 font-devanagari">
                        <Crown className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                        <span>
                          उपास्य देव: <strong>{p.presidingDeity}</strong>
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-stone-600 font-devanagari mt-2.5 leading-relaxed line-clamp-3">
                        {p.desc}
                      </p>

                      {/* Major Sections Chips */}
                      <div className="mt-4 pt-3 border-t border-amber-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                          प्रमुख खण्ड / अध्याय
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {p.majorKhandas.slice(0, 3).map((kh, kidx) => (
                            <span
                              key={kidx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-[#FBF9F5] border border-amber-200/70 text-[#78350F] font-devanagari font-semibold"
                            >
                              {kh}
                            </span>
                          ))}
                          {p.majorKhandas.length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 text-stone-400 font-bold">
                              +{p.majorKhandas.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-5 pt-3.5 border-t border-amber-100 flex items-center justify-between gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setSelectedPuranaModal(p)}
                        className="text-xs font-bold text-stone-600 hover:text-[#1E293B] flex items-center gap-1 cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 text-amber-700" />
                        <span>सारांश</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleSelectReaderText(p.slug)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-700 to-amber-800 text-white hover:from-amber-800 hover:to-amber-900 font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                          title="मूल श्लोक एवं अनुवाद पढ़ें"
                        >
                          <BookOpen className="w-3 h-3 text-amber-200" />
                          <span>श्लोक वाचन</span>
                        </button>

                        <Link
                          to={`/library/purana/${p.slug}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 text-[#78350F] hover:bg-amber-100 border border-amber-200/70 font-bold text-xs transition-colors"
                          title="विस्तृत अध्ययन करें"
                        >
                          <span>संरचना</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
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
                  <span>आदिकाव्य • महर्षि वाल्मीकि विरचित</span>
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#1E293B]">
                  श्रीमद्वाल्मीकि रामायण (Valmiki Ramayana)
                </h2>
                <p className="text-sm text-stone-600 font-devanagari leading-relaxed">
                  २४,००० पावन श्लोकों में निबद्ध यह महाकाव्य 'मर्यादा पुरुषोत्तम' भगवान श्रीराम के दिव्य चरित्र, सत्यनिष्ठा, भ्रातृ-प्रेम, धर्म-पालन और शरणागति का अमर आलोक है।
                </p>

                {/* Gayatri Ramayana Connection Highlight with Copy */}
                <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-amber-200/80 text-xs font-devanagari text-[#1E293B]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <strong className="text-[#78350F] block">
                      गायत्री रामायण का पावन रहस्य:
                    </strong>
                    <button
                      onClick={(e) =>
                        handleCopyVerse(
                          "gayatri-ramayana",
                          RAMAYANA_DATA.gayatriConnection,
                          e
                        )
                      }
                      title="कॉपी करें"
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
                    काण्ड (Books)
                  </div>
                </div>
                <div className="bg-[#FBF9F5] p-4 rounded-2xl border border-amber-200/80 text-center min-w-[140px] shadow-2xs">
                  <div className="font-serif text-2xl font-black text-[#78350F]">
                    ~५००
                  </div>
                  <div className="text-xs font-bold text-[#1E293B]">
                    सर्ग (Cantos)
                  </div>
                </div>
                <Link
                  to="/library/itihasa/valmiki-ramayana"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-700 to-amber-800 text-white text-xs font-bold hover:from-amber-800 hover:to-amber-900 transition-colors shadow-2xs"
                >
                  <span>विस्तृत रामायण संरचना</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 7 Kandas Interactive Journey */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1E293B] mb-4 flex items-center gap-2">
                <Scroll className="w-5 h-5 text-amber-700" />
                <span>रामायण के सात काण्ड (The 7 Kandas Journey)</span>
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
                            काण्ड #{kd.order}
                          </span>
                          <span className="text-xs text-stone-500 font-semibold font-devanagari">
                            {kd.sargas} सर्ग • {kd.shlokas.toLocaleString()} श्लोक
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
                        संदेश: {kd.centralMessage}
                      </div>
                    </div>

                    {/* Key Episodes List */}
                    <div className="mt-4 pt-3.5 border-t border-amber-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                        प्रमुख ऐतिहासिक घटनाक्रम एवं आख्यान:
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
                        <span>काण्ड श्लोक वाचन</span>
                      </button>
                      <Link
                        to="/library/itihasa/valmiki-ramayana"
                        className="text-xs font-bold text-[#78350F] hover:text-amber-950 flex items-center gap-1"
                      >
                        <span>संपूर्ण काण्ड विवरण</span>
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
                  <span>पञ्चम वेद • शतसाहस्री संहिता (१,००,००० श्लोक)</span>
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#1E293B]">
                  महाभारत एवं श्रीमद्भगवद्गीता (The Mahabharata & Gita)
                </h2>
                <p className="text-sm text-stone-600 font-devanagari leading-relaxed">
                  महर्षि वेदव्यास रचित एवं भगवान श्रीगणेश द्वारा लिपिबद्ध विश्व का सबसे विशाल महाकाव्य। धर्म, अर्थ, काम और मोक्ष—मानव जीवन का ऐसा कोई रहस्य नहीं जो महाभारत में समाहित न हो।
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
                    महाभारत का अमर उद्घोष:
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
                    <span>श्रीमद्भगवद्गीता (७०० श्लोक वाचन)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectReaderText("mahabharata")}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-amber-200/80 text-[#78350F] hover:bg-amber-50 text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    <span>महाभारत मूल श्लोक वाचन</span>
                  </button>
                  <Link
                    to="/library/itihasa/mahabharata"
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold hover:bg-stone-200 transition-colors"
                  >
                    <span>महाभारत १८ पर्व संरचना</span>
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
                    महाभारत के पाँच दार्शनिक रत्न (5 Philosophical Jewels)
                  </h3>
                  <p className="text-xs text-stone-600 font-devanagari">
                    कुरुक्षेत्र के महायुद्ध के भीतर छुपे अध्यात्म, आत्मविद्या और नीति के अनमोल शिखर
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {MAHABHARATA_DATA.philosophicalJewels.map((j) => (
                  <div
                    key={j.id}
                    className="bg-white rounded-2xl border border-amber-200/70 hover:border-amber-400 p-5 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
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
                      <h4 className="font-serif text-lg font-bold text-[#1E293B]">
                        {j.title}
                      </h4>
                      <p className="text-xs text-[#78350F] font-semibold mt-0.5">
                        वक्ता: {j.speaker}
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
                        onClick={() => setSelectedJewelModal(j)}
                        className="text-xs font-bold text-stone-600 hover:text-[#1E293B] flex items-center gap-1 cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 text-amber-700" />
                        <span>सारांश</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (j.id === "bhagavad-gita") handleSelectReaderText("bhagavad-gita");
                          else if (j.id === "vishnu-sahasranama") handleSelectReaderText("mahabharata", "mb-vishnu-sahasranama");
                          else if (j.id === "yaksha-prashna") handleSelectReaderText("mahabharata", "mb-yaksha-prashna");
                          else handleSelectReaderText("mahabharata");
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-700 to-amber-800 text-white hover:from-amber-800 hover:to-amber-900 font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                      >
                        <BookOpen className="w-3 h-3 text-amber-200" />
                        <span>मूल श्लोक</span>
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
                <span>महाभारत के अठारह पर्व (The 18 Parvas Timeline)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MAHABHARATA_DATA.parvas.map((pv) => (
                  <div
                    key={pv.id}
                    className="p-4 rounded-xl bg-white border border-amber-200/70 hover:border-amber-400 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold text-[#78350F] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                        पर्व #{pv.order}
                      </span>
                      <span className="text-[11px] text-stone-500 font-semibold font-devanagari">
                        {pv.adhyayas} अध्याय • {pv.shlokas.toLocaleString()} श्लोक
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
                        <span>पर्व श्लोक वाचन</span>
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
                पुराण के पंच लक्षण (Pancha Lakshana)
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
                  title="श्लोक कॉपी करें"
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
                  <span>दश लक्षण (भागवत १२.७) एवं संपूर्ण १८ उपपुराण विभाजन देखें</span>
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
                    प्रमुख १८ उपपुराण (The 18 Upapuranas)
                  </h3>
                  <p className="text-xs text-stone-600 font-devanagari">
                    कूर्म पुराण एवं बृहद्धर्म पुराण अनुसार विशिष्ट ऋषि व सम्प्रदाय परम्परा के ग्रंथ
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-[#78350F] border border-amber-200/70">
                  १८ उपलब्ध उपपुराण
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

      {/* ========================================================================= */}
      {/* MODAL: PURANA DEEP DETAILS MODAL */}
      {/* ========================================================================= */}
      {selectedPuranaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-amber-200/80 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-xs font-bold text-[#78350F] uppercase px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                  {selectedPuranaModal.guna} • {selectedPuranaModal.shlokas}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1E293B] mt-1">
                  {selectedPuranaModal.name} ({selectedPuranaModal.enName})
                </h3>
              </div>
              <button
                onClick={() => setSelectedPuranaModal(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs sm:text-sm font-devanagari">
              <div>
                <strong className="text-[#78350F] block mb-0.5">
                  उपास्य देव एवं स्वरूप:
                </strong>
                <p className="text-stone-700">
                  {selectedPuranaModal.presidingDeity}
                </p>
              </div>

              <div>
                <strong className="text-[#78350F] block mb-0.5">
                  संरचना एवं विभाजन:
                </strong>
                <p className="text-stone-700">
                  {selectedPuranaModal.structure}
                </p>
              </div>

              <div>
                <strong className="text-[#78350F] block mb-1">
                  प्रमुख आख्यान व ऐतिहासिक घटनाएँ:
                </strong>
                <ul className="list-disc pl-5 space-y-1 text-stone-700">
                  {selectedPuranaModal.keyNarratives.map((kn, idx) => (
                    <li key={idx}>{kn}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-[#78350F] block mb-1">
                  प्रसिद्ध स्तोत्र एवं मंत्र:
                </strong>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPuranaModal.famousStotras.map((fs, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-amber-50 text-[#78350F] font-semibold border border-amber-200/80"
                    >
                      {fs}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-amber-200/70">
                <strong className="text-[#78350F] block mb-0.5">
                  दार्शनिक संदेश:
                </strong>
                <p className="text-stone-700 leading-relaxed">
                  {selectedPuranaModal.philosophy}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <Link
                to={`/library/purana/${selectedPuranaModal.slug}`}
                onClick={() => setSelectedPuranaModal(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-white text-xs font-bold hover:from-amber-800 hover:to-amber-900 transition-colors shadow-2xs"
              >
                <span>विस्तृत ग्रंथ संरचना देखें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setSelectedPuranaModal(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold hover:bg-stone-200 transition-colors cursor-pointer"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PHILOSOPHICAL JEWEL MODAL */}
      {/* ========================================================================= */}
      {selectedJewelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-amber-200/80 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-xs font-bold text-[#78350F] uppercase px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                  {selectedJewelModal.location}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1E293B] mt-1">
                  {selectedJewelModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedJewelModal(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm font-devanagari">
              <p className="text-stone-700">
                <strong>वक्ता:</strong> {selectedJewelModal.speaker} •{" "}
                <strong>विस्तार:</strong> {selectedJewelModal.size}
              </p>

              <div>
                <strong className="text-[#78350F] block mb-1.5">
                  मूल उपदेश एवं सिद्धांत:
                </strong>
                <ul className="space-y-2">
                  {selectedJewelModal.coreTeachings.map((ct, idx) => (
                    <li
                      key={idx}
                      className="p-2.5 rounded-lg bg-[#FBF9F5] border border-amber-200/60 text-stone-800"
                    >
                      {ct}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-end">
              <button
                onClick={() => setSelectedJewelModal(null)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-white text-xs font-bold hover:from-amber-800 hover:to-amber-900 transition-colors cursor-pointer"
              >
                समझ लिया (Understood)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
