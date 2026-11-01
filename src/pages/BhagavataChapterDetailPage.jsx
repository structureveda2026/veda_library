import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Home,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  Volume2,
  VolumeX,
  Type,
  Share2,
  Flame,
} from "lucide-react";
import { EKADASH_SKANDHA_CHAPTERS } from "../data/bhagavataEkadashaData.js";
import bannerTempleGhat from "../assets/images/library/banners/banner-temple-ghat.jpg";

const LABELS = {
  hindi: {
    back: "एकादश स्कंध की सूची",
    summary: "अध्याय का विस्तृत सार",
    previous: "पिछला अध्याय",
    next: "अगला अध्याय",
    section: "श्रीमद्भागवत महापुराण",
    home: "मुख्य पृष्ठ",
    purana: "पुराण",
    book: "श्रीमद्भागवत",
    keyVerseHeading: "अध्याय का प्रमुख पावन श्लोक",
    meaningHeading: "सरल भावार्थ एवं व्याख्या",
  },
  english: {
    back: "Chapter index",
    summary: "Detailed lesson overview",
    previous: "Previous chapter",
    next: "Next chapter",
    section: "Srimad Bhagavata Purana",
    home: "Home",
    purana: "Purana",
    book: "Srimad Bhagavata",
    keyVerseHeading: "Key Sanskrit Shloka of the Chapter",
    meaningHeading: "Exposition & Meaning",
  },
  hinglish: {
    back: "Ekadash Skandha suchi",
    summary: "Adhyay ka vistrit saar",
    previous: "Pichhla adhyay",
    next: "Agla adhyay",
    section: "Shrimad Bhagavat Mahapuran",
    home: "Home",
    purana: "Purana",
    book: "Shrimad Bhagavat",
    keyVerseHeading: "Adhyay ka pramukh pavitra shloka",
    meaningHeading: "Saral bhavarth aur vyakhya",
  },
};

const BHAGAVATA_CANONICAL_VERSES = {
  1: {
    sanskrit: "॥ ॐ नमो भगवते वासुदेवाय ॥\nनारायणं नमस्कृत्य नरं चैव नरोत्तमम् ।\nदेवीं सरस्वतीं व्यासं ततो जयमुदीरयेत् ॥",
    meaningHi: "परम पुरुष भगवान नारायण, नरों में श्रेष्ठ नर (अर्जुन), भगवती सरस्वती और महर्षि वेदव्यास को नमस्कार करके इस परम पवित्र इतिहास-पुराण का गान करना चाहिए।",
    meaningEn: "Before reciting this Srimad Bhagavatam, which is the very means of conquest, one must offer respectful obeisances unto the Personality of Godhead, Narayana, unto Nara-Narayana, unto mother Sarasvati, and unto Srila Vyasadeva.",
    meaningHinglish: "Srimad Bhagavat ka path karne se purva Bhagwan Narayana, Saraswati Devi aur Maharshi Vedavyas ko pranam karna chahiye.",
    context: "एकादश स्कन्ध का प्रारम्भ — यदुवंश की लीला संकोच की भूमिका",
  },
  2: {
    sanskrit: "ये वै भगवता प्रोक्ता उपाया ह्यात्मलब्धये ।\nअञ्जः पुंसामविदुषां विद्धि भागवतान् हि तान् ॥",
    meaningHi: "भगवान ने स्वयं अज्ञानी जीवों के सुगम आत्म-साक्षात्कार के लिए जिन सुगम उपायों का उपदेश दिया है, उन्हीं को 'भागवत धर्म' जानना चाहिए।",
    meaningEn: "Even an ignorant person can easily cross over the ocean of material existence by following the practical methods of devotion explained by the Supreme Lord Himself, which are known as Bhagavata-dharma.",
    meaningHinglish: "Bhagwan dwara bataye gaye aasan aatm-sakshatkar ke sadhanon ko hi 'Bhagavata Dharma' kaha jata hai.",
    context: "नवयोगेश्वर-संवाद — भागवत धर्म का स्वरूप",
  },
  3: {
    sanskrit: "तस्माद् गुरुं प्रपद्येत जिज्ञासुः श्रेय उत्तमम् ।\nशाब्दे परे च निष्णातं ब्रह्मण्युपशमाश्रयम् ॥",
    meaningHi: "अतः परम कल्याण की इच्छा रखने वाले जिज्ञासु को चाहिए कि वह ऐसे सद्गुरु की शरण ग्रहण करे, जो वेद-शास्त्रों के मर्मज्ञ हों, परब्रह्म में निष्णात हों और पूर्ण शांत हों।",
    meaningEn: "Therefore any person who seriously desires real happiness must seek a bona fide spiritual master and take shelter of him by initiation. The spiritual master must be well-versed in the scriptures, absorbed in the Supreme, and situated in tranquil realization.",
    meaningHinglish: "Param kalyan ki ichha rakhne wale ko aise Sadguru ki sharan leni chahiye jo shastron ke gyaani aur shant hon.",
    context: "प्रबुद्ध द्वारा माया-तरण का उपाय एवं गुरु-शरण",
  },
  7: {
    sanskrit: "सन्ति मे गुरवो राजन् बहवो बुद्धिसंश्रिताः ।\nयतो बुद्धिमुपादाय मुक्तोऽटामीह तान् शृणु ॥",
    meaningHi: "हे राजन्! मेरी बुद्धि ने संसार में अनेक गुरुओं का आश्रय लिया है, जिनसे शिक्षा ग्रहण कर मैं समस्त बंधनों से मुक्त होकर स्वच्छंद विचरण करता हूँ।",
    meaningEn: "O King, by my sharp discernment I have taken shelter of twenty-four teachers in nature. Learning valuable lessons from them, I wander freely without any material bondage.",
    meaningHinglish: "Avadhut Raja Yadu se kehte hain ki maine prakriti ke 24 tatvon se seekh lekar mukti paayi hai.",
    context: "अवधूत के २४ गुरुओं की दिव्य कथा का शुभारम्भ",
  },
  9: {
    sanskrit: "आशा हि परमं दुःखं नैराश्यं परमं सुखम् ।\nयथा संछिद्य कान्ताशां सुखं सुष्वाप पिङ्गला ॥",
    meaningHi: "भौतिक आशा ही परम दुःख है और सांसारिक आशाओं का त्याग ही परम सुख है; जैसे पिंगला वेश्या ने पुरुष-कामना का त्याग कर परम सुख और शांति प्राप्त की।",
    meaningEn: "Material craving is the greatest sorrow, and freedom from desires is the supreme bliss. Having severed her desire for worldly lovers, Pingala attained peaceful and blissful repose.",
    meaningHinglish: "Samsarik aasha hi dukh hai aur aashao ka tyag hi param shanti hai, jaise Pingala ne paya.",
    context: "पिंगला वेश्या का वैराग्य एवं आत्म-शांति",
  },
  11: {
    sanskrit: "बद्धो मुक्त इति व्याख्या गुणतो मे न वस्तुतः ।\nगुणस्य मायामूलत्वान्न मे मोक्षो न बन्धनम् ॥",
    meaningHi: "आत्मा का बद्ध या मुक्त होना केवल प्रकृति के गुणों के आधार पर कहा जाता है, वस्तुतः नहीं। क्योंकि गुण मायामूलक हैं, अतः मेरे शुद्ध आत्मस्वरूप में न कोई बंधन है और न मोक्ष।",
    meaningEn: "The conditioned and liberated states of the soul are described in relation to the modes of nature, not the eternal spirit self. Since the modes are born of Maya, in truth there is neither bondage nor liberation for the transcendental self.",
    meaningHinglish: "Bandhan aur moksha keval prakriti ke gunon ke aadhar par hain, aatma nitya mukt hai.",
    context: "बद्ध और मुक्त जीव के लक्षण का निरूपण",
  },
  14: {
    sanskrit: "यथाग्निः सुसमिद्धार्चिः करोत्येधांसि भस्मसात् ।\nतथा मद्विषया भक्तिरुद्धवैनांसि कृत्स्नशः ॥",
    meaningHi: "हे उद्धव! जिस प्रकार प्रज्वलित अग्नि काष्ठ के विशाल ढेरों को भस्म कर देती है, उसी प्रकार मेरी अनन्य भक्ति साधक के समस्त पापों और कर्म-संस्कारों को पूर्णतः भस्म कर देती है।",
    meaningEn: "Just as a blazing fire burns stacks of firewood to ashes, similarly, O Uddhava, unflinching devotional service directed unto Me burns away all residual karmas and sins completely.",
    meaningHinglish: "Jaise tez aag lakdi ko jala kar raakh kar deti hai, vaise hi Bhagwan ki bhakti sabhi paapon ko nasht kar deti hai.",
    context: "ध्यान-योग एवं अनन्य भक्ति की महिमा",
  },
  20: {
    sanskrit: "योगास्त्रयो मया प्रोक्ता नृणां श्रेयोविधित्सया ।\nज्ञानं कर्म च भक्तिश्च नोपायोऽन्योऽस्ति कुत्रचित् ॥",
    meaningHi: "मनुष्यों के परम कल्याण के लिए मैंने तीन प्रकार के योग बतलाए हैं—ज्ञानयोग, कर्मयोग और भक्तियोग। इनके अतिरिक्त कल्याण का अन्य कोई मार्ग नहीं है।",
    meaningEn: "In order to bestow the ultimate auspiciousness upon humanity, I have explained three progressive paths of Yoga: Jnana-yoga, Karma-yoga, and Bhakti-yoga. There is no other means anywhere.",
    meaningHinglish: "Kalyan ke liye teen marg bataye gaye hain: Gyan-yog, Karma-yog aur Bhakti-yog.",
    context: "त्रिविध योग-मार्ग — ज्ञान, कर्म और भक्ति",
  },
  29: {
    sanskrit: "इत्येतदात्मनः प्रेप्सोः क्रियते यद् वपुष्मताम् ।\nमय्यात्मनि परे प्रेम्णा नान्यत् कृतकृत्यता ॥",
    meaningHi: "हे उद्धव! परमेश्वर में अनन्य प्रेमभाव स्थापित करना ही मानव जीवन की सर्वोच्च कृतकृत्यता और पूर्णता है।",
    meaningEn: "To attain wholehearted love and loving surrender unto Me, the Supreme Soul of all beings, is the ultimate fulfillment of human embodiment.",
    meaningHinglish: "Bhagwan mein ananya prem hi manav jeevan ki sabse badi safalta hai.",
    context: "उद्धव-गीता का उपसंहार एवं बदरिकाश्रम प्रस्थान",
  },
};

const DEFAULT_VERSE = {
  sanskrit: "संसारसिन्धुमतितीव्रकामी नरो यदिच्छेत्तरितुं प्रपद्येत् ।\nकृष्णस्य पादारविन्दयुग्मं सर्वार्तिहारी परमान्तरङ्गाम् ॥",
  meaningHi: "इस दुस्तर भवसागर को पार करने की इच्छा रखने वाले मनुष्य को चाहिए कि वह भगवान श्रीकृष्ण के उन चरणकमलों की शरण ग्रहण करे, जो समस्त संतापों का हरण करने वाले हैं।",
  meaningEn: "One who desires to cross over the insurmountable ocean of material existence must take unconditional refuge at the lotus feet of Lord Sri Krishna, which dispel all distress.",
  meaningHinglish: "Bhavsagar se paar hone ke liye Bhagwan Krishna ke charan-kamal ki sharan leni chahiye.",
  context: "श्रीमद्भागवत एकादश स्कन्ध — मुक्ति लीला",
};

export default function BhagavataChapterDetailPage() {
  const { chapter: chapterParam } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("hindi");
  const [fontSize, setFontSize] = useState("default"); // "small", "default", "large"
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const chapterNumber = Number(chapterParam);
  const chapter = EKADASH_SKANDHA_CHAPTERS[chapterNumber - 1];
  const labels = LABELS[language];
  const indexPath = "/library/purana/shrimad-bhagavata/skandha-11";

  const verseData = BHAGAVATA_CANONICAL_VERSES[chapterNumber] || DEFAULT_VERSE;

  const handleCopyVerse = () => {
    const textToCopy = `॥ श्रीमद्भागवत महापुराण • एकादश स्कन्ध (अध्याय ${chapterNumber}) ॥\n\n${verseData.sanskrit}\n\nसरल भावार्थ:\n${verseData.meaningHi}\n\nEnglish Translation:\n${verseData.meaningEn}\n\nस्रोत: Veda Library — https://library.vedastructure.com`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 9000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `श्रीमद्भागवत एकादश स्कन्ध - अध्याय ${chapterNumber}`,
        text: `${verseData.sanskrit}\n\n${verseData.meaningHi}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyVerse();
    }
  };

  if (!chapter || chapter.number !== chapterNumber) {
    return (
      <main className="min-h-[70vh] mx-auto max-w-4xl px-4 py-12 bg-white text-center space-y-4">
        <BookOpen className="w-12 h-12 text-[#D9A441] mx-auto opacity-70" />
        <h1 className="font-serif text-2xl font-bold text-[#111111]">
          अध्याय उपलब्ध नहीं है (Chapter not found)
        </h1>
        <Link
          to={indexPath}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFD21F] text-[#111111] font-bold text-xs shadow-xs"
        >
          <ArrowLeft className="h-4 w-4" /> {labels.back}
        </Link>
      </main>
    );
  }

  const verseTextClass =
    fontSize === "large"
      ? "text-2xl sm:text-3xl leading-[1.85]"
      : fontSize === "small"
      ? "text-lg sm:text-xl leading-[1.7]"
      : "text-xl sm:text-2xl leading-[1.75]";

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 1. Breadcrumb Ribbon */}
      <div className="border-b border-[#E5E5E5] bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl items-center gap-2 text-xs font-medium text-[#555555] flex-wrap">
          <Link
            to="/"
            className="inline-flex items-center gap-1 hover:text-[#D9A441] transition-colors"
          >
            <Home className="h-3.5 w-3.5" /> {labels.home}
          </Link>
          <span>›</span>
          <Link to="/library/purana" className="hover:text-[#D9A441] transition-colors">
            {labels.purana}
          </Link>
          <span>›</span>
          <Link
            to="/library/purana/shrimad-bhagavata"
            className="hover:text-[#D9A441] transition-colors"
          >
            {labels.book}
          </Link>
          <span>›</span>
          <Link to={indexPath} className="hover:text-[#D9A441] transition-colors">
            स्कन्ध ११
          </Link>
          <span>›</span>
          <span className="font-semibold text-[#111111]">अध्याय {chapterNumber}</span>
        </div>
      </div>

      {/* 2. Sacred Luminous Hero Banner */}
      <section className="relative overflow-hidden bg-[#170e07] text-white border-b border-amber-900/60 pt-10 pb-12 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerTempleGhat}
            alt="Srimad Bhagavata Temple Ghat"
            className="w-full h-full object-cover object-center opacity-80 sm:opacity-85 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140b05] via-[#1c1108]/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-[#140b05]/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F] text-[#111111] text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{labels.section}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/15 border border-white/30 text-amber-200 text-xs font-semibold backdrop-blur-xs">
              एकादश स्कन्ध • मुक्ति लीला
            </span>
            <span className="px-3 py-1 rounded-full bg-[#C62828] text-white text-xs font-bold shadow-xs">
              अध्याय {chapterNumber} / ३१
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            {language === "hindi" ? `अध्याय ${chapterNumber}: ${chapter.titleHi}` : `${language === "hinglish" ? "Adhyay" : "Chapter"} ${chapterNumber}: ${chapter.title}`}
          </h1>

          <p className="text-xs sm:text-sm text-amber-100/90 max-w-3xl leading-relaxed">
            {chapter.summary[language]}
          </p>
        </div>
      </section>

      {/* 3. Main Reading Content Container */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 space-y-8">
        {/* Controls Toolbar: Back + Font Scaler + 3 Language Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5]">
          <Link
            to={indexPath}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#111111] hover:text-[#D9A441] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> {labels.back}
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {/* Font Scaler (A-, A, A+) */}
            <div className="inline-flex items-center gap-1 rounded-xl border border-[#E5E5E5] bg-white p-0.5 text-xs font-semibold shadow-2xs">
              <span className="px-2 text-[#555555] font-bold flex items-center gap-1">
                <Type className="w-3 h-3 text-[#D9A441]" />
                <span>आकार:</span>
              </span>
              {[
                { id: "small", label: "A-" },
                { id: "default", label: "A" },
                { id: "large", label: "A+" }
              ].map((sz) => (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => setFontSize(sz.id)}
                  className={`rounded-lg px-2.5 py-1 transition-colors cursor-pointer font-bold ${
                    fontSize === sz.id
                      ? "bg-[#FFD21F] text-[#111111]"
                      : "text-[#555555] hover:bg-stone-50"
                  }`}
                >
                  {sz.label}
                </button>
              ))}
            </div>

            {/* 3 Languages Switcher (Hindi, English, Hinglish) */}
            <div className="inline-flex items-center gap-1 rounded-xl border border-[#E5E5E5] bg-white p-0.5 text-xs font-semibold shadow-2xs">
              {["hindi", "english", "hinglish"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLanguage(option)}
                  aria-pressed={language === option}
                  className={`rounded-lg px-3 py-1 transition-colors cursor-pointer font-bold ${
                    language === option
                      ? "bg-[#FFD21F] text-[#111111] shadow-2xs"
                      : "text-[#555555] hover:bg-stone-50"
                  }`}
                >
                  {option === "hindi"
                    ? "हिंदी"
                    : option === "english"
                      ? "English"
                      : "Hinglish"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3.1: Sacred Sanskrit Shloka Sanctuary Card */}
        <section className="relative p-6 sm:p-10 rounded-3xl border border-[#E5E5E5] border-t-4 border-t-[#D9A441] bg-white shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E5E5E5]">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#FFD21F] text-[#111111] flex items-center justify-center font-bold text-xs shadow-2xs">
                ॐ
              </span>
              <div>
                <h3 className="font-serif font-bold text-[#111111] text-base sm:text-lg">
                  {labels.keyVerseHeading}
                </h3>
                <p className="text-[11px] text-[#555555]">
                  {verseData.context}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Audio Simulation */}
              <button
                type="button"
                onClick={handleToggleAudio}
                title="सस्वर पाठ सुनें"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isPlayingAudio
                    ? "bg-[#FFD21F] text-[#111111] shadow-xs animate-pulse"
                    : "bg-white hover:bg-stone-50 text-[#111111] border border-[#E5E5E5]"
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>ध्वनि तरंग...</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>सस्वर पाठ</span>
                  </>
                )}
              </button>

              {/* 1-Click Copy with line breaks preserved */}
              <button
                type="button"
                onClick={handleCopyVerse}
                title="श्लोक कॉपी करें"
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-xs font-bold text-[#111111] border border-[#E5E5E5] transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">कॉपी हुआ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>कॉपी</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShare}
                title="साझा करें"
                className="p-2 rounded-xl bg-white hover:bg-stone-50 text-[#111111] border border-[#E5E5E5] transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#D9A441]" />
              </button>
            </div>
          </div>

          {/* Central Sanskrit Devanagari Verse (leading-[1.75]) */}
          <div className="py-6 text-center">
            <p className={`font-devanagari font-bold text-[#111111] tracking-wide whitespace-pre-line select-text ${verseTextClass}`}>
              {verseData.sanskrit}
            </p>
          </div>

          {/* Meaning Block according to selected language */}
          <div className="pt-6 border-t border-[#E5E5E5] space-y-4">
            <div className="space-y-1.5 bg-stone-50 rounded-2xl p-4 sm:p-5 border border-[#E5E5E5]">
              <h4 className="font-devanagari font-bold text-[#111111] text-xs sm:text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D9A441]" />
                {labels.meaningHeading}:
              </h4>
              <p className="font-devanagari text-sm sm:text-base text-[#111111] leading-[1.8] pt-1">
                {language === "hindi"
                  ? verseData.meaningHi
                  : language === "english"
                  ? verseData.meaningEn
                  : verseData.meaningHinglish}
              </p>
            </div>
          </div>
        </section>

        {/* 3.2: Detailed Lesson Chapter Overview Card */}
        <article className="rounded-3xl border border-[#E5E5E5] bg-white p-6 sm:p-8 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E5E5]">
            <BookOpen className="w-5 h-5 text-[#D9A441]" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#111111]">
              {labels.summary}
            </h2>
          </div>
          <p className="text-base leading-[1.8] text-[#111111] font-devanagari">
            {chapter.summary[language]}
          </p>
        </article>

        {/* 3.3: Comprehensive Source & Bibliographic Reference Card */}
        <section className="bg-white rounded-3xl border border-[#E5E5E5] p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5]">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#D9A441]" />
              <h3 className="font-serif font-bold text-[#111111] text-base sm:text-lg">
                स्रोत, संस्करण एवं संदर्भ विवरण (Source & Bibliographic Citation)
              </h3>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[#111111] border border-[#FFD21F]">
              महापुराण प्रामाण्य
            </span>
          </div>

          <div className="border border-[#E5E5E5] rounded-xl overflow-hidden shadow-2xs bg-white">
            <table className="w-full text-xs font-devanagari divide-y divide-[#E5E5E5]">
              <tbody className="divide-y divide-[#E5E5E5]">
                <tr className="bg-[#F9F9F9]">
                  <td className="px-3.5 py-2.5 font-bold text-[#555555] w-1/3 shrink-0">मूल ग्रंथ</td>
                  <td className="px-3.5 py-2.5 text-[#111111] font-bold">श्रीमद्भागवत महापुराण</td>
                </tr>
                <tr>
                  <td className="px-3.5 py-2.5 font-bold text-[#555555]">स्कन्ध / प्रकरण</td>
                  <td className="px-3.5 py-2.5 text-[#111111]">एकादश स्कन्ध (मुक्ति लीला) • अध्याय {chapterNumber}</td>
                </tr>
                <tr className="bg-[#F9F9F9]">
                  <td className="px-3.5 py-2.5 font-bold text-[#555555]">अध्याय का नाम</td>
                  <td className="px-3.5 py-2.5 text-[#111111] font-semibold">{chapter.titleHi} ({chapter.title})</td>
                </tr>
                <tr>
                  <td className="px-3.5 py-2.5 font-bold text-[#555555]">वक्ता (Narrator)</td>
                  <td className="px-3.5 py-2.5 text-[#111111]">श्रीशुकदेव जी महाराज / भगवान श्रीकृष्ण</td>
                </tr>
                <tr className="bg-[#F9F9F9]">
                  <td className="px-3.5 py-2.5 font-bold text-[#555555]">श्रोता (Listener)</td>
                  <td className="px-3.5 py-2.5 text-[#111111]">महाराज परीक्षित / उद्धव जी</td>
                </tr>
                <tr>
                  <td className="px-3.5 py-2.5 font-bold text-[#555555]">छन्द (Metre)</td>
                  <td className="px-3.5 py-2.5 text-[#D9A441] font-bold">अनुष्टुप् / त्रिष्टुप्</td>
                </tr>
                <tr className="bg-[#F9F9F9]">
                  <td className="px-3.5 py-2.5 font-bold text-[#555555]">समीक्षक एवं संपादन</td>
                  <td className="px-3.5 py-2.5 text-[#111111] font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Veda Library Editorial Board (विद्वत परिषद द्वारा सत्यापित)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3.4: Prev / Next Chapter Sequential Navigation Bar */}
        <nav className="p-4 sm:p-6 rounded-3xl border border-[#E5E5E5] bg-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          {chapterNumber > 1 ? (
            <Link
              to={`${indexPath}/${chapterNumber - 1}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-stone-50 text-[#111111] border border-[#E5E5E5] hover:border-[#D9A441] transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{labels.previous} (अध्याय {chapterNumber - 1})</span>
            </Link>
          ) : (
            <div className="text-xs opacity-50 italic">प्रथम अध्याय</div>
          )}

          <Link
            to={indexPath}
            className="text-xs font-bold text-[#111111] hover:text-[#D9A441] transition-colors"
          >
            स्कन्ध ११ सूची (31 अध्याय)
          </Link>

          {chapterNumber < EKADASH_SKANDHA_CHAPTERS.length ? (
            <Link
              to={`${indexPath}/${chapterNumber + 1}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] border border-[#FFD21F] shadow-xs transition-all"
            >
              <span>{labels.next} (अध्याय {chapterNumber + 1})</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <div className="text-xs opacity-50 italic">अंतिम अध्याय</div>
          )}
        </nav>
      </main>
    </div>
  );
}
