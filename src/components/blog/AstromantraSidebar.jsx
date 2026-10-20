import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  BookOpen,
  TrendingUp,
  RotateCcw,
  Check,
  Copy,
  Tag,
  ArrowRight,
  Flame,
  Award,
  ChevronRight,
  Compass,
  Volume2,
  Clock,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";

// Authentic Vedic Suktis with pure Devanagari Sanskrit (Zero Roman/IAST transliteration)
const DAILY_SUKTIS = [
  {
    shloka: "ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥",
    source: "बृहदारण्यकोपनिषद् १.३.२८",
    meaningEn: "Lead me from the unreal to the real, from darkness to light, from death to immortality.",
    meaningHi: "हे ईश्वर! मुझे असत्य से सत्य की ओर, अंधकार से प्रकाश की ओर और मृत्यु से अमरता की ओर ले चलो।"
  },
  {
    shloka: "सत्यं वद । धर्मं चर । स्वाध्यायान्मा प्रमदः ॥",
    source: "तैत्तिरीयोपनिषद् १.११.१",
    meaningEn: "Speak the truth. Practice righteousness. Do not neglect sacred self-study.",
    meaningHi: "सदा सत्य बोलो। धर्म का आचरण करो। स्वाध्याय और ज्ञानार्जन में कभी प्रमाद मत करो।"
  },
  {
    shloka: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥",
    source: "वैदिक शांति पाठ",
    meaningEn: "May all beings be happy. May all beings be free from affliction. May all see what is auspicious; may none suffer.",
    meaningHi: "समस्त प्राणी सुखी हों, सब निरोगी हों, सभी का कल्याण हो और किसी को भी दुःख का भागी न बनना पड़े।"
  }
];

// Auspicious Temple Bell Chime using Web Audio API
function playChantBell() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(528, now); // 528 Hz Love & Transformation frequency
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.2);
  } catch {
    // Audio Context not allowed before user interaction
  }
}

export default function AstromantraSidebar({
  categories = [],
  currentCategory = "All",
  onSelectCategory,
  trendingArticles = [],
  currentTag = "",
  onSelectTag,
  className = "",
}) {
  const navigate = useNavigate();
  const { isHindi } = useLanguage();

  // Digital Japa Mala State
  const [japaCount, setJapaCount] = useState(0);
  const [malasCompleted, setMalasCompleted] = useState(0);
  const [justChanted, setJustChanted] = useState(false);

  // Daily Sukti State
  const [activeSuktiIdx] = useState(0);
  const [copiedSukti, setCopiedSukti] = useState(false);

  const activeSukti = DAILY_SUKTIS[activeSuktiIdx];

  // Handle Japa Tap
  const handleChant = () => {
    setJustChanted(true);
    playChantBell();
    setTimeout(() => setJustChanted(false), 200);

    const nextCount = japaCount + 1;
    if (nextCount >= 108) {
      setJapaCount(0);
      setMalasCompleted((prev) => prev + 1);
    } else {
      setJapaCount(nextCount);
    }
  };

  const handleResetJapa = () => {
    setJapaCount(0);
  };

  // Copy Sukti (Pure Devanagari - No Roman IAST)
  const handleCopySukti = () => {
    const textToCopy = `${activeSukti.shloka}\n\nभावार्थ: ${activeSukti.meaningHi}\n\nMeaning: ${activeSukti.meaningEn}\n— ${activeSukti.source}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedSukti(true);
    setTimeout(() => setCopiedSukti(false), 2000);
  };

  const handleCategoryClick = (catName) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
    } else {
      navigate(`/library/articles?category=${encodeURIComponent(catName)}`);
    }
  };

  const handleTagClick = (tag) => {
    if (onSelectTag) {
      onSelectTag(tag);
    } else {
      navigate(`/library/articles?tag=${encodeURIComponent(tag)}`);
    }
  };

  const popularTags = [
    "ShaniSadeSati",
    "Navgrah",
    "VastuTips",
    "Rudraksha",
    "Mahamrityunjaya",
    "Gayatri",
    "SolarEclipse",
    "SatyanarayanKatha",
    "LordShiva",
    "Kanakadhara",
  ];

  return (
    <aside className={`space-y-6 ${className}`}>
      {/* Widget 1: Digital Japa Mala (१०८ जप माला) - Royal & Serene */}
      <div className="bg-white rounded-2xl border border-amber-200/80 p-5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
        {/* Sacred Subtle Om Watermark */}
        <div className="absolute -right-3 -bottom-3 text-7xl font-devanagari text-amber-900/[0.04] select-none pointer-events-none">
          ॐ
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-amber-100">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              ॐ
            </span>
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-sm">
                {isHindi ? "डिजिटल जप माला" : "Digital Japa Mala"}
              </h3>
              <p className="text-[11px] text-[#78350F] font-semibold">
                {isHindi ? "१०८ पावन मनके जप गणक" : "108 Sacred Chants Counter"}
              </p>
            </div>
          </div>

          {japaCount > 0 && (
            <button
              onClick={handleResetJapa}
              title={isHindi ? "पुनः प्रारंभ करें" : "Reset Count"}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-amber-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Counter Circle Display */}
        <div className="py-4 text-center space-y-3">
          <div className="relative inline-flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-28 h-28 transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="46"
                stroke="currentColor"
                strokeWidth="6"
                className="text-amber-100"
                fill="transparent"
              />
              <circle
                cx="56"
                cy="56"
                r="46"
                stroke="currentColor"
                strokeWidth="6"
                strokeDasharray={289}
                strokeDashoffset={289 - (289 * japaCount) / 108}
                strokeLinecap="round"
                className="text-amber-600 transition-all duration-300"
                fill="transparent"
              />
            </svg>

            {/* Centered Count in deep slate & warm saffron */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-2xl font-serif font-black text-slate-900 transition-transform ${justChanted ? "scale-125 text-amber-700" : ""}`}>
                {japaCount}
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                {isHindi ? "/ १०८ मनके" : "/ 108 BEADS"}
              </span>
            </div>
          </div>

          {/* Malas Completed Badge */}
          {malasCompleted > 0 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-[#78350F] text-[11px] font-bold shadow-2xs">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>{isHindi ? `${malasCompleted} माला पूर्ण` : `${malasCompleted} Malas Completed`}</span>
            </div>
          )}

          {/* Tap to Chant Action Button */}
          <div>
            <button
              onClick={handleChant}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 active:scale-98 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{isHindi ? "जप स्पर्श करें (+१ मनका)" : "Tap to Chant (+1 Japa)"}</span>
            </button>
            <p className="text-[10px] text-slate-400 mt-1.5 font-sans">
              {isHindi ? "१०८ मनके पूर्ण होने पर स्वतः १ माला जोड़ी जाएगी" : "1 Mala completed automatically after 108 counts"}
            </p>
          </div>
        </div>
      </div>

      {/* Widget 2: Daily Sacred Sukti (दैनिक अमृत सूक्ति) - Zero Roman/IAST */}
      <div className="bg-white rounded-2xl border border-amber-200/70 p-5 shadow-xs hover:shadow-md transition-shadow space-y-3.5 relative">
        <div className="flex items-center justify-between pb-2 border-b border-amber-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#78350F]">
            <Flame className="w-4 h-4 text-amber-600" />
            <span>{isHindi ? "दैनिक अमृत सूक्ति" : "Daily Sacred Sukti"}</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-[#78350F] border border-amber-200/80 font-bold">
            {activeSukti.source}
          </span>
        </div>

        {/* Sacred Devanagari Sanskrit Verse (No Roman transliteration) */}
        <div className="p-4 rounded-xl bg-[#FFFDF9] border border-amber-200/70 text-center space-y-2">
          <p className="font-devanagari text-sm sm:text-[15px] font-bold text-slate-900 leading-relaxed select-text">
            {activeSukti.shloka}
          </p>
        </div>

        {/* Hindi & English Meaning */}
        <div className="space-y-1.5 text-xs">
          {isHindi ? (
            <>
              <p className="font-devanagari text-slate-700 text-xs leading-relaxed">
                <strong className="text-[#78350F]">भावार्थ:</strong> {activeSukti.meaningHi}
              </p>
              <p className="font-sans text-slate-500 text-[11px] leading-relaxed">
                <strong className="text-slate-700">English:</strong> {activeSukti.meaningEn}
              </p>
            </>
          ) : (
            <>
              <p className="font-sans text-slate-700 text-xs leading-relaxed">
                <strong className="text-[#78350F]">Meaning:</strong> {activeSukti.meaningEn}
              </p>
              <p className="font-devanagari text-slate-500 text-[11px] leading-relaxed">
                <strong className="text-slate-700">भावार्थ:</strong> {activeSukti.meaningHi}
              </p>
            </>
          )}
        </div>

        {/* One-Click Copy Sukti Button */}
        <div className="pt-2 border-t border-amber-100 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-medium">
            {isHindi ? "पवित्र वेद-वाक्य" : "Sacred Vedic Verse"}
          </span>
          <button
            onClick={handleCopySukti}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#78350F] hover:text-amber-900 hover:underline cursor-pointer"
          >
            {copiedSukti ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">{isHindi ? "कॉपी हो गया!" : "Copied!"}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-amber-700" />
                <span>{isHindi ? "सूक्ति कॉपी करें" : "Copy Sukti"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Widget 3: Topic Categories Directory */}
      <div className="bg-white rounded-2xl border border-amber-200/70 p-5 shadow-xs hover:shadow-md transition-shadow space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-amber-100">
          <h3 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-amber-700" />
            <span>{isHindi ? "विषय श्रेणियाँ" : "Topic Categories"}</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-semibold">
            {isHindi ? `${categories.length} श्रेणियाँ` : `${categories.length} Topics`}
          </span>
        </div>

        <div className="space-y-1.5">
          <button
            onClick={() => handleCategoryClick("All")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentCategory === "All"
                ? "bg-amber-800 text-white shadow-2xs font-bold"
                : "text-slate-700 hover:bg-amber-50/80"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              {isHindi ? "समस्त लेख (All Articles)" : "All Articles (समस्त लेख)"}
            </span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>

          {categories.map((cat, idx) => {
            const catName = typeof cat === "string" ? cat : cat.category;
            if (!catName || catName === "All") return null;
            const count = typeof cat === "object" ? cat.count : null;
            const isActive = currentCategory.toLowerCase() === catName.toLowerCase();

            return (
              <button
                key={idx}
                onClick={() => handleCategoryClick(catName)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-800 text-white shadow-2xs font-bold"
                    : "text-slate-700 hover:bg-amber-50/80"
                }`}
              >
                <span className="flex items-center gap-2 text-left truncate mr-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-amber-300" : "bg-amber-500"}`} />
                  <span className="truncate">{catName}</span>
                </span>
                {count !== null && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${
                      isActive ? "bg-amber-950 text-amber-200" : "bg-amber-50 text-[#78350F] border border-amber-200/60"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Widget 4: Trending / Most Read Articles */}
      {trendingArticles && trendingArticles.length > 0 && (
        <div className="bg-white rounded-2xl border border-amber-200/70 p-5 shadow-xs hover:shadow-md transition-shadow space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-amber-100">
            <h3 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-700" />
              <span>{isHindi ? "सर्वाधिक पठित लेख" : "Most Read Articles"}</span>
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#78350F]">
              {isHindi ? "लोकप्रिय" : "Popular"}
            </span>
          </div>

          <div className="space-y-2.5">
            {trendingArticles.slice(0, 4).map((art, idx) => (
              <Link
                key={art.id || idx}
                to={`/library/articles/${art.slug}`}
                className="group flex items-start gap-3 p-2 rounded-xl hover:bg-amber-50/60 transition-colors"
              >
                {/* Ranking Badge */}
                <div className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200 text-[#78350F] flex items-center justify-center font-bold text-xs flex-shrink-0 group-hover:bg-amber-700 group-hover:text-white transition-colors">
                  #{idx + 1}
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <h4 className="font-serif text-xs font-bold text-slate-800 group-hover:text-[#78350F] line-clamp-2 leading-snug">
                    {art.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                    <span className="text-[#78350F] font-semibold">{art.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-3 h-3 text-amber-600" />
                      {art.readTime || (isHindi ? "५ मिनट पठन" : "5 min read")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Widget 5: Sacred Topic Tags */}
      <div className="bg-white rounded-2xl border border-amber-200/70 p-5 shadow-xs hover:shadow-md transition-shadow space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-amber-100">
          <h3 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-amber-700" />
            <span>{isHindi ? "पवित्र विषय सूत्र (Tags)" : "Sacred Topic Tags"}</span>
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {popularTags.map((tag) => {
            const isActive = currentTag.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-800 text-white shadow-2xs font-bold"
                    : "bg-amber-50/60 hover:bg-amber-100 text-slate-700 border border-amber-200/60"
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
