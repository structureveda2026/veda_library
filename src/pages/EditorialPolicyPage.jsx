import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  AlertCircle,
  BookOpen,
  Scale,
  Sparkles,
  ArrowRight,
  GitBranch,
  Layers,
  Lock,
  UserCheck,
  Award,
  Home
} from "lucide-react";
import bannerSanctum from "../assets/images/library/banners/banner-sanctum.png";

export default function EditorialPolicyPage() {
  const { isHindi } = useLanguage();

  const editorialSchema = [
    {
      "@type": "WebPage",
      name: "Editorial Policy & Sources — वेद लाइब्रेरी संपादकीय नीति",
      url: "https://library.vedastructure.com/editorial-policy",
      description:
        "वेद लाइब्रेरी की संपादकीय एवं स्रोत नीति: ५-चरणीय समीक्षा वर्कफ़्लो, शुद्ध देवनागरी पाठ, सायण-भाष्य प्रमाण, त्रिभाषी अनुवाद और स्रोत उद्धरण नियम।",
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
          name: "संपादकीय नीति (Editorial Policy)",
          item: "https://library.vedastructure.com/editorial-policy"
        }
      ]
    }
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111111] selection:bg-[#FFD21F] selection:text-[#111111]">
      <SEO
        title="Editorial Policy & Sources — वेद लाइब्रेरी संपादकीय नीति एवं स्रोत प्रमाण"
        description="वेद लाइब्रेरी पर सामग्री प्रकाशन के कड़े मानक: शुद्ध देवनागरी पाठ, सायण एवं शंकराचार्य भाष्य संदर्भ, ५-स्तरीय संपादकीय समीक्षा और त्रिभाषी व्याख्या नीति।"
        canonical="/editorial-policy"
        schema={editorialSchema}
      />

      {/* Standardized Breadcrumbs Bar */}
      <div className="bg-white border-b border-[#E5E5E5] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#555555]">
          <Link to="/library" className="hover:text-[#111111] flex items-center gap-1 font-medium transition-colors">
            <Home className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>{isHindi ? "पुस्तकालय" : "Library"}</span>
          </Link>
          <span className="text-[#D9A441]">›</span>
          <Link to="/about" className="hover:text-[#111111] transition-colors">
            <span>{isHindi ? "परिचय" : "About"}</span>
          </Link>
          <span className="text-[#D9A441]">›</span>
          <span className="text-[#111111] font-bold">
            {isHindi ? "संपादकीय नीति" : "Editorial Policy & Classical Standards"}
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <section className="relative bg-[#111111] text-white py-5 sm:py-8 px-3.5 sm:px-6 lg:px-8 border-b-2 border-[#D9A441] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerSanctum}
            alt="Editorial Policy"
            className="w-full h-full object-cover object-center opacity-85 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1C] border border-[#D9A441]/50 text-[#FFD21F] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isHindi ? "संपादकीय सत्यनिष्ठा एवं स्रोत प्रमाण" : "Editorial Integrity & Source Standards"}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {isHindi ? "संपादकीय नीति, स्रोत सत्यापन एवं शास्त्रीय मानदंड" : "Editorial Policy, Source Verification & Classical Standards"}
          </h1>

          <p className="max-w-2xl mx-auto font-devanagari text-sm sm:text-base text-stone-300">
            {isHindi
              ? "सनातन ज्ञान परंपरा की शुचिता, प्रामाणिकता और विशुद्धता को अक्षुण्ण रखने हेतु Veda Library द्वारा निर्धारित आचार संहिता।"
              : "Strict governance standards established by Veda Library to maintain canonical accuracy, textual integrity, and academic rigor."}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-[0.3rem] sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
        {/* 1. Five Stage Publishing Workflow (Document Section 7) */}
        <section className="space-y-4">
          <div className="border-b border-[#E5E5E5] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFD21F] px-2.5 py-0.5 rounded border border-[#FFD21F]">
              {isHindi ? "५-चरणीय प्रकाशन प्रवाह" : "5-Stage Editorial Lifecycle"}
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#111111] mt-2">
              {isHindi ? "सामग्री समीक्षा एवं अनुमोदन चक्र" : "Content Review & Approval Stages"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            {[
              {
                step: "१. Draft",
                role: "Contributor / Volunteer",
                badge: "प्रारूप",
                desc: "स्वयंसेवक या अनुवादक द्वारा प्रारंभिक पाठ व विवरण तैयार करना। यह सार्वजनिक रूप से अदृश्य रहता है।"
              },
              {
                step: "२. In Review",
                role: "Vedic Reviewer",
                badge: "समीक्षाधीन",
                desc: "शास्त्रीय समीक्षक द्वारा मूल संस्कृत पाठ, पदच्छेद, छंद, ऋषि और देवता की प्रामाणिकता की जांच।"
              },
              {
                step: "३. Approved",
                role: "Senior Scholar",
                badge: "अनुमोदित",
                desc: "वरिष्ठ संस्कृत विद्वान द्वारा भाषाई भावार्थ और सायण/शंकर भाष्य संदर्भ की पुष्टि।"
              },
              {
                step: "४. Published",
                role: "Authorized Editor / Admin",
                badge: "प्रकाशित",
                desc: "अंतिम स्रोत मेटाडेटा, SEO टैग्स व कैनोनिकल यूआरएल के साथ डिजिटल लाइब्रेरी में लाइव।"
              },
              {
                step: "५. Archived",
                role: "Archivist",
                badge: "अभिलेखागार",
                desc: "ऐतिहासिक संस्करण व पांडुलिपि तुलना हेतु पुराने पाठ को बिना ब्रोकन लिंक के सुरक्षित रखना।"
              }
            ].map((st, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] hover:border-[#D9A441] hover:shadow-xs transition-all flex flex-col justify-between space-y-2 group"
              >
                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#111111] bg-[#FFD21F]/20 border border-[#FFD21F]/60 px-2 py-0.5 rounded-full mb-1">
                    {st.badge}
                  </span>
                  <h3 className="font-serif text-sm font-bold text-[#111111] mt-1">{st.step}</h3>
                  <span className="inline-block text-[10px] font-medium text-[#555555] bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-[#E5E5E5] mt-1">
                    {st.role}
                  </span>
                  <p className="text-xs text-[#555555] font-devanagari mt-2.5 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Source & Attribution Policy (Document Section 8) */}
        <section className="space-y-4">
          <div className="border-b border-[#E5E5E5] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFD21F] px-2.5 py-0.5 rounded border border-[#FFD21F]">
              {isHindi ? "स्रोत एवं उद्धरण मानक" : "Source & Bibliographic Standards"}
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#111111] mt-2">
              {isHindi ? "अनिवार्य स्रोत मेटाडेटा फ़ील्ड्स" : "Mandatory Metadata Fields for Authoritative Records"}
            </h2>
          </div>

          <div className="px-3.5 sm:px-6 py-5 sm:py-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs space-y-4">
            <p className="text-sm font-devanagari text-[#555555] leading-relaxed">
              {isHindi
                ? "बिना प्रमाणित स्रोत संदर्भ के किसी भी पाठ को 'Source Verified' बैज नहीं दिया जाता। प्रत्येक प्रविष्टि में निम्न विवरण दर्ज होना अनिवार्य है:"
                : "No content is certified as 'Source Verified' without complete provenance metadata. Every authoritative entry must include:"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              {[
                { label: "मूल ग्रंथ का नाम", en: "Canonical Scripture Title (e.g., ऋग्वेद शाकल संहिता)" },
                { label: "शाखा व सम्प्रदाय", en: "Shakha & Tradition (e.g., माध्यन्दिन / तैत्तिरीय / शौनक)" },
                { label: "विभाजन संदर्भ", en: "Mandala / Kanda / Sukta / Adhyaya / Verse numbers" },
                { label: "ऋषि, देवता एवं छंद", en: "Seer (Rishi), Presiding Devata, Metric Metre (Chandas)" },
                { label: "पारंपरिक भाष्य", en: "Commentary reference (Sayana, Shankara, Uvata, Mahidhara)" },
                { label: "प्रकाशक व संस्करण", en: "Publisher, Edition Year, Critical Apparatus identifier" },
                { label: "पांडुलिपि संदर्भ", en: "Manuscript ID & Digital Archive source (where available)" },
                { label: "सत्यापनकर्ता विद्वान", en: "Verified Reviewer / Editor signature" },
                { label: "कॉपीराइट व लाइसेंस", en: "Open Heritage Digital Commons license" }
              ].map((f, i) => (
                <div key={i} className="p-3 rounded-lg bg-stone-50 border border-[#E5E5E5]">
                  <p className="font-bold text-[#111111]">{f.label}</p>
                  <p className="text-[11px] text-[#555555] mt-0.5">{f.en}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Pure Devanagari & 3-Language Translation Policy */}
        <section className="space-y-4">
          <div className="border-b border-[#E5E5E5] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFD21F] px-2.5 py-0.5 rounded border border-[#FFD21F]">
              {isHindi ? "भाषा एवं लिपि नीति" : "Script & Linguistic Standard"}
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#111111] mt-2">
              {isHindi ? "विशुद्ध देवनागरी एवं त्रिविध भाषा दर्शन" : "Devanagari Sanskrit & 3-Tier Commentary System"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#C62828] font-bold text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{isHindi ? "मूल संस्कृत केवल देवनागरी में" : "Sacred Sanskrit: Pure Devanagari Only"}</span>
              </div>
              <p className="text-xs sm:text-sm font-devanagari text-[#555555] leading-relaxed">
                {isHindi
                  ? "वेदमंत्र, सूक्त, स्तोत्र और उपनिषद केवल विशुद्ध देवनागरी लिपि में प्रस्तुत किए जाते हैं। पवित्र संस्कृत मंत्रों के लिए रोमन/IAST लिप्यंतरण का उपयोग नहीं किया जाता ताकि मंत्रों की ध्वनि-शुचिता और उच्चारण-परंपरा सुरक्षित रहे।"
                  : "Sacred mantras, suktas, and stotras are strictly rendered in pure Devanagari script. Roman/IAST transliteration is omitted in sacred verses to preserve traditional phonetics and sacred chanting sanctity."}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#111111] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#D9A441]" />
                <span>{isHindi ? "त्रिविध भाषा भावार्थ" : "Three Mandatory Translation Formats"}</span>
              </div>
              <ul className="text-xs sm:text-sm font-devanagari text-[#555555] space-y-2">
                <li>• <strong>हिन्दी (Hindi):</strong> पद-पाठ, अन्वय और आध्यात्मिक भावार्थ।</li>
                <li>• <strong>English:</strong> स्पष्ट और अकादमिक दृष्टि से सटीक अंग्रेजी अनुवाद।</li>
                <li>• <strong>सरल हिंग्लिश (Hinglish):</strong> युवाओं व वैश्विक जिज्ञासुओं हेतु सहज रोमन-हिन्दी व्याख्या।</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Role Based Permissions (Document Section 7) */}
        <section className="px-3.5 sm:px-6 py-5 sm:py-6 rounded-2xl bg-[#FFFFFF] border border-[#E5E5E5] space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
            <Lock className="w-4 h-4 text-[#D9A441]" />
            <span>{isHindi ? "भूमिका एवं अधिकार (Role-Based Permissions)" : "Role-Based Content Governance"}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5]">
              <span className="font-bold text-[#111111] block mb-1">Contributor</span>
              <p className="text-[#555555]">केवल ड्राफ्ट बना सकते हैं और सबमिट कर सकते हैं। सीधे प्रकाशन का अधिकार नहीं है।</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5]">
              <span className="font-bold text-[#111111] block mb-1">Reviewer</span>
              <p className="text-[#555555]">मूल पाठ, छंद, ऋषि और स्रोत की प्रामाणिकता की जांच और समीक्षा टिप्पणियां जोड़ते हैं।</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5]">
              <span className="font-bold text-[#111111] block mb-1">Editor</span>
              <p className="text-[#555555]">अनुमोदित सामग्री का अंतिम संपादन, एसईओ मेटाडेटा सेट करना और लाइव पब्लिश करना।</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5E5E5]">
              <span className="font-bold text-[#111111] block mb-1">Administrator</span>
              <p className="text-[#555555]">श्रेणी प्रबंधन, ग्रंथ पदानुक्रम, रिडायरेक्ट्स, आर्काइवल और उपयोगकर्ता अनुमतियां।</p>
            </div>
          </div>
        </section>

        {/* CTA to Contribute */}
        <div className="p-8 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#111111]">
              {isHindi ? "क्या आप वैदिक शोधकर्ता या अनुवादक हैं?" : "Are you a Vedic scholar, translator or researcher?"}
            </h3>
            <p className="text-xs sm:text-sm text-[#555555] font-devanagari mt-1">
              {isHindi
                ? "हमारी संपादकीय समिति में स्वयंसेवक या समीक्षक के रूप में योगदान दें।"
                : "Join our verified editorial review board or volunteer for sacred manuscript digitization."}
            </p>
          </div>
          <Link
            to="/contribute"
            className="px-5 py-2.5 rounded-xl bg-[#FFD21F] text-[#111111] font-bold text-xs hover:bg-[#D9A441] transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            {isHindi ? "योगदान निर्देशिका देखें" : "View Contribution Guidelines"}
          </Link>
        </div>
      </div>
    </div>
  );
}
