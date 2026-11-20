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
      <section className="relative bg-[#111111] text-white py-5 sm:py-8 px-3.5 sm:px-6 lg:px-8 border-b-2 border-[#D9A441] overflow-hidden">
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
      <section className="py-6 sm:py-10 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
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

        {/* 3. Archival Architecture Overview — 4 Layers of Vedic Canon */}
        <div className="px-3 sm:px-8 py-5 sm:py-8 rounded-2xl bg-stone-50 border border-[#E5E5E5] space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFD21F] px-3 py-1 rounded-full border border-[#FFD21F]">
              {isHindi ? "चतुर्विध वाङ्मय संरचना" : "The 4 Canonical Strata"}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#111111]">
              {isHindi ? "संहिता, ब्राह्मण, आरण्यक एवं उपनिषद्" : "Samhita, Brahmana, Aranyaka & Upanishad"}
            </h3>
            <p className="text-sm text-[#555555] font-devanagari leading-relaxed">
              {isHindi
                ? "वैदिक साहित्य केवल मंत्रों का संग्रह नहीं है, बल्कि प्रत्येक शाखा में चार सुव्यवस्थित स्तर विद्यमान हैं। वेद लाइब्रेरी इन चारों स्तरों को उनके मूल स्वरूप में प्रस्तुत करती है।"
                : "The Vedic canon is structured into four canonical layers across all traditional schools, each fulfilling a vital role from primeval hymns to non-dual realization."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                num: "०१",
                titleHi: "संहिता (Samhita)",
                titleEn: "Samhita (Mantra Canon)",
                descHi: "अपौरुषेय मूल मंत्र, सूक्त एवं ऋचाएँ — विश्वामित्र, वसिष्ठ, अत्रि आदि महर्षियों द्वारा अनुभूत दिव्य चेतना।",
                descEn: "The primeval mantra collections of sacred hymns, prayers, and invocations revealed to the ancient Rishis."
              },
              {
                num: "०२",
                titleHi: "ब्राह्मण (Brahmana)",
                titleEn: "Brahmana (Liturgical Exegesis)",
                descHi: "मंत्रों का यज्ञीय व अनुष्ठानिक विनियोग, वैज्ञानिक कालक्रम, इतिहास एवं गंभीर दार्शनिक व्याख्याएँ।",
                descEn: "Prose exegesis explaining the ritual context, sacrificial applications, and liturgical science of mantras."
              },
              {
                num: "०३",
                titleHi: "आरण्यक (Aranyaka)",
                titleEn: "Aranyaka (Forest Meditations)",
                descHi: "यज्ञ का अंतर-रूपांतरण, प्राणोपासना, वानप्रस्थ साधना एवं प्रतीकात्मक आध्यात्मिक चिंतन।",
                descEn: "Contemplative forest treatises detailing esoteric meditations, prana-vidya, and symbolic inner sacrifices."
              },
              {
                num: "०४",
                titleHi: "उपनिषद् (Upanishad)",
                titleEn: "Upanishad (Vedanta Metaphysics)",
                descHi: "ब्रह्मविद्या, आत्मज्ञान, कैवल्य एवं प्रस्थानत्रयी का परम शिखर — 'अहं ब्रह्मास्मि' और 'तत्त्वमसि' का उद्घोष।",
                descEn: "The culmination of Vedic wisdom (Vedanta) revealing the non-dual identity of Atman and Supreme Brahman."
              }
            ].map((layer) => (
              <div key={layer.num} className="p-4 rounded-xl bg-white border border-[#E5E5E5] space-y-1.5 shadow-2xs">
                <span className="text-xs font-mono font-bold text-[#D9A441]">{layer.num}</span>
                <h4 className="font-serif text-base font-bold text-[#111111]">
                  {isHindi ? layer.titleHi : layer.titleEn}
                </h4>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {isHindi ? layer.descHi : layer.descEn}
                </p>
              </div>
            ))}
          </div>

          {/* Four Holy Vedas Grid */}
          <div className="pt-4 border-t border-[#E5E5E5]">
            <h4 className="font-serif text-lg font-bold text-[#111111] mb-3">
              {isHindi ? "चार प्रमुख वेद एवं उनके ऋत्विक" : "The Four Holy Vedas & Presiding Priests"}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {[
                { title: "ऋग्वेद", enTitle: "Rigveda", subHi: "१० मण्डल • १०२८ सूक्त", subEn: "10 Mandalas • 1,028 Suktas", priest: "होतृ (Hotri)", link: "/library/veda?sub=rigveda" },
                { title: "यजुर्वेद", enTitle: "Yajurveda", subHi: "शुक्ल व कृष्ण शाखा", subEn: "Shukla & Krishna Recensions", priest: "अध्वर्यु (Adhvaryu)", link: "/library/veda?sub=yajurveda" },
                { title: "सामवेद", enTitle: "Samaveda", subHi: "गान एवं साम ऋचाएँ", subEn: "1,875 Melodic Samas", priest: "उद्गातृ (Udgatri)", link: "/library/veda?sub=samaveda" },
                { title: "अथर्ववेद", enTitle: "Atharvaveda", subHi: "२० काण्ड • ७३० सूक्त", subEn: "20 Kandas • 5,977 Mantras", priest: "ब्रह्मा (Brahma)", link: "/library/veda?sub=atharvaveda" },
              ].map((v) => (
                <Link
                  key={v.title}
                  to={v.link}
                  className="p-3.5 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] transition-all group shadow-2xs"
                >
                  <h5 className="font-serif text-base font-bold text-[#111111] group-hover:text-[#D9A441]">
                    {isHindi ? v.title : v.enTitle}
                  </h5>
                  <p className="text-xs text-[#555555] mt-0.5">{isHindi ? v.subHi : v.subEn}</p>
                  <span className="inline-block mt-1.5 text-[10px] font-bold text-[#111111] bg-[#FFD21F] px-2 py-0.5 rounded border border-[#FFD21F]">
                    {v.priest}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 3.5 The Six Vedangas (षडंग वेदाङ्ग) */}
        <div className="px-3 sm:px-8 py-5 sm:py-8 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs space-y-5">
          <div className="max-w-3xl space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFD21F] px-3 py-1 rounded-full border border-[#FFD21F]">
              {isHindi ? "षडंग वेदाङ्ग — वेदों के ६ सहायक अंग" : "The Six Vedangas (Limbs of the Veda)"}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#111111]">
              {isHindi ? "वेदों के शुद्ध उच्चारण, व्याकरण एवं खगोल विधान" : "Phonetics, Grammar, Ritual & Cosmic Astronomy"}
            </h3>
            <p className="text-xs sm:text-sm text-[#555555] font-devanagari leading-relaxed">
              {isHindi
                ? "प्राचीन काल से वेदों के अर्थ और पाठ को अक्षुण्ण रखने हेतु ६ वेदाङ्गों की रचना की गई। पाणिनीय शिक्षा के अनुसार ये वेदपुरुष के छह अंग हैं।"
                : "The six auxiliary disciplines formulated to preserve the phonetic precision, grammar, metre, and cosmic calendar of Vedic recitations."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[
              { limb: isHindi ? "घ्राण (नासिका)" : "Nose", nameHi: "शिक्षा (Shiksha)", nameEn: "Shiksha (Phonetics & Svara)", descHi: "उदात्त, अनुदात्त व स्वरित — शुद्ध उच्चारण विज्ञान और वर्णोच्चारण नियम।", descEn: "Phonetic science detailing vowels, consonants, and 3 Vedic pitch accents." },
              { limb: isHindi ? "हस्त (हाथ)" : "Hands", nameHi: "कल्प (Kalpa)", nameEn: "Kalpa (Ritual Codes)", descHi: "श्रौत, गृह्य, धर्म एवं शुल्ब सूत्र — यज्ञीय वेदी निर्माण व जीवन संस्कार।", descEn: "Sacred liturgical manuals detailing domestic, solemn, and altar geometry." },
              { limb: isHindi ? "मुख (मुख)" : "Mouth", nameHi: "व्याकरण (Vyakarana)", nameEn: "Vyakarana (Grammar)", descHi: "महर्षि पाणिनि प्रणीत अष्टाध्यायी — संस्कृत शब्दों की प्रकृति व प्रत्यय सिद्धि।", descEn: "Paninian Sanskrit grammatical rules preserving morphological purity." },
              { limb: isHindi ? "श्रोत्र (कान)" : "Ears", nameHi: "निरुक्त (Nirukta)", nameEn: "Nirukta (Etymology)", descHi: "महर्षि यास्क प्रणीत वैदिक शब्दकोश — दुरूह वैदिक पदों का मूल निर्वचन।", descEn: "Yaska's classical etymology and semantic derivation of Vedic roots." },
              { limb: isHindi ? "पाद (चरण)" : "Feet", nameHi: "छन्द (Chhandas)", nameEn: "Chhandas (Vedic Metrics)", descHi: "गायत्री, त्रिष्टुप्, जगती, अनुष्टुप् — वैदिक ऋचाओं का वर्ण-मात्रा आधार।", descEn: "Prosody and metrical science regulating the rhythm of Vedic mantras." },
              { limb: isHindi ? "नेत्र (आँखें)" : "Eyes", nameHi: "ज्योतिष (Jyotisha)", nameEn: "Jyotisha (Vedic Astronomy)", descHi: "लगध ऋषि प्रणीत वेदांग ज्योतिष — काल, ऋतु, तिथि व यज्ञ मुहूर्त का विज्ञान।", descEn: "Astronomical observation calculating auspicious cosmic time and seasons." },
            ].map((v, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-[#E5E5E5] space-y-1 shadow-2xs">
                <div className="flex items-center justify-between">
                  <h5 className="font-serif text-sm font-bold text-[#111111]">
                    {isHindi ? v.nameHi : v.nameEn}
                  </h5>
                  <span className="text-[10px] font-bold text-[#D9A441] bg-white px-2 py-0.5 rounded border border-[#E5E5E5]">
                    {v.limb}
                  </span>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {isHindi ? v.descHi : v.descEn}
                </p>
              </div>
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
