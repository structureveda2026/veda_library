// Structured Data for Veda Library Home Landing Page
// Directly aligned with Google Doc Specification & Client Reference Image

export const HERO_CONTENT = {
  eyebrow: "VEDA STRUCTURE PRESENTS",
  title: "Veda Library",
  enTitle: "Vedic & Traditional Knowledge Archive",
  tagline: "प्राचीन ज्ञान को खोजें • समझें • स्रोत सहित पढ़ें",
  subheading: "वेद, वेदाङ्ग, उपनिषद, पुराण, दर्शन, मंत्र, ज्योतिष, वास्तु और भारतीय शास्त्रीय ज्ञान परंपरा का एक व्यवस्थित डिजिटल संग्रह।",
  supportingText: "प्राचीन ग्रंथों, मंत्रों, श्लोकों, परंपराओं और विषय-आधारित ज्ञान को एक संरचित और संदर्भ-आधारित Library में खोजें, पढ़ें और समझें।",
  searchPlaceholder: "Search mantra, puja, yajna, Upanishad, Sanskrit...",
  popularSuggestions: [
    "Rigveda",
    "Upanishad",
    "Bhagavad Gita",
    "Rudra",
    "Jyotisha",
    "Vastu",
    "Mantra",
    "Kashi"
  ],
  primaryCta: "Explore Knowledge",
  secondaryCta: "Browse Collections"
};

export const TRUST_STRIP_ITEMS = [
  {
    icon: "BookOpen",
    title: "Text-First Archive",
    hindiTitle: "मूल पाठ संग्रह",
    subtitle: "मूल पाठ एवं प्रामाणिक व्याख्या",
    enSubtitle: "Canonical text & authentic commentary",
    accent: "#b45309"
  },
  {
    icon: "Layers",
    title: "Structured Knowledge",
    hindiTitle: "संरचित ज्ञान",
    subtitle: "विषय व शाखा अनुसार व्यवस्थित",
    enSubtitle: "Organized by discipline & tradition",
    accent: "#047857"
  },
  {
    icon: "FileCheck",
    title: "Source References",
    hindiTitle: "प्रामाणिक संदर्भ",
    subtitle: "ग्रंथ, अध्याय व श्लोक आधारित",
    enSubtitle: "Verified by chapter, verse & source",
    accent: "#4338ca"
  },
  {
    icon: "Flame",
    title: "Living Tradition",
    hindiTitle: "जीवंत परंपरा",
    subtitle: "भारतीय ज्ञान परंपरा का जीवंत संग्रह",
    enSubtitle: "Living heritage of classical wisdom",
    accent: "#c2410c"
  }
];

// Explore Knowledge 12 category cards (Matching Client Reference Image exact cards and pastel circular badges)
export const EXPLORE_KNOWLEDGE_CARDS = [
  {
    id: "veda",
    title: "Veda",
    subtitle: "(4 Samhitas)",
    hindiTitle: "वेद",
    hindiSubtitle: "(४ संहिताएँ)",
    hindiDesc: "ऋग्वेद, यजुर्वेद, सामवेद और अथर्ववेद",
    icon: "BookOpen",
    iconColor: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200/80",
    badgeBg: "bg-amber-100/70"
  },
  {
    id: "vedanga",
    title: "Vedanga",
    subtitle: "(6 Angas)",
    hindiTitle: "वेदाङ्ग",
    hindiSubtitle: "(६ वेदाङ्ग)",
    hindiDesc: "शिक्षा, कल्प, व्याकरण, निरुक्त, छंद और वेदाङ्ग ज्योतिष",
    icon: "Compass",
    iconColor: "text-emerald-700",
    bgColor: "bg-emerald-50/60",
    borderColor: "border-emerald-200/80",
    badgeBg: "bg-emerald-100/70"
  },
  {
    id: "upanishad",
    title: "Upanishad & Darshan",
    subtitle: "(Philosophy)",
    hindiTitle: "उपनिषद एवं दर्शन",
    hindiSubtitle: "(दार्शनिक चिंतन)",
    hindiDesc: "आत्मा, ब्रह्म, ज्ञान, योग, वेदांत और भारतीय दर्शन",
    icon: "Sparkles",
    iconColor: "text-cyan-700",
    bgColor: "bg-cyan-50/60",
    borderColor: "border-cyan-200/80",
    badgeBg: "bg-cyan-100/70"
  },
  {
    id: "purana-itihasa",
    title: "Purana & Itihasa",
    subtitle: "(Epics & Puranas)",
    hindiTitle: "पुराण एवं इतिहास",
    hindiSubtitle: "(महाकाव्य व पुराण)",
    hindiDesc: "पुराण, रामायण, महाभारत और प्रमुख आख्यान",
    icon: "BookOpen",
    iconColor: "text-indigo-700",
    bgColor: "bg-indigo-50/60",
    borderColor: "border-indigo-200/80",
    badgeBg: "bg-indigo-100/70"
  },
  {
    id: "mantra-stotra",
    title: "Mantra, Sukta & Stotra",
    subtitle: "(Chants & Hymns)",
    hindiTitle: "मंत्र, सूक्त एवं स्तोत्र",
    hindiSubtitle: "(स्तोत्र व प्रार्थनाएँ)",
    hindiDesc: "मंत्र, सूक्त, स्तोत्र, कवच, सहस्रनाम और प्रार्थनाएँ",
    icon: "Volume2",
    iconColor: "text-purple-700",
    bgColor: "bg-purple-50/60",
    borderColor: "border-purple-200/80",
    badgeBg: "bg-purple-100/70"
  },
  {
    id: "jyotisha",
    title: "Jyotisha",
    subtitle: "(Astrology)",
    hindiTitle: "ज्योतिष",
    hindiSubtitle: "(वैदिक ज्योतिष)",
    hindiDesc: "ग्रह, राशि, नक्षत्र, कुंडली, दशा, गोचर और मुहूर्त",
    icon: "Sun",
    iconColor: "text-amber-800",
    bgColor: "bg-orange-50/70",
    borderColor: "border-orange-200/80",
    badgeBg: "bg-orange-100/70"
  },
  {
    id: "vastu",
    title: "Vastu",
    subtitle: "(Vedic Architecture)",
    hindiTitle: "वास्तु",
    hindiSubtitle: "(वास्तु परंपरा)",
    hindiDesc: "वास्तु पुरुष, दिशा, गृह, मंदिर और वास्तु परंपरा",
    icon: "Compass",
    iconColor: "text-amber-900",
    bgColor: "bg-amber-50/70",
    borderColor: "border-amber-200/80",
    badgeBg: "bg-amber-100/70"
  },
  {
    id: "shastra",
    title: "Shastra",
    subtitle: "(Classical Texts)",
    hindiTitle: "शास्त्र",
    hindiSubtitle: "(शास्त्रीय ग्रंथ)",
    hindiDesc: "धर्मशास्त्र, योग, आयुर्वेद, नीति, अर्थशास्त्र, आगम आदि",
    icon: "Layers",
    iconColor: "text-teal-700",
    bgColor: "bg-teal-50/60",
    borderColor: "border-teal-200/80",
    badgeBg: "bg-teal-100/70"
  }
];

// All 18 Master Taxonomy Categories (Sourced from Client Complete Specification)
export const ALL_MASTER_TAXONOMY_CARDS = [
  ...EXPLORE_KNOWLEDGE_CARDS,
  {
    id: "samskara",
    title: "Samskara",
    subtitle: "(16 Samskaras)",
    hindiTitle: "संस्कार",
    hindiSubtitle: "(१६ संस्कार)",
    hindiDesc: "जन्म से मृत्यु तक सोलह वैदिक संस्कार",
    icon: "Flower2",
    iconColor: "text-teal-700",
    bgColor: "bg-teal-50/60",
    borderColor: "border-teal-200/80",
    badgeBg: "bg-teal-100/70"
  },
  {
    id: "puja",
    title: "Puja",
    subtitle: "(Worship & Rituals)",
    hindiTitle: "पूजा",
    hindiSubtitle: "(पूजन एवं उपासना)",
    hindiDesc: "शास्त्रोक्त पूजन विधि और उपासना पद्धति",
    icon: "Flower",
    iconColor: "text-rose-700",
    bgColor: "bg-rose-50/60",
    borderColor: "border-rose-200/80",
    badgeBg: "bg-rose-100/70"
  },
  {
    id: "yagya",
    title: "Yagya",
    subtitle: "(Fire Rituals)",
    hindiTitle: "यज्ञ",
    hindiSubtitle: "(हवन व वैदिक यज्ञ)",
    hindiDesc: "वैदिक यज्ञ, अग्निहोत्र और हवन परंपरा",
    icon: "Flame",
    iconColor: "text-amber-700",
    bgColor: "bg-amber-50/70",
    borderColor: "border-amber-200/80",
    badgeBg: "bg-amber-100/80"
  },
  {
    id: "devata",
    title: "Devata",
    subtitle: "(Deities)",
    hindiTitle: "देवता",
    hindiSubtitle: "(देव उपासना परंपरा)",
    hindiDesc: "वैदिक और पौराणिक देवताओं की उपासना पद्धति",
    icon: "Crown",
    iconColor: "text-emerald-800",
    bgColor: "bg-emerald-50/70",
    borderColor: "border-emerald-200/80",
    badgeBg: "bg-emerald-100/70"
  },
  {
    id: "tirtha",
    title: "Tirtha",
    subtitle: "(Sacred Sites)",
    hindiTitle: "तीर्थ",
    hindiSubtitle: "(पवित्र तीर्थ क्षेत्र)",
    hindiDesc: "काशी, प्रयाग, हरिद्वार और पवित्र तीर्थ परंपरा",
    icon: "MapPin",
    iconColor: "text-orange-700",
    bgColor: "bg-orange-50/60",
    borderColor: "border-orange-200/80",
    badgeBg: "bg-orange-100/70"
  },
  {
    id: "dharma",
    title: "Dharma",
    subtitle: "(Life & Conduct)",
    hindiTitle: "धर्म",
    hindiSubtitle: "(जीवन मूल्य व सदाचार)",
    hindiDesc: "वैदिक जीवन दर्शन, आचार और धर्मशास्त्र",
    icon: "ShieldCheck",
    iconColor: "text-orange-700",
    bgColor: "bg-orange-50/60",
    borderColor: "border-orange-200/80",
    badgeBg: "bg-orange-100/70"
  },
  {
    id: "sanskrit",
    title: "Sanskrit & Bhasha",
    subtitle: "(Language)",
    hindiTitle: "संस्कृत भाषा",
    hindiSubtitle: "(व्याकरण व भाषा)",
    hindiDesc: "पाणिनि व्याकरण, धातु, संधि और संस्कृत अध्ययन",
    icon: "BookOpen",
    iconColor: "text-amber-700",
    bgColor: "bg-amber-50/60",
    borderColor: "border-amber-200/80",
    badgeBg: "bg-amber-100/70"
  },
  {
    id: "traditional-knowledge",
    title: "Traditional Knowledge",
    subtitle: "(Ayurveda & More)",
    hindiTitle: "पारंपरिक शास्त्र",
    hindiSubtitle: "(आयुर्वेद व ज्ञान शाखाएँ)",
    hindiDesc: "आयुर्वेद, ज्योतिष, वास्तु और पारंपरिक विज्ञान",
    icon: "Leaf",
    iconColor: "text-blue-700",
    bgColor: "bg-blue-50/60",
    borderColor: "border-blue-200/80",
    badgeBg: "bg-blue-100/70"
  },
  {
    id: "research",
    title: "Research & Citations",
    subtitle: "(Critical Editions)",
    hindiTitle: "शोध एवं संदर्भ",
    hindiSubtitle: "(पाण्डुलिपि व भाष्य)",
    hindiDesc: "पांडुलिपियाँ, भाष्य, टीका और शास्त्रीय शोध सामग्री",
    icon: "Sparkles",
    iconColor: "text-indigo-800",
    bgColor: "bg-indigo-50/60",
    borderColor: "border-indigo-200/80",
    badgeBg: "bg-indigo-100/70"
  },
  {
    id: "mantra",
    title: "Mantra",
    subtitle: "(Chants)",
    hindiTitle: "मंत्र",
    hindiSubtitle: "(वैदिक मंत्र व जप)",
    hindiDesc: "वैदिक और तांत्रिक मंत्र परंपरा",
    icon: "Volume2",
    iconColor: "text-purple-700",
    bgColor: "bg-purple-50/60",
    borderColor: "border-purple-200/80",
    badgeBg: "bg-purple-100/70"
  }
];


// Featured Collections (4 Cards from Client Reference Image)
export const FEATURED_COLLECTIONS = [
  {
    id: "vedic-collection",
    title: "Vedic Collection",
    hindiTitle: "वैदिक संग्रह",
    articlesCount: "124 Articles",
    imageKey: "banner-sanctum.png",
    description: "ऋचाओं, संहिताओं, आरण्यकों और ऋषियों के प्रामाणिक संदर्भों का महासंग्रह।"
  },
  {
    id: "mantra-collection",
    title: "Mantra Collection",
    hindiTitle: "मंत्र संग्रह",
    articlesCount: "86 Articles",
    imageKey: "banner-sacred-details.png",
    description: "शुद्ध स्वर, पदच्छेद, छंद, ऋषि एवं देवता युक्त कल्याणकारी वैदिक मंत्र।"
  },
  {
    id: "puja-collection",
    title: "Puja Collection",
    hindiTitle: "पूजा व अनुष्ठान संग्रह",
    articlesCount: "72 Articles",
    imageKey: "banner-fire-ritual.png",
    description: "शास्त्रोक्त पूजन विधि, कलश स्थापन, आवाहन व षोडशोपचार आराधना।"
  },
  {
    id: "samskara-collection",
    title: "Samskara Collection",
    hindiTitle: "संस्कार परंपरा",
    articlesCount: "45 Articles",
    imageKey: "banner-kashi-ghat.png",
    description: "गर्भाधान से विवाह एवं अन्त्येष्टि तक १६ पवित्र वैदिक संस्कारों का विवरण।"
  }
];

// The Four Vedas Section (Section 7 of doc)
export const FOUR_VEDAS = [
  {
    id: "rigveda",
    name: "ऋग्वेद",
    enName: "Rigveda",
    desc: "ऋचाओं और सूक्तों का प्रमुख वैदिक संग्रह। शाकल शाखा, ऐतरेय व कौषीतकि ब्राह्मण, आरण्यक, उपनिषद एवं आश्वलायन सूत्र।",
    stats: "१० मण्डल • १०२८ सूक्त • १०,५५२ मंत्र",
    priest: "होतृ (Hotri)",
    shakha: "शाकल शाखा",
    shakhaList: ["शाकल संहिता (मंत्र)", "ऐतरेय व कौषीतकि ब्राह्मण", "ऐतरेय उपनिषद", "आश्वलायन सूत्र"],
    imageKey: "card-rigveda.jpg"
  },
  {
    id: "yajurveda",
    name: "यजुर्वेद",
    enName: "Yajurveda",
    desc: "यज्ञ एवं वैदिक कर्म परंपरा। शुक्ल यजुर्वेद (माध्यन्दिना, काण्व, शतपथ ब्राह्मण, ईश-बृहदारण्यक) एवं कृष्ण यजुर्वेद (तैत्तिरीय, मैत्रायणी, कठ, कपिष्ठल)।",
    stats: "शुक्ल व कृष्ण • शतपथ ब्राह्मण • रुद्राध्याय",
    priest: "अध्वर्यु (Adhvaryu)",
    shakha: "माध्यन्दिना, काण्व, तैत्तिरीय, मैत्रायणी, कठ",
    shakhaList: ["शुक्ल: माध्यन्दिना व काण्व (शतपथ)", "कृष्ण: तैत्तिरीय (रुद्राध्याय)", "मैत्रायणी व काठक (कठोपनिषद)", "पारस्कर, कात्यायन, बौधायन सूत्र"],
    imageKey: "card-yajurveda.jpg"
  },
  {
    id: "samaveda",
    name: "सामवेद",
    enName: "Samaveda",
    desc: "सामगान और वैदिक गायन परंपरा। कौथुम, राणायनीय, जैमिनीय शाखाएँ, ताण्ड्य महाब्राह्मण, छान्दोग्य उपनिषद एवं केनोपनिषद्।",
    stats: "१८७५ छंद/साम • ८-९ ब्राह्मण • छान्दोग्य व केन",
    priest: "उद्गातृ (Udgatri)",
    shakha: "कौथुम, राणायनीय, जैमिनीय (तवलकार)",
    shakhaList: ["कौथुम शाखा (पूर्वार्चिक, उत्तरार्चिक)", "राणायनीय व जैमिनीय शाखा", "ताण्ड्य महाब्राह्मण व ८ ब्राह्मण", "छान्दोग्य ('तत्त्वमसि') व केनोपनिषद्"],
    imageKey: "card-samaveda.jpg"
  },
  {
    id: "atharvaveda",
    name: "अथर्ववेद",
    enName: "Atharvaveda",
    desc: "राष्ट्र, समाज, भैषज्य (आयुर्वेद) एवं ब्रह्मविद्या का महावेद। शौनक व पैप्पलाद शाखा, गोपथ ब्राह्मण, मुण्डक, माण्डूक्य व प्रश्न उपनिषद।",
    stats: "२० काण्ड • ७३० सूक्त • ५,९७७ मंत्र",
    priest: "ब्रह्मा (Brahma - सर्वयज्ञ निरीक्षक)",
    shakha: "शौनक शाखा • पैप्पलाद शाखा",
    shakhaList: ["शौनक संहिता (पृथ्वी सूक्त १२.१)", "गोपथ ब्राह्मण (पूर्व व उत्तर)", "मुण्डक ('सत्यमेव जयते') व माण्डूक्य", "कौशिक गृह्यसूत्र व वैतान श्रौतसूत्र"],
    imageKey: "card-atharvaveda.jpg"
  }
];

// Recently Added (Matching Client Reference Image exact cards)
export const RECENTLY_ADDED = [
  {
    id: "agnihotra",
    title: "Agnihotra",
    category: "Yagya • Vedic Practice",
    statusBadge: "Source Verified",
    statusType: "verified", // green
    timeAgo: "2 days ago",
    imageKey: "card-yagya-fire.jpg",
    desc: "दैनिक अग्निहोत्र विधि, पंचभूत शुद्धि और सूर्य-अग्नि उपासना का शास्त्रीय विधान।"
  },
  {
    id: "rudrabhisheka",
    title: "Rudrabhisheka",
    category: "Puja • Shaiva Tradition",
    statusBadge: "Under Review",
    statusType: "review", // amber
    timeAgo: "3 days ago",
    imageKey: "card-puja.jpg",
    desc: "यजुर्वेदीय रुद्राध्याय अनुसार भगवान शिव के एकादश रुद्र महाभिषेक का विधि-विधान।"
  },
  {
    id: "gayatri-mantra",
    title: "Gayatri Mantra",
    category: "Mantra • Vedic",
    statusBadge: "Approved",
    statusType: "approved", // green
    timeAgo: "5 days ago",
    imageKey: "card-rigveda.jpg",
    desc: "ऋग्वेद ३.६२.१० सवितृ महामंत्र का विशुद्ध पाठ, पदच्छेद, ऋषि-विश्वामित्र व गायत्री छंद।"
  }
];

// Browse by Source 10 pills (Matching Client Reference Image)
export const BROWSE_BY_SOURCE = [
  { id: "rigveda", label: "Rigveda", hiLabel: "ऋग्वेद" },
  { id: "yajurveda", label: "Yajurveda", hiLabel: "यजुर्वेद" },
  { id: "samaveda", label: "Samaveda", hiLabel: "सामवेद" },
  { id: "atharvaveda", label: "Atharvaveda", hiLabel: "अथर्ववेद" },
  { id: "upanishad", label: "Upanishad", hiLabel: "उपनिषद" },
  { id: "brahmana", label: "Brahmana", hiLabel: "ब्राह्मण" },
  { id: "aranyaka", label: "Aranyaka", hiLabel: "आरण्यक" },
  { id: "sutra", label: "Sutra", hiLabel: "सूत्र" },
  { id: "smriti", label: "Smriti", hiLabel: "स्मृति" },
  { id: "purana", label: "Purana", hiLabel: "पुराण" }
];

// Grantha Archive (Section 8 of doc)
export const GRANTHA_ARCHIVE = [
  {
    name: "श्रीमद्भगवद्गीता",
    enName: "Bhagavad Gita",
    author: "महर्षि वेदव्यास",
    summary: "१८ अध्याय, ७०० श्लोक — निष्काम कर्म, ज्ञान एवं भक्ति योग का अमर उपदेश।",
    category: "प्रस्थानत्रयी / महाभारत",
    imageKey: "card-gita.jpg"
  },
  {
    name: "वाल्मीकि रामायण",
    enName: "Valmiki Ramayana",
    author: "आदिकवि वाल्मीकि",
    summary: "७ काण्ड, २४,००० श्लोक — मर्यादा पुरुषोत्तम भगवान श्री राम का पावन जीवन चरित्र।",
    category: "आदिकाव्य",
    imageKey: "card-ramayana.jpg"
  },
  {
    name: "महाभारत",
    enName: "Mahabharata",
    author: "महर्षि वेदव्यास",
    summary: "१८ पर्व, १,००,००० श्लोक — धर्म, अर्थ, काम और मोक्ष का विश्वकोशीय आख्यान।",
    category: "इतिहास",
    imageKey: "card-mahabharata.jpg"
  },
  {
    name: "प्रमुख उपनिषद",
    enName: "Principal Upanishads",
    author: "वैदिक महर्षि परंपरा",
    summary: "ईश, केन, कठ, मुण्डक, माण्डूक्य — आत्मज्ञान व परम ब्रह्म की प्रत्यक्ष अनुभूति।",
    category: "वेदांत / श्रुति",
    imageKey: "card-upanishad.jpg"
  },
  {
    name: "१८ महापुराण",
    enName: "18 Mahapuranas",
    author: "महर्षि वेदव्यास",
    summary: "विष्णु, भागवत, शिव, स्कन्द — सृष्टि, वंश, मन्वन्तर और तीर्थ महात्म्य।",
    category: "पुराण",
    imageKey: "card-purana.jpg"
  },
  {
    name: "बृहत् पाराशर होरा शास्त्र",
    enName: "B.P. Hora Shastra",
    author: "महर्षि पाराशर",
    summary: "ग्रह, राशि, नक्षत्र, योग, दशा व भावों का मूलभूत वैज्ञानिक ज्योतिष शास्त्र।",
    category: "फलित ज्योतिष",
    imageKey: "card-astrology.jpg"
  },
  {
    name: "पतंजलि योगसूत्र",
    enName: "Patanjali Yogasutra",
    author: "महर्षि पतंजलि",
    summary: "४ पाद, १९६ सूत्र — योगश्चित्तवृत्तिनिरोधः, अष्टांग योग व समाधि मार्ग।",
    category: "योग दर्शन",
    imageKey: "card-samskara.jpg"
  },
  {
    name: "चरक संहिता",
    enName: "Charaka Samhita",
    author: "महर्षि चरक",
    summary: "८ स्थान, १२० अध्याय — त्रिदोष सिद्धांत, स्वास्थ्य संरक्षण एवं प्राकृतिक कायचिकित्सा।",
    category: "आयुर्वेद",
    imageKey: "card-vastu.jpg"
  }
];

// Mantra & Stotra (Section 9 of doc)
export const MANTRA_CATEGORIES = [
  "वैदिक मंत्र",
  "देवता मंत्र",
  "शांति मंत्र",
  "सूक्त",
  "स्तोत्र",
  "कवच",
  "सहस्रनाम",
  "आरती",
  "प्रार्थना"
];

export const FEATURED_MANTRAS = [
  {
    title: "गायत्री महामंत्र",
    source: "ऋग्वेद ३.६२.१०",
    rishi: "विश्वामित्र",
    devata: "सवितृ",
    chandas: "गायत्री",
    sanskrit: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥",
    translation: "उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा का हम ध्यान करें, जो हमारी बुद्धि को सन्मार्ग पर प्रेरित करे।"
  },
  {
    title: "महामृत्युंजय मंत्र",
    source: "ऋग्वेद ७.५९.१२",
    rishi: "वसिष्ठ / मार्कण्डेय",
    devata: "रुद्र",
    chandas: "अनुष्टुप",
    sanskrit: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥",
    translation: "हम त्रिनेत्रधारी सुगंधित व पुष्टिवर्धक भगवान शिव की आराधना करते हैं। जिस प्रकार पका हुआ खरबूजा बेल से मुक्त हो जाता है, उसी प्रकार हम मृत्यु के भय से मुक्त होकर अमृतत्त्व को प्राप्त हों।"
  },
  {
    title: "वैदिक शांति पाठ",
    source: "यजुर्वेद ३६.१७",
    rishi: "वैदिक परंपरा",
    devata: "विश्वेदेवाः",
    chandas: "अनुष्टुप",
    sanskrit: "ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः। वनस्पतयः शान्तिर्विश्वेदेवाः शान्तिर्ब्रह्म शान्तिः सर्वं शान्तिः शान्तिरेव शान्तिः सा मा शान्तिरेधि॥",
    translation: "द्युलोक शांत हो, अंतरिक्ष शांत हो, पृथ्वी शांत हो, जल शांत हो, औषधियाँ व वनस्पतियाँ शांत हों, समस्त देवगण व परब्रह्म शांत हों, सर्वत्र परम शांति का वास हो।"
  },
  {
    title: "पुरुष सूक्त (प्रथम ऋचा)",
    source: "ऋग्वेद १०.९०.१",
    rishi: "नारायण",
    devata: "विराट् पुरुष",
    chandas: "अनुष्टुप",
    sanskrit: "ॐ सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात्।\nस भूमिं विश्वतो वृत्वात्यतिष्ठद्दशाङ्गुलम्॥",
    translation: "परम विराट् पुरुष के सहस्रों मस्तक, सहस्रों नेत्र और सहस्रों चरण हैं। वे संपूर्ण ब्रह्मांड को सब ओर से व्याप्त करके भी दस अंगुल ऊपर स्थित हैं।"
  },
  {
    title: "श्री शिव ताण्डव स्तोत्र",
    source: "शैव स्तुति परंपरा",
    rishi: "रावण",
    devata: "भगवान नटराज",
    chandas: "पञ्चचामर",
    sanskrit: "जटाटवीगलज्जलप्रवाहपावितस्थले गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम्।\nडमड्डमड्डमड्डमन्निनादवड्डमर्वयं चकार चण्डताण्डवं तनोतु नः शिवः शिवम्॥",
    translation: "जिनके जटा रूपी वन से बहने वाली गंगा की धाराओं से पवित्र हुए कंठ में सर्पमाला शोभित है, जो डमरू की डम-डम ध्वनि के साथ प्रचंड तांडव करते हैं, वे भगवान शिव हमारा कल्याण करें।"
  },
  {
    title: "श्री सूक्त (प्रथम ऋचा)",
    source: "ऋग्वेद परिशिष्ट",
    rishi: "आनंद / कर्दम",
    devata: "महालक्ष्मी",
    chandas: "अनुष्टुप",
    sanskrit: "ॐ हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम्।\nचन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥",
    translation: "हे अग्निदेव! सुवर्ण के समान कान्ति वाली, हरिणी के सदृश चंचल, सोने और चांदी के आभूषणों से युक्त, चन्द्रमा के समान शीतल एवं प्रकाशमान महालक्ष्मी का मेरे लिए आह्वान करें।"
  }
];

// Explore by Topic - 18 chips (Section 10 of doc)
export const TOPIC_CHIPS = [
  { name: "धर्म", enName: "Dharma", count: 142 },
  { name: "कर्म", enName: "Karma", count: 98 },
  { name: "आत्मा", enName: "Atman", count: 76 },
  { name: "मोक्ष", enName: "Moksha", count: 64 },
  { name: "योग", enName: "Yoga", count: 112 },
  { name: "ध्यान", enName: "Dhyana (Meditation)", count: 54 },
  { name: "यज्ञ", enName: "Yagya (Ritual)", count: 88 },
  { name: "संस्कार", enName: "Samskara", count: 48 },
  { name: "ग्रह", enName: "Graha (Planets)", count: 92 },
  { name: "नक्षत्र", enName: "Nakshatra", count: 56 },
  { name: "राशि", enName: "Rashi (Zodiac)", count: 42 },
  { name: "वास्तु", enName: "Vastu", count: 65 },
  { name: "मंत्र", enName: "Mantra", count: 180 },
  { name: "पूजा", enName: "Puja (Worship)", count: 94 },
  { name: "देवता", enName: "Devata (Deities)", count: 130 },
  { name: "तीर्थ", enName: "Tirtha (Pilgrimage)", count: 72 },
  { name: "गुरु", enName: "Guru", count: 45 },
  { name: "संस्कृत", enName: "Sanskrit", count: 85 }
];

// Sacred Upanishad Quote Card (Matching Client Reference Image)
export const SACRED_QUOTE = {
  sanskrit: "यतो वाचो निवर्तन्ते अप्राप्य मनसा सह",
  translation: "Where words return, along with the mind, unable to reach.",
  hindiTranslation: "जहाँ से वाणी मन सहित, उस परब्रह्म को प्राप्त किए बिना लौट आती है।",
  hinglishTranslation: "Jahan se vani man sahit, us parabrahma ko prapt kiye bina laut aati hai.",
  source: "Taittiriya Upanishad (तैत्तिरीयोपनिषद् २.९.१)"
};

// Research & References (Section 13 of doc)
export const RESEARCH_MODULES = [
  { title: "Research Articles", desc: "शोध पत्र एवं शास्त्रीय समीक्षा", icon: "FileText" },
  { title: "Manuscripts", desc: "प्राचीन तालपत्र व भूर्जपत्र पांडुलिपि संदर्भ", icon: "Scroll" },
  { title: "Rare Texts", desc: "दुर्लभ वैदिक व दार्शनिक अप्रकाशित ग्रंथ", icon: "Archive" },
  { title: "Commentaries", desc: "सायण, शंकर, रामानुज आदि के प्रामाणिक भाष्य", icon: "BookMarked" },
  { title: "Translations", desc: "मूलनिष्ठ संस्कृत, हिंदी व अंग्रेजी अनुवाद", icon: "Languages" },
  { title: "Bibliography", desc: "शोधार्थियों हेतु शास्त्रीय संदर्भ ग्रंथसूची", icon: "Library" }
];

// Audience Paths (Section 14 of doc)
export const AUDIENCE_PATHS = [
  {
    role: "विद्यार्थी",
    enRole: "Students & Learners",
    desc: "वैदिक साहित्य, व्याकरण, दर्शन और संस्कृत की मूलभूत संरचना को चरणबद्ध समझें।",
    cta: "Start Learning"
  },
  {
    role: "साधक",
    enRole: "Spiritual Seekers",
    desc: "मंत्र, स्तोत्र, देवता उपासना, जप विधि और दैनिक आध्यात्मिक अनुष्ठान explore करें।",
    cta: "Explore Sadhana"
  },
  {
    role: "शोधकर्ता",
    enRole: "Scholars & Researchers",
    desc: "मूल संस्कृत पाठ, पांडुलिपि विवरण, भाष्य-तुलना और ग्रंथ-संदर्भों का गहन अध्ययन करें।",
    cta: "Research Archive"
  }
];

// Principles (Section 15 of doc)
export const PRINCIPLES = [
  {
    num: "01",
    title: "मूल स्रोत",
    desc: "जहाँ उपलब्ध हो, प्रामाणिक हस्तलिखित प्रतियां और मूल संहिताओं को प्राथमिकता।"
  },
  {
    num: "02",
    title: "संदर्भ",
    desc: "प्रत्येक मंत्र व श्लोक को ग्रंथ, अध्याय, सूक्त और पद संख्या के साथ लिंक करना।"
  },
  {
    num: "03",
    title: "संरचना",
    desc: "सामग्री को विषय, वेद शाखा और शास्त्रीय परंपरा के अनुसार वर्गीकृत करना।"
  },
  {
    num: "04",
    title: "परंपरा का सम्मान",
    desc: "वैदिक, स्मार्त, आगम और पौराणिक परंपराओं को उनके मूल स्वरूप में प्रस्तुत करना।"
  }
];

// Roadmap (Section 16 of doc)
export const ROADMAP_STAGES = [
  { step: "01", title: "Text", status: "Active", desc: "विशुद्ध देवनागरी पाठ संकलन" },
  { step: "02", title: "Structured Knowledge", status: "Active", desc: "शाखा, ऋषि, देवता संबंध" },
  { step: "03", title: "Audio", status: "Coming Soon", desc: "वैदिक स्वर आधारित शुद्ध पाठ" },
  { step: "04", title: "Chanting", status: "Coming Soon", desc: "पारंपरिक सामगान व जटापाठ" },
  { step: "05", title: "Video", status: "Roadmap", desc: "यज्ञ प्रक्रिया व अनुष्ठान चित्रण" },
  { step: "06", title: "Research Archive", status: "Roadmap", desc: "अंतरराष्ट्रीय पाण्डुलिपि सहयोग" }
];

// Footer Links (Section 19 / 20 of doc)
export const FOOTER_COLUMNS = {
  explore: [
    { label: "वेद (The Vedas)", href: "#four-vedas" },
    { label: "वेदाङ्ग (Vedangas)", href: "#categories" },
    { label: "उपनिषद एवं दर्शन", href: "#categories" },
    { label: "पुराण एवं इतिहास", href: "#categories" },
    { label: "मंत्र, सूक्त एवं स्तोत्र", href: "#mantras" },
    { label: "ज्योतिष (Jyotisha)", href: "#categories" },
    { label: "वास्तु (Vastu Shastra)", href: "#categories" },
    { label: "शास्त्र (Classical Shastras)", href: "#categories" }
  ],
  resources: [
    { label: "Grantha Archive (ग्रंथ संग्रह)", href: "#granthas" },
    { label: "Explore by Topic (विषय सूची)", href: "#topics" },
    { label: "Knowledge Connection Graph", href: "#connections" },
    { label: "Research & References", href: "#research" },
    { label: "Featured Knowledge", href: "#featured" },
    { label: "Recently Added Articles", href: "#recent" }
  ],
  structure: [
    { label: "About Veda Library", href: "#about" },
    { label: "Our Principles & Methodology", href: "#principles" },
    { label: "Library Growth Roadmap", href: "#roadmap" },
    { label: "Newsletter Updates", href: "#newsletter" },
    { label: "Terms & Citations", href: "#" },
    { label: "Contact & Collaboration", href: "#" }
  ]
};
