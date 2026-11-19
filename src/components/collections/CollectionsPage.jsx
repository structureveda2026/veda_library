import React, { useState, useMemo } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import SEO from "../../components/common/SEO.jsx";
import {
  ArrowRight,
  Home,
  Sparkles,
  BookOpen,
  Layers,
  CheckCircle2,
  Search,
  ChevronRight,
  Scroll,
  Flame,
  Sun,
  Crown,
  Compass,
  Tag,
  ArrowLeft,
  Share2,
  Bookmark,
  X,
  Filter
} from "lucide-react";

import { COLLECTIONS_LIST, getCollectionById } from "../../data/collectionsData";
import kashiAartiImg from "../../assets/images/library/banners/banner-kashi-ghat.png";
import { useLanguage } from "../../context/LanguageContext.jsx";

const CATEGORY_TABS = [
  { id: "all", label: "All Collections", hindiLabel: "सभी संग्रह" },
  { id: "vedic", label: "Vedic & Shruti", hindiLabel: "वेद व श्रुति" },
  { id: "mantra", label: "Mantra & Stotra", hindiLabel: "मंत्र व स्तोत्र" },
  { id: "ritual", label: "Puja & Yagya", hindiLabel: "पूजा व यज्ञ" },
  { id: "samskara", label: "16 Samskaras", hindiLabel: "संस्कार परंपरा" },
  { id: "philosophy", label: "Darshana & Shastra", hindiLabel: "दर्शन व शास्त्र" },
  { id: "epics", label: "Itihasa & Purana", hindiLabel: "इतिहास व पुराण" },
  { id: "heritage", label: "Tradition & Jyotisha", hindiLabel: "तीर्थ व ज्योतिष" }
];

export default function CollectionsPage({ onSelectArticle }) {
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const { isHindi } = useLanguage();

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [itemSearchQuery, setItemSearchQuery] = useState("");
  const [itemTypeFilter, setItemTypeFilter] = useState("all");

  // If a specific collection ID is passed in the URL, load its deep-dive view
  const currentCollection = useMemo(() => {
    if (!collectionId) return null;
    return getCollectionById(collectionId);
  }, [collectionId]);

  const availableItemTypes = useMemo(() => {
    if (!currentCollection || !currentCollection.items) return [];
    return Array.from(new Set(currentCollection.items.map((i) => i.type).filter(Boolean)));
  }, [currentCollection]);

  const filteredCollectionItems = useMemo(() => {
    if (!currentCollection || !currentCollection.items) return [];
    return currentCollection.items.filter((item) => {
      if (itemTypeFilter !== "all" && item.type !== itemTypeFilter) return false;
      if (!itemSearchQuery.trim()) return true;
      const q = itemSearchQuery.toLowerCase().trim();
      return (
        item.title.toLowerCase().includes(q) ||
        (item.hindiTitle && item.hindiTitle.toLowerCase().includes(q)) ||
        (item.desc && item.desc.toLowerCase().includes(q)) ||
        (item.reference && item.reference.toLowerCase().includes(q)) ||
        (item.type && item.type.toLowerCase().includes(q))
      );
    });
  }, [currentCollection, itemSearchQuery, itemTypeFilter]);

  // Filter collections by tab and search
  const filteredCollections = useMemo(() => {
    return COLLECTIONS_LIST.filter((col) => {
      const matchesTab = activeTab === "all" || col.category === activeTab;
      const matchesSearch =
        searchQuery.trim() === "" ||
        col.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (col.relatedTags &&
          col.relatedTags.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          ));
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  // =========================================================================
  // VIEW 1: SINGLE COLLECTION DEEP DIVE VIEW (e.g. /library/collections/vedic-collection)
  // =========================================================================
  if (currentCollection) {
    return (
      <div className="bg-[#FFFFFF] min-h-screen text-[#111111]">
        {/* Deep Dive Header Banner */}
        <div className="relative bg-[#111111] text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 border-b border-[#E5E5E5] overflow-hidden shadow-sm">
          <div className="absolute inset-0 z-0">
            <img
              src={currentCollection.image}
              alt={currentCollection.title}
              className="w-full h-full object-cover object-center opacity-85 scale-102 transition-transform duration-700"
            />
            {/* Luminous gentle gradient overlay preserving image visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/45 to-[#111111]/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/80 via-transparent to-[#111111]/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-[#111111]/70" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Breadcrumb Navigation */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/80 mb-4">
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
                {isHindi ? "वेद पुस्तकालय" : "Veda Library"}
              </Link>
              <span className="text-[#D9A441]">›</span>
              <Link
                to="/library/collections"
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isHindi ? "विशिष्ट संग्रह" : "Curated Collections"}
              </Link>
              <span className="text-[#D9A441]">›</span>
              <span className="text-[#FFD21F] font-semibold">
                {isHindi ? (currentCollection.hindiTitle || currentCollection.title) : currentCollection.title}
              </span>
            </div>

            {/* Back Button */}
            <div className="mb-4">
              <Link
                to="/library/collections"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#111111] bg-[#FFD21F] hover:bg-[#ffe052] transition-colors cursor-pointer px-3.5 py-1.5 rounded-full border border-[#FFD21F] shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isHindi ? "← सभी विशिष्ट संग्रह" : "← All Curated Collections"}</span>
              </Link>
            </div>

            {/* Title & Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F] border border-[#FFD21F] text-[#111111] text-[11px] font-bold tracking-widest uppercase mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
              <span>{currentCollection.tag} • {currentCollection.articlesCount}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 leading-tight">
              {currentCollection.title}
            </h1>
            <p className="font-devanagari text-xl sm:text-2xl text-[#FFD21F] font-semibold mb-3">
              {currentCollection.hindiTitle}
            </p>
            <p className="text-sm sm:text-base text-white/90 font-devanagari max-w-3xl leading-relaxed mb-6">
              {currentCollection.desc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to={`/library/${currentCollection.targetCategorySlug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD21F] hover:bg-[#ffe052] text-[#111111] font-bold text-xs tracking-wide shadow-xs transition-all cursor-pointer border border-[#FFD21F]"
              >
                <span>{isHindi ? "सम्पूर्ण श्रेणी हब देखें" : "Browse Full Category Hub"}</span>
                <ArrowRight className="w-4 h-4 text-[#111111]" />
              </Link>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/30 backdrop-blur-xs transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#FFD21F]" />
                <span>{copiedNotification ? (isHindi ? "लिंक कॉपी हुआ!" : "Link Copied!") : (isHindi ? "संग्रह साझा करें" : "Share Collection")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Deep Dive Content Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Articles & Featured Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E5E5] pb-3 gap-2">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#111111]">
                    {isHindi ? "सम्मिलित ग्रंथ एवं आलेख" : "Included Scriptures & Articles"}
                  </h2>
                  <p className="text-xs font-devanagari text-[#555555] mt-0.5">
                    {isHindi ? "इस संग्रह के अंतर्गत उपलब्ध प्रामाणिक ग्रंथ, सूक्त, मंत्र एवं आलेख" : "Authentic scriptures, suktas, mantras & articles in this collection"}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#111111] bg-[#FFD21F] border border-[#FFD21F] px-3 py-1 rounded-full shrink-0 self-start sm:self-auto shadow-xs">
                  {filteredCollectionItems.length} / {currentCollection.items.length} {isHindi ? "ग्रंथ" : "Texts"}
                </span>
              </div>

              {/* Items Filter & Search Strip */}
              {currentCollection.items.length > 2 && (
                <div className="p-3 rounded-xl bg-stone-50 border border-[#E5E5E5] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Item Type Pills */}
                  {availableItemTypes.length > 1 && (
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
                      <button
                        type="button"
                        onClick={() => setItemTypeFilter("all")}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                          itemTypeFilter === "all"
                            ? "bg-[#FFD21F] text-[#111111] font-bold shadow-xs border border-[#FFD21F]"
                            : "bg-white text-[#555555] hover:text-[#111111] border border-[#E5E5E5]"
                        }`}
                      >
                        {isHindi ? "सभी" : "All"} ({currentCollection.items.length})
                      </button>
                      {availableItemTypes.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setItemTypeFilter(t)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                            itemTypeFilter === t
                              ? "bg-[#FFD21F] text-[#111111] font-bold shadow-xs border border-[#FFD21F]"
                              : "bg-white text-[#555555] hover:text-[#111111] border border-[#E5E5E5]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Item Search Input */}
                  <div className="relative min-w-[180px] sm:min-w-[220px]">
                    <Search className="w-3.5 h-3.5 text-[#D9A441] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={itemSearchQuery}
                      onChange={(e) => setItemSearchQuery(e.target.value)}
                      placeholder={isHindi ? "संग्रह में खोजें..." : "Search in collection..."}
                      className="w-full pl-8 pr-7 py-1 rounded-lg text-xs bg-white border border-[#E5E5E5] focus:border-[#D9A441] focus:outline-none placeholder:text-[#555555]/60 font-devanagari text-[#111111]"
                    />
                    {itemSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setItemSearchQuery("")}
                        className="p-1 text-[#555555] hover:text-[#111111] absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Items Cards */}
              {filteredCollectionItems.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-[#E5E5E5] shadow-xs space-y-2">
                  <p className="text-sm font-semibold text-[#555555]">{isHindi ? "कोई ग्रंथ अथवा आलेख नहीं मिला।" : "No texts or articles found."}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setItemTypeFilter("all");
                      setItemSearchQuery("");
                    }}
                    className="text-xs text-[#111111] hover:text-[#D9A441] underline font-bold cursor-pointer"
                  >
                    {isHindi ? "फ़िल्टर रीसेट करें" : "Reset filter"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCollectionItems.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white p-5 rounded-2xl border border-[#E5E5E5] shadow-xs hover:shadow-sm hover:border-[#D9A441] transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold text-[#111111] bg-[#FFD21F] px-2.5 py-0.5 rounded-full border border-[#FFD21F]">
                            {item.type}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-lg font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors">
                          {item.title}
                        </h3>
                        {item.hindiTitle && (
                          <p className="text-xs font-devanagari text-[#D9A441] font-semibold">
                            {item.hindiTitle}
                          </p>
                        )}
                        {item.reference && (
                          <p className="text-[11px] font-mono text-[#555555]">
                            {item.reference}
                          </p>
                        )}
                        <p className="text-xs font-devanagari text-[#555555] leading-relaxed pt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-[#E5E5E5] flex items-center justify-between">
                      <Link
                        to={item.route}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#111111] group-hover:text-[#D9A441] hover:underline cursor-pointer"
                      >
                        <span>{isHindi ? "संपूर्ण पाठ एवं भाष्य पढ़ें" : "Read Full Text & Commentary"}</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#D9A441]" />
                      </Link>
                      <span className="text-[10px] text-stone-500 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{isHindi ? "प्रमाणित स्रोत" : "Source Verified"}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>

            {/* Right Column: Taxonomy Divisions & Tags */}
            <div className="space-y-6">
              {/* Category Divisions Box */}
              {currentCollection.divisions && (
                <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5] shadow-xs">
                  <h3 className="font-serif text-lg font-bold text-[#111111] mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#D9A441]" />
                    <span>{isHindi ? "संरचना एवं शाखाएं" : "Hierarchy & Divisions"}</span>
                  </h3>
                  <p className="text-xs font-devanagari text-[#555555] mb-4">
                    {isHindi ? "इस संग्रह की संरचनात्मक शाखाएँ एवं अनुभाग:" : "Structural branches and sections of this collection:"}
                  </p>
                  <ul className="space-y-2.5">
                    {currentCollection.divisions.map((div, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-[#111111] bg-stone-50 p-2.5 rounded-xl border border-[#E5E5E5]"
                      >
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FFD21F] text-[#111111] flex items-center justify-center font-bold text-[10px] border border-[#FFD21F]">
                          {i + 1}
                        </span>
                        <span className="font-devanagari leading-snug">{div}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Tags */}
              {currentCollection.relatedTags && (
                <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5] shadow-xs">
                  <h3 className="font-serif text-lg font-bold text-[#111111] mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#D9A441]" />
                    <span>{isHindi ? "सम्बद्ध विषय एवं टैग" : "Related Topics & Tags"}</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {currentCollection.relatedTags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-stone-50 hover:bg-stone-100 text-[#555555] hover:text-[#111111] border border-[#E5E5E5] text-xs font-medium transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Browse Other Collections Link */}
              <div className="bg-stone-50 rounded-2xl p-6 border border-[#E5E5E5] shadow-xs">
                <h4 className="font-serif font-bold text-[#111111] text-sm mb-1">
                  {isHindi ? "अन्य संग्रह देखें" : "Explore More Collections"}
                </h4>
                <p className="text-xs font-devanagari text-[#555555] mb-4">
                  {isHindi ? "अन्य वैदिक, दार्शनिक एवं पौराणिक संग्रहों को explore करें।" : "Explore more Vedic, philosophical and epic collections."}
                </p>
                <Link
                  to="/library/collections"
                  className="block text-center py-2.5 px-4 rounded-xl bg-[#FFD21F] hover:bg-[#ffe052] text-[#111111] font-bold text-xs shadow-xs transition-colors cursor-pointer border border-[#FFD21F]"
                >
                  {isHindi ? "सभी ९ संग्रह देखें" : "View All 9 Curated Collections"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ALL CURATED COLLECTIONS OVERVIEW (http://localhost:5174/library/collections)
  // =========================================================================
  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111111]">
      <SEO
        title={isHindi ? "संग्रह एवं संकलन" : "Curated Collections"}
        description={isHindi ? "वेद लाइब्रेरी के क्यूरेटेड ज्ञान संग्रह — ग्रंथ, मंत्र, स्तोत्र और पुराण संकलन।" : "Curated knowledge collections of Veda Library — grantha, mantra, stotra, and Purana compilations."}
        canonical="/library/collections"
      />
      {/* Royal Bhaktilok-Grade Hero Banner */}
      <div className="relative bg-[#111111] text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 border-b border-[#E5E5E5] overflow-hidden shadow-sm">
        {/* Background Kashi Ganga Aarti Image with Vivid 85% Visibility */}
        <div className="absolute inset-0 z-0">
          <img
            src={kashiAartiImg}
            alt="Sacred Kashi Traditions and Collections"
            className="w-full h-full object-cover object-center opacity-85 scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/45 to-[#111111]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/80 via-transparent to-[#111111]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-[#111111]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-medium text-white/80 mb-3">
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
              {isHindi ? "वेद पुस्तकालय" : "Veda Library"}
            </Link>
            <span className="text-[#D9A441]">›</span>
            <span className="text-[#FFD21F] font-semibold">{isHindi ? "विशिष्ट संग्रह" : "Curated Archives"}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F] border border-[#FFD21F] text-[#111111] text-[11px] font-bold tracking-widest uppercase mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
            <span>{isHindi ? "विशिष्ट संग्रह • प्रमुख संकलन" : "CURATED ARCHIVES • FEATURED COLLECTIONS"}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 leading-tight">
            {isHindi ? "विशिष्ट ज्ञान संग्रह" : "Curated Knowledge Collections"}
          </h1>
          <p className="text-sm sm:text-base text-white/90 font-devanagari max-w-3xl leading-relaxed mb-6">
            {isHindi
              ? "इस समय पुस्तकालय में सर्वाधिक अध्ययन किए जा रहे प्रमुख वैदिक, मंत्र, पूजा, यज्ञ, संस्कार, दर्शन एवं इतिहास संग्रह।"
              : "The most explored canonical collections across Vedic scriptures, mantras, pujas, yagyas, samskaras, darshana, and sacred history."}
          </p>

          {/* Search Bar inside Collections */}
          <div className="max-w-xl relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D9A441]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isHindi
                  ? "संग्रह में खोजें (जैसे ऋग्वेद, गायत्री, रुद्राभिषेक, संस्कार, गीता)..."
                  : "Search collections (e.g. Rigveda, Gayatri, Rudrabhisheka, Samskara, Gita)..."
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-[#111111] placeholder:text-[#555555] text-xs sm:text-sm font-medium border border-[#E5E5E5] shadow-xs focus:outline-none focus:border-[#D9A441]"
            />
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Category Tabs Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar scroll-smooth">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  isActive
                    ? "bg-[#FFD21F] text-[#111111] border-[#FFD21F] font-bold shadow-xs"
                    : "bg-white text-[#555555] border-[#E5E5E5] hover:border-[#D9A441] hover:text-[#111111] hover:bg-stone-50"
                }`}
              >
                <span>{isHindi ? tab.hindiLabel : tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Collections Count & Filter Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-devanagari text-[#555555] font-medium">
            {isHindi ? "दिखाए जा रहे हैं:" : "Showing:"}{" "}
            <span className="font-bold text-[#111111]">
              {filteredCollections.length} {isHindi ? "संग्रह" : "collections"}
            </span>
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-[#111111] hover:text-[#D9A441] underline cursor-pointer"
            >
              {isHindi ? "फ़िल्टर हटाएं" : "Clear filter"}
            </button>
          )}
        </div>

        {/* Collections Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCollections.map((col) => (
            <div
              key={col.id}
              onClick={() => navigate(`/library/collections/${col.slug}`)}
              className="group flex flex-col bg-white rounded-2xl border border-[#E5E5E5] shadow-xs hover:shadow-sm hover:border-[#D9A441] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* 16:9 Thumbnail Image */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Article Count Badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/75 backdrop-blur-xs text-[#FFD21F] border border-white/20 shadow-xs">
                  {col.articlesCount}
                </span>

                {/* Tradition Tag */}
                <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-black/75 text-white backdrop-blur-xs font-devanagari border border-white/20">
                  {col.tag}
                </span>
              </div>

              {/* Content Box */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#111111] bg-[#FFD21F] px-2 py-0.5 rounded border border-[#FFD21F]">
                      {col.branch}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs font-devanagari text-[#D9A441] font-semibold mt-0.5">
                    {col.hindiTitle}
                  </p>
                  <p className="text-xs text-[#555555] mt-2 line-clamp-2 font-devanagari leading-relaxed">
                    {col.desc}
                  </p>

                  {/* Included Divisions Sample */}
                  {col.divisions && (
                    <div className="mt-3 pt-3 border-t border-[#E5E5E5]">
                      <p className="text-[10px] font-bold text-[#555555] uppercase tracking-wider mb-1.5">
                        {isHindi ? "प्रमुख अनुभाग एवं ग्रंथ:" : "Key Sections & Scriptures:"}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {col.divisions.slice(0, 3).map((d, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-stone-50 text-[#555555] px-2 py-0.5 rounded border border-[#E5E5E5] font-devanagari"
                          >
                            {d.split("(")[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-4 mt-4 border-t border-[#E5E5E5] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#111111] group-hover:text-[#D9A441] flex items-center gap-1 transition-colors">
                    <span>{isHindi ? "संग्रह देखें" : "Explore Collection"}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#D9A441]" />
                  </span>
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>{isHindi ? "प्रमाणित स्रोत" : "Verified Source"}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
