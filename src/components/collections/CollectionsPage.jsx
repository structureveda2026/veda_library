import React, { useState, useMemo } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
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
      <div className="bg-[#FBF9F5] min-h-screen">
        {/* Deep Dive Header Banner */}
        <div className="relative bg-[#1A0E05] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b-2 border-amber-600/70 overflow-hidden shadow-lg">
          <div className="absolute inset-0 z-0">
            <img
              src={currentCollection.image}
              alt={currentCollection.title}
              className="w-full h-full object-cover object-center opacity-80 scale-102 transition-transform duration-700"
            />
            {/* Luminous warm gradient overlay preserving image visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140b05] via-[#1a0e05]/60 to-black/40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-black/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Breadcrumb Navigation */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-amber-200/85 mb-4">
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
              <Link
                to="/library/collections"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Curated Collections
              </Link>
              <span>›</span>
              <span className="text-amber-300 font-semibold">
                {currentCollection.title}
              </span>
            </div>

            {/* Back Button */}
            <div className="mb-4">
              <Link
                to="/library/collections"
                className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-full bg-black/40 border border-amber-500/30 backdrop-blur-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>← All Curated Collections</span>
              </Link>
            </div>

            {/* Title & Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-bold tracking-widest uppercase mb-3 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentCollection.tag} • {currentCollection.articlesCount}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 leading-tight">
              {currentCollection.title}
            </h1>
            <p className="font-devanagari text-xl sm:text-2xl text-amber-300 font-semibold mb-3">
              {currentCollection.hindiTitle}
            </p>
            <p className="text-sm sm:text-base text-amber-100/90 font-devanagari max-w-3xl leading-relaxed mb-6">
              {currentCollection.desc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to={`/library/${currentCollection.targetCategorySlug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs tracking-wide shadow-md transition-all cursor-pointer"
              >
                <span>Browse Full Category Hub</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 backdrop-blur-xs transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedNotification ? "Link Copied!" : "Share Collection"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Deep Dive Content Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Articles & Featured Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-3 gap-2">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">
                    Included Scriptures & Articles
                  </h2>
                  <p className="text-xs font-devanagari text-stone-600 mt-0.5">
                    इस संग्रह के अंतर्गत उपलब्ध प्रामाणिक ग्रंथ, सूक्त, मंत्र एवं आलेख
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full shrink-0 self-start sm:self-auto">
                  {filteredCollectionItems.length} / {currentCollection.items.length} Texts
                </span>
              </div>

              {/* Items Filter & Search Strip */}
              {currentCollection.items.length > 2 && (
                <div className="p-3 rounded-xl bg-white border border-amber-200/80 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Item Type Pills */}
                  {availableItemTypes.length > 1 && (
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
                      <button
                        type="button"
                        onClick={() => setItemTypeFilter("all")}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                          itemTypeFilter === "all"
                            ? "bg-amber-700 text-white font-bold shadow-2xs"
                            : "bg-amber-50 text-stone-700 hover:bg-amber-100 border border-amber-200/60"
                        }`}
                      >
                        सभी ({currentCollection.items.length})
                      </button>
                      {availableItemTypes.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setItemTypeFilter(t)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                            itemTypeFilter === t
                              ? "bg-amber-700 text-white font-bold shadow-2xs"
                              : "bg-amber-50 text-stone-700 hover:bg-amber-100 border border-amber-200/60"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Item Search Input */}
                  <div className="relative min-w-[180px] sm:min-w-[220px]">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={itemSearchQuery}
                      onChange={(e) => setItemSearchQuery(e.target.value)}
                      placeholder="संग्रह में खोजें..."
                      className="w-full pl-8 pr-7 py-1 rounded-lg text-xs bg-[#fffaf0] border border-stone-200 focus:border-amber-400 focus:outline-none placeholder:text-stone-400 font-devanagari"
                    />
                    {itemSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setItemSearchQuery("")}
                        className="p-1 text-stone-400 hover:text-stone-700 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Items Cards */}
              {filteredCollectionItems.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2">
                  <p className="text-sm font-semibold text-stone-700">कोई ग्रंथ अथवा आलेख नहीं मिला।</p>
                  <button
                    type="button"
                    onClick={() => {
                      setItemTypeFilter("all");
                      setItemSearchQuery("");
                    }}
                    className="text-xs text-amber-700 hover:text-amber-900 underline font-bold cursor-pointer"
                  >
                    फ़िल्टर रीसेट करें
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCollectionItems.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/70">
                            {item.type}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                          {item.title}
                        </h3>
                        {item.hindiTitle && (
                          <p className="text-xs font-devanagari text-amber-900 font-semibold">
                            {item.hindiTitle}
                          </p>
                        )}
                        {item.reference && (
                          <p className="text-[11px] font-mono text-stone-500">
                            {item.reference}
                          </p>
                        )}
                        <p className="text-xs font-devanagari text-stone-600 leading-relaxed pt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between">
                      <Link
                        to={item.route}
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 group-hover:text-amber-900 hover:underline cursor-pointer"
                      >
                        <span>Read Full Text & Commentary</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <span className="text-[10px] text-stone-500 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Source Verified</span>
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
                <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs">
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-700" />
                    <span>Hierarchy & Divisions</span>
                  </h3>
                  <p className="text-xs font-devanagari text-stone-600 mb-4">
                    इस संग्रह की संरचनात्मक शाखाएँ एवं अनुभाग:
                  </p>
                  <ul className="space-y-2.5">
                    {currentCollection.divisions.map((div, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-stone-700 bg-[#fffaf0] p-2.5 rounded-xl border border-stone-200/70"
                      >
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px]">
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
                <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs">
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-700" />
                    <span>Related Topics & Tags</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {currentCollection.relatedTags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 text-xs font-medium transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Browse Other Collections Link */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/80">
                <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">
                  Explore More Collections
                </h4>
                <p className="text-xs font-devanagari text-stone-600 mb-4">
                  अन्य वैदिक, दार्शनिक एवं पौराणिक संग्रहों को explore करें।
                </p>
                <Link
                  to="/library/collections"
                  className="block text-center py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  View All 9 Curated Collections
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
    <div className="bg-[#FBF9F5] min-h-screen">
      {/* Royal Bhaktilok-Grade Hero Banner */}
      <div className="relative bg-[#1A0E05] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-amber-600/70 overflow-hidden shadow-md">
        {/* Background Kashi Ganga Aarti Image with Vivid 80% Visibility */}
        <div className="absolute inset-0 z-0">
          <img
            src={kashiAartiImg}
            alt="Sacred Kashi Traditions and Collections"
            className="w-full h-full object-cover object-center opacity-80 scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140b05] via-[#1a0e05]/60 to-black/35" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/25 via-transparent to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-medium text-amber-200/85 mb-3">
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
            <span className="text-amber-300 font-semibold">Curated Archives</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-bold tracking-widest uppercase mb-3 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CURATED ARCHIVES • FEATURED COLLECTIONS</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 leading-tight">
            Curated Knowledge Collections
          </h1>
          <p className="text-sm sm:text-base text-amber-100/90 font-devanagari max-w-3xl leading-relaxed mb-6">
            इस समय Veda Library में सर्वाधिक पढ़े और explore किए जा रहे प्रमुख वैदिक, मंत्र, पूजा, यज्ञ, संस्कार, दर्शन, इतिहास एवं तीर्थ संग्रह।
          </p>

          {/* Search Bar inside Collections */}
          <div className="max-w-xl relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collections (e.g. Rigveda, Gayatri, Rudrabhisheka, Samskara, Gita)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/95 text-stone-900 placeholder:text-stone-500 text-xs sm:text-sm font-medium border border-amber-400/50 shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Category Tabs Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  isActive
                    ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                    : "bg-white text-stone-700 border-stone-200/90 hover:border-amber-300 hover:bg-amber-50/50"
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-1.5 opacity-75 font-devanagari text-[11px]">
                  ({tab.hindiLabel})
                </span>
              </button>
            );
          })}
        </div>

        {/* Collections Count & Filter Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-devanagari text-stone-600 font-medium">
            दिखाए जा रहे हैं: <span className="font-bold text-amber-900">{filteredCollections.length} संग्रह</span>
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-amber-800 hover:underline cursor-pointer"
            >
              Clear search filter
            </button>
          )}
        </div>

        {/* Collections Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCollections.map((col) => (
            <div
              key={col.id}
              onClick={() => navigate(`/library/collections/${col.slug}`)}
              className="group flex flex-col bg-white rounded-2xl border border-amber-200/70 shadow-xs hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
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
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/65 backdrop-blur-xs text-amber-300 border border-amber-400/40 shadow-xs">
                  {col.articlesCount}
                </span>

                {/* Tradition Tag */}
                <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-amber-950/85 text-white backdrop-blur-xs font-devanagari border border-white/20">
                  {col.tag}
                </span>
              </div>

              {/* Content Box */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/70">
                      {col.branch}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs font-devanagari text-amber-800 font-semibold mt-0.5">
                    {col.hindiTitle}
                  </p>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 font-devanagari leading-relaxed">
                    {col.desc}
                  </p>

                  {/* Included Divisions Sample */}
                  {col.divisions && (
                    <div className="mt-3 pt-3 border-t border-stone-100">
                      <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                        Key Sections & Scriptures:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {col.divisions.slice(0, 3).map((d, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-stone-50 text-stone-700 px-2 py-0.5 rounded border border-stone-200/60 font-devanagari"
                          >
                            {d.split("(")[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 group-hover:text-amber-900 flex items-center gap-1 transition-colors">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Verified Source</span>
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
