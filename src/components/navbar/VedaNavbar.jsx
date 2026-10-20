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
  const { language, setLanguage, isHindi, isEnglish, t } = useLanguage();

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
    if (path.startsWith("/library/knowledge")) return "explore";
    if (path.startsWith("/library/collections")) return "grantha";
    if (
      path.startsWith("/library/mantra-stotra") ||
      path.startsWith("/library/mantra")
    )
      return "mantra-stotra";
    if (
      path.startsWith("/library/veda") ||
      path.startsWith("/library/puja")
    )
      return "explore";
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

  // Nav items dynamically updated based on selected language
  const navItems = [
    { id: "home", label: isHindi ? "होम" : "Home", path: "/library" },
    { id: "explore", label: isHindi ? "वेद ज्ञान" : "Explore", path: "/library/knowledge" },
    { id: "grantha", label: isHindi ? "ग्रंथ संग्रह" : "Grantha", path: "/library/collections" },
    { id: "mantra-stotra", label: isHindi ? "मंत्र एवं स्तोत्र" : "Mantra & Stotra", path: "/library/mantra-stotra" },
    { id: "articles", label: isHindi ? "शास्त्रीय आलेख" : "Blogs & Articles", path: "/library/articles" },
    { id: "topics", label: isHindi ? "प्रमुख विषय" : "Topics", path: "/library/knowledge" },
    { id: "research", label: isHindi ? "अनुसंधान" : "Research", path: "/library/knowledge" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 border-t-2 border-amber-500/90 ${
        isScrolled
          ? "bg-[#fffdf8]/95 backdrop-blur-xl border-b border-amber-200/90 shadow-md py-2.5"
          : "bg-[#fffdfa]/90 backdrop-blur-md border-b border-amber-200/70 shadow-2xs py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Title */}
          <Link
            to="/library"
            onClick={(e) => handleNavClick("home", "/library", e)}
            className="flex items-center gap-3 group focus:outline-none flex-shrink-0 cursor-pointer text-left select-none"
          >
            {/* Sacred Lotus / Surya Emblem */}
            <div className="relative">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-500/25 ring-2 ring-amber-300/40 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-amber-500/40 transition-all duration-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="w-6 h-6 text-amber-50 animate-pulse"
                >
                  <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                  <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
                  <path
                    d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"
                    opacity="0.2"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#18110b] border border-amber-400/60 flex items-center justify-center text-[8px] font-bold text-amber-400">
                ॐ
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.14em] text-stone-900 group-hover:text-amber-800 transition-colors leading-none">
                  VEDA LIBRARY
                </span>
              </div>
              {/* Document-specified Hindi subtitle */}
              <span className="block text-[10px] font-devanagari font-semibold text-amber-800/85 mt-0.5 leading-tight">
                वैदिक एवं भारतीय ज्ञान परंपरा का डिजिटल संग्रह
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation — Document-specified 6 items */}
          <nav className="hidden lg:flex items-center gap-1 bg-amber-50/40 p-1 rounded-2xl border border-amber-200/50 shadow-2xs">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={(e) => handleNavClick(item.id, item.path, e)}
                  className={`relative px-4 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-white text-amber-950 font-bold shadow-xs border border-amber-300/70"
                      : "text-stone-700 hover:text-amber-900 hover:bg-white/60"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <span className="block w-1 h-1 rounded-full bg-amber-600 mx-auto mt-0.5" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search Pill + Language Tag + Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Desktop Pill Search Bar */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-amber-200/90 hover:border-amber-400 hover:bg-amber-50/60 text-stone-500 hover:text-stone-800 transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-amber-700 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium pr-3 text-stone-600">Search library...</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300/70 font-semibold shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Interactive Hindi / English Language Switcher */}
            <div className="flex items-center bg-amber-100/70 p-0.5 rounded-full border border-amber-300/80 shadow-2xs">
              <button
                type="button"
                onClick={() => setLanguage("hi")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  isHindi
                    ? "bg-gradient-to-r from-amber-700 to-amber-900 text-white shadow-xs"
                    : "text-amber-950/70 hover:text-amber-950 hover:bg-white/50"
                }`}
                title="हिन्दी भाषा चुनें"
              >
                <span className="font-devanagari">हिन्दी</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  isEnglish
                    ? "bg-gradient-to-r from-amber-700 to-amber-900 text-white shadow-xs"
                    : "text-amber-950/70 hover:text-amber-950 hover:bg-white/50"
                }`}
                title="Switch to English"
              >
                <span>EN</span>
              </button>
            </div>

            {/* Mobile Search Icon */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="sm:hidden p-2 rounded-xl text-stone-700 hover:bg-amber-100/70 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-amber-800" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-amber-100/70 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-amber-900" />
              ) : (
                <Menu className="w-6 h-6 text-stone-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-200 bg-[#fffdf8]/98 backdrop-blur-xl px-4 py-4 space-y-3 animate-fadeIn shadow-lg">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-200/90 shadow-2xs">
            <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-700" />
              <span>{isHindi ? "भाषा (Language):" : "Language:"}</span>
            </span>
            <div className="flex items-center bg-white p-0.5 rounded-lg border border-amber-300">
              <button
                type="button"
                onClick={() => setLanguage("hi")}
                className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                  isHindi ? "bg-amber-800 text-white shadow-2xs" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                  isEnglish ? "bg-amber-800 text-white shadow-2xs" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                English
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white border border-amber-200 text-stone-600 text-sm font-medium shadow-2xs cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-700" />
              Search Veda, Grantha, Mantra...
            </span>
            <kbd className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
              ⌘K
            </kbd>
          </button>

          <div className="space-y-1 pt-2">
            {[
              { label: "Home (मुख्य पृष्ठ)", path: "/library", icon: BookOpen },
              { label: "Explore (ज्ञान शाखाएँ)", path: "/library/knowledge", icon: Layers },
              { label: "Grantha (ग्रंथ संग्रह)", path: "/library/collections", icon: Scroll },
              { label: "Mantra & Stotra (मंत्र संग्रह)", path: "/library/mantra-stotra", icon: FileText },
              { label: "Blogs & Articles (लेख व शोध)", path: "/library/articles", icon: BookOpen },
              { label: "Topics (विषय सूची)", path: "/library/knowledge", icon: Compass },
              { label: "Research (शोध)", path: "/library/knowledge", icon: Sparkles },
            ].map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={(e) => handleNavClick("view", link.path, e)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-stone-800 hover:bg-amber-50 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-amber-700" />
                    <span>{link.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
