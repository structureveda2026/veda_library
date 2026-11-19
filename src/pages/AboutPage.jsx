import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/common/SEO.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import {
  BookOpen,
  Sparkles,
  ShieldCheck,
  Users,
  Feather,
  CheckCircle2,
  ArrowRight,
  Flame,
  Layers,
  HeartHandshake,
  Compass,
  FileText,
  Search,
  Scale,
  Home
} from "lucide-react";
import bannerSanctum from "../assets/images/library/banners/banner-sanctum.png";
import bannerKashiGhat from "../assets/images/library/banners/banner-kashi-ghat.png";

export default function AboutPage({ onOpenSearch }) {
  const navigate = useNavigate();
  const { isHindi } = useLanguage();

  const aboutSchema = [
    {
      "@type": "AboutPage",
      name: "About Veda Library — वेद पुस्तकालय परिचय",
      url: "https://library.vedastructure.com/about",
      description:
        "वेद लाइब्रेरी का उद्देश्य: वैदिक एवं सनातन ज्ञान परंपरा का डिजिटल संरक्षण, प्रामाणिक संदर्भ और शोध-आधारित सुलभता।",
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
          name: "परिचय (About Veda Library)",
          item: "https://library.vedastructure.com/about"
        }
      ]
    }
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111111] selection:bg-[#FFD21F] selection:text-[#111111]">
      <SEO
        title="About Veda Library — मिशन, संपादकीय दृष्टिकोण एवं ज्ञान परंपरा"
        description="वेद लाइब्रेरी का ध्येय: चार वेद, उपनिषद, पुराण, दर्शन एवं वैदिक मंत्रों का शुद्ध देवनागरी पाठ, प्रामाणिक संदर्भ और त्रिभाषी भावार्थ के साथ डिजिटल संरक्षण।"
        canonical="/about"
        schema={aboutSchema}
      />

      {/* Standardized Breadcrumbs Bar */}
      <div className="bg-white border-b border-[#E5E5E5] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#555555]">
          <Link to="/library" className="hover:text-[#111111] flex items-center gap-1 font-medium transition-colors">
            <Home className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>{isHindi ? "पुस्तकालय" : "Library"}</span>
          </Link>
          <span className="text-[#D9A441]">›</span>
          <span className="text-[#111111] font-bold">
            {isHindi ? "परिचय" : "About Veda Library"}
          </span>
        </div>
      </div>

      {/* 1. Scholarly Hero Banner — Luminous Sanctum Artwork with Balanced Light Overlay */}
      <section className="relative bg-[#111111] text-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-b-2 border-[#D9A441] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerSanctum}
            alt="Veda Library Sanctum"
            className="w-full h-full object-cover object-center opacity-85 scale-102 transition-transform duration-1000"
          />
          {/* Gentle, balanced overlay so artwork is vividly visible while text stays crisp */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#D9A441]/50 text-[#FFD21F] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isHindi ? "वेद स्ट्रक्चर डिजिटल लाइब्रेरी" : "Veda Structure Digital Library"}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
            {isHindi
              ? "वैदिक एवं भारतीय ज्ञान परंपरा का प्रामाणिक डिजिटल संग्रह"
              : "Preserving and Digitizing the Living Wisdom of Vedic Traditions"}
          </h1>

          <p className="max-w-3xl mx-auto font-devanagari text-base sm:text-lg text-white/95 leading-relaxed drop-shadow-xs font-normal">
            {isHindi
              ? "Veda Library केवल एक साधारण ब्लॉग नहीं, बल्कि मूल वेदों, उपनिषदों, संहिताओं, ब्राह्मणों, आरण्यकों और शास्त्रीय मंत्र-स्तोत्रों का संदर्भ-युक्त ज्ञान संस्थान है।"
              : "Veda Library is an authentic, text-first, source-referenced digital knowledge archive for sacred Sanskrit scriptures, Vedic mantras, and classical Indian philosophical systems."}
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Link
              to="/library/veda"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD21F] text-[#111111] font-bold text-sm hover:bg-[#D9A441] transition-all shadow-md cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>{isHindi ? "वेद अन्वेषण करें" : "Explore Vedas"}</span>
            </Link>
            <Link
              to="/editorial-policy"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#FFD21F]" />
              <span>{isHindi ? "संपादकीय नीति देखें" : "Editorial Policy"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core Mission & Vision */}
      <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD21F]/20 border border-[#FFD21F] flex items-center justify-center text-[#111111]">
              <BookOpen className="w-5 h-5 text-[#D9A441]" />
            </div>
            <h2 className="font-serif text-lg font-bold text-[#111111]">
              {isHindi ? "१. मूल पाठ प्राथमिकता (Text-First)" : "1. Canonical Text-First"}
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] font-devanagari leading-relaxed">
              {isHindi
                ? "प्रत्येक श्लोक, मंत्र व सूक्त को शुद्ध देवनागरी लिपि में पदच्छेद (पद-पाठ), अन्वय और स्वर-चिह्नों के साथ संकलित किया जाता है।"
                : "Every verse, mantra, and sukta is curated in pure Devanagari script with word breaks (pada-patha), prose order (anvaya), and authenticated recitation rules."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD21F]/20 border border-[#FFD21F] flex items-center justify-center text-[#111111]">
              <Scale className="w-5 h-5 text-[#D9A441]" />
            </div>
            <h2 className="font-serif text-lg font-bold text-[#111111]">
              {isHindi ? "२. त्रिविध भाषा प्रणाली" : "2. Trilingual Commentary"}
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] font-devanagari leading-relaxed">
              {isHindi
                ? "मूल संस्कृत के साथ शास्त्रीय हिन्दी भावार्थ, विद्वत्तापूर्ण अंग्रेज़ी अनुवाद एवं युवा पीढ़ी हेतु सरल हिंग्लिश व्याख्या उपलब्ध कराई जाती है।"
                : "Alongside original Sanskrit, we provide authoritative Hindi bhāvartha, scholarly English translation, and accessible Hinglish explanations for the modern seeker."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD21F]/20 border border-[#FFD21F] flex items-center justify-center text-[#111111]">
              <ShieldCheck className="w-5 h-5 text-[#D9A441]" />
            </div>
            <h2 className="font-serif text-lg font-bold text-[#111111]">
              {isHindi ? "३. १००% प्रामाणिक संदर्भ" : "3. Source Verification"}
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] font-devanagari leading-relaxed">
              {isHindi
                ? "सायण भाष्य, शंकराचार्य भाष्य और प्रामाणिक संहिताओं के मण्डल, काण्ड, सूक्त व श्लोक संख्या का प्रत्यक्ष उद्धरण दिया जाता है।"
                : "Complete bibliographic citations referencing Sayana Bhashya, Shankaracharya commentaries, and canonical editions with exact kanda, mandala, and verse numbers."}
            </p>
          </div>
        </div>

        {/* 3. Archival Architecture Overview */}
        <div className="p-8 rounded-2xl bg-stone-50 border border-[#E5E5E5] space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFD21F] px-3 py-1 rounded-full border border-[#FFD21F]">
              {isHindi ? "ज्ञान पदानुक्रम" : "Hierarchical Architecture"}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#111111]">
              {isHindi ? "चार वेद और उनकी पूर्ण शास्त्रीय शाखाएँ" : "The Four Vedas & Complete Shakha Subdivisions"}
            </h3>
            <p className="text-sm text-[#555555] font-devanagari">
              {isHindi
                ? "ऋग्वेद (शाकल), यजुर्वेद (माध्यन्दिन, काण्व, तैत्तिरीय), सामवेद (कौथुम, जैमिनीय) और अथर्ववेद (शौनक, पिप्पलाद) की संहिताओं, ब्राह्मणों, आरण्यकों और उपनिषदों की स्पष्ट संरचना।"
                : "Rigveda (Shakala), Yajurveda (Shukla Madhyandina/Kanva and Krishna Taittiriya), Samaveda (Kauthuma/Jaiminiya), and Atharvaveda (Shaunaka/Paippalada) structured down to Samhitas, Brahmanas, Aranyakas, and Principal Upanishads."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: "ऋग्वेद", sub: "१० मण्डल • १०२८ सूक्त", priest: "होतृ (Hotri)", link: "/library/veda?sub=rigveda" },
              { title: "यजुर्वेद", sub: "शुक्ल व कृष्ण शाखा", priest: "अध्वर्यु (Adhvaryu)", link: "/library/veda?sub=yajurveda" },
              { title: "सामवेद", sub: "गान एवं साम ऋचाएँ", priest: "उद्गातृ (Udgatri)", link: "/library/veda?sub=samaveda" },
              { title: "अथर्ववेद", sub: "२० काण्ड • ७३० सूक्त", priest: "ब्रह्मा (Brahma)", link: "/library/veda?sub=atharvaveda" },
            ].map((v) => (
              <Link
                key={v.title}
                to={v.link}
                className="p-4 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] transition-all group"
              >
                <h4 className="font-serif text-base font-bold text-[#111111] group-hover:text-[#D9A441]">
                  {v.title}
                </h4>
                <p className="text-xs text-[#555555] mt-1">{v.sub}</p>
                <span className="inline-block mt-2 text-[11px] font-semibold text-[#111111] bg-[#D9A441]/15 px-2 py-0.5 rounded border border-[#D9A441]/40">
                  {v.priest}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* 4. Contribution and Volunteer Governance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-6">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFD21F] px-3 py-1 rounded-full border border-[#FFD21F]">
              {isHindi ? "विद्वान एवं स्वयंसेवक सहयोग" : "Scholars & Volunteers"}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              {isHindi
                ? "वैदिक विद्वानों और शोधार्थियों का खुला सहयोग"
                : "Open Scholarly Collaboration & Peer-Review Governance"}
            </h3>
            <p className="text-sm text-[#555555] font-devanagari leading-relaxed">
              {isHindi
                ? "वेद लाइब्रेरी पर कोई भी असत्यापित सामग्री सीधे प्रकाशित नहीं की जाती। सभी आलेख, मंत्र और अनुवाद एक कठोर ५-चरणीय समीक्षा प्रक्रिया (Draft ➔ In Review ➔ Approved ➔ Published ➔ Archived) से होकर गुजरते हैं।"
                : "No unverified content is published directly. All submissions, translations, and manuscript transcriptions pass through a rigorous 5-stage editorial review workflow before going live."}
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-[#111111]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{isHindi ? "प्रमाणित वैदिक पंडितों और संस्कृत शोधार्थियों द्वारा सत्यापन" : "Peer-reviewed by verified Vedic Pandits and Sanskrit scholars"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#111111]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{isHindi ? "निःशुल्क, सार्वभौमिक एवं सर्व-सुलभ डिजिटल ज्ञान का अधिकार" : "Free, universal open access for practitioners, students, and researchers"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#111111]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{isHindi ? "पाण्डुलिपि संरक्षण एवं दुर्लभ ग्रंथों का डिजिटलीकरण" : "Digital preservation of endangered palm-leaf manuscripts and rare commentaries"}</span>
              </div>
            </div>

            <div className="pt-3 flex gap-3">
              <Link
                to="/contribute"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD21F] hover:bg-[#FFD21F]/90 text-[#111111] font-bold text-xs transition-all shadow-xs border border-[#FFD21F] hover:border-[#D9A441]"
              >
                <HeartHandshake className="w-4 h-4 text-[#111111]" />
                <span>{isHindi ? "योगदान निर्देशिका पढ़ें" : "Contribution Guidelines"}</span>
              </Link>
              <Link
                to="/scholars"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] text-[#111111] font-bold text-xs transition-colors"
              >
                <Users className="w-4 h-4 text-[#D9A441]" />
                <span>{isHindi ? "विद्वान मंडल देखें" : "Scholars & Editors"}</span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5E5E5] overflow-hidden shadow-sm">
            <img
              src={bannerKashiGhat}
              alt="Sacred Tradition"
              className="w-full h-80 object-cover object-center"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
