import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Share2,
  ArrowLeft,
  ArrowRight,
  Flame,
  Clock,
  Eye,
  Award,
  RotateCcw,
  Tag,
  Compass,
  Printer,
  ChevronRight,
} from "lucide-react";
import {
  MANTRAS_STOTRAS_LIST,
  getMantraBySlug,
} from "../data/mantraStotraData.js";
import { FALLBACK_BLOG_CATEGORIES, FALLBACK_BLOGS } from "../data/blogFallbackData.js";
import AstromantraSidebar from "../components/blog/AstromantraSidebar.jsx";
import deityShivaImg from "../assets/images/library/deities/deity-shiva.jpg";
import deityVishnuImg from "../assets/images/library/deities/deity-vishnu.jpg";
import deityDurgaImg from "../assets/images/library/deities/deity-durga.jpg";
import deityLakshmiImg from "../assets/images/library/deities/deity-lakshmi.jpg";
import deitySaraswatiImg from "../assets/images/library/deities/deity-saraswati.jpg";
import bannerAltar from "../assets/images/library/banners/banner-altar.png";

function resolveMantraBanner(mantra) {
  if (!mantra) return bannerAltar;
  const deity = `${mantra.deity?.en || ""} ${mantra.deity?.hi || ""}`.toLowerCase();
  const slug = (mantra.slug || "").toLowerCase();
  if (deity.includes("shiva") || deity.includes("शिव") || slug.includes("shiva") || slug.includes("mrityunjaya")) return deityShivaImg;
  if (deity.includes("vishnu") || deity.includes("विष्णु") || slug.includes("vishnu") || slug.includes("narayan")) return deityVishnuImg;
  if (deity.includes("lakshmi") || deity.includes("लक्ष्मी") || slug.includes("kanakadhara") || slug.includes("sukta")) return deityLakshmiImg;
  if (deity.includes("durga") || deity.includes("दुर्गा") || deity.includes("devi") || slug.includes("durga")) return deityDurgaImg;
  if (deity.includes("gayatri") || deity.includes("गायत्री") || deity.includes("saraswati") || slug.includes("gayatri")) return deitySaraswatiImg;
  return bannerAltar;
}

export default function MantraStotraDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [mantra, setMantra] = useState(null);
  const [loading, setLoading] = useState(true);

  // UI state
  const [fontSize, setFontSize] = useState("large"); // "normal", "large", "xlarge"
  const [langMode, setLangMode] = useState("both"); // "both", "hi", "en"
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Embedded Japa Counter
  const [japaCount, setJapaCount] = useState(0);
  const [malasDone, setMalasDone] = useState(0);
  const [justTapped, setJustTapped] = useState(false);

  useEffect(() => {
    setLoading(true);
    const found = getMantraBySlug(slug);
    setMantra(found);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const handleJapaTap = () => {
    setJustTapped(true);
    setTimeout(() => setJustTapped(false), 200);

    const next = japaCount + 1;
    if (next >= 108) {
      setJapaCount(0);
      setMalasDone((prev) => prev + 1);
    } else {
      setJapaCount(next);
    }
  };

  const handleCopyAll = () => {
    if (!mantra) return;
    const text = `${mantra.title.hi} (${mantra.title.en})\n\n${mantra.keyVerse.sanskrit}\n\nभावार्थ: ${mantra.keyVerse.meaningHi}\n\nMeaning: ${mantra.keyVerse.meaningEn}\n\nस्रोत: Veda Library`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mantra?.title.hi || "Vedic Mantra",
        text: mantra?.subtitle.hi || "Authentic Vedic Chanting",
        url: window.location.href,
      });
    } else {
      handleCopyAll();
    }
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 12000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffaf0] flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-3 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-sm font-bold text-amber-900">
            पावन मंत्र एवं स्तोत्र लोड हो रहा है...
          </p>
        </div>
      </div>
    );
  }

  if (!mantra) {
    return (
      <div className="min-h-screen bg-[#fffaf0] flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl border border-amber-200 p-8 text-center max-w-md space-y-4 shadow-sm">
          <BookOpen className="w-12 h-12 text-amber-600 mx-auto opacity-60" />
          <h2 className="font-serif text-xl font-bold text-stone-900">
            मंत्र या स्तोत्र नहीं मिला (Mantra Not Found)
          </h2>
          <p className="text-xs text-stone-600">
            संभवतः यह लिंक अमान्य है अथवा इसे किसी अन्य स्थान पर स्थानांतरित किया गया है।
          </p>
          <Link
            to="/library/mantra-stotra"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-700 text-white font-bold text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>समस्त मंत्र व स्तोत्र संग्रह देखें</span>
          </Link>
        </div>
      </div>
    );
  }

  const relatedMantras = MANTRAS_STOTRAS_LIST.filter(
    (m) => m.id !== mantra.id && (m.category === mantra.category || m.deity.en === mantra.deity.en)
  ).slice(0, 3);

  // Font size class mapping
  const verseFontClass =
    fontSize === "xlarge"
      ? "text-xl sm:text-2xl leading-loose"
      : fontSize === "large"
      ? "text-lg sm:text-xl leading-relaxed"
      : "text-base sm:text-lg leading-normal";

  return (
    <div className="bg-[#fffaf0] min-h-screen pb-20">
      {/* 1. Sacred Breadcrumb Navigation */}
      <div className="bg-[#fffdf8] border-b border-amber-200/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <nav className="flex items-center gap-2 text-stone-500 font-medium truncate">
            <Link
              to="/library"
              className="hover:text-amber-800 transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Library</span>
            </Link>
            <span>›</span>
            <Link
              to="/library/mantra-stotra"
              className="hover:text-amber-800 transition-colors cursor-pointer flex-shrink-0"
            >
              Mantra & Stotra
            </Link>
            <span>›</span>
            <span className="text-amber-900 font-bold truncate">
              {mantra.title.hi}
            </span>
          </nav>

          <Link
            to="/library/mantra-stotra"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>संग्रह सूची (Back to Hub)</span>
          </Link>
        </div>
      </div>

      {/* 2. Hero Title Section */}
      <section className="relative overflow-hidden bg-[#170e07] text-white border-b border-amber-900/60 pt-10 pb-12 px-4 sm:px-6 lg:px-8 shadow-xl">
        {/* Real Deity / Sacred Altar Banner Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={resolveMantraBanner(mantra)}
            alt={mantra.title.hi}
            className="w-full h-full object-cover object-center opacity-70 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140b05] via-[#1c1108]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#140b05]/85 via-transparent to-[#140b05]/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-[11px] uppercase tracking-wider backdrop-blur-sm shadow-2xs">
              {mantra.categoryLabel?.hi || mantra.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-200 font-semibold text-[11px] flex items-center gap-1 backdrop-blur-sm">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              {mantra.deity?.hi}
            </span>
            <span className="text-amber-300/40">•</span>
            <span className="text-amber-200/80 text-xs flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              {mantra.readTime}
            </span>
            <span className="text-amber-200/80 text-xs flex items-center gap-1">
              <Eye className="w-3 h-3 text-amber-400" />
              {mantra.viewsCount?.toLocaleString()} साधक
            </span>
          </div>

          {/* Titles */}
          <div>
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              {mantra.title.hi}
            </h1>
            <p className="font-sans text-base sm:text-lg font-medium text-amber-200 mt-2">
              {mantra.title.en}
            </p>
            <p className="text-xs sm:text-sm text-amber-100/90 max-w-3xl mt-2 leading-relaxed">
              {mantra.subtitle.hi}
            </p>
          </div>

          {/* Reading & Control Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-amber-700/50">
            {/* Font Size Controls */}
            <div className="flex items-center gap-2 text-xs text-amber-200/90">
              <span className="font-semibold text-amber-200">फॉन्ट आकार (Text Size):</span>
              <div className="inline-flex bg-white border border-amber-200 rounded-xl p-0.5 shadow-2xs">
                <button
                  onClick={() => setFontSize("normal")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    fontSize === "normal" ? "bg-amber-700 text-white" : "text-stone-700 hover:bg-amber-50"
                  }`}
                >
                  अ-
                </button>
                <button
                  onClick={() => setFontSize("large")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    fontSize === "large" ? "bg-amber-700 text-white" : "text-stone-700 hover:bg-amber-50"
                  }`}
                >
                  अ
                </button>
                <button
                  onClick={() => setFontSize("xlarge")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    fontSize === "xlarge" ? "bg-amber-700 text-white" : "text-stone-700 hover:bg-amber-50"
                  }`}
                >
                  अ+
                </button>
              </div>
            </div>

            {/* Language Mode Toggle */}
            <div className="flex items-center gap-1.5 bg-white border border-amber-200 rounded-xl p-0.5 text-xs shadow-2xs">
              <button
                onClick={() => setLangMode("both")}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  langMode === "both" ? "bg-amber-800 text-white" : "text-stone-700 hover:bg-amber-50"
                }`}
              >
                द्विभाषी (Both)
              </button>
              <button
                onClick={() => setLangMode("hi")}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  langMode === "hi" ? "bg-amber-800 text-white" : "text-stone-700 hover:bg-amber-50"
                }`}
              >
                हिन्दी केवल
              </button>
              <button
                onClick={() => setLangMode("en")}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  langMode === "en" ? "bg-amber-800 text-white" : "text-stone-700 hover:bg-amber-50"
                }`}
              >
                English Only
              </button>
            </div>

            {/* Quick Actions (Copy, Share, Audio) */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleAudio}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isPlayingAudio
                    ? "bg-amber-700 text-white shadow-xs animate-pulse"
                    : "bg-white border border-amber-200 text-stone-800 hover:bg-amber-50"
                }`}
              >
                {isPlayingAudio ? (
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
                onClick={handleCopyAll}
                className="px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-xs font-bold text-stone-800 hover:bg-amber-50 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">कॉपी हो गया!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-800" />
                    <span>कॉपी करें</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-white border border-amber-200 text-stone-700 hover:bg-amber-50 transition-colors cursor-pointer"
                title="Share Mantra"
              >
                <Share2 className="w-4 h-4 text-amber-800" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main 70/30 Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Main Content: 8 Columns */}
          <main className="lg:col-span-8 space-y-8">
            {/* 3.1: 6-Fold Vedic Canon (मन्त्र षडङ्ग विधान) Visual Table */}
            {mantra.canonAnga && (
              <section className="bg-white rounded-2xl border-2 border-amber-200/90 p-5 sm:p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-amber-200/70">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-xs">
                      ॐ
                    </span>
                    <div>
                      <h2 className="font-serif font-bold text-stone-900 text-base">
                        मंत्र षडङ्ग विधान (6-Fold Vedic Canon)
                      </h2>
                      <p className="text-[11px] text-stone-500 font-sans">
                        किसी भी वैदिक मंत्र की साधना से पूर्व षडंग विनियोग का स्मरण अनिवार्य है
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    षडङ्ग न्यास
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-[#fffdfa] to-amber-50/70 p-3.5 rounded-xl border border-amber-200/80">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block">
                      १. ऋषि (Sage / Revealer)
                    </span>
                    <strong className="font-devanagari text-sm font-bold text-stone-900 block mt-1">
                      {mantra.canonAnga.rishi?.hi}
                    </strong>
                    <span className="text-[10px] text-stone-500 font-sans">
                      {mantra.canonAnga.rishi?.en}
                    </span>
                  </div>

                  <div className="bg-gradient-to-br from-[#fffdfa] to-amber-50/70 p-3.5 rounded-xl border border-amber-200/80">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block">
                      २. छन्द (Metre / Rhythm)
                    </span>
                    <strong className="font-devanagari text-sm font-bold text-stone-900 block mt-1">
                      {mantra.canonAnga.chhandas?.hi}
                    </strong>
                    <span className="text-[10px] text-stone-500 font-sans">
                      {mantra.canonAnga.chhandas?.en}
                    </span>
                  </div>

                  <div className="bg-gradient-to-br from-[#fffdfa] to-amber-50/70 p-3.5 rounded-xl border border-amber-200/80">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block">
                      ३. देवता (Presiding Deity)
                    </span>
                    <strong className="font-devanagari text-sm font-bold text-stone-900 block mt-1">
                      {mantra.canonAnga.devata?.hi}
                    </strong>
                    <span className="text-[10px] text-stone-500 font-sans">
                      {mantra.canonAnga.devata?.en}
                    </span>
                  </div>

                  <div className="bg-gradient-to-br from-[#fffdfa] to-amber-50/70 p-3.5 rounded-xl border border-amber-200/80">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block">
                      ४. बीजम् (Sonic Seed)
                    </span>
                    <strong className="font-devanagari text-sm font-bold text-stone-900 block mt-1">
                      {mantra.canonAnga.beejam?.hi}
                    </strong>
                    <span className="text-[10px] text-stone-500 font-sans">
                      {mantra.canonAnga.beejam?.en}
                    </span>
                  </div>

                  <div className="bg-gradient-to-br from-[#fffdfa] to-amber-50/70 p-3.5 rounded-xl border border-amber-200/80">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block">
                      ५. शक्ति (Primal Energy)
                    </span>
                    <strong className="font-devanagari text-sm font-bold text-stone-900 block mt-1">
                      {mantra.canonAnga.shakti?.hi}
                    </strong>
                    <span className="text-[10px] text-stone-500 font-sans">
                      {mantra.canonAnga.shakti?.en}
                    </span>
                  </div>

                  <div className="bg-gradient-to-br from-[#fffdfa] to-amber-50/70 p-3.5 rounded-xl border border-amber-200/80">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block">
                      ६. कीलकम् (Auspicious Pin)
                    </span>
                    <strong className="font-devanagari text-sm font-bold text-stone-900 block mt-1">
                      {mantra.canonAnga.keelakam?.hi}
                    </strong>
                    <span className="text-[10px] text-stone-500 font-sans">
                      {mantra.canonAnga.keelakam?.en}
                    </span>
                  </div>
                </div>
              </section>
            )}

            {/* 3.2: Resonant Devanagari Altar Box (मूल श्लोक एवं पाठ) */}
            <section className="bg-gradient-to-br from-[#fffcf5] via-[#fdf6e9] to-[#faedd0] rounded-3xl border-3 border-amber-300/90 p-6 sm:p-8 shadow-md relative overflow-hidden">
              <div className="absolute top-2 right-3 text-7xl font-devanagari text-amber-900/5 select-none pointer-events-none">
                ॐ
              </div>

              {/* Altar Header */}
              <div className="text-center pb-6 border-b border-amber-300/60 space-y-1">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-800 text-amber-100 text-[11px] font-bold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>॥ ॐ श्री परमात्मने नमः ॥</span>
                </span>
                <h3 className="font-devanagari text-sm font-semibold text-amber-900 pt-1">
                  मूल वैदिक संहिता ऋचा एवं सस्वर उच्चारण
                </h3>
              </div>

              {/* Central Sanskrit Verse (Pure Authentic Devanagari) */}
              <div className="py-8 text-center space-y-4">
                <p className={`font-devanagari font-black text-amber-950 whitespace-pre-line tracking-wide drop-shadow-xs ${verseFontClass}`}>
                  {mantra.keyVerse.sanskrit}
                </p>
              </div>

              {/* Philosophical Meanings (Hindi & English) */}
              <div className="pt-6 border-t border-amber-300/60 space-y-4">
                {(langMode === "both" || langMode === "hi") && (
                  <div className="space-y-1 bg-white/80 rounded-2xl p-4 border border-amber-200/70">
                    <h4 className="font-devanagari font-bold text-amber-900 text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                      विस्तृत भावार्थ (Hindi Purport):
                    </h4>
                    <p className="font-devanagari text-xs sm:text-sm text-stone-800 leading-relaxed pt-1">
                      {mantra.keyVerse.meaningHi}
                    </p>
                  </div>
                )}

                {(langMode === "both" || langMode === "en") && (
                  <div className="space-y-1 bg-white/80 rounded-2xl p-4 border border-amber-200/70">
                    <h4 className="font-sans font-bold text-stone-900 text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                      English Philosophical Translation:
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed pt-1">
                      {mantra.keyVerse.meaningEn}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* 3.3: Interactive 108 Digital Japa Counter on Reading Page */}
            <section className="bg-gradient-to-r from-amber-900 via-amber-950 to-stone-950 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-bold text-amber-300">
                    ॐ
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-amber-100">
                      साधना जप काउंटर (Interactive Japa Mala)
                    </h3>
                    <p className="text-xs text-amber-300/80 font-sans">
                      मंत्र पाठ करते हुए यहाँ क्लिक करके १०८ जप की माला पूर्ण करें
                    </p>
                  </div>
                </div>

                {japaCount > 0 && (
                  <button
                    onClick={() => setJapaCount(0)}
                    className="self-start sm:self-auto px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-amber-200 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>रीसेट</span>
                  </button>
                )}
              </div>

              <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Count Display */}
                <div className="flex items-center gap-4">
                  <div className="text-center sm:text-left">
                    <span className={`text-4xl sm:text-5xl font-serif font-black text-amber-300 block transition-transform ${justTapped ? "scale-110 text-amber-100" : ""}`}>
                      {japaCount}
                    </span>
                    <span className="text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                      / 108 मंत्र जप
                    </span>
                  </div>

                  {malasDone > 0 && (
                    <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-300" />
                      <span>{malasDone} माला पूर्ण!</span>
                    </div>
                  )}
                </div>

                {/* Big Chant Button */}
                <button
                  onClick={handleJapaTap}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-serif font-bold text-sm sm:text-base shadow-lg shadow-amber-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>जप करें (+1 Chant)</span>
                </button>
              </div>
            </section>

            {/* 3.4: Sadhana Vidhi & Rules (साधना एवं जप विधान) */}
            {mantra.vidhi && (
              <section className="bg-white rounded-2xl border border-amber-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                  <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-700" />
                    <span>शास्त्रीय साधना विधान (Sadhana Vidhi & Rules)</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    शास्त्र सम्मत
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60">
                    <strong className="text-amber-950 font-bold block">१. शुभ मुहूर्त (Auspicious Timing):</strong>
                    <p className="text-stone-700 font-devanagari mt-0.5">{mantra.vidhi.muhurat?.hi}</p>
                    <p className="text-stone-500 font-sans text-[11px]">{mantra.vidhi.muhurat?.en}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60">
                    <strong className="text-amber-950 font-bold block">२. शुभ दिशा (Direction):</strong>
                    <p className="text-stone-700 font-devanagari mt-0.5">{mantra.vidhi.direction?.hi}</p>
                    <p className="text-stone-500 font-sans text-[11px]">{mantra.vidhi.direction?.en}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60">
                    <strong className="text-amber-950 font-bold block">३. पवित्र आसन (Sacred Asana):</strong>
                    <p className="text-stone-700 font-devanagari mt-0.5">{mantra.vidhi.asana?.hi}</p>
                    <p className="text-stone-500 font-sans text-[11px]">{mantra.vidhi.asana?.en}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60">
                    <strong className="text-amber-950 font-bold block">४. जप माला (Chanting Beads):</strong>
                    <p className="text-stone-700 font-devanagari mt-0.5">{mantra.vidhi.mala?.hi}</p>
                    <p className="text-stone-500 font-sans text-[11px]">{mantra.vidhi.mala?.en}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 sm:col-span-2">
                    <strong className="text-amber-950 font-bold block">५. अनुष्ठान जप संख्या (Prescribed Japa Count):</strong>
                    <p className="text-stone-700 font-devanagari mt-0.5">{mantra.vidhi.sankhya?.hi}</p>
                    <p className="text-stone-500 font-sans text-[11px]">{mantra.vidhi.sankhya?.en}</p>
                  </div>
                </div>
              </section>
            )}

            {/* 3.5: 4-Dimensional Falashruti (फलश्रुति एवं कल्याणकारी लाभ) */}
            {mantra.benefits && mantra.benefits.length > 0 && (
              <section className="bg-white rounded-2xl border border-amber-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                  <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-700" />
                    <span>फलश्रुति एवं आध्यात्मिक लाभ (Spiritual & Karmic Benefits)</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    फलश्रुति
                  </span>
                </div>

                <div className="space-y-3">
                  {mantra.benefits.map((b, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50/80 via-white to-amber-50/40 border border-amber-200/70 space-y-1"
                    >
                      <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-950">
                        {b.category?.hi || b.category?.en}
                      </span>
                      <p className="font-devanagari text-xs sm:text-sm text-stone-800 leading-relaxed font-semibold">
                        {b.text?.hi}
                      </p>
                      <p className="font-sans text-xs text-stone-600 leading-relaxed">
                        {b.text?.en}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3.6: Related Sacred Mantras & Stotras */}
            {relatedMantras.length > 0 && (
              <section className="space-y-4 pt-4 border-t border-amber-200/60">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    <span>संबंधित मंत्र एवं स्तोत्र (Related Chants)</span>
                  </h3>
                  <Link
                    to="/library/mantra-stotra"
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
                  >
                    <span>सम्पूर्ण संग्रह</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedMantras.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/library/mantra-stotra/${rel.slug}`}
                      className="group bg-white rounded-2xl border border-amber-200 p-4 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 inline-block">
                          {rel.deity?.hi}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-stone-900 group-hover:text-amber-800 line-clamp-2 leading-snug">
                          {rel.title.hi}
                        </h4>
                        <p className="text-[11px] text-stone-500 line-clamp-2">
                          {rel.subtitle.hi}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-[11px] text-amber-900 font-bold mt-3">
                        <span>पाठ करें</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* Right Column: 30-32% Astromantra Sidebar */}
          <aside className="lg:col-span-4 sticky top-20 space-y-6">
            <AstromantraSidebar
              categories={FALLBACK_BLOG_CATEGORIES}
              trendingArticles={FALLBACK_BLOGS}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
