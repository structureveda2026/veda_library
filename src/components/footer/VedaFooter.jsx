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
    <footer className="relative bg-[#111111] text-[#FFFFFF] pt-0 pb-10 border-t-2 border-[#D9A441] overflow-hidden">
      {/* 1. Top Sacred Vedic Shanti Mantra Ribbon */}
      <div className="border-b border-[#222222] bg-[#181818] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse flex-shrink-0" />
            <p className="font-devanagari text-xs sm:text-sm font-semibold text-[#FFFFFF] tracking-wide">
              ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः वनस्पतयः शान्तिः ॥
            </p>
          </div>
          <span className="font-devanagari text-xs font-bold text-[#FFD21F] px-3 py-0.5 rounded-full bg-[#222222] border border-[#D9A441]/40">
            यजुर्वेद ३६.१७ • ॐ शान्तिः शान्तिः शान्तिः
          </span>
        </div>
      </div>

      {/* 2. Main 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-[#222222]">

          {/* Column 1: Brand Heritage & Purpose (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Logo Emblem */}
            <Link
              to="/library"
              onClick={(e) => handleLinkClick("/library", e)}
              className="flex items-center gap-3 group focus:outline-none cursor-pointer inline-flex"
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-[#FFD21F] flex items-center justify-center text-[#111111] shadow-md ring-2 ring-[#D9A441]/50 group-hover:bg-[#D9A441] group-hover:scale-105 transition-all">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="w-6 h-6 text-[#111111]"
                  >
                    <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.25" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                    <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
                  </svg>
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#111111] border border-[#FFD21F] flex items-center justify-center text-[9px] font-bold text-[#FFD21F]">
                  ॐ
                </span>
              </div>

              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.12em] text-[#FFFFFF] group-hover:text-[#FFD21F] transition-colors leading-none block">
                  VEDA LIBRARY
                </span>
                <span className="block text-[10px] tracking-[0.08em] uppercase font-semibold text-[#D9A441] mt-1 leading-tight">
                  Vedic & Traditional Knowledge Archive
                </span>
              </div>
            </Link>

            <p className="text-xs font-devanagari text-[#999999] leading-relaxed max-w-sm">
              भारतीय वैदिक एवं शास्त्रीय ज्ञान का डिजिटल संग्रह।
            </p>

            {/* Trust Badges */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-xs font-medium text-[#E5E5E5]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A441] flex-shrink-0" />
                <span>100% Source-Verified Sanskrit Corpus</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#E5E5E5]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A441] flex-shrink-0" />
                <span>Text-First Canonical Structure & Pada-Patha</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#E5E5E5]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A441] flex-shrink-0" />
                <span>Open Digital Heritage for Practitioners & Scholars</span>
              </div>
            </div>

            {/* Quick Search Trigger */}
            {onOpenSearch && (
              <button
                type="button"
                onClick={onOpenSearch}
                className="mt-3 inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#1A1A1A] border border-[#333333] hover:border-[#FFD21F] text-[#E5E5E5] hover:text-[#FFFFFF] transition-all text-xs font-medium cursor-pointer shadow-xs group"
              >
                <Search className="w-3.5 h-3.5 text-[#FFD21F] group-hover:scale-110 transition-transform" />
                <span>{isHindi ? "पुस्तकालय में खोजें" : "Quick Search Library"}</span>
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#222222] text-[#FFD21F] border border-[#333333]">
                  ⌘K
                </kbd>
              </button>
            )}
          </div>

          {/* Column 2: Explore — 8 Doc-Specified Categories (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#FFD21F] border-b border-[#222222] pb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{isHindi ? "ज्ञान शाखाएँ" : "Explore"}</span>
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-xs font-medium">
              {[
                { label: isHindi ? "वेद (The Vedas)" : "The Vedas (वेद)", path: "/library/veda" },
                { label: isHindi ? "वेदाङ्ग (Vedangas)" : "Vedangas (वेदाङ्ग)", path: "/library/vedanga" },
                { label: isHindi ? "उपनिषद एवं दर्शन" : "Upanishad & Darshan", path: "/library/upanishad" },
                { label: isHindi ? "पुराण एवं इतिहास" : "Purana & Itihasa", path: "/library/purana-itihasa" },
                { label: isHindi ? "मंत्र, सूक्त एवं स्तोत्र" : "Mantra, Sukta & Stotra", path: "/library/mantra-stotra" },
                { label: isHindi ? "ज्योतिष (Jyotisha)" : "Jyotisha (Astrology)", path: "/library/jyotisha" },
                { label: isHindi ? "वास्तु (Vastu Shastra)" : "Vastu Shastra (वास्तु)", path: "/library/vastu" },
                { label: isHindi ? "शास्त्र (Classical Shastras)" : "Classical Shastras", path: "/library/shastra" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    onClick={(e) => handleLinkClick(link.path, e)}
                    className="hover:text-[#FFD21F] hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-[#E5E5E5] py-1 min-h-[36px]"
                  >
                    <span className="text-[#D9A441] text-[10px]">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#FFD21F] border-b border-[#222222] pb-2 flex items-center gap-1.5">
              <Scroll className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{isHindi ? "संसाधन" : "Resources"}</span>
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-xs font-medium">
              {[
                { label: isHindi ? "ग्रंथ संग्रह (Grantha)" : "Grantha Archive", path: "/library/collections" },
                { label: isHindi ? "शास्त्रीय आलेख व शोध" : "Articles & Research", path: "/library/articles" },
                { label: isHindi ? "विषय सूची (Topics)" : "Canonical Topics", path: "/library/knowledge" },
                { label: isHindi ? "शास्त्रीय शब्दकोश" : "Vedic Glossary", path: "/library/knowledge" },
                { label: isHindi ? "अनुसंधान (Research)" : "Research & Manuscripts", path: "/library/knowledge" },
                { label: isHindi ? "संदर्भ एवं भाष्य" : "Commentaries & Citations", path: "/source-attribution" },
                { label: isHindi ? "दुर्लभ पाण्डुलिपियाँ" : "Rare Texts & Archives", path: "/library/knowledge" },
                { label: isHindi ? "ज्ञान संबंध रेखाचित्र" : "Knowledge Connection Graph", path: "/library/knowledge" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    onClick={(e) => handleLinkClick(link.path, e)}
                    className="hover:text-[#FFD21F] hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-[#E5E5E5] py-1 min-h-[36px]"
                  >
                    <span className="text-[#D9A441] text-[10px]">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Veda Structure (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#FFD21F] border-b border-[#222222] pb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{isHindi ? "वेद संरचना" : "Veda Structure"}</span>
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-xs font-medium text-[#999999]">
              {[
                { label: isHindi ? "पुस्तकालय परिचय (About)" : "About Veda Library", path: "/about" },
                { label: isHindi ? "संपादकीय नीति (Editorial Policy)" : "Editorial Policy", path: "/editorial-policy" },
                { label: isHindi ? "स्रोत एवं उद्धरण नीति" : "Source & Attribution Policy", path: "/source-attribution" },
                { label: isHindi ? "योगदान निर्देशिका (Contribute)" : "Contribution Guidelines", path: "/contribute" },
                { label: isHindi ? "विद्वान निर्देशिका (Scholars)" : "Scholars Directory", path: "/scholars" },
                { label: isHindi ? "संपर्क (Contact Us)" : "Contact", path: "/contact" },
                { label: isHindi ? "गोपनीयता नीति (Privacy)" : "Privacy Policy", path: "/privacy-policy" },
                { label: isHindi ? "नियम एवं शर्तें (Terms)" : "Terms of Service", path: "/terms" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    onClick={(e) => handleLinkClick(link.path, e)}
                    className="hover:text-[#FFD21F] transition-colors cursor-pointer flex items-center gap-1.5 py-1 min-h-[36px]"
                  >
                    <span className="text-[#D9A441] text-[10px]">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-[#1C1C1C] border border-[#D9A441]/40 text-[#D9A441] font-devanagari">
                धर्मो रक्षति रक्षितः
              </span>
            </div>
          </div>
        </div>

        {/* 3. Scholarly Trust Ribbon Strip */}
        <div className="py-6 border-b border-[#222222] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs text-[#999999]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F] flex-shrink-0" />
            <span><strong className="text-[#FFFFFF]">Text-First:</strong> शुद्ध मूल पाठ एवं स्वर</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D9A441] flex-shrink-0" />
            <span><strong className="text-[#FFFFFF]">Source-Based:</strong> ग्रंथ व श्लोक प्रमाण</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] flex-shrink-0" />
            <span><strong className="text-[#FFFFFF]">Non-Sectarian:</strong> सर्वसमावेशी निष्पक्ष शोध</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F] flex-shrink-0" />
            <span><strong className="text-[#FFFFFF]">Living Heritage:</strong> सनातन ज्ञान परंपरा</span>
          </div>
        </div>

        {/* 4. Bottom Copyright & Blessing Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#777777] gap-4">
          <div className="text-center md:text-left space-y-0.5">
            <p className="text-[#999999] font-medium">
              {isHindi
                ? "© 2026 वेद लाइब्रेरी • वेद स्ट्रक्चर प्रोजेक्ट। समस्त सर्वाधिकार सुरक्षित।"
                : "© 2026 Veda Library • Veda Structure Project. All Rights Reserved."}
            </p>
            <p className="text-[11px] text-[#777777]">
              {isHindi
                ? "समस्त मानव समाज, शोधकर्ताओं व साधकों हेतु सनातन ज्ञान परंपरा का डिजिटल संरक्षण।"
                : "Preserving and digitizing traditional knowledge for practitioners, researchers & humanity worldwide."}
            </p>
          </div>

          <div className="text-center font-devanagari text-xs text-[#D9A441] font-semibold px-4 py-1.5 rounded-full bg-[#181818] border border-[#2A2A2A]">
            सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः • ॐ तत् सत्
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="min-h-[44px] flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A1A1A] hover:bg-[#FFD21F] text-[#D9A441] hover:text-[#111111] border border-[#333333] hover:border-[#FFD21F] transition-all cursor-pointer shadow-xs group"
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
