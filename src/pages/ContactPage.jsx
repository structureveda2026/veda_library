import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ChevronRight,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  Home
} from "lucide-react";
import bannerSanctum from "../assets/images/library/banners/banner-sanctum.png";
import bannerKashiGhat from "../assets/images/library/banners/banner-kashi-ghat.png";

export default function ContactPage() {
  const { isHindi } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "general",
    subject: "",
    message: ""
  });
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const contactSchema = [
    {
      "@type": "ContactPage",
      name: "Contact Veda Library — वेद पुस्तकालय संपर्क",
      url: "https://library.vedastructure.com/contact",
      description:
        "वेद लाइब्रेरी संपर्क सूत्र: विद्वत परामर्श, पाठ शुद्धि, पांडुलिपि शोध और सामान्य पूछताछ।",
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
          name: "संपर्क (Contact Us)",
          item: "https://library.vedastructure.com/contact"
        }
      ]
    }
  ];

  const faqs = [
    {
      q: isHindi
        ? "यदि मुझे किसी श्लोक या मंत्र में कोई मुद्रण त्रुटि (Typo) दिखे, तो क्या करूं?"
        : "How do I report a typographical error or variant in a Sanskrit shloka?",
      a: isHindi
        ? "आप नीचे दिए गए फॉर्म में 'पाठ शुद्धि व त्रुटि (Typo/Correction)' विषय चुनकर संबंधित वेद, मण्डल, सूक्त अथवा श्लोक संख्या तथा शुद्ध पाठ का संदर्भ भेज सकते हैं। हमारी विद्वत परिषद २४-४८ घंटों में इसका सत्यापन करती है।"
        : "Select 'Typo / Verse Correction' in the inquiry form below, providing the Scripture, Kanda/Mandala, Sukta, and Verse number along with your cited edition. Our editorial board verifies and corrects within 24–48 hours."
    },
    {
      q: isHindi
        ? "क्या विश्वविद्यालय के शोधार्थी व प्रोफेसर लेख या भाष्य प्रकाशित कर सकते हैं?"
        : "Can university researchers and Vedic scholars publish articles or commentaries?",
      a: isHindi
        ? "हाँ! वेद लाइब्रेरी शोधार्थियों और प्राच्यविद्याविदों का स्वागत करती है। आप हमारे योगदान पृष्ठ (/contribute) पर जाकर सीधे पांडुलिपि अथवा लेख समीक्षा हेतु प्रस्तुत कर सकते हैं।"
        : "Yes! We welcome peer-reviewed contributions, critical editions, and research monographs. Please visit our Contribute page (/contribute) to submit manuscripts directly."
    },
    {
      q: isHindi
        ? "क्या वेद लाइब्रेरी का उपयोग शोध व अध्ययन हेतु पूर्णतः निःशुल्क है?"
        : "Is Veda Library completely free for academic researchers and spiritual seekers?",
      a: isHindi
        ? "हाँ, वेद पुस्तकालय पूर्णतः खुला एवं निःशुल्क डिजिटल ज्ञानपीठ है। हमारा लक्ष्य सनातन वैदिक धरोहर को बिना किसी पेवॉल अथवा व्यावसायिक रुकावट के जन-जन तक पहुँचाना है।"
        : "Yes, Veda Library is 100% free and open access. Our mission is universal digital preservation of sacred Vedic knowledge without paywalls."
    },
    {
      q: isHindi
        ? "क्या आप दुर्लभ हस्तलिखित पांडुलिपियों के डिजिटलीकरण में सहायता करते हैं?"
        : "Do you assist in digitizing rare palm-leaf or paper manuscripts?",
      a: isHindi
        ? "अवश्य। यदि आपके पास या आपके संस्थान में दुर्लभ वैदिक या शास्त्रीय पांडुलिपियां हैं, तो हमें 'scholars@vedastructure.com' पर संपर्क करें। हम उच्च-गुणवत्ता डिजिटलीकरण में तकनीकी सहयोग प्रदान करते हैं।"
        : "Absolutely. If you or your institution holds rare Vedic or Shastra manuscripts, please contact scholars@vedastructure.com for collaborative archival scanning."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111]">
      <SEO
        title={
          isHindi
            ? "संपर्क करें (Contact Us) | वेद पुस्तकालय • Veda Library"
            : "Contact Us | Veda Library • Digital Vedic Archive"
        }
        description={
          isHindi
            ? "वेद पुस्तकालय संपादकीय मंडल, विद्वत परिषद एवं तकनीकी सहयोग से संपर्क करें। काशी अनुसंधान केंद्र।"
            : "Contact Veda Library editorial board, scholar council, and technical team. Varanasi Research Center."
        }
        canonicalUrl="https://library.vedastructure.com/contact"
        schema={contactSchema}
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
            {isHindi ? "संपर्क (Contact Us)" : "Contact Us"}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#111111] text-[#FFFFFF] py-14 sm:py-18 border-b-2 border-[#D9A441]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={bannerKashiGhat}
            alt="Kashi Ghat Background"
            className="w-full h-full object-cover object-center opacity-85 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F1F1F] border border-[#D9A441]/40 text-[#FFD21F] text-xs font-semibold uppercase tracking-wider mb-4">
            <MessageSquare className="w-4 h-4 text-[#FFD21F]" />
            <span>{isHindi ? "विद्वत संवाद एवं सहायता" : "Scholarly Dialogue & Support"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FFFFFF] tracking-tight leading-tight">
            {isHindi ? "संपर्क करें — वेद पुस्तकालय" : "Contact Veda Library"}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#D4D4D4] max-w-2xl leading-relaxed">
            {isHindi
              ? "पाठ शुद्धि, पांडुलिपि संदर्भ, शोध साझेदारी अथवा सामान्य पूछताछ हेतु हमारी संपादकीय टीम और विद्वत परिषद से जुड़ें।"
              : "Connect with our editorial council, Sanskrit researchers, and technical archiving team for corrections, research inquiries, or partnerships."}
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Contact Cards */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Left Column: Interactive Contact Form (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-serif font-bold text-[#111111] mb-2">
                {isHindi ? "संदेश भेजें" : "Send an Inquiry"}
              </h2>
              <p className="text-xs text-[#666666] mb-6">
                {isHindi
                  ? "कृपया नीचे दिए गए प्रपत्र में अपना विवरण भरें। हम २४ से ४८ घंटों में उत्तर देंगे।"
                  : "Please fill out the form below. We typically respond within 24–48 hours."}
              </p>

              {submitted ? (
                <div className="p-8 rounded-xl bg-[#FAF7F2] border border-[#D9A441] text-center space-y-3 shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-[#FFD21F] text-[#111111] flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-6 h-6 text-[#111111]" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#111111]">
                    {isHindi ? "संदेश सफलतापूर्वक प्राप्त हुआ!" : "Message Received Successfully!"}
                  </h3>
                  <p className="text-xs text-[#555555] max-w-md mx-auto">
                    {isHindi
                      ? "आपके बहुमूल्य सुझाव/पूछताछ के लिए धन्यवाद। संपादकीय मंडल शीघ्र ही आपसे ईमेल द्वारा संपर्क करेगा।"
                      : "Thank you for reaching out. Our editorial team will review your message and reply via email shortly."}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", inquiryType: "general", subject: "", message: "" });
                    }}
                    className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD21F] text-[#111111] text-xs font-bold hover:bg-[#D9A441] transition-colors cursor-pointer"
                  >
                    <span>{isHindi ? "दूसरा संदेश भेजें" : "Send Another Message"}</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#333333] mb-1">
                        {isHindi ? "आपका नाम *" : "Your Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isHindi ? "उदा. आचार्य रमेश शर्मा" : "e.g. Dr. Ramesh Sharma"}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E5] focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F] text-sm outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#333333] mb-1">
                        {isHindi ? "ईमेल पता *" : "Email Address *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E5] focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F] text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#333333] mb-1">
                        {isHindi ? "पूछताछ का प्रकार" : "Inquiry Category"}
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E5] focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F] text-sm outline-none bg-white transition-all"
                      >
                        <option value="general">{isHindi ? "सामान्य पूछताछ (General)" : "General Inquiry"}</option>
                        <option value="correction">{isHindi ? "पाठ शुद्धि व त्रुटि (Typo/Correction)" : "Text / Shloka Correction"}</option>
                        <option value="scholar">{isHindi ? "विद्वत सहयोग व शोध (Scholarly Collab)" : "Scholar & Research Collab"}</option>
                        <option value="manuscript">{isHindi ? "पांडुलिपि अभिलेखागार (Manuscripts)" : "Manuscript Archive Request"}</option>
                        <option value="technical">{isHindi ? "तकनीकी समस्या (Technical Issue)" : "Technical / Bug Report"}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#333333] mb-1">
                        {isHindi ? "विषय" : "Subject"}
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={isHindi ? "उदा. ऋग्वेद सूक्त १.१ संदर्भ" : "e.g. Rigveda 1.1 Citation"}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E5] focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F] text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#333333] mb-1">
                      {isHindi ? "संदेश / विवरण *" : "Message / Text Details *"}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        isHindi
                          ? "कृपया अपना प्रश्न अथवा शुद्धि का विवरण यहाँ लिखें..."
                          : "Please elaborate your inquiry, citation query, or correction details..."
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E5E5] focus:border-[#FFD21F] focus:ring-1 focus:ring-[#FFD21F] text-sm outline-none transition-all resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto min-h-[44px] px-7 py-3 rounded-xl bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-98"
                  >
                    <Send className="w-4 h-4 text-[#111111]" />
                    <span>{isHindi ? "संदेश प्रेषित करें" : "Transmit Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Channels & Sanctum (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Email Channels Card */}
            <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-[#111111] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D9A441]" />
                <span>{isHindi ? "सीधे संपर्क सूत्र (Direct Channels)" : "Direct Email Channels"}</span>
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5]">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                    {isHindi ? "सामान्य पूछताछ व सहयोग" : "General & Archival Inquiries"}
                  </span>
                  <a
                    href="mailto:contact@vedastructure.com"
                    className="font-mono text-sm font-semibold text-[#111111] hover:text-[#D9A441] transition-colors"
                  >
                    contact@vedastructure.com
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5]">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#D9A441]">
                    {isHindi ? "संपादकीय मंडल व विद्वत परिषद" : "Editorial Board & Scholars"}
                  </span>
                  <a
                    href="mailto:editor@vedastructure.com"
                    className="font-mono text-sm font-semibold text-[#111111] hover:text-[#D9A441] transition-colors"
                  >
                    editor@vedastructure.com
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5]">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                    {isHindi ? "पांडुलिपि व अकादमिक शोध" : "Academic Research & Manuscripts"}
                  </span>
                  <a
                    href="mailto:scholars@vedastructure.com"
                    className="font-mono text-sm font-semibold text-[#111111] hover:text-[#D9A441] transition-colors"
                  >
                    scholars@vedastructure.com
                  </a>
                </div>
              </div>
            </div>

            {/* Research Sanctum Location */}
            <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-2xl p-6 shadow-xs space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFD21F]/20 flex items-center justify-center text-[#111111] flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#D9A441]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#111111]">
                    {isHindi ? "वैदिक शोध पीठ (Research Sanctum)" : "Vedic Research Hub"}
                  </h4>
                  <p className="text-xs text-[#555555] mt-1 leading-relaxed">
                    {isHindi
                      ? "वेद स्ट्रक्चर डिजिटल आर्काइव, काशी (वाराणसी), उत्तर प्रदेश — २२१००१, भारत।"
                      : "Veda Structure Digital Initiative, Kashi (Varanasi), Uttar Pradesh — 221001, India."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs text-[#777777] border-t border-[#E5E5E5]">
                <Clock className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>{isHindi ? "समीक्षा समय: सोमवार से शनिवार (10:00 - 18:00 IST)" : "Hours: Mon–Sat, 10:00–18:00 IST"}</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="p-5 rounded-2xl bg-[#111111] text-[#FFFFFF] border border-[#333333] space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFD21F] block">
                {isHindi ? "महत्वपूर्ण कड़ियां" : "Related Resources"}
              </span>
              <div className="flex flex-col gap-1.5 text-xs">
                <Link to="/editorial-policy" className="hover:text-[#FFD21F] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D9A441]">›</span>
                  <span>{isHindi ? "संपादकीय नीति (Editorial Policy)" : "Editorial Policy"}</span>
                </Link>
                <Link to="/contribute" className="hover:text-[#FFD21F] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D9A441]">›</span>
                  <span>{isHindi ? "विद्वान योगदान (Contribute Guidelines)" : "Contribute Guidelines"}</span>
                </Link>
                <Link to="/scholars" className="hover:text-[#FFD21F] transition-colors flex items-center gap-1.5">
                  <span className="text-[#D9A441]">›</span>
                  <span>{isHindi ? "भाष्यकार व विद्वान (Scholars Directory)" : "Scholars Directory"}</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/20 text-[#111111] border border-[#FFD21F]/40 text-xs font-semibold uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{isHindi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#111111]">
              {isHindi ? "विद्वत एवं शोध प्रश्नोत्तर" : "Scholarly Inquiries FAQ"}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full min-h-[48px] px-5 py-3.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2] transition-colors"
                  >
                    <span className="font-serif font-bold text-sm text-[#111111]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#999999] transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? "rotate-180 text-[#D9A441]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-[#555555] leading-relaxed border-t border-[#E5E5E5] bg-[#FAF7F2]/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
