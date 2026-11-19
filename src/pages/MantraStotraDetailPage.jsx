import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import SEO from "../components/common/SEO.jsx";
import {
  Home,
  BookOpen,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Copy,
  Check,
  CheckCircle2,
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
  Bell
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

// Trilingual Hinglish purports for global learners
const HINGLISH_GUIDES = {
  "maha-mrityunjaya-mantra": "Hum teeno lokon ke Swami, sugandhit aur sabhi jeevon ko divya poshan dene wale Bhagwan Shiv ki aradhana karte hain. Jis prakar paka hua phal bina kisi kasht ke daali se azaad ho jata hai, usi prakar Prabhu hume mrityu aur sansarik bandhanon se mukt karein, par amritatva (moksha) se kabhi alag na karein.",
  "gayatri-maha-mantra": "Hum us Param Prakashmay, sarvasreshtha aur paap-nashak Savita Dev (Parabrahma) ke divya tej ka dhyan karte hain. Veh Paramatma hamari buddhi aur antahkaran ko satya aur dharm ke kalyankari marg par prerit karein.",
  "shiva-tandava-stotram": "Jinki jatayon ke gahan van se pavitra Ganga ji ki tarangein pravahit hoti hain, jinke kantha mein vishal sarp haar ke saman shobhit hain, aur jo damru ki mangalkari dhwani par anandit hokar prachand tandav nritya karte hain, un Devo ke Dev Mahadev hum sabka kalyan karein.",
  "kanakadhara-stotram": "Jaise bhramarey kamal ke phoolon par anurag-poorvak mandrate hain, theek vaise hi Maa Mahalakshmi ki kripa-drishti Bhagwan Shri Hari par padti hai. Devi Lakshmi ki vahi mangaldmayee kripa hamare jeevan mein aakar samriddhi, shanti aur daridrata ka nash kare.",
  "purusha-suktam": "Us Anant Virat Purusha ke hazaron sheesh, hazaron aankhein aur hazaron charan hain. Veh samast brahmand ko sabhi dishaon se vyapt karke bhi usse das angul upar virajman hain. Jo kuch bhi atheet mein tha aur jo aane wale kaal mein hoga, sabhi us ekmatra Virat Purusha ka hi divya swaroop hai.",
  "aditya-hridaya-stotram": "Bhagwan Surya sabhi devataon ke atma hain, jo apne divya prakash se sampoorn jagat ko jeevan, chetana aur urja pradan karte hain. Maharshi Agastya dwara Shri Ram ko pradan kiya gaya yeh divya stotra sabhi shatruon par vijay aur antarik tej ka aashirvaad deta hai."
};

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
      gain.gain.setValueAtTime(0.001, now + delay);
      gain.gain.linearRampToValueAtTime(0.28, now + delay + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + duration);
    };

    if (count >= 108) {
      playTone(528, 0.0, 1.8);
      playTone(660, 0.15, 2.0);
      playTone(792, 0.3, 2.4);
    } else {
      playTone(freq, 0, 1.2);
    }
  } catch {
    // AudioContext not supported
  }
}

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
  const { isHindi, isEnglish } = useLanguage();
  const { slug } = useParams();
  const navigate = useNavigate();

  const [mantra, setMantra] = useState(null);
  const [loading, setLoading] = useState(true);

  // UI state
  const [fontSize, setFontSize] = useState("large"); // "normal", "large", "xlarge"
  const [langMode, setLangMode] = useState("both"); // "both", "hi", "en", "hinglish"
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Embedded Japa Counter
  const [japaCount, setJapaCount] = useState(0);
  const [japaTarget, setJapaTarget] = useState(108);
  const [japaSound, setJapaSound] = useState(true);
  const [malasDone, setMalasDone] = useState(0);
  const [justTapped, setJustTapped] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    setLoading(true);
    const found = getMantraBySlug(slug);
    setMantra(found);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  // Clean up speech synthesis on unmount or slug change
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [slug]);

  // Spacebar trigger for Japa Mala Chanting
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
        handleJapaTap();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [japaCount, japaTarget, japaSound]);

  const handleJapaTap = () => {
    setJustTapped(true);
    setTimeout(() => setJustTapped(false), 200);

    const next = japaCount + 1;
    if (japaSound) {
      playTempleChime(528, next >= japaTarget ? 108 : 1);
    }

    if (next >= japaTarget) {
      setJapaCount(0);
      setMalasDone((prev) => prev + 1);
      setToastMsg(`॥ ${japaTarget} जप संकल्प पूर्ण • ॐ तत्सत् ॥`);
      setTimeout(() => setToastMsg(""), 3500);
    } else {
      setJapaCount(next);
    }
  };

  const handleCopyAll = () => {
    if (!mantra) return;
    const hinglish = HINGLISH_GUIDES[mantra.slug] || mantra.keyVerse.meaningHi;
    const text = `${mantra.title.hi} (${mantra.title.en})\n\n${mantra.keyVerse.sanskrit}\n\nभावार्थ: ${mantra.keyVerse.meaningHi}\n\nEnglish: ${mantra.keyVerse.meaningEn}\n\nHinglish: ${hinglish}\n\nस्रोत: Veda Library`;
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

  // Authentic Web Speech API recitation
  const handleToggleAudio = () => {
    if (!window.speechSynthesis) {
      setToastMsg("आपके ब्राउज़र में स्पीच सिंथेसिस उपलब्ध नहीं है।");
      setTimeout(() => setToastMsg(""), 2500);
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = (mantra?.keyVerse?.sanskrit || "")
      .replace(/[\u0951\u0952\u1CDA]/g, "")
      .replace(/[।॥०-९0-9||\n]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.85;
    utterance.lang = "hi-IN";

    const voices = window.speechSynthesis.getVoices();
    const optimalVoice = voices.find(
      (v) => v.lang.startsWith("hi") || v.lang.startsWith("sa") || v.name.includes("India")
    );
    if (optimalVoice) {
      utterance.voice = optimalVoice;
    }

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-3 border-[#FFD21F] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-sm font-bold text-[#111111]">
            {isHindi ? "पावन मंत्र एवं स्तोत्र लोड हो रहा है..." : "Loading Sacred Mantra & Stotra..."}
          </p>
        </div>
      </div>
    );
  }

  if (!mantra) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-8 text-center max-w-md space-y-4 shadow-sm">
          <BookOpen className="w-12 h-12 text-[#D9A441] mx-auto opacity-60" />
          <h2 className="font-serif text-xl font-bold text-[#111111]">
            {isHindi ? "मंत्र या स्तोत्र नहीं मिला" : "Mantra Not Found"}
          </h2>
          <p className="text-xs text-[#555555]">
            {isHindi
              ? "संभवतः यह लिंक अमान्य है अथवा इसे किसी अन्य स्थान पर स्थानांतरित किया गया है।"
              : "This link may be invalid or the mantra may have been moved."}
          </p>
          <Link
            to="/library/mantra-stotra"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-bold text-xs shadow-xs cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isHindi ? "समस्त मंत्र व स्तोत्र संग्रह देखें" : "View All Mantras & Stotras"}</span>
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

  const seoTitle = `${mantra.title.hi} (${mantra.title.en}) — पाठ, अन्वय एवं विधि | Veda Library`;
  const seoDescription = `${mantra.title.hi} का संपूर्ण शुद्ध पाठ, देवता: ${mantra.deity?.hi || "भगवान"}, अर्थ, विधि, विनियोग एवं फलश्रुति।`;
  const canonicalUrl = `/stotram/${mantra.slug}`;

  const jsonLdSchema = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "होम (Home)",
          item: "https://library.vedastructure.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "मंत्र व स्तोत्र (Mantra & Stotra)",
          item: "https://library.vedastructure.com/stotram/all",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: mantra.title.hi,
          item: `https://library.vedastructure.com${canonicalUrl}`,
        },
      ],
    },
    {
      "@type": "CreativeWork",
      name: mantra.title.hi,
      alternateName: mantra.title.en,
      description: seoDescription,
      inLanguage: ["sa", "hi", "en"],
      genre: "Stotram / Mantra",
      url: `https://library.vedastructure.com${canonicalUrl}`,
      about: {
        "@type": "Thing",
        name: mantra.deity?.hi || "वैदिक देवता",
      },
      publisher: {
        "@type": "Organization",
        name: "Veda Library",
        url: "https://library.vedastructure.com/",
      },
    },
    {
      "@type": "ItemPage",
      name: seoTitle,
      url: `https://library.vedastructure.com${canonicalUrl}`,
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        schema={jsonLdSchema}
      />
      {/* 1. Sacred Breadcrumb Navigation */}
      <div className="bg-white border-b border-[#E5E5E5] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <nav className="flex items-center gap-2 text-[#555555] font-medium truncate">
            <Link
              to="/library"
              className="hover:text-[#D9A441] transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{isHindi ? "होम" : "Home"}</span>
            </Link>
            <span>›</span>
            <Link
              to="/library/mantra-stotra"
              className="hover:text-[#D9A441] transition-colors cursor-pointer flex-shrink-0"
            >
              {isHindi ? "मंत्र व स्तोत्र" : "Mantra & Stotra"}
            </Link>
            <span>›</span>
            <span className="text-[#111111] font-bold truncate">
              {isHindi ? mantra.title.hi : (mantra.title.en || mantra.title.hi)}
            </span>
          </nav>

          <Link
            to="/library/mantra-stotra"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] hover:text-[#D9A441] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isHindi ? "संग्रह सूची" : "Back to Hub"}</span>
          </Link>
        </div>
      </div>

      {/* 2. Hero Title Section */}
      <section className="relative overflow-hidden bg-[#170e07] text-white border-b border-amber-900/60 pt-10 pb-12 px-4 sm:px-6 lg:px-8 shadow-xl">
        {/* Real Deity / Sacred Altar Banner Image with 80-85% Opacity and Luminous Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={resolveMantraBanner(mantra)}
            alt={mantra.title.hi}
            className="w-full h-full object-cover object-center opacity-80 sm:opacity-85 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140b05] via-[#1c1108]/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-[#140b05]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#FFD21F] text-[#111111] font-bold text-[11px] uppercase tracking-wider shadow-xs">
              {isHindi ? (mantra.categoryLabel?.hi || mantra.category) : (mantra.categoryLabel?.en || mantra.categoryLabel?.hi || mantra.category)}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#C62828] text-white font-bold text-[11px] flex items-center gap-1 shadow-xs">
              <Flame className="w-3.5 h-3.5 text-white" />
              {isHindi ? (mantra.deity?.hi || mantra.deity?.en) : (mantra.deity?.en || mantra.deity?.hi)}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-amber-200/90 text-xs flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#FFD21F]" />
              {mantra.readTime}
            </span>
            <span className="text-amber-200/90 text-xs flex items-center gap-1">
              <Eye className="w-3 h-3 text-[#FFD21F]" />
              {mantra.viewsCount?.toLocaleString()} {isHindi ? "साधक" : "practitioners"}
            </span>
          </div>

          {/* Titles */}
          <div>
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              {isHindi ? mantra.title.hi : (mantra.title.en || mantra.title.hi)}
            </h1>
            <p className="font-sans text-base sm:text-lg font-medium text-amber-200 mt-2">
              {isHindi ? mantra.title.en : mantra.title.hi}
            </p>
            <p className="text-xs sm:text-sm text-amber-100/90 max-w-3xl mt-2 leading-relaxed">
              {isHindi ? mantra.subtitle.hi : (mantra.subtitle.en || mantra.subtitle.hi)}
            </p>
          </div>

          {/* Reading & Control Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/20">
            {/* Font Size Controls */}
            <div className="flex items-center gap-2 text-xs text-white/90">
              <span className="font-semibold text-white">{isHindi ? "फॉन्ट (Text Size):" : "Font Size:"}</span>
              <div className="inline-flex bg-white border border-[#E5E5E5] rounded-xl p-0.5 shadow-2xs">
                {[
                  { id: "normal", label: "A-" },
                  { id: "large", label: "A" },
                  { id: "xlarge", label: "A+" }
                ].map((sz) => (
                  <button
                    key={sz.id}
                    onClick={() => setFontSize(sz.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      fontSize === sz.id ? "bg-[#FFD21F] text-[#111111]" : "text-[#555555] hover:bg-stone-50"
                    }`}
                  >
                    {sz.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Mode Toggle: 3 Mandatory Languages */}
            <div className="flex items-center gap-1.5 bg-white border border-[#E5E5E5] rounded-xl p-0.5 text-xs shadow-2xs">
              {[
                { id: "both", label: isHindi ? "त्रिविध (All)" : "All Views" },
                { id: "hi", label: isHindi ? "हिन्दी" : "Hindi" },
                { id: "en", label: "English" },
                { id: "hinglish", label: isHindi ? "सरल हिंग्लिश" : "Hinglish" }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setLangMode(opt.id)}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    langMode === opt.id ? "bg-[#FFD21F] text-[#111111]" : "text-[#555555] hover:bg-stone-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Quick Actions (Copy, Share, Audio) */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleAudio}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isPlayingAudio
                    ? "bg-[#FFD21F] text-[#111111] shadow-xs animate-pulse"
                    : "bg-white border border-[#E5E5E5] text-[#111111] hover:bg-stone-50"
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>{isHindi ? "ध्वनि तरंग..." : "Playing..."}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>{isHindi ? "सस्वर पाठ" : "Audio Chanting"}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyAll}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#E5E5E5] text-xs font-bold text-[#111111] hover:bg-stone-50 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">{isHindi ? "कॉपी हो गया!" : "Copied!"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>{isHindi ? "कॉपी करें" : "Copy"}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-white border border-[#E5E5E5] text-[#111111] hover:bg-stone-50 transition-colors cursor-pointer"
                title={isHindi ? "मंत्र साझा करें" : "Share Mantra"}
              >
                <Share2 className="w-4 h-4 text-[#D9A441]" />
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
              <section className="bg-white rounded-2xl border border-[#E5E5E5] p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#FFD21F] text-[#111111] flex items-center justify-center font-bold text-xs">
                      ॐ
                    </span>
                    <div>
                      <h2 className="font-serif font-bold text-[#111111] text-base">
                        {isHindi ? "मंत्र षडङ्ग विधान" : "6-Fold Vedic Canon (Shadanga Vidhana)"}
                      </h2>
                      <p className="text-[11px] text-[#555555] font-sans">
                        {isHindi
                          ? "किसी भी वैदिक मंत्र की साधना से पूर्व षडंग विनियोग का स्मरण अनिवार्य है"
                          : "Remembering the 6-Fold Vedic Canon is essential prior to mantra practice"}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFD21F] text-[#111111]">
                    {isHindi ? "षडङ्ग न्यास" : "Shadanga Nyasa"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-[#E5E5E5] border-t-2 border-t-[#D9A441] shadow-2xs">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D9A441] block">
                      {isHindi ? "१. ऋषि (Sage / Revealer)" : "1. Sage (Rishi)"}
                    </span>
                    <strong className="font-devanagari text-sm font-bold text-[#111111] block mt-1">
                      {isHindi ? mantra.canonAnga.rishi?.hi : (mantra.canonAnga.rishi?.en || mantra.canonAnga.rishi?.hi)}
                    </strong>
                    <span className="text-[10px] text-[#555555] font-sans">
                      {isHindi ? mantra.canonAnga.rishi?.en : mantra.canonAnga.rishi?.hi}
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-[#E5E5E5] border-t-2 border-t-[#FFD21F] shadow-2xs">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#555555] block">
                      {isHindi ? "२. छन्द (Metre / Rhythm)" : "2. Metre (Chhandas)"}
                    </span>
                    <strong className="font-devanagari text-sm font-bold text-[#111111] block mt-1">
                      {isHindi ? mantra.canonAnga.chhandas?.hi : (mantra.canonAnga.chhandas?.en || mantra.canonAnga.chhandas?.hi)}
                    </strong>
                    <span className="text-[10px] text-[#555555] font-sans">
                      {isHindi ? mantra.canonAnga.chhandas?.en : mantra.canonAnga.chhandas?.hi}
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-[#E5E5E5] border-t-2 border-t-[#D9A441] shadow-2xs">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D9A441] block">
                      {isHindi ? "३. देवता (Presiding Deity)" : "3. Deity (Devata)"}
                    </span>
                    <strong className="font-devanagari text-sm font-bold text-[#111111] block mt-1">
                      {isHindi ? mantra.canonAnga.devata?.hi : (mantra.canonAnga.devata?.en || mantra.canonAnga.devata?.hi)}
                    </strong>
                    <span className="text-[10px] text-[#555555] font-sans">
                      {isHindi ? mantra.canonAnga.devata?.en : mantra.canonAnga.devata?.hi}
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-[#E5E5E5] border-t-2 border-t-[#FFD21F] shadow-2xs">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#555555] block">
                      {isHindi ? "४. बीजम् (Sonic Seed)" : "4. Sonic Seed (Beejam)"}
                    </span>
                    <strong className="font-devanagari text-sm font-bold text-[#111111] block mt-1">
                      {isHindi ? mantra.canonAnga.beejam?.hi : (mantra.canonAnga.beejam?.en || mantra.canonAnga.beejam?.hi)}
                    </strong>
                    <span className="text-[10px] text-[#555555] font-sans">
                      {isHindi ? mantra.canonAnga.beejam?.en : mantra.canonAnga.beejam?.hi}
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-[#E5E5E5] border-t-2 border-t-[#D9A441] shadow-2xs">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D9A441] block">
                      {isHindi ? "५. शक्ति (Primal Energy)" : "5. Primal Energy (Shakti)"}
                    </span>
                    <strong className="font-devanagari text-sm font-bold text-[#111111] block mt-1">
                      {isHindi ? mantra.canonAnga.shakti?.hi : (mantra.canonAnga.shakti?.en || mantra.canonAnga.shakti?.hi)}
                    </strong>
                    <span className="text-[10px] text-[#555555] font-sans">
                      {isHindi ? mantra.canonAnga.shakti?.en : mantra.canonAnga.shakti?.hi}
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-[#E5E5E5] border-t-2 border-t-[#FFD21F] shadow-2xs">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#555555] block">
                      {isHindi ? "६. कीलकम् (Auspicious Pin)" : "6. Auspicious Pin (Keelakam)"}
                    </span>
                    <strong className="font-devanagari text-sm font-bold text-[#111111] block mt-1">
                      {isHindi ? mantra.canonAnga.keelakam?.hi : (mantra.canonAnga.keelakam?.en || mantra.canonAnga.keelakam?.hi)}
                    </strong>
                    <span className="text-[10px] text-[#555555] font-sans">
                      {isHindi ? mantra.canonAnga.keelakam?.en : mantra.canonAnga.keelakam?.hi}
                    </span>
                  </div>
                </div>
              </section>
            )}

            {/* 3.2: Resonant Devanagari Altar Box (मूल श्लोक एवं पाठ) */}
            <section className="bg-white rounded-2xl border border-[#E5E5E5] border-t-4 border-t-[#D9A441] border-l-4 border-l-[#D9A441] p-6 sm:p-8 shadow-xs relative overflow-hidden">
              <div className="absolute top-2 right-3 text-7xl font-devanagari text-black/5 select-none pointer-events-none">
                ॐ
              </div>

              {/* Altar Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F] text-[#111111] text-[11px] font-bold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>॥ ॐ श्री परमात्मने नमः ॥</span>
                </span>
                <span className="text-xs font-serif font-bold text-[#D9A441] select-none">
                  ॥ ॐ ॥
                </span>
              </div>

              {/* Central Sanskrit Verse (Pure Authentic Devanagari) */}
              <div className="py-8 text-center space-y-3">
                <div className="font-devanagari font-bold text-[#111111] tracking-wide select-text leading-[1.8] font-serif">
                  {(mantra.keyVerse.sanskrit || "").split("\n").map((line, lIdx) => (
                    <div key={lIdx} className={`${verseFontClass} my-1.5`}>
                      {line.split(/([।॥])/).map((seg, sIdx) => {
                        if (seg === "।" || seg === "॥") {
                          return (
                            <span key={sIdx} className="text-[#D9A441] font-bold px-1 select-none">
                              {seg}
                            </span>
                          );
                        }
                        return <span key={sIdx}>{seg}</span>;
                      })}
                    </div>
                  ))}
                </div>

                <div className="text-center text-[#D9A441] text-sm font-serif select-none pt-2 font-bold">
                  ॥ इति ॥
                </div>
              </div>

              {/* Trilingual Purports (Hindi, English, Hinglish) */}
              <div className="pt-6 border-t border-[#E5E5E5] space-y-4">
                {(langMode === "both" || langMode === "hi") && (
                  <div className="space-y-1.5 bg-stone-50 rounded-xl p-4 border border-[#E5E5E5]">
                    <h4 className="font-devanagari font-bold text-[#111111] text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FFD21F]" />
                      <span>{isHindi ? "विस्तृत हिन्दी भावार्थ (Hindi Purport):" : "Hindi Purport:"}</span>
                    </h4>
                    <p className="font-devanagari text-xs sm:text-sm text-[#111111] leading-relaxed pt-1">
                      {mantra.keyVerse.meaningHi}
                    </p>
                  </div>
                )}

                {(langMode === "both" || langMode === "en") && (
                  <div className="space-y-1.5 bg-stone-50 rounded-xl p-4 border border-[#E5E5E5]">
                    <h4 className="font-sans font-bold text-[#111111] text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#D9A441]" />
                      <span>{isHindi ? "अंग्रेजी अनुवाद (English Philosophical Translation):" : "English Philosophical Translation:"}</span>
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#555555] leading-relaxed pt-1">
                      {mantra.keyVerse.meaningEn}
                    </p>
                  </div>
                )}

                {(langMode === "both" || langMode === "hinglish") && (
                  <div className="space-y-1.5 bg-stone-50 rounded-xl p-4 border border-[#E5E5E5]">
                    <h4 className="font-sans font-bold text-[#111111] text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#C62828]" />
                      <span>{isHindi ? "सरल हिंग्लिश व्याख्या (Youth & Global Learner Guide):" : "Hinglish Guide (Youth & Global Learners):"}</span>
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#111111] leading-relaxed pt-1 font-medium">
                      {HINGLISH_GUIDES[mantra.slug] || mantra.keyVerse.meaningHi}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* 3.25: Comprehensive Source & Bibliographic Reference Card */}
            <section className="bg-white rounded-2xl border border-[#E5E5E5] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#D9A441]" />
                  <h3 className="font-serif font-bold text-[#111111] text-base">
                    {isHindi ? "स्रोत, संस्करण एवं संदर्भ विवरण" : "Source & Bibliographic Reference"}
                  </h3>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[#111111] border border-[#FFD21F]">
                  {isHindi ? "प्रामाणिक श्रुति / स्मृति" : "Authentic Shruti / Smriti"}
                </span>
              </div>

              <div className="border border-[#E5E5E5] rounded-xl overflow-hidden shadow-2xs bg-white">
                <table className="w-full text-xs font-devanagari divide-y divide-[#E5E5E5]">
                  <tbody className="divide-y divide-[#E5E5E5]">
                    <tr className="bg-[#F9F9F9]">
                      <td className="px-3.5 py-2.5 font-bold text-[#555555] w-1/3 shrink-0">{isHindi ? "मूल ग्रंथ / संहिता" : "Scriptural Source"}</td>
                      <td className="px-3.5 py-2.5 text-[#111111] font-bold">{isHindi ? mantra.title?.hi : mantra.title?.en}</td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-bold text-[#555555]">{isHindi ? "शाखा / परंपरा" : "Tradition / Shakha"}</td>
                      <td className="px-3.5 py-2.5 text-[#111111]">
                        {isHindi
                          ? (mantra.categoryLabel?.hi || "सनातन वैदिक परंपरा")
                          : (mantra.categoryLabel?.en || "Sanatana Vedic Tradition")}
                      </td>
                    </tr>
                    <tr className="bg-[#F9F9F9]">
                      <td className="px-3.5 py-2.5 font-bold text-[#555555]">{isHindi ? "सूक्त / श्लोक संदर्भ" : "Verse Reference"}</td>
                      <td className="px-3.5 py-2.5 text-[#111111] font-semibold">{isHindi ? mantra.subtitle?.hi : (mantra.subtitle?.en || mantra.subtitle?.hi)}</td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-bold text-[#555555]">{isHindi ? "ऋषि (Seer)" : "Seer (Rishi)"}</td>
                      <td className="px-3.5 py-2.5 text-[#111111]">
                        {isHindi
                          ? (mantra.canonAnga?.rishi?.hi || "वैदिक ऋषि")
                          : (mantra.canonAnga?.rishi?.en || "Vedic Seer")}
                      </td>
                    </tr>
                    <tr className="bg-[#F9F9F9]">
                      <td className="px-3.5 py-2.5 font-bold text-[#555555]">{isHindi ? "देवता (Presiding Deity)" : "Presiding Deity"}</td>
                      <td className="px-3.5 py-2.5 text-[#C62828] font-bold">
                        {isHindi
                          ? (mantra.canonAnga?.devata?.hi || mantra.deity?.hi)
                          : (mantra.canonAnga?.devata?.en || mantra.deity?.en || mantra.deity?.hi)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-bold text-[#555555]">{isHindi ? "छन्द (Vedic Metre)" : "Vedic Metre"}</td>
                      <td className="px-3.5 py-2.5 text-[#D9A441] font-bold">
                        {isHindi
                          ? (mantra.canonAnga?.chhandas?.hi || "अनुष्टुप् / त्रिष्टुप्")
                          : (mantra.canonAnga?.chhandas?.en || "Anushtubh / Trishtubh")}
                      </td>
                    </tr>
                    <tr className="bg-[#F9F9F9]">
                      <td className="px-3.5 py-2.5 font-bold text-[#555555]">{isHindi ? "समीक्षक एवं संपादन" : "Editorial Review"}</td>
                      <td className="px-3.5 py-2.5 text-[#111111] font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{isHindi ? "Veda Library Editorial Board (विद्वत परिषद द्वारा सत्यापित)" : "Veda Library Editorial Board (Scholarly Verified)"}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3.3: Interactive 108 Digital Japa Counter on Reading Page */}
            <section className="bg-white rounded-2xl border border-[#E5E5E5] border-t-4 border-t-[#D9A441] p-6 shadow-xs relative overflow-hidden space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E5E5]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FFD21F] text-[#111111] flex items-center justify-center font-bold text-sm shadow-2xs">
                    ॐ
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#111111]">
                      {isHindi ? "साधना जप काउंटर" : "Sacred Japa Mala Counter"}
                    </h3>
                    <p className="text-xs text-[#555555] font-sans">
                      {isHindi
                        ? "मंत्र का श्रद्धापूर्वक पाठ करते हुए यहाँ क्लिक करके जप संकल्प पूर्ण करें"
                        : "Click here while chanting with devotion to complete your Japa resolution"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setJapaSound((p) => !p)}
                    title={japaSound ? (isHindi ? "मंदिर घंटी ध्वनि चालू है" : "Chime sound enabled") : (isHindi ? "ध्वनि म्यूट है" : "Sound muted")}
                    className="p-2 rounded-xl border border-[#E5E5E5] hover:border-[#D9A441] bg-white text-[#111111] hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    {japaSound ? <Volume2 className="w-4 h-4 text-[#D9A441]" /> : <VolumeX className="w-4 h-4 text-[#555555]" />}
                  </button>
                  {japaCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setJapaCount(0)}
                      title={isHindi ? "माला रीसेट करें" : "Reset Rosary"}
                      className="px-3 py-1.5 rounded-xl border border-[#E5E5E5] hover:border-[#D9A441] bg-white text-xs font-bold text-[#111111] hover:bg-stone-50 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{isHindi ? "रीसेट" : "Reset"}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Target presets */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-[#555555]">{isHindi ? "संकल्प लक्ष्य:" : "Target:"}</span>
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
                          ? "bg-[#FFD21F] text-[#111111] border border-[#FFD21F] shadow-2xs font-extrabold"
                          : "bg-white text-[#555555] border border-[#E5E5E5] hover:border-[#D9A441]"
                      }`}
                    >
                      {target} {isHindi ? "जप" : "chants"}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs font-bold">
                  {malasDone > 0 && (
                    <span className="px-3 py-1 rounded-xl bg-stone-50 border border-[#E5E5E5] text-[#111111] flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#D9A441]" />
                      <span>{isHindi ? "पूर्ण माला: " : "Completed Malas: "}<strong className="text-[#D9A441]">{malasDone}</strong></span>
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-xl bg-stone-50 border border-[#E5E5E5] text-[#111111]">
                    {isHindi ? "प्रगति: " : "Progress: "}<strong className="text-[#C62828]">{Math.min(100, Math.round((japaCount / japaTarget) * 100))}%</strong>
                  </span>
                </div>
              </div>

              {/* SVG Ring & Big Bead Tap Area */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="stroke-[#E5E5E5] fill-none"
                      strokeWidth="7"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="stroke-[#FFD21F] transition-all duration-300 ease-out fill-none"
                      strokeWidth="7"
                      strokeDasharray={2 * Math.PI * 42}
                      strokeDashoffset={(2 * Math.PI * 42) * (1 - japaCount / japaTarget)}
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="absolute text-center flex flex-col items-center justify-center">
                    <span className={`text-3xl font-extrabold font-mono text-[#111111] leading-none transition-transform ${justTapped ? "scale-110" : ""}`}>
                      {japaCount}
                    </span>
                    <span className="text-[10px] font-bold text-[#555555] uppercase mt-0.5">
                      / {japaTarget}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-start gap-2.5">
                  <button
                    type="button"
                    onClick={handleJapaTap}
                    className="px-8 py-3.5 rounded-2xl bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-serif text-base font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#D9A441]"
                  >
                    <Sparkles className="w-4 h-4 text-[#C62828]" />
                    <span>{isHindi ? "॥ ॐ जपें (+१) ॥" : "॥ Chant Om (+1) ॥"}</span>
                  </button>

                  <p className="text-xs text-[#555555] font-devanagari">
                    {isHindi ? (
                      <>टैप करें अथवा कीबोर्ड का <strong>Spacebar</strong> दबाएँ</>
                    ) : (
                      <>Tap bead or press <strong>Spacebar</strong></>
                    )}
                  </p>
                </div>
              </div>

              {/* Toast banner on completion */}
              {toastMsg && (
                <div className="p-3.5 rounded-xl bg-[#FFD21F]/15 border border-[#FFD21F] text-center font-serif text-xs sm:text-sm font-bold text-[#111111] animate-bounce">
                  {toastMsg}
                </div>
              )}
            </section>

            {/* 3.4: Sadhana Vidhi & Rules (साधना एवं जप विधान) */}
            {mantra.vidhi && (
              <section className="bg-white rounded-2xl border border-[#E5E5E5] p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
                  <h3 className="font-serif font-bold text-[#111111] text-base flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#D9A441]" />
                    <span>{isHindi ? "शास्त्रीय साधना विधान" : "Prescribed Sadhana Vidhi & Rules"}</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFD21F] text-[#111111]">
                    {isHindi ? "शास्त्र सम्मत" : "Scripturally Prescribed"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#D9A441]">
                    <strong className="text-[#111111] font-bold block">{isHindi ? "१. शुभ मुहूर्त (Auspicious Timing):" : "1. Auspicious Timing (Muhurat):"}</strong>
                    <p className="text-[#111111] font-devanagari mt-0.5">{isHindi ? mantra.vidhi.muhurat?.hi : (mantra.vidhi.muhurat?.en || mantra.vidhi.muhurat?.hi)}</p>
                    <p className="text-[#555555] font-sans text-[11px]">{isHindi ? mantra.vidhi.muhurat?.en : mantra.vidhi.muhurat?.hi}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#FFD21F]">
                    <strong className="text-[#111111] font-bold block">{isHindi ? "२. शुभ दिशा (Direction):" : "2. Auspicious Direction (Disha):"}</strong>
                    <p className="text-[#111111] font-devanagari mt-0.5">{isHindi ? mantra.vidhi.direction?.hi : (mantra.vidhi.direction?.en || mantra.vidhi.direction?.hi)}</p>
                    <p className="text-[#555555] font-sans text-[11px]">{isHindi ? mantra.vidhi.direction?.en : mantra.vidhi.direction?.hi}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#D9A441]">
                    <strong className="text-[#111111] font-bold block">{isHindi ? "३. पवित्र आसन (Sacred Asana):" : "3. Sacred Asana (Seat):"}</strong>
                    <p className="text-[#111111] font-devanagari mt-0.5">{isHindi ? mantra.vidhi.asana?.hi : (mantra.vidhi.asana?.en || mantra.vidhi.asana?.hi)}</p>
                    <p className="text-[#555555] font-sans text-[11px]">{isHindi ? mantra.vidhi.asana?.en : mantra.vidhi.asana?.hi}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#FFD21F]">
                    <strong className="text-[#111111] font-bold block">{isHindi ? "४. जप माला (Chanting Beads):" : "4. Rosary (Japa Mala):"}</strong>
                    <p className="text-[#111111] font-devanagari mt-0.5">{isHindi ? mantra.vidhi.mala?.hi : (mantra.vidhi.mala?.en || mantra.vidhi.mala?.hi)}</p>
                    <p className="text-[#555555] font-sans text-[11px]">{isHindi ? mantra.vidhi.mala?.en : mantra.vidhi.mala?.hi}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#D9A441] sm:col-span-2">
                    <strong className="text-[#111111] font-bold block">{isHindi ? "५. अनुष्ठान जप संख्या (Prescribed Japa Count):" : "5. Prescribed Count (Japa Sankhya):"}</strong>
                    <p className="text-[#111111] font-devanagari mt-0.5">{isHindi ? mantra.vidhi.sankhya?.hi : (mantra.vidhi.sankhya?.en || mantra.vidhi.sankhya?.hi)}</p>
                    <p className="text-[#555555] font-sans text-[11px]">{isHindi ? mantra.vidhi.sankhya?.en : mantra.vidhi.sankhya?.hi}</p>
                  </div>
                </div>
              </section>
            )}

            {/* 3.5: 4-Dimensional Falashruti (फलश्रुति एवं कल्याणकारी लाभ) */}
            {mantra.benefits && mantra.benefits.length > 0 && (
              <section className="bg-white rounded-2xl border border-[#E5E5E5] p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
                  <h3 className="font-serif font-bold text-[#111111] text-base flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#D9A441]" />
                    <span>{isHindi ? "फलश्रुति एवं आध्यात्मिक लाभ" : "Spiritual & Karmic Benefits (Falashruti)"}</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFD21F] text-[#111111]">
                    {isHindi ? "फलश्रुति" : "Benefits"}
                  </span>
                </div>

                <div className="space-y-3">
                  {mantra.benefits.map((b, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-stone-50 border border-[#E5E5E5] space-y-1"
                    >
                      <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#FFD21F] text-[#111111]">
                        {isHindi ? (b.category?.hi || b.category?.en) : (b.category?.en || b.category?.hi)}
                      </span>
                      <p className="font-devanagari text-xs sm:text-sm text-[#111111] leading-relaxed font-semibold">
                        {isHindi ? b.text?.hi : (b.text?.en || b.text?.hi)}
                      </p>
                      <p className="font-sans text-xs text-[#555555] leading-relaxed">
                        {isHindi ? b.text?.en : b.text?.hi}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3.6: Related Sacred Mantras & Stotras */}
            {relatedMantras.length > 0 && (
              <section className="space-y-4 pt-4 border-t border-[#E5E5E5]">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-[#111111] text-base flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#D9A441]" />
                    <span>{isHindi ? "संबंधित मंत्र एवं स्तोत्र" : "Related Mantras & Stotras"}</span>
                  </h3>
                  <Link
                    to="/library/mantra-stotra"
                    className="text-xs font-bold text-[#111111] hover:text-[#D9A441] flex items-center gap-1 transition-colors"
                  >
                    <span>{isHindi ? "सम्पूर्ण संग्रह" : "View All"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedMantras.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/library/mantra-stotra/${rel.slug}`}
                      className="group bg-white rounded-2xl border border-[#E5E5E5] p-4 hover:border-[#D9A441] hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFD21F] text-[#111111] inline-block">
                          {isHindi ? (rel.deity?.hi || rel.deity?.en) : (rel.deity?.en || rel.deity?.hi)}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-[#111111] group-hover:text-[#D9A441] line-clamp-2 leading-snug transition-colors">
                          {isHindi ? rel.title.hi : (rel.title.en || rel.title.hi)}
                        </h4>
                        <p className="text-[11px] text-[#555555] line-clamp-2">
                          {isHindi ? rel.subtitle.hi : (rel.subtitle.en || rel.subtitle.hi)}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#E5E5E5] flex items-center justify-between text-[11px] text-[#111111] group-hover:text-[#D9A441] font-bold mt-3 transition-colors">
                        <span>{isHindi ? "पाठ करें" : "Read Chant"}</span>
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
