import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  Sparkles,
  BookOpen,
  Layers,
  Scroll,
  FileText,
  Compass,
  ArrowRight,
  Globe,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function VedaNavbar({
  currentView = "home",
  onNavigate,
  onOpenSearch,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, isHindi, isEnglish, isHinglish, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/" || path === "/library" || path === "/library/") return "home";
    if (
      path.startsWith("/library/blogs") ||
      path.startsWith("/library/articles") ||
      path.startsWith("/blogs") ||
      path.startsWith("/articles")
    )
      return "articles";
    if (
      path.startsWith("/library/veda") ||
      path.startsWith("/category/veda") ||
      path.startsWith("/library/upanishad") ||
      path.startsWith("/upanishad")
    )
      return "veda-upanishad";
    if (
      path.startsWith("/library/mantra-stotra") ||
      path.startsWith("/library/mantra") ||
      path.startsWith("/mantras") ||
      path.startsWith("/stotram")
    )
      return "mantra-stotra";
    if (
      path.startsWith("/library/jyotish") ||
      path.startsWith("/category/jyotish") ||
      path.startsWith("/category/vedanga") ||
      path.startsWith("/library/vedanga")
    )
      return "jyotish-shastra";
    if (path.startsWith("/about")) return "about";
    if (path.startsWith("/library/knowledge") || path.startsWith("/library/collections")) return "explore";
    return currentView || "home";
  };

  const activeTab = getActiveTab();

  const handleNavClick = (view, path, e) => {
    if (e) e.preventDefault();
    if (onNavigate) onNavigate(view);
    if (navigate && path) navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  // Nav items matching Document Section 3.1 (Header and navigation specifications)
  const navItems = [
    { id: "home", label: isHindi ? "होम" : "Home", path: "/library" },
    { id: "explore", label: isHindi ? "ज्ञान अन्वेषण" : "Browse Knowledge", path: "/library/knowledge" },
    { id: "veda-upanishad", label: isHindi ? "वेद व उपनिषद" : "Vedas & Upanishads", path: "/library/veda" },
    { id: "mantra-stotra", label: isHindi ? "मंत्र व स्तोत्र" : "Mantra & Stotram", path: "/library/mantra-stotra/all" },
    { id: "jyotish-shastra", label: isHindi ? "ज्योतिष व शास्त्र" : "Jyotish & Shastra", path: "/library/jyotisha" },
    { id: "articles", label: isHindi ? "आलेख" : "Articles", path: "/library/articles" },
    { id: "about", label: isHindi ? "परिचय" : "About", path: "/about" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 border-t-2 border-[#FFD21F] ${
        isScrolled
          ? "bg-[#FFFFFF]/98 backdrop-blur-md border-b border-[#E5E5E5] shadow-xs py-2.5"
          : "bg-[#FFFFFF] border-b border-[#E5E5E5] py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-1.5 sm:gap-4">
          {/* Left: Brand Logo & Title */}
          <Link
            to="/library"
            onClick={(e) => handleNavClick("home", "/library", e)}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0 flex-shrink-0 cursor-pointer text-left select-none whitespace-nowrap"
          >
            {/* Sacred Lotus / Surya Emblem */}
            <div className="relative shrink-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#FFD21F] flex items-center justify-center text-[#111111] shadow-2xs ring-2 ring-[#D9A441]/40 group-hover:bg-[#D9A441] group-hover:scale-105 transition-all duration-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#111111]"
                >
                  <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.25" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                  <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
                  <path
                    d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"
                    opacity="0.15"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#111111] border border-[#FFD21F] flex items-center justify-center text-[8px] font-bold text-[#FFD21F]">
                ॐ
              </span>
            </div>

            <div className="shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg sm:text-2xl font-bold tracking-[0.08em] sm:tracking-[0.12em] text-[#111111] group-hover:text-[#D9A441] transition-colors leading-none whitespace-nowrap">
                  VEDA LIBRARY
                </span>
              </div>
              {/* Document-specified Hindi/English subtitle */}
              <span className="hidden md:block text-[10px] font-semibold text-[#555555] mt-1 leading-tight whitespace-nowrap">
                {isHindi ? "वैदिक एवं भारतीय ज्ञान परंपरा का डिजिटल संग्रह" : "Digital Archive of Vedic & Indian Wisdom"}
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation — Master Clean Styled */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#FFFFFF] p-1 rounded-2xl border border-[#E5E5E5]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={(e) => handleNavClick(item.id, item.path, e)}
                  className={`relative px-4 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#FFD21F] text-[#111111] font-bold shadow-xs border border-[#FFD21F]"
                      : "text-[#111111] hover:text-[#111111] hover:bg-[#FFFFFF]"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Quick Search CTA + Language Tag + Mobile Toggle */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Desktop Quick Search CTA Button in #FFD21F */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-semibold transition-all shadow-2xs hover:shadow-xs group cursor-pointer border border-[#FFD21F]"
            >
              <Search className="w-3.5 h-3.5 text-[#111111] group-hover:scale-110 transition-transform" />
              <span className="text-xs">{isHindi ? "त्वरित खोज" : "Quick Search"}</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#111111] text-[#FFD21F] font-bold">
                ⌘K
              </kbd>
            </button>

            {/* Interactive Hindi / English Language Switcher */}
            <div className="flex items-center bg-[#FFFFFF] p-0.5 rounded-xl border border-[#E5E5E5] whitespace-nowrap flex-shrink-0">
              <button
                type="button"
                onClick={() => setLanguage("hi")}
                className={`flex items-center justify-center gap-1 min-h-[32px] sm:min-h-[36px] px-2 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isHindi
                    ? "bg-[#111111] text-[#FFD21F] shadow-xs"
                    : "text-[#555555] hover:text-[#111111] hover:bg-[#FFFFFF]"
                }`}
                title="हिन्दी भाषा चुनें"
              >
                <span className="font-devanagari">हिन्दी</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`flex items-center justify-center gap-1 min-h-[32px] sm:min-h-[36px] px-2 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isEnglish
                    ? "bg-[#111111] text-[#FFD21F] shadow-xs"
                    : "text-[#555555] hover:text-[#111111] hover:bg-[#FFFFFF]"
                }`}
                title="Switch to English"
              >
                <span>English</span>
              </button>
            </div>

            {/* Mobile Search Icon - Section 40: Minimum 44px Touch Target */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="sm:hidden min-h-[40px] min-w-[40px] flex items-center justify-center p-2 rounded-xl text-[#111111] bg-[#FFD21F] hover:bg-[#D9A441] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#111111]" />
            </button>

            {/* Mobile Menu Toggle - Section 40: Minimum 44px Touch Target */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden min-h-[40px] min-w-[40px] flex items-center justify-center p-2 rounded-xl text-[#111111] hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#111111]" />
              ) : (
                <Menu className="w-6 h-6 text-[#111111]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E5E5] bg-[#FFFFFF] px-4 py-4 space-y-3 animate-fadeIn shadow-lg">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F9F9F9] border border-[#E5E5E5]">
            <span className="text-xs font-bold text-[#111111] flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#D9A441]" />
              <span>{isHindi ? "भाषा चयन:" : "Language:"}</span>
            </span>
            <div className="flex items-center bg-[#FFFFFF] p-0.5 rounded-lg border border-[#E5E5E5] whitespace-nowrap flex-shrink-0">
              <button
                type="button"
                onClick={() => setLanguage("hi")}
                className={`min-h-[40px] px-3.5 py-2 rounded-md text-xs font-bold transition cursor-pointer flex items-center justify-center whitespace-nowrap ${
                  isHindi ? "bg-[#111111] text-[#FFD21F] shadow-2xs" : "text-[#555555] hover:text-[#111111]"
                }`}
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`min-h-[40px] px-3.5 py-2 rounded-md text-xs font-bold transition cursor-pointer flex items-center justify-center whitespace-nowrap ${
                  isEnglish ? "bg-[#111111] text-[#FFD21F] shadow-2xs" : "text-[#555555] hover:text-[#111111]"
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Mobile Search Button */}
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="w-full min-h-[44px] flex items-center justify-between px-4 py-3 rounded-xl bg-[#FFD21F] text-[#111111] text-sm font-semibold shadow-2xs hover:bg-[#D9A441] cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#111111]" />
              {isHindi ? "पुस्तकालय में खोजें..." : "Search Veda, Grantha, Mantra..."}
            </span>
            <kbd className="text-[10px] px-2 py-0.5 rounded bg-[#111111] text-[#FFD21F] font-bold">
              ⌘K
            </kbd>
          </button>

          <div className="space-y-1 pt-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={(e) => handleNavClick(item.id, item.path, e)}
                  className={`w-full min-h-[44px] flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-colors ${
                    isActive
                      ? "bg-[#FFD21F] text-[#111111] font-bold"
                      : "text-[#111111] hover:bg-[#F5F5F5]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-[#111111]" />
                    <span>{item.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#555555]" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
