import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Home, Sparkles, Search, CheckCircle2, Type, X } from "lucide-react";
import { EKADASH_SKANDHA_CHAPTERS } from "../data/bhagavataEkadashaData.js";
import bannerTempleGhat from "../assets/images/library/banners/banner-temple-ghat.jpg";
import SEO from "../components/common/SEO.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

const LABELS = {
  hindi: {
    home: "मुख्य पृष्ठ",
    purana: "पुराण",
    book: "श्रीमद्भागवत",
    back: "भागवत ग्रंथ पृष्ठ पर लौटें",
    title: "एकादश स्कंध — मुक्ति लीला",
    summary:
      "उद्धव गीता, नवयोगेश्वर संवाद, अवधूत के २४ गुरु और यदुवंश की अंतिम लीला।",
    count: "अध्याय",
    list: "अध्याय सूची",
    open: "पाठ खोलें",
  },
  english: {
    home: "Home",
    purana: "Purana",
    book: "Srimad Bhagavata",
    back: "Back to the Purana page",
    title: "Canto 11 — The Path to Liberation",
    summary:
      "Uddhava's teachings, the Nine Yogendras, the avadhūta's twenty-four teachers, and the close of the Yadu dynasty.",
    count: "chapters",
    list: "Chapter index",
    open: "Open lesson",
  },
  hinglish: {
    home: "Home",
    purana: "Purana",
    book: "Shrimad Bhagavat",
    back: "Bhagavat granth page par lautein",
    title: "Ekadash Skandha — Mukti Leela",
    summary:
      "Uddhav Gita, Nava Yogeshwar samvad, avadhut ke 24 guru aur Yadu vansh ki antim leela.",
    count: "adhyay",
    list: "Adhyay suchi",
    open: "Paath kholein",
  },
};

export default function ScriptureChapterIndexPage() {
  const navigate = useNavigate();
  const { isHindi, setLanguage: setGlobalLang } = useLanguage();
  const [localLangOverride, setLocalLangOverride] = useState(null);

  useEffect(() => {
    setLocalLangOverride(null);
  }, [isHindi]);

  const language = localLangOverride || (isHindi ? "hindi" : "english");
  const [searchFilter, setSearchFilter] = useState("");
  const [fontSize, setFontSize] = useState("default"); // "small", "default", "large"
  const labels = LABELS[isHindi ? "hindi" : "english"];
  const chapterPath = "/library/purana/shrimad-bhagavata/skandha-11";

  const handleLangSelect = (option) => {
    if (option === "hinglish") {
      setLocalLangOverride("hinglish");
    } else {
      setLocalLangOverride(null);
      if (setGlobalLang) {
        setGlobalLang(option === "english" ? "en" : "hi");
      }
    }
  };

  const filteredChapters = useMemo(() => {
    if (!searchFilter.trim()) return EKADASH_SKANDHA_CHAPTERS;
    const q = searchFilter.toLowerCase().trim();
    return EKADASH_SKANDHA_CHAPTERS.filter(
      (ch) =>
        String(ch.number).includes(q) ||
        ch.title.toLowerCase().includes(q) ||
        ch.titleHi.includes(q) ||
        (ch.summary?.hindi || "").includes(q)
    );
  }, [searchFilter]);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={isHindi ? "एकादश स्कंध — अध्याय सूची" : "Canto 11 — Chapter Index"}
        description={isHindi ? "श्रीमद्भागवत महापुराण के एकादश स्कंध के सभी अध्यायों की सूची और त्वरित नेविगेशन।" : "Chapter index and quick navigation for all chapters of Canto 11 of Srimad Bhagavata Purana."}
        canonical="/library/purana/shrimad-bhagavata/skandha-11"
      />
      {/* 1. Breadcrumb Ribbon */}
      <div className="border-b border-[#E5E5E5] bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center gap-2 text-xs font-medium text-[#555555]">
          <Link
            to="/"
            className="inline-flex items-center gap-1 hover:text-[#D9A441] transition-colors"
          >
            <Home className="h-3.5 w-3.5" /> {labels.home}
          </Link>
          <span>›</span>
          <Link to="/library/purana" className="hover:text-[#D9A441] transition-colors">
            {labels.purana}
          </Link>
          <span>›</span>
          <Link
            to="/library/purana/shrimad-bhagavata"
            className="hover:text-[#D9A441] transition-colors"
          >
            {labels.book}
          </Link>
          <span>›</span>
          <span className="font-semibold text-[#111111]">
            {isHindi ? "एकादश स्कन्ध" : "Canto 11"}
          </span>
        </div>
      </div>

      {/* 2. Sacred Luminous Hero Banner */}
      <section className="relative overflow-hidden bg-[#111111] text-white border-b border-[#E5E5E5] pt-10 pb-12 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerTempleGhat}
            alt="Vedic Temple Heritage"
            className="w-full h-full object-cover object-center opacity-85 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/45 to-[#111111]/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D9A441]/15 via-transparent to-[#111111]/70" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F] text-[#111111] text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{isHindi ? "श्रीमद्भागवत महापुराण" : "Srimad Bhagavata Mahapurana"}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/15 border border-white/30 text-white/90 text-xs font-semibold backdrop-blur-xs">
              {isHindi ? "स्कन्ध ११ • मुक्ति लीला" : "Canto 11 • Path to Liberation"}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#C62828] text-white text-xs font-bold shadow-xs">
              {isHindi ? "३१ अध्याय" : "31 Chapters"}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            {labels.title}
          </h1>

          <p className="max-w-3xl font-devanagari text-sm sm:text-base leading-relaxed text-white/90 drop-shadow-xs">
            {labels.summary}
          </p>
        </div>
      </section>

      {/* 3. Main Chapter Navigation Area */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 space-y-8">
        {/* Controls Toolbar: Back + Font Scaler + 3 Language Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
          <button
            type="button"
            onClick={() => navigate("/library/purana/shrimad-bhagavata")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#111111] hover:text-[#D9A441] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> {labels.back}
          </button>

          <div className="flex flex-wrap items-center gap-3">
            {/* Font Sizing Controls (A-, A, A+) */}
            <div className="inline-flex items-center gap-1 rounded-xl border border-[#E5E5E5] bg-white p-0.5 text-xs font-semibold shadow-2xs">
              <span className="px-2 text-[#555555] font-bold flex items-center gap-1">
                <Type className="w-3 h-3 text-[#D9A441]" />
                <span>{isHindi ? "आकार:" : "Size:"}</span>
              </span>
              {[
                { id: "small", label: "A-" },
                { id: "default", label: "A" },
                { id: "large", label: "A+" }
              ].map((sz) => (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => setFontSize(sz.id)}
                  className={`rounded-lg px-2.5 py-1 transition-colors cursor-pointer font-bold ${
                    fontSize === sz.id
                      ? "bg-[#FFD21F] text-[#111111]"
                      : "text-[#555555] hover:bg-stone-50"
                  }`}
                >
                  {sz.label}
                </button>
              ))}
            </div>

            {/* 3 Languages Switcher (Hindi, English, Hinglish) */}
            <div className="inline-flex items-center gap-1 rounded-xl border border-[#E5E5E5] bg-white p-0.5 text-xs font-semibold shadow-2xs">
              {["hindi", "english", "hinglish"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleLangSelect(option)}
                  aria-pressed={language === option}
                  className={`rounded-lg px-3 py-1 transition-colors cursor-pointer font-bold ${
                    language === option
                      ? "bg-[#FFD21F] text-[#111111] shadow-2xs"
                      : "text-[#555555] hover:bg-stone-50"
                  }`}
                >
                  {option === "hindi"
                    ? "हिंदी"
                    : option === "english"
                      ? "English"
                      : "Hinglish"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chapter Search & Counter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#D9A441]" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">
              {labels.list} ({filteredChapters.length} / 31)
            </h2>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={isHindi ? "अध्याय संख्या या शीर्षक खोजें..." : "Search chapter number or title..."}
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs border border-[#E5E5E5] bg-white focus:outline-none focus:ring-2 focus:ring-[#FFD21F] focus:border-[#D9A441] font-devanagari transition-all"
            />
            {searchFilter && (
              <button
                type="button"
                onClick={() => setSearchFilter("")}
                className="p-1 text-stone-400 hover:text-stone-700 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Chapters Ordered List */}
        <ol className="divide-y divide-[#E5E5E5] border border-[#E5E5E5] bg-white rounded-2xl overflow-hidden shadow-2xs">
          {filteredChapters.map((chapter) => (
            <li key={chapter.number}>
              <Link
                to={`${chapterPath}/${chapter.number}`}
                className="group flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 py-4 transition-colors hover:bg-stone-50 border-l-4 border-l-transparent hover:border-l-[#D9A441]"
              >
                <span className="flex items-center gap-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FFD21F] text-xs font-black text-[#111111] shadow-2xs group-hover:scale-105 transition-transform">
                    {chapter.number}
                  </span>
                  <div>
                    <span
                      className={`font-semibold text-[#111111] group-hover:text-[#D9A441] transition-colors block ${
                        fontSize === "large" ? "text-base" : fontSize === "small" ? "text-xs" : "text-sm"
                      }`}
                    >
                      {language === "hindi"
                        ? `अध्याय ${chapter.number}: ${chapter.titleHi}`
                        : `${language === "hinglish" ? "Adhyay" : "Chapter"} ${chapter.number}: ${chapter.title}`}
                    </span>
                    <p className="text-xs text-[#555555] line-clamp-1 mt-0.5">
                      {chapter.summary[language]}
                    </p>
                  </div>
                </span>

                <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors">
                  {labels.open}{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {/* Comprehensive Source & Bibliographic Reference Card */}
        <section className="bg-white rounded-2xl border border-[#E5E5E5] p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#D9A441]" />
              <h3 className="font-serif font-bold text-[#111111] text-base">
                {isHindi ? "स्रोत, संस्करण एवं संदर्भ विवरण" : "Source & Bibliographic Citation"}
              </h3>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[#111111] border border-[#FFD21F]">
              {isHindi ? "महापुराण प्रामाण्य" : "Mahapurana Canonical Evidence"}
            </span>
          </div>

          <div className="border border-[#E5E5E5] rounded-xl overflow-hidden shadow-2xs bg-white">
            <table className="w-full text-xs font-devanagari divide-y divide-[#E5E5E5]">
              <tbody className="divide-y divide-[#E5E5E5]">
                <tr className="bg-[#F9F9F9]">
                  <td className="px-3.5 py-2.5 font-bold text-[#555555] w-1/3 shrink-0">{isHindi ? "मूल महापुराण" : "Scriptural Corpus"}</td>
                  <td className="px-3.5 py-2.5 text-[#111111] font-bold">{isHindi ? "श्रीमद्भागवत महापुराण (१८,००० श्लोक)" : "Srimad Bhagavata Mahapurana (18,000 Verses)"}</td>
                </tr>
                <tr>
                  <td className="px-3.5 py-2.5 font-bold text-[#555555]">{isHindi ? "स्कन्ध" : "Canto"}</td>
                  <td className="px-3.5 py-2.5 text-[#111111]">{isHindi ? "एकादश स्कन्ध (मुक्ति लीला)" : "11th Canto (Mukti-Lila — Path to Liberation)"}</td>
                </tr>
                <tr className="bg-[#F9F9F9]">
                  <td className="px-3.5 py-2.5 font-bold text-[#555555]">{isHindi ? "अध्याय संख्या" : "Total Chapters"}</td>
                  <td className="px-3.5 py-2.5 text-[#111111] font-semibold">{isHindi ? "३१ अध्याय (उद्धव गीता प्रसंग सहित)" : "31 Chapters (including Uddhava Gita)"}</td>
                </tr>
                <tr>
                  <td className="px-3.5 py-2.5 font-bold text-[#555555]">{isHindi ? "वक्ता" : "Narrator"}</td>
                  <td className="px-3.5 py-2.5 text-[#111111]">{isHindi ? "श्रीशुकदेव जी महाराज / भगवान श्रीकृष्ण" : "Sri Sukadeva Gosvami / Lord Sri Krishna"}</td>
                </tr>
                <tr className="bg-[#F9F9F9]">
                  <td className="px-3.5 py-2.5 font-bold text-[#555555]">{isHindi ? "श्रोता" : "Listener"}</td>
                  <td className="px-3.5 py-2.5 text-[#111111]">{isHindi ? "महाराज परीक्षित / उद्धव जी" : "Maharaja Parikshit / Uddhava"}</td>
                </tr>
                <tr>
                  <td className="px-3.5 py-2.5 font-bold text-[#555555]">{isHindi ? "छन्द" : "Metre"}</td>
                  <td className="px-3.5 py-2.5 text-[#D9A441] font-bold">{isHindi ? "अनुष्टुप् एवं त्रिष्टुप्" : "Anushtubh & Trishtubh"}</td>
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
      </main>
    </div>
  );
}
