import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import SEO from "../common/SEO.jsx";
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
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function KnowledgePage({ onNavigateHome }) {
  const navigate = useNavigate();
  const { isHindi } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [selectedBranchId, setSelectedBranchId] = useState("all");
  const [searchQuery, setSearchQuery] = useState(queryParam);

  useEffect(() => {
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (val.trim()) {
      setSearchParams({ q: val.trim() });
    } else {
      setSearchParams({});
    }
  };

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

  const searchSchema = [
    {
      "@type": "CollectionPage",
      name: searchQuery ? `खोज परिणाम: "${searchQuery}" | Veda Library` : "Browse Knowledge — ज्ञान अन्वेषण | Veda Library",
      description: "वैदिक एवं भारतीय ज्ञान परंपरा का प्रामाणिक खोज एवं अन्वेषण पृष्ठ।",
      url: `https://library.vedastructure.com/search${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`,
      inLanguage: ["hi", "en", "sa"]
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isHindi ? "होम" : "Home",
          item: "https://library.vedastructure.com/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: isHindi ? "ज्ञान अन्वेषण" : "Browse Knowledge",
          item: "https://library.vedastructure.com/search"
        }
      ]
    }
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111111]">
      <SEO
        title={searchQuery ? `"${searchQuery}" — खोज परिणाम | Veda Library` : "Browse Knowledge — ज्ञान अन्वेषण | Veda Library"}
        description="वेद, वेदाङ्ग, उपनिषद, दर्शन, धर्म, मंत्र, पूजा, ज्योतिष एवं पारंपरिक ज्ञान का संपूर्ण संरचित संग्रह।"
        canonical="/search"
        schema={searchSchema}
      />
      {/* 1. Mobile-First Hero Header with Vivid Image Visibility */}
      <div className="relative bg-[#111111] text-white py-5 sm:py-7 px-4 sm:px-6 lg:px-8 border-b border-[#E5E5E5] overflow-hidden shadow-xs">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerTempleGhat}
            alt="Temple Ghats"
            className="w-full h-full object-cover object-center opacity-85 scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/45 to-[#111111]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/80 via-transparent to-[#111111]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-[#111111]/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-medium text-white/80 mb-1.5">
            <Link
              to="/"
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{isHindi ? "होम" : "Home"}</span>
            </Link>
            <span className="text-[#D9A441]">›</span>
            <Link
              to="/library"
              className="hover:text-white transition-colors cursor-pointer"
            >
              {isHindi ? "वेद लाइब्रेरी" : "Veda Library"}
            </Link>
            <span className="text-[#D9A441]">›</span>
            <span className="text-[#FFD21F] font-semibold">
              {isHindi ? "ज्ञान शाखाएँ" : "Knowledge Branches"}
            </span>
          </div>

          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#111111] bg-[#FFD21F] border border-[#FFD21F] px-2.5 py-0.5 rounded-full mb-1.5 shadow-xs">
            {isHindi ? "१२ ज्ञान शाखाएँ • वैदिक वर्गीकरण" : "12 KNOWLEDGE BRANCHES • VEDIC TAXONOMY"}
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-1">
            {isHindi ? "ज्ञान शाखाओं का अन्वेषण" : "Explore Knowledge Branches"}
          </h1>
          <p className="text-xs sm:text-sm text-white/90 font-devanagari max-w-2xl leading-relaxed">
            {isHindi
              ? "वेद, वेदाङ्ग, उपनिषद, दर्शन, धर्म, मंत्र, पूजा, ज्योतिष, आयुर्वेद एवं पारंपरिक ज्ञान का संपूर्ण संरचित संग्रह।"
              : "Comprehensive structured archive of Vedas, Vedangas, Upanishads, Darshanas, Mantras and classical Vedic knowledge."}
          </p>
        </div>
      </div>

      {/* 2. Sleek Horizontal Scrollable Filter Chips + Search Input */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] py-2.5 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1">
            <button
              type="button"
              onClick={() => setSelectedBranchId("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedBranchId === "all"
                  ? "bg-[#FFD21F] text-[#111111] shadow-xs font-bold border border-[#FFD21F]"
                  : "bg-white text-[#555555] border border-[#E5E5E5] hover:border-[#D9A441] hover:text-[#111111] hover:bg-stone-50"
              }`}
            >
              {isHindi ? "सभी १२ शाखाएँ" : "All 12 Branches"}
            </button>

            {KNOWLEDGE_BRANCHES.map((b) => {
              const isSelected = selectedBranchId === b.id;
              const branchLabel = isHindi ? b.hindiTitle : b.title;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBranchId(b.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-[#FFD21F] text-[#111111] shadow-xs font-bold border border-[#FFD21F]"
                      : "bg-white text-[#555555] border border-[#E5E5E5] hover:border-[#D9A441] hover:text-[#111111] hover:bg-stone-50"
                  }`}
                >
                  {branchLabel}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[200px] sm:min-w-[260px] shrink-0">
            <Search className="w-3.5 h-3.5 text-[#D9A441] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={isHindi ? "ज्ञान शाखा या विषय खोजें..." : "Search knowledge branch or topic..."}
              className="w-full pl-8 pr-7 py-1.5 rounded-xl text-xs bg-white border border-[#E5E5E5] focus:border-[#D9A441] focus:outline-none placeholder:text-[#555555]/60 font-devanagari shadow-xs text-[#111111]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="p-1 text-[#555555] hover:text-[#111111] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Main Content: Flowing Knowledge Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-6">
        {filteredBranches.length === 0 ? (
          <div className="p-6 sm:p-8 text-center bg-white rounded-2xl border border-[#E5E5E5] shadow-xs space-y-3">
            <p className="font-serif text-lg font-bold text-[#111111]">
              {isHindi ? "खोजे गए शब्द के अनुसार कोई ज्ञान शाखा अथवा विषय नहीं मिला।" : "No knowledge branches or topics found matching your search."}
            </p>
            <p className="text-xs text-[#555555] font-devanagari">
              {isHindi ? "कृपया भिन्न कीवर्ड टाइप करें या फ़िल्टर रीसेट करें।" : "Please try a different keyword or reset the filter."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedBranchId("all");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFD21F] text-[#111111] text-xs font-bold shadow-xs hover:bg-[#ffe052] cursor-pointer"
            >
              {isHindi ? "फ़िल्टर रीसेट करें" : "Reset Filter"}
            </button>
          </div>
        ) : (
          filteredBranches.map((branch) => {
            const subItemList = isHindi ? (branch.hindiSubItems || branch.subItems) : branch.subItems;
            const relatedTagList = isHindi ? (branch.hindiRelatedTags || branch.relatedTags) : branch.relatedTags;
            const branchSubtitle = isHindi ? (branch.hindiSubtitle || branch.subtitle) : branch.subtitle;

            return (
              <section
                key={branch.id}
                id={branch.id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5E5E5] shadow-xs space-y-4"
              >
                {/* Branch Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E5E5] gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D9A441] font-devanagari">
                        {isHindi ? branch.hindiTitle : branch.title}
                      </span>
                      <span className="text-stone-300">•</span>
                      <span className="text-xs text-[#555555] font-medium">
                        {branch.subItems?.length || branch.cards.length} {isHindi ? "उप-विभाग" : "Sub-divisions"}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                      {isHindi ? branch.hindiTitle : branch.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#555555] font-devanagari mt-0.5">
                      {branchSubtitle}
                    </p>
                  </div>

                  {subItemList && subItemList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
                      {subItemList.slice(0, 4).map((sub, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-stone-50 text-[#111111] border border-[#E5E5E5]"
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
                    const cardTitle = isHindi ? card.hindiTitle : card.title;
                    const cardDesc = isHindi ? (card.hindiDesc || card.desc) : card.desc;
                    const cardCount = isHindi ? (card.hindiSectionsCount || card.sectionsCount) : card.sectionsCount;

                    return (
                      <div
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        className="group p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-3.5 cursor-pointer"
                      >
                        {/* Pastel Circle Icon Badge */}
                        <div
                          className={`w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${card.badgeBg}`}
                        >
                          {IconComponent ? (
                            <IconComponent className={`w-6 h-6 ${card.iconColor}`} />
                          ) : (
                            <BookOpen className="w-5 h-5 text-[#D9A441]" />
                          )}
                        </div>

                        {/* Content Box */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between min-h-[85px]">
                          <div>
                            <div className="flex items-center justify-between gap-1">
                              <h3 className="font-serif text-base sm:text-lg font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors truncate">
                                {cardTitle}
                              </h3>
                            </div>
                            <p className="text-xs text-[#555555] mt-1 leading-relaxed line-clamp-2 font-devanagari">
                              {cardDesc}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-[#E5E5E5] flex items-center justify-between text-xs">
                            <span className="text-[11px] font-medium text-[#555555]">
                              {cardCount}
                            </span>
                            <span className="text-[#111111] group-hover:text-[#D9A441] font-bold flex items-center gap-1 transition-colors">
                              {isHindi ? "अन्वेषण करें →" : "Explore →"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Related Tags */}
                {relatedTagList && relatedTagList.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-[#555555]">
                    <span className="font-semibold text-[#111111] text-[11px]">
                      {isHindi ? "संबंधित विषय:" : "Related:"}
                    </span>
                    {relatedTagList.map((t) => (
                      <span
                        key={t}
                        onClick={() => navigate("/library/veda")}
                        className="px-2 py-0.5 rounded-md bg-stone-50 text-[#555555] hover:bg-stone-100 hover:text-[#111111] border border-[#E5E5E5] cursor-pointer transition-colors text-[11px]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            );
          })
        )}

        {/* Sacred Quote Card */}
        <div className="relative rounded-2xl overflow-hidden border border-[#D9A441]/50 shadow-xs bg-white p-6 sm:p-8 text-center">
          <div className="relative z-10 max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#111111] bg-[#FFD21F] border border-[#FFD21F] px-3 py-1 rounded-full shadow-xs">
              तैत्तिरीयोपनिषद्
            </span>
            <p className="font-devanagari text-lg sm:text-xl font-bold text-[#D9A441]">
              “{SACRED_QUOTE.sanskrit}”
            </p>
            <p className="font-serif italic text-xs sm:text-sm text-[#555555]">
              "{SACRED_QUOTE.translation}"
            </p>
            <span className="text-xs font-semibold text-[#111111] block">
              — {SACRED_QUOTE.source}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
