import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import {
  HeartHandshake,
  CheckCircle2,
  FileText,
  Upload,
  Send,
  Sparkles,
  BookOpen,
  ShieldCheck,
  HelpCircle,
  AlertCircle,
  Home
} from "lucide-react";
import bannerFireRitual from "../assets/images/library/banners/banner-fire-ritual.png";

export default function ContributePage() {
  const { isHindi } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    contributionType: "translation",
    scripture: "",
    shakhaReference: "",
    textData: "",
    sourceCitation: "",
  });

  const contributeSchema = [
    {
      "@type": "WebPage",
      name: "Contribution Guidelines — वेद पुस्तकालय योगदान निर्देशिका",
      url: "https://library.vedastructure.com/contribute",
      description:
        "वेद लाइब्रेरी में विद्वान, शोधार्थी व स्वयंसेवक के रूप में योगदान देने के नियम: पांडुलिपि प्रतिलेखन, अनुवाद, भाष्य संदर्भ एवं समीक्षा।",
      inLanguage: ["hi", "en", "sa"],
      publisher: {
        "@type": "Organization",
        name: "Veda Library",
        url: "https://library.vedastructure.com/",
        logo: "https://library.vedastructure.com/vite.svg",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "होम (Home)",
          item: "https://library.vedastructure.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "योगदान (Contribute)",
          item: "https://library.vedastructure.com/contribute",
        },
      ],
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111111] selection:bg-[#FFD21F] selection:text-[#111111]">
      <SEO
        title="Contribution Guidelines — वेद लाइब्रेरी में योगदान एवं पांडुलिपि सहयोग"
        description="वेद लाइब्रेरी में वैदिक विद्वानों, अनुवादकों और शोधार्थियों हेतु योगदान दिशानिर्देश: शुद्ध देवनागरी पाठ, सायण भाष्य संदर्भ, और संपादकीय समीक्षा प्रक्रिया।"
        canonical="/contribute"
        schema={contributeSchema}
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
            {isHindi ? "योगदान निर्देशिका (Contribute Guidelines)" : "Contribute Guidelines"}
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-[#111111] text-white py-14 sm:py-16 px-4 sm:px-6 lg:px-8 border-b-2 border-[#D9A441] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerFireRitual}
            alt="Contribute"
            className="w-full h-full object-cover object-center opacity-85 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1C] border border-[#D9A441]/50 text-[#FFD21F] text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{isHindi ? "विद्वान एवं स्वयंसेवक सहयोग" : "Scholarly Contribution & Volunteering"}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {isHindi ? "सनातन ज्ञान परंपरा के संरक्षण में अपना योगदान दें" : "Contribute to Preserving the Sacred Vedic Knowledge Archive"}
          </h1>

          <p className="max-w-2xl mx-auto font-devanagari text-sm sm:text-base text-stone-300">
            {isHindi
              ? "यदि आप वैदिक पंडित, संस्कृत शोधार्थी, अनुवादक या डिजिटलीकरण स्वयंसेवक हैं, तो ज्ञान की इस अविरल धारा में सहभागी बनें।"
              : "Collaborate with Veda Library as a verified scholar, translator, or digitization volunteer to preserve rare manuscripts and canonical scriptures."}
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Guidelines Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#FFD21F]/20 border border-[#FFD21F] flex items-center justify-center text-[#111111] mb-3">
              <BookOpen className="w-4 h-4 text-[#D9A441]" />
            </div>
            <h2 className="font-serif text-base font-bold text-[#111111]">
              १. शुद्ध देवनागरी अनिवार्य
            </h2>
            <p className="text-xs text-[#555555] font-devanagari leading-relaxed">
              मूल संस्कृत मंत्र एवं श्लोक केवल शुद्ध देवनागरी लिपि में होने चाहिए। रोमन/IAST लिप्यंतरण मूल पाठ में स्वीकृत नहीं है।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#FFD21F]/20 border border-[#FFD21F] flex items-center justify-center text-[#111111] mb-3">
              <ShieldCheck className="w-4 h-4 text-[#D9A441]" />
            </div>
            <h2 className="font-serif text-base font-bold text-[#111111]">
              २. प्रामाणिक भाष्य प्रमाण
            </h2>
            <p className="text-xs text-[#555555] font-devanagari leading-relaxed">
              सायण, शंकराचार्य, उव्वट, महीधर अथवा प्रतिष्ठित शास्त्रीय टीकाकारों के संस्करण व अध्याय संख्या का संदर्भ अनिवार्य है।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#FFD21F]/20 border border-[#FFD21F] flex items-center justify-center text-[#111111] mb-3">
              <CheckCircle2 className="w-4 h-4 text-[#D9A441]" />
            </div>
            <h2 className="font-serif text-base font-bold text-[#111111]">
              ३. सहकर्मी समीक्षा (Peer Review)
            </h2>
            <p className="text-xs text-[#555555] font-devanagari leading-relaxed">
              प्रत्येक प्रविष्टि को 'Approved' होने से पूर्व वेद विद्वान मंडल द्वारा सूक्ष्मता से परखा जाएगा।
            </p>
          </div>
        </section>

        {/* Submission Form */}
        <section className="bg-white border border-[#E5E5E5] p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFD21F] px-2.5 py-0.5 rounded border border-[#FFD21F]">
              {isHindi ? "प्रस्ताव प्रपत्र" : "Proposal Form"}
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#111111]">
              {isHindi ? "सामग्री प्रस्ताव या योगदान सबमिट करें" : "Submit a Contribution Proposal"}
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] font-devanagari">
              {isHindi ? "प्रस्ताव प्राप्त होने के उपरांत हमारी संपादकीय टीम ३ कार्यदिवसों में आपसे संपर्क करेगी।" : "Our editorial council will review your proposal and respond within 3 business days."}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-xl bg-[#FAF7F2] border border-[#D9A441] text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#FFD21F] text-[#111111] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-6 h-6 text-[#111111]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#111111]">
                {isHindi ? "धन्यवाद! आपका प्रस्ताव सफलतापूर्वक प्राप्त हो गया है।" : "Thank you! Proposal received successfully."}
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] font-devanagari max-w-md mx-auto">
                {isHindi
                  ? "हमारे वरिष्ठ शास्त्रीय संपादक आपके द्वारा प्रस्तुत संदर्भों की जांच कर आपसे शीघ्र ईमेल द्वारा संपर्क करेंगे।"
                  : "Our senior Vedic editors will verify the submitted citations and get in touch via email shortly."}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-3 px-5 py-2.5 rounded-lg bg-[#FFD21F] text-[#111111] text-xs font-bold cursor-pointer hover:bg-[#D9A441] transition-colors"
              >
                {isHindi ? "अन्य सामग्री सबमिट करें" : "Submit Another Contribution"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-1">
                    {isHindi ? "आपका नाम (Full Name) *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="उदा. डॉ. विद्याधर शर्मा"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E5E5E5] text-xs text-[#111111] focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-1">
                    {isHindi ? "ईमेल पता (Email Address) *" : "Email Address *"}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vidyadhar@gurukul.org"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E5E5E5] text-xs text-[#111111] focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-1">
                    {isHindi ? "योगदान का प्रकार (Contribution Role)" : "Contribution Role"}
                  </label>
                  <select
                    value={formData.contributionType}
                    onChange={(e) => setFormData({ ...formData, contributionType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E5E5E5] text-xs text-[#111111] focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F]"
                  >
                    <option value="translation">संस्कृत से हिन्दी/अंग्रेजी अनुवाद</option>
                    <option value="manuscript">दुर्लभ पांडुलिपि प्रतिलेखन</option>
                    <option value="commentary">सायण/शंकर भाष्य संदर्भ</option>
                    <option value="editorial">समीक्षक / प्रूफरीडर</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-1">
                    {isHindi ? "ग्रंथ एवं शाखा (Scripture & Shakha) *" : "Scripture & Shakha *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.scripture}
                    onChange={(e) => setFormData({ ...formData, scripture: e.target.value })}
                    placeholder="उदा. ऋग्वेद शाकल संहिता (मण्डल ७)"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E5E5E5] text-xs text-[#111111] focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1">
                  {isHindi ? "मूल पाठ एवं विवरण (Original Devanagari Text & Translation) *" : "Original Devanagari Text & Translation *"}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.textData}
                  onChange={(e) => setFormData({ ...formData, textData: e.target.value })}
                  placeholder={isHindi ? "यहाँ देवनागरी पाठ, पदच्छेद अथवा भावार्थ लिखें..." : "Enter Devanagari verse, pada-patha, or commentary..."}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E5E5E5] text-xs text-[#111111] focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1">
                  {isHindi ? "स्रोत संदर्भ एवं संस्करण (Publisher, Year, Volume reference) *" : "Publisher, Year & Volume Reference *"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.sourceCitation}
                  onChange={(e) => setFormData({ ...formData, sourceCitation: e.target.value })}
                  placeholder="उदा. वैदिक संशोधन मण्डल, पुणे (१९३३), खण्ड ३, पृष्ठ ४१२"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E5E5E5] text-xs text-[#111111] focus:outline-none focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FFD21F] text-[#111111] font-bold text-xs hover:bg-[#D9A441] transition-all shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#111111]" />
                <span>{isHindi ? "प्रस्ताव सबमिट करें" : "Submit Proposal"}</span>
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
