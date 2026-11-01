import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SEO from "../components/common/SEO.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import {
  Users,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  Home,
  Clock,
  Milestone,
  Check,
  Layers
} from "lucide-react";
import bannerSanctum from "../assets/images/library/banners/banner-sanctum.png";

const SCHOLARS_DIRECTORY = [
  {
    slug: "sayana",
    name: "सायणाचार्य (Sayana)",
    title: "समस्त चतुर्वेद प्रधान भाष्यकार (Prime Vedic Commentator)",
    period: "१४वीं शताब्दी (विजयनगर साम्राज्य)",
    tradition: "माधवीय वेदार्थप्रकाश",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
    bio: "विजयनगर साम्राज्य के प्रधान अमात्य एवं वेदविद् जिन्होंने चारों वेदों—ऋग्वेद, यजुर्वेद, सामवेद एवं अथर्ववेद—की संहिताओं तथा ब्राह्मणों पर सांगोपांग प्रामाणिक भाष्य 'वेदार्थप्रकाश' रचा। आधुनिक वैदिक शोध का यह सर्वप्रमुख आधार स्तंभ है।",
    disciplines: ["चतुर्वेद संहिता भाष्य", "ब्राह्मण-आरण्यक मीमांसा", "माधवीय वेदार्थप्रकाश", "वैदिक स्वर प्रक्रिया"],
    works: [
      "ऋग्वेद संहिता सायण भाष्य (पदपाठ सहित)",
      "तैत्तिरीय संहिता भाष्य (कृष्ण यजुर्वेद)",
      "सामवेद संहिता भाष्य (कौथुम शाखा)",
      "अथर्ववेद संहिता सायण भाष्य",
      "ऐतरेय ब्राह्मण व आरण्यक भाष्य",
      "शतपथ ब्राह्मण भाष्य (माध्यन्दिन)"
    ],
    badge: "प्रधान वेद भाष्यकार",
    timeline: [
      { era: "१३१५ ई.", title: "विजयनगर साम्राज्य में आगमन", desc: "सम्राट हरिहर एवं बुक्क राय के प्रमुख राज्यामात्य व वेदविद् के रूप में प्रतिष्ठा।" },
      { era: "१३६० ई.", title: "वेदार्थप्रकाश महापरियोजना", desc: "विद्वत परिषद के साथ चारों वेदों की संहिताओं पर सांगोपांग भाष्य निर्माण का शुभारंभ।" },
      { era: "१३७५ ई.", title: "ऋग्वेद एवं यजुर्वेद सायण भाष्य", desc: "पदपाठ, स्वर-प्रक्रिया एवं याज्ञिक-आध्यात्मिक विनियोगों का प्रामाणिक समन्वय।" },
      { era: "१३८५ ई.", title: "ब्राह्मण व आरण्यक टीका सम्पूर्ति", desc: "ऐतरेय, तैत्तिरीय व शतपथ ब्राह्मणों पर आधिकारिक व्याख्याओं की पूर्णता।" },
      { era: "१३८७ ई.", title: "अथर्ववेद भाष्य सम्पूर्ति", desc: "चतुर्वेद भाष्य परंपरा को विश्व इतिहास में अमर बनाकर वैदिक ज्योति प्रज्वलित की।" }
    ]
  },
  {
    slug: "adi-shankara",
    name: "आदि शंकराचार्य (Adi Shankara)",
    title: "अद्वैत वेदान्त प्रस्थानत्रयी भाष्यकार",
    period: "८वीं शताब्दी (७८८–८२० ई.)",
    tradition: "अद्वैत वेदान्त संन्यास परंपरा",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
    bio: "प्रस्थानत्रयी (दश मुख्य उपनिषद, ब्रह्मसूत्र, और श्रीमद्भगवद्गीता) के अप्रतिम भाष्यकार। उन्होंने वैदिक अद्वैत दर्शन को पुनर्स्थापित किया और चारों दिशाओं में आम्नाय पीठों की स्थापना की।",
    disciplines: ["प्रस्थानत्रयी भाष्य", "शुद्ध अद्वैत दर्शन", "दशनामी संन्यास", "आम्नाय पीठ संस्थापन"],
    works: [
      "दशोपनिषद् भाष्य (ईश, केन, कठ, प्रश्न, मुण्डक, माण्डूक्य, आदि)",
      "ब्रह्मसूत्र शांकरभाष्य (चतुःसूत्री समन्वय)",
      "श्रीमद्भगवद्गीता शांकरभाष्य",
      "विवेकचूड़ामणि व उपदेशसाहस्री",
      "अपरोक्षानुभूति व आत्मबोध"
    ],
    badge: "प्रस्थानत्रयी भाष्यकार",
    timeline: [
      { era: "७८८ ई.", title: "कालटी (केरल) में प्राकट्य", desc: "बाल्यकाल में ही चतुर्वेद, व्याकरण एवं षड्दर्शनों में अद्वितीय प्रवीणता।" },
      { era: "८०० ई.", title: "गोविन्द भगवत्पाद से संन्यास", desc: "नर्मदा तट पर संन्यास दीक्षा एवं अद्वैत वेदान्त का गहन अनुसंधान।" },
      { era: "८०५-८१२ ई.", title: "प्रस्थानत्रयी भाष्य रचना", desc: "काशी एवं बद्रिकाश्रम में उपनिषद्, ब्रह्मसूत्र व गीता पर अमर शांकरभाष्यों का प्रणयन।" },
      { era: "८१५ ई.", title: "चतुराम्नाय पीठ स्थापना", desc: "श्रृंगेरी, पुरी, द्वारका एवं बद्रिकाश्रम में सनातन धर्म के चार आधारभूत पीठों की प्रतिष्ठा।" },
      { era: "८२० ई.", title: "केदारनाथ महासमाधि", desc: "३२ वर्ष की अल्पायु में वैदिक सनातन धर्म की अखण्ड पुनर्प्रतिष्ठा कर ब्रह्मलीन।" }
    ]
  },
  {
    slug: "veda-vyasa",
    name: "महर्षि कृष्ण द्वैपायन वेदव्यास (Maharshi Vyasa)",
    title: "वेदों के संकलनकर्ता एवं अष्टादश पुराण रचयिता",
    period: "द्वापर युग (वैदिक काल)",
    tradition: "वैदिक संकलन व पुराण परंपरा",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    bio: "जिन्होंने एक ही वेद के चार विभाग—ऋक्, यजुष्, साम, अथर्व—किए तथा अपने शिष्यों पैल, वैशम्पायन, जैमिनि एवं सुमन्तु को इनकी शिक्षा दी। महाभारत एवं १८ महापुराणों के प्रणेता।",
    disciplines: ["चतुर्वेद विभाजन", "अष्टादश महापुराण", "ब्रह्मसूत्र", "महाभारत इतिहास"],
    works: [
      "चतुर्वेद संहिता विभाजन (ऋक्, यजुष्, साम, अथर्व)",
      "महाभारत (जय-भारत-महाभारत १,००,००० श्लोक)",
      "श्रीमद्भागवत महापुराण (१८,००० श्लोक)",
      "ब्रह्मसूत्र (वेदान्त दर्शन के ५५५ सूत्र)"
    ],
    badge: "वेद विभाजक",
    timeline: [
      { era: "द्वापर युग", title: "ऋषि पराशर व सत्यवती सुपुत्र", desc: "यमुना तट पर द्वैपायन ऋषि के रूप में प्राकट्य, कठोर तपश्चर्या।" },
      { era: "वैदिक काल", title: "एकमंत्र वेद का चतुर्धा विभाजन", desc: "मानव कल्याण हेतु ऋक्, यजुष्, साम और अथर्व चार शाखाओं में वर्गीकरण।" },
      { era: "परंपरा स्थापन", title: "शिष्य परंपरा को वेद वितरण", desc: "पैल (ऋग्वेद), वैशम्पायन (यजुर्वेद), जैमिनि (सामवेद), सुमन्तु (अथर्ववेद) को समर्पण।" },
      { era: "इतिहास प्रणयन", title: "महाभारत एवं ब्रह्मसूत्र रचना", desc: "१,००,००० श्लोकों वाले महाकाव्य एवं ५५५ ब्रह्मसूत्रों का प्रणयन।" },
      { era: "चरम समाधि", title: "श्रीमद्भागवत महापुराण रचना", desc: "नारद जी की प्रेरणा से बद्रिकाश्रम में १८,००० श्लोकी भागवत का प्राकट्य।" }
    ]
  },
  {
    slug: "shaunaka",
    name: "महर्षि शौनक (Acharya Shaunaka)",
    title: "ऋग्वेद एवं अथर्ववेद अनुक्रमणी प्रणेता",
    period: "वैदिक उत्तर काल",
    tradition: "शौनक शाखा एवं सर्वानुक्रमणी",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    bio: "ऋग्वेद की ऋगविधा एवं अनुक्रमणियों (ऋषि, देवता, छंद सूचकांक) के महान संकलनकर्ता तथा अथर्ववेद की शौनक शाखा के प्रमुख आचार्य। नैमिषारण्य के द्वादशवर्षीय सत्र के कुलपति।",
    disciplines: ["ऋग्वेद प्रातिशाख्य", "सर्वानुक्रमणी विज्ञान", "बृहद्देवता", "शौनक शाखा"],
    works: [
      "ऋग्वेद प्रातिशाख्य (वैदिक स्वर व संधि शास्त्र)",
      "बृहद्देवता (ऋग्वेद के देवताओं की विस्तृत मीमांसा)",
      "चरणव्यूह (वैदिक शाखाओं का अधिकृत विवरण)",
      "अथर्ववेद शौनक संहिता संपादन"
    ],
    badge: "अनुक्रमणी आचार्य",
    timeline: [
      { era: "वैदिक उत्तर काल", title: "नैमिषारण्य के कुलपति", desc: "१०,००० मुनियों के द्वादशवर्षीय ज्ञान सत्र के प्रधान आचार्य।" },
      { era: "स्वर व छंद अनुक्रमणी", title: "सर्वानुक्रमणी रचना", desc: "ऋग्वेद के प्रत्येक मंत्र के ऋषि, देवता, छंद एवं विनियोग की वैज्ञानिक अनुक्रमणिका।" },
      { era: "ध्वनि विज्ञान", title: "ऋग्वेद प्रातिशाख्य", desc: "वैदिक संस्कृत के वर्णोच्चार, उदात्त-अनुदात्त-स्वरित तथा संधि नियमों का संहिताकरण।" },
      { era: "संहिता विस्तार", title: "अथर्ववेद शौनक शाखा", desc: "अथर्ववेद की सर्वाधिक प्रचलित शौनक संहिता का संरक्षण एवं भाष्य।" }
    ]
  },
  {
    slug: "yaska",
    name: "महर्षि यास्क (Maharshi Yaska)",
    title: "निरुक्त एवं वैदिक शब्दार्थ विज्ञान प्रणेता",
    period: "ई.पू. ७वीं शताब्दी",
    tradition: "वेदांग निरुक्त",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    bio: "वेदों के अर्थ-बोध के लिए अनिवार्य वेदांग 'निरुक्त' के रचयिता। इन्होंने वैदिक शब्दों की व्युत्पत्ति, देवता-विभाजन और ऋचाओं के दार्शनिक अर्थों की वैज्ञानिक मीमांसा प्रस्तुत की।",
    disciplines: ["वेदांग निरुक्त", "निघण्टु व्याख्या", "धातुज-सिद्धांत", "दैवत मीमांसा"],
    works: [
      "निरुक्त (१२ अध्याय — नैघण्टुक, नैगम एवं दैवत काण्ड)",
      "निघण्टु व्याख्या (वैदिक पर्याय एवं दुर्बोध पद कोष)",
      "वैदिक देवता त्रिविध वर्गीकरण मीमांसा"
    ],
    badge: "वेदांग निरुक्त प्रणेता",
    timeline: [
      { era: "ई.पू. ७वीं शताब्दी", title: "नैघण्टुक काण्ड संकलन", desc: "वैदिक शब्दों के प्राचीनतम पर्याय कोष 'निघण्टु' का संपादन।" },
      { era: "वेदांग निरुक्त", title: "निरुक्त शास्त्र प्रणयन", desc: "वर्णागम, वर्णविपर्यय, वर्णविकार, वर्णनाश और धात्वर्थ के ५ नियमों से शब्दार्थ मीमांसा।" },
      { era: "दैवत काण्ड", title: "देवता मीमांसा", desc: "पृथ्वीस्थानीय, अंतरिक्षस्थानीय एवं द्युस्थानीय देवताओं का तात्विक एकत्व प्रतिपादन।" }
    ]
  },
  {
    slug: "vidyadhar-sharma",
    name: "डॉ. आचार्य विद्याधर शर्मा (Dr. Acharya Vidyadhar)",
    title: "वरिष्ठ वैदिक शोधकर्ता एवं मुख्य संपादक",
    period: "समकालीन (Modern Fellow)",
    tradition: "शुक्ल यजुर्वेद माध्यन्दिन शाखा",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    bio: "संपूर्णानंद संस्कृत विश्वविद्यालय एवं काशी हिन्दू विश्वविद्यालय के पूर्व शोधार्थी। Veda Library के संपादन बोर्ड के अध्यक्ष तथा श्रीरुद्रम् व यजुर्वेद संहिताओं के भाष्यकार।",
    disciplines: ["शुक्ल यजुर्वेद संहिता", "रुद्राष्टाध्यायी", "वैदिक स्वर विज्ञान", "डिजिटल पांडुलिपि शोध"],
    works: [
      "यजुर्वेद मन्त्र रहस्य एवं शास्त्रीय विनियोग",
      "रुद्राष्टाध्यायी शास्त्रीय समीक्षा एवं पदपाठ",
      "वैदिक स्वर प्रक्रिया एवं उच्चारण निर्देशिका"
    ],
    badge: "मुख्य संपादक",
    timeline: [
      { era: "१९८२ ई.", title: "पारंपरिक गुरुकुल व विश्वविद्यालय दीक्षा", desc: "शुक्ल यजुर्वेद वाजसनेयी शाखा में सांगोपांग वेदाध्ययन एवं आचार्य पदवी।" },
      { era: "१९९८ ई.", title: "संपूर्णानंद संस्कृत विश्वविद्यालय शोध", desc: "वैदिक स्वर विज्ञान एवं याज्ञिक पद्धतियों पर डॉक्टरेट उपाधि।" },
      { era: "२०१२ ई.", title: "ग्रन्थ संपादन एवं भाष्य प्रकाशन", desc: "रुद्राष्टाध्यायी एवं यजुर्वेद मंत्र रहस्य का विस्तृत शास्त्रीय संपादन।" },
      { era: "२०२२-वर्तमान", title: "Veda Library विद्वत परिषद अध्यक्ष", desc: "प्राचीन वैदिक पांडुलिपियों का शुद्ध देवनागरी में डिजिटल संरक्षण एवं समीक्षा।" }
    ]
  }
];

export default function ScholarsPage() {
  const { scholarSlug } = useParams();
  const navigate = useNavigate();
  const { isHindi } = useLanguage();

  const selectedScholar = scholarSlug
    ? SCHOLARS_DIRECTORY.find((s) => s.slug === scholarSlug)
    : null;

  const scholarsSchema = [
    {
      "@type": "ProfilePage",
      name: selectedScholar ? selectedScholar.name : "Veda Scholars & Commentators Directory",
      url: `https://library.vedastructure.com/scholars${scholarSlug ? `/${scholarSlug}` : ""}`,
      description: selectedScholar
        ? `${selectedScholar.name} — ${selectedScholar.title}`
        : "वेद लाइब्रेरी के प्रमाणित प्राचीन भाष्यकार एवं समकालीन विद्वान मंडल।",
      inLanguage: ["hi", "en", "sa"]
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
          name: "विद्वान मंडल (Scholars)",
          item: "https://library.vedastructure.com/scholars"
        }
      ]
    }
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#111111] selection:bg-[#FFD21F] selection:text-[#111111]">
      <SEO
        title={
          selectedScholar
            ? `${selectedScholar.name} — वैदिक विद्वान प्रोफाइल | Veda Library`
            : "Vedic Scholars & Commentators — वेद विद्वान एवं भाष्यकार मंडल"
        }
        description={
          selectedScholar
            ? selectedScholar.bio
            : "सायणाचार्य, आदि शंकराचार्य, महर्षि यास्क, शौनक एवं समकालीन वेदविदों की शास्त्रीय ग्रंथ-सूची एवं प्रामाणिक भाष्य।"
        }
        canonical={selectedScholar ? `/scholars/${selectedScholar.slug}` : "/scholars"}
        schema={scholarsSchema}
      />

      {/* Standardized Breadcrumbs Bar */}
      <div className="bg-white border-b border-[#E5E5E5] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-[#555555]">
          <Link to="/library" className="hover:text-[#111111] flex items-center gap-1 font-medium transition-colors">
            <Home className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>{isHindi ? "पुस्तकालय" : "Library"}</span>
          </Link>
          <span className="text-[#D9A441]">›</span>
          <Link to="/scholars" className="hover:text-[#111111] font-medium transition-colors">
            {isHindi ? "विद्वान मंडल" : "Scholars Dossier"}
          </Link>
          {selectedScholar && (
            <>
              <span className="text-[#D9A441]">›</span>
              <span className="text-[#111111] font-bold truncate max-w-xs">{selectedScholar.name}</span>
            </>
          )}
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-[#111111] text-white py-14 sm:py-16 px-4 sm:px-6 lg:px-8 border-b-2 border-[#D9A441] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerSanctum}
            alt="Scholars"
            className="w-full h-full object-cover object-center opacity-85 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1C] border border-[#D9A441]/50 text-[#FFD21F] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>{isHindi ? "विद्वान, भाष्यकार एवं शोध मंडल" : "Scholars, Commentators & Academic Board"}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {selectedScholar
              ? selectedScholar.name
              : isHindi
              ? "वैदिक विद्वान, टीकाकार एवं संपादक मंडल"
              : "Vedic Scholars, Commentators & Editorial Authority"}
          </h1>

          <p className="max-w-2xl mx-auto font-devanagari text-sm sm:text-base text-stone-300">
            {selectedScholar
              ? selectedScholar.title
              : isHindi
              ? "सायणाचार्य से शंकराचार्य तक, सनातन ज्ञान परंपरा के आधिकारिक संरक्षकों और भाष्यकारों की प्रामाणिक जीवनी व ग्रंथ-सम्पदा।"
              : "Biographical profiles and accredited commentaries of prime commentators and contemporary Vedic research authorities."}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedScholar ? (
          /* Single Scholar Detail View */
          <div className="space-y-8">
            <Link
              to="/scholars"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] hover:text-[#D9A441] cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-[#D9A441]" />
              <span>समस्त विद्वान मंडल सूची पर लौटें</span>
            </Link>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E5E5] shadow-xs grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Scholar Side Column */}
              <div className="space-y-5">
                <div className="relative">
                  <img
                    src={selectedScholar.avatar}
                    alt={selectedScholar.name}
                    className="w-full aspect-square rounded-2xl object-cover border border-[#E5E5E5] shadow-sm ring-2 ring-[#FFD21F]"
                  />
                  <span className="absolute bottom-2 right-2 text-xs font-bold text-[#111111] bg-[#FFD21F] px-3 py-1 rounded-full shadow-2xs border border-[#FFD21F]">
                    {selectedScholar.badge}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-[#E5E5E5] space-y-2 text-xs">
                  <p className="text-[#555555]">
                    <strong className="text-[#111111]">कालखंड:</strong> {selectedScholar.period}
                  </p>
                  <p className="text-[#555555]">
                    <strong className="text-[#111111]">परंपरा:</strong> {selectedScholar.tradition}
                  </p>
                  <p className="text-[#555555]">
                    <strong className="text-[#111111]">प्रमाणन:</strong> Veda Library विद्वत समीक्षा परिषद
                  </p>
                </div>

                {/* Traditional Discipline Badges */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#555555] uppercase tracking-wider block">
                    शास्त्रीय विद्याएँ एवं अधिकार:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedScholar.disciplines.map((d, didx) => (
                      <span
                        key={didx}
                        className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FFD21F]/20 text-[#111111] border border-[#FFD21F]"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scholar Main Details & Timeline */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                    {selectedScholar.name}
                  </h2>
                  <p className="text-sm font-semibold text-[#D9A441] mt-1">
                    {selectedScholar.title}
                  </p>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <h3 className="font-serif text-base font-bold text-[#111111]">
                    जीवन परिचय एवं वैदिक योगदान
                  </h3>
                  <p className="text-sm font-devanagari text-[#555555] leading-relaxed">
                    {selectedScholar.bio}
                  </p>
                </div>

                {/* Accredited Works List */}
                <div className="space-y-3 pt-2">
                  <h3 className="font-serif text-base font-bold text-[#111111] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#D9A441]" />
                    <span>प्रमुख ग्रन्थ, संहिता भाष्य एवं अनुक्रमणी (Accredited Works)</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedScholar.works.map((w, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] shadow-2xs text-xs font-semibold text-[#111111] flex items-center gap-2.5 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#D9A441] shrink-0" />
                        <span>{w}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Biographical Timeline */}
                {selectedScholar.timeline && (
                  <div className="space-y-4 pt-4 border-t border-[#E5E5E5]">
                    <h3 className="font-serif text-lg font-bold text-[#111111] flex items-center gap-2">
                      <Milestone className="w-4 h-4 text-[#D9A441]" />
                      <span>ऐतिहासिक जीवन यात्रा एवं कालक्रम (Biographical Timeline)</span>
                    </h3>
                    <div className="relative pl-6 border-l-2 border-[#D9A441]/40 space-y-5">
                      {selectedScholar.timeline.map((item, tidx) => (
                        <div key={tidx} className="relative group">
                          <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#FFD21F] border-2 border-white shadow-2xs group-hover:scale-125 transition-transform" />
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-stone-100 text-[#111111] border border-[#E5E5E5]">
                              {item.era}
                            </span>
                            <h4 className="font-serif text-sm font-bold text-[#111111]">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-xs text-[#555555] font-devanagari mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Scholars Directory Grid (Bento Dossier Cards) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCHOLARS_DIRECTORY.map((s) => (
              <div
                key={s.slug}
                onClick={() => navigate(`/scholars/${s.slug}`)}
                className="group p-6 rounded-2xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Header Avatar & Name */}
                  <div className="flex items-center gap-3.5">
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-[#FFD21F] ring-offset-2 shrink-0 shadow-xs"
                    />
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors leading-snug">
                        {s.name}
                      </h3>
                      <span className="text-[10px] font-bold text-[#111111] bg-[#FFD21F]/20 border border-[#FFD21F] px-2.5 py-0.5 rounded-full inline-block mt-1">
                        {s.badge}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#555555] font-devanagari line-clamp-3 leading-relaxed">
                    {s.bio}
                  </p>

                  {/* Traditional Discipline Badges */}
                  <div className="pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#555555] block mb-1">
                      शास्त्रीय अधिकार:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {s.disciplines.slice(0, 2).map((d, didx) => (
                        <span
                          key={didx}
                          className="text-[10px] px-2 py-0.5 rounded bg-stone-50 border border-[#E5E5E5] text-[#111111] font-semibold"
                        >
                          {d}
                        </span>
                      ))}
                      {s.disciplines.length > 2 && (
                        <span className="text-[10px] px-1.5 py-0.5 text-[#555555] font-semibold">
                          +{s.disciplines.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Timeline Highlight */}
                  {s.timeline && s.timeline.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-stone-50/70 border border-[#E5E5E5] text-[11px] font-devanagari text-[#555555]">
                      <span className="font-bold text-[#111111] block mb-0.5">
                        मुख्य कालक्रम ({s.timeline[0].era}):
                      </span>
                      <p className="line-clamp-1">{s.timeline[0].title}</p>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-[#E5E5E5] flex items-center justify-between text-xs font-bold text-[#111111] group-hover:text-[#D9A441]">
                  <span>पूर्ण जीवन वृत्त व ग्रन्थ देखें</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9A441] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
