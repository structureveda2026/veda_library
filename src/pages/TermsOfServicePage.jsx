import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import {
  FileText,
  Scale,
  ShieldAlert,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  AlertTriangle,
  Award,
  ExternalLink
} from "lucide-react";
import bannerSanctum from "../assets/images/library/banners/banner-sanctum.png";

export default function TermsOfServicePage() {
  const { isHindi } = useLanguage();

  const termsSchema = [
    {
      "@type": "WebPage",
      name: "Terms of Service — वेद पुस्तकालय नियम एवं शर्तें",
      url: "https://library.vedastructure.com/terms",
      description:
        "वेद लाइब्रेरी की सेवा शर्तें: वैदिक ग्रंथों का शैक्षणिक उपयोग, बौद्धिक संपदा अधिकार, अकादमिक उद्धरण नीति और आचार संहिता।",
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
          name: "नियम एवं शर्तें (Terms of Service)",
          item: "https://library.vedastructure.com/terms"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111]">
      <SEO
        title={
          isHindi
            ? "नियम एवं शर्तें (Terms of Service) | वेद पुस्तकालय • Veda Library"
            : "Terms of Service | Veda Library • Digital Vedic Archive"
        }
        description={
          isHindi
            ? "वेद पुस्तकालय के उपयोग के नियम, बौद्धिक संपदा, शोध उद्धरण दिशा-निर्देश एवं सेवा शर्तें।"
            : "Terms of service, intellectual property, citation guidelines, and academic use of Veda Library digital corpus."
        }
        canonicalUrl="https://library.vedastructure.com/terms"
        schema={termsSchema}
      />

      {/* Top Breadcrumb Navigation */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E5E5] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs text-[#666666]">
          <Link to="/" className="hover:text-[#991B1B] transition-colors">
            {isHindi ? "होम" : "Home"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#999999]" />
          <span className="text-[#111111] font-semibold">
            {isHindi ? "नियम एवं शर्तें" : "Terms of Service"}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#111111] text-[#FFFFFF] py-5 sm:py-8 border-b-4 border-[#D9A441]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={bannerSanctum}
            alt="Sanctum Background"
            className="w-full h-full object-cover object-center opacity-85 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F1F1F] border border-[#D9A441]/40 text-[#FFD21F] text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-4 h-4 text-[#FFD21F]" />
            <span>{isHindi ? "सेवा नियम एवं उद्धरण संहिता" : "Terms & Citation Code"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FFFFFF] tracking-tight leading-tight">
            {isHindi ? "नियम एवं शर्तें" : "Terms of Service"}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#D4D4D4] max-w-2xl leading-relaxed">
            {isHindi
              ? "सनातन वैदिक ज्ञान की प्रामाणिकता, निष्पक्षता एवं मर्यादा की रक्षा हेतु निर्धारित उपयोग नियम। कृपया पुस्तकालय का उपयोग करने से पूर्व इन्हें ध्यानपूर्वक पढ़ें।"
              : "Guidelines governing the respectful scholarly use, academic citation, and digital preservation of Veda Library."}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[#999999]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD21F]" />
              {isHindi ? "प्रभावी तिथि: अक्टूबर २०२६" : "Effective Date: October 2026"}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#D9A441] font-semibold">
              {isHindi ? "सार्वजनिक वैदिक धरोहर हेतु समर्पित" : "Dedicated to Open Vedic Heritage"}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8">
        <div className="space-y-6 sm:space-y-10">

          {/* Section 1: Scope & Acceptance */}
          <section className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-2xl px-3.5 sm:px-8 py-5 sm:py-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0EBE1] pb-4">
              <BookOpen className="w-5 h-5 text-[#991B1B]" />
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#111111]">
                {isHindi ? "१. स्वीकृति एवं उपयोग का उद्देश्य" : "1. Acceptance & Permitted Usage"}
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#444444] leading-relaxed">
              <p>
                {isHindi
                  ? "वेद पुस्तकालय (Veda Library) पर उपलब्ध समस्त सामग्री—वेद संहिताएं, ब्राह्मण, आरण्यक, उपनिषद, वेदांग, पुराण, रामायण, महाभारत, सूत्र, स्तोत्र एवं मंत्र—का उपयोग केवल व्यक्तिगत स्वाध्याय, शोध, अध्यापन एवं ज्ञान संवर्धन हेतु अनुमत है।"
                  : "By accessing Veda Library, you agree to comply with these terms. All scriptures—Samhitas, Brahmanas, Aranyakas, Upanishads, Vedangas, Puranas, Itihasas, and Mantras—are provided strictly for personal study, spiritual practice, academic research, and non-commercial educational enrichment."}
              </p>
            </div>
          </section>

          {/* Section 2: Intellectual Property & Public Domain */}
          <section className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-2xl px-3.5 sm:px-8 py-5 sm:py-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0EBE1] pb-4">
              <Award className="w-5 h-5 text-[#B45309]" />
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#111111]">
                {isHindi ? "२. बौद्धिक संपदा एवं सार्वजनिक धरोहर (Public Domain)" : "2. Intellectual Property & Public Domain Rights"}
              </h2>
            </div>
            <div className="space-y-4 text-sm text-[#444444] leading-relaxed">
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5] space-y-2">
                <span className="font-semibold text-xs text-[#991B1B] uppercase tracking-wider block">
                  {isHindi ? "क. मूल संस्कृत श्लोक एवं मंत्र" : "A. Canonical Sanskrit Corpus"}
                </span>
                <p>
                  {isHindi
                    ? "समस्त प्राचीन वैदिक एवं शास्त्रीय संस्कृत मूल पाठ सार्वभौमिक मानव धरोहर (Public Domain) हैं। इन पर किसी भी व्यक्ति या संस्था का अनन्य कॉपीराइट नहीं है।"
                    : "The ancient Sanskrit root verses, mantras, and canonical scriptures are universal human heritage in the public domain, free from exclusive proprietary ownership."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5] space-y-2">
                <span className="font-semibold text-xs text-[#B45309] uppercase tracking-wider block">
                  {isHindi ? "ख. आधुनिक अनुवाद, भाष्य एवं आलेख" : "B. Translations, Editorial Annotations & Articles"}
                </span>
                <p>
                  {isHindi
                    ? "वेद पुस्तकालय के विद्वानों, संपादकों एवं योगदानकर्ताओं द्वारा तैयार किए गए आधुनिक हिंदी/अंग्रेजी अनुवाद, पद-पाठ विश्लेषण, विषय वर्गीकरण और आलेख 'Creative Commons Attribution-NonCommercial (CC BY-NC 4.0)' के अंतर्गत संरक्षित हैं।"
                    : "Contemporary translations, Pada-patha breakdowns, editorial commentaries, knowledge graphs, and thematic articles prepared by Veda Library scholars are governed by CC BY-NC 4.0 (Attribution-NonCommercial)."}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Citation Guidelines */}
          <section className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-2xl px-3.5 sm:px-8 py-5 sm:py-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0EBE1] pb-4">
              <FileText className="w-5 h-5 text-[#10B981]" />
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#111111]">
                {isHindi ? "३. अकादमिक शोध एवं उद्धरण नीति (Academic Citation)" : "3. Scholarly Citation Guidelines"}
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#444444] leading-relaxed">
              <p>
                {isHindi
                  ? "यदि आप अपने शोध पत्र, पुस्तक अथवा व्याख्यान में वेद पुस्तकालय के पाठ अथवा भाष्य का उपयोग करते हैं, तो निम्नलिखित प्रारूप में उद्धरण (Citation) देना अनिवार्य है:"
                  : "Scholars, university researchers, and authors quoting from Veda Library should cite using the canonical format:"}
              </p>

              <div className="p-4 rounded-xl bg-[#111111] text-[#FFFFFF] font-mono text-xs overflow-x-auto border border-[#333333]">
                <p className="text-[#FFD21F] font-semibold mb-1">
                  {isHindi ? "// अनुशंसित उद्धरण प्रारूप:" : "// Recommended Academic Citation Format:"}
                </p>
                <code>
                  Veda Library Editorial Board. "[Text/Mantra Title]". Veda Structure Digital Archive.
                  Retrieved from https://library.vedastructure.com/texts/[text-slug] (Accessed: [Date]).
                </code>
              </div>
            </div>
          </section>

          {/* Section 4: Prohibited Uses */}
          <section className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-2xl px-3.5 sm:px-8 py-5 sm:py-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0EBE1] pb-4">
              <ShieldAlert className="w-5 h-5 text-[#991B1B]" />
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#111111]">
                {isHindi ? "४. निषिद्ध गतिविधियां" : "4. Prohibited Activities"}
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#444444] leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  {isHindi
                    ? "सर्वर पर अनुचित भार डालने वाली स्वचालित भारी स्क्रैपिंग (Aggressive automated scraping or DoS) पूर्णतः निषिद्ध है।"
                    : "Aggressive automated scraping, bulk data harvesting, or server denial-of-service attempts that degrade public availability."}
                </li>
                <li>
                  {isHindi
                    ? "वैदिक मंत्रों या श्लोकों के अर्थों को जानबूझकर विकृत करना, पाठ में अनधिकृत मिलावट करना या भ्रामक संदर्भ प्रस्तुत करना।"
                    : "Deliberate distortion of Vedic verses, malicious falsification of source commentaries, or misrepresenting traditional attributions."}
                </li>
                <li>
                  {isHindi
                    ? "पुस्तकालय की सामग्री को बिना अनुमति किसी व्यावसायिक उत्पाद, सशुल्क पेवॉल अथवा विज्ञापन-युक्त ऐप में पैकेज करना।"
                    : "Repackaging free public Vedic heritage into paid proprietary paywalls without explicit authorization."}
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5: Spiritual and Astrological Disclaimer */}
          <section className="bg-[#FFFDF5] border-2 border-[#D9A441]/50 rounded-2xl px-3.5 sm:px-8 py-5 sm:py-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-[#EAD5A0] pb-4">
              <AlertTriangle className="w-5 h-5 text-[#B45309]" />
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#111111]">
                {isHindi ? "५. शास्त्रीय एवं ज्योतिषीय अध्ययन अस्वीकरण (Disclaimer)" : "5. Scholarly & Astrological Study Disclaimer"}
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[#444444] leading-relaxed">
              <p>
                {isHindi
                  ? "ज्योतिष, वास्तु, आयुर्वेद, हस्तरेखा एवं कर्मकांड से संबंधित ग्रंथ पारंपरिक भारतीय ज्ञान के शोध एवं ऐतिहासिक अध्ययन हेतु प्रस्तुत किए गए हैं। इन्हें आधुनिक चिकित्सा, कानूनी अथवा वित्तीय परामर्श का विकल्प नहीं माना जाना चाहिए।"
                  : "Texts and articles regarding Jyotisha, Vastu, Ayurveda, and ritual practices reflect traditional cultural heritage and philosophy. They are intended for academic inquiry and spiritual study, and should not be construed as medical, legal, or licensed financial advice."}
              </p>
            </div>
          </section>

          {/* Section 6: Inquiries and Grievance */}
          <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-2xl px-3.5 sm:px-8 py-5 sm:py-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-serif font-bold text-base text-[#111111]">
                {isHindi ? "नियमों से संबंधित प्रश्न अथवा कॉपीराइट अनुमति" : "Questions Concerning Terms or Copyright Permissions"}
              </h3>
              <p className="text-xs text-[#666666] mt-1">
                {isHindi ? "संपादकीय मंडल से सीधा संपर्क करें:" : "Contact the Editorial Board directly:"}{" "}
                <a href="mailto:legal@vedastructure.com" className="font-mono text-[#991B1B] font-semibold">
                  legal@vedastructure.com
                </a>
              </p>
            </div>
            <Link
              to="/editorial-policy"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111111] text-[#FFFFFF] hover:bg-[#991B1B] transition-colors text-xs font-semibold"
            >
              <span>{isHindi ? "संपादकीय नीति पढ़ें" : "Read Editorial Policy"}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#FFD21F]" />
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
