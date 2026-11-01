import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import {
  FileCheck2,
  BookOpen,
  CheckCircle2,
  GitBranch,
  ShieldCheck,
  Layers,
  Sparkles,
  ChevronRight,
  Database,
  ExternalLink,
  Award,
  Scroll,
  Home
} from "lucide-react";
import bannerSanctum from "../assets/images/library/banners/banner-sanctum.png";

export default function SourceAttributionPage() {
  const { isHindi } = useLanguage();

  const sourceSchema = [
    {
      "@type": "WebPage",
      name: "Source & Attribution Policy — स्रोत एवं उद्धरण नीति",
      url: "https://library.vedastructure.com/source-attribution",
      description:
        "वेद पुस्तकालय की स्रोत एवं उद्धरण नीति: वैदिक पांडुलिपियों, प्रामाणिक मुद्रित संस्करणों, शाखा भेदों और ग्रंथ संदर्भों का मानक प्रलेखीकरण।",
      inLanguage: ["hi", "en", "sa"],
      publisher: {
        "@type": "Organization",
        name: "Veda Library",
        url: "https://library.vedastructure.com/",
        logo: "https://library.vedastructure.com/vite.svg"
      }
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "होम (Home)",
          item: "https://library.vedastructure.com/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "स्रोत एवं उद्धरण नीति",
          item: "https://library.vedastructure.com/source-attribution"
        }
      ]
    }
  ];

  const sourceFields = [
    {
      field: isHindi ? "ग्रंथ / स्रोत शीर्षक (Source Title)" : "Source Title",
      desc: isHindi
        ? "मूल ग्रंथ का पूर्ण शास्त्रीय नाम (जैसे: 'ऋग्वेद संहिता सायण-भाष्योपेत', 'तैत्तिरीय आरण्यक', 'श्रीमद्भागवत महापुराण')।"
        : "Complete canonical text name, including specific recension and commentary corpus."
    },
    {
      field: isHindi ? "ऋषि / रचयिता / संकलनकर्ता (Attributed Rishi / Author)" : "Attributed Rishi / Compiler",
      desc: isHindi
        ? "वैदिक दृष्टा ऋषि, संकलनकर्ता महर्षि कृष्ण द्वैपायन व्यास अथवा शास्त्रीय रचयिता का प्रामाणिक नाम।"
        : "Traditional Rishi seer (Drashta), Maharshi Veda Vyasa, or historic commentator."
    },
    {
      field: isHindi ? "शाखा एवं परंपरा (Vedic Shakha & Tradition)" : "Vedic Shakha & Recension",
      desc: isHindi
        ? "शाखा भेद (जैसे: ऋग्वेद शाकल शाखा, शुक्लयजुर्वेद माध्यन्दिन वाजसनेयी अथवा काण्व शाखा, कृष्णयजुर्वेद तैत्तिरीय शाखा)।"
        : "Exact shakha specification. Variants are never merged silently without explicit notation."
    },
    {
      field: isHindi ? "संस्करण एवं प्रकाशक (Edition & Publisher)" : "Publisher & Critical Edition",
      desc: isHindi
        ? "चौखम्बा संस्कृत संस्थान, मोतीलाल बनारसीदास, वैदिक संशोधन मण्डल (पुणे), गीता प्रेस गोरखपुर, अथवा भंडारकर ओरिएंटल रिसर्च इंस्टीट्यूट (BORI)।"
        : "Recognized academic and traditional Indological publishers and critical editions."
    },
    {
      field: isHindi ? "विस्तृत संदर्भ सूत्र (Volume, Sukta, Verse, Page)" : "Grantha Locator & Pada-Patha",
      desc: isHindi
        ? "काण्ड, मण्डल, सूक्त, अध्याय, वर्ग, श्लोक/ऋचा संख्या तथा पृष्ठ संख्या का अचूक संदर्भ।"
        : "Precise locator indexing: Mandala.Sukta.Rik or Skandha.Adhyaya.Shloka."
    },
    {
      field: isHindi ? "भाष्यकार एवं अनुवादक (Commentator & Translator)" : "Commentator & Scholar Attributed",
      desc: isHindi
        ? "माधवाचार्य-सायण, यास्क (निरुक्त), शंकराचार्य, रामानुजाचार्य, वल्लभाचार्य, अथवा आधुनिक प्रामाणिक वैदिक विद्वान।"
        : "Ancient and classical commentators credited alongside modern verified translators."
    },
    {
      field: isHindi ? "सत्यापन स्तर (Verification Status)" : "Verification Status",
      desc: isHindi
        ? "विद्वत परिषद द्वारा तीन-स्तरीय सत्यापन: 'पांडुलिपि सत्यापित', 'मुद्रित संस्करण प्रमाणित', अथवा 'संपादकीय समीक्षा पूर्ण'।"
        : "Triple-stage scholarly verification badge attached to every scripture and mantra record."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111]">
      <SEO
        title={
          isHindi
            ? "स्रोत एवं उद्धरण नीति (Source & Attribution) | वेद पुस्तकालय • Veda Library"
            : "Source & Attribution Policy | Veda Library • Digital Vedic Archive"
        }
        description={
          isHindi
            ? "वेद पुस्तकालय की स्रोत नीति: वैदिक ग्रंथों, संहिताओं व मंत्रों के प्रामाणिक संदर्भ, मुद्रित संस्करण व शाखा प्रलेखन।"
            : "Source and attribution policy of Veda Library. Rigorous bibliographical standards for Vedic texts and mantras."
        }
        canonicalUrl="https://library.vedastructure.com/source-attribution"
        schema={sourceSchema}
      />

      {/* Standardized Breadcrumbs Bar */}
      <div className="bg-white border-b border-[#E5E5E5] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#555555]">
          <Link to="/library" className="hover:text-[#111111] flex items-center gap-1 font-medium transition-colors">
            <Home className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>{isHindi ? "पुस्तकालय" : "Library"}</span>
          </Link>
          <span className="text-[#D9A441]">›</span>
          <Link to="/editorial-policy" className="hover:text-[#111111] transition-colors">
            <span>{isHindi ? "संपादकीय नीति" : "Editorial"}</span>
          </Link>
          <span className="text-[#D9A441]">›</span>
          <span className="text-[#111111] font-bold">
            {isHindi ? "स्रोत एवं उद्धरण नीति (Source & Attribution Policy)" : "Source & Attribution Policy"}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#111111] text-[#FFFFFF] py-14 sm:py-18 border-b-2 border-[#D9A441]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={bannerSanctum}
            alt="Sanctum Background"
            className="w-full h-full object-cover object-center opacity-85 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F1F1F] border border-[#D9A441]/40 text-[#FFD21F] text-xs font-semibold uppercase tracking-wider mb-4">
            <Scroll className="w-4 h-4 text-[#FFD21F]" />
            <span>{isHindi ? "शास्त्र प्रमाण एवं शोध मर्यादा" : "Bibliographic Integrity"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FFFFFF] tracking-tight leading-tight">
            {isHindi ? "स्रोत एवं उद्धरण नीति" : "Source & Attribution Policy"}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#D4D4D4] max-w-2xl leading-relaxed">
            {isHindi
              ? "प्रत्येक श्लोक, मंत्र व आलेख के पीछे प्रामाणिक ग्रंथ, मुद्रित संस्करण और पाण्डुलिपि का स्पष्ट संदर्भ। वेद पुस्तकालय में अप्रमाणित अथवा बनावटी सामग्री पूर्णतः वर्जित है।"
              : "Every verse, mantra, and article is anchored to verified printed editions, manuscripts, and traditional commentaries. AI-fabricated or unsourced quotations are strictly prohibited."}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[#999999]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD21F]" />
              {isHindi ? "दस्तावेज़ विनिर्देश धारा ८ अनुरूप" : "Compliant with Spec Section 8"}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#FFD21F] font-semibold">
              {isHindi ? "१००% स्रोत-सत्यापित वैदिक संग्रह" : "100% Source-Verified Corpus"}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10">

          {/* Principle Callout */}
          <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFD21F]/20 border border-[#FFD21F] flex items-center justify-center text-[#111111] flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#D9A441]" />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-[#111111]">
                  {isHindi
                    ? "सर्वोच्च नियम: बिना स्रोत संदर्भ कोई उद्धरण नहीं"
                    : "Golden Rule: No Quotation Without Authoritative Attribution"}
                </h2>
                <p className="text-sm text-[#444444] leading-relaxed">
                  {isHindi
                    ? "क्लाइंट विनिर्देश (Section 8) के अनुसार, किसी भी वैदिक या शास्त्रीय वचन को तब तक आधिकारिक रूप से प्रदर्शित नहीं किया जाता जब तक कि उसके मूल स्रोत, शाखा, ग्रंथांक तथा मान्यता-प्राप्त भाष्य का मिलान न हो जाए।"
                    : "Per Client Specification Section 8, no text or mantra is published as authoritative without rigorous multi-source cross-referencing against accepted printed editions, shakha recensions, and commentary traditions."}
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Standard Metadata Fields */}
          <section className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E5E5E5] pb-4">
              <Database className="w-5 h-5 text-[#D9A441]" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#111111]">
                {isHindi ? "१. अनिवार्य स्रोत मेटाडेटा प्रक्षेत्र (Standard Source Metadata Fields)" : "1. Standard Source Metadata Fields"}
              </h3>
            </div>

            <div className="divide-y divide-[#E5E5E5]">
              {sourceFields.map((item, idx) => (
                <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <span className="font-serif font-bold text-sm text-[#111111] sm:w-1/3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D9A441] flex-shrink-0" />
                    <span>{item.field}</span>
                  </span>
                  <p className="text-xs sm:text-sm text-[#555555] sm:w-2/3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Shakha Distinction */}
          <section className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E5E5E5] pb-4">
              <GitBranch className="w-5 h-5 text-[#D9A441]" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#111111]">
                {isHindi ? "२. शाखा भेद एवं पाठान्तर नीति (Recensions & Textual Variants)" : "2. Recensions & Textual Variants Policy"}
              </h3>
            </div>
            <div className="space-y-3 text-sm text-[#444444] leading-relaxed">
              <p>
                {isHindi
                  ? "जहाँ किसी वेद अथवा सूक्त के एकाधिक शाखा संस्करण उपलब्ध हैं (उदा. शुक्लयजुर्वेद की माध्यन्दिन शाखा बनाम काण्व शाखा; अथर्ववेद की शौनक शाखा बनाम पैप्पलाद शाखा), वहाँ दोनों को बिना मिलाए अलग-अलग स्पष्ट शाखा टैग के साथ प्रलेखित किया जाता है।"
                  : "Where multiple recensions or textual variants exist, Veda Library provides explicit distinction rather than silently merging them. Each shakha maintains its discrete catalog entry, pada-patha, and accentuation."}
              </p>
            </div>
          </section>

          {/* Section 3: Recognized Critical Editions */}
          <section className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E5E5E5] pb-4">
              <BookOpen className="w-5 h-5 text-[#D9A441]" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#111111]">
                {isHindi ? "३. मान्यता प्राप्त आधार ग्रंथ एवं प्रकाशन" : "3. Recognized Authoritative Editions"}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5]">
                <span className="font-semibold text-xs text-[#C62828] uppercase tracking-wider block mb-1">
                  वैदिक संशोधन मण्डल (पुणे)
                </span>
                <p className="text-xs text-[#555555]">
                  {isHindi
                    ? "ऋग्वेद संहिता सायण-भाष्य critical edition एवं वैदिक पदानुक्रम कोष।"
                    : "Rigveda Samhita with Sayana Bhashya critical edition & Pada concordance."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5]">
                <span className="font-semibold text-xs text-[#111111] uppercase tracking-wider block mb-1">
                  चौखम्बा संस्कृत संस्थान (वाराणसी)
                </span>
                <p className="text-xs text-[#555555]">
                  {isHindi
                    ? "यजुर्वेद, सामवेद, वेदांग, धर्मसूत्र, गृह्यसूत्र एवं व्याकरण महाभाष्य।"
                    : "Yajurveda, Samaveda, Vedanga Sutras, and classical Sanskrit grammar."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5]">
                <span className="font-semibold text-xs text-[#D9A441] uppercase tracking-wider block mb-1">
                  गीता प्रेस (गोरखपुर)
                </span>
                <p className="text-xs text-[#555555]">
                  {isHindi
                    ? "श्रीमद्भगवद्गीता, १८ महापुराण, वाल्मीकि रामायण एवं मुख्य उपनिषद।"
                    : "Shrimad Bhagavad Gita, 18 Mahapuranas, Valmiki Ramayana & Principal Upanishads."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5]">
                <span className="font-semibold text-xs text-[#111111] uppercase tracking-wider block mb-1">
                  भंडारकर ओरिएंटल रिसर्च इंस्टीट्यूट (BORI)
                </span>
                <p className="text-xs text-[#555555]">
                  {isHindi
                    ? "महाभारत क्रिटिकल एडिशन एवं प्राचीन प्राच्यविद्या पांडुलिपि संदर्भ।"
                    : "Mahabharata Critical Edition and classical Indological manuscript concordances."}
                </p>
              </div>
            </div>
          </section>

          {/* Bottom Action Strip */}
          <div className="p-6 rounded-2xl bg-[#111111] text-[#FFFFFF] border border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif font-bold text-base text-[#FFFFFF]">
                {isHindi ? "संपादकीय नीति व समीक्षा प्रक्रिया देखें" : "Explore Editorial Workflow"}
              </h4>
              <p className="text-xs text-[#AAAAAA] mt-0.5">
                {isHindi ? "५-चरणीय विद्वत समीक्षा प्रक्रिया की विस्तृत जानकारी।" : "Detailed 5-stage scholarly review protocol."}
              </p>
            </div>
            <Link
              to="/editorial-policy"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD21F] text-[#111111] hover:bg-[#D9A441] transition-colors text-xs font-bold shadow-xs cursor-pointer"
            >
              <span>{isHindi ? "संपादकीय नीति पढ़ें" : "Read Editorial Policy"}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#111111]" />
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
