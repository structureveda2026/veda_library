import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  BookOpen,
  ArrowRight,
  Home,
  Sparkles,
  Layers,
  ChevronRight,
  Search,
  X
} from "lucide-react";
import { KNOWLEDGE_BRANCHES } from "../../data/knowledgePageData.js";
import { SACRED_ICON_MAP } from "../common/SacredIcons.jsx";
import { SACRED_QUOTE } from "../../data/libraryHomeData.js";
import bannerTempleGhat from "../../assets/images/library/banners/banner-temple-ghat.jpg";

export default function KnowledgePage({ onNavigateHome }) {
  const navigate = useNavigate();
  const [selectedBranchId, setSelectedBranchId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCardClick = (cardId) => {
    if (cardId === "veda") {
      navigate("/library/veda");
    } else if (cardId === "mahapuranas") {
      navigate("/library/purana");
    } else if (cardId === "ramayana") {
      navigate("/library/itihasa?tab=ramayana");
    } else if (cardId === "mahabharata" || cardId === "gita") {
      navigate("/library/itihasa?tab=mahabharata");
    } else if (cardId === "upanishad") {
      navigate("/library/upanishad");
    } else if (
      cardId === "samkhya" ||
      cardId === "yoga" ||
      cardId === "nyaya" ||
      cardId === "vaisheshika" ||
      cardId === "mimamsa" ||
      cardId === "vedanta"
    ) {
      navigate("/library/darshana");
    } else if (cardId === "rudrabhisheka") {
      navigate("/library/puja/shaiva/rudrabhisheka");
    } else if (cardId === "gayatri" || cardId === "mahamrityunjaya") {
      navigate("/library/mantra-stotra");
    } else if (cardId === "hora") {
      navigate("/library/jyotisha");
    } else if (cardId === "shodashopachara") {
      navigate("/library/puja");
    } else {
      navigate("/library/veda");
    }
  };

  const filteredBranches = useMemo(() => {
    return KNOWLEDGE_BRANCHES.map((b) => {
      if (selectedBranchId !== "all" && b.id !== selectedBranchId) {
        return null;
      }
      if (!searchQuery.trim()) return b;
      const q = searchQuery.toLowerCase().trim();
      const matchBranch =
        b.title.toLowerCase().includes(q) ||
        b.hindiTitle.toLowerCase().includes(q) ||
        b.subtitle.toLowerCase().includes(q) ||
        (b.subItems && b.subItems.some((s) => s.toLowerCase().includes(q)));

      const matchingCards = b.cards.filter((c) => {
        return (
          c.title.toLowerCase().includes(q) ||
          c.hindiTitle.toLowerCase().includes(q) ||
          c.desc.toLowerCase().includes(q) ||
          (c.badge && c.badge.toLowerCase().includes(q))
        );
      });

      if (matchBranch || matchingCards.length > 0) {
        return {
          ...b,
          cards: matchBranch && matchingCards.length === 0 ? b.cards : matchingCards
        };
      }
      return null;
    }).filter(Boolean);
  }, [selectedBranchId, searchQuery]);

  return (
    <div className="bg-[#FBF9F5] min-h-screen">
      {/* 1. Mobile-First Hero Header with Vivid Image Visibility */}
      <div className="relative bg-[#1A0E05] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-b-2 border-amber-600/70 overflow-hidden shadow-md">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerTempleGhat}
            alt="Temple Ghats"
            className="w-full h-full object-cover object-center opacity-80 scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140b05] via-[#1a0e05]/60 to-black/35" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/25 via-transparent to-black/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-medium text-amber-200/80 mb-2">
            <Link
              to="/"
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>›</span>
            <Link
              to="/library"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Veda Library
            </Link>
            <span>›</span>
            <span className="text-white font-semibold">Knowledge Branches</span>
          </div>

          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-500/15 border border-amber-400/30 px-3 py-1 rounded-full mb-2">
            १२ ज्ञान शाखाएँ • VEDIC TAXONOMY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
            Explore Knowledge Branches
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/90 font-devanagari max-w-2xl leading-relaxed">
            वेद, वेदाङ्ग, उपनिषद, दर्शन, धर्म, मंत्र, पूजा, ज्योतिष, आयुर्वेद एवं पारंपरिक ज्ञान का संपूर्ण संरचित संग्रह।
          </p>
        </div>
      </div>

      {/* 2. Sleek Horizontal Scrollable Filter Chips + Search Input */}
      <div className="sticky top-16 z-30 bg-[#fffdfa]/95 backdrop-blur-md border-b border-amber-200/80 py-2.5 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1">
            <button
              type="button"
              onClick={() => setSelectedBranchId("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedBranchId === "all"
                  ? "bg-amber-700 text-white shadow-xs font-bold"
                  : "bg-white text-stone-700 border border-stone-200 hover:border-amber-300 hover:bg-amber-50"
              }`}
            >
              All Branches (सभी १२ शाखाएँ)
            </button>

            {KNOWLEDGE_BRANCHES.map((b) => {
              const isSelected = selectedBranchId === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBranchId(b.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-amber-700 text-white shadow-xs font-bold"
                      : "bg-white text-stone-700 border border-stone-200 hover:border-amber-300 hover:bg-amber-50"
                  }`}
                >
                  {b.title} ({b.hindiTitle})
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[200px] sm:min-w-[260px] shrink-0">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ज्ञान शाखा या विषय खोजें..."
              className="w-full pl-8 pr-7 py-1.5 rounded-xl text-xs bg-white border border-stone-200 focus:border-amber-400 focus:outline-none placeholder:text-stone-400 font-devanagari shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="p-1 text-stone-400 hover:text-stone-700 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Main Content: Flowing Knowledge Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {filteredBranches.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 shadow-2xs space-y-3">
            <p className="font-serif text-lg font-bold text-stone-800">
              खोजे गए शब्द के अनुसार कोई ज्ञान शाखा अथवा विषय नहीं मिला।
            </p>
            <p className="text-xs text-stone-500 font-devanagari">
              कृपया भिन्न कीवर्ड टाइप करें या फ़िल्टर रीसेट करें।
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedBranchId("all");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold shadow-xs hover:bg-amber-700 cursor-pointer"
            >
              फ़िल्टर रीसेट करें (Reset Filter)
            </button>
          </div>
        ) : (
          filteredBranches.map((branch) => (
          <section
            key={branch.id}
            id={branch.id}
            className="bg-white p-5 sm:p-7 rounded-3xl border border-amber-200/60 shadow-xs space-y-6"
          >
            {/* Branch Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-amber-100 gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 font-devanagari">
                    {branch.hindiTitle}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-xs text-stone-500 font-medium">
                    {branch.subItems?.length || branch.cards.length} Sub-divisions
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {branch.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-devanagari mt-0.5">
                  {branch.subtitle}
                </p>
              </div>

              {branch.subItems && (
                <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
                  {branch.subItems.slice(0, 4).map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-900 border border-amber-200/70"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Cards Grid: 1 col on mobile, 2 col on tablet, 3 or 4 col on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {branch.cards.map((card) => {
                const IconComponent = SACRED_ICON_MAP[card.icon];
                return (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className="group p-4 sm:p-5 rounded-2xl bg-white border border-amber-200/70 hover:border-amber-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-3.5 cursor-pointer"
                  >
                    {/* Pastel Circle Icon Badge */}
                    <div
                      className={`w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${card.badgeBg}`}
                    >
                      {IconComponent ? (
                        <IconComponent className={`w-6 h-6 ${card.iconColor}`} />
                      ) : (
                        <BookOpen className="w-5 h-5 text-amber-700" />
                      )}
                    </div>

                    {/* Content Box */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between min-h-[85px]">
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors truncate">
                            {card.title}
                          </h3>
                          <span className="text-[10px] font-devanagari text-stone-400 flex-shrink-0">
                            {card.hindiTitle}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed line-clamp-2">
                          {card.desc}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-medium text-stone-500">
                          {card.sectionsCount}
                        </span>
                        <span className="text-amber-700 group-hover:text-amber-900 font-bold flex items-center gap-1 transition-colors">
                          Explore →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Related Tags */}
            {branch.relatedTags && (
              <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
                <span className="font-semibold text-stone-700 text-[11px]">Related:</span>
                {branch.relatedTags.map((t) => (
                  <span
                    key={t}
                    onClick={() => navigate("/library/veda")}
                    className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 hover:bg-amber-100 hover:text-amber-900 cursor-pointer transition-colors text-[11px]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </section>
        )))}

        {/* Sacred Quote Card */}
        <div className="relative rounded-3xl overflow-hidden border border-amber-200/80 shadow-xs bg-gradient-to-r from-amber-50/90 via-[#fff8eb] to-amber-50/90 p-6 sm:p-8 text-center">
          <div className="relative z-10 max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              तैत्तिरीयोपनिषद्
            </span>
            <p className="font-devanagari text-lg sm:text-xl font-bold text-amber-950">
              “{SACRED_QUOTE.sanskrit}”
            </p>
            <p className="font-serif italic text-xs sm:text-sm text-stone-700">
              "{SACRED_QUOTE.translation}"
            </p>
            <span className="text-xs font-semibold text-amber-900 block">
              — {SACRED_QUOTE.source}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
