import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowUp,
  Search,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Scroll,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function VedaFooter({ onOpenSearch }) {
  const navigate = useNavigate();
  const { isHindi } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (path, e) => {
    if (e) e.preventDefault();
    if (path) navigate(path);
    scrollToTop();
  };

  return (
    <footer className="relative bg-[#111111] text-[#FFFFFF] pt-0 pb-6 border-t-2 border-[#D9A441] overflow-hidden">
      {/* 1. Top Sacred Vedic Shanti Mantra Ribbon */}
      <div className="border-b border-[#222222] bg-[#181818] py-2 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse flex-shrink-0" />
            <p className="font-devanagari text-xs sm:text-sm font-semibold text-[#FFFFFF] tracking-wide text-center md:text-left">
              ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः वनस्पतयः शान्तिः ॥
            </p>
          </div>
          <span className="font-devanagari text-xs font-bold text-[#FFD21F] px-3 py-0.5 rounded-full bg-[#222222] border border-[#D9A441]/40 self-center md:self-auto">
            यजुर्वेद ३६.१७ • ॐ शान्तिः शान्तिः शान्तिः
          </span>
        </div>
      </div>

      {/* 2. Main 4-Column Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 pb-5 sm:pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-5 lg:gap-8 pb-6 border-b border-[#222222]">

          {/* Column 1: Brand Heritage & Purpose */}
          <div className="col-span-2 md:col-span-4 lg:col-span-3 space-y-3 pb-4 lg:pb-0 border-b border-[#222222] lg:border-b-0">
            {/* Logo Emblem */}
            <Link
              to="/library"
              onClick={(e) => handleLinkClick("/library", e)}
              className="flex items-center gap-2.5 group focus:outline-none cursor-pointer inline-flex"
            >
              <div className="relative">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFD21F] flex items-center justify-center text-[#111111] shadow-md ring-2 ring-[#D9A441]/50 group-hover:bg-[#D9A441] group-hover:scale-105 transition-all">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#111111]"
                  >
                    <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.25" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                    <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
                  </svg>
                </div>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#111111] border border-[#FFD21F] flex items-center justify-center text-[7px] sm:text-[8px] font-bold text-[#FFD21F]">
                  ॐ
                </span>
              </div>

              <div>
                <span className="font-serif text-base sm:text-lg lg:text-xl font-bold tracking-[0.12em] text-[#FFFFFF] group-hover:text-[#FFD21F] transition-colors leading-none block">
                  VEDA LIBRARY
                </span>
                <span className="block text-[9px] sm:text-[10px] tracking-[0.08em] uppercase font-semibold text-[#D9A441] mt-0.5 leading-tight">
                  {isHindi ? "वैदिक एवं पारम्परिक ज्ञान संग्रह" : "Vedic & Traditional Knowledge Archive"}
                </span>
              </div>
            </Link>

            <p className="text-xs font-devanagari text-[#999999] leading-relaxed max-w-sm">
              {isHindi ? "भारतीय वैदिक एवं शास्त्रीय ज्ञान का डिजिटल संग्रह।" : "Digital preservation of Vedic & classical Indian wisdom traditions."}
            </p>

            {/* Trust Badges */}
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-[#E5E5E5]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A441] flex-shrink-0" />
                <span>{isHindi ? "१००% प्रामाणिक संस्कृत एवं वैदिक मूल स्रोत" : "100% Source-Verified Sanskrit Corpus"}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-[#E5E5E5]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A441] flex-shrink-0" />
                <span>{isHindi ? "पद-पाठ एवं शास्त्रीय संरचना आधारित" : "Text-First Canonical Structure"}</span>
              </div>
            </div>

            {/* Quick Search Trigger */}
            {onOpenSearch && (
              <button
                type="button"
                onClick={onOpenSearch}
                className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1A1A1A] border border-[#333333] hover:border-[#FFD21F] text-[#E5E5E5] hover:text-[#FFFFFF] transition-all text-xs font-medium cursor-pointer shadow-xs group"
              >
                <Search className="w-3.5 h-3.5 text-[#FFD21F] group-hover:scale-110 transition-transform" />
                <span>{isHindi ? "पुस्तकालय में खोजें" : "Quick Search"}</span>
                <kbd className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#222222] text-[#FFD21F] border border-[#333333]">
                  ⌘K
                </kbd>
              </button>
            )}
          </div>

          {/* Column 2: Explore (col-span-1 lg:col-span-3) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#FFD21F] border-b border-[#222222] pb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{isHindi ? "ज्ञान शाखाएँ" : "Explore"}</span>
            </h3>
            <ul className="space-y-1 text-xs font-medium">
              {[
                { label: isHindi ? "वेद" : "The Vedas", path: "/library/veda" },
                { label: isHindi ? "वेदाङ्ग" : "Vedangas", path: "/library/vedanga" },
                { label: isHindi ? "उपनिषद एवं दर्शन" : "Upanishad & Darshan", path: "/library/upanishad" },
                { label: isHindi ? "पुराण एवं इतिहास" : "Purana & Itihasa", path: "/library/purana-itihasa" },
                { label: isHindi ? "मंत्र व स्तोत्र" : "Mantra & Stotra", path: "/library/mantra-stotra" },
                { label: isHindi ? "ज्योतिष शास्त्र" : "Vedic Astrology", path: "/library/jyotisha" },
                { label: isHindi ? "वास्तु शास्त्र" : "Vastu Shastra", path: "/library/vastu" },
                { label: isHindi ? "शास्त्र एवं दर्शन" : "Classical Shastras", path: "/library/shastra" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    onClick={(e) => handleLinkClick(link.path, e)}
                    className="hover:text-[#FFD21F] hover:translate-x-0.5 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-[#E5E5E5] py-0.5"
                  >
                    <span className="text-[#D9A441] text-[10px] flex-shrink-0">›</span>
                    <span className="leading-snug">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources (col-span-1 lg:col-span-3) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#FFD21F] border-b border-[#222222] pb-1.5 flex items-center gap-1.5">
              <Scroll className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{isHindi ? "संसाधन" : "Resources"}</span>
            </h3>
            <ul className="space-y-1 text-xs font-medium">
              {[
                { label: isHindi ? "ग्रंथ संग्रह" : "Grantha Archive", path: "/library/collections" },
                { label: isHindi ? "शास्त्रीय आलेख" : "Articles & Research", path: "/library/articles" },
                { label: isHindi ? "विषय सूची" : "Canonical Topics", path: "/library/knowledge" },
                { label: isHindi ? "शास्त्रीय शब्दकोश" : "Vedic Glossary", path: "/library/knowledge" },
                { label: isHindi ? "अनुसंधान व पाण्डुलिपि" : "Research & Manuscripts", path: "/library/knowledge" },
                { label: isHindi ? "संदर्भ एवं भाष्य" : "Citations", path: "/source-attribution" },
                { label: isHindi ? "दुर्लभ पाण्डुलिपियाँ" : "Rare Archives", path: "/library/knowledge" },
                { label: isHindi ? "ज्ञान संबंध रेखाचित्र" : "Knowledge Graph", path: "/library/knowledge" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    onClick={(e) => handleLinkClick(link.path, e)}
                    className="hover:text-[#FFD21F] hover:translate-x-0.5 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-[#E5E5E5] py-0.5"
                  >
                    <span className="text-[#D9A441] text-[10px] flex-shrink-0">›</span>
                    <span className="leading-snug">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Veda Structure (col-span-2 sm:col-span-1 lg:col-span-3) */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3 space-y-2 pt-4 md:pt-0 border-t md:border-t-0 border-[#222222]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#FFD21F] border-b border-[#222222] pb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{isHindi ? "वेद संरचना" : "Veda Structure"}</span>
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-x-3 gap-y-1 text-xs font-medium text-[#E5E5E5]">
              {[
                { label: isHindi ? "पुस्तकालय परिचय" : "About Veda Library", path: "/about" },
                { label: isHindi ? "संपादकीय नीति" : "Editorial Policy", path: "/editorial-policy" },
                { label: isHindi ? "स्रोत एवं उद्धरण" : "Source Attribution", path: "/source-attribution" },
                { label: isHindi ? "योगदान निर्देशिका" : "Contribution Guidelines", path: "/contribute" },
                { label: isHindi ? "विद्वान निर्देशिका" : "Scholars Directory", path: "/scholars" },
                { label: isHindi ? "संपर्क" : "Contact", path: "/contact" },
                { label: isHindi ? "गोपनीयता नीति" : "Privacy Policy", path: "/privacy-policy" },
                { label: isHindi ? "नियम एवं शर्तें" : "Terms of Service", path: "/terms" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    onClick={(e) => handleLinkClick(link.path, e)}
                    className="hover:text-[#FFD21F] hover:translate-x-0.5 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-[#E5E5E5] py-0.5"
                  >
                    <span className="text-[#D9A441] text-[10px] flex-shrink-0">›</span>
                    <span className="leading-snug">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#1C1C1C] border border-[#D9A441]/40 text-[#D9A441] font-devanagari">
                धर्मो रक्षति रक्षितः
              </span>
            </div>
          </div>
        </div>

        {/* 3. Scholarly Trust Ribbon Strip */}
        <div className="py-3.5 border-b border-[#222222] grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 text-xs text-[#999999]">
          <div className="flex items-start sm:items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FFD21F] flex-shrink-0 mt-1 sm:mt-0" />
            <span className="leading-snug"><strong className="text-[#FFFFFF]">Text-First:</strong> {isHindi ? "शुद्ध मूल पाठ" : "Authentic texts"}</span>
          </div>
          <div className="flex items-start sm:items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D9A441] flex-shrink-0 mt-1 sm:mt-0" />
            <span className="leading-snug"><strong className="text-[#FFFFFF]">Source-Based:</strong> {isHindi ? "ग्रंथ प्रमाण" : "Citations"}</span>
          </div>
          <div className="flex items-start sm:items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#10B981] flex-shrink-0 mt-1 sm:mt-0" />
            <span className="leading-snug"><strong className="text-[#FFFFFF]">Non-Sectarian:</strong> {isHindi ? "निष्पक्ष शोध" : "Impartial"}</span>
          </div>
          <div className="flex items-start sm:items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FFD21F] flex-shrink-0 mt-1 sm:mt-0" />
            <span className="leading-snug"><strong className="text-[#FFFFFF]">Living Heritage:</strong> {isHindi ? "सनातन परंपरा" : "Wisdom"}</span>
          </div>
        </div>

        {/* 4. Bottom Copyright & Blessing Bar */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-[#777777] gap-3 text-center md:text-left">
          <div className="space-y-0.5">
            <p className="text-[#999999] font-medium text-[11px] sm:text-xs">
              {isHindi
                ? "© 2026 वेद लाइब्रेरी • वेद स्ट्रक्चर प्रोजेक्ट। समस्त सर्वाधिकार सुरक्षित।"
                : "© 2026 Veda Library • Veda Structure Project. All Rights Reserved."}
            </p>
            <p className="text-[10px] sm:text-[11px] text-[#777777] leading-relaxed">
              {isHindi
                ? "समस्त मानव समाज, शोधकर्ताओं व साधकों हेतु सनातन ज्ञान परंपरा का डिजिटल संरक्षण।"
                : "Preserving and digitizing traditional knowledge for practitioners, researchers & humanity worldwide."}
            </p>
          </div>

          <div className="text-center font-devanagari text-xs text-[#D9A441] font-semibold px-3 py-1 rounded-full bg-[#181818] border border-[#2A2A2A] my-1 md:my-0">
            सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः • ॐ तत् सत्
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1A1A1A] hover:bg-[#FFD21F] text-[#D9A441] hover:text-[#111111] border border-[#333333] hover:border-[#FFD21F] transition-all cursor-pointer shadow-xs group"
          >
            <span className="font-semibold text-xs">
              {isHindi ? "शीर्ष पर जाएं" : "Back to Top"}
            </span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
