import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronUp, Sparkles, BookOpen, Compass, Layers } from "lucide-react";
import { ALL_MASTER_TAXONOMY_CARDS } from "../../data/libraryHomeData.js";
import { SACRED_ICON_MAP } from "../common/SacredIcons.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

// 6 Core Hub Bento Cards (Bhaktilok style: Clean white/glass, subtle golden border, top glowing accent border)
export const CORE_HUB_BENTO_CARDS = [
  {
    id: "veda",
    route: "/library/veda",
    title: "The Four Vedas",
    hindiTitle: "चारों वेद",
    englishTitle: "The Four Vedas",
    subtitle: "ऋग्वेद, यजुर्वेद, सामवेद, अथर्ववेद",
    hindiSubtitle: "ऋग्वेद • यजुर्वेद • सामवेद • अथर्ववेद",
    pillCounter: "४ संहिताएँ • २१+ शाखाएँ",
    enPillCounter: "4 Samhitas • 20,000+ Verses",
    desc: "अपौरुषेय श्रुति एवं सनातन ज्ञान का मूल स्रोत। संहिता, ब्राह्मण, आरण्यक एवं प्रामाणिक शाखा परंपरा।",
    enDesc: "The primeval shruti corpus of Samhitas, Brahmanas, Aranyakas, and canonical Shakhas.",
    keyTags: ["ऋग्वेद", "यजुर्वेद", "सामवेद", "अथर्ववेद"],
    enKeyTags: ["Rigveda", "Yajurveda", "Samaveda", "Atharvaveda"],
    topBorder: "border-t-amber-500",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
    iconColor: "text-amber-700",
    iconKey: "veda",
    glowColor: "hover:border-amber-400 hover:shadow-amber-500/10",
    tagBg: "bg-amber-50 text-amber-900 border-amber-200/80"
  },
  {
    id: "mantra-stotra",
    route: "/library/mantra-stotra",
    title: "Sacred Mantras & Stotras",
    hindiTitle: "पावन मंत्र एवं स्तोत्र",
    englishTitle: "Sacred Mantras & Stotras",
    subtitle: "महामृत्युंजय, गायत्री, सूक्त, सहस्रनाम",
    hindiSubtitle: "महामृत्युंजय • गायत्री • सूक्त • सहस्रनाम",
    enSubtitle: "Mahamrityunjaya • Gayatri • Suktas • Sahasranama",
    pillCounter: "५००+ स्तोत्र व सूक्त",
    enPillCounter: "500+ Mantras & Stotras",
    desc: "कल्याणकारी वैदिक ऋचाएं, शांतिकरण सूक्त, दिव्य स्तोत्र रत्न, कवच एवं सहस्रनाम पाठ संग्रह।",
    enDesc: "Vedic chants, peace-invoking Suktas, sacred Stotras, protective Kavachas, and complete Sahasranamas.",
    keyTags: ["महामृत्युंजय", "गायत्री", "सूक्त", "सहस्रनाम"],
    enKeyTags: ["Mahamrityunjaya", "Gayatri", "Sukta", "Sahasranama"],
    topBorder: "border-t-purple-600",
    badgeBg: "bg-purple-100 text-purple-800 border-purple-300",
    iconColor: "text-purple-700",
    iconKey: "mantra",
    glowColor: "hover:border-purple-400 hover:shadow-purple-500/10",
    tagBg: "bg-purple-50 text-purple-900 border-purple-200/80"
  },
  {
    id: "upanishad",
    route: "/library/upanishad-darshana",
    title: "Upanishads & Darshanas",
    hindiTitle: "उपनिषद् एवं षड्दर्शन",
    englishTitle: "Upanishads & Darshanas",
    subtitle: "१०८ उपनिषद्, षड्दर्शन",
    hindiSubtitle: "१०८ उपनिषद् • षड्दर्शन • ब्रह्मविद्या",
    enSubtitle: "108 Upanishads • 6 Darshanas • Vedanta",
    pillCounter: "१०८ उपनिषद • ६ दर्शन",
    enPillCounter: "108 Upanishads • 6 Darshanas",
    desc: "आत्मज्ञान, ब्रह्मविद्या एवं प्रस्थानत्रयी। सांख्य, योग, न्याय, वैशेषिक, मीमांसा व वेदांत दर्शन की शास्त्रीय मीमांसा।",
    enDesc: "Metaphysical enquiry into Brahman and Atman across 108 Upanishads and the 6 orthodox schools.",
    keyTags: ["१०८ उपनिषद्", "षड्दर्शन", "वेदांत", "सांख्य"],
    enKeyTags: ["108 Upanishads", "6 Darshanas", "Vedanta", "Samkhya"],
    topBorder: "border-t-sky-600",
    badgeBg: "bg-sky-100 text-sky-800 border-sky-300",
    iconColor: "text-sky-700",
    iconKey: "upanishad",
    glowColor: "hover:border-sky-400 hover:shadow-sky-500/10",
    tagBg: "bg-sky-50 text-sky-900 border-sky-200/80"
  },
  {
    id: "purana-itihasa",
    route: "/library/purana-itihasa",
    title: "Puranas & Itihasa",
    hindiTitle: "पुराण एवं इतिहास",
    englishTitle: "Puranas & Itihasa",
    subtitle: "१८ महापुराण, रामायण, महाभारत",
    hindiSubtitle: "१८ महापुराण • रामायण • महाभारत",
    enSubtitle: "18 Mahapuranas • Ramayana • Mahabharata",
    pillCounter: "१८ महापुराण • २ महाकाव्य",
    enPillCounter: "18 Puranas • 2 Great Epics",
    desc: "महर्षि वेदव्यास प्रणीत १८ महापुराण, उपपुराण, श्रीमद्वाल्मीकि रामायण, महाभारत एवं सनातन आख्यान।",
    enDesc: "The monumental epics and 18 Mahapuranas preserving eternal genealogies, dharma, and wisdom.",
    keyTags: ["१८ महापुराण", "रामायण", "महाभारत", "श्रीमद्भागवत"],
    enKeyTags: ["18 Puranas", "Ramayana", "Mahabharata", "Bhagavata"],
    topBorder: "border-t-indigo-600",
    badgeBg: "bg-indigo-100 text-indigo-800 border-indigo-300",
    iconColor: "text-indigo-700",
    iconKey: "purana-itihasa",
    glowColor: "hover:border-indigo-400 hover:shadow-indigo-500/10",
    tagBg: "bg-indigo-50 text-indigo-900 border-indigo-200/80"
  },
  {
    id: "research",
    route: "/library/articles",
    title: "Vedic Articles & Research",
    hindiTitle: "वैदिक शोध एवं आलेख",
    englishTitle: "Vedic Articles & Research",
    subtitle: "शोध, व्याख्या, जीवन दर्शन",
    hindiSubtitle: "शोध • व्याख्या • पांडुलिपि • जीवन दर्शन",
    enSubtitle: "Research • Commentary • Manuscripts • Philosophy",
    pillCounter: "२००+ शोध लेख",
    enPillCounter: "200+ Research Articles",
    desc: "पांडुलिपियाँ, सायण व शांकर भाष्य, वैज्ञानिक अन्वेषण, शोध पत्रिकाएँ एवं आधुनिक जीवन दर्शन।",
    enDesc: "Critical editions, authentic commentaries, manuscript studies, and research on classical Indian thought.",
    keyTags: ["शोध", "व्याख्या", "पांडुलिपि", "जीवन दर्शन"],
    enKeyTags: ["Research", "Commentary", "Manuscripts", "Philosophy"],
    topBorder: "border-t-emerald-600",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
    iconColor: "text-emerald-700",
    iconKey: "research",
    glowColor: "hover:border-emerald-400 hover:shadow-emerald-500/10",
    tagBg: "bg-emerald-50 text-emerald-900 border-emerald-200/80"
  },
  {
    id: "puja",
    route: "/library/puja",
    title: "Puja, Samskar & Rituals",
    hindiTitle: "पूजा, संस्कार एवं अनुष्ठान",
    englishTitle: "Puja, Samskar & Rituals",
    subtitle: "१६ संस्कार, यज्ञ, दैनिक उपासना",
    hindiSubtitle: "१६ संस्कार • यज्ञ • दैनिक उपासना",
    enSubtitle: "16 Samskaras • Yagya • Daily Worship",
    pillCounter: "१६ संस्कार • नित्य पूजन",
    enPillCounter: "16 Samskaras • Sacred Rituals",
    desc: "गर्भाधान से अन्त्येष्टि तक षोडश संस्कार, पंच महायज्ञ, दैनिक संध्या वंदन, कलश स्थापन एवं शास्त्रोक्त पूजन विधि।",
    enDesc: "The sacred domestic and solemn rites, 16 Samskaras, fire altars, and authentic liturgical worship.",
    keyTags: ["१६ संस्कार", "यज्ञ", "षोडशोपचार", "दैनिक उपासना"],
    enKeyTags: ["16 Samskaras", "Yagya", "Puja Vidhi", "Daily Worship"],
    topBorder: "border-t-rose-600",
    badgeBg: "bg-rose-100 text-rose-800 border-rose-300",
    iconColor: "text-rose-700",
    iconKey: "puja",
    glowColor: "hover:border-rose-400 hover:shadow-rose-500/10",
    tagBg: "bg-rose-50 text-rose-900 border-rose-200/80"
  }
];

export default function ExploreKnowledgeSection({ onSelectCategory, onNavigateKnowledge }) {
  const [showAllTaxonomy, setShowAllTaxonomy] = useState(false);
  const { isHindi } = useLanguage();
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    if (card.route) {
      navigate(card.route);
    } else if (onSelectCategory) {
      onSelectCategory(card.id);
    } else if (onNavigateKnowledge) {
      onNavigateKnowledge();
    } else {
      navigate(`/library/${card.id}`);
    }
  };

  return (
    <section id="categories" className="py-12 sm:py-16 bg-[#fffaf0] border-b border-amber-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-900 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest">
                {isHindi ? "ज्ञान परंपरा एवं वर्गीकरण" : "DEVOTIONAL & KNOWLEDGE HUB"}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
              {isHindi ? "पुस्तकालय का अन्वेषण करें" : "Explore the Sacred Library"}
            </h2>
            <p className={`text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>
              {isHindi
                ? "छह प्रमुख ज्ञान केंद्र — अपनी रुचि के अनुसार किसी भी ज्ञान परंपरा से शुरुआत करें और प्रामाणिक ग्रंथों का अध्ययन करें।"
                : "Six Core Knowledge Hubs — Discover canonical Vedic traditions, sacred chants, Upanishads, and authentic rituals."}
            </p>
          </div>

          {/* Toggle Button for All 18 Master Taxonomy Categories */}
          <div className="self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setShowAllTaxonomy((prev) => !prev)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-amber-50 text-amber-950 border border-amber-300 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <span>
                {showAllTaxonomy
                  ? isHindi
                    ? "संक्षिप्त करें (मुख्य ६ केंद्र)"
                    : "Show Core 6 Hubs"
                  : isHindi
                  ? "समस्त १८ श्रेणियाँ देखें"
                  : "View All 18 Categories"}
              </span>
              {showAllTaxonomy ? (
                <ChevronUp className="w-4 h-4 text-amber-900 group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 text-amber-900 group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        </div>

        {/* 6 Core Hub Bento Cards (Bhaktilok style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {CORE_HUB_BENTO_CARDS.map((card) => {
            const IconComponent = SACRED_ICON_MAP[card.iconKey] || BookOpen;
            const title = isHindi ? card.hindiTitle : card.title;
            const subTitle = isHindi ? card.englishTitle : card.hindiTitle;
            const subtitleList = isHindi ? card.hindiSubtitle : card.enSubtitle;
            const description = isHindi ? card.desc : card.enDesc;
            const pillText = isHindi ? card.pillCounter : card.enPillCounter;
            const tags = isHindi ? card.keyTags : card.enKeyTags;

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-amber-200/60 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden border-t-4 ${card.topBorder} ${card.glowColor}`}
              >
                {/* Subtle top-right ambient background glow */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-amber-100/30 rounded-bl-full pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100" />

                <div>
                  {/* Card Header: Icon Badge & Pill Counter */}
                  <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
                    <div
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-2xs border ${card.badgeBg}`}
                    >
                      <IconComponent className={`w-7 h-7 sm:w-8 sm:h-8 ${card.iconColor}`} />
                    </div>

                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-2xs ${card.badgeBg}`}
                    >
                      {pillText}
                    </span>
                  </div>

                  {/* Title & English Subtitle */}
                  <div className="relative z-10">
                    <h3
                      className={`text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug ${
                        isHindi ? "font-devanagari" : "font-serif"
                      }`}
                    >
                      {title}
                    </h3>
                    <p className="text-xs font-serif font-bold text-stone-500 tracking-wide mt-0.5">
                      {subTitle}
                    </p>

                    {/* Brief sub-tradition badge */}
                    <div className="mt-2.5 inline-block px-2.5 py-1 rounded-lg bg-amber-50/80 border border-amber-200/60 text-[11px] font-semibold text-amber-900 font-devanagari">
                      {subtitleList}
                    </div>

                    {/* Description */}
                    <p
                      className={`mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2 ${
                        isHindi ? "font-devanagari" : ""
                      }`}
                    >
                      {description}
                    </p>

                    {/* Key item pills */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-50 text-stone-700 border border-stone-200/80 group-hover:bg-amber-50 group-hover:text-amber-900 group-hover:border-amber-200 transition-colors font-devanagari"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between relative z-10">
                  <span className="text-xs font-bold text-amber-800 group-hover:text-amber-950 transition-colors flex items-center gap-1 font-devanagari">
                    {isHindi ? "अन्वेषण करें" : "Explore Category"}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center transition-all duration-300 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 group-hover:translate-x-1 shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expandable Section: View All 18 Master Taxonomy Categories */}
        {showAllTaxonomy && (
          <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-amber-200/70 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800">
                  {isHindi ? "सम्पूर्ण ज्ञान वितान • १८ श्रेणियाँ" : "COMPLETE MASTER TAXONOMY"}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                  {isHindi ? "समस्त १८ वैदिक ज्ञान श्रेणियाँ" : "All 18 Vedic Knowledge Categories"}
                </h3>
              </div>
              <span className="text-xs text-stone-500 font-medium">
                {isHindi ? "विस्तृत वर्गीकरण एवं मूल ग्रंथ" : "Comprehensive Archive Directory"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {ALL_MASTER_TAXONOMY_CARDS.map((card) => {
                const IconComponent = SACRED_ICON_MAP[card.id] || BookOpen;
                const title = isHindi ? (card.hindiTitle || card.title) : card.title;
                const subtitle = isHindi ? (card.hindiSubtitle || card.subtitle) : card.subtitle;

                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => {
                      if (onSelectCategory) {
                        onSelectCategory(card.id);
                      } else {
                        navigate(`/library/${card.id}`);
                      }
                    }}
                    className="group relative flex flex-col items-center justify-between text-center p-3.5 sm:p-4 rounded-xl bg-white border border-amber-200/60 hover:border-amber-400 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer w-full"
                  >
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2.5 transition-transform duration-300 group-hover:scale-105 border ${card.badgeBg}`}
                    >
                      <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${card.iconColor}`} />
                    </div>

                    <h4
                      className={`text-xs sm:text-sm font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-tight truncate w-full ${
                        isHindi ? "font-devanagari" : "font-serif"
                      }`}
                    >
                      {title}
                    </h4>

                    <span className="text-[10px] text-stone-500 font-medium mt-0.5 leading-snug truncate w-full">
                      {subtitle}
                    </span>

                    <span className="mt-2 text-[10px] font-bold text-amber-700 group-hover:text-amber-900 flex items-center gap-0.5 transition-colors">
                      {isHindi ? "देखें" : "View"} <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Collapse Button */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setShowAllTaxonomy(false)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/70 hover:bg-amber-200 text-amber-950 border border-amber-300 text-xs font-semibold cursor-pointer transition-all"
              >
                <span>{isHindi ? "संक्षिप्त करें" : "Show Less"}</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* View All Categories in Library CTA */}
        <div className="mt-8 sm:mt-10 text-center">
          <button
            type="button"
            onClick={onNavigateKnowledge}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white border border-amber-300 hover:bg-amber-50 hover:border-amber-500 text-amber-900 font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <span>{isHindi ? "सम्पूर्ण ज्ञान आर्काइव का अन्वेषण करें" : "Explore Complete Knowledge Archive"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
