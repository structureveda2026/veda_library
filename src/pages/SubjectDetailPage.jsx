import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Home,
  CheckCircle2,
  Layers,
  FileText,
  User,
  Sun,
  Flame,
  Volume2,
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import MantraModal from "../components/mantra/MantraModal.jsx";
import { getMantraById, ALL_VEDIC_MANTRAS } from "../data/vedicMantrasData.js";
import {
  SUBJECTS_DATA,
  CATEGORIES_DATA,
} from "../data/categoryTemplatesData.js";
import { VEDA_HIERARCHY_TREE } from "../data/vedaHierarchyTree.js";
import { ALL_CATEGORY_HIERARCHY_TREES } from "../data/granthaHierarchyTree.js";
import VedicLibraryService from "../services/vedicLibraryService.js";
import {
  getScriptureReaderData,
  ALL_SCRIPTURE_READER_LIBRARY as SCRIPTURE_READER_LIBRARY,
} from "../data/scriptures/index.js";
import bannerRigveda from "../assets/images/library/banners/banner-rigveda.jpg";
import bannerYajurveda from "../assets/images/library/banners/banner-yajurveda.jpg";
import bannerSamaveda from "../assets/images/library/banners/banner-samaveda.jpg";
import bannerAtharvaveda from "../assets/images/library/banners/banner-atharvaveda.jpg";
import bannerVedasHeritage from "../assets/images/library/banners/banner-vedas-heritage.jpg";
import bannerSanctum from "../assets/images/library/banners/banner-sanctum.png";
import bannerFireRitual from "../assets/images/library/banners/banner-fire-ritual.png";
import bannerKashiGhat from "../assets/images/library/banners/banner-kashi-ghat.png";
import bannerSacredDetails from "../assets/images/library/banners/banner-sacred-details.png";
import bannerAltar from "../assets/images/library/banners/banner-altar.png";
import bannerTempleHero from "../assets/images/library/banners/banner-temple-hero.jpg";
import rigvedaImg from "../assets/images/library/cards/card-rigveda.jpg";
import yajurvedaImg from "../assets/images/library/cards/card-yajurveda.jpg";
import samavedaImg from "../assets/images/library/cards/card-samaveda.jpg";
import atharvavedaImg from "../assets/images/library/cards/card-atharvaveda.jpg";
import cardSamhitaImg from "../assets/images/library/cards/card-samhita.jpg";
import cardShrautaImg from "../assets/images/library/cards/card-shrautasutra.jpg";
import cardGrihyaImg from "../assets/images/library/cards/card-grihyasutra.jpg";
import cardDharmasutraImg from "../assets/images/library/cards/card-dharmasutra.jpg";
import cardPratiImg from "../assets/images/library/cards/card-pratishakhya.jpg";
import cardBrahmanaImg from "../assets/images/library/cards/card-brahmana.jpg";
import cardAranyakaImg from "../assets/images/library/cards/card-aranyaka.jpg";
import cardUpanishadImg from "../assets/images/library/cards/card-upanishad.jpg";
import cardPujaImg from "../assets/images/library/cards/card-puja.jpg";
import cardYagyaImg from "../assets/images/library/cards/card-yagya-fire.jpg";
import cardGitaImg from "../assets/images/library/cards/card-gita.jpg";
import cardRamayanaImg from "../assets/images/library/cards/card-ramayana.jpg";
import cardMahabharataImg from "../assets/images/library/cards/card-mahabharata.jpg";
import cardPuranaImg from "../assets/images/library/cards/card-purana.jpg";
import cardAstrologyImg from "../assets/images/library/cards/card-astrology.jpg";
import cardVastuImg from "../assets/images/library/cards/card-vastu.jpg";
import cardSamskaraImg from "../assets/images/library/cards/card-samskara.jpg";

// Deities for authentic Suktas and Devatas
import deityShivaImg from "../assets/images/library/deities/deity-shiva.jpg";
import deitySaraswatiImg from "../assets/images/library/deities/deity-saraswati.jpg";
import deityBrahmaImg from "../assets/images/library/deities/deity-brahma.jpg";
import deityVishnuImg from "../assets/images/library/deities/deity-vishnu.jpg";
import deityTrimurtiImg from "../assets/images/library/deities/deity-trimurti.jpg";
import deity33DevasImg from "../assets/images/library/deities/deity-33-devas.jpg";
import deityLakshmiImg from "../assets/images/library/deities/deity-lakshmi.jpg";
import deityGaneshImg from "../assets/images/library/deities/deity-ganesh.jpg";
import deityDurgaImg from "../assets/images/library/deities/deity-durga.jpg";
import deityNavagrahaImg from "../assets/images/library/deities/deity-navagraha.jpg";
import deityDashavataraImg from "../assets/images/library/deities/deity-dashavatara.jpg";
import deityPanchayatanaImg from "../assets/images/library/deities/deity-panchayatana.jpg";

const CARD_IMAGES = {
  "card-rigveda.jpg": rigvedaImg,
  "card-yajurveda.jpg": yajurvedaImg,
  "card-samaveda.jpg": samavedaImg,
  "card-atharvaveda.jpg": atharvavedaImg,
  "card-samhita.jpg": cardSamhitaImg,
  "card-shrautasutra.jpg": cardShrautaImg,
  "card-grihyasutra.jpg": cardGrihyaImg,
  "card-dharmasutra.jpg": cardDharmasutraImg,
  "card-pratishakhya.jpg": cardPratiImg,
  "card-brahmana.jpg": cardBrahmanaImg,
  "card-aranyaka.jpg": cardAranyakaImg,
  "card-upanishad.jpg": cardUpanishadImg,
  "card-puja.jpg": cardPujaImg,
  "card-yagya-fire.jpg": cardYagyaImg,
  "card-gita.jpg": cardGitaImg,
  "card-ramayana.jpg": cardRamayanaImg,
  "card-mahabharata.jpg": cardMahabharataImg,
  "card-purana.jpg": cardPuranaImg,
  "card-astrology.jpg": cardAstrologyImg,
  "card-vastu.jpg": cardVastuImg,
  "card-samskara.jpg": cardSamskaraImg,
  // Deities
  "deity-shiva.jpg": deityShivaImg,
  "deity-saraswati.jpg": deitySaraswatiImg,
  "deity-brahma.jpg": deityBrahmaImg,
  "deity-vishnu.jpg": deityVishnuImg,
  "deity-trimurti.jpg": deityTrimurtiImg,
  "deity-33-devas.jpg": deity33DevasImg,
  "deity-lakshmi.jpg": deityLakshmiImg,
  "deity-ganesh.jpg": deityGaneshImg,
  "deity-durga.jpg": deityDurgaImg,
  "deity-navagraha.jpg": deityNavagrahaImg,
  "deity-dashavatara.jpg": deityDashavataraImg,
  "deity-panchayatana.jpg": deityPanchayatanaImg,
  // Granular Aliases for specific Shakhas, Granthas & Suktas
  "card-sukta-agni.jpg": cardYagyaImg,
  "card-sukta-gayatri.jpg": deitySaraswatiImg,
  "card-sukta-purusha.jpg": deityVishnuImg,
  "card-sukta-nasadiya.jpg": deityTrimurtiImg,
  "card-sukta-sangathan.jpg": cardSamhitaImg,
  "card-sukta-samgathan.jpg": cardSamhitaImg,
  "card-sukta-mrityunjaya.jpg": deityShivaImg,
  "card-sukta-rudra.jpg": deityShivaImg,
  "card-sukta-vak.jpg": deitySaraswatiImg,
  "card-sukta-hiranyagarbha.jpg": deityBrahmaImg,
  "card-sukta-prithvi.jpg": cardSamhitaImg,
  "card-shakala-shakha.jpg": rigvedaImg,
  "card-madhyandina-shakha.jpg": yajurvedaImg,
  "card-kanva-shakha.jpg": yajurvedaImg,
  "card-taittiriya-shakha.jpg": yajurvedaImg,
  "card-kauthuma-shakha.jpg": samavedaImg,
  "card-jaiminiya-shakha.jpg": samavedaImg,
  "card-shaunaka-shakha.jpg": atharvavedaImg,
  "card-paippalada-shakha.jpg": atharvavedaImg,
  "card-grantha-shatapatha.jpg": cardBrahmanaImg,
  "card-grantha-aitareya.jpg": cardBrahmanaImg,
  "card-grantha-chandogya.jpg": cardUpanishadImg,
  "card-grantha-brihadaranyaka.jpg": cardUpanishadImg,
  "card-grantha-isha.jpg": cardUpanishadImg,
  "card-grantha-katha.jpg": cardUpanishadImg,
  "card-grantha-mundaka.jpg": cardUpanishadImg,
  "card-grantha-mandukya.jpg": cardUpanishadImg,
  "card-sulbasutra.jpg": cardShrautaImg,
  "card-shiksha.jpg": cardPratiImg,
  "card-kalpa.jpg": cardShrautaImg,
  "card-vyakarana.jpg": cardSamhitaImg,
  "card-nirukta.jpg": cardSamhitaImg,
  "card-chhanda.jpg": cardPratiImg,
  "card-jyotisha.jpg": cardAstrologyImg,
};

function resolveCardImage(imageKey, textName = "", badge = "") {
  if (imageKey && CARD_IMAGES[imageKey]) {
    return CARD_IMAGES[imageKey];
  }
  const combined = `${textName} ${badge}`.toLowerCase();
  if (combined.includes("संहिता") || combined.includes("samhita"))
    return cardSamhitaImg;
  if (combined.includes("ब्राह्मण") || combined.includes("brahmana"))
    return cardBrahmanaImg;
  if (combined.includes("आरण्यक") || combined.includes("aranyaka"))
    return cardAranyakaImg;
  if (combined.includes("उपनिषद") || combined.includes("upanishad"))
    return cardUpanishadImg;
  if (combined.includes("श्रौत") || combined.includes("shrauta"))
    return cardShrautaImg;
  if (combined.includes("गृह्य") || combined.includes("grihya"))
    return cardGrihyaImg;
  if (
    combined.includes("धर्म") ||
    combined.includes("dharma") ||
    combined.includes("स्मृति")
  )
    return cardDharmasutraImg;
  if (
    combined.includes("प्रातिशाख्य") ||
    combined.includes("pratishakhya") ||
    combined.includes("शिक्षा")
  )
    return cardPratiImg;
  if (
    combined.includes("रुद्र") ||
    combined.includes("शिव") ||
    combined.includes("मृत्युंजय")
  )
    return deityShivaImg;
  if (
    combined.includes("गायत्री") ||
    combined.includes("सरस्वती") ||
    combined.includes("वाक्")
  )
    return deitySaraswatiImg;
  if (combined.includes("पुरुष") || combined.includes("विष्णु"))
    return deityVishnuImg;
  if (
    combined.includes("अग्नि") ||
    combined.includes("हवन") ||
    combined.includes("यज्ञ")
  )
    return cardYagyaImg;
  if (combined.includes("पूजा") || combined.includes("उपचार"))
    return cardPujaImg;
  if (combined.includes("ज्योतिष") || combined.includes("ग्रह"))
    return cardAstrologyImg;
  if (combined.includes("संस्कार")) return cardSamskaraImg;
  return cardSamhitaImg;
}

const SUBJECT_BANNERS = {
  // Vedas
  rigveda: bannerRigveda,
  yajurveda: bannerYajurveda,
  samaveda: bannerSamaveda,
  atharvaveda: bannerAtharvaveda,
  "shukla-yajurveda": bannerYajurveda,
  "krishna-yajurveda": bannerYajurveda,

  // Deities & Mantra-Stotra subcategories
  shiva: deityShivaImg,
  shaiva: deityShivaImg,
  rudrabhisheka: deityShivaImg,
  vishnu: deityVishnuImg,
  devi: deityDurgaImg,
  durga: deityDurgaImg,
  lakshmi: deityLakshmiImg,
  gayatri: deitySaraswatiImg,
  saraswati: deitySaraswatiImg,
  ganesh: deityGaneshImg,
  surya: bannerTempleHero,
  navagraha: deityNavagrahaImg,
  graha: deityNavagrahaImg,
  panchayatana: deityPanchayatanaImg,
  "33-devas": deity33DevasImg,
  brahma: deityBrahmaImg,
  dashavatara: deityDashavataraImg,
  trimurti: deityTrimurtiImg,

  // Puja & Rituals
  shodashopachara: bannerFireRitual,
  agnihotra: bannerFireRitual,
  samskaras: cardSamskaraImg,
  upanayana: cardSamskaraImg,

  // Vedangas
  shiksha: cardPratiImg,
  vyakarana: cardSamhitaImg,
  kalpa: cardShrautaImg,
  chandas: cardPratiImg,
  jyotisha: cardAstrologyImg,

  // All 18 Mahapuranas
  "vishnu-purana": deityVishnuImg,
  "shrimad-bhagavata": deityVishnuImg,
  "bhagavata-purana": deityVishnuImg,
  "shiva-purana": deityShivaImg,
  "markandeya-purana": bannerFireRitual,
  "skanda-purana": bannerKashiGhat,
  "garuda-purana": bannerSacredDetails,
  "brahma-purana": deityBrahmaImg,
  "padma-purana": bannerVedasHeritage,
  "brahmanda-purana": bannerSacredDetails,
  "brahmavaivarta-purana": deityVishnuImg,
  "agni-purana": bannerFireRitual,
  "bhavishya-purana": bannerTempleHero,
  "varaha-purana": deityDashavataraImg,
  "vamana-purana": deityDashavataraImg,
  "kurma-purana": deityDashavataraImg,
  "matsya-purana": deityDashavataraImg,
  "linga-purana": deityShivaImg,
  "narada-purana": bannerSacredDetails,

  // Itihasa
  "valmiki-ramayana": cardRamayanaImg,
  mahabharata: cardMahabharataImg,
  "bhagavad-gita": cardGitaImg,

  // All 11 Principal Upanishads
  "isha-upanishad": cardUpanishadImg,
  "kena-upanishad": cardUpanishadImg,
  "katha-upanishad": cardUpanishadImg,
  "prashna-upanishad": cardUpanishadImg,
  "mundaka-upanishad": cardUpanishadImg,
  "mandukya-upanishad": cardUpanishadImg,
  "taittiriya-upanishad": cardUpanishadImg,
  "aitareya-upanishad": cardUpanishadImg,
  "chandogya-upanishad": cardUpanishadImg,
  "brihadaranyaka-upanishad": cardUpanishadImg,
  "shvetashvatara-upanishad": cardUpanishadImg,
  // Other Upanishads
  "kaushitaki-upanishad": cardUpanishadImg,
  "maitrayaniya-upanishad": cardUpanishadImg,
  "kaivalya-upanishad": cardUpanishadImg,
  "jabala-upanishad": cardUpanishadImg,
  "mahanarayana-upanishad": cardUpanishadImg,

  // Darshana
  yoga: cardUpanishadImg,
  samkhya: cardUpanishadImg,
  nyaya: cardUpanishadImg,
  vaisheshika: bannerSacredDetails,
  mimamsa: bannerFireRitual,
  vedanta: cardUpanishadImg,
};

function resolveSubjectBanner(subject = "", category = "", subjectData = null) {
  const s = (subject || "").toLowerCase();
  const c = (category || "").toLowerCase();
  const name = `${subjectData?.name || ""} ${subjectData?.enName || ""} ${subjectData?.eyebrow || ""}`.toLowerCase();
  const combined = `${s} ${c} ${name}`;

  // 1. Direct key match in SUBJECT_BANNERS
  if (SUBJECT_BANNERS[s]) {
    return SUBJECT_BANNERS[s];
  }

  // 2. Shiva deity detection
  if (
    combined.includes("shiva") ||
    combined.includes("शिव") ||
    combined.includes("rudra") ||
    combined.includes("रुद्र") ||
    combined.includes("linga") ||
    combined.includes("लिङ्ग") ||
    combined.includes("mahakaal") ||
    combined.includes("tryambak") ||
    combined.includes("shaiva") ||
    combined.includes("शैव")
  ) {
    return deityShivaImg;
  }

  // 3. Vishnu & avatars
  if (
    combined.includes("vishnu") ||
    combined.includes("विष्णु") ||
    combined.includes("narayan") ||
    combined.includes("नारायण") ||
    combined.includes("bhagavata") ||
    combined.includes("भागवत") ||
    combined.includes("purusha") ||
    combined.includes("पुरुष") ||
    combined.includes("krishna") ||
    combined.includes("कृष्ण")
  ) {
    return deityVishnuImg;
  }

  // 4. Devi / Durga / Shakti
  if (
    combined.includes("durga") ||
    combined.includes("दुर्गा") ||
    combined.includes("devi") ||
    combined.includes("देवी") ||
    combined.includes("shakti") ||
    combined.includes("शक्ति") ||
    combined.includes("saptashati")
  ) {
    return deityDurgaImg;
  }

  // 5. Lakshmi / Sri Sukta
  if (
    combined.includes("lakshmi") ||
    combined.includes("लक्ष्मी") ||
    combined.includes("sri sukta") ||
    combined.includes("kanakadhara")
  ) {
    return deityLakshmiImg;
  }

  // 6. Gayatri & Saraswati
  if (
    combined.includes("gayatri") ||
    combined.includes("गायत्री") ||
    combined.includes("saraswati") ||
    combined.includes("सरस्वती") ||
    combined.includes("vak") ||
    combined.includes("वाक्")
  ) {
    return deitySaraswatiImg;
  }

  // 7. Ganesha
  if (
    combined.includes("ganesh") ||
    combined.includes("गणेश") ||
    combined.includes("vinayaka") ||
    combined.includes("विनायक")
  ) {
    return deityGaneshImg;
  }

  // 8. Surya / Aditya
  if (
    combined.includes("surya") ||
    combined.includes("सूर्य") ||
    combined.includes("aditya") ||
    combined.includes("आदित्य") ||
    combined.includes("bhaskar") ||
    combined.includes("रवि")
  ) {
    return bannerTempleHero;
  }

  // 9. Navagraha / Astrology
  if (
    combined.includes("navagraha") ||
    combined.includes("नवग्रह") ||
    combined.includes("graha") ||
    combined.includes("ज्योतिष") ||
    combined.includes("jyotisha")
  ) {
    return deityNavagrahaImg;
  }

  // 10. Ramayana & Mahabharata & Gita
  if (combined.includes("ramayana") || combined.includes("रामायण") || combined.includes("rama")) {
    return cardRamayanaImg;
  }
  if (combined.includes("gita") || combined.includes("गीता")) {
    return cardGitaImg;
  }
  if (combined.includes("mahabharata") || combined.includes("महाभारत")) {
    return cardMahabharataImg;
  }

  // 11. Upanishad & Vedanta
  if (combined.includes("upanishad") || combined.includes("उपनिषद") || combined.includes("vedanta")) {
    return cardUpanishadImg;
  }

  // 12. Purana
  if (combined.includes("purana") || combined.includes("पुराण")) {
    return cardPuranaImg;
  }

  // 13. Category Fallbacks
  if (c === "mantra-stotra") return bannerAltar;
  if (c === "veda") return bannerVedasHeritage;
  if (c === "puja" || c === "yagya-sanskar" || c === "samskara") return bannerFireRitual;
  if (c === "upanishad" || c === "darshana") return cardUpanishadImg;
  if (c === "jyotisha") return cardAstrologyImg;
  if (c === "vastu") return cardVastuImg;

  return bannerSanctum;
}

// SCRIPTURE_READER_LIBRARY is imported from ../data/scriptures/index.js

const KNOWN_SUBJECTS_METADATA = {
  // 11 Upanishads
  "kena-upanishad": {
    name: "केनोपनिषद्",
    enName: "Kena Upanishad",
    eyebrow: "उपनिषद • सामवेद तलवकार / जैमिनीय शाखा",
    intro:
      "केनोपनिषद् सामवेद के तलवकार (जैमिनीय) ब्राह्मण का नवम प्रपाठक है। 'केनेषितं पतति प्रेषितं मनः' — किसके द्वारा प्रेरित होकर मन अपने विषयों की ओर दौड़ता है? इसमें यक्ष उपाख्यान और ब्रह्म की सर्वशक्तिमत्ता का प्रतिपादन है।",
    quickInfo: {
      type: "प्रधान उपनिषद (दशोपनिषद)",
      language: "वैदिक संस्कृत",
      chiefPriest: "उद्गातृ (Udgatri)",
      mandalCount: "४ खंड",
      suktaCount: "३४ मंत्र",
      chiefRishis: "तलवकार ऋषि, उमा हैमवती",
    },
    overviewText:
      "केनोपनिषद् में इंद्रियों और मन के प्रेरक परब्रह्म की जिज्ञासा से प्रारंभ होता है। 'श्रोत्रस्य श्रोत्रं मनसो मनो यद् वाचो ह वाचं स उ प्राणस्य प्राणः' — जो कानों का कान, मन का मन, वाणी की वाणी और प्राणों का प्राण है, वही ब्रह्म है। इसमें देवताओं के अहंकार को नष्ट करने वाला प्रसिद्ध यक्ष उपाख्यान भी वर्णित है।",
  },
  "prashna-upanishad": {
    name: "प्रश्नोपनिषद्",
    enName: "Prashna Upanishad",
    eyebrow: "उपनिषद • अथर्ववेद पिप्पलाद शाखा",
    intro:
      "प्रश्नोपनिषद् अथर्ववेद की पिप्पलाद शाखा का प्रमुख उपनिषद है। इसमें छह ऋषि-पुत्र महर्षि पिप्पलाद के पास जाकर सृष्टि, प्राण, मन, चेतना और ॐकार से संबंधित छह गहन प्रश्न पूछते हैं।",
    quickInfo: {
      type: "प्रधान उपनिषद (दशोपनिषद)",
      language: "वैदिक संस्कृत",
      chiefPriest: "ब्रह्मा (Brahma)",
      mandalCount: "६ प्रश्न",
      suktaCount: "६७ मंत्र",
      chiefRishis: "महर्षि पिप्पलाद",
    },
    overviewText:
      "प्रश्नोपनिषद् में छह जिज्ञासु — कबन्धी, भार्गव, कौसल्य, सौर्यायणि, सत्यकाम और सुकेशा — महर्षि पिप्पलाद से एक-एक प्रश्न पूछते हैं। इसमें प्राण और रयि द्वारा सृष्टि की उत्पत्ति, पंच प्राणों का शरीर में कार्य, स्वप्न व सुषुप्ति अवस्था, ॐकार उपासना का फल और षोडश कलाओं वाले पुरुष का निरूपण है।",
  },
  "taittiriya-upanishad": {
    name: "तैत्तिरीयोपनिषद्",
    enName: "Taittiriya Upanishad",
    eyebrow: "उपनिषद • कृष्ण यजुर्वेद तैत्तिरीय शाखा",
    intro:
      "तैत्तिरीयोपनिषद् कृष्ण यजुर्वेद की तैत्तिरीय शाखा का भाग है। इसमें शिक्षावल्ली (सत्यं वद धर्मं चर), ब्रह्मानन्दवल्ली (सत्यं ज्ञानमनन्तं ब्रह्म व पञ्चकोश विवेक) और भृगुवल्ली (अन्नं ब्रह्मेति व्यजानात्) सम्मिलित हैं।",
    quickInfo: {
      type: "प्रधान उपनिषद (दशोपनिषद)",
      language: "वैदिक संस्कृत",
      chiefPriest: "अध्वर्यु (Adhvaryu)",
      mandalCount: "३ वल्ली",
      suktaCount: "३१ अनुवाक",
      chiefRishis: "वरुण, भृगु, त्रिशंकु",
    },
    overviewText:
      "तैत्तिरीयोपनिषद् सनातन आचार-शास्त्र और ब्रह्मविद्या का अद्भुत संगम है। शिक्षावल्ली में प्राचीन दीक्षांत उपदेश (सत्य बोलो, धर्म का आचरण करो, स्वाध्याय में प्रमाद मत करो) है। ब्रह्मानन्दवल्ली में पञ्चकोश (अन्नमय, प्राणमय, मनोमय, विज्ञानमय, आनन्दमय) का विशद वर्णन है।",
  },
  "aitareya-upanishad": {
    name: "ऐतरेयोपनिषद्",
    enName: "Aitareya Upanishad",
    eyebrow: "उपनिषद • ऋग्वेद ऐतरेय आरण्यक",
    intro:
      "ऐतरेयोपनिषद् ऋग्वेद के ऐतरेय आरण्यक का भाग है। महर्षि महीदास ऐतरेय द्वारा साक्षात्कृत इस उपनिषद में सृष्टि रचना, आत्म-प्रवेश और ऋग्वेद का प्रसिद्ध महावाक्य 'प्रज्ञानं ब्रह्म' निहित है।",
    quickInfo: {
      type: "प्रधान उपनिषद (दशोपनिषद)",
      language: "वैदिक संस्कृत",
      chiefPriest: "होतृ (Hotri)",
      mandalCount: "३ अध्याय",
      suktaCount: "३३ मंत्र",
      chiefRishis: "महीदास ऐतरेय",
    },
    overviewText:
      "ऐतरेयोपनिषद् सृष्टि के प्रारंभ में केवल आत्मा के अस्तित्व से शुरू होता है: 'आत्मा वा इदमेक एवाग्र आसीन्नान्यत्किञ्चन मिषत्।' आत्मा ने लोकों, लोकपालों और मानव शरीर की रचना की और स्वयं उसमें ब्रह्मरंध्र से प्रवेश किया। तृतीय अध्याय में 'प्रज्ञानं ब्रह्म' महावाक्य की प्रतिष्ठा है।",
  },
  "shvetashvatara-upanishad": {
    name: "श्वेताश्वतरोपनिषद्",
    enName: "Shvetashvatara Upanishad",
    eyebrow: "उपनिषद • कृष्ण यजुर्वेद",
    intro:
      "श्वेताश्वतरोपनिषद् कृष्ण यजुर्वेद का अत्यंत महत्वपूर्ण उपनिषद है। इसमें ब्रह्म, जीव और माया (प्रकृति) के त्रिविध स्वरूप, ध्यान-योग की विधि और महेश्वर (रुद्र/शिव) के सगुण-निर्गुण रूप का अद्वितीय समन्वय है।",
    quickInfo: {
      type: "प्रधान उपनिषद (एकादश उपनिषद)",
      language: "वैदिक संस्कृत",
      chiefPriest: "अध्वर्यु (Adhvaryu)",
      mandalCount: "६ अध्याय",
      suktaCount: "११३ मंत्र",
      chiefRishis: "महर्षि श्वेताश्वतर",
    },
    overviewText:
      "श्वेताश्वतरोपनिषद् में ऋषि श्वेताश्वतर ब्रह्मवादियों की सभा में कारण-तत्व की मीमांसा करते हैं। इसमें अद्वैत वेदांत, सांख्य और योग का सुंदर समन्वय है। 'यस्य देवे परा भक्तिर्यथा देवे तथा गुरौ' — इस उपनिषद के अंतिम मंत्र में वैदिक साहित्य में सर्वप्रथम पराभक्ति का स्पष्ट उपदेश मिलता है।",
  },
  // Puranas
  "brahma-purana": {
    name: "ब्रह्म पुराण",
    enName: "Brahma Purana",
    eyebrow: "पुराण • आदि महापुराण",
    intro:
      "ब्रह्म पुराण को समस्त १८ महापुराणों में आदि पुराण माना जाता है। इसमें २४६ अध्याय और लगभग १०,००० श्लोक हैं। इसमें सृष्टि रचना, सूर्य उपासना और तीर्थों का विस्तार से वर्णन है।",
    quickInfo: {
      type: "आदि महापुराण (राजस)",
      language: "संस्कृत",
      chiefPriest: "व्यास परंपरा",
      mandalCount: "२४६ अध्याय",
      suktaCount: "१०,००० श्लोक",
      chiefRishis: "ब्रह्मा, व्यास, दक्ष",
    },
    overviewText:
      "ब्रह्म पुराण में पितामह ब्रह्मा द्वारा दक्ष प्रजापति को दिए गए उपदेशों का संकलन है। इसमें तीर्थ यात्रा, सदाचार, श्राद्ध कर्म और भगवान सूर्य तथा जगन्नाथ की महिमा का विशद आख्यान है।",
  },
  "padma-purana": {
    name: "पद्म पुराण",
    enName: "Padma Purana",
    eyebrow: "पुराण • द्वितीय विशालतम महापुराण",
    intro:
      "पद्म पुराण ५५,००० श्लोकों में संकलित अत्यंत विशाल एवं लोकप्रिय महापुराण है। यह पांच विशाल खंडों में विभक्त है। इसमें श्रीमद्भगवद्गीता महात्म्य और तीर्थ महिमा निहित है।",
    quickInfo: {
      type: "महापुराण (सात्विक)",
      language: "संस्कृत",
      chiefPriest: "व्यास परंपरा",
      mandalCount: "५ खंड",
      suktaCount: "५५,००० श्लोक",
      chiefRishis: "महर्षि वेदव्यास, सूत",
    },
    overviewText:
      "पद्म पुराण में कमल (पद्म) रूपी ब्रह्मांड का तात्विक विवेचन है। इसके उत्तर खंड में श्रीमद्भागवत महात्म्य, एकादशी व्रत कथाएँ और बदरिकाश्रम का वर्णन मिलता है।",
  },
  "brahmanda-purana": {
    name: "ब्रह्माण्ड पुराण",
    enName: "Brahmanda Purana",
    eyebrow: "पुराण • ब्रह्माण्ड सृष्टि विज्ञान",
    intro:
      "ब्रह्माण्ड पुराण में १२,००० श्लोक हैं। विश्वप्रसिद्ध श्री ललिता सहस्रनाम स्तोत्र और अध्यात्म रामायण इसी महापुराण के प्रसिद्ध अंश हैं।",
    quickInfo: {
      type: "महापुराण (राजस)",
      language: "संस्कृत",
      chiefPriest: "व्यास परंपरा",
      mandalCount: "३ भाग",
      suktaCount: "१२,००० श्लोक",
      chiefRishis: "अगस्त्य, हयग्रीव",
    },
    overviewText:
      "ब्रह्माण्ड पुराण में स्वर्ण अंड (हिरण्यगर्भ ब्रह्माण्ड) से सृष्टि रचना, भूगोल, खगोल और परशुराम चरित्र का अत्यंत प्रामाणिक और वैज्ञानिक विवरण मिलता है।",
  },
  "brahmavaivarta-purana": {
    name: "ब्रह्मवैवर्त पुराण",
    enName: "Brahmavaivarta Purana",
    eyebrow: "पुराण • राधा-कृष्ण लीलामृत",
    intro:
      "ब्रह्मवैवर्त पुराण में १८,००० श्लोक और चार खंड (ब्रह्म, प्रकृति, गणपति और श्रीकृष्ण जन्म खंड) हैं। इसमें श्री राधा-कृष्ण के गोलोक धाम का विशद वर्णन है।",
    quickInfo: {
      type: "महापुराण (राजस)",
      language: "संस्कृत",
      chiefPriest: "व्यास परंपरा",
      mandalCount: "४ खंड",
      suktaCount: "१८,००० श्लोक",
      chiefRishis: "नारायण, नारद",
    },
    overviewText:
      "ब्रह्मवैवर्त पुराण में ब्रह्म के विवर्त रूप में इस दृश्य जगत की व्याख्या है। गणपति खंड में गणेश जी के प्राकट्य और परशुराम-गणेश युद्ध की कथा प्रसिद्ध है।",
  },
  "agni-purana": {
    name: "अग्नि पुराण",
    enName: "Agni Purana",
    eyebrow: "पुराण • सनातन ज्ञान का विश्वकोश",
    intro:
      "अग्नि पुराण को पुराण साहित्य का एनसाइक्लोपीडिया माना जाता है। इसमें १५,४०० श्लोक और ३८३ अध्याय हैं। इसमें धनुर्वेद, आयुर्वेद, वास्तु, व्याकरण, ज्योतिष का अद्वितीय संकलन है।",
    quickInfo: {
      type: "महापुराण (राजस)",
      language: "संस्कृत",
      chiefPriest: "अग्नि देव",
      mandalCount: "३८३ अध्याय",
      suktaCount: "१५,४०० श्लोक",
      chiefRishis: "अग्नि, वसिष्ठ",
    },
    overviewText:
      "अग्नि देव द्वारा महर्षि वसिष्ठ को उपदिष्ट इस पुराण में धर्म, अर्थ, काम और मोक्ष के अतिरिक्त व्यावहारिक विज्ञानों का अमूल्य भंडार समाहित है।",
  },
  "bhavishya-purana": {
    name: "भविष्य पुराण",
    enName: "Bhavishya Purana",
    eyebrow: "पुराण • कालचक्र एवं भविष्य दर्शन",
    intro:
      "भविष्य पुराण में १४,५०० श्लोक और चार पर्व हैं। इसमें सूर्य उपासना, व्रत-त्योहार तथा प्रतिसर्ग पर्व में ऐतिहासिक व भावी घटनाओं का संकेत है।",
    quickInfo: {
      type: "महापुराण (राजस)",
      language: "संस्कृत",
      chiefPriest: "व्यास परंपरा",
      mandalCount: "४ पर्व",
      suktaCount: "१४,५०० श्लोक",
      chiefRishis: "सुमन्तु, शतानीक",
    },
    overviewText:
      "भविष्य पुराण में भगवान सूर्य के पूजन, मघा नक्षत्र और काल की गतियों का दार्शनिक निरूपण किया गया है।",
  },
  "varaha-purana": {
    name: "वराह पुराण",
    enName: "Varaha Purana",
    eyebrow: "पुराण • भगवान वराह उपदेश",
    intro:
      "वराह पुराण में १०,००० श्लोक और २१८ अध्याय हैं। भगवान श्रीहरि के वराह अवतार द्वारा पृथ्वी देवी के उद्धार और उन्हें दिए गए आध्यात्मिक उपदेशों का इसमें संकलन है।",
    quickInfo: {
      type: "महापुराण (सात्विक)",
      language: "संस्कृत",
      chiefPriest: "वराह भगवान",
      mandalCount: "२१८ अध्याय",
      suktaCount: "१०,००० श्लोक",
      chiefRishis: "वराह, धरणी",
    },
    overviewText:
      "वराह पुराण में मथुरा तीर्थ, गोवर्धन महिमा, श्राद्ध, दान और वैष्णव व्रतों का विस्तार से निरूपण किया गया है।",
  },
  "vamana-purana": {
    name: "वामन पुराण",
    enName: "Vamana Purana",
    eyebrow: "पुराण • वामन-बलि चरित्र",
    intro:
      "वामन पुराण में १०,००० श्लोक और ९५ अध्याय हैं। भगवान विष्णु के वामन अवतार, राजा बलि के यज्ञ और त्रिविक्रम स्वरूप का इसमें भव्य गान है।",
    quickInfo: {
      type: "महापुराण (राजस)",
      language: "संस्कृत",
      chiefPriest: "पुलस्त्य ऋषि",
      mandalCount: "९५ अध्याय",
      suktaCount: "१०,००० श्लोक",
      chiefRishis: "पुलस्त्य, नारद",
    },
    overviewText:
      "वामन पुराण में कुरुक्षेत्र, सरस्वती नदी और शिव-पार्वती विवाह प्रसंग का भी अत्यंत मनोहारी वर्णन प्राप्त होता है।",
  },
  "kurma-purana": {
    name: "कूर्म पुराण",
    enName: "Kurma Purana",
    eyebrow: "पुराण • ईश्वर गीता एवं ज्ञान",
    intro:
      "कूर्म पुराण में १७,००० श्लोक हैं। समुद्र मंथन के समय भगवान कच्छप (कूर्म) द्वारा दिए गए उपदेश तथा इसमें स्थित प्रसिद्ध 'ईश्वर गीता' अत्यंत महत्वपूर्ण है।",
    quickInfo: {
      type: "महापुराण (तामस / पाशुपत)",
      language: "संस्कृत",
      chiefPriest: "कूर्म अवतार",
      mandalCount: "२ भाग",
      suktaCount: "१७,००० श्लोक",
      chiefRishis: "इंद्रद्युम्न",
    },
    overviewText:
      "कूर्म पुराण में अद्वैत दर्शन, पाशुपत योग और ईश्वर गीता के माध्यम से भगवान शिव और विष्णु की तात्विक एकता का प्रतिपादन है।",
  },
  "matsya-purana": {
    name: "मत्स्य पुराण",
    enName: "Matsya Purana",
    eyebrow: "पुराण • प्रथम अवतार उपदेश",
    intro:
      "मत्स्य पुराण में १४,००० श्लोक और २९१ अध्याय हैं। प्रलय काल में भगवान मत्स्य द्वारा वैवस्वत मनु को दिए गए सृष्टि-विज्ञान, नौका यात्रा और राजधर्म का इसमें वर्णन है।",
    quickInfo: {
      type: "महापुराण (तामस)",
      language: "संस्कृत",
      chiefPriest: "मत्स्य भगवान",
      mandalCount: "२९१ अध्याय",
      suktaCount: "१४,००० श्लोक",
      chiefRishis: "मनु",
    },
    overviewText:
      "मत्स्य पुराण में वास्तु शास्त्र, मूर्ति कला, नगर निर्माण और नर्मदा परिक्रमा का प्राचीनतम प्रामाणिक विवरण उपलब्ध है।",
  },
  "linga-purana": {
    name: "लिंग पुराण",
    enName: "Linga Purana",
    eyebrow: "पुराण • ज्योतिर्लिंग व शैव दर्शन",
    intro:
      "लिंग पुराण में ११,००० श्लोक और १६३ अध्याय हैं। भगवान शिव के निराकार ज्योतिर्लिंग स्वरूप, लिंगोद्भव कथा, पंचाक्षर मंत्र और पाशुपत योग का इसमें वर्णन है।",
    quickInfo: {
      type: "महापुराण (तामस)",
      language: "संस्कृत",
      chiefPriest: "शैव परंपरा",
      mandalCount: "२ भाग",
      suktaCount: "११,००० श्लोक",
      chiefRishis: "सनत्कुमार, व्यास",
    },
    overviewText:
      "लिंग पुराण में भगवान ब्रह्मा और विष्णु के समक्ष ज्योतिर्मय स्तंभ के प्राकट्य और अष्टांग योग के गूढ़ रहस्यों का निरूपण है।",
  },
  "narada-purana": {
    name: "नारद पुराण",
    enName: "Narada Purana",
    eyebrow: "पुराण • वेदांग एवं व्रत महात्म्य",
    intro:
      "नारद पुराण में २५,००० श्लोक हैं। देवर्षि नारद और सनत्कुमारों के संवाद में समस्त छह वेदांगों और चारों वेदों का सार संक्षेप में निरूपित है।",
    quickInfo: {
      type: "महापुराण (सात्विक)",
      language: "संस्कृत",
      chiefPriest: "नारद मुनि",
      mandalCount: "२ भाग",
      suktaCount: "२५,००० श्लोक",
      chiefRishis: "नारद, सनत्कुमार",
    },
    overviewText:
      "नारद पुराण में अठारह महापुराणों की विषय-सूची और श्लोक संख्या का प्रामाणिक विवरण प्राप्त होता है।",
  },
};

function formatSlugToTitle(slug = "") {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ");
}

function generateDynamicSubjectData(category, subject) {
  // 1. Check if category has explicit subCategories in CATEGORIES_DATA
  const cat = CATEGORIES_DATA[category];
  const subCat = cat?.subCategories?.find(
    (sc) => (sc.slug || sc.id) === subject || (sc.slug || sc.id) === subject.toLowerCase(),
  );

  if (subCat) {
    return {
      categorySlug: category,
      subjectSlug: subject,
      name: subCat.name,
      enName: subCat.enName,
      eyebrow: `${cat.name || "वेद वांग्मय"} • ${subCat.enName}`,
      intro: subCat.desc || `${subCat.name} का प्रामाणिक एवं पावन संग्रह।`,
      overviewText: subCat.desc || `${subCat.name} (${subCat.enName}) सनातन वैदिक ज्ञान परंपरा का एक अत्यंत कल्याणकारी अंग है।`,
      quickInfo: {
        type: subCat.stats || "वैदिक मंत्र एवं स्तोत्र",
        language: "संस्कृत / हिन्दी",
        chiefPriest: subCat.priest || "प्रामाणिक वैदिक परंपरा",
        mandalCount: subCat.stats || "अध्याय / सूक्त",
        suktaCount: "संपूर्ण पाठ उपलब्ध",
        chiefRishis: "वैदिक ऋषि परंपरा",
      },
      structureCards: [
        { num: "१", title: "मूल पाठ", desc: `${subCat.name} का प्रामाणिक संस्करण` },
        { num: "२", title: "स्तोत्र व मंत्र", desc: "सस्वर उच्चारण एवं षडङ्ग विधान" },
        { num: "३", title: "साधना व फलश्रुति", desc: "जप विधि, मुहूर्त एवं कल्याणकारी प्रभाव" },
      ],
      availableTexts: [
        {
          title: `${subCat.name} — प्रामाणिक पाठ संग्रह`,
          desc: "सस्वर पाठ, जप विधि एवं अर्थ",
          slug: "mula-patha",
        },
      ],
      relatedGranthas: [],
    };
  }

  const known = KNOWN_SUBJECTS_METADATA[subject];
  if (known) {
    return {
      categorySlug: category,
      subjectSlug: subject,
      name: known.name,
      enName: known.enName,
      eyebrow: known.eyebrow,
      intro: known.intro,
      overviewText: known.overviewText,
      quickInfo: known.quickInfo,
      structureCards: [
        { num: "१", title: "मूल पाठ", desc: `${known.name} का प्रामाणिक पाठ` },
        { num: "२", title: "अध्याय / खंड", desc: "क्रमबद्ध विषयवार विभाजन" },
        {
          num: "३",
          title: "भाष्य व संदर्भ",
          desc: "शास्त्रीय व्याख्यान एवं अर्थ",
        },
      ],
      availableTexts: [
        {
          title: `${known.name} — प्रामाणिक पाठ`,
          desc: "शुद्ध देवनागरी पाठ एवं व्याख्या",
          slug: "mula-patha",
        },
      ],
      relatedGranthas: [],
    };
  }

  const enTitle = formatSlugToTitle(subject);
  let devTitle = enTitle;
  if (subject.endsWith("-upanishad")) {
    const base = formatSlugToTitle(subject.replace("-upanishad", ""));
    devTitle = `${base} उपनिषद`;
  } else if (subject.endsWith("-purana")) {
    const base = formatSlugToTitle(subject.replace("-purana", ""));
    devTitle = `${base} पुराण`;
  }

  const categoryMeta = {
    upanishad: {
      eyebrow: "उपनिषद • वेदांत ज्ञानकांड",
      type: "प्रधान उपनिषद (ज्ञानकांड)",
      desc: `${enTitle} सनातन ज्ञान परंपरा का सर्वोच्च उपनिषद ग्रंथ है। आत्मा, ब्रह्म और मोक्ष का साक्षात्कार कराने वाला प्रामाणिक ज्ञान।`,
    },
    purana: {
      eyebrow: "पुराण • सनातन विश्वकोश",
      type: "महापुराण",
      desc: `${enTitle} सनातन धर्म के इतिहास, दर्शन, भक्ति और संस्कृति का अमर विश्वकोश है।`,
    },
    itihasa: {
      eyebrow: "इतिहास • धर्म एवं संस्कृति",
      type: "इतिहास ग्रंथ",
      desc: `${enTitle} भारतीय संस्कृति का अमर इतिहास एवं धर्मग्रंथ है।`,
    },
    darshana: {
      eyebrow: "दर्शन • षड्दर्शन परंपरा",
      type: "दर्शन शास्त्र",
      desc: `${enTitle} भारतीय षड्दर्शन परंपरा का आधारभूत दार्शनिक ग्रंथ है।`,
    },
    veda: {
      eyebrow: "वेद • मूल श्रुति ज्ञान",
      type: "Veda (श्रुति)",
      desc: `${enTitle} वैदिक ज्ञान परंपरा का प्रमुख ग्रंथ-संग्रह है।`,
    },
  };

  const meta = categoryMeta[category] || {
    eyebrow: "वैदिक वांग्मय",
    type: "शास्त्र ग्रंथ",
    desc: `${enTitle} सनातन ज्ञान परंपरा का प्रामाणिक ग्रंथ है।`,
  };

  return {
    categorySlug: category,
    subjectSlug: subject,
    name: devTitle,
    enName: enTitle,
    eyebrow: meta.eyebrow,
    intro: meta.desc,
    overviewText: `${enTitle} सनातन ज्ञान परंपरा का अत्यंत महत्वपूर्ण अंग है। Veda Library में इसके उपलब्ध पाठ, अध्याय, श्लोक, विषय और अध्ययन सामग्री को व्यवस्थित रूप से explore किया जा सकता है।`,
    quickInfo: {
      type: meta.type,
      language: "संस्कृत (Sanskrit)",
      chiefPriest: "प्रामाणिक परंपरा",
      mandalCount: "अध्याय / खंड",
      suktaCount: "श्लोक / मंत्र",
      chiefRishis: "प्रामाणिक ऋषि परंपरा",
    },
    structureCards: [
      { num: "१", title: "मूल पाठ", desc: `${enTitle} का प्रामाणिक संस्करण` },
      { num: "२", title: "अध्याय / खंड", desc: "क्रमबद्ध विषयवार विभाजन" },
      {
        num: "३",
        title: "भाष्य व संदर्भ",
        desc: "शास्त्रीय व्याख्यान एवं अर्थ",
      },
    ],
    availableTexts: [
      {
        title: `${enTitle} — प्रथम खंड / अध्याय`,
        desc: "प्रामाणिक संस्कृत पाठ एवं भावार्थ",
        slug: "adhyaya-1",
      },
    ],
    relatedGranthas: [],
  };
}

const SUBJECT_KEY_MANTRAS_MAP = {
  rigveda: [
    "rv-1-1-1",
    "rv-3-62-10",
    "rv-7-59-12",
    "rv-10-90-1",
    "rv-10-129-1",
    "rv-10-191-2",
  ],
  yajurveda: ["vs-1-1", "vs-16-1", "vs-34-1", "vs-36-17", "vs-40-1"],
  "shukla-yajurveda": ["vs-1-1", "vs-16-1", "vs-34-1", "vs-36-17", "vs-40-1"],
  "krishna-yajurveda": ["ts-1-1-1", "yj-kr-1-1"],
  samaveda: ["sv-1-1-1", "sv-1-1-2", "sv-1-2-1", "sv-ch-1-1"],
  atharvaveda: [
    "av-1-1-1",
    "av-12-1-1",
    "av-12-1-12",
    "av-19-9-1",
    "av-19-9-14",
  ],
  "kena-upanishad": ["up-kena-1"],
  "katha-upanishad": ["up-katha-1-3-14"],
  "mandukya-upanishad": ["up-mandukya-1"],
  "chandogya-upanishad": ["up-chandogya-6-8-7", "sv-ch-1-1"],
  "brihadaranyaka-upanishad": ["up-brihad-1-4-10"],
  "isha-upanishad": ["vs-40-1"],
  "taittiriya-upanishad": ["up-tait-1-11", "yj-kr-1-1"],
  "aitareya-upanishad": ["up-ait-3-1-3"],
  "bhagavad-gita": ["bg-2-47", "bg-4-7", "bg-18-66"],
  mahabharata: ["bg-2-47", "bg-4-7", "bg-18-66"],
  "valmiki-ramayana": ["vr-aditya-hridaya"],
  yoga: ["ys-1-1", "ys-1-2"],
  vedanta: ["bs-1-1-1", "up-brihad-1-4-10", "up-chandogya-6-8-7"],
  // Mantra-Stotra & Deity Subjects
  shiva: ["m-01", "m-03", "rv-7-59-12", "vs-16-1"],
  shaiva: ["m-01", "m-03", "vs-16-1", "rv-7-59-12"],
  rudrabhisheka: ["m-01", "vs-16-1", "rv-7-59-12"],
  vishnu: ["m-05", "m-07", "rv-10-90-1"],
  devi: ["m-04", "m-06", "m-08"],
  gayatri: ["m-02", "rv-3-62-10"],
  ganesh: ["m-09"],
  surya: ["m-10", "vr-aditya-hridaya"],
  hanuman: ["m-11"],
};

function collectMantraIdsFromNode(node, idSet) {
  if (!node) return;
  if (node.mantraId) idSet.add(node.mantraId);
  if (node.children && Array.isArray(node.children)) {
    node.children.forEach((c) => collectMantraIdsFromNode(c, idSet));
  }
}

function ScriptureReaderView({ scripture }) {
  const { isHindi } = useLanguage();
  const [selectedChapterId, setSelectedChapterId] = useState(
    scripture.chapters[0]?.id || "",
  );
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpTo, setJumpTo] = useState("");
  const [searchText, setSearchText] = useState("");

  const selectedChapter =
    scripture.chapters.find((chapter) => chapter.id === selectedChapterId) ||
    scripture.chapters[0];

  useEffect(() => {
    if (scripture?.chapters?.length > 0) {
      if (!scripture.chapters.some((c) => c.id === selectedChapterId)) {
        setSelectedChapterId(scripture.chapters[0].id);
      }
    }
  }, [scripture]);

  useEffect(() => {
    setCurrentPage(1);
    setJumpTo("");
  }, [selectedChapterId, pageSize]);

  const filteredItems = useMemo(() => {
    if (!selectedChapter) return [];
    if (!searchText.trim()) return selectedChapter.items;

    const q = searchText.trim().toLowerCase();
    return selectedChapter.items.filter((item) => {
      return (
        String(item.number).includes(q) ||
        (item.devanagari && item.devanagari.toLowerCase().includes(q)) ||
        (item.hinglish && item.hinglish.toLowerCase().includes(q)) ||
        (item.hindi && item.hindi.toLowerCase().includes(q)) ||
        (item.english && item.english.toLowerCase().includes(q)) ||
        (item.commentary && item.commentary.toLowerCase().includes(q))
      );
    });
  }, [selectedChapter, searchText]);

  const availableCount = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(availableCount / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const visibleItems = filteredItems.slice(startIndex, startIndex + pageSize);

  const pageNumberButtons = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const handleJump = () => {
    const value = Number(jumpTo);
    if (!Number.isFinite(value) || value < 1) return;

    // Check if the user entered a specific verse number in this chapter
    const itemIndex = filteredItems.findIndex(
      (item) => Number(item.number) === value,
    );
    if (itemIndex !== -1) {
      const targetPage = Math.floor(itemIndex / pageSize) + 1;
      setCurrentPage(targetPage);
      return;
    }

    // Otherwise navigate by page number
    const targetPage = Math.min(
      Math.max(1, value <= totalPages ? value : Math.ceil(value / pageSize)),
      totalPages,
    );
    setCurrentPage(targetPage);
  };

  const navigatePage = (direction) => {
    setCurrentPage((prev) =>
      Math.min(Math.max(1, prev + direction), totalPages),
    );
  };

  const isPaginated = totalPages > 1;
  const showPageSizeSelect = availableCount > 10;

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-5 md:p-6 shadow-2xs">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
            अध्याय / सूक्त
          </label>
          <select
            value={selectedChapterId}
            onChange={(e) => setSelectedChapterId(e.target.value)}
            className="rounded-xl border border-stone-200 bg-[#fffaf0] px-3 py-2 text-xs font-medium text-stone-700 focus:border-amber-400 outline-none"
          >
            {scripture.chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.title}
              </option>
            ))}
          </select>
          {scripture.chapters.length > 1 && (
            <button
              type="button"
              onClick={() =>
                setSelectedChapterId(scripture.chapters[0]?.id || "")
              }
              className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
            >
              प्रारंभिक अध्याय
            </button>
          )}
        </div>

        {showPageSizeSelect && (
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
              प्रति पृष्ठ श्लोक
            </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="rounded-xl border border-stone-200 bg-[#fffaf0] px-3 py-2 text-xs font-medium text-stone-700 focus:border-amber-400 outline-none"
            >
              <option value={10}>10 श्लोक प्रति पृष्ठ</option>
              <option value={20}>20 श्लोक प्रति पृष्ठ</option>
            </select>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/90 p-3.5 text-xs sm:text-sm text-amber-950 flex flex-col md:flex-row md:items-center justify-between gap-2.5 w-full">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <div>
              <span className="font-bold text-amber-900">पारंपरिक कुल परिमाण (Canon Total):</span>{" "}
              <span className="font-semibold text-stone-800">{scripture.sourceTotal}</span>
            </div>
            <span className="hidden md:inline text-amber-400">•</span>
            <div>
              <span className="font-bold text-amber-900">लाइब्रेरी में उपलब्ध:</span>{" "}
              <span className="font-bold text-amber-800">{availableCount} प्रामाणिक श्लोक</span>{" "}
              <span className="text-stone-600 text-xs font-normal">({selectedChapter?.title || "इस अध्याय में"})</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-amber-850 bg-amber-100/90 px-2.5 py-1 rounded-lg border border-amber-300">
              {isPaginated ? "क्रमबद्ध पृष्ठीय वाचन (Paginated)" : "सम्पूर्ण पाठांश (Single View)"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search within chapter..."
            className="w-full min-w-[180px] rounded-xl border border-stone-200 bg-[#fffaf0] px-3 py-2 text-xs focus:border-amber-400 outline-none"
          />
          {searchText && (
            <button
              type="button"
              onClick={() => setSearchText("")}
              className="rounded-xl border border-stone-200 bg-white px-2.5 py-2 text-xs font-bold text-stone-600 hover:bg-stone-50 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-stone-200 bg-[#fffaf0] p-3 text-xs text-stone-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="font-bold text-stone-700">
            {isPaginated ? "वर्तमान दृश्य:" : "प्रदर्शित पाठांश:"}
          </span>{" "}
          {filteredItems.length > 0
            ? isPaginated
              ? `${(safePage - 1) * pageSize + 1}–${Math.min(safePage * pageSize, filteredItems.length)} of ${filteredItems.length} श्लोक`
              : `कुल ${filteredItems.length} श्लोक (सम्पूर्ण पृष्ठ)`
            : "0 श्लोक"}
        </div>
        <div className="text-[11px] text-stone-500 italic">
          {scripture.editionNote}
        </div>
      </div>

      {isPaginated && (
        <>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => navigatePage(-1)}
                className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-bold text-stone-700 disabled:opacity-40 hover:bg-stone-50 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                {isHindi ? "पिछला" : "Previous"}
              </button>
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => navigatePage(1)}
                className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-bold text-stone-700 disabled:opacity-40 hover:bg-stone-50 cursor-pointer disabled:cursor-not-allowed"
              >
                {isHindi ? "अगला" : "Next"}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">
                {isHindi ? `पृष्ठ ${safePage} / ${totalPages}` : `Page ${safePage} / ${totalPages}`}
              </div>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={jumpTo}
                onChange={(e) => setJumpTo(e.target.value)}
                placeholder={isHindi ? "श्लोक या पृष्ठ" : "Jump to verse"}
                className="w-28 rounded-xl border border-stone-200 bg-white px-2.5 py-2 text-xs focus:border-amber-400 outline-none"
              />
              <button
                type="button"
                onClick={handleJump}
                className="rounded-xl bg-amber-600 px-3 py-2 text-xs font-bold text-white hover:bg-amber-700 cursor-pointer"
              >
                {isHindi ? "जाएँ" : "Go"}
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNo) => (
                <button
                  key={pageNo}
                  type="button"
                  onClick={() => setCurrentPage(pageNo)}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold cursor-pointer transition-colors ${
                    currentPage === pageNo
                      ? "bg-amber-600 text-white shadow-2xs"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {pageNo}
                </button>
              ),
            )}
          </div>
        </>
      )}

      <div className="mt-6 space-y-4">
        {visibleItems.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-center text-sm text-stone-600">
            No matching verses found in this chapter.
          </div>
        ) : (
          visibleItems.map((item) => (
            <article
              key={item.number}
              className="rounded-2xl border border-stone-200 bg-white p-4 md:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-900">
                  Verse {item.number}
                </span>
                {item.number && (
                  <span className="text-[10px] font-semibold text-stone-500">
                    #{item.number}
                  </span>
                )}
              </div>

              <div className="mt-3 rounded-xl border border-amber-100 bg-[#fffaf0] p-3">
                <p className="font-devanagari text-lg leading-[2] text-stone-900 md:text-xl">
                  {item.devanagari}
                </p>
              </div>

              {item.hindi && (
                <div className="mt-2 text-sm text-stone-700">
                  <span className="font-bold text-stone-800">Hindi:</span>{" "}
                  {item.hindi}
                </div>
              )}

              {item.english && (
                <div className="mt-2 text-sm text-stone-700">
                  <span className="font-bold text-stone-800">English:</span>{" "}
                  {item.english}
                </div>
              )}

              {(item.hinglish || item.hindi) && (
                <div className="mt-2 text-sm text-stone-700">
                  <span className="font-bold text-stone-800">Hinglish:</span>{" "}
                  {item.hinglish || item.hindi}
                </div>
              )}

              {item.commentary && (
                <div className="mt-3 rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm leading-relaxed text-stone-600">
                  <span className="font-bold text-stone-800">Commentary:</span>{" "}
                  {item.commentary}
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default function SubjectDetailPage({ onOpenSearch }) {
  const { category = "veda", subject = "rigveda" } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [drillPath, setDrillPath] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [localSearch, setLocalSearch] = useState("");
  const [granthaFilterType, setGranthaFilterType] = useState("all");
  const [granthaSearch, setGranthaSearch] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [liveData, setLiveData] = useState(null);

  // Mantra Modal state for seamless reading experience
  const [selectedMantraId, setSelectedMantraId] = useState(null);
  const [isMantraModalOpen, setIsMantraModalOpen] = useState(false);

  const handleOpenMantraModal = (mantraId) => {
    if (!mantraId) return;
    setSelectedMantraId(mantraId);
    setIsMantraModalOpen(true);
  };

  useEffect(() => {
    setDrillPath([]);
    setFilterType("all");
    setLocalSearch("");
    setGranthaFilterType("all");
    setGranthaSearch("");
    setTextSearch("");

    let isMounted = true;
    // Call getVedaBySlug for all categories (veda, purana, itihasa, upanishad, darshana)
    VedicLibraryService.getVedaBySlug(subject)
      .then((res) => {
        if (isMounted && res) {
          if (
            res.isLive ||
            res.subjectData?.subjectSlug === subject ||
            res.treeNode?.id === subject ||
            res.treeNode?.slug === subject
          ) {
            setLiveData(res);
          } else {
            setLiveData(null);
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setLiveData(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [category, subject]);

  const key = `${category}/${subject}`;
  const isLiveDataValid =
    liveData?.subjectData &&
    (liveData.isLive ||
      liveData.subjectData.subjectSlug === subject ||
      liveData.subjectData.id === subject);

  let subjectData = null;
  if (isLiveDataValid) {
    subjectData = liveData.subjectData;
  } else if (SUBJECTS_DATA[key]) {
    subjectData = SUBJECTS_DATA[key];
  } else if (SUBJECTS_DATA[subject]) {
    subjectData = SUBJECTS_DATA[subject];
  } else if (category === "veda" && subject === "rigveda") {
    subjectData = SUBJECTS_DATA["veda/rigveda"];
  } else {
    subjectData = generateDynamicSubjectData(category, subject);
  }

  const catData = CATEGORIES_DATA[category] || CATEGORIES_DATA["veda"];

  // Find root node in corresponding hierarchy tree
  const categoryTree =
    category === "veda"
      ? VEDA_HIERARCHY_TREE
      : ALL_CATEGORY_HIERARCHY_TREES[category] || null;

  const fallbackNode = categoryTree
    ? categoryTree.children?.find(
        (v) => v.id === subject || v.slug === subject,
      ) || {
        id: subject,
        slug: subject,
        name: subjectData.name,
        enName: subjectData.enName,
        children: [],
      }
    : {
        id: subject,
        slug: subject,
        name: subjectData.name,
        enName: subjectData.enName,
        children: [],
      };

  const currentVedaNode =
    liveData &&
    (liveData.isLive ||
      liveData.treeNode?.id === subject ||
      liveData.treeNode?.slug === subject)
      ? liveData.treeNode
      : fallbackNode;

  // Resolve active drill down node within the subject
  let activeNode = currentVedaNode;
  const drillNodesPath = [];

  if (currentVedaNode && drillPath.length > 0) {
    for (const pathId of drillPath) {
      if (activeNode && activeNode.children) {
        const found = activeNode.children.find(
          (c) => c.id === pathId || c.slug === pathId,
        );
        if (found) {
          drillNodesPath.push(found);
          activeNode = found;
        }
      }
    }
  }

  const allCurrentCards = activeNode?.children || [];

  // Extract available filter categories from active node children
  const availableTypes = Array.from(
    new Set(
      allCurrentCards
        .map((c) => {
          if (c.badge) return c.badge;
          if (c.name.includes("संहिता")) return "संहिता";
          if (c.name.includes("ब्राह्मण")) return "ब्राह्मण";
          if (c.name.includes("आरण्यक")) return "आरण्यक";
          if (c.name.includes("उपनिषद")) return "उपनिषद";
          if (c.name.includes("सूत्र") || c.name.includes("प्रातिशाख्य"))
            return "सूत्र ग्रंथ";
          if (c.name.includes("सूक्त")) return "सूक्त";
          if (c.mantraId || c.name.includes("मंत्र")) return "वेदमंत्र";
          return null;
        })
        .filter(Boolean),
    ),
  );

  const displayBranchCards = allCurrentCards.filter((branch) => {
    if (filterType !== "all") {
      const bType = branch.badge || "";
      const matchesType =
        bType.includes(filterType) ||
        branch.name.includes(filterType) ||
        (branch.desc && branch.desc.includes(filterType));
      if (!matchesType) return false;
    }
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase().trim();
      const matchesQuery =
        branch.name.toLowerCase().includes(q) ||
        (branch.enName && branch.enName.toLowerCase().includes(q)) ||
        (branch.desc && branch.desc.toLowerCase().includes(q)) ||
        (branch.stats && branch.stats.toLowerCase().includes(q));
      if (!matchesQuery) return false;
    }
    return true;
  });

  const allRelatedGranthas = subjectData.relatedGranthas || [];
  const availableGranthaTypes = Array.from(
    new Set(allRelatedGranthas.map((g) => g.type).filter(Boolean)),
  );

  const scriptureReader =
    subjectData?.scripture ||
    getScriptureReaderData(subject) ||
    SCRIPTURE_READER_LIBRARY[subject];

  const displayRelatedGranthas = allRelatedGranthas.filter((g) => {
    if (granthaFilterType !== "all" && g.type !== granthaFilterType) {
      return false;
    }
    if (granthaSearch.trim()) {
      const q = granthaSearch.toLowerCase().trim();
      const matches =
        (g.name && g.name.toLowerCase().includes(q)) ||
        (g.type && g.type.toLowerCase().includes(q)) ||
        (g.author && g.author.toLowerCase().includes(q)) ||
        (g.desc && g.desc.toLowerCase().includes(q));
      if (!matches) return false;
    }
    return true;
  });

  const allAvailableTexts = subjectData.availableTexts || [];
  const displayAvailableTexts = allAvailableTexts.filter((t) => {
    if (textSearch.trim()) {
      const q = textSearch.toLowerCase().trim();
      return (
        (t.title && t.title.toLowerCase().includes(q)) ||
        (t.desc && t.desc.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Collect and resolve key mantras associated with this subject
  const associatedMantras = useMemo(() => {
    const idSet = new Set();
    const mapped = SUBJECT_KEY_MANTRAS_MAP[subject] || [];
    mapped.forEach((id) => idSet.add(id));

    collectMantraIdsFromNode(currentVedaNode, idSet);

    (subjectData?.availableTexts || []).forEach((t) => {
      if (t.mantraId) idSet.add(t.mantraId);
    });

    (subjectData?.relatedGranthas || []).forEach((g) => {
      if (g.mantraId) idSet.add(g.mantraId);
    });

    if (["rigveda", "yajurveda", "samaveda", "atharvaveda"].includes(subject)) {
      ALL_VEDIC_MANTRAS.filter((m) => m.vedaId === subject)
        .slice(0, 8)
        .forEach((m) => idSet.add(m.id));
    }

    return Array.from(idSet)
      .map((id) => getMantraById(id))
      .filter(Boolean);
  }, [subject, currentVedaNode, subjectData]);

  const handleBranchCardClick = (branch) => {
    if (branch.mantraId) {
      handleOpenMantraModal(branch.mantraId);
    } else if (branch.children && branch.children.length > 0) {
      setDrillPath((prev) => [...prev, branch.id]);
      const el = document.getElementById("structure");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      const targetSlug = branch.slug || branch.id;
      navigate(`/library/${category}/${subject}/${targetSlug}`);
    }
  };

  return (
    <div className="bg-[#fffaf0] min-h-screen">
      {/* Breadcrumb (Matching Page 3 Section 2) */}
      <div className="bg-white border-b border-amber-200/70 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-stone-500 flex-wrap">
          <Link
            to="/"
            className="hover:text-amber-800 transition-colors flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>›</span>
          <Link
            to="/library"
            className="hover:text-amber-800 transition-colors"
          >
            Veda Library
          </Link>
          <span>›</span>
          <Link
            to={`/library/${category}`}
            className="hover:text-amber-800 transition-colors"
          >
            {catData.name}
          </Link>
          <span>›</span>
          {drillPath.length === 0 ? (
            <span className="text-amber-900 font-bold">
              {subjectData.name && subjectData.enName && subjectData.name !== subjectData.enName
                ? `${subjectData.name} (${subjectData.enName})`
                : subjectData.name || subjectData.enName}
            </span>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setDrillPath([])}
                className="text-stone-600 hover:text-amber-800 hover:underline cursor-pointer"
              >
                {subjectData.name}
              </button>
              {drillNodesPath.map((node, index) => {
                const isLast = index === drillNodesPath.length - 1;
                return (
                  <React.Fragment key={node.id || index}>
                    <span>›</span>
                    {isLast ? (
                      <span className="text-amber-900 font-bold">
                        {node.name}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setDrillPath(drillPath.slice(0, index + 1))
                        }
                        className="text-stone-600 hover:text-amber-800 hover:underline cursor-pointer"
                      >
                        {node.name}
                      </button>
                    )}
                  </React.Fragment>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* Subject Hero (Matching Page 3 Section 3) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#170e07] via-[#2c1a0e] to-[#140b05] text-white py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-amber-900/60 shadow-xl">
        <div className="absolute inset-0 z-0">
          <img
            src={resolveSubjectBanner(subject, category, subjectData)}
            alt={subjectData.name}
            className="w-full h-full object-cover object-center opacity-75 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140b05] via-[#1c1108]/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#140b05]/80 via-transparent to-[#140b05]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-[#140b05]/60" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-amber-500/20 border border-amber-400/40 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{subjectData.eyebrow}</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
            {subjectData.name}
          </h1>
          <p className="font-serif text-lg sm:text-2xl text-amber-200/95 font-medium tracking-wide">
            {subjectData.enName}
          </p>
          <p className="text-xs sm:text-sm text-amber-100/90 font-devanagari max-w-2xl mx-auto leading-relaxed drop-shadow-xs">
            {subjectData.intro}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#structure"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer border border-amber-400/30"
            >
              <span>Explore Types & Branches →</span>
            </a>
            {associatedMantras.length > 0 && (
              <a
                href="#key-mantras"
                className="px-6 py-2.5 rounded-full bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/50 text-amber-200 font-bold text-xs sm:text-sm backdrop-blur-md transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>प्रमुख मंत्र व श्लोक ({associatedMantras.length}) →</span>
              </a>
            )}
            <a
              href="#articles"
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all cursor-pointer shadow-md"
            >
              <span>Explore Articles →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Subject Quick Info Bar (Matching Page 3 Section 4) */}
      <div className="bg-amber-50/60 border-b border-amber-200/80 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-xs">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
              TYPE
            </span>
            <span className="font-semibold text-stone-900">
              {subjectData.quickInfo?.type || "Veda (श्रुति)"}
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
              LANGUAGE
            </span>
            <span className="font-semibold text-stone-900">
              {subjectData.quickInfo?.language || "Vedic Sanskrit"}
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
              CHIEF PRIEST
            </span>
            <span className="font-semibold text-stone-900">
              {subjectData.quickInfo?.chiefPriest || "मुख्य ऋत्विक"}
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
              STRUCTURE
            </span>
            <span className="font-semibold text-stone-900">
              {subjectData.quickInfo?.mandalCount
                ? `${subjectData.quickInfo.mandalCount} • ${subjectData.quickInfo.suktaCount}`
                : "प्रामाणिक संरचना"}
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
              CHIEF RISHIS
            </span>
            <span
              className="font-semibold text-stone-900 truncate block"
              title={
                subjectData.quickInfo?.chiefRishis ||
                (Array.isArray(subjectData.rishis)
                  ? subjectData.rishis
                      .map((r) =>
                        typeof r === "string" ? r.split(" ")[0] : r.name,
                      )
                      .join(", ")
                  : "")
              }
            >
              {subjectData.quickInfo?.chiefRishis ||
                (Array.isArray(subjectData.rishis)
                  ? subjectData.rishis
                      .slice(0, 4)
                      .map((r) =>
                        typeof r === "string" ? r.split(" ")[0] : r.name,
                      )
                      .join(", ")
                  : "प्रामाणिक ऋषि परंपरा")}
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Sub-Navigation (Matching Page 3 Section 5) */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold">
          {[
            "Overview",
            "Structure",
            ...(associatedMantras.length > 0 ? ["Key Mantras"] : []),
            "Browse Texts",
            "Rishi & Devata",
            "Articles",
            "Related Grantha",
          ].map((tab) => (
            <a
              key={tab}
              href={`#${tab.toLowerCase().replace(/\s+/g, "-")}`}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                tab === "Key Mantras"
                  ? "text-amber-900 bg-amber-100/90 hover:bg-amber-200/80 font-bold border border-amber-300/60 inline-flex items-center gap-1.5 shadow-2xs"
                  : "text-stone-700 hover:text-amber-900 hover:bg-amber-50"
              }`}
            >
              {tab === "Key Mantras" ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 inline" />
                  <span>प्रमुख मंत्र व श्लोक ({associatedMantras.length})</span>
                </>
              ) : (
                tab
              )}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {/* 6. Overview (Section 6) */}
        <section
          id="overview"
          className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-2xs"
        >
          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-3">
            {subjectData.name} के बारे में
          </h2>
          <p className="text-sm text-stone-700 font-devanagari leading-relaxed">
            {subjectData.overviewText}
          </p>
        </section>

        {/* 7. Explore Structure & Shakhas (Section 7) */}
        {category === "veda" && currentVedaNode ? (
          <section id="structure" className="scroll-mt-24">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  {drillPath.length === 0
                    ? `${subjectData.name} के प्रमुख प्रकार, शाखाएँ एवं वांग्मय`
                    : activeNode.name}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 font-devanagari mt-1">
                  {drillPath.length === 0
                    ? `क्लाइंट द्वारा निर्धारित प्रामाणिक विभाजन के अनुसार किसी भी शाखा या प्रकार पर क्लिक करें (${displayBranchCards.length} प्रकार उपलब्ध)`
                    : `${activeNode.enName || ""} — नीचे दिए गए उप-प्रकार व ग्रंथ (${displayBranchCards.length} उपलब्ध)`}
                </p>
              </div>

              {drillPath.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDrillPath([])}
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
                  >
                    मूल प्रकारों पर लौटें (Reset)
                  </button>
                </div>
              )}
            </div>

            {/* Breadcrumb / Back Bar when drilled down */}
            {drillPath.length > 0 && (
              <div className="mb-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDrillPath((prev) => prev.slice(0, -1))}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-amber-100/80 text-amber-900 font-bold text-xs border border-amber-300 shadow-2xs transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>पीछे जाएं (Back)</span>
                  </button>

                  <span className="text-stone-300">|</span>

                  <button
                    type="button"
                    onClick={() => setDrillPath([])}
                    className="font-bold text-amber-800 hover:text-amber-950 hover:underline cursor-pointer"
                  >
                    {currentVedaNode.name} (मुख्य प्रकार)
                  </button>

                  {drillNodesPath.map((node, index) => {
                    const isLast = index === drillNodesPath.length - 1;
                    return (
                      <React.Fragment key={node.id || index}>
                        <span className="text-stone-400">›</span>
                        {isLast ? (
                          <span className="font-bold text-stone-900 bg-amber-100/90 px-2.5 py-0.5 rounded-md border border-amber-200">
                            {node.name}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setDrillPath(drillPath.slice(0, index + 1))
                            }
                            className="text-stone-600 hover:text-amber-800 hover:underline cursor-pointer"
                          >
                            {node.name}
                          </button>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-stone-500">
                    स्तर {drillPath.length + 1} • {displayBranchCards.length}{" "}
                    उपलब्ध
                  </span>
                </div>
              </div>
            )}

            {/* Dynamic Filter & Search Toolbar */}
            {allCurrentCards.length > 1 && (
              <div className="mb-6 p-3 sm:p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Type Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
                  <span className="text-stone-400 mr-1 flex items-center gap-1 text-[11px] font-semibold">
                    <Filter className="w-3.5 h-3.5 text-amber-700" />
                    <span>फ़िल्टर:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setFilterType("all")}
                    className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer whitespace-nowrap ${
                      filterType === "all"
                        ? "bg-amber-600 text-white font-bold shadow-2xs"
                        : "bg-amber-50/80 text-stone-700 hover:bg-amber-100 border border-amber-200/60"
                    }`}
                  >
                    सभी ({allCurrentCards.length})
                  </button>
                  {availableTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFilterType(t)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer whitespace-nowrap ${
                        filterType === t
                          ? "bg-amber-600 text-white font-bold shadow-2xs"
                          : "bg-amber-50/80 text-stone-700 hover:bg-amber-100 border border-amber-200/60"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Local Quick Search */}
                <div className="relative min-w-[200px] sm:min-w-[240px]">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    placeholder="इस स्तर में खोजें..."
                    className="w-full pl-8 pr-7 py-1.5 rounded-xl text-xs bg-[#fffaf0] border border-stone-200 focus:border-amber-400 focus:outline-none placeholder:text-stone-400 font-devanagari"
                  />
                  {localSearch && (
                    <button
                      type="button"
                      onClick={() => setLocalSearch("")}
                      className="p-1 text-stone-400 hover:text-stone-700 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* If zero results matched the filter */}
            {displayBranchCards.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 shadow-2xs space-y-3">
                <p className="font-serif text-lg font-bold text-stone-800">
                  चयनित फ़िल्टर के अनुसार कोई ग्रंथ या मंत्र नहीं मिला।
                </p>
                <p className="text-xs text-stone-500 font-devanagari">
                  कृपया फ़िल्टर रीसेट करें या भिन्न कीवर्ड द्वारा खोजें।
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFilterType("all");
                    setLocalSearch("");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold shadow-xs hover:bg-amber-700 cursor-pointer"
                >
                  फ़िल्टर रीसेट करें (Reset Filter)
                </button>
              </div>
            ) : (
              /* Hierarchical Branch Cards Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayBranchCards.map((branch, idx) => {
                  const imgSrc = resolveCardImage(
                    branch.imageKey,
                    branch.name,
                    branch.badge,
                  );
                  const hasChildren =
                    branch.children && branch.children.length > 0;

                  return (
                    <div
                      key={branch.id || idx}
                      onClick={() => handleBranchCardClick(branch)}
                      className="group flex flex-col bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-lg hover:border-amber-300 transition-all duration-300 overflow-hidden cursor-pointer"
                    >
                      <div className="relative aspect-16/9 overflow-hidden bg-stone-900">
                        <img
                          src={imgSrc}
                          alt={branch.name}
                          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                        {branch.priest && (
                          <span className="absolute bottom-2 left-2.5 text-[10px] font-bold text-white bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                            {branch.priest}
                          </span>
                        )}
                        {branch.badge ? (
                          <span className="absolute top-2.5 right-2.5 text-[10px] font-bold text-amber-900 bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded-full shadow-xs backdrop-blur-xs flex items-center gap-1">
                            <span>{branch.badge}</span>
                            {hasChildren && (
                              <span>({branch.children.length})</span>
                            )}
                          </span>
                        ) : hasChildren ? (
                          <span className="absolute top-2.5 right-2.5 text-[10px] font-bold text-amber-900 bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded-full shadow-xs backdrop-blur-xs flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            <span>
                              {branch.children.length} उप-प्रकार / शाखाएँ
                            </span>
                          </span>
                        ) : null}
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                              {branch.name}
                            </h3>
                            {branch.enName && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 shrink-0 max-w-[130px] truncate text-right">
                                {branch.enName}
                              </span>
                            )}
                          </div>
                          {branch.desc && (
                            <p className="text-xs text-stone-600 font-devanagari mt-2 line-clamp-2 leading-relaxed">
                              {branch.desc}
                            </p>
                          )}
                          {branch.stats && (
                            <p className="text-[10px] text-stone-500 mt-2 font-medium">
                              {branch.stats}
                            </p>
                          )}
                        </div>

                        <div className="mt-4 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:text-amber-900">
                          <span>
                            {branch.mantraId
                              ? "मंत्र पढ़ें (Read Mantra)"
                              : hasChildren
                                ? `इसके उप-प्रकार व अध्याय देखें (${branch.children.length})`
                                : branch.enName
                                  ? `Explore ${branch.enName}`
                                  : "ग्रंथ का विवरण देखें"}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        ) : (
          subjectData.structureCards && (
            <section id="structure">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-4">
                {subjectData.name} की संरचना एवं मुख्य विभाजन
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {subjectData.structureCards.map((st, idx) =>
                  subject === "shrimad-bhagavata" ? (
                    <a
                      key={idx}
                      href={idx === 2 ? "#scripture-reader" : "#browse-texts"}
                      aria-label={`${st.title}: ${st.desc}`}
                      className="group rounded-2xl border border-stone-200/90 bg-white p-5 text-center shadow-2xs transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
                    >
                      <span className="mb-1 block font-serif text-3xl font-bold text-amber-700">
                        {st.num}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800">
                        {st.title}
                      </h3>
                      <p className="mt-1 font-devanagari text-xs text-stone-500">
                        {st.desc}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-amber-800">
                        विवरण देखें{" "}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </a>
                  ) : (
                    <div
                      key={idx}
                      className="rounded-2xl border border-stone-200/90 bg-white p-5 text-center shadow-2xs"
                    >
                      <span className="mb-1 block font-serif text-3xl font-bold text-amber-700">
                        {st.num}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        {st.title}
                      </h3>
                      <p className="mt-1 font-devanagari text-xs text-stone-500">
                        {st.desc}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </section>
          )
        )}

        {scriptureReader && (
          <section id="scripture-reader" className="scroll-mt-24">
            {(() => {
              const totalVerses = scriptureReader.chapters.reduce(
                (sum, ch) => sum + ch.items.length,
                0,
              );
              const isMultiPage = totalVerses > 10;
              return (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 border border-amber-300 px-2.5 py-0.5 rounded-full shadow-2xs">
                        <BookOpen className="w-3 h-3 text-amber-600" />
                        <span>Scripture Reader</span>
                      </span>
                      <span className="text-xs font-semibold text-stone-500">
                        {scriptureReader.label}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                      {isMultiPage
                        ? "ग्रंथ पाठ-पठन • क्रमबद्ध पृष्ठीय वाचन"
                        : "मूल ग्रंथ पाठ • प्रामाणिक पाठांश वाचन"}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 font-devanagari mt-1 max-w-2xl leading-relaxed">
                      पारंपरिक परिमाण:{" "}
                      <span className="font-semibold text-stone-800">
                        {scriptureReader.sourceTotal}
                      </span>{" "}
                      • लाइब्रेरी में उपलब्ध:{" "}
                      <span className="font-bold text-amber-800">
                        {totalVerses} प्रामाणिक श्लोक
                      </span>{" "}
                      {isMultiPage
                        ? "(10 या 20 प्रति पृष्ठ क्रमबद्ध वाचन)"
                        : "(अध्याय पाठांश संकलन — शेष अध्यायों का डिजिटाइजेशन प्रगति पर)"}
                    </p>
                  </div>
                </div>
              );
            })()}

            <ScriptureReaderView scripture={scriptureReader} />
          </section>
        )}

        {/* 7. Key Mantras & Shlokas (प्रमुख मंत्र व श्लोक) */}
        {associatedMantras.length > 0 && (
          <section id="key-mantras" className="scroll-mt-24 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 border border-amber-300 px-2.5 py-0.5 rounded-full shadow-2xs">
                    <Flame className="w-3 h-3 text-amber-600" />
                    <span>पावन वैदिक वांग्मय</span>
                  </span>
                  <span className="text-xs font-semibold text-stone-500">
                    {associatedMantras.length} प्रमुख मंत्र व श्लोक
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  प्रमुख मंत्र व श्लोक (Key Mantras & Shlokas)
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-devanagari mt-1 max-w-2xl leading-relaxed">
                  {subjectData.name} के सर्वाधिक पवित्र, प्रामाणिक एवं नित्य
                  पठनीय मंत्र। किसी भी मंत्र पर क्लिक करके उसका शुद्ध पाठ, सस्वर
                  उच्चारण व सरल भावार्थ तुरंत पढ़ें।
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl shadow-2xs inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>एक क्लिक में सस्वर पाठ</span>
                </span>
              </div>
            </div>

            {/* Mantras Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {associatedMantras.map((m, mIdx) => (
                <div
                  key={m.id || mIdx}
                  onClick={() => handleOpenMantraModal(m.id)}
                  className="p-5 rounded-2xl bg-gradient-to-b from-white via-[#fffdfa] to-[#fffbf2] border border-amber-200/90 hover:border-amber-400 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Top reference tags */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100/90 border border-amber-200 px-2.5 py-0.5 rounded-full">
                        {m.textName ? m.textName.split(" ")[0] : "वेदमंत्र"} •{" "}
                        {m.mantraNumber || m.sectionRef}
                      </span>
                      {m.devata && (
                        <span className="text-[10px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full truncate max-w-[120px]">
                          {m.devata}
                        </span>
                      )}
                    </div>

                    {/* Sacred Devanagari verse box */}
                    <div className="my-2 p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/70 group-hover:border-amber-300 transition-colors">
                      <p className="font-devanagari font-bold text-stone-900 text-sm sm:text-base leading-relaxed line-clamp-3 select-text">
                        {m.sanskrit}
                      </p>
                    </div>

                    {/* Hindi translation preview */}
                    {m.hindiTranslation && (
                      <p className="font-devanagari text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                        <span className="font-bold text-amber-800">
                          भावार्थ:{" "}
                        </span>
                        {m.hindiTranslation}
                      </p>
                    )}
                  </div>

                  {/* Footer actions */}
                  <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenMantraModal(m.id);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-2xs transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>मंत्र पढ़ें (Read Mantra)</span>
                    </button>

                    <span className="text-xs font-bold text-amber-800 group-hover:text-amber-950 flex items-center gap-1">
                      <span>विस्तार</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. Browse Texts (Section 8) */}
        {allAvailableTexts.length > 0 && (
          <section id="browse-texts">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  Browse {subjectData.enName} Texts
                </h2>
                <p className="text-xs text-stone-500 font-devanagari mt-0.5">
                  प्रमुख सूक्त, ऋचाएँ एवं प्रामाणिक संदर्भ
                </p>
              </div>

              {allAvailableTexts.length > 3 && (
                <div className="relative min-w-[200px] sm:min-w-[240px]">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={textSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                    placeholder="सूक्त या पाठ खोजें..."
                    className="w-full pl-8 pr-7 py-1.5 rounded-xl text-xs bg-white border border-stone-200 focus:border-amber-400 focus:outline-none placeholder:text-stone-400 font-devanagari shadow-2xs"
                  />
                  {textSearch && (
                    <button
                      type="button"
                      onClick={() => setTextSearch("")}
                      className="p-1 text-stone-400 hover:text-stone-700 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {displayAvailableTexts.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2">
                <p className="text-sm font-semibold text-stone-700">
                  कोई सूक्त नहीं मिला।
                </p>
                <button
                  type="button"
                  onClick={() => setTextSearch("")}
                  className="text-xs text-amber-700 hover:text-amber-900 underline font-bold cursor-pointer"
                >
                  खोज साफ़ करें
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayAvailableTexts.map((text, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (text.mantraId) {
                        handleOpenMantraModal(text.mantraId);
                      } else if (text.slug) {
                        navigate(
                          `/library/${category}/${subject}/${text.slug}`,
                        );
                      } else {
                        navigate(`/library/${category}/${subject}/agnisukta`);
                      }
                    }}
                    className="p-4 rounded-xl bg-white border border-stone-200/90 hover:border-amber-400 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                        {text.title}
                      </h4>
                      <p className="text-xs text-stone-500 font-devanagari mt-0.5 leading-relaxed">
                        {text.desc}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-700 flex-shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 10. Rishi & Devata (Section 10) */}
        {(subjectData.rishis || subjectData.devatas || subjectData.deities) && (
          <section
            id="rishi-&-devata"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {subjectData.rishis && subjectData.rishis.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-700" />
                  <span>प्रमुख ऋषि (Vedic Rishis)</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {subjectData.rishis.map((r, idx) => {
                    const isObj = typeof r === "object" && r !== null;
                    const name = isObj ? r.name : r;
                    const role = isObj ? r.role : null;
                    return (
                      <span
                        key={isObj ? `${r.name || idx}-${idx}` : `${r}-${idx}`}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 inline-flex items-center gap-1.5"
                      >
                        <span>{name}</span>
                        {role && (
                          <span className="text-[10px] text-emerald-700 font-normal">
                            ({role})
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {(subjectData.devatas || subjectData.deities) && (
              <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-700" />
                  <span>उपास्य देवता (Devatas)</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(subjectData.devatas || subjectData.deities || []).map(
                    (d, idx) => {
                      const isObj = typeof d === "object" && d !== null;
                      const name = isObj ? d.name || d.title : d;
                      const title = isObj && d.name && d.title ? d.title : null;
                      return (
                        <span
                          key={isObj ? `${name || idx}-${idx}` : `${d}-${idx}`}
                          className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 inline-flex items-center gap-1.5"
                        >
                          <span>{name}</span>
                          {title && (
                            <span className="text-[10px] text-amber-700 font-normal">
                              ({title})
                            </span>
                          )}
                        </span>
                      );
                    },
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        {/* 13. Articles (Section 13) */}
        {subjectData.articles && (
          <section id="articles">
            <h2 className="font-serif text-2xl font-bold text-stone-900 mb-4">
              Learn More About {subjectData.enName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {subjectData.articles.map((art) => (
                <div
                  key={art.id}
                  onClick={() =>
                    navigate(`/library/${category}/${subject}/${art.slug}`)
                  }
                  className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      {art.title}
                    </h3>
                    <p className="text-xs text-stone-600 font-devanagari mt-2 leading-relaxed">
                      {art.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2.5 border-t border-stone-100 text-xs font-bold text-amber-700 flex items-center justify-between">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 14. Related Grantha (Section 14) */}
        {allRelatedGranthas.length > 0 && (
          <section
            id="related-grantha"
            className="bg-[#fffdf8] p-6 sm:p-8 rounded-3xl border border-amber-200/90 shadow-2xs"
          >
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  Related Grantha & Commentaries
                </h2>
                <p className="text-xs text-stone-500 font-devanagari mt-0.5">
                  {subjectData.name} से संबंधित प्रामाणिक संहिताएँ, ब्राह्मण,
                  आरण्यक, उपनिषद एवं सायण भाष्य
                </p>
              </div>
              <span className="text-xs font-semibold text-amber-800 bg-amber-100/70 border border-amber-300 px-3 py-1 rounded-full">
                {displayRelatedGranthas.length} / {allRelatedGranthas.length}{" "}
                उपलब्ध ग्रंथ
              </span>
            </div>

            {/* Grantha Filter & Search Toolbar */}
            {allRelatedGranthas.length > 2 && (
              <div className="mb-5 p-3 rounded-xl bg-white border border-amber-200/80 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Grantha Type Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
                  <button
                    type="button"
                    onClick={() => setGranthaFilterType("all")}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      granthaFilterType === "all"
                        ? "bg-amber-700 text-white font-bold shadow-2xs"
                        : "bg-amber-50 text-stone-700 hover:bg-amber-100 border border-amber-200/70"
                    }`}
                  >
                    सभी ({allRelatedGranthas.length})
                  </button>
                  {availableGranthaTypes.map((gt) => (
                    <button
                      key={gt}
                      type="button"
                      onClick={() => setGranthaFilterType(gt)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        granthaFilterType === gt
                          ? "bg-amber-700 text-white font-bold shadow-2xs"
                          : "bg-amber-50 text-stone-700 hover:bg-amber-100 border border-amber-200/70"
                      }`}
                    >
                      {gt}
                    </button>
                  ))}
                </div>

                {/* Grantha Search Input */}
                <div className="relative min-w-[180px] sm:min-w-[220px]">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={granthaSearch}
                    onChange={(e) => setGranthaSearch(e.target.value)}
                    placeholder="ग्रंथ या भाष्य खोजें..."
                    className="w-full pl-8 pr-7 py-1 rounded-lg text-xs bg-[#fffaf0] border border-stone-200 focus:border-amber-400 focus:outline-none placeholder:text-stone-400 font-devanagari"
                  />
                  {granthaSearch && (
                    <button
                      type="button"
                      onClick={() => setGranthaSearch("")}
                      className="p-1 text-stone-400 hover:text-stone-700 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {displayRelatedGranthas.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2">
                <p className="text-sm font-semibold text-stone-700">
                  चयनित फ़िल्टर के अनुसार कोई ग्रंथ नहीं मिला।
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setGranthaFilterType("all");
                    setGranthaSearch("");
                  }}
                  className="text-xs text-amber-700 hover:text-amber-900 underline font-bold cursor-pointer"
                >
                  फ़िल्टर रीसेट करें
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayRelatedGranthas.map((g, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (g.mantraId) {
                        handleOpenMantraModal(g.mantraId);
                      } else if (g.slug) {
                        navigate(`/library/${category}/${subject}/${g.slug}`);
                      } else {
                        navigate(
                          `/library/${category}/${subject}/shakala-samhita`,
                        );
                      }
                    }}
                    className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-amber-900 uppercase px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                          {g.type}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors mt-2 leading-snug">
                        {g.name}
                      </h4>
                      <p className="text-xs text-stone-500 font-devanagari mt-1">
                        {g.author
                          ? `रचयिता / परंपरा: ${g.author}`
                          : g.desc || "वैदिक परंपरा"}
                      </p>
                    </div>
                    <div className="mt-3.5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:text-amber-900">
                      <span>ग्रंथ का अध्ययन करें (Explore)</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {/* Accessible Vedic Mantra & Shloka Reader Popover Modal */}
      <MantraModal
        isOpen={isMantraModalOpen}
        onClose={() => {
          setIsMantraModalOpen(false);
          setSelectedMantraId(null);
        }}
        mantraId={selectedMantraId}
      />
    </div>
  );
}
