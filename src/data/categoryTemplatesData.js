// Comprehensive Data Dictionary for Dynamic Categories, Subjects, and Articles
// Built according to Veda Library Specification:
// Page 2: /library/:category
// Page 3: /library/:category/:subject
// Page 4: /library/:category/:subject/:article

import { COMPREHENSIVE_ARTICLES_DATA } from "./vedicArticlesData.js";
import {
  PURANA_CATEGORY_DATA,
  ITIHASA_CATEGORY_DATA,
  UPANISHAD_EXPANDED_CATEGORY_DATA,
  DARSHANA_EXPANDED_CATEGORY_DATA,
  GRANTHA_SUBJECTS_DATA
} from "./granthaCategoryData.js";

export const CATEGORIES_DATA = {
  veda: {
    id: "veda",
    slug: "veda",
    name: "वेद",
    enName: "The Vedas",
    eyebrow: "VEDA LIBRARY",
    description: "ऋग्वेद, यजुर्वेद, सामवेद और अथर्ववेद—वैदिक ज्ञान परंपरा के चार प्रमुख वेदों को एक व्यवस्थित डिजिटल संग्रह के रूप में explore करें।",
    detailedDescription: "यहाँ प्रत्येक वेद की संरचना, संबंधित शाखाएँ, संहिता, मंत्र, सूक्त, ऋषि, देवता, छंद और उपलब्ध संदर्भों को विषय एवं ग्रंथ के अनुसार समझने और पढ़ने की सुविधा होगी।",
    quickStats: "४ प्रमुख वेद • ११३१+ शाखाएँ (प्राचीन) • २०,०००+ मंत्र",
    exploreBy: "Veda · Shakha · Samhita · Sukta · Mantra · Rishi · Deity · Chandas",
    primaryCta: "Explore the Four Vedas →",
    secondaryCta: "Browse Vedic Articles →",
    introHeading: "वेदों को समझने की शुरुआत",
    introText: "वेद भारतीय वैदिक ज्ञान परंपरा के प्रमुख ग्रंथ-संग्रह हैं। Veda Library में वेदों से संबंधित सामग्री को केवल लेखों के रूप में नहीं, बल्कि ग्रंथ, संरचना, मंत्र, सूक्त, ऋषि, देवता और विषय के आपसी संबंधों के साथ व्यवस्थित किया जाएगा। पाठक किसी वेद से सीधे शुरुआत कर सकता है या किसी विशेष मंत्र, सूक्त, ऋषि, देवता अथवा विषय के माध्यम से संबंधित सामग्री तक पहुँच सकता है।",
    structureHierarchy: [
      { level: "वेद", en: "Veda", desc: "मूल श्रुति ज्ञान (ऋक्, यजुष्, साम, अथर्व)" },
      { level: "शाखा", en: "Shakha", desc: "पाठ-परंपरा (शाकल, तैत्तिरीय, कौथुम आदि)" },
      { level: "संहिता", en: "Samhita", desc: "मंत्र संकलन संग्रह" },
      { level: "मंडल / काण्ड / अर्चिक", en: "Mandal / Kanda", desc: "मुख्य विभाजन" },
      { level: "अनुवाक / अध्याय", en: "Anuvaka / Chapter", desc: "उप-विभाजन" },
      { level: "सूक्त", en: "Sukta", desc: "ऋचाओं का विशिष्ट स्तुति समूह" },
      { level: "मंत्र / ऋचा", en: "Mantra", desc: "मूल वैदिक श्लोक / स्वर युक्त पद" },
      { level: "ऋषि · देवता · छंद", en: "Entities", desc: "द्रष्टा, उपास्य एवं छंद विधान" }
    ],
    subCategories: [
      {
        id: "rigveda",
        slug: "rigveda",
        name: "ऋग्वेद",
        enName: "Rigveda",
        desc: "ऋचाओं और सूक्तों का प्रमुख वैदिक संग्रह। संबंधित मंत्रों, ऋषियों, देवताओं और छंदों को explore करें।",
        stats: "१० मण्डल • १०२८ सूक्त • १०,५५२ मंत्र",
        priest: "होतृ (Hotri)",
        imageKey: "card-rigveda.jpg"
      },
      {
        id: "yajurveda",
        slug: "yajurveda",
        name: "यजुर्वेद",
        enName: "Yajurveda",
        desc: "यज्ञ एवं वैदिक कर्म से संबंधित मंत्रों और पाठ-परंपराओं का संग्रह। शुक्ल और कृष्ण शाखा परंपरा।",
        stats: "४० अध्याय • १९७५ मंत्र",
        priest: "अध्वर्यु (Adhvaryu)",
        imageKey: "card-yajurveda.jpg"
      },
      {
        id: "samaveda",
        slug: "samaveda",
        name: "सामवेद",
        enName: "Samaveda",
        desc: "सामगान और वैदिक गायन से संबंधित मंत्र एवं पाठ-परंपरा। आध्यात्मिक माधुर्य का मूल स्रोत।",
        stats: "१८७५ छंद/साम",
        priest: "उद्गातृ (Udgatri)",
        imageKey: "card-samaveda.jpg"
      },
      {
        id: "atharvaveda",
        slug: "atharvaveda",
        name: "अथर्ववेद",
        enName: "Atharvaveda",
        desc: "विविध वैदिक मंत्रों और जीवन से संबंधित विषयों की सामग्री का संग्रह। राष्ट्र सूक्त व भैषज्य विद्या।",
        stats: "२० काण्ड • ७३० सूक्त • ५,९७७ मंत्र",
        priest: "ब्रह्मा (Brahma)",
        imageKey: "card-atharvaveda.jpg"
      }
    ],
    topics: [
      "अग्नि", "सूर्य", "इंद्र", "सोम", "उषा", "रुद्र", "विष्णु", "प्रार्थना", "शांति", "यज्ञ", "प्रकृति", "जीवन", "ज्ञान", "प्रार्थना एवं उपासना"
    ],
    featuredKnowledge: [
      {
        id: "purusha-sukta",
        title: "पुरुष सूक्त",
        enTitle: "Purusha Sukta",
        type: "Sukta • Rigveda",
        desc: "ऋग्वेद १०.९० — विराट पुरुष के स्वरूप, सृष्टि उत्पत्ति और वैश्विक एकता का दार्शनिक सूक्त।",
        subjectSlug: "rigveda",
        articleSlug: "purusha-sukta"
      },
      {
        id: "agni-sukta",
        title: "अग्नि सूक्त",
        enTitle: "Agni Sukta",
        type: "Sukta • Rigveda",
        desc: "ऋग्वेद १.१ — 'अग्निमीळे पुरोहितं' प्रथम वैदिक सूक्त, पुरोहित व यज्ञ के प्रकाशक स्वरूप।",
        subjectSlug: "rigveda",
        articleSlug: "agnisukta"
      },
      {
        id: "gayatri-mantra",
        title: "गायत्री महामंत्र",
        enTitle: "Gayatri Mantra",
        type: "Mantra • Rigveda",
        desc: "ऋग्वेद ३.६२.१० — सवितृ देव की परम चेतना और प्रज्ञा जागरण का सर्वश्रेष्ठ मंत्र।",
        subjectSlug: "rigveda",
        articleSlug: "gayatri-mantra"
      }
    ],
    faqs: [
      {
        q: "वेद कितने हैं?",
        a: "Veda Library में चार प्रमुख वेद—ऋग्वेद, यजुर्वेद, सामवेद और अथर्ववेद—के लिए विस्तृत संरचना, शाखाएँ और अध्ययन सामग्री उपलब्ध हैं।"
      },
      {
        q: "क्या मैं किसी मंत्र को सीधे खोज सकता हूँ?",
        a: "हाँ। Library Global Search (⌘K) के माध्यम से मंत्र, सूक्त, विषय, ऋषि, देवता अथवा ग्रंथ के आधार पर सीधे खोज की जा सकती है।"
      },
      {
        q: "क्या मूल संस्कृत पाठ उपलब्ध होगा?",
        a: "जहाँ सामग्री और स्रोत उपलब्ध हैं, वहाँ शुद्ध देवनागरी पाठ के साथ स्वर, पदच्छेद, शब्दार्थ, हिंदी अनुवाद एवं व्याख्या दी जाती है।"
      },
      {
        q: "क्या Veda Library में audio उपलब्ध होगा?",
        a: "प्रारंभिक चरण में Library का focus structured text और source-based content पर है। आगामी चरणों में वैदिक स्वर पाठ व chanting resources जोड़े जाएंगे।"
      }
    ]
  },
  "mantra-stotra": {
    id: "mantra-stotra",
    slug: "mantra-stotra",
    name: "मंत्र, सूक्त एवं स्तोत्र",
    enName: "Mantra, Sukta & Stotra",
    eyebrow: "VEDA LIBRARY",
    description: "वैदिक मंत्रों, देवता मंत्रों, शांति मंत्रों, सूक्तों, स्तोत्रों और प्रार्थनाओं का प्रामाणिक डिजिटल संग्रह।",
    detailedDescription: "शुद्ध स्वर, पदच्छेद, ऋषि, देवता, छंद एवं शास्त्रीय संदर्भों के साथ कल्याणकारी मंत्रों का अध्ययन करें।",
    quickStats: "१०+ श्रेणियाँ • ५००+ मंत्र व सूक्त • प्रामाणिक संदर्भ",
    exploreBy: "Mantra · Sukta · Stotra · Kavacha · Sahasranama · Rishi · Devata · Chandas",
    primaryCta: "Explore Mantra Library →",
    secondaryCta: "Browse Stotra Archive →",
    introHeading: "मंत्र एवं स्तोत्र परंपरा की शुरुआत",
    introText: "मंत्र केवल शब्द नहीं, अपितु चेतना को रूपांतरित करने वाली आध्यात्मिक ध्वनियाँ हैं। Veda Library में मंत्रों को उनके ऋषि, देवता, छंद, बीज और शास्त्रीय पाठ परंपरा के साथ व्यवस्थित किया गया है।",
    subCategories: [
      {
        id: "shiva",
        slug: "shiva",
        name: "शिव मंत्र एवं स्तोत्र",
        enName: "Shiva Mantras & Stotras",
        desc: "महामृत्युंजय, शिव तांडव, रुद्राष्टकम एवं पञ्चाक्षर मंत्र।",
        stats: "२५+ स्तोत्र व मंत्र",
        imageKey: "deity-shiva.jpg"
      },
      {
        id: "vishnu",
        slug: "vishnu",
        name: "विष्णु मंत्र एवं स्तोत्र",
        enName: "Vishnu Mantras & Stotras",
        desc: "विष्णु सहस्रनाम, नारायण कवच, द्वादशाक्षर मंत्र एवं पुरुष सूक्त।",
        stats: "२०+ स्तोत्र व मंत्र",
        imageKey: "deity-vishnu.jpg"
      },
      {
        id: "devi",
        slug: "devi",
        name: "देवी मंत्र एवं सूक्त",
        enName: "Devi Mantras & Suktas",
        desc: "श्री सूक्त, दुर्गा सप्तशती, कनकधारा स्तोत्र, ललिता सहस्रनाम।",
        stats: "३०+ स्तोत्र व मंत्र",
        imageKey: "deity-durga.jpg"
      },
      {
        id: "gayatri",
        slug: "gayatri",
        name: "वैदिक शांति व गायत्री मंत्र",
        enName: "Vaidika Shanti & Gayatri",
        desc: "महाशांति पाठ, गायत्री महामंत्र, पवमान व हिरण्यगर्भ सूक्त।",
        stats: "१५+ वैदिक सूक्त",
        imageKey: "deity-saraswati.jpg"
      },
      {
        id: "ganesh",
        slug: "ganesh",
        name: "श्री गणेश मंत्र व स्तुति",
        enName: "Ganesh Mantras & Stutis",
        desc: "संकटनाशन गणेश स्तोत्र, अथर्वशीर्ष, वक्रतुण्ड महामंत्र।",
        stats: "१०+ स्तोत्र व मंत्र",
        imageKey: "deity-ganesh.jpg"
      },
      {
        id: "surya",
        slug: "surya",
        name: "सूर्य एवं नवग्रह मंत्र",
        enName: "Surya & Navagraha Mantras",
        desc: "आदित्य हृदय स्तोत्र, नवग्रह स्तोत्र एवं शांति विधान।",
        stats: "१२+ स्तोत्र व मंत्र",
        imageKey: "deity-navagraha.jpg"
      },
      {
        id: "hanuman",
        slug: "hanuman",
        name: "हनुमान चालीसा एवं स्तोत्र",
        enName: "Hanuman Chalisa & Stotras",
        desc: "हनुमान चालीसा, बजरंग बाण, संकटमोचन हनुमानाष्टक।",
        stats: "८+ स्तोत्र व पाठ",
        imageKey: "card-puja.jpg"
      }
    ],
    topics: ["गायत्री", "महामृत्युंजय", "शांति", "आरती", "कवच", "सहस्रनाम", "सूक्त", "बीज मंत्र", "स्तोत्र"],
    featuredKnowledge: [
      {
        id: "mahamrityunjaya",
        title: "महामृत्युंजय मंत्र",
        enTitle: "Mahamrityunjaya Mantra",
        type: "Mantra • Rigveda 7.59.12",
        desc: "त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् — अकाल मृत्यु निवारण व अमृतत्व प्रदायक शिव मंत्र।",
        subjectSlug: "shiva",
        articleSlug: "mahamrityunjaya-mantra"
      },
      {
        id: "shiva-tandava",
        title: "शिव ताण्डव स्तोत्र",
        enTitle: "Shiva Tandava Stotram",
        type: "Stotra • Shaiva Tradition",
        desc: "जटाटवीगलज्जलप्रवाहपावितस्थले — रावण कृत परम कल्याणकारी नटराज स्तुति।",
        subjectSlug: "shiva",
        articleSlug: "shiva-tandava"
      },
      {
        id: "vishnu-sahasranama",
        title: "विष्णु सहस्रनाम स्तोत्र",
        enTitle: "Vishnu Sahasranama",
        type: "Stotra • Mahabharata Anushasana Parva",
        desc: "पितामह भीष्म द्वारा युधिष्ठिर को उपदिष्ट भगवान विष्णु के १,००० दिव्य नाम।",
        subjectSlug: "vishnu",
        articleSlug: "vishnu-sahasranama"
      },
      {
        id: "gayatri-mantra",
        title: "गायत्री महामंत्र",
        enTitle: "Gayatri Maha Mantra",
        type: "Mantra • Rigveda 3.62.10",
        desc: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि — आत्म-जागरण व सद्बुद्धि प्रदायक।",
        subjectSlug: "gayatri",
        articleSlug: "gayatri-maha-mantra"
      }
    ],
    faqs: [
      {
        q: "क्या मंत्र का शुद्ध उच्चारण आवश्यक है?",
        a: "हाँ, वैदिक मंत्रों में स्वर (उदात्त, अनुदात्त, स्वरित) का विशेष महत्व है। यहाँ उपलब्ध पाठ में शुद्ध स्वर संकेत दिए गए हैं।"
      }
    ]
  },
  puja: {
    id: "puja",
    slug: "puja",
    name: "पूजा एवं अनुष्ठान",
    enName: "Puja & Rituals",
    eyebrow: "VEDA LIBRARY",
    description: "शास्त्रोक्त पूजन विधि, षोडशोपचार आराधना, कलश स्थापन, पंचामृत एवं विशेष अनुष्ठान संग्रह।",
    detailedDescription: "विभिन्न शास्त्रीय परंपराओं (शैव, वैष्णव, शाक्त, स्मार्त) के अनुसार वैदिक पूजन विधियों का प्रामाणिक विवरण।",
    quickStats: "१६ उपचार • ५ प्रमुख परंपराएँ • प्रामाणिक मंत्र विधान",
    exploreBy: "Puja · Upachara · Abhisheka · Kalasha · Mantra · Tradition",
    primaryCta: "Explore Puja Vidhi →",
    secondaryCta: "Browse Rituals →",
    introHeading: "वैदिक व स्मार्त पूजा पद्धति",
    introText: "पूजा केवल बाह्य क्रिया नहीं, बल्कि आत्मसमर्पण और देव चेतना से एकाकार होने का माध्यम है। षोडशोपचार पूजन में आवाहन से लेकर विसर्जन तक प्रत्येक अंग का आध्यात्मिक एवं वैज्ञानिक रहस्य है।",
    subCategories: [
      {
        id: "shaiva",
        slug: "shaiva",
        name: "शैव पूजन व रुद्राभिषेक",
        enName: "Shaiva Puja & Abhisheka",
        desc: "शिवलिंग पूजन, पंचामृत अभिषेक, बिल्व पत्र समर्पण एवं रुद्राध्याय।",
        stats: "११ अनुवाक",
        imageKey: "deity-shiva.jpg"
      },
      {
        id: "shodashopachara",
        slug: "shodashopachara",
        name: "षोडशोपचार पूजन",
        enName: "Shodashopachara Vidhi",
        desc: "आवाहन, आसन, पाद्य, अर्घ्य, आचमन, स्नान, वस्त्र, यज्ञोपवीत, गंध, पुष्प, धूप, दीप, नैवेद्य, ताम्बूल, प्रदक्षिणा, नमस्कार।",
        stats: "१६ उपचार",
        imageKey: "card-puja.jpg"
      }
    ],
    topics: ["रुद्राभिषेक", "कलश", "पंचामृत", "बिल्व पत्र", "आरती", "षोडशोपचार"],
    featuredKnowledge: [
      {
        id: "rudrabhisheka",
        title: "रुद्राभिषेक विधान",
        enTitle: "Rudrabhisheka Vidhi",
        type: "Puja • Shaiva Tradition",
        desc: "यजुर्वेद तैत्तिरीय संहिता अनुसार एकादश रुद्र महाभिषेक का शास्त्रीय स्वरूप।",
        subjectSlug: "shaiva",
        articleSlug: "rudrabhisheka"
      }
    ],
    faqs: [
      {
        q: "रुद्राभिषेक का शास्त्रीय आधार क्या है?",
        a: "रुद्राभिषेक का मूल आधार कृष्ण यजुर्वेद की तैत्तिरीय संहिता के चतुर्थ काण्ड का पञ्चम प्रपाठक (श्री रुद्राध्याय) है।"
      }
    ]
  },
  "yagya-sanskar": {
    id: "yagya-sanskar",
    slug: "yagya-sanskar",
    name: "यज्ञ, संस्कार एवं कर्मकाण्ड",
    enName: "Yagya, Sanskar & Karmakanda",
    eyebrow: "VEDA LIBRARY",
    description: "दैनिक पंच महायज्ञ, अग्निहोत्र, षोडश (१६) वैदिक संस्कार एवं कर्मकाण्ड परंपरा।",
    detailedDescription: "गर्भाधान से विवाह एवं अन्त्येष्टि तक १६ संस्कारों का विधि-विधान एवं वैज्ञानिक महत्व।",
    quickStats: "१६ संस्कार • ५ महायज्ञ • कुंड वेदी विज्ञान",
    exploreBy: "Yagya · Sanskar · Agnihotra · Havan · Kunda · Shrauta · Grihya",
    primaryCta: "Explore 16 Sanskars →",
    secondaryCta: "Browse Yagya Vidhi →",
    introHeading: "यज्ञ एवं संस्कार परंपरा",
    introText: "यज्ञो वै श्रेष्ठतमं कर्म — यज्ञ सृष्टि चक्र को संतुलित रखने वाला श्रेष्ठतम कर्म है। सोलह संस्कार मानव जीवन को परिष्कृत एवं सुसंस्कृत बनाने की वैदिक वैज्ञानिक व्यवस्था हैं।",
    subCategories: [
      {
        id: "agnihotra",
        slug: "agnihotra",
        name: "अग्निहोत्र एवं दैनिक यज्ञ",
        enName: "Agnihotra & Daily Yagya",
        desc: "सूर्य-अग्नि उपासना, प्रातः-सायं आहुति एवं पर्यावरण शुद्धि।",
        stats: "दैनिक विधान",
        imageKey: "card-yagya-fire.jpg"
      },
      {
        id: "samskaras",
        slug: "samskaras",
        name: "षोडश संस्कार",
        enName: "16 Vedic Samskaras",
        desc: "गर्भाधान, पुंसवन, जातकर्म, नामकरण, उपनयन, विवाह, अन्त्येष्टि।",
        stats: "१६ संस्कार",
        imageKey: "card-samskara.jpg"
      }
    ],
    topics: ["अग्निहोत्र", "उपनयन", "विवाह", "हवन कुण्ड", "समिधा", "पंचामृत", "आहुति"],
    featuredKnowledge: [
      {
        id: "agnihotra-vidhi",
        title: "दैनिक अग्निहोत्र",
        enTitle: "Agnihotra Practice",
        type: "Yagya • Vedic Practice",
        desc: "सूर्योदय एवं सूर्यास्त कालीन तांबे के पात्र में गोघृत व अक्षत से आहुति विधान।",
        subjectSlug: "agnihotra",
        articleSlug: "agnihotra"
      }
    ],
    faqs: [
      {
        q: "अग्निहोत्र का मुख्य समय क्या है?",
        a: "अग्निहोत्र सटीक सूर्योदय एवं सूर्यास्त के समय किया जाता है, जब सौर ऊर्जा का विशेष प्रभाव होता है।"
      }
    ]
  },
  jyotisha: {
    id: "jyotisha",
    slug: "jyotisha",
    name: "ज्योतिष शास्त्र",
    enName: "Vaidika Jyotisha",
    eyebrow: "VEDA LIBRARY",
    description: "वेदाङ्ग ज्योतिष, ९ ग्रह, १२ राशियाँ, २७ नक्षत्र, भाव, विंशोत्तरी दशा एवं काल गणना।",
    detailedDescription: "बृहत्पाराशर होरा शास्त्र, सूर्य सिद्धांत एवं वराहमिहिर परंपरा का वैज्ञानिक अध्ययन।",
    quickStats: "९ ग्रह • १२ राशि • २७ नक्षत्र • सिद्धांत-संहिता-होरा",
    exploreBy: "Graha · Rashi · Nakshatra · Bhava · Dasha · Gochara · Muhurta",
    primaryCta: "Explore Jyotisha →",
    secondaryCta: "Browse Hora Shastra →",
    introHeading: "वेदाङ्ग ज्योतिष — काल ज्ञान",
    introText: "ज्योतिषामयनं चक्षुः — ज्योतिष को वेदों का नेत्र कहा गया है। यह काल विधान और ब्रह्मांडीय ऊर्जाओं के मानवीय जीवन पर प्रभाव को समझने का प्राचीन खगोल-विज्ञान है।",
    subCategories: [
      {
        id: "graha",
        slug: "graha",
        name: "नवग्रह विचार",
        enName: "Navagraha Sciences",
        desc: "सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु, केतु का स्वरूप व फल।",
        stats: "९ ग्रह",
        imageKey: "card-jyotisha.jpg"
      }
    ],
    topics: ["सूर्य", "चंद्र", "नक्षत्र", "लग्न", "राशि", "महादशा", "मुहूर्त"],
    featuredKnowledge: [
      {
        id: "surya-graha",
        title: "सूर्य ग्रह विज्ञान",
        enTitle: "Surya Graha Tattva",
        type: "Jyotisha • Graha",
        desc: "आत्मा कारक सूर्य, सिंह राशि स्वामी, तेज व आरोग्य प्रदाता भास्कर।",
        subjectSlug: "graha",
        articleSlug: "surya"
      }
    ],
    faqs: [
      {
        q: "वेदाङ्ग ज्योतिष का मुख्य प्रयोजन क्या है?",
        a: "वेदाङ्ग ज्योतिष का मूल उद्देश्य यज्ञ, पर्व एवं संस्कारों के लिए सटीक काल व मुहूर्त का निर्धारण करना है।"
      }
    ]
  },
  vedanga: {
    id: "vedanga",
    slug: "vedanga",
    name: "वेदाङ्ग",
    enName: "The Vedangas",
    eyebrow: "VEDA LIBRARY",
    description: "शिक्षा, कल्प, व्याकरण, निरुक्त, छंद और ज्योतिष—वेदों के छह सहायक अंगों का व्यवस्थित अध्ययन।",
    detailedDescription: "वेदों के शुद्ध उच्चारण, व्याकरण, अर्थ-बोध, छंद विधान और काल-गणना के लिए ६ प्रमुख वेदाङ्ग।",
    quickStats: "६ प्रमुख अंग • पाणिनीय व्याकरण • पिङ्गल छंद",
    exploreBy: "Shiksha · Kalpa · Vyakarana · Nirukta · Chandas · Jyotisha",
    primaryCta: "Explore 6 Vedangas →",
    secondaryCta: "Browse Sutras →",
    introHeading: "वेदाङ्ग — वेदों के षडङ्ग",
    introText: "वेदाङ्ग वेदों के अर्थ को समझने तथा यज्ञ आदि कर्मों के यथार्थ अनुष्ठान के लिए अनिवार्य छह विद्याएँ हैं।",
    subCategories: [
      { id: "shiksha", slug: "shiksha", name: "शिक्षा (Phonetics)", enName: "Shiksha", desc: "वर्णोच्चारण एवं स्वर विज्ञान", stats: "पाणिनीय शिक्षा", imageKey: "card-shiksha.jpg" },
      { id: "vyakarana", slug: "vyakarana", name: "व्याकरण (Grammar)", enName: "Vyakarana", desc: "पाणिनीय अष्टाध्यायी एवं पद रचना", stats: "८ अध्याय", imageKey: "card-vyakarana.jpg" },
      { id: "kalpa", slug: "kalpa", name: "कल्प (Ritual Codes)", enName: "Kalpa", desc: "श्रौत, गृह्य, धर्म व शुल्ब सूत्र", stats: "४ सूत्र भेद", imageKey: "card-kalpa.jpg" },
      { id: "chandas", slug: "chandas", name: "छंद (Metrics)", enName: "Chandas", desc: "गायत्री, त्रिष्टुप, जगती आदि वैदिक छंद", stats: "पिङ्गल सूत्र", imageKey: "card-chhanda.jpg" }
    ],
    topics: ["पाणिनि", "अष्टाध्यायी", "स्वरित", "उदात्त", "श्रौतसूत्र", "शुल्बसूत्र", "गायत्री छंद"],
    featuredKnowledge: [
      { id: "panini-ashtadhyayi", title: "पाणिनीय अष्टाध्यायी", enTitle: "Panini Ashtadhyayi", type: "Vedanga • Vyakarana", desc: "संस्कृत व्याकरण का आधारभूत ग्रंथ", subjectSlug: "vyakarana", articleSlug: "ashtadhyayi" }
    ],
    faqs: [{ q: "वेदाङ्ग कितने हैं?", a: "वेदाङ्ग छह हैं: शिक्षा, कल्प, व्याकरण, निरुक्त, छंद और ज्योतिष।" }]
  },
  purana: PURANA_CATEGORY_DATA,
  itihasa: ITIHASA_CATEGORY_DATA,
  upanishad: UPANISHAD_EXPANDED_CATEGORY_DATA,
  darshana: DARSHANA_EXPANDED_CATEGORY_DATA,
  dharma: {
    id: "dharma",
    slug: "dharma",
    name: "धर्म एवं नीति शास्त्र",
    enName: "Dharma & Ethics",
    eyebrow: "VEDA LIBRARY",
    description: "मनुस्मृति, याज्ञवल्क्य, चाणक्य नीति, विदुर नीति एवं पुरुषार्थ चतुष्टय का अध्ययन।",
    detailedDescription: "व्यक्ति, समाज और राष्ट्र के नैतिक एवं शास्त्रोक्त आचरण की सनातन संहिताएँ।",
    quickStats: "१२+ स्मृतियाँ • ४ पुरुषार्थ • सदाचार विधान",
    exploreBy: "Smriti · Niti · Purushartha · Sadachara · Kartavya",
    primaryCta: "Explore Dharmashastras →",
    secondaryCta: "Browse Niti Shastra →",
    introHeading: "धर्मो रक्षति रक्षितः",
    introText: "धारणाद् धर्म इत्याहुः धर्मो धारयते प्रजाः — जो संपूर्ण सृष्टि एवं समाज को धारण करता है, वह धर्म है।",
    subCategories: [
      { id: "smriti", slug: "smriti", name: "धर्मशास्त्र एवं स्मृतियाँ", enName: "Dharmashastras", desc: "मनु, याज्ञवल्क्य व पराशर स्मृति", stats: "सदाचार", imageKey: "card-dharmasutra.jpg" }
    ],
    topics: ["सत्य", "अहिंसा", "सदाचार", "पुरुषार्थ", "कर्तव्य"],
    featuredKnowledge: [
      { id: "chanakya-niti", title: "चाणक्य नीति", enTitle: "Chanakya Niti", type: "Niti • Ethics", desc: "जीवन, प्रबंधन एवं लोक-व्यवहार के सूत्र", subjectSlug: "smriti", articleSlug: "chanakya-niti" }
    ],
    faqs: [{ q: "चार पुरुषार्थ कौन से हैं?", a: "धर्म, अर्थ, काम और मोक्ष।" }]
  },
  samskara: {
    id: "samskara",
    slug: "samskara",
    name: "षोडश संस्कार",
    enName: "16 Vedic Samskaras",
    eyebrow: "VEDA LIBRARY",
    description: "गर्भाधान से विवाह एवं अन्त्येष्टि तक मानव जीवन को पवित्र करने वाले १६ वैदिक संस्कार।",
    detailedDescription: "प्रत्येक संस्कार के विधि-विधान, मंत्र, संकल्प एवं वैज्ञानिक आधार का विशद संकलन।",
    quickStats: "१६ वैदिक संस्कार • गृह्यसूत्र परंपरा • संस्कार विधि",
    exploreBy: "Samskara · Grihyasutra · Mantra · Vidhi",
    primaryCta: "Explore 16 Sanskars →",
    secondaryCta: "Browse Samskara Vidhi →",
    introHeading: "संस्कार परंपरा",
    introText: "संस्कार मानव जीवन को परिष्कृत एवं सुसंस्कृत बनाने की वैदिक व्यवस्था है।",
    subCategories: [
      { id: "upanayana", slug: "upanayana", name: "उपनयन संस्कार", enName: "Upanayana", desc: "गायत्री दीक्षा एवं ब्रह्मचर्य व्रत", stats: "द्विजत्व", imageKey: "card-samskara.jpg" }
    ],
    topics: ["गर्भाधान", "पुंसवन", "नामकरण", "उपनयन", "विवाह", "अन्त्येष्टि"],
    featuredKnowledge: [
      { id: "vivaha-samskara", title: "वैदिक विवाह संस्कार", enTitle: "Vedic Vivaha Sanskar", type: "Sanskar • Grihyasutra", desc: "सप्तपदी, पाणिग्रहण एवं लाजा होम", subjectSlug: "upanayana", articleSlug: "vivaha" }
    ],
    faqs: [{ q: "सोलह संस्कार कौन से हैं?", a: "गर्भाधान, पुंसवन, सीमन्तोन्नयन, जातकर्म, नामकरण, निष्क्रमण, अन्नप्राशन, चूड़ाकर्म, कर्णवेध, विद्यारंभ, उपनयन, वेदारंभ, केशांत, समावर्तन, विवाह एवं अन्त्येष्टि।" }]
  },
  devata: {
    id: "devata",
    slug: "devata",
    name: "देवता एवं उपासना",
    enName: "Devatas & Iconography",
    eyebrow: "VEDA LIBRARY",
    description: "स्मार्त पंचायतन, ३३ कोटि वैदिक देवता, स्वरूप, ध्यान श्लोक, आयुध एवं तात्विक रहस्य।",
    detailedDescription: "शिव, विष्णु, दुर्गा, गणेश, सूर्य आदि देवताओं के वैदिक व पौराणिक स्वरूप का प्रामाणिक संग्रह।",
    quickStats: "३३ वैदिक देव • पंचायतन • ध्यान मंत्र",
    exploreBy: "Devata · Dhyana · Mantra · Rupa · Tattva",
    primaryCta: "Explore Deities →",
    secondaryCta: "Browse Dhyana Shlokas →",
    introHeading: "वैदिक एवं स्मार्त देव परंपरा",
    introText: "एकं सद्विप्रा बहुधा वदन्ति — एक ही परमसत्य को ऋषियों ने विविध नामों और स्वरूपों में वर्णित किया है।",
    subCategories: [
      { id: "panchayatana", slug: "panchayatana", name: "स्मार्त पंचायतन", enName: "Panchayatana", desc: "सूर्य, गणेश, देवी, रुद्र व विष्णु", stats: "५ देव स्वरूप", imageKey: "deity-panchayatana.jpg" }
    ],
    topics: ["शिव", "विष्णु", "दुर्गा", "गणेश", "सूर्य", "अग्नि", "इंद्र"],
    featuredKnowledge: [
      { id: "panchayatana-mandala", title: "स्मार्त पंचायतन उपासना", enTitle: "Panchayatana Worship", type: "Devata • Puja", desc: "पाँच प्रमुख देवताओं का समन्वित मंडल", subjectSlug: "panchayatana", articleSlug: "panchayatana" }
    ],
    faqs: [{ q: "पंचायतन में कौन से ५ देवता होते हैं?", a: "शिव, विष्णु, दुर्गा (देवी), गणेश और सूर्य।" }]
  }
};

// Subjects Data for Page 3: /library/:category/:subject
export const SUBJECTS_DATA = {
  "veda/rigveda": {
    categorySlug: "veda",
    subjectSlug: "rigveda",
    name: "ऋग्वेद",
    enName: "Rigveda",
    eyebrow: "VEDA → RIGVEDA",
    intro: "ऋग्वेद वैदिक ज्ञान परंपरा के प्रमुख ग्रंथ-संग्रहों में से एक है। Veda Library में ऋग्वेद से संबंधित उपलब्ध पाठ, सूक्त, मंत्र, ऋषि, देवता, छंद, विषय, ग्रंथ-संदर्भ और अध्ययन सामग्री को व्यवस्थित रूप से explore किया जा सकता है।",
    quickInfo: {
      type: "Veda (श्रुति)",
      language: "Vedic Sanskrit",
      content: "Sukta · Mantra · Rishi · Devata · Chandas",
      explore: "Texts · Articles · References",
      mandalCount: "10 मण्डल",
      suktaCount: "1,028 सूक्त",
      mantraCount: "10,552 मंत्र",
      chiefPriest: "होतृ (Hotri)",
      chiefRishis: "मधुच्छन्दा, विश्वामित्र, वसिष्ठ, अत्रि, भारद्वाज, गृत्समद, कण्व"
    },
    navTabs: ["Overview", "Texts", "Structure", "Mantra & Sukta", "Rishi & Devata", "Articles", "Grantha", "References"],
    overviewText: "ऋग्वेद सनातन ज्ञान परंपरा का प्राचीनतम ग्रंथ है। इसमें १० मण्डलों में १०२८ सूक्त और १०,५५२ ऋचाएँ संकलित हैं। महर्षि विश्वामित्र, वसिष्ठ, भारद्वाज, अत्रि आदि ऋषियों द्वारा साक्षात्कृत ये मंत्र अग्नि, इंद्र, सूर्य, वरुण, उषा आदि देवों के स्वरूप और ब्रह्मांडीय सत्यों का उद्घाटन करते हैं।",
    structureCards: [
      { num: "10", title: "मण्डल", desc: "१० प्रमुख विभाजन (ऋषि कुल विभाजन)" },
      { num: "1,028", title: "सूक्त", desc: "ऋचाओं के विशिष्ट स्तुति समूह" },
      { num: "10,552", title: "मंत्र / ऋचा", desc: "स्वर-युक्त विशुद्ध वैदिक ऋचाएँ" }
    ],
    availableTexts: [
      { title: "मण्डल १", desc: "विविध ऋषि कुल (मधुच्छन्दा, मेधातिथि, दीर्घतमा, अगस्त्य आदि) • १९१ सूक्त, २००६ मंत्र — अग्नि, इंद्र, मरुत, अश्विनी सूक्त", mantraId: "rv-1-1-1", slug: "mandala-1" },
      { title: "मण्डल २", desc: "गृत्समद ऋषि कुल (भार्गव-शौनक) • ४३ सूक्त, ४२९ मंत्र — इंद्र, अग्नि, रुद्र सूक्त", slug: "mandala-2" },
      { title: "मण्डल ३", desc: "विश्वामित्र ऋषि कुल (गाथिन) • ६२ सूक्त, ६१७ मंत्र — गायत्री महामंत्र (३.६२.१०), अग्नि, इंद्र", mantraId: "rv-3-62-10", slug: "mandala-3" },
      { title: "मण्डल ४", desc: "वामदेव गौतम ऋषि कुल • ५८ सूक्त, ५८९ मंत्र — अग्नि, इंद्र, ऋभु, उषा, घृत सूक्त", slug: "mandala-4" },
      { title: "मण्डल ५", desc: "अत्रि भौम ऋषि कुल (अत्रि, पौरोहित) • ८७ सूक्त, ७२७ मंत्र — अग्नि, इंद्र, मरुत, विश्वेदेवा", slug: "mandala-5" },
      { title: "मण्डल ६", desc: "भारद्वाज बार्हस्पत्य ऋषि कुल • ७५ सूक्त, ७६५ मंत्र — इंद्र, अग्नि, सरस्वती, पूषा", slug: "mandala-6" },
      { title: "मण्डल ७", desc: "वसिष्ठ मैत्रावरुणि ऋषि कुल • १०४ सूक्त, ८४१ मंत्र — महामृत्युंजय मंत्र (७.५९.१२), वरुण, अग्नि, इंद्र", mantraId: "rv-7-59-12", slug: "mandala-7" },
      { title: "मण्डल ८", desc: "काण्व एवं प्रगाथ ऋषि कुल • १०३ सूक्त, १७१६ मंत्र — इंद्र, अग्नि, बालखिल्य ११ सूक्त (८.४९-५९)", slug: "mandala-8" },
      { title: "मण्डल ९", desc: "पवमान सोम मण्डल (विविध ऋषि) • ११४ सूक्त, ११०८ मंत्र — समस्त सूक्त केवल सोम देव को समर्पित", slug: "mandala-9" },
      { title: "मण्डल १०", desc: "त्रित आप्त्य, नारायण, प्रजापति, श्रद्धा आदि • १९१ सूक्त, १७५४ मंत्र — पुरुष सूक्त (१०.९०), नासदीय सूक्त (१०.१२९), संगठन सूक्त (१०.१९१), विवाह सूक्त (१०.८५), नदी सूक्त (१०.७५)", mantraId: "rv-10-90-1", slug: "mandala-10" }
    ],
    rishis: [
      "मधुच्छन्दा वैश्वामित्र (मण्डल १)",
      "गृत्समद भार्गव (मण्डल २)",
      "विश्वामित्र गाथिन (मण्डल ३)",
      "वामदेव गौतम (मण्डल ४)",
      "अत्रि भौम (मण्डल ५)",
      "भारद्वाज बार्हस्पत्य (मण्डल ६)",
      "वसिष्ठ मैत्रावरुणि (मण्डल ७)",
      "कण्व व प्रगाथ (मण्डल ८)",
      "पवमान सोम द्रष्टा (मण्डल ९)",
      "नारायण, त्रित आप्त्य, अगस्त्य, दीर्घतमा (मण्डल १०)"
    ],
    devatas: ["अग्नि", "इंद्र", "सूर्य", "सोम", "वरुण", "उषा", "रुद्र", "विष्णु", "मरुत"],
    articles: [
      {
        id: "agnisukta",
        title: "ऋग्वेद प्रथम सूक्त — अग्नि सूक्त",
        desc: "अग्निमीळे पुरोहितं — प्रथम मण्डल के प्रथम सूक्त का विशद अर्थ व भाष्य।",
        slug: "agnisukta"
      },
      {
        id: "purusha-sukta",
        title: "पुरुष सूक्त (१०.९०) का तात्विक परिचय",
        desc: "सहस्रशीर्षा पुरुषः — विराट पुरुष से ब्रह्मांडीय सृष्टि की उत्पत्ति का सिद्धांत।",
        slug: "purusha-sukta"
      },
      {
        id: "gayatri-mantra",
        title: "गायत्री महामंत्र (३.६२.१०) का विशुद्ध वैदिक स्वरूप",
        desc: "सवितृ देव की उपासना, ऋषि-विश्वामित्र एवं गायत्री छंद का समन्वय।",
        slug: "gayatri-mantra"
      },
      {
        id: "mahamrityunjaya-mantra",
        title: "महामृत्युंजय मंत्र (७.५९.१२)",
        desc: "त्र्यम्बकं यजामहे — अकाल मृत्यु निवारक, अमृतत्व प्रदायक शिव मंत्र।",
        slug: "mahamrityunjaya-mantra"
      },
      {
        id: "nasadiya-sukta",
        title: "नासदीय सूक्त (१०.१२९) — सृष्टि उत्पत्ति",
        desc: "नासदासीन्नो सदासीत्तदानीं — ब्रह्मांड की उत्पत्ति का परम दार्शनिक चिंतन।",
        slug: "nasadiya-sukta"
      },
      {
        id: "samgathan-sukta",
        title: "संगठन सूक्त (१०.१९१) — 'सं गच्छध्वम्'",
        desc: "समानो मन्त्रः समितिः समानी — ऋग्वेद का अमर वैश्विक एकता संदेश।",
        slug: "samgathan-sukta"
      },
      {
        id: "vak-sukta",
        title: "वाक् सूक्त / देवी सूक्त (१०.१२५)",
        desc: "अहं रुद्रेभिर्वसुभिश्चरामि — वागाम्भृणी द्वारा दृष्ट शाक्त परंपरा का मूल।",
        slug: "vak-sukta"
      },
      {
        id: "hiranyagarbha-sukta",
        title: "हिरण्यगर्भ सूक्त (१०.१२१)",
        desc: "कस्मै देवाय हविषा विधेम — ज्योतिर्मय प्रजापति की वैदिक स्तुति।",
        slug: "hiranyagarbha-sukta"
      }
    ],
    relatedGranthas: [
      { name: "शाकल संहिता", type: "संहिता", author: "महर्षि शाकल्य", slug: "shakala-samhita" },
      { name: "ऐतरेय ब्राह्मण", type: "ब्राह्मण", author: "महीदास ऐतरेय", slug: "aitareya-brahmana" },
      { name: "ऐतरेय आरण्यक", type: "आरण्यक", author: "वैदिक परंपरा", slug: "aitareya-aranyaka" },
      { name: "ऐतरेयोपनिषद्", type: "उपनिषद", author: "प्रस्थानत्रयी ('प्रज्ञानं ब्रह्म')", slug: "aitareya-upanishad" },
      { name: "सायण भाष्य (माधवीय धातुवृत्ति)", type: "भाष्य", author: "सायणाचार्य", slug: "sayana-bhashya" }
    ],
    relatedSubjects: [
      { name: "यजुर्वेद", slug: "yajurveda", desc: "शुक्ल व कृष्ण शाखा, शतपथ ब्राह्मण" },
      { name: "सामवेद", slug: "samaveda", desc: "सामगान, छान्दोग्य व केनोपनिषद्" },
      { name: "अथर्ववेद", slug: "atharvaveda", desc: "शौनक, पैप्पलाद, मुण्डक व माण्डूक्य" }
    ]
  },
  "veda/yajurveda": {
    categorySlug: "veda",
    subjectSlug: "yajurveda",
    name: "यजुर्वेद",
    enName: "Yajurveda",
    eyebrow: "VEDA → YAJURVEDA",
    intro: "यजुर्वेद यज्ञ, कर्मकाण्ड, मंत्र एवं अनुष्ठान विधान का प्रमुख वेद है। इसके दो मुख्य विभाग हैं — शुक्ल यजुर्वेद (माध्यन्दिना, काण्व व सूत्र ग्रंथ) और कृष्ण यजुर्वेद (तैत्तिरीय, मैत्रायणी, कठ, कपिष्ठल)।",
    quickInfo: {
      type: "Veda (यज्ञ कर्म श्रुति)",
      language: "Vedic Sanskrit",
      content: "Shukla & Krishna · Samhita · Brahmana · Aranyaka · Upanishad · Sutras",
      explore: "Madhyandina · Kanva · Taittiriya · Maitrayani · Kathaka",
      mandalCount: "२ मुख्य धाराएँ",
      suktaCount: "४० अध्याय (शुक्ल) • ७ काण्ड (तैत्तिरीय)",
      mantraCount: "१९७५+ मंत्र (शुक्ल) • २१९८ (कृष्ण)",
      chiefPriest: "अध्वर्यु (Adhvaryu)",
      chiefRishis: "याज्ञवल्क्य, तित्तिरि, वैशम्पायन, कठ, कात्यायन, पारस्कर, बौधायन"
    },
    navTabs: ["Overview", "Shukla Yajurveda", "Krishna Yajurveda", "Structure", "Texts", "Rishi & Devata", "Articles", "Grantha"],
    overviewText: "यजुर्वेद यज्ञीय क्रियाओं का मार्गदर्शक वेद है। शुक्ल यजुर्वेद में महर्षि याज्ञवल्क्य द्वारा सूर्यदेव से साक्षात्कृत शुद्ध मंत्र भाग संकलित है (माध्यन्दिना एवं काण्व शाखा), जिसके साथ विशाल शतपथ ब्राह्मण और ईश तथा बृहदारण्यक जैसे प्रधान उपनिषद आते हैं। कृष्ण यजुर्वेद में तैत्तिरीय, मैत्रायणी, कठ एवं कपिष्ठल शाखाएँ हैं जिनमें श्री रुद्राध्याय, तैत्तिरीय ब्राह्मण, तैत्तिरीय आरण्यक और कठोपनिषद सम्मिलित हैं।",
    structureCards: [
      { num: "शुक्ल यजुर्वेद", title: "माध्यन्दिना व काण्व", desc: "वाजसनेयि संहिता (४० अध्याय, १९७५ मंत्र), शतपथ ब्राह्मण (१४ काण्ड), ईश व बृहदारण्यक उपनिषद" },
      { num: "कृष्ण यजुर्वेद", title: "तैत्तिरीय, मैत्रायणी, कठ", desc: "तैत्तिरीय संहिता (श्री रुद्राध्याय), तैत्तिरीय ब्राह्मण, तैत्तिरीय आरण्यक, कठोपनिषद" },
      { num: "कल्प व सूत्र", title: "पारस्कर, कात्यायन, बौधायन", desc: "श्रौत, गृह्य, धर्म व शुल्ब सूत्र (वैदिक ज्यामिति व संस्कार)" }
    ],
    availableTexts: [
      { title: "माध्यन्दिना संहिता (वाजसनेयि)", desc: "४० अध्याय, ३०३ अनुवाक, १९७५ मंत्र (रुद्राध्याय, शिवसंकल्प, ईशावास्य)" },
      { title: "काण्व संहिता", desc: "४० अध्याय, ३२८ अनुवाक, २०८६ मंत्र" },
      { title: "तैत्तिरीय संहिता", desc: "७ काण्ड (अष्टक), ४४ प्रपाठक, ६५१ अनुवाक (श्री रुद्राध्याय नमकम्-चमकम्)" },
      { title: "शतपथ ब्राह्मण (माध्यन्दिना पाठ)", desc: "१४ काण्ड, १०० प्रपाठक, ४३८ ब्राह्मण (विशालतम वैदिक ब्राह्मण)" },
      { title: "शतपथ ब्राह्मण (काण्व पाठ)", desc: "१७ काण्ड, १०४ प्रपाठक" },
      { title: "काठक संहिता व मैत्रायणी संहिता", desc: "कठोपनिषद एवं मानव श्रौतसूत्र परंपरा" }
    ],
    rishis: ["याज्ञवल्क्य", "तित्तिरि", "वैशम्पायन", "कठ", "मैत्रेय", "कात्यायन", "पारस्कर", "बौधायन", "आपस्तम्ब"],
    devatas: ["रुद्र (शिव)", "अग्नि", "सविता", "प्रजापति", "वायु", "सोम", "इंद्र", "वरुण"],
    articles: [
      {
        id: "rudrabhisheka",
        title: "श्री रुद्राध्याय एवं रुद्राभिषेक विधान",
        desc: "यजुर्वेद तैत्तिरीय संहिता (४.५) एवं वाजसनेयि संहिता (अध्याय १६) का संपूर्ण शास्त्रीय विधान।",
        slug: "rudrabhisheka"
      },
      {
        id: "isha-upanishad",
        title: "ईशावास्योपनिषद् — यजुर्वेद ४०वाँ अध्याय",
        desc: "ईशावास्यमिदं सर्वं — त्यागपूर्वक भोग, निष्काम कर्म और आत्मतत्व का साक्षात्कार।",
        slug: "isha-upanishad"
      },
      {
        id: "shatapatha-brahmana",
        title: "शतपथ ब्राह्मण की महत्ता एवं संरचना",
        desc: "१४ काण्डों में विस्तृत यज्ञ, आख्यान (मत्स्य अवतार, पुरूरवा-उर्वशी) एवं बृहदारण्यक का उद्गम।",
        slug: "shatapatha-brahmana"
      }
    ],
    relatedGranthas: [
      { name: "वाजसनेयि माध्यन्दिना संहिता", type: "संहिता", author: "महर्षि याज्ञवल्क्य", slug: "shukla-yajurveda" },
      { name: "शतपथ ब्राह्मण", type: "ब्राह्मण", author: "याज्ञवल्क्य परंपरा", slug: "shatapatha-brahmana" },
      { name: "तैत्तिरीय संहिता", type: "संहिता", author: "ऋषि तित्तिरि", slug: "taittiriya-samhita" },
      { name: "तैत्तिरीय ब्राह्मण", type: "ब्राह्मण", author: "तित्तिरि परंपरा", slug: "taittiriya-brahmana" },
      { name: "तैत्तिरीय आरण्यक", type: "आरण्यक", author: "तित्तिरि परंपरा", slug: "taittiriya-aranyaka" },
      { name: "ईशावास्योपनिषद्", type: "उपनिषद", author: "प्रस्थानत्रयी", slug: "isha-upanishad" },
      { name: "बृहदारण्यकोपनिषद्", type: "उपनिषद", author: "प्रस्थानत्रयी", slug: "brihadaranyaka-upanishad" },
      { name: "कठोपनिषद्", type: "उपनिषद", author: "यम-नचिकेता संवाद", slug: "katha-upanishad" },
      { name: "तैत्तिरीयोपनिषद्", type: "उपनिषद", author: "प्रस्थानत्रयी", slug: "taittiriya-upanishad" },
      { name: "श्वेताश्वतरोपनिषद्", type: "उपनिषद", author: "महर्षि श्वेताश्वतर", slug: "shvetashvatara-upanishad" },
      { name: "बौधायन शुल्बसूत्र", type: "शुल्बसूत्र", author: "महर्षि बौधायन", slug: "baudhayana-sulbasutra" }
    ],
    relatedSubjects: [
      { name: "ऋग्वेद", slug: "rigveda", desc: "शाकल शाखा, १० मण्डल, १०२८ सूक्त" },
      { name: "सामवेद", slug: "samaveda", desc: "कौथुम, राणायनीय, जैमिनीय शाखा" },
      { name: "अथर्ववेद", slug: "atharvaveda", desc: "शौनक, पैप्पलाद शाखा" }
    ]
  },
  "veda/samaveda": {
    categorySlug: "veda",
    subjectSlug: "samaveda",
    name: "सामवेद",
    enName: "Samaveda",
    eyebrow: "VEDA → SAMAVEDA",
    intro: "सामवेद वैदिक गान, संगीत एवं आध्यात्मिक माधुर्य का दिव्य स्रोत है। भगवान श्रीकृष्ण ने गीता में स्वयं कहा है — 'वेदानां सामवेदोऽस्मि' (वेदों में मैं सामवेद हूँ)। इसमें कौथुम, राणायनीय और जैमिनीय तीन मुख्य शाखाएँ हैं।",
    quickInfo: {
      type: "Veda (सामगान श्रुति)",
      language: "Vedic Sanskrit & Musical Notation",
      content: "Samhita · 8-9 Brahmanas · Aranyaka · Chandogya & Kena · Sutras",
      explore: "Kauthuma · Ranayaniya · Jaiminiya (Talavakara)",
      mandalCount: "२ आर्चिक (पूर्वार्चिक व उत्तरार्चिक)",
      suktaCount: "१८७५ साम / छंद",
      mantraCount: "१५०४ ऋक्-आधारित • ९९ मौलिक",
      chiefPriest: "उद्गातृ (Udgatri)",
      chiefRishis: "जैमिनि, सुकर्मा, कौथुम, राणायन, उद्दालक आरुणि, सत्यकाम जाबाल"
    },
    navTabs: ["Overview", "3 Shakhas", "Unified Literature", "Brahmanas", "Upanishads", "Music & Svaras", "Articles"],
    overviewText: "सामवेद ऋचाओं का संगीतमय गायन (उद्गीथ) है। इसके प्रमुख तीन शाखा विभाग हैं: कौथुम शाखा (उत्तर-पश्चिम-पूर्व भारत), राणायनीय शाखा (महाराष्ट्र-कर्नाटक), और जैमिनीय/तवलकार शाखा (केरल-तमिलनाडु)। सामवेद के ८-९ ब्राह्मण हैं (ताण्ड्य, षड्विंश, सामविधान, आर्षेय, देवताध्याय, छांदोग्य, संहितोपनिषद, वंश, जैमिनीय), और इसके अंतर्गत छान्दोग्योपनिषद् ('तत्त्वमसि') एवं केनोपनिषद् ('केनेषितं पतति...') जैसे अत्यंत महत्वपूर्ण उपनिषद आते हैं।",
    structureCards: [
      { num: "३ मुख्य शाखाएँ", title: "कौथुम, राणायनीय, जैमिनीय", desc: "उत्तर, पश्चिम, दक्षिण व पूर्व भारत की जीवंत सामगान परंपराएँ" },
      { num: "१८७५ साम", title: "पूर्वार्चिक व उत्तरार्चिक", desc: "पूर्वार्चिक (५८५ साम) एवं उत्तरार्चिक (१२२५ साम) — ग्रामगेय व अरण्यगेय गान" },
      { num: "८-९ ब्राह्मण व २ उपनिषद", title: "ताण्ड्य, छांदोग्य व केन", desc: "ताण्ड्य महाब्राह्मण, षड्विंश, छान्दोग्य उपनिषद ('तत्त्वमसि') और केनोपनिषद्" }
    ],
    availableTexts: [
      { title: "सामवेद संहिता (पूर्वार्चिक)", desc: "६ प्रपाठक (आग्नेय, ऐन्द्र, पवमान, आरण्य पर्व - ५८५ छंद)" },
      { title: "सामवेद संहिता (उत्तरार्चिक)", desc: "९ प्रपाठक, २१ अध्याय (१२२५ मंत्र)" },
      { title: "ताण्ड्य महाब्राह्मण (पञ्चविंश)", desc: "२५ अध्याय (व्रात्यस्तोम एवं सोमयाग विधान)", slug: "tandya-mahabrahmana" },
      { title: "छान्दोग्य उपनिषद", desc: "८ प्रपाठक — ॐकार उद्गीथ, शाण्डिल्य विद्या, तत्त्वमसि, सनत्कुमार-नारद संवाद", slug: "chandogya-upanishad" },
      { title: "केन उपनिषद (तवलकार उपनिषद)", desc: "४ खण्ड — यक्ष उपाख्यान एवं ब्रह्मचेतना", slug: "kena-upanishad" }
    ],
    rishis: ["जैमिनि", "सुकर्मा", "कौथुम", "राणायन", "उद्दालक आरुणि", "श्वेतकेतु", "सत्यकाम जाबाल", "सनत्कुमार"],
    devatas: ["सोम", "अग्नि", "इंद्र", "सविता", "वायु", "प्रजापति"],
    articles: [
      {
        id: "chandogya-upanishad",
        title: "छान्दोग्य उपनिषद का तात्विक रहस्य",
        desc: "ॐकार उद्गीथ, तत्त्वमसि महावाक्य और शाण्डिल्य विद्या ('सर्वं खल्विदं ब्रह्म')।",
        slug: "chandogya-upanishad"
      },
      {
        id: "kena-upanishad",
        title: "केनोपनिषद् — 'केनेषितं पतति प्रेषितं मनः'",
        desc: "तवलकार आरण्यक का चतुर्थ अध्याय — यक्ष उपाख्यान और उमा हैमवती संवाद।",
        slug: "kena-upanishad"
      },
      {
        id: "tandya-mahabrahmana",
        title: "ताण्ड्य महाब्राह्मण (पञ्चविंश ब्राह्मण)",
        desc: "२५ प्रपाठकों में विस्तृत व्रात्यस्तोम एवं सोमयाग साम-गान विधान।",
        slug: "tandya-mahabrahmana"
      }
    ],
    relatedGranthas: [
      { name: "ताण्ड्य महाब्राह्मण", type: "ब्राह्मण", author: "वैदिक परंपरा", slug: "tandya-mahabrahmana" },
      { name: "छान्दोग्य उपनिषद", type: "उपनिषद", author: "प्रस्थानत्रयी ('तत्त्वमसि')", slug: "chandogya-upanishad" },
      { name: "केनोपनिषद्", type: "उपनिषद", author: "प्रस्थानत्रयी", slug: "kena-upanishad" }
    ],
    relatedSubjects: [
      { name: "ऋग्वेद", slug: "rigveda", desc: "मूल मंत्र एवं सूक्त संग्रह" },
      { name: "यजुर्वेद", slug: "yajurveda", desc: "यज्ञ एवं कर्मकाण्ड परंपरा" },
      { name: "अथर्ववेद", slug: "atharvaveda", desc: "जीवन विद्या व राष्ट्र सूक्त" }
    ]
  },
  "veda/atharvaveda": {
    categorySlug: "veda",
    subjectSlug: "atharvaveda",
    name: "अथर्ववेद",
    enName: "Atharvaveda",
    eyebrow: "VEDA → ATHARVAVEDA",
    intro: "अथर्ववेद जीवन, समाज, राष्ट्र, भैषज्य (आयुर्वेद), विज्ञान एवं ब्रह्मविद्या का महावेद है। महर्षि अथर्वा और अंगिरा द्वारा साक्षात्कृत इस वेद के दो मुख्य उपलब्ध विभाग हैं — शौनक शाखा एवं पैप्पलाद शाखा।",
    quickInfo: {
      type: "Veda (ब्रह्मवेद / भैषज्य श्रुति)",
      language: "Vedic Sanskrit",
      content: "Shaunaka & Paippalada · Gopatha · Mundaka · Mandukya · Prashna · Sutras",
      explore: "Shaunaka Shakha · Paippalada Shakha",
      mandalCount: "२० काण्ड",
      suktaCount: "७३० सूक्त",
      mantraCount: "५,९७७ मंत्र",
      chiefPriest: "ब्रह्मा (Brahma - सर्वयज्ञ निरीक्षक)",
      chiefRishis: "अथर्वा, अंगिरा, भृगु, पिप्पलाद, शौनक, कौशिक"
    },
    navTabs: ["Overview", "Shaunaka Shakha", "Paippalada Shakha", "Prithvi Sukta", "Brahmanas", "Upanishads", "Articles"],
    overviewText: "अथर्ववेद को 'ब्रह्मवेद' भी कहा जाता है क्योंकि इसका मुख्य ऋत्विक 'ब्रह्मा' होता है, जो संपूर्ण यज्ञ की देखरेख करता है। शौनक शाखा में २० काण्ड, ७३० सूक्त और ५९७७ मंत्र हैं। इसमें प्रसिद्ध पृथ्वी सूक्त (भूमि सूक्त १२.१ - 'माता भूमिः पुत्रोऽहं पृथिव्याः'), गोपथ ब्राह्मण, तथा मुण्डक उपनिषद ('सत्यमेव जयते'), माण्डूक्य उपनिषद ('अयमात्मा ब्रह्म'), और प्रश्न उपनिषद जैसे विश्वप्रसिद्ध दार्शनिक ग्रंथ समाहित हैं।",
    structureCards: [
      { num: "शौनक शाखा", title: "२० काण्ड • ७३० सूक्त", desc: "५,९७७ मंत्र — पृथ्वी सूक्त, भैषज्य सूक्त, ब्रह्मचर्य सूक्त, काल सूक्त" },
      { num: "गोपथ ब्राह्मण", title: "पूर्व व उत्तर गोपथ", desc: "अथर्ववेद का एकमात्र उपलब्ध ब्राह्मण ग्रंथ — ब्रह्मा ऋत्विक के कर्तव्य व यज्ञ विधान" },
      { num: "३ प्रमुख उपनिषद", title: "मुण्डक, माण्डूक्य, प्रश्न", desc: "'सत्यमेव जयते' (मुण्डक), 'अयमात्मा ब्रह्म' (माण्डूक्य), पिप्पलाद संवाद (प्रश्न)" }
    ],
    availableTexts: [
      { title: "शौनक संहिता (काण्ड १ - २०)", desc: "२० काण्ड, ३४ प्रपाठक, १११ अनुवाक, ७३० सूक्त, ५,९७७ मंत्र" },
      { title: "पृथ्वी सूक्त (भूमि सूक्त १२.१)", desc: "६३ ऋचाएँ — पर्यावरण, मातृभूमि व राष्ट्रभक्ति का अमर सूक्त", slug: "prithvi-sukta" },
      { title: "गोपथ ब्राह्मण (पूर्व व उत्तर)", desc: "११ प्रपाठक (५ पूर्व + ६ उत्तर) — यज्ञ व ॐकार माहात्म्य", slug: "gopatha-brahmana" },
      { title: "मुण्डक उपनिषद", desc: "३ मुण्डक, ६ खण्ड — 'सत्यमेव जयते नानृतम्', परा-अपरा विद्या, द्वौ सुपर्णा", slug: "mundaka-upanishad" },
      { title: "माण्डूक्य उपनिषद", desc: "१२ मंत्र — ॐकार, जाग्रत-स्वप्न-सुषुप्ति-तुरीय, 'अयमात्मा ब्रह्म'", slug: "mandukya-upanishad" },
      { title: "प्रश्न उपनिषद", desc: "६ प्रश्न — महर्षि पिप्पलाद और ६ ऋषियों का आध्यात्मिक संवाद", slug: "prashna-upanishad" },
      { title: "कौशिक गृह्यसूत्र", desc: "शांतिक-पौष्टिक, भैषज्य एवं गृह्य संस्कार विधान", slug: "kaushika-sutra" },
      { title: "वैतान श्रौतसूत्र", desc: "अथर्ववेदीय श्रौत याग व ब्रह्मा ऋत्विक विधान", slug: "vaitana-shrautasutra" }
    ],
    rishis: ["अथर्वा", "अंगिरा", "भृगु", "पिप्पलाद", "शौनक", "कौशिक"],
    devatas: ["ब्रह्म", "वरुण", "अग्नि", "इंद्र", "काल", "स्कम्भ", "पृथ्वी माता", "रोहित"],
    articles: [
      {
        id: "prithvi-sukta",
        title: "पृथ्वी सूक्त (१२.१) — सनातन पर्यावरण व राष्ट्र दर्शन",
        desc: "'माता भूमिः पुत्रोऽहं पृथिव्याः' — अथर्ववेद के भूमि सूक्त का तात्विक एवं आधुनिक महत्व।",
        slug: "prithvi-sukta"
      },
      {
        id: "mundaka-upanishad",
        title: "मुण्डक उपनिषद — 'सत्यमेव जयते नानृतम्'",
        desc: "परा एवं अपरा विद्या, जीवात्मा-परमात्मा का सुपर्ण रूपक और मोक्ष मार्ग।",
        slug: "mundaka-upanishad"
      },
      {
        id: "mandukya-upanishad",
        title: "माण्डूक्योपनिषद् एवं ॐकार चेतना",
        desc: "जाग्रत, स्वप्न, सुषुप्ति और तुरीय अवस्था का ॐकार के अक्षरों द्वारा विश्लेषण।",
        slug: "mandukya-upanishad"
      },
      {
        id: "prashna-upanishad",
        title: "प्रश्नोपनिषद् — महर्षि पिप्पलाद संवाद",
        desc: "६ ऋषियों के सृष्टि, प्राण, रयि और षोडशकल पुरुष विषयक ६ दार्शनिक प्रश्न।",
        slug: "prashna-upanishad"
      }
    ],
    relatedGranthas: [
      { name: "गोपथ ब्राह्मण", type: "ब्राह्मण", author: "ऋषि गोपथ", slug: "gopatha-brahmana" },
      { name: "मुण्डक उपनिषद", type: "उपनिषद", author: "प्रस्थानत्रयी ('सत्यमेव जयते')", slug: "mundaka-upanishad" },
      { name: "माण्डूक्य उपनिषद", type: "उपनिषद", author: "प्रस्थानत्रयी ('अयमात्मा ब्रह्म')", slug: "mandukya-upanishad" },
      { name: "प्रश्न उपनिषद", type: "उपनिषद", author: "प्रस्थानत्रयी", slug: "prashna-upanishad" },
      { name: "कौशिक सूत्र", type: "गृह्यसूत्र", author: "महर्षि कौशिक", slug: "kaushika-sutra" },
      { name: "वैतान श्रौतसूत्र", type: "श्रौतसूत्र", author: "शौनक परंपरा", slug: "vaitana-shrautasutra" }
    ],
    relatedSubjects: [
      { name: "ऋग्वेद", slug: "rigveda", desc: "१० मण्डल, १०२८ सूक्त" },
      { name: "यजुर्वेद", slug: "yajurveda", desc: "शुक्ल व कृष्ण शाखा" },
      { name: "सामवेद", slug: "samaveda", desc: "सामगान व छान्दोग्य उपनिषद" }
    ]
  },
  "veda/shukla-yajurveda": {
    categorySlug: "veda",
    subjectSlug: "shukla-yajurveda",
    name: "शुक्ल यजुर्वेद (वाजसनेयि)",
    enName: "Shukla Yajurveda",
    eyebrow: "VEDA → YAJURVEDA → SHUKLA",
    intro: "शुक्ल यजुर्वेद वाजसनेयि परंपरा का विशुद्ध पद्य-मंत्र संग्रह है। इसमें माध्यन्दिना और काण्व दो शाखाएँ हैं, जिनके साथ शतपथ ब्राह्मण, ईशावास्योपनिषद्, बृहदारण्यकोपनिषद्, और पारस्कर गृह्यसूत्र आते हैं।",
    quickInfo: {
      type: "Veda Branch (शुक्ल श्रुति)",
      language: "Vedic Sanskrit",
      content: "Madhyandina · Kanva · Shatapatha · Isha & Brihadaranyaka · Paraskara",
      explore: "Madhyandina Samhita · Kanva Samhita · Shatapatha Brahmana",
      mandalCount: "४० अध्याय",
      suktaCount: "३०३ अनुवाक",
      mantraCount: "१९७५ मंत्र (माध्यन्दिन) • २०८६ (काण्व)",
      chiefPriest: "अध्वर्यु (याज्ञवल्क्य परंपरा)"
    },
    navTabs: ["Overview", "Madhyandina", "Kanva", "Shatapatha", "Upanishads", "Sutras"],
    overviewText: "शुक्ल यजुर्वेद की उत्पत्ति महर्षि याज्ञवल्क्य द्वारा सूर्यदेव की आराधना से हुई। इसमें कर्मकांडीय गद्य भाग पृथक कर शतपथ ब्राह्मण के रूप में रखा गया है और संहिता में केवल शुद्ध मंत्र हैं।",
    structureCards: [
      { num: "माध्यन्दिना शाखा", title: "४० अध्याय • १९७५ मंत्र", desc: "उत्तर भारत में सर्वाधिक पठित वाजसनेयि संहिता" },
      { num: "काण्व शाखा", title: "४० अध्याय • २०८६ मंत्र", desc: "दक्षिण व पूर्व भारत में प्रचलित परंपरा" },
      { num: "शतपथ ब्राह्मण", title: "१४ काण्ड (माध्यन्दिन) / १७ काण्ड (काण्व)", desc: "विशालतम ब्राह्मण एवं बृहदारण्यक का उद्गम" }
    ],
    availableTexts: [
      { title: "माध्यन्दिना वाजसनेयि संहिता", desc: "४० अध्याय — दर्शपूर्णमास, रुद्राध्याय, शिवसंकल्प, ईशावास्य" },
      { title: "काण्व वाजसनेयि संहिता", desc: "४० अध्याय — काण्व पाठ परंपरा" },
      { title: "शतपथ ब्राह्मण (१४ काण्ड)", desc: "यज्ञों का विशद निरूपण, आख्यान एवं अध्यात्म" },
      { title: "ईशावास्योपनिषद्", desc: "४०वाँ अध्याय — १८ मंत्र" },
      { title: "बृहदारण्यकोपनिषद्", desc: "शतपथ का १४वाँ काण्ड — 'अहं ब्रह्मास्मि'" },
      { title: "पारस्कर गृह्यसूत्र व कात्यायन श्रौतसूत्र", desc: "गृह्य संस्कार एवं वेदी निर्माण विधान" }
    ],
    rishis: ["याज्ञवल्क्य", "कात्यायन", "पारस्कर", "कण्व"],
    devatas: ["सूर्य", "रुद्र", "अग्नि", "प्रजापति"],
    articles: [
      { id: "isha-upanishad", title: "ईशावास्योपनिषद्", desc: "यजुर्वेद का ४०वाँ अध्याय", slug: "isha-upanishad" },
      { id: "shatapatha-brahmana", title: "शतपथ ब्राह्मण", desc: "१४ काण्डों का महाग्रंथ", slug: "shatapatha-brahmana" }
    ],
    relatedGranthas: [
      { name: "वाजसनेयि संहिता", type: "संहिता", author: "याज्ञवल्क्य", slug: "shakala-samhita" },
      { name: "शतपथ ब्राह्मण", type: "ब्राह्मण", author: "याज्ञवल्क्य", slug: "shatapatha-brahmana" },
      { name: "ईशावास्योपनिषद्", type: "उपनिषद", author: "प्रस्थानत्रयी", slug: "isha-upanishad" },
      { name: "बृहदारण्यकोपनिषद्", type: "उपनिषद", author: "प्रस्थानत्रयी", slug: "brihadaranyaka-upanishad" }
    ],
    relatedSubjects: [
      { name: "कृष्ण यजुर्वेद", slug: "krishna-yajurveda", desc: "तैत्तिरीय, मैत्रायणी, कठ शाखा" }
    ]
  },
  "veda/krishna-yajurveda": {
    categorySlug: "veda",
    subjectSlug: "krishna-yajurveda",
    name: "कृष्ण यजुर्वेद",
    enName: "Krishna Yajurveda",
    eyebrow: "VEDA → YAJURVEDA → KRISHNA",
    intro: "कृष्ण यजुर्वेद में मंत्रों के साथ-साथ उनके विनियोग और व्याख्यात्मक गद्य (ब्राह्मण अंश) मिश्रित रूप से सन्निहित हैं। इसकी प्रमुख शाखाएँ तैत्तिरीय, मैत्रायणी, कठ और कपिष्ठल हैं।",
    quickInfo: {
      type: "Veda Branch (कृष्ण श्रुति)",
      language: "Vedic Sanskrit",
      content: "Taittiriya · Maitrayani · Kathaka · Kapishthala · Baudhayana · Apastamba",
      explore: "Taittiriya Samhita · Kathopanishad · Taittiriya Aranyaka",
      mandalCount: "७ काण्ड (तैत्तिरीय)",
      suktaCount: "४४ प्रपाठक",
      mantraCount: "२,१९८ मंत्र",
      chiefPriest: "अध्वर्यु (तित्तिरि परंपरा)"
    },
    navTabs: ["Overview", "Taittiriya", "Maitrayani", "Kathaka", "Upanishads", "Sutras"],
    overviewText: "कृष्ण यजुर्वेद दक्षिण भारत में अत्यंत व्यापक रूप से प्रचलित है। इसकी तैत्तिरीय शाखा में श्री रुद्राध्याय (४.५), चमकम्, तैत्तिरीय ब्राह्मण, तैत्तिरीय आरण्यक और तैत्तिरीय उपनिषद सम्मिलित हैं। काठक शाखा से प्रसिद्ध कठोपनिषद (यम-नचिकेता संवाद) प्राप्त होता है।",
    structureCards: [
      { num: "तैत्तिरीय शाखा", title: "संहिता, ब्राह्मण, आरण्यक", desc: "श्री रुद्राध्याय, महानारायण उपनिषद, तैत्तिरीय उपनिषद" },
      { num: "मैत्रायणी शाखा", title: "४ काण्ड • मानव सूत्र", desc: "मैत्रायणी संहिता व मानव श्रौत-गृह्यसूत्र" },
      { num: "कठ शाखा", title: "काठक संहिता • कठोपनिषद", desc: "यम-नचिकेता संवाद एवं आत्मतत्व मीमांसा" }
    ],
    availableTexts: [
      { title: "तैत्तिरीय संहिता (७ काण्ड)", desc: "श्री रुद्राध्याय, चमकम्, अश्वमेध, राजसूय" },
      { title: "तैत्तिरीय ब्राह्मण (३ अष्टक)", desc: "नचिकेता उपाख्यान, नक्षत्र विद्या" },
      { title: "तैत्तिरीय आरण्यक (१० प्रपाठक)", desc: "अरुण प्रपाठक, पञ्चमहायज्ञ, महानारायण उपनिषद" },
      { title: "तैत्तिरीय उपनिषद", desc: "शिक्षावल्ली, ब्रह्मानन्दवल्ली, भृगुवल्ली — 'सत्यं वद धर्मं चर'" },
      { title: "कठोपनिषद", desc: "यम-नचिकेता संवाद — 'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत'" },
      { title: "बौधायन व आपस्तम्ब कल्पसूत्र", desc: "श्रौत, गृह्य, धर्म व शुल्ब सूत्र" }
    ],
    rishis: ["तित्तिरि", "कठ", "मैत्रेय", "बौधायन", "आपस्तम्ब", "सत्याषाढ़"],
    devatas: ["रुद्र", "अग्नि", "नारायण", "प्रजापति"],
    articles: [
      { id: "rudrabhisheka", title: "रुद्राभिषेक विधान", desc: "तैत्तिरीय संहिता रुद्राध्याय", slug: "rudrabhisheka" }
    ],
    relatedGranthas: [
      { name: "तैत्तिरीय संहिता", type: "संहिता", author: "तित्तिरि", slug: "taittiriya-samhita" },
      { name: "तैत्तिरीय उपनिषद", type: "उपनिषद", author: "प्रस्थानत्रयी", slug: "isha-upanishad" },
      { name: "कठोपनिषद", type: "उपनिषद", author: "यम-नचिकेता", slug: "isha-upanishad" }
    ],
    relatedSubjects: [
      { name: "शुक्ल यजुर्वेद", slug: "shukla-yajurveda", desc: "माध्यन्दिना व काण्व शाखा" }
    ]
  },
  "puja/shaiva": {
    categorySlug: "puja",
    subjectSlug: "shaiva",
    name: "शैव पूजन एवं रुद्राभिषेक",
    enName: "Shaiva Puja & Rudrabhisheka",
    eyebrow: "PUJA → SHAIVA TRADITION",
    intro: "शैव परंपरा में भगवान शिव के लिंग स्वरूप की उपासना, पञ्चामृत स्नान, रुद्राध्याय पाठ एवं एकादश द्रव्य अभिषेक का विशेष महात्म्य है।",
    quickInfo: {
      type: "Puja & Anushthana",
      language: "Sanskrit & Vedic",
      content: "Abhisheka · Mantras · Bilva Patra · Upachara",
      explore: "Vidhi · Articles · Sources",
      mandalCount: "११ अनुवाक",
      suktaCount: "रुद्राध्याय",
      mantraCount: "१६०+ मंत्र",
      chiefPriest: "शैव आचार्य / वैदिक विप्र"
    },
    articles: [
      {
        id: "rudrabhisheka",
        title: "रुद्राभिषेक संपूर्ण विधान",
        desc: "यजुर्वेद तैत्तिरीय संहिता अनुसार रुद्राभिषेक की शास्त्रोक्त विधि, अर्थ व स्रोत।",
        slug: "rudrabhisheka"
      }
    ],
    relatedGranthas: [
      { name: "कृष्ण यजुर्वेद तैत्तिरीय संहिता", type: "श्रुति", author: "वैदिक परंपरा", slug: "taittiriya-samhita" },
      { name: "शिव पुराण (विद्येश्वर संहिता)", type: "पुराण", author: "महर्षि वेदव्यास", slug: "rudrabhisheka" }
    ]
  },
  "veda/rudrabhisheka": {
    categorySlug: "veda",
    subjectSlug: "rudrabhisheka",
    name: "रुद्राभिषेक (श्री रुद्राध्याय)",
    enName: "Rudrabhisheka (Rudradhyaya)",
    eyebrow: "यजुर्वेद • श्री रुद्राध्याय एवं चमकम्",
    intro: "रुद्राभिषेक यजुर्वेद के अंतर्गत भगवान शिव (रुद्र) की उपासना का सर्वाधिक पावन एवं फलदायी वैदिक अनुष्ठान है। कृष्ण यजुर्वेद तैत्तिरीय संहिता (४.५) एवं शुक्ल यजुर्वेद (अध्याय १६) में श्री रुद्राध्याय का वर्णन है।",
    quickInfo: {
      type: "वैदिक सूक्त एवं अनुष्ठान",
      language: "वैदिक संस्कृत",
      chiefPriest: "अध्वर्यु (Adhvaryu)",
      mandalCount: "११ अनुवाक (नमकम्)",
      suktaCount: "११ अनुवाक (चमकम्)"
    },
    overviewText: "रुद्राभिषेक में पंचामृत, गंगाजल, भस्म, बिल्वपत्र एवं सुगंधित द्रव्यों से शिवलिंग का अभिषेक करते हुए 'नमकम्' और 'चमकम्' के मंत्रों का पाठ किया जाता है। 'नमकम्' में रुद्र देव के सर्वव्यापी एवं कल्याणकारी स्वरूप को नमन किया गया है, जबकि 'चमकम्' में सर्वविध समृद्धि एवं आत्मिक कल्याण की प्रार्थना की गई है।",
    structureCards: [
      {
        num: "११",
        title: "नमकम् अनुवाक",
        desc: "तैत्तिरीय संहिता ४.५ — रुद्र के सौम्य व उग्र रूपों की स्तुति व नमन।"
      },
      {
        num: "११",
        title: "चमकम् अनुवाक",
        desc: "तैत्तिरीय संहिता ४.७ — 'च मे' द्वारा ऐहिक व पारलौकिक प्रार्थना।"
      },
      {
        num: "५",
        title: "महाभिषेक द्रव्य",
        desc: "दुग्ध, दधि, घृत, मधु, शर्करा (पंचामृत) एवं गंगाजल।"
      }
    ],
    availableTexts: [
      {
        id: "rudradhyaya",
        title: "श्री रुद्राध्याय (नमकम्)",
        desc: "यजुर्वेद तैत्तिरीय संहिता ४.५ — ११ अनुवाक, 'नमस्ते रुद्र मन्यव'।"
      },
      {
        id: "chamakam",
        title: "श्री चमकम् पाठ",
        desc: "यजुर्वेद तैत्तिरीय संहिता ४.७ — ११ अनुवाक, 'अग्नाविष्णू सजोषसेमा'।"
      },
      {
        id: "mahamrityunjaya",
        title: "महामृत्युंजय मंत्र पाठ",
        desc: "ऋग्वेद ७.५९.१२ व यजुर्वेद ३.६० — 'त्र्यम्बकं यजामहे'।"
      }
    ],
    rishis: ["अत्रि", "भारद्वाज", "अगस्त्य", "वशिष्ठ"],
    devatas: ["रुद्र", "सदाशिव", "मृत्युंजय", "नीलकंठ"],
    articles: [
      {
        id: "rudrabhisheka-vidhi",
        title: "रुद्राभिषेक की शास्त्रीय विधि व नियम",
        desc: "षोडशोपचार, संकल्प, न्यास, अभिषेक एवं आरती का प्रामाणिक विधान।",
        slug: "rudrabhisheka"
      },
      {
        id: "rudra-sukta-arth",
        title: "श्री रुद्राध्याय का आध्यात्मिक भावार्थ",
        desc: "नमस्ते रुद्र मन्यव से लेकर महामृत्युंजय तक का तात्विक रहस्य।",
        slug: "rudra-sukta"
      }
    ],
    relatedGranthas: [
      { name: "यजुर्वेद तैत्तिरीय संहिता", type: "संहिता", author: "महर्षि याज्ञवल्क्य / वैशम्पायन परंपरा", slug: "taittiriya-samhita" },
      { name: "शुक्ल यजुर्वेद वाजसनेयि संहिता (अध्याय १६)", type: "संहिता", author: "महर्षि याज्ञवल्क्य", slug: "shakala-samhita" },
      { name: "शिव पुराण (विद्येश्वर संहिता)", type: "पुराण", author: "महर्षि वेदव्यास", slug: "rudrabhisheka" }
    ]
  },
  ...GRANTHA_SUBJECTS_DATA
};

// Article Detail Data for Page 4: /library/:category/:subject/:article
export const ARTICLES_DATA = {
  ...COMPREHENSIVE_ARTICLES_DATA
};

