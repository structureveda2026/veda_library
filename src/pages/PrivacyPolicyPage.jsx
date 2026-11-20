import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Database,
  FileCheck2,
  HardDrive,
  Mail,
  Scale,
  Sparkles,
  ChevronRight,
  BookOpen
} from "lucide-react";
import bannerSanctum from "../assets/images/library/banners/banner-sanctum.png";

export default function PrivacyPolicyPage() {
  const { isHindi } = useLanguage();

  const privacySchema = [
    {
      "@type": "WebPage",
      name: "Privacy Policy — वेद पुस्तकालय गोपनीयता नीति",
      url: "https://library.vedastructure.com/privacy-policy",
      description:
        "वेद लाइब्रेरी की गोपनीयता नीति: उपयोगकर्ता डेटा संरक्षण, डिजिटल अधिकार, शून्य-विज्ञापन नीति और वैदिक ज्ञान की खुली सुलभता।",
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
          name: "गोपनीयता नीति (Privacy Policy)",
          item: "https://library.vedastructure.com/privacy-policy"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111]">
      <SEO
        title={
          isHindi
            ? "गोपनीयता नीति (Privacy Policy) | वेद पुस्तकालय • Veda Library"
            : "Privacy Policy | Veda Library • Digital Vedic Archive"
        }
        description={
          isHindi
            ? "वेद पुस्तकालय की गोपनीयता नीति, डेटा सुरक्षा, शून्य-विज्ञापन नीति एवं डिजिटल अधिकार संरक्षण।"
            : "Privacy policy, data protection, zero-ads policy, and digital rights of Veda Library users and scholars."
        }
        canonicalUrl="https://library.vedastructure.com/privacy-policy"
        schema={privacySchema}
      />

      {/* Top Breadcrumb Navigation */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E5E5] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs text-[#666666]">
          <Link to="/" className="hover:text-[#991B1B] transition-colors">
            {isHindi ? "होम" : "Home"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#999999]" />
          <span className="text-[#111111] font-semibold">
            {isHindi ? "गोपनीयता नीति" : "Privacy Policy"}
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
            <ShieldCheck className="w-4 h-4 text-[#FFD21F]" />
            <span>{isHindi ? "डेटा सुरक्षा एवं गोपनीयता" : "Privacy & Data Protection"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FFFFFF] tracking-tight leading-tight">
            {isHindi ? "गोपनीयता नीति" : "Privacy Policy"}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#D4D4D4] max-w-2xl leading-relaxed">
            {isHindi
              ? "वेद पुस्तकालय आपकी डिजिटल गोपनीयता और शोध अधिकारों का पूर्ण आदर करता है। जानिए हम डेटा का संग्रहण, संरक्षण और उपयोग किस प्रकार करते हैं।"
              : "Veda Library is committed to protecting your privacy, reading habits, and digital rights while preserving open access to sacred Vedic wisdom."}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[#999999]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD21F]" />
              {isHindi ? "अंतिम अद्यतन: अक्टूबर २०२६" : "Last Updated: October 2026"}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#10B981] font-semibold">
              {isHindi ? "१००% विज्ञापन-मुक्त एवं गैर-व्यावसायिक" : "100% Ad-Free & Non-Commercial"}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8">
        <div className="space-y-6 sm:space-y-10">

          {/* Core Principle Callout */}
          <div className="bg-[#FFFFFF] border-2 border-[#D9A441]/40 rounded-2xl px-3.5 sm:px-8 py-5 sm:py-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#991B1B]/10 border border-[#991B1B]/20 flex items-center justify-center text-[#991B1B] flex-shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-[#111111]">
                  {isHindi ? "हमारा मूल सिद्धांत: शून्य व्यावसायिक डेटा विक्रय" : "Our Core Pledge: Zero Commercial Data Monetization"}
                </h2>
                <p className="text-sm text-[#444444] leading-relaxed">
                  {isHindi
                    ? "वेद पुस्तकालय एक सार्वजनिक शैक्षणिक एवं शोध-उन्मुख डिजिटल ज्ञानपीठ है। हम अपने उपयोगकर्ताओं का कोई भी व्यक्तिगत डेटा, शोध इतिहास, या संपर्क विवरण किसी भी तृतीय पक्ष को न तो बेचते हैं, न ही विज्ञापनों के लिए लक्षित करते हैं।"
                    : "Veda Library operates as a scholarly, public-interest digital archive. We do not sell, rent, or trade your personal information, reading queries, or browsing history to third-party data brokers or advertising networks."}
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Information Collected */}
          <section className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-2xl px-3.5 sm:px-8 py-5 sm:py-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0EBE1] pb-4">
              <Database className="w-5 h-5 text-[#991B1B]" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#111111]">
                {isHindi ? "१. हम कौन सी जानकारी एकत्र करते हैं" : "1. Information We Collect"}
              </h3>
            </div>
            <div className="space-y-3 text-sm text-[#444444] leading-relaxed">
              <p>
                {isHindi
                  ? "हम केवल वही न्यूनतम तकनीकी डेटा एकत्र करते हैं जो डिजिटल लाइब्रेरी के सुचारू संचालन और अध्ययन अनुभव को सहज बनाने के लिए आवश्यक है:"
                  : "We collect only the minimal data necessary to deliver a fast, scholarly, and reliable reading experience:"}
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>{isHindi ? "पठन प्राथमिकताएं (Local Preferences):" : "Reading Preferences (Local Storage):"}</strong>{" "}
                  {isHindi
                    ? "आपकी चुनी हुई भाषा (हिंदी / English / Hinglish), फ़ॉन्ट आकार, और डार्क/लाइट रीडिंग मोड। यह डेटा आपके स्वयं के ब्राउज़र में ही सुरक्षित रहता है।"
                    : "Your chosen language (Hindi / English / Hinglish), font sizing, and display preferences, saved strictly in your local browser storage."}
                </li>
                <li>
                  <strong>{isHindi ? "सर्च क्वेरी विश्लेषण (Search Telemetry):" : "Search Telemetry (Anonymized):"}</strong>{" "}
                  {isHindi
                    ? "पुस्तकालय में खोजे गए संस्कृत पद व विषय, ताकि हम सर्च इंडेक्स और शब्दकोश सुझावों को समृद्ध कर सकें। यह डेटा पूरी तरह अनामित (Anonymous) होता है।"
                    : "Sanskrit terms and subject keywords searched, used strictly to optimize fuzzy search indexing and Pada-patha lookups."}
                </li>
                <li>
                  <strong>{isHindi ? "स्वैच्छिक प्रपत्र (Voluntary Forms):" : "Voluntary Contact & Contribution Submissions:"}</strong>{" "}
                  {isHindi
                    ? "जब आप योगदान (Contribute) या संपर्क (Contact) प्रपत्र भरते हैं, तो आपका नाम, ईमेल, संस्थान और पांडुलिपि विवरण संपादकीय समीक्षा हेतु संग्रहीत होता है।"
                    : "When you submit a contact inquiry or contribution form, your name, email, institution, and submitted text are stored for editorial evaluation."}
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Cookies & Local Storage */}
          <section className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-2xl px-3.5 sm:px-8 py-5 sm:py-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0EBE1] pb-4">
              <HardDrive className="w-5 h-5 text-[#B45309]" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#111111]">
                {isHindi ? "२. कुकीज़ एवं लोकल स्टोरेज नीति" : "2. Cookies & Local Storage Policy"}
              </h3>
            </div>
            <div className="space-y-3 text-sm text-[#444444] leading-relaxed">
              <p>
                {isHindi
                  ? "वेद लाइब्रेरी किसी भी प्रकार की ट्रैकिंग कुकीज़ या क्रॉस-साइट विज्ञापन कुकीज़ का उपयोग नहीं करती है। हम केवल कार्यात्मक (Functional) लोकल स्टोरेज का उपयोग करते हैं:"
                  : "Veda Library employs no cross-site tracking cookies, behavioral ad pixels, or third-party marketing tags. We utilize only essential functional local storage for:"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5]">
                  <span className="block font-semibold text-xs text-[#991B1B] uppercase tracking-wider mb-1">
                    {isHindi ? "भाषा चयन" : "Language Choice"}
                  </span>
                  <p className="text-xs text-[#666666]">
                    {isHindi ? "हिंदी अथवा अंग्रेज़ी भाषा का स्मरण।" : "Remembering your preferred reading tongue."}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5]">
                  <span className="block font-semibold text-xs text-[#B45309] uppercase tracking-wider mb-1">
                    {isHindi ? "रीडर सेटिंग्स" : "Reader Layout"}
                  </span>
                  <p className="text-xs text-[#666666]">
                    {isHindi ? "देवनागरी टाइपोग्राफी व स्वर-चिह्न दृश्यता।" : "Preserving font scaling & accents."}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5]">
                  <span className="block font-semibold text-xs text-[#10B981] uppercase tracking-wider mb-1">
                    {isHindi ? "अध्याय बुकमार्क" : "Active Chapter"}
                  </span>
                  <p className="text-xs text-[#666666]">
                    {isHindi ? "अंतिम पढ़े गए सूक्त या श्लोक की स्थिति।" : "Restoring your active reading position."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Data Security */}
          <section className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-2xl px-3.5 sm:px-8 py-5 sm:py-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0EBE1] pb-4">
              <EyeOff className="w-5 h-5 text-[#10B981]" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#111111]">
                {isHindi ? "३. डेटा सुरक्षा एवं एन्क्रिप्शन" : "3. Technical Security & Encryption"}
              </h3>
            </div>
            <div className="space-y-3 text-sm text-[#444444] leading-relaxed">
              <p>
                {isHindi
                  ? "सभी नेटवर्क संप्रेषण आधुनिक TLS 1.3 एन्क्रिप्शन के अंतर्गत सुरक्षित हैं। आपके डिवाइस और वेद लाइब्रेरी सर्वर के बीच का डेटा मार्ग पूर्णतः सुरक्षित रहता है, जिससे किसी भी अनधिकृत हस्तक्षेप की संभावना शून्य हो जाती है।"
                  : "All client-server transmissions are strictly encrypted via TLS 1.3 protocol over HTTPS. We maintain strict server access logs with automatic IP anonymization after standard security retention windows."}
              </p>
            </div>
          </section>

          {/* Section 4: User Rights and Grievance */}
          <section className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-2xl px-3.5 sm:px-8 py-5 sm:py-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-[#F0EBE1] pb-4">
              <Scale className="w-5 h-5 text-[#991B1B]" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#111111]">
                {isHindi ? "४. उपयोगकर्ता अधिकार एवं शिकायत निवारण" : "4. Your Rights & Grievance Redressal"}
              </h3>
            </div>
            <div className="space-y-3 text-sm text-[#444444] leading-relaxed">
              <p>
                {isHindi
                  ? "डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP) और वैश्विक मानकों के अनुसार, आपको अपनी किसी भी सबमिट की गई जानकारी की समीक्षा करने, संशोधित करने अथवा पूर्णतः हटाने का अधिकार है।"
                  : "Under digital data protection frameworks, you maintain the right to inspect, correct, or request deletion of any contact or contribution data submitted to Veda Library."}
              </p>
              <div className="mt-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5] flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#991B1B]">
                    {isHindi ? "गोपनीयता अधिकारी संपर्क" : "Data Protection Officer Contact"}
                  </span>
                  <a
                    href="mailto:privacy@vedastructure.com"
                    className="text-sm font-mono font-medium text-[#111111] hover:text-[#991B1B] transition-colors"
                  >
                    privacy@vedastructure.com
                  </a>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] text-[#FFFFFF] hover:bg-[#991B1B] transition-all text-xs font-semibold"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FFD21F]" />
                  <span>{isHindi ? "संपर्क प्रपत्र खोलें" : "Open Contact Form"}</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Bottom Trust Note */}
          <div className="text-center pt-4">
            <p className="text-xs text-[#777777] font-devanagari">
              सत्यमेव जयते नानृतम् • सर्वेषां स्वस्तिर्भवतु
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
