import React, { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SEO from "../components/common/SEO.jsx";
import {
  Home,
  BookOpen,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Flame,
  CheckCircle2,
  Layers,
  Crown,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import ScriptureReaderView from "../components/common/ScriptureReaderView.jsx";
import {
  getScriptureReaderData,
  ALL_SCRIPTURE_READER_LIBRARY,
} from "../data/scriptures/index.js";
import bannerVedaHero from "../assets/images/library/banners/banner-veda-hero-clean.jpg";

export default function ScriptureReaderPage({ onOpenSearch }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isHindi } = useLanguage();

  const scriptureData = useMemo(() => {
    if (!slug) return ALL_SCRIPTURE_READER_LIBRARY["bhagavad-gita"] || null;
    return getScriptureReaderData(slug);
  }, [slug]);

  if (!scriptureData) {
    return (
      <div className="min-h-[75vh] bg-[#FFFFFF] flex items-center justify-center p-6 text-center">
        <div className="max-w-lg bg-white rounded-2xl border border-[#E5E5E5] p-8 shadow-xs space-y-4">
          <BookOpen className="w-12 h-12 text-[#D9A441] mx-auto opacity-70" />
          <h1 className="font-serif text-2xl font-bold text-[#111111]">
            {isHindi ? "ग्रंथ पाठ उपलब्ध नहीं है" : "Scripture Reader Not Found"}
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] font-devanagari">
            {isHindi
              ? `क्षमा करें, '${slug}' का डिजिटल वाचन संकलन अभी तैयार हो रहा है। कृपया नीचे दिए गए प्रमुख ग्रंथों में से चुनें:`
              : `The digital recension for '${slug}' is currently being curated. Please explore from our featured canonical scriptures:`}
          </p>

          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {[
              { id: "bhagavad-gita", title: "श्रीमद्भगवद्गीता" },
              { id: "isha-upanishad", title: "ईशावास्योपनिषद्" },
              { id: "rigveda", title: "ऋग्वेद संहिता" },
              { id: "mandukya-upanishad", title: "माण्डूक्योपनिषद्" },
              { id: "yoga-sutra", title: "पातञ्जल योगसूत्र" },
              { id: "shrimad-bhagavata", title: "श्रीमद्भागवतम्" },
            ].map((item) => (
              <Link
                key={item.id}
                to={`/read/${item.id}`}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-[#E5E5E5] hover:border-[#D9A441] text-xs font-bold text-[#111111] transition-all shadow-2xs"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="pt-3">
            <Link
              to="/library"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-bold text-xs shadow-xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isHindi ? "पुस्तकालय मुख्य पृष्ठ" : "Back to Library Home"}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const seoTitle = `${scriptureData.title} (${scriptureData.enTitle || ""}) — शुद्ध देवनागरी मूल पाठ एवं त्रिभाषी अर्थ | Veda Library`;
  const seoDescription = `${scriptureData.title} का प्रामाणिक डिजिटल वाचन संग्रह। शुद्ध देवनागरी संस्कृत श्लोक, हिन्दी भावार्थ, English Translation एवं सरल हिंग्लिश व्याख्या।`;

  return (
    <div className="min-h-screen bg-[#FFFFFF] pb-24 text-[#111111]">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={`/read/${slug}`}
        keywords={[scriptureData.title, scriptureData.enTitle, "Veda Library", "Scripture Reader"].filter(Boolean)}
      />

      {/* 1. Breadcrumbs Ribbon */}
      <div className="bg-white border-b border-[#E5E5E5] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-[#555555] flex-wrap">
          <Link
            to="/library"
            className="hover:text-[#111111] transition-colors flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>Library</span>
          </Link>
          <span className="text-[#D9A441]">›</span>
          <Link to="/library/knowledge" className="hover:text-[#111111] transition-colors">
            {isHindi ? "ज्ञान अन्वेषण" : "Knowledge"}
          </Link>
          <span className="text-[#D9A441]">›</span>
          <span className="text-[#111111] font-bold">
            {scriptureData.title}
          </span>
        </div>
      </div>

      {/* 2. Hero Section with banner-veda-hero-clean.jpg */}
      <section className="relative overflow-hidden bg-[#111111] text-white py-5 sm:py-8 px-3.5 sm:px-6 lg:px-8 border-b border-[#222222]">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerVedaHero}
            alt={scriptureData.title}
            className="w-full h-full object-cover object-center opacity-85 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#111111] bg-[#FFD21F] border border-[#FFD21F] px-3.5 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
            <span>{scriptureData.category || "शास्त्रीय ग्रंथ वाचन"}</span>
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            {scriptureData.title}
          </h1>

          {scriptureData.enTitle && (
            <p className="font-serif text-base sm:text-xl text-[#FFD21F] font-semibold">
              {scriptureData.enTitle}
            </p>
          )}

          <p className="text-xs sm:text-sm text-[#E0E0E0] font-devanagari max-w-2xl mx-auto leading-relaxed drop-shadow-xs">
            {scriptureData.description || "शुद्ध देवनागरी संस्कृत मूल पाठ, पदच्छेद, सस्वर उच्चारण एवं त्रिभाषी भावार्थ (हिन्दी, English, हिंग्लिश)।"}
          </p>
        </div>
      </section>

      {/* 3. 5-Pillar Canonical Metadata Strip */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E5E5] py-3.5 px-3.5 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 text-xs">
          <div className="p-3 rounded-xl bg-stone-50 border border-[#E5E5E5] shadow-2xs">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#555555] mb-0.5">
              ग्रंथ वर्ग • CANON
            </span>
            <span className="font-bold text-[#111111] truncate block text-sm">
              {scriptureData.category || "वेदाङ्ग / शास्त्र"}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-[#E5E5E5] shadow-2xs">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#555555] mb-0.5">
              भाषा एवं लिपि • SCRIPT
            </span>
            <span className="font-bold text-[#111111] block text-sm">
              संस्कृत (शुद्ध देवनागरी)
            </span>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-[#E5E5E5] shadow-2xs">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#555555] mb-0.5">
              अध्याय संख्या • CHAPTERS
            </span>
            <span className="font-extrabold text-[#D9A441] block text-sm">
              {scriptureData.chapters?.length || 0} अध्याय / सूक्त
            </span>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-[#E5E5E5] shadow-2xs">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#555555] mb-0.5">
              ऋषि / दृष्टा • SAGE
            </span>
            <span className="font-bold text-[#111111] truncate block text-sm">
              {scriptureData.rishi || scriptureData.author || "परंपरागत महर्षि"}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-[#E5E5E5] shadow-2xs">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#555555] mb-0.5">
              कुल परिमाण • VERSES
            </span>
            <span className="font-bold text-[#111111] truncate block text-sm">
              {scriptureData.sourceTotal || "संपूर्ण प्रामाणिक पाठ"}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Main Scripture Reader Area */}
      <main className="max-w-7xl mx-auto px-[0.3rem] sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <ScriptureReaderView scripture={scriptureData} />
      </main>
    </div>
  );
}
