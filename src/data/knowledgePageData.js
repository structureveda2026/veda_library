// Comprehensive Knowledge Branches & Taxonomy Data
// 100% Aligned with Veda Library Specification & Document Structure: ALL BRANCHES (१२+ शाखाएँ)

export const KNOWLEDGE_BRANCHES = [
  {
    id: "vedic-knowledge",
    title: "Vedic Knowledge",
    hindiTitle: "वैदिक ज्ञान",
    subtitle: "The eternal wisdom of the Vedas and related literature",
    hindiSubtitle: "वेदों और संबंधित वैदिक साहित्य का शाश्वत ज्ञान",
    icon: "veda",
    subItems: ["Veda", "Vedanga", "Brahmana", "Aranyaka", "Upanishad", "Sutra"],
    hindiSubItems: ["वेद", "वेदाङ्ग", "ब्राह्मण", "आरण्यक", "उपनिषद", "सूत्र"],
    cards: [
      {
        id: "veda",
        icon: "veda",
        title: "Veda",
        hindiTitle: "वेद",
        desc: "Rigveda • Yajurveda • Samaveda • Atharvaveda",
        hindiDesc: "ऋग्वेद • यजुर्वेद • सामवेद • अथर्ववेद",
        sectionsCount: "4 Sections",
        hindiSectionsCount: "४ वेद / संभाग",
        badgeBg: "bg-amber-100/70",
        iconColor: "text-amber-700"
      },
      {
        id: "vedanga",
        icon: "vedanga",
        title: "Vedanga",
        hindiTitle: "वेदाङ्ग",
        desc: "Shiksha • Vyakarana • Chandas • Nirukta • Jyotisha • Kalpa",
        hindiDesc: "शिक्षा • व्याकरण • छन्द • निरुक्त • ज्योतिष • कल्प",
        sectionsCount: "6 Sections",
        hindiSectionsCount: "६ वेदाङ्ग",
        badgeBg: "bg-emerald-100/70",
        iconColor: "text-emerald-700"
      },
      {
        id: "brahmana",
        icon: "darshana",
        title: "Brahmana",
        hindiTitle: "ब्राह्मण ग्रंथ",
        desc: "Ritual explanations, liturgical injunctions and interpretations",
        hindiDesc: "यज्ञ-कर्मकाण्ड, विधि-विधान एवं दार्शनिक व्याख्याएँ",
        sectionsCount: "14 Brahmanas",
        hindiSectionsCount: "१४ ब्राह्मण ग्रंथ",
        badgeBg: "bg-orange-100/70",
        iconColor: "text-orange-700"
      },
      {
        id: "aranyaka",
        icon: "dharma",
        title: "Aranyaka",
        hindiTitle: "आरण्यक",
        desc: "Forest texts, esoteric philosophy and contemplative knowledge",
        hindiDesc: "अरण्य ग्रंथ, गूढ़ दर्शन एवं वानप्रस्थ ज्ञान",
        sectionsCount: "7 Aranyakas",
        hindiSectionsCount: "७ आरण्यक",
        badgeBg: "bg-stone-100",
        iconColor: "text-amber-900"
      },
      {
        id: "upanishad",
        icon: "upanishad",
        title: "Upanishad",
        hindiTitle: "उपनिषद",
        desc: "Philosophical wisdom, Brahmavidya and ultimate truth",
        hindiDesc: "वेदांत दर्शन, ब्रह्मविद्या एवं चरम सत्य",
        sectionsCount: "10 Principal Texts",
        hindiSectionsCount: "१० प्रमुख उपनिषद",
        badgeBg: "bg-cyan-100/70",
        iconColor: "text-cyan-700"
      },
      {
        id: "sutra",
        icon: "samskara",
        title: "Sutra",
        hindiTitle: "सूत्र साहित्य",
        desc: "Shrauta, Grihya, Dharma & Shulba Sutras systematic codification",
        hindiDesc: "श्रौत, गृह्य, धर्म एवं शुल्ब सूत्रों का शास्त्रीय संकलन",
        sectionsCount: "4 Sutra Classes",
        hindiSectionsCount: "४ सूत्र वर्ग",
        badgeBg: "bg-amber-100/70",
        iconColor: "text-amber-700"
      }
    ],
    relatedTags: ["Veda", "Mantra", "Agni", "Yajna", "Samskara", "Rishi", "Devata"],
    hindiRelatedTags: ["वेद", "मंत्र", "अग्नि", "यज्ञ", "संस्कार", "ऋषि", "देवता"]
  },
  {
    id: "shastra-darshana",
    title: "Shastra & Darshana",
    hindiTitle: "शास्त्र एवं दर्शन",
    subtitle: "The six orthodox schools of philosophy and classical treatises",
    hindiSubtitle: "षड् आस्तिक दर्शन एवं शास्त्रीय मीमांसा परंपरा",
    icon: "darshana",
    subItems: ["Sankhya", "Yoga", "Nyaya", "Vaisheshika", "Mimamsa", "Vedanta"],
    hindiSubItems: ["सांख्य", "योग", "न्याय", "वैशेषिक", "मीमांसा", "वेदांत"],
    cards: [
      {
        id: "sankhya",
        icon: "darshana",
        title: "Sankhya Darshana",
        hindiTitle: "सांख्य दर्शन",
        desc: "Prakriti-Purusha dualism founded by Sage Kapila",
        hindiDesc: "महर्षि कपिल प्रणीत प्रकृति-पुरुष द्वैत सिद्धांत",
        sectionsCount: "6 Adhyayas",
        hindiSectionsCount: "६ अध्याय",
        badgeBg: "bg-indigo-100/70",
        iconColor: "text-indigo-700"
      },
      {
        id: "yoga",
        icon: "dharma",
        title: "Yoga Darshana",
        hindiTitle: "योग दर्शन",
        desc: "Patanjali Yogasutras, Ashtanga Yoga & Chitta-vritti Nirodha",
        hindiDesc: "महर्षि पतंजलि कृत योगसूत्र, अष्टांग योग एवं चित्त-वृत्ति निरोध",
        sectionsCount: "4 Padas",
        hindiSectionsCount: "४ पाद",
        badgeBg: "bg-emerald-100/70",
        iconColor: "text-emerald-700"
      },
      {
        id: "nyaya",
        icon: "upanishad",
        title: "Nyaya Darshana",
        hindiTitle: "न्याय दर्शन",
        desc: "Epistemology, logical analysis & Sage Gautama pramanas",
        hindiDesc: "महर्षि गौतम कृत तर्कशास्त्र, प्रमाण एवं तत्त्वज्ञान",
        sectionsCount: "5 Adhyayas",
        hindiSectionsCount: "५ अध्याय",
        badgeBg: "bg-cyan-100/70",
        iconColor: "text-cyan-700"
      },
      {
        id: "vaisheshika",
        icon: "veda",
        title: "Vaisheshika Darshana",
        hindiTitle: "वैशेषिक दर्शन",
        desc: "Sage Kanada, 7 Padarthas, Atomic theory & Physics of existence",
        hindiDesc: "महर्षि कणाद कृत सप्त पदार्थ एवं परमाणु सिद्धांत",
        sectionsCount: "10 Adhyayas",
        hindiSectionsCount: "१० अध्याय",
        badgeBg: "bg-blue-100/70",
        iconColor: "text-blue-700"
      },
      {
        id: "mimamsa",
        icon: "darshana",
        title: "Mimamsa Darshana",
        hindiTitle: "मीमांसा दर्शन",
        desc: "Sage Jaimini Vedic hermeneutics, Dharma & Ritual injunctions",
        hindiDesc: "महर्षि जैमिनि कृत वैदिक कर्मकाण्ड एवं धर्म मीमांसा",
        sectionsCount: "12 Adhyayas",
        hindiSectionsCount: "१२ अध्याय",
        badgeBg: "bg-orange-100/70",
        iconColor: "text-orange-700"
      },
      {
        id: "vedanta",
        icon: "veda",
        title: "Vedanta Darshana",
        hindiTitle: "वेदांत दर्शन",
        desc: "Brahmasutras, Advaita, Vishishtadvaita & Dvaita traditions",
        hindiDesc: "बादरायण ब्रह्मसूत्र, अद्वैत, विशिष्टाद्वैत व द्वैत दर्शन",
        sectionsCount: "4 Adhyayas",
        hindiSectionsCount: "४ अध्याय",
        badgeBg: "bg-amber-100/70",
        iconColor: "text-amber-700"
      }
    ],
    relatedTags: ["Atman", "Brahman", "Moksha", "Samadhi", "Pramana", "Maya"],
    hindiRelatedTags: ["आत्मन", "ब्रह्म", "मोक्ष", "समाधि", "प्रमाण", "माया"]
  },
  {
    id: "itihasa-purana",
    title: "Itihasa & Purana",
    hindiTitle: "इतिहास एवं पुराण",
    subtitle: "Sacred epics, cosmic histories, and genealogies of divine avatars",
    hindiSubtitle: "महाकाव्य, पौराणिक इतिहास एवं दिव्य अवतारों की वंशावलियाँ",
    icon: "veda",
    subItems: ["18 Mahapuranas", "Upapuranas", "Valmiki Ramayana", "Mahabharata", "Bhagavad Gita"],
    hindiSubItems: ["१८ महापुराण", "उपपुराण", "वाल्मीकि रामायण", "महाभारत", "श्रीमद्भगवद्गीता"],
    cards: [
      {
        id: "mahapuranas",
        icon: "veda",
        title: "18 Mahapuranas",
        hindiTitle: "१८ महापुराण",
        desc: "Vishnu, Bhagavata, Shiva, Skanda, Garuda & Markandeya Puranas",
        hindiDesc: "विष्णु, भागवत, शिव, स्कन्द, गरुड़ एवं मार्कण्डेय पुराण",
        sectionsCount: "18 Puranas",
        hindiSectionsCount: "१८ महापुराण",
        badgeBg: "bg-indigo-100/70",
        iconColor: "text-indigo-700"
      },
      {
        id: "ramayana",
        icon: "dharma",
        title: "Valmiki Ramayana",
        hindiTitle: "वाल्मीकि रामायण",
        desc: "Adi Kavya: 7 Kandas, 24,000 Shlokas of Maryada Purushottama",
        hindiDesc: "आदिकाव्य: ७ काण्ड, २४,००० श्लोक — मर्यादा पुरुषोत्तम चरित्र",
        sectionsCount: "7 Kandas",
        hindiSectionsCount: "७ काण्ड",
        badgeBg: "bg-orange-100/70",
        iconColor: "text-orange-700"
      },
      {
        id: "mahabharata",
        icon: "darshana",
        title: "Mahabharata",
        hindiTitle: "महाभारत",
        desc: "18 Parvas, 100,000 Shlokas: Dharma, Artha, Kama, Moksha",
        hindiDesc: "१८ पर्व, १,००,००० श्लोक — धर्म, अर्थ, काम, मोक्ष आख्यान",
        sectionsCount: "18 Parvas",
        hindiSectionsCount: "१८ पर्व",
        badgeBg: "bg-purple-100/70",
        iconColor: "text-purple-700"
      },
      {
        id: "gita",
        icon: "upanishad",
        title: "Bhagavad Gita",
        hindiTitle: "श्रीमद्भगवद्गीता",
        desc: "18 Chapters, 700 verses: Jnana, Karma, and Bhakti Yoga",
        hindiDesc: "१८ अध्याय, ७०० श्लोक — ज्ञान, कर्म एवं भक्ति योग",
        sectionsCount: "18 Chapters",
        hindiSectionsCount: "१८ अध्याय",
        badgeBg: "bg-amber-100/70",
        iconColor: "text-amber-700"
      }
    ],
    relatedTags: ["Krishna", "Rama", "Pandavas", "Avatar", "Dharmayuddha", "Bhakti"],
    hindiRelatedTags: ["श्रीकृष्ण", "श्रीराम", "पाण्डव", "अवतार", "धर्मयुद्ध", "भक्ति"]
  },
  {
    id: "dharma-jeevan",
    title: "Dharma & Jeevan",
    hindiTitle: "धर्म एवं जीवन",
    subtitle: "Dharmashastras, ethics, daily duties, and four Purusharthas",
    hindiSubtitle: "धर्मशास्त्र, नीति, आचार संहिता एवं चतुर्विध पुरुषार्थ",
    icon: "dharma",
    subItems: ["Manusmriti", "Yajnavalkya", "Niti Shastra", "Purushartha"],
    hindiSubItems: ["मनुस्मृति", "याज्ञवल्क्य स्मृति", "नीति शास्त्र", "चार पुरुषार्थ"],
    cards: [
      {
        id: "dharmashastra",
        icon: "dharma",
        title: "Dharmashastras",
        hindiTitle: "धर्मशास्त्र",
        desc: "Manu, Yajnavalkya, Parashara Smritis and ethical jurisprudence",
        hindiDesc: "मनु, याज्ञवल्क्य, पाराशर स्मृतियाँ एवं शास्त्रीय विधान",
        sectionsCount: "12 Smritis",
        hindiSectionsCount: "१२ प्रमुख स्मृतियाँ",
        badgeBg: "bg-orange-100/70",
        iconColor: "text-orange-700"
      },
      {
        id: "nitishastra",
        icon: "darshana",
        title: "Niti Shastra",
        hindiTitle: "नीति शास्त्र",
        desc: "Chanakya Niti, Vidura Niti, Bhartrihari Niti Shatakam",
        hindiDesc: "चाणक्य नीति, विदुर नीति, भर्तृहरि नीतिशतकम्",
        sectionsCount: "4 Texts",
        hindiSectionsCount: "४ प्रमुख ग्रंथ",
        badgeBg: "bg-stone-100",
        iconColor: "text-stone-800"
      },
      {
        id: "purushartha",
        icon: "dharma",
        title: "Chaturvidha Purushartha",
        hindiTitle: "चार पुरुषार्थ",
        desc: "Dharma, Artha, Kama, and Moksha as universal life goals",
        hindiDesc: "धर्म, अर्थ, काम और मोक्ष — मानव जीवन के चार परम लक्ष्य",
        sectionsCount: "4 Pillars",
        hindiSectionsCount: "४ आधार स्तंभ",
        badgeBg: "bg-amber-100/70",
        iconColor: "text-amber-700"
      }
    ],
    relatedTags: ["Ashrama", "Varna", "Sadachara", "Karma", "Kartavya"],
    hindiRelatedTags: ["आश्रम", "वर्ण", "सदाचार", "कर्म", "कर्तव्य"]
  },
  {
    id: "puja-anushthana",
    title: "Puja & Anushthana",
    hindiTitle: "पूजा एवं अनुष्ठान",
    subtitle: "Worship rituals, Shodashopachara, Abhisheka, and temple vidhi",
    hindiSubtitle: "वैदिक पूजा विधान, षोडशोपचार, अभिषेक एवं देव स्तुति",
    icon: "puja",
    subItems: ["Rudrabhisheka", "Satyanarayan", "Navagraha", "Shodashopachara", "Aarti Vidhi"],
    hindiSubItems: ["रुद्राभिषेक", "सत्यनारायण", "नवग्रह शांति", "षोडशोपचार", "आरती विधि"],
    cards: [
      {
        id: "rudrabhisheka",
        icon: "puja",
        title: "Rudrabhisheka",
        hindiTitle: "रुद्राभिषेक",
        desc: "Yajurvedic Sri Rudram recitation and Mahadeva sacred abhisheka",
        hindiDesc: "यजुर्वेदीय श्रीरुद्रम् पाठ एवं महादेव का पावन अभिषेक",
        sectionsCount: "11 Anuvakas",
        hindiSectionsCount: "११ अनुवाक",
        badgeBg: "bg-rose-100/70",
        iconColor: "text-rose-700"
      },
      {
        id: "shodashopachara",
        icon: "samskara",
        title: "Shodashopachara Puja",
        hindiTitle: "षोडशोपचार पूजा",
        desc: "The 16 sacred steps of traditional Vedic deity invocation",
        hindiDesc: "पारंपरिक वैदिक देव-आवाहन के १६ पवित्र चरण",
        sectionsCount: "16 Steps",
        hindiSectionsCount: "१६ उपचार",
        badgeBg: "bg-emerald-100/70",
        iconColor: "text-emerald-700"
      },
      {
        id: "navagraha-puja",
        icon: "jyotisha",
        title: "Navagraha Puja & Shanti",
        hindiTitle: "नवग्रह शांति पूजा",
        desc: "Planetary propitiation, Samidha offerings, and protective mantras",
        hindiDesc: "सूर्य आदि नवग्रह शांति, समिधा हवन एवं रक्षा मंत्र",
        sectionsCount: "9 Deities",
        hindiSectionsCount: "९ अधिदेवता",
        badgeBg: "bg-amber-100/70",
        iconColor: "text-amber-800"
      }
    ],
    relatedTags: ["Shiva", "Vishnu", "Devi", "Ganesha", "Abhisheka", "Naivedya"],
    hindiRelatedTags: ["शिव", "विष्णु", "देवी", "गणेश", "अभिषेक", "नैवेद्य"]
  },
  {
    id: "yagya-sanskar",
    title: "Yagya & Samskara",
    hindiTitle: "यज्ञ एवं संस्कार",
    subtitle: "Sacred fire rituals, Agnihotra, Kunda geometry & 16 Life Samskaras",
    hindiSubtitle: "अग्निहोत्र, कुण्ड निर्माण शास्त्र एवं वैदिक १६ संस्कार",
    icon: "yagya",
    subItems: ["Agnihotra", "16 Samskaras", "Kunda Shastra", "Havishya", "Somayaga"],
    hindiSubItems: ["अग्निहोत्र", "षोडश संस्कार", "कुण्ड शास्त्र", "हविष्य", "सोमयाग"],
    cards: [
      {
        id: "agnihotra-daily",
        icon: "yagya",
        title: "Daily Agnihotra",
        hindiTitle: "दैनिक अग्निहोत्र",
        desc: "Sunrise and sunset bio-energetic copper pyramid fire ritual",
        hindiDesc: "सूर्योदय व सूर्यास्त पर ताम्र पात्र में जैव-ऊर्जावान् अग्निहोत्र",
        sectionsCount: "Daily Vidhi",
        hindiSectionsCount: "दैनिक विधि",
        badgeBg: "bg-amber-100/70",
        iconColor: "text-amber-700"
      },
      {
        id: "shodasha-samskara",
        icon: "samskara",
        title: "16 Vedic Samskaras",
        hindiTitle: "षोडश संस्कार",
        desc: "From Garbhadhana, Upanayana to Vivaha and Antyeshti rituals",
        hindiDesc: "गर्भाधान, उपनयन से लेकर विवाह व अन्त्येष्टि पर्यंत संस्कार",
        sectionsCount: "16 Rites",
        hindiSectionsCount: "१६ संस्कार",
        badgeBg: "bg-teal-100/70",
        iconColor: "text-teal-700"
      },
      {
        id: "kunda-geometry",
        icon: "darshana",
        title: "Kunda Shastra & Geometry",
        hindiTitle: "कुण्ड निर्माण शास्त्र",
        desc: "Sulba Sutras geometry, shapes, measurements & orientation",
        hindiDesc: "शुल्ब सूत्र आधारित कुण्ड संरचना, माप, दिशा व ज्यामिति",
        sectionsCount: "8 Kunda Types",
        hindiSectionsCount: "८ कुण्ड प्रकार",
        badgeBg: "bg-orange-100/70",
        iconColor: "text-orange-700"
      }
    ],
    relatedTags: ["Agnihotra", "Upanayana", "Vivaha", "Homa", "Sulba Sutra", "Kunda"],
    hindiRelatedTags: ["अग्निहोत्र", "उपनयन", "विवाह", "हवन", "शुल्ब सूत्र", "कुण्ड"]
  },
  {
    id: "mantra-stotra-branch",
    title: "Mantra & Stotra",
    hindiTitle: "मंत्र एवं स्तोत्र",
    subtitle: "Vedic suktas, kavachas, sahasranamas, and divine chants",
    hindiSubtitle: "वैदिक सूक्त, कवच, सहस्रनाम एवं दिव्य स्तुतियाँ",
    icon: "mantra",
    subItems: ["Gayatri", "Mahamrityunjaya", "Purusha Sukta", "Sri Sukta", "Sahasranama"],
    hindiSubItems: ["गायत्री", "महामृत्युंजय", "पुरुष सूक्त", "श्री सूक्त", "सहस्रनाम"],
    cards: [
      {
        id: "gayatri",
        icon: "mantra",
        title: "Gayatri Mahamantra",
        hindiTitle: "गायत्री महामंत्र",
        desc: "Rigveda 3.62.10 solar illumination prayer to Savitur",
        hindiDesc: "ऋग्वेद ३.६२.१० — सविता देव की पावन मेधा-प्रार्थना",
        sectionsCount: "1 Mantra",
        hindiSectionsCount: "१ महामंत्र",
        badgeBg: "bg-purple-100/70",
        iconColor: "text-purple-700"
      },
      {
        id: "mahamrityunjaya",
        icon: "puja",
        title: "Mahamrityunjaya Mantra",
        hindiTitle: "महामृत्युंजय मंत्र",
        desc: "Rigveda 7.59.12 Tryambakam Rudra immortality chant",
        hindiDesc: "ऋग्वेद ७.५९.१२ — त्र्यम्बकम् रुद्र अमृत संजीवनी मंत्र",
        sectionsCount: "1 Mantra",
        hindiSectionsCount: "१ महामंत्र",
        badgeBg: "bg-rose-100/70",
        iconColor: "text-rose-700"
      },
      {
        id: "sri-sukta-card",
        icon: "mantra",
        title: "Shri Suktam",
        hindiTitle: "श्री सूक्त",
        desc: "Rigveda parishishta hymn for prosperity, auspiciousness and Lakshmi",
        hindiDesc: "ऋग्वेद परिशिष्ट — महालक्ष्मी एवं ऐश्वर्य कृपा सूक्त",
        sectionsCount: "15 Verses",
        hindiSectionsCount: "१५ ऋचाएँ",
        badgeBg: "bg-amber-100/70",
        iconColor: "text-amber-800"
      }
    ],
    relatedTags: ["Japa", "Chandas", "Rishi", "Bija Mantra", "Kavacha"],
    hindiRelatedTags: ["जप", "छन्द", "ऋषि", "बीज मंत्र", "कवच"]
  },
  {
    id: "devata-tradition",
    title: "Devata & Tradition",
    hindiTitle: "देवता एवं उपासना",
    subtitle: "Smarta Panchayatana, 33 Koti Devas, and iconography",
    hindiSubtitle: "स्मार्त पंचायतन, ३३ कोटि देवता एवं शास्त्रीय रूप-स्वरूप",
    icon: "devata",
    subItems: ["Shiva", "Vishnu", "Durga", "Ganesha", "Surya", "33 Vedic Devas"],
    hindiSubItems: ["शिव", "विष्णु", "दुर्गा", "गणेश", "सूर्य", "३३ वैदिक देव"],
    cards: [
      {
        id: "panchayatana",
        icon: "devata",
        title: "Smarta Panchayatana",
        hindiTitle: "स्मार्त पंचायतन",
        desc: "Surya, Ganesha, Ambika, Shiva, and Vishnu mandala",
        hindiDesc: "सूर्य, गणेश, दुर्गा, शिव और विष्णु का पावन मण्डल",
        sectionsCount: "5 Deities",
        hindiSectionsCount: "५ प्रधान देवता",
        badgeBg: "bg-emerald-100/70",
        iconColor: "text-emerald-800"
      },
      {
        id: "dvadasha-jyotirlinga-card",
        icon: "devata",
        title: "12 Jyotirlingas & Shakti Peethas",
        hindiTitle: "द्वादश ज्योतिर्लिंग व शक्तिपीठ",
        desc: "Sacred Shaiva and Shakta pilgrimage geography across Bharat",
        hindiDesc: "भारतवर्ष के पवित्र १२ ज्योतिर्लिंग एवं ५१ शक्तिपीठ",
        sectionsCount: "12 + 51 Peethas",
        hindiSectionsCount: "१२ + ५१ पीठ",
        badgeBg: "bg-rose-100/70",
        iconColor: "text-rose-700"
      }
    ],
    relatedTags: ["Ishta Devata", "Dhyana Shloka", "Murti", "Tattva"],
    hindiRelatedTags: ["इष्ट देवता", "ध्यान श्लोक", "मूर्ति", "तत्त्व"]
  },
  {
    id: "jyotisha-branch",
    title: "Jyotisha",
    hindiTitle: "ज्योतिष शास्त्र",
    subtitle: "Vedanga astronomy, 9 Grahas, 12 Rashis, 27 Nakshatras & Muhurta",
    hindiSubtitle: "वेदाङ्ग ज्योतिष, नवग्रह, १२ राशियाँ, २७ नक्षत्र एवं मुहूर्त विज्ञान",
    icon: "jyotisha",
    subItems: ["Siddhanta", "Samhita", "Hora", "Kundali", "Nakshatras"],
    hindiSubItems: ["सिद्धांत", "संहिता", "होरा", "कुण्डली", "नक्षत्र"],
    cards: [
      {
        id: "hora",
        icon: "jyotisha",
        title: "Hora Shastra",
        hindiTitle: "होरा शास्त्र",
        desc: "Brihat Parashara Hora Shastra, planetary combinations & dashas",
        hindiDesc: "बृहत् पराशर होरा शास्त्र, ग्रह योग एवं दशा फल विचार",
        sectionsCount: "97 Chapters",
        hindiSectionsCount: "९७ अध्याय",
        badgeBg: "bg-orange-100/70",
        iconColor: "text-amber-800"
      },
      {
        id: "panchanga-card",
        icon: "jyotisha",
        title: "Panchanga & Muhurta",
        hindiTitle: "पंचांग व मुहूर्त",
        desc: "Tithi, Vara, Nakshatra, Yoga, Karana time calculation science",
        hindiDesc: "तिथि, वार, नक्षत्र, योग, करण — पंच काल गणना विज्ञान",
        sectionsCount: "5 Limbs",
        hindiSectionsCount: "५ अंग",
        badgeBg: "bg-amber-100/70",
        iconColor: "text-amber-700"
      }
    ],
    relatedTags: ["Surya", "Chandra", "Graha", "Rashi", "Dasha", "Gochar"],
    hindiRelatedTags: ["सूर्य", "चन्द्र", "ग्रह", "राशि", "दशा", "गोचर"]
  },
  {
    id: "ayurveda-traditional",
    title: "Ayurveda & Traditional",
    hindiTitle: "आयुर्वेद एवं शास्त्र",
    subtitle: "Charaka, Sushruta, Tridosha health, Vastu, and allied sciences",
    hindiSubtitle: "चरक, सुश्रुत, त्रिदोष साम्य, वास्तु एवं पारंपरिक उपवेद",
    icon: "traditional-knowledge",
    subItems: ["Charaka Samhita", "Sushruta Samhita", "Vastu Shastra", "Dhanurveda"],
    hindiSubItems: ["चरक संहिता", "सुश्रुत संहिता", "वास्तु शास्त्र", "धनुर्वेद"],
    cards: [
      {
        id: "charaka",
        icon: "traditional-knowledge",
        title: "Charaka Samhita",
        hindiTitle: "चरक संहिता",
        desc: "Vata-Pitta-Kapha equilibrium, dietetics, and longevity",
        hindiDesc: "वात-पित्त-कफ संतुलन, दिनचर्या, आहार एवं दीर्घायु विज्ञान",
        sectionsCount: "8 Sthanas",
        hindiSectionsCount: "८ स्थान",
        badgeBg: "bg-blue-100/70",
        iconColor: "text-blue-700"
      },
      {
        id: "vastu-card",
        icon: "vastu",
        title: "Vastu Shastra",
        hindiTitle: "वास्तु शास्त्र",
        desc: "Vastu Purusha Mandala, 8 cardinal directions, and sacred space design",
        hindiDesc: "वास्तु पुरुष मण्डल, अष्ट दिशाएँ एवं गृह निर्माण वास्तु",
        sectionsCount: "Samarangan Sutradhar",
        hindiSectionsCount: "समरांगण सूत्रधार",
        badgeBg: "bg-amber-100/70",
        iconColor: "text-amber-900"
      }
    ],
    relatedTags: ["Tridosha", "Prakriti", "Rasayana", "Vastu", "Pancha Mahabhuta"],
    hindiRelatedTags: ["त्रिदोष", "प्रकृति", "रसायन", "वास्तु", "पंचमहाभूत"]
  },
  {
    id: "sanskrit-knowledge",
    title: "Sanskrit Knowledge",
    hindiTitle: "संस्कृत एवं भाषा",
    subtitle: "Panini Ashtadhyayi, grammar, linguistics, and Vedic phonetics",
    hindiSubtitle: "पाणिनीय अष्टाध्यायी, व्याकरण, भाषा विज्ञान एवं वैदिक ध्वन्यात्मकता",
    icon: "veda",
    subItems: ["Ashtadhyayi", "Nirukta", "Amarakosha", "Chandas"],
    hindiSubItems: ["अष्टाध्यायी", "निरुक्त", "अमरकोश", "छन्द शास्त्र"],
    cards: [
      {
        id: "ashtadhyayi",
        icon: "veda",
        title: "Panini Ashtadhyayi",
        hindiTitle: "अष्टाध्यायी",
        desc: "Maheshwara Sutras, grammatical formulas, and morpho-syntax",
        hindiDesc: "माहेश्वर सूत्र, व्याकरण सूत्र एवं पद-संरचना विज्ञान",
        sectionsCount: "8 Adhyayas",
        hindiSectionsCount: "८ अध्याय",
        badgeBg: "bg-amber-100/70",
        iconColor: "text-amber-700"
      },
      {
        id: "nirukta-card",
        icon: "vedanga",
        title: "Yaska Nirukta",
        hindiTitle: "यास्क निरुक्त",
        desc: "Vedic etymology, root semantics, and Nighantu vocabulary",
        hindiDesc: "वैदिक व्युत्पत्ति, धातु-अर्थ एवं निघण्टु पद-मीमांसा",
        sectionsCount: "12 Adhyayas",
        hindiSectionsCount: "१२ अध्याय",
        badgeBg: "bg-emerald-100/70",
        iconColor: "text-emerald-700"
      }
    ],
    relatedTags: ["Dhatu", "Pratyaya", "Sandhi", "Samasa", "Vaidika Sanskrit"],
    hindiRelatedTags: ["धातु", "प्रत्यय", "संधि", "समास", "वैदिक संस्कृत"]
  },
  {
    id: "grantha-sangrahalaya",
    title: "Grantha Sangrahalaya",
    hindiTitle: "ग्रंथ संग्रहालय",
    subtitle: "Comprehensive digital repository of Vedic manuscripts and shastras",
    hindiSubtitle: "वैदिक पाण्डुलिपियों, श्रुति एवं स्मृति ग्रंथों का डिजिटल भण्डार",
    icon: "veda",
    subItems: ["Shruti", "Smriti", "Darshana", "Kavya", "Stotra"],
    hindiSubItems: ["श्रुति", "स्मृति", "दर्शन", "काव्य", "स्तोत्र"],
    cards: [
      {
        id: "shrutis",
        icon: "veda",
        title: "Shruti Collection",
        hindiTitle: "श्रुति संग्रह",
        desc: "4 Samhitas, 14 Brahmanas, Aranyakas, and Principal Upanishads",
        hindiDesc: "४ संहिताएँ, १४ ब्राह्मण ग्रंथ, आरण्यक एवं प्रमुख उपनिषद",
        sectionsCount: "100+ Texts",
        hindiSectionsCount: "१००+ ग्रंथ",
        badgeBg: "bg-amber-100/70",
        iconColor: "text-amber-700"
      },
      {
        id: "manuscripts-card",
        icon: "grantha",
        title: "Palm-leaf & Grantha Manuscripts",
        hindiTitle: "पाण्डुलिपि संग्रह",
        desc: "High-resolution digital folios of rare Sanskrit manuscripts",
        hindiDesc: "ताड़पत्र एवं दुर्लभ संस्कृत पाण्डुलिपियों के डिजिटल पृष्ठ",
        sectionsCount: "500+ Folios",
        hindiSectionsCount: "५००+ पत्र",
        badgeBg: "bg-yellow-100/70",
        iconColor: "text-yellow-800"
      }
    ],
    relatedTags: ["Grantha", "Manuscripts", "Editions", "Commentaries"],
    hindiRelatedTags: ["ग्रंथ", "पाण्डुलिपि", "संस्करण", "भाष्य"]
  },
  {
    id: "research-documentation",
    title: "Research & Documentation",
    hindiTitle: "शोध एवं संदर्भ",
    subtitle: "Academic papers, critical editions, palm-leaf archives, and citations",
    hindiSubtitle: "शास्त्रीय शोध प्रपत्र, पाठालोचन संस्करण एवं ग्रंथावली संदर्भ",
    icon: "upanishad",
    subItems: ["Critical Editions", "Manuscripts", "Translations", "Bibliography"],
    hindiSubItems: ["पाठालोचन", "पाण्डुलिपियाँ", "अनुवाद", "ग्रंथ सूची"],
    cards: [
      {
        id: "critical-editions",
        icon: "upanishad",
        title: "Critical Textual Editions",
        hindiTitle: "पाठालोचन व संस्करण",
        desc: "Comparative variant readings, Sayana commentaries, and translations",
        hindiDesc: "तुलनात्मक पाठ-भेद, सायणाचार्य भाष्य एवं प्रामाणिक अनुवाद",
        sectionsCount: "50+ Archives",
        hindiSectionsCount: "५०+ अभिलेखागार",
        badgeBg: "bg-indigo-100/70",
        iconColor: "text-indigo-700"
      },
      {
        id: "concordance-card",
        icon: "research",
        title: "Vedic Word Concordance",
        hindiTitle: "वैदिक पद-अनुक्रमणिका",
        desc: "Cross-referential concordance and root index of Vedic literature",
        hindiDesc: "वैदिक वाङ्मय की व्यापक पद-अनुक्रमणिका एवं धातु कोष",
        sectionsCount: "16 Volumes",
        hindiSectionsCount: "१६ खण्ड",
        badgeBg: "bg-cyan-100/70",
        iconColor: "text-cyan-800"
      }
    ],
    relatedTags: ["Manuscript", "Sayana", "Shankara", "Ramanuja", "Citation"],
    hindiRelatedTags: ["पाण्डुलिपि", "सायण", "शंकर", "रामानुज", "प्रमाण"]
  }
];