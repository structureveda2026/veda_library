import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import SEO from "../components/common/SEO.jsx";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Home,
  CheckCircle2,
  Layers,
  Search,
  HelpCircle,
  FileText,
  Filter,
  X,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Bookmark
} from "lucide-react";
import { CATEGORIES_DATA } from "../data/categoryTemplatesData.js";
import { VEDA_HIERARCHY_TREE } from "../data/vedaHierarchyTree.js";
import bannerVedasHeritage from "../assets/images/library/banners/banner-vedas-heritage.jpg";
import bannerSanctum from "../assets/images/library/banners/banner-sanctum.png";
import bannerFireRitual from "../assets/images/library/banners/banner-fire-ritual.png";
import bannerKashiGhat from "../assets/images/library/banners/banner-kashi-ghat.png";
import bannerSacredDetails from "../assets/images/library/banners/banner-sacred-details.png";
import bannerTempleGhat from "../assets/images/library/banners/banner-temple-ghat.jpg";
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
  "card-sukta-soma.jpg": cardSamhitaImg,
  "card-sukta-shanti.jpg": bannerSacredDetails,
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
  "card-jyotisha.jpg": cardAstrologyImg
};

function resolveCardImage(imageKey, textName = "", badge = "") {
  if (imageKey && CARD_IMAGES[imageKey]) {
    return CARD_IMAGES[imageKey];
  }
  const combined = `${textName} ${badge}`.toLowerCase();
  if (combined.includes("संहिता") || combined.includes("samhita")) return cardSamhitaImg;
  if (combined.includes("ब्राह्मण") || combined.includes("brahmana")) return cardBrahmanaImg;
  if (combined.includes("आरण्यक") || combined.includes("aranyaka")) return cardAranyakaImg;
  if (combined.includes("उपनिषद") || combined.includes("upanishad")) return cardUpanishadImg;
  if (combined.includes("श्रौत") || combined.includes("shrauta")) return cardShrautaImg;
  if (combined.includes("गृह्य") || combined.includes("grihya")) return cardGrihyaImg;
  if (combined.includes("धर्म") || combined.includes("dharma") || combined.includes("स्मृति")) return cardDharmasutraImg;
  if (combined.includes("प्रातिशाख्य") || combined.includes("pratishakhya") || combined.includes("शिक्षा")) return cardPratiImg;
  if (combined.includes("रुद्र") || combined.includes("शिव") || combined.includes("मृत्युंजय")) return deityShivaImg;
  if (combined.includes("गायत्री") || combined.includes("सरस्वती") || combined.includes("वाक्")) return deitySaraswatiImg;
  if (combined.includes("पुरुष") || combined.includes("विष्णु")) return deityVishnuImg;
  if (combined.includes("अग्नि") || combined.includes("हवन") || combined.includes("यज्ञ")) return cardYagyaImg;
  if (combined.includes("पूजा") || combined.includes("उपचार")) return cardPujaImg;
  if (combined.includes("ज्योतिष") || combined.includes("ग्रह")) return cardAstrologyImg;
  if (combined.includes("संस्कार")) return cardSamskaraImg;
  return cardSamhitaImg;
}

function resolveSageAndDeity(card) {
  const name = (card.name || "").toLowerCase();
  const desc = (card.desc || "").toLowerCase();
  let rishi = card.rishi || null;
  let devata = card.devata || null;

  if (name.includes("अग्नि") || desc.includes("अग्नि")) {
    rishi = rishi || "मधुच्छन्दा वैश्वामित्र";
    devata = devata || "अग्निदेव";
  } else if (name.includes("गायत्री") || desc.includes("गायत्री")) {
    rishi = rishi || "महर्षि विश्वामित्र";
    devata = devata || "सविता (सूर्य देव)";
  } else if (name.includes("पुरुष") || desc.includes("पुरुष सूक्त")) {
    rishi = rishi || "नारायण ऋषि";
    devata = devata || "विराट् पुरुष";
  } else if (name.includes("नासदीय") || desc.includes("नासदीय")) {
    rishi = rishi || "प्रजापति परमेष्ठी";
    devata = devata || "भाववृत्त (परब्रह्म)";
  } else if (name.includes("संगठन") || name.includes("संज्ञान")) {
    rishi = rishi || "संवनन आंगिरस";
    devata = devata || "संज्ञान";
  } else if (name.includes("रुद्र") || name.includes("शिव") || desc.includes("रुद्राध्याय")) {
    rishi = rishi || "याज्ञवल्क्य / कण्व";
    devata = devata || "रुद्र शिव";
  } else if (name.includes("भूमि") || name.includes("पृथ्वी")) {
    rishi = rishi || "महर्षि अथर्वा";
    devata = devata || "भूमि (पृथ्वी माता)";
  } else if (name.includes("मेधा") || desc.includes("मेधाजनन")) {
    rishi = rishi || "महर्षि अथर्वा";
    devata = devata || "वाचस्पति";
  } else if (name.includes("ऐतरेय")) {
    rishi = rishi || "महीदास ऐतरेय";
  } else if (name.includes("शतपथ") || name.includes("माध्यन्दिना") || name.includes("वाजसनेयि") || name.includes("बृहदारण्यक")) {
    rishi = rishi || "महर्षि याज्ञवल्क्य";
  } else if (name.includes("कठोपनिषद") || name.includes("कठ शाखा")) {
    rishi = rishi || "महर्षि कठ";
    devata = devata || "यमराज-नचिकेता संवाद";
  } else if (name.includes("पिप्पलाद") || name.includes("प्रश्नोपनिषद")) {
    rishi = rishi || "महर्षि पिप्पलाद";
  } else if (name.includes("मुण्डक")) {
    rishi = rishi || "अंगिरा-शौनक";
  }
  return { rishi, devata };
}

function resolveContentTypeBadge(card, isVedaDrilled) {
  if (card.badge) return card.badge;
  const name = (card.name || "").toLowerCase();
  const enName = (card.enName || "").toLowerCase();
  if (card.priest && !isVedaDrilled) return "वेद • प्रधान श्रुति";
  if (name.includes("संहिता") || enName.includes("samhita")) return "संहिता ग्रंथ";
  if (name.includes("ब्राह्मण") || enName.includes("brahmana")) return "ब्राह्मण ग्रंथ";
  if (name.includes("आरण्यक") || enName.includes("aranyaka")) return "आरण्यक ग्रंथ";
  if (name.includes("उपनिषद") || enName.includes("upanishad")) return "मुख्य उपनिषद";
  if (name.includes("शाखा") || enName.includes("shakha")) return "वैदिक शाखा";
  if (name.includes("सूक्त") || enName.includes("sukta")) return "वैदिक सूक्त";
  if (name.includes("मंत्र") || card.mantraId) return "वेदमंत्र";
  if (name.includes("सूत्र") || name.includes("प्रातिशाख्य")) return "सूत्र व वेदांग";
  if (card.children && card.children.length > 0) return "उप-विभाग";
  return "वैदिक ग्रंथ";
}

function resolveSourceReference(card, hierarchyNodesPath = []) {
  if (card.source) return card.source;
  if (hierarchyNodesPath.length > 0) {
    const parentNames = hierarchyNodesPath.map((n) => n.name.split(" ")[0]);
    return parentNames.join(" › ");
  }
  if (card.priest) {
    return "वैदिक श्रुति परंपरा";
  }
  return "प्रामाणिक संहिता संदर्भ";
}

const CATEGORY_BANNERS = {
  veda: bannerVedasHeritage,
  "mantra-stotra": bannerAltar,
  mantra: bannerAltar,
  puja: bannerFireRitual,
  "puja-vidhi": bannerFireRitual,
  "yagya-sanskar": bannerFireRitual,
  jyotisha: deityNavagrahaImg,
  vedanga: bannerSacredDetails,
  upanishad: cardUpanishadImg,
  darshana: cardUpanishadImg,
  purana: cardPuranaImg,
  itihasa: bannerTempleGhat,
  dharma: bannerTempleGhat,
  samskara: bannerFireRitual,
  devata: deityTrimurtiImg
};

const RELATED_TRADITIONS = [
  {
    id: "vedanga",
    title: "वेदांग (Vedanga)",
    subtitle: "षडंग ज्ञान",
    badge: "वेदों के ६ अंग",
    desc: "शिक्षा, कल्प, व्याकरण, निरुक्त, छंद एवं ज्योतिष — वेदों के शुद्ध पाठ, अर्थ एवं अनुष्ठान के मूल शास्त्र।",
    link: "/library/vedanga",
    image: cardShrautaImg
  },
  {
    id: "upanishad",
    title: "उपनिषद (Upanishads)",
    subtitle: "वेदान्त ज्ञानकाण्ड",
    badge: "आत्मविद्या",
    desc: "ईश, केन, कठ, प्रश्न, मुण्डक, माण्डूक्य, तैत्तिरीय, ऐतरेय, छान्दोग्य एवं बृहदारण्यक आदि १०८ उपनिषद।",
    link: "/library/upanishad",
    image: cardUpanishadImg
  },
  {
    id: "darshana",
    title: "षड्दर्शन (Darshana)",
    subtitle: "दार्शनिक चिंतन",
    badge: "सत्य मीमांसा",
    desc: "सांख्य, योग, न्याय, वैशेषिक, पूर्व मीमांसा एवं उत्तर मीमांसा (वेदान्त) — सनातन दर्शन का वैज्ञानिक अन्वेषण।",
    link: "/library/darshana",
    image: cardGitaImg
  },
  {
    id: "purana-itihasa",
    title: "पुराण व इतिहास (Purana & Itihasa)",
    subtitle: "स्मृति परंपरा",
    badge: "वैदिक आख्यान",
    desc: "१८ महापुराण, श्रीमद्भगवद्गीता, रामायण एवं महाभारत — वैदिक सिद्धांतों का लोक-कथात्मक व ऐतिहासिक रूप।",
    link: "/library/purana-itihasa",
    image: cardPuranaImg
  },
  {
    id: "mantra-stotra",
    title: "मंत्र एवं स्तोत्र (Mantra & Stotra)",
    subtitle: "जप व स्तुति",
    badge: "उपासना संग्रह",
    desc: "वैदिक ऋचाएँ, शांति पाठ, महामृत्युंजय, श्रीसूक्त, शिव ताण्डव एवं समस्त देवी-देवता के पावन स्तोत्र।",
    link: "/library/mantra-stotra/all",
    image: bannerAltar
  }
];

const CANONICAL_SCRIPTURES = [
  {
    id: "rigveda-samhita-rel",
    title: "ऋग्वेद संहिता (मूल मंत्र भाग)",
    badge: "मूल श्रुति",
    stats: "१०२८ सूक्त • १०,५५२ ऋचाएँ",
    desc: "अग्नि सूक्त, पुरुष सूक्त, नासदीय सूक्त एवं गायत्री महामंत्र का मूल वैदिक संकलन।",
    link: "/library/veda/rigveda"
  },
  {
    id: "isha-upanishad-rel",
    title: "ईशावास्योपनिषद (यजुर्वेद ४०वाँ अध्याय)",
    badge: "यजुर्वेद वांग्मय",
    stats: "१८ मंत्र • कर्म व त्याग",
    desc: "'ईशा वास्यमिदं सर्वम्' — संसार में त्यागपूर्वक उपभोग और आत्मैक्य का सर्वश्रेष्ठ दार्शनिक सूत्र।",
    link: "/library/upanishad"
  },
  {
    id: "gita-rel",
    title: "श्रीमद्भगवद्गीता (महाभारत भीष्मपर्व)",
    badge: "प्रस्थानत्रयी",
    stats: "१८ अध्याय • ७०० श्लोक",
    desc: "कर्मण्येवाधिकारस्ते — निष्काम कर्मयोग, आत्मज्ञान एवं भक्तियोग का कालातीत अमर संवाद।",
    link: "/library/purana-itihasa"
  },
  {
    id: "shatapatha-rel",
    title: "शतपथ ब्राह्मण (वाजसनेयि शुक्ल यजुर्वेद)",
    badge: "ब्राह्मण ग्रंथ",
    stats: "१०० अध्याय • १४ काण्ड",
    desc: "वैदिक वांग्मय का सबसे विशाल ब्राह्मण ग्रंथ — याज्ञवल्क्य, जनक संवाद एवं यज्ञ-वेदी का रहस्य।",
    link: "/library/veda/yajurveda"
  }
];

export default function CategoryLandingPage({ onOpenSearch }) {
  const params = useParams();
  const category = params.category || params.categorySlug || "veda";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [vedaHierarchyPath, setVedaHierarchyPath] = useState(() => {
    const vedaParam = searchParams.get("veda") || searchParams.get("sub");
    if (category === "veda" && vedaParam) {
      const match = VEDA_HIERARCHY_TREE.children.find(
        (c) => c.id === vedaParam || c.slug === vedaParam
      );
      if (match) return [match.id];
    }
    return [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("curated"); // "curated" | "title" | "depth"
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewAll, setIsViewAll] = useState(false);
  const [liveBranches, setLiveBranches] = useState([]);
  const PAGE_SIZE = 8;

  useEffect(() => {
    let isMounted = true;
    async function fetchCategoryBranches() {
      if (!category) return;
      try {
        const res = await fetch(`https://api.vedastructure.com/api/library/categories/${category}/subcategories`);
        if (res.ok) {
          const json = await res.json();
          if (json?.data && Array.isArray(json.data) && json.data.length > 0 && isMounted) {
            setLiveBranches(json.data);
          }
        }
      } catch {
        // Seamless fallback to static CATEGORIES_DATA
      }
    }
    fetchCategoryBranches();
    return () => {
      isMounted = false;
    };
  }, [category]);

  useEffect(() => {
    const vedaParam = searchParams.get("veda") || searchParams.get("sub");
    if (category === "veda" && vedaParam) {
      const match = VEDA_HIERARCHY_TREE.children.find(
        (c) => c.id === vedaParam || c.slug === vedaParam
      );
      if (match) {
        setVedaHierarchyPath([match.id]);
        return;
      }
    }
    setVedaHierarchyPath([]);
    setSearchQuery("");
    setFilterType("all");
    setSortBy("curated");
    setCurrentPage(1);
    setIsViewAll(false);
  }, [category, searchParams]);

  // Reset page when filter, sort, search, or hierarchy changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterType, sortBy, vedaHierarchyPath]);

  const catData = CATEGORIES_DATA[category] || CATEGORIES_DATA["veda"];

  // Resolve current active hierarchical node for Category === "veda"
  let currentHierarchyNode = VEDA_HIERARCHY_TREE;
  const hierarchyNodesPath = [];

  if (category === "veda" && vedaHierarchyPath.length > 0) {
    for (const pathId of vedaHierarchyPath) {
      if (currentHierarchyNode && currentHierarchyNode.children) {
        const nextNode = currentHierarchyNode.children.find(
          (child) => child.id === pathId || child.slug === pathId
        );
        if (nextNode) {
          hierarchyNodesPath.push(nextNode);
          currentHierarchyNode = nextNode;
        }
      }
    }
  }

  const isVedaDrilled = category === "veda" && vedaHierarchyPath.length > 0;

  // Enrich root cards for Vedas with tree children so drilldown always works!
  const vedaRootCards = VEDA_HIERARCHY_TREE.children.map((treeNode) => {
    const match = (catData.subCategories || []).find(
      (s) => s.id === treeNode.id || s.slug === treeNode.slug
    );
    return {
      ...treeNode,
      ...(match || {}),
      children: treeNode.children, // Ensure children exist!
      badge: treeNode.badge || "वेद • प्रधान श्रुति",
      stats: treeNode.stats || match?.stats,
      priest: treeNode.priest || match?.priest,
      desc: match?.desc || treeNode.desc,
      imageKey: match?.imageKey || treeNode.imageKey
    };
  });

  const staticSubCategories = category === "veda" ? vedaRootCards : (catData.subCategories || []);
  const effectiveSubCategories = (liveBranches && liveBranches.length > 0) ? liveBranches : staticSubCategories;
  const rawCards = isVedaDrilled
    ? (currentHierarchyNode?.children || [])
    : effectiveSubCategories;

  // Derive unique filter categories from available cards
  const availableTypes = Array.from(
    new Set(
      rawCards
        .map((c) => {
          if (c.badge) return c.badge;
          if (c.name.includes("संहिता") || (c.enName && c.enName.includes("Samhita"))) return "संहिता";
          if (c.name.includes("ब्राह्मण") || (c.enName && c.enName.includes("Brahmana"))) return "ब्राह्मण";
          if (c.name.includes("आरण्यक") || (c.enName && c.enName.includes("Aranyaka"))) return "आरण्यक";
          if (c.name.includes("उपनिषद") || (c.enName && c.enName.includes("Upanishad"))) return "उपनिषद";
          if (c.name.includes("सूत्र") || c.name.includes("प्रातिशाख्य")) return "सूत्र व वेदांग";
          if (c.name.includes("सूक्त")) return "सूक्त";
          if (c.priest) return "वेद";
          return null;
        })
        .filter(Boolean)
    )
  );

  // 1. Filtered Cards
  const filteredCards = rawCards.filter((card) => {
    if (filterType !== "all") {
      const b = (card.badge || "").toLowerCase();
      const n = (card.name || "").toLowerCase();
      const d = (card.desc || "").toLowerCase();
      const ft = filterType.toLowerCase();
      const matchesType = b.includes(ft) || n.includes(ft) || d.includes(ft);
      if (!matchesType) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        (card.name && card.name.toLowerCase().includes(q)) ||
        (card.enName && card.enName.toLowerCase().includes(q)) ||
        (card.desc && card.desc.toLowerCase().includes(q)) ||
        (card.stats && card.stats.toLowerCase().includes(q)) ||
        (card.priest && card.priest.toLowerCase().includes(q)) ||
        (card.badge && card.badge.toLowerCase().includes(q));
      if (!matchesQuery) return false;
    }
    return true;
  });

  // 2. Sorted Cards
  const sortedCards = [...filteredCards].sort((a, b) => {
    if (sortBy === "title") {
      const cleanA = (a.name || "").replace(/^[०-९0-9A-Za-zक-हivxIVX\.\s\-]+/, "").trim();
      const cleanB = (b.name || "").replace(/^[०-९0-9A-Za-zक-हivxIVX\.\s\-]+/, "").trim();
      return cleanA.localeCompare(cleanB, "hi");
    }
    if (sortBy === "depth") {
      const devanagariDigits = { "०": 0, "१": 1, "२": 2, "३": 3, "४": 4, "५": 5, "६": 6, "७": 7, "८": 8, "९": 9 };
      const parseCount = (card) => {
        if (!card.stats) return 0;
        const str = card.stats.replace(/[०-९]/g, (d) => devanagariDigits[d]);
        const numbers = str.match(/\d[\d,]*/g);
        if (!numbers) return 0;
        return Math.max(...numbers.map((n) => parseInt(n.replace(/,/g, ""), 10) || 0));
      };
      const countA = parseCount(a);
      const countB = parseCount(b);
      if (countB !== countA) return countB - countA;
      return (b.children?.length || 0) - (a.children?.length || 0);
    }
    // "curated" maintains original editorial tree index
    return 0;
  });

  // 3. Paginated Cards
  const totalCards = sortedCards.length;
  const totalPages = Math.ceil(totalCards / PAGE_SIZE) || 1;
  const displayCards = isViewAll || totalCards <= PAGE_SIZE
    ? sortedCards
    : sortedCards.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const startItem = totalCards === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, totalCards);

  const handleCardClick = (card) => {
    if (category === "veda") {
      if (card.mantraId) {
        navigate(`/library/mantra/${card.mantraId}`);
      } else if (card.children && card.children.length > 0) {
        setVedaHierarchyPath((prev) => [...prev, card.id]);
        const sectionEl = document.getElementById("sub-categories");
        if (sectionEl) {
          sectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // Leaf item: Navigate to subject detail reader or subject page
        const targetSlug =
          card.slug ||
          (hierarchyNodesPath[0] && hierarchyNodesPath[0].slug) ||
          card.id;
        navigate(`/library/${category}/${targetSlug}`);
      }
    } else {
      navigate(`/library/${category}/${card.slug}`);
    }
  };

  const currentVedaSlug = hierarchyNodesPath[0]?.slug || hierarchyNodesPath[0]?.id;

  const pageTitle = isVedaDrilled && hierarchyNodesPath.length > 0
    ? `${hierarchyNodesPath[hierarchyNodesPath.length - 1].name} — ${catData.name} | Veda Library`
    : `${catData.name} (${catData.enName}) — सम्पूर्ण वैदिक शाखा व ग्रंथ संग्रह | Veda Library`;

  const pageDesc = isVedaDrilled && hierarchyNodesPath.length > 0
    ? `${hierarchyNodesPath[hierarchyNodesPath.length - 1].name} का प्रामाणिक वैदिक संग्रह, शाखा, संहिता, ब्राह्मण, आरण्यक एवं उपनिषद विवरण।`
    : catData.desc || `${catData.name} (${catData.enName}) का प्रामाणिक, त्रिभाषी डिजिटल संग्रह।`;

  const canonicalPath = isVedaDrilled && hierarchyNodesPath.length > 0
    ? `/library/${category}?sub=${hierarchyNodesPath[hierarchyNodesPath.length - 1].id}`
    : `/category/${category}`;

  const categorySchema = [
    {
      "@type": "CollectionPage",
      name: pageTitle,
      description: pageDesc,
      url: `https://library.vedastructure.com${canonicalPath}`,
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
          name: `${catData.name} (${catData.enName})`,
          item: `https://library.vedastructure.com/category/${category}`
        },
        ...(isVedaDrilled
          ? hierarchyNodesPath.map((node, idx) => ({
              "@type": "ListItem",
              position: 3 + idx,
              name: node.name,
              item: `https://library.vedastructure.com/library/${category}?sub=${node.id}`
            }))
          : [])
      ]
    }
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#111111] min-h-screen selection:bg-[#FFD21F] selection:text-[#111111]">
      <SEO
        title={pageTitle}
        description={pageDesc}
        canonical={canonicalPath}
        schema={categorySchema}
      />
      {/* 1. Breadcrumb Bar — Pure & Scholarly */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] py-3.5 px-4 sm:px-6 lg:px-8 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-[#555555] flex-wrap">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:text-[#111111] hover:bg-stone-50 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>होम (Home)</span>
          </Link>
          <span className="text-[#D9A441]">›</span>
          <Link
            to="/library"
            className="px-2.5 py-1 rounded-lg hover:text-[#111111] hover:bg-stone-50 transition-colors"
          >
            वेद लाइब्रेरी (Veda Library)
          </Link>
          <span className="text-[#D9A441]">›</span>
          <button
            type="button"
            onClick={() => {
              if (isVedaDrilled) {
                setVedaHierarchyPath([]);
              }
            }}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs transition-all ${
              !isVedaDrilled
                ? "bg-[#FFD21F] text-[#111111] font-bold border border-[#FFD21F] shadow-xs cursor-default"
                : "bg-white text-[#111111] font-semibold border border-[#E5E5E5] hover:border-[#D9A441] cursor-pointer"
            }`}
          >
            {catData.name} ({catData.enName})
          </button>
          {isVedaDrilled && hierarchyNodesPath.map((node, i) => {
            const isLast = i === hierarchyNodesPath.length - 1;
            return (
              <React.Fragment key={node.id || i}>
                <span className="text-[#D9A441]">›</span>
                {isLast ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFD21F] text-[#111111] font-bold text-xs border border-[#FFD21F] shadow-xs">
                    {node.name}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setVedaHierarchyPath(vedaHierarchyPath.slice(0, i + 1))}
                    className="text-[#111111] font-semibold px-2.5 py-1 rounded-lg bg-stone-50 border border-[#E5E5E5] hover:border-[#D9A441] transition-all cursor-pointer text-xs"
                  >
                    {node.name}
                  </button>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 2. Category Hero Section — Luminous Banner Art with Radiant Overlays */}
      <section className="relative overflow-hidden bg-[#111111] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#E5E5E5] shadow-sm">
        <div className="absolute inset-0 z-0">
          <img
            src={CATEGORY_BANNERS[category] || bannerVedasHeritage}
            alt={`${catData.name} (${catData.enName}) — वैदिक ज्ञान परंपरा | Veda Library`}
            className="w-full h-full object-cover object-center opacity-85 scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/45 to-[#111111]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/80 via-transparent to-[#111111]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-[#111111]/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#111111] bg-[#FFD21F] border border-[#FFD21F] px-4 py-1.5 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
            <span>{catData.eyebrow}</span>
          </span>

          <div className="space-y-1.5">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
              {catData.name}
            </h1>
            <p className="font-serif text-xl sm:text-2xl text-[#FFD21F] font-medium tracking-wide">
              {catData.enName}
            </p>
          </div>

          <p className="text-sm sm:text-base text-white/90 font-devanagari max-w-3xl mx-auto leading-relaxed drop-shadow-xs">
            {catData.description}
          </p>

          {/* Dual CTAs — Primary Yellow + Clean Luminous Outline */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 max-w-xl mx-auto">
            <a
              href="#sub-categories"
              className="w-full sm:w-auto min-h-[44px] px-7 py-3 rounded-full bg-[#FFD21F] hover:bg-[#ffe052] text-[#111111] font-bold text-xs sm:text-sm shadow-xs transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer border border-[#FFD21F]"
            >
              <span>{catData.primaryCta || "उप-विभाग देखें (Explore Sub-Categories)"}</span>
              <ArrowRight className="w-4 h-4 text-[#111111]" />
            </a>
            <a
              href="#featured"
              className="w-full sm:w-auto min-h-[44px] px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all hover:-translate-y-0.5 cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD21F]" />
              <span>{catData.secondaryCta || "प्रमुख ज्ञान एवं आलेख (Featured)"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Category Quick Info Strip */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E5E5] py-4 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-serif font-bold text-[#111111]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFD21F] ring-4 ring-[#FFD21F]/30" />
            <span className="text-sm">{catData.quickStats}</span>
          </div>
          <div className="text-[#555555] font-medium text-xs flex items-center gap-1.5">
            <strong className="text-[#111111] font-bold">विषयवार अन्वेषण:</strong>
            <span className="text-[#555555]">{catData.exploreBy}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* 4. Introduction — वेद क्या हैं? */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E5E5] hover:border-[#D9A441] shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111] bg-[#FFD21F] border border-[#FFD21F] px-2.5 py-0.5 rounded-full">
              परिचय • Introduction
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mb-3">
            {catData.introHeading}
          </h2>
          <p className="text-sm sm:text-base text-[#555555] font-devanagari leading-relaxed">
            {catData.introText}
          </p>
        </section>

        {/* 5. Main Sub-Categories / Four Vedas Cards */}
        <section id="sub-categories" className="scroll-mt-24 space-y-6">
          {/* Breadcrumb & Back navigation when drilled into Veda hierarchy */}
          {isVedaDrilled && (
            <div className="p-4 rounded-2xl bg-stone-50 border border-[#E5E5E5] flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setVedaHierarchyPath((prev) => prev.slice(0, -1))}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-[#111111] font-bold text-xs border border-[#E5E5E5] shadow-xs transition-all cursor-pointer hover:-translate-y-0.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>पीछे जाएं (Back)</span>
                </button>

                <span className="text-stone-300">|</span>

                <button
                  type="button"
                  onClick={() => setVedaHierarchyPath([])}
                  className="font-bold text-[#111111] hover:text-[#D9A441] hover:underline cursor-pointer"
                >
                  चारों वेद (All 4 Vedas)
                </button>

                {hierarchyNodesPath.map((node, index) => {
                  const isLast = index === hierarchyNodesPath.length - 1;
                  return (
                    <React.Fragment key={node.id || index}>
                      <span className="text-[#D9A441]">›</span>
                      {isLast ? (
                        <span className="font-bold text-[#111111] bg-[#FFD21F] px-3 py-1 rounded-lg border border-[#FFD21F] shadow-xs">
                          {node.name}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setVedaHierarchyPath(vedaHierarchyPath.slice(0, index + 1))}
                          className="text-[#555555] hover:text-[#111111] hover:underline cursor-pointer font-medium"
                        >
                          {node.name}
                        </button>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                {currentVedaSlug && (
                  <Link
                    to={`/library/veda/${currentVedaSlug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#111111] bg-white hover:bg-stone-100 px-3 py-1 rounded-lg border border-[#E5E5E5] hover:border-[#D9A441] transition-all shadow-xs"
                  >
                    <span>इस वेद का सम्पूर्ण परिचय पेज देखें</span>
                    <ArrowRight className="w-3 h-3 text-[#D9A441]" />
                  </Link>
                )}
                <span className="text-[11px] font-semibold text-[#555555] bg-white px-2.5 py-1 rounded-lg border border-[#E5E5E5]">
                  स्तर {vedaHierarchyPath.length + 1} • {sortedCards.length} उपलब्ध
                </span>
                <button
                  type="button"
                  onClick={() => setVedaHierarchyPath([])}
                  className="text-[11px] font-bold text-[#111111] hover:text-[#D9A441] underline cursor-pointer"
                >
                  रीसेट करें (Reset)
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                {isVedaDrilled
                  ? currentHierarchyNode.name
                  : `${catData.name} के प्रमुख उप-विभाग एवं शाखाएँ`}
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] font-devanagari mt-1">
                {isVedaDrilled
                  ? `${currentHierarchyNode.enName || ""} — नीचे दिए गए उप-विभागों, शाखाओं व ग्रंथों में से चुनें।`
                  : "अपनी रुचि के अनुसार किसी भी शाखा, संहिता या ग्रंथ से शुरुआत करें।"}
              </p>
            </div>

            {/* Quick Result Counter */}
            <div className="text-xs font-semibold text-[#555555] bg-stone-50 border border-[#E5E5E5] px-3.5 py-1.5 rounded-xl shrink-0 self-start md:self-auto shadow-xs">
              <span className="text-[#111111] font-bold">{sortedCards.length}</span> / {rawCards.length} उपलब्ध
            </div>
          </div>

          {/* Dedicated Search, Filter & Sort Controls */}
          {rawCards.length > 1 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5">
                {/* Filter Pills with Smooth Active Transitions */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
                  <span className="text-[#555555] mr-1.5 flex items-center gap-1.5 text-xs font-bold shrink-0">
                    <Filter className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>फ़िल्टर:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setFilterType("all")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      filterType === "all"
                        ? "bg-[#FFD21F] text-[#111111] font-bold shadow-xs border border-[#FFD21F] ring-2 ring-[#FFD21F]/30"
                        : "bg-white text-[#555555] hover:bg-stone-50 hover:text-[#111111] hover:border-[#D9A441] border border-[#E5E5E5]"
                    }`}
                  >
                    सभी ({rawCards.length})
                  </button>
                  {availableTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFilterType(t)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        filterType === t
                          ? "bg-[#FFD21F] text-[#111111] font-bold shadow-xs border border-[#FFD21F] ring-2 ring-[#FFD21F]/30"
                          : "bg-white text-[#555555] hover:bg-stone-50 hover:text-[#111111] hover:border-[#D9A441] border border-[#E5E5E5]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Search Box */}
                <div className="relative w-full md:w-auto min-w-[220px] sm:min-w-[280px]">
                  <Search className="w-4 h-4 text-[#D9A441] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="शाखा, ग्रंथ या विषय खोजें..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-white border border-[#E5E5E5] focus:border-[#D9A441] focus:bg-white focus:outline-none placeholder:text-[#555555]/60 font-devanagari text-[#111111] shadow-2xs transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="p-1 text-[#555555] hover:text-[#111111] absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sorting Bar with Bento Segmented Pills */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3.5 border-t border-[#E5E5E5]">
                <div className="flex items-center gap-2 text-xs flex-wrap w-full sm:w-auto">
                  <span className="font-bold text-[#111111] flex items-center gap-1.5 shrink-0">
                    <ArrowUpDown className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>क्रमबद्ध करें (Sort):</span>
                  </span>
                  <div className="flex flex-wrap sm:inline-flex w-full sm:w-auto rounded-xl bg-stone-50 p-1 border border-[#E5E5E5] gap-1" role="radiogroup" aria-label="Sort Order">
                    <button
                      type="button"
                      onClick={() => setSortBy("curated")}
                      className={`flex-1 sm:flex-initial min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer text-center justify-center flex items-center ${
                        sortBy === "curated"
                          ? "bg-[#FFD21F] text-[#111111] font-bold shadow-2xs border border-[#FFD21F]"
                          : "text-[#555555] hover:text-[#111111] hover:bg-white"
                      }`}
                      role="radio"
                      aria-checked={sortBy === "curated"}
                    >
                      <span className="sm:hidden">प्रामाणिक</span>
                      <span className="hidden sm:inline">प्रामाणिक क्रम (Curated)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSortBy("title")}
                      className={`flex-1 sm:flex-initial min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer text-center justify-center flex items-center ${
                        sortBy === "title"
                          ? "bg-[#FFD21F] text-[#111111] font-bold shadow-2xs border border-[#FFD21F]"
                          : "text-[#555555] hover:text-[#111111] hover:bg-white"
                      }`}
                      role="radio"
                      aria-checked={sortBy === "title"}
                    >
                      <span>शीर्षक (A-Z)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSortBy("depth")}
                      className={`flex-1 sm:flex-initial min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer text-center justify-center flex items-center ${
                        sortBy === "depth"
                          ? "bg-[#FFD21F] text-[#111111] font-bold shadow-2xs border border-[#FFD21F]"
                          : "text-[#555555] hover:text-[#111111] hover:bg-white"
                      }`}
                      role="radio"
                      aria-checked={sortBy === "depth"}
                    >
                      <span className="sm:hidden">विस्तार</span>
                      <span className="hidden sm:inline">शाखा व विस्तार (Depth)</span>
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-[#555555] font-devanagari flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441]" />
                  <span>
                    {sortBy === "curated" && "पारंपरिक वैदिक श्रुति क्रम अनुसार"}
                    {sortBy === "title" && "वर्णमाला (अ-ज्ञ / A-Z) अनुसार"}
                    {sortBy === "depth" && "सर्वाधिक मंत्र, शाखा व सामग्री विस्तार अनुसार"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Empty State when no results match */}
          {sortedCards.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#E5E5E5] shadow-xs space-y-3">
              <p className="font-serif text-lg font-bold text-[#111111]">
                चयनित फ़िल्टर अथवा खोज के अनुसार कोई उप-विभाग नहीं मिला।
              </p>
              <p className="text-xs text-[#555555] font-devanagari">
                कृपया फ़िल्टर रीसेट करें या भिन्न कीवर्ड टाइप करें।
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilterType("all");
                  setSearchQuery("");
                  setSortBy("curated");
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFD21F] text-[#111111] text-xs font-bold shadow-xs hover:bg-[#ffe052] cursor-pointer transition-all border border-[#FFD21F]"
              >
                फ़िल्टर रीसेट करें (Reset Filter)
              </button>
            </div>
          ) : (
            <>
              {/* Content Cards Grid (Pure White surface, subtle #E5E5E5 borders, #D9A441 hover accents) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayCards.map((sub, idx) => {
                  const imgSrc = resolveCardImage(sub.imageKey, sub.name, sub.badge);
                  const hasChildren = sub.children && sub.children.length > 0;
                  const { rishi, devata } = resolveSageAndDeity(sub);
                  const contentTypeBadge = resolveContentTypeBadge(sub, isVedaDrilled);
                  const sourceRef = resolveSourceReference(sub, hierarchyNodesPath);

                  return (
                    <div
                      key={sub.id || idx}
                      onClick={() => handleCardClick(sub)}
                      className="group flex flex-col bg-[#FFFFFF] rounded-2xl border border-[#E5E5E5] shadow-xs hover:shadow-md hover:border-[#D9A441] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-pointer relative"
                    >
                      {/* Top Golden Accent indicator on hover */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-[#D9A441] transition-colors z-10" />

                      {/* Image header with authentic badges */}
                      <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
                        <img
                          src={imgSrc}
                          alt={`${sub.name} (${sub.enName || ""}) — ${catData.name} | Veda Library`}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                        {/* Content Type Badge */}
                        <span className="absolute top-2.5 left-2.5 text-[10px] font-bold text-[#111111] bg-[#FFD21F] border border-[#FFD21F] px-2.5 py-0.5 rounded-full shadow-2xs uppercase tracking-wide">
                          {contentTypeBadge}
                        </span>

                        {/* Hierarchy count Badge */}
                        {hasChildren && (
                          <span className="absolute top-2.5 right-2.5 text-[10px] font-bold text-[#111111] bg-white/95 border border-[#E5E5E5] px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1 backdrop-blur-xs">
                            <Layers className="w-3 h-3 text-[#D9A441]" />
                            <span>{sub.children.length} शाखाएँ / भाग</span>
                          </span>
                        )}

                        {/* Priest Attribution Tag */}
                        {sub.priest && (
                          <span className="absolute bottom-2.5 left-2.5 text-[10px] font-semibold text-white bg-black/75 border border-white/20 px-2.5 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F]" />
                            <span>ऋत्विक: {sub.priest}</span>
                          </span>
                        )}

                        {/* Devata Tag if known */}
                        {devata && (
                          <span className="absolute bottom-2.5 right-2.5 text-[10px] font-semibold text-[#FFD21F] bg-black/75 border border-[#D9A441]/40 px-2 py-0.5 rounded-md backdrop-blur-xs truncate max-w-[130px]">
                            देवता: {devata}
                          </span>
                        )}
                      </div>

                      {/* Card Content with Clean Typography */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-serif text-base sm:text-lg font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors leading-snug">
                              {sub.name}
                            </h3>
                          </div>
                          {sub.enName && (
                            <p className="text-[11px] font-medium text-[#555555] tracking-wide mb-2 truncate">
                              {sub.enName}
                            </p>
                          )}

                          {sub.desc && (
                            <p className="text-xs text-[#555555] font-devanagari line-clamp-2 leading-relaxed">
                              {sub.desc}
                            </p>
                          )}

                          {/* Attribution chips (Sage & Priest) */}
                          {(rishi || devata) && (
                            <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-[#E5E5E5]">
                              {rishi && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#111111] bg-stone-50 border border-[#E5E5E5] px-2 py-0.5 rounded-md">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441]" />
                                  <span>ऋषि: {rishi}</span>
                                </span>
                              )}
                            </div>
                          )}

                          {/* Source Reference & Stats Row */}
                          <div className="mt-2.5 pt-2 border-t border-[#E5E5E5] space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-[#555555] font-medium flex items-center gap-1 shrink-0">
                                <BookOpen className="w-3 h-3 text-[#D9A441]" />
                                <span>स्रोत संदर्भ:</span>
                              </span>
                              <span className="font-semibold text-[#111111] truncate max-w-[170px] text-right">
                                {sourceRef}
                              </span>
                            </div>

                            {sub.stats && (
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="text-[#555555] font-medium flex items-center gap-1 shrink-0">
                                  <Sparkles className="w-3 h-3 text-[#D9A441]" />
                                  <span>संख्या / विस्तार:</span>
                                </span>
                                <span className="font-semibold text-[#D9A441] truncate max-w-[170px] text-right">
                                  {sub.stats}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Link Footer */}
                        <div className="mt-4 pt-3 border-t border-[#E5E5E5] flex items-center justify-between text-xs font-bold text-[#111111] group-hover:text-[#D9A441]">
                          <span className="flex items-center gap-1.5">
                            {hasChildren ? (
                              <>
                                <Layers className="w-3.5 h-3.5 text-[#D9A441]" />
                                <span>शाखाएँ एवं ग्रंथ देखें ({sub.children.length})</span>
                              </>
                            ) : sub.mantraId ? (
                              <>
                                <BookOpen className="w-3.5 h-3.5 text-[#D9A441]" />
                                <span>मूल मंत्र व अर्थ पढ़ें</span>
                              </>
                            ) : (
                              <>
                                <FileText className="w-3.5 h-3.5 text-[#D9A441]" />
                                <span>ग्रंथ का अध्ययन करें</span>
                              </>
                            )}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#D9A441]" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 4. Accessible Pagination & Load More Control (When cards exceed 8 items) */}
              {totalCards > PAGE_SIZE && (
                <nav
                  aria-label="Pagination Navigation"
                  className="mt-8 p-4 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="text-xs text-[#555555] font-medium flex items-center gap-2">
                    <span className="font-bold text-[#111111]">
                      {isViewAll ? `सभी ${totalCards} प्रदर्शित` : `${totalCards} में से ${startItem}–${endItem} प्रदर्शित`}
                    </span>
                    <span>•</span>
                    <span>पृष्ठ {currentPage} / {totalPages}</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (currentPage > 1) {
                          setCurrentPage((prev) => prev - 1);
                          document.getElementById("sub-categories")?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      disabled={currentPage === 1 || isViewAll}
                      aria-label="Previous Page"
                      className="inline-flex items-center gap-1 min-h-[40px] px-3.5 py-2 rounded-xl border border-[#E5E5E5] hover:border-[#D9A441] text-xs font-semibold text-[#111111] bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-[#D9A441]" />
                      <span>पिछला (Prev)</span>
                    </button>

                    {!isViewAll &&
                      Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                        <button
                          key={pg}
                          type="button"
                          onClick={() => {
                            setCurrentPage(pg);
                            document.getElementById("sub-categories")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          aria-current={currentPage === pg ? "page" : undefined}
                          aria-label={`Page ${pg}`}
                          className={`min-w-[38px] min-h-[38px] rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                            currentPage === pg
                              ? "bg-[#FFD21F] text-[#111111] border border-[#FFD21F] shadow-2xs font-extrabold"
                              : "bg-white text-[#555555] hover:text-[#111111] hover:bg-stone-50 hover:border-[#D9A441] border border-[#E5E5E5]"
                          }`}
                        >
                          {pg}
                        </button>
                      ))}

                    <button
                      type="button"
                      onClick={() => {
                        if (currentPage < totalPages) {
                          setCurrentPage((prev) => prev + 1);
                          document.getElementById("sub-categories")?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      disabled={currentPage === totalPages || isViewAll}
                      aria-label="Next Page"
                      className="inline-flex items-center gap-1 min-h-[40px] px-3.5 py-2 rounded-xl border border-[#E5E5E5] hover:border-[#D9A441] text-xs font-semibold text-[#111111] bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
                    >
                      <span>अगला (Next)</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#D9A441]" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsViewAll((prev) => !prev);
                      setCurrentPage(1);
                    }}
                    className="text-xs font-bold text-[#111111] hover:text-[#D9A441] underline cursor-pointer"
                  >
                    {isViewAll ? "पेज में देखें (Paginate 8)" : `सभी ${totalCards} एक साथ देखें (Show All)`}
                  </button>
                </nav>
              )}
            </>
          )}
        </section>

        {/* 6. Category Structure */}
        {catData.structureHierarchy && (
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E5E5] shadow-xs">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#111111] bg-[#FFD21F] border border-[#FFD21F] px-3 py-1 rounded-full">
                HIERARCHY & STRUCTURE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mt-2">
                {catData.name} की संरचना को समझें
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] font-devanagari mt-1">
                वैदिक सामग्री को उसके मूल शास्त्रीय एवं संरचनात्मक स्तरों के अनुसार explore करें।
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {catData.structureHierarchy.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-[#E5E5E5] text-center shadow-xs hover:border-[#D9A441] hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <span className="w-6 h-6 rounded-full bg-[#FFD21F] text-[#111111] text-[11px] font-bold flex items-center justify-center mx-auto mb-1.5 border border-[#FFD21F]">
                    {idx + 1}
                  </span>
                  <p className="text-xs font-serif font-bold text-[#111111]">{item.level}</p>
                  <p className="text-[10px] text-[#555555] mt-0.5">{item.en}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. Explore by Topic */}
        <section className="text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#111111] bg-[#FFD21F] border border-[#FFD21F] px-3 py-1 rounded-full mb-2">
            <span>विषयवार अन्वेषण</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mb-2">
            वेदों में विषय खोजें
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] font-devanagari mb-6">
            यदि आपको किसी विशेष वेद का नाम नहीं पता, तो अपने रुचि के विषय से शुरुआत करें।
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
            {catData.topics.map((t) => (
              <span
                key={t}
                onClick={() => setSearchQuery(t)}
                className="px-4 py-2 rounded-full bg-white border border-[#E5E5E5] text-xs font-semibold text-[#111111] hover:border-[#D9A441] hover:bg-stone-50 hover:text-[#111111] cursor-pointer transition-all shadow-xs hover:-translate-y-0.5"
              >
                #{t}
              </span>
            ))}
          </div>
        </section>

        {/* 8. Featured Knowledge Cards */}
        <section id="featured">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111] bg-[#FFD21F] border border-[#FFD21F] px-3 py-1 rounded-full">
                विशेष संग्रह
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mt-1.5">
                Featured Knowledge & Articles
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] font-devanagari mt-0.5">
                {catData.name} से जुड़े प्रमुख लेख, मंत्र, सूक्त एवं शास्त्रीय विषय।
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {catData.featuredKnowledge.map((feat) => (
              <div
                key={feat.id}
                onClick={() =>
                  navigate(
                    `/library/${category}/${feat.subjectSlug}/${feat.articleSlug}`
                  )
                }
                className="p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs hover:shadow-sm hover:border-[#D9A441] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#111111] px-2.5 py-0.5 rounded-full bg-[#FFD21F] border border-[#FFD21F]">
                    {feat.type}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#111111] mt-2.5 group-hover:text-[#D9A441] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#555555] font-devanagari mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E5E5E5] text-xs font-bold text-[#111111] flex items-center justify-between">
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9A441]" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Category FAQ */}
        {catData.faqs && (
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E5E5] shadow-xs">
            <h2 className="font-serif text-2xl font-bold text-[#111111] mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#D9A441]" />
              <span>प्रायः पूछे जाने वाले प्रश्न (FAQ)</span>
            </h2>
            <div className="space-y-4">
              {catData.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-xl bg-stone-50/60 border border-[#E5E5E5] shadow-xs">
                  <h3 className="text-sm font-bold text-[#111111] mb-1.5 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FFD21F] text-[#111111] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      Q
                    </span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555555] font-devanagari leading-relaxed pl-7">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 10. Dedicated Related Categories & Relevant Scriptures Grid (Document Section 4 Requirement) */}
        <section className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E5E5E5] shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#111111] bg-[#FFD21F] border border-[#FFD21F] px-3 py-1 rounded-full shadow-xs mb-2">
                <Sparkles className="w-3 h-3 text-[#111111]" />
                <span>सम्बद्ध ज्ञान परंपरा • RELATED TRADITIONS</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
                सम्बद्ध श्रेणियाँ एवं ग्रंथ (Related Traditions & Relevant Scriptures)
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] font-devanagari mt-1">
                वेदों के गूढ़ अध्ययन को पूर्णता प्रदान करने वाले षडंग, वेदान्त उपनिषद, षड्दर्शन, पुराण-इतिहास एवं पावन स्तोत्र।
              </p>
            </div>
            <Link
              to="/library"
              className="text-xs font-bold text-[#111111] hover:text-[#D9A441] flex items-center gap-1 hover:underline shrink-0"
            >
              <span>सम्पूर्ण लाइब्रेरी देखें</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D9A441]" />
            </Link>
          </div>

          {/* 5 Linked Major Tradition Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {RELATED_TRADITIONS.map((trad) => (
              <Link
                key={trad.id}
                to={trad.link}
                className="group flex flex-col bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#D9A441] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
                  <img
                    src={trad.image}
                    alt={trad.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/60 border border-white/20 px-2 py-0.5 rounded backdrop-blur-xs">
                    {trad.badge}
                  </span>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors leading-snug">
                      {trad.title}
                    </h3>
                    <p className="text-[10px] font-medium text-[#D9A441] mt-0.5">
                      {trad.subtitle}
                    </p>
                    <p className="text-xs text-[#555555] font-devanagari mt-1.5 line-clamp-2 leading-relaxed">
                      {trad.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-[#E5E5E5] flex items-center justify-between text-[11px] font-bold text-[#111111] group-hover:text-[#D9A441]">
                    <span>अन्वेषण करें</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1 text-[#D9A441]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Canonical Scripture Highlights */}
          <div className="pt-6 border-t border-[#E5E5E5]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#111111] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#D9A441]" />
                <span>प्रमुख प्रामाणिक ग्रंथ एवं संहिताएँ (Relevant Canonical Scriptures)</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CANONICAL_SCRIPTURES.map((grantha) => (
                <Link
                  key={grantha.id}
                  to={grantha.link}
                  className="p-4 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] mb-1.5">
                      <span className="font-bold text-[#111111] px-2 py-0.5 rounded-full bg-[#FFD21F] border border-[#FFD21F]">
                        {grantha.badge}
                      </span>
                      <span className="text-[#555555] font-medium">{grantha.stats}</span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors">
                      {grantha.title}
                    </h4>
                    <p className="text-xs text-[#555555] font-devanagari mt-1 leading-relaxed line-clamp-2">
                      {grantha.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#E5E5E5] text-[11px] font-bold text-[#111111] group-hover:text-[#D9A441] flex items-center justify-between">
                    <span>अध्ययन करें</span>
                    <ArrowRight className="w-3 h-3 text-[#D9A441] transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 11. Scholarly Final CTA — Document-Specified Canvas Card (No Heavy Black) */}
        <section className="relative overflow-hidden py-10 sm:py-14 px-5 sm:px-10 md:px-14 rounded-2xl sm:rounded-3xl bg-[#FFFFFF] border-2 border-[#D9A441]/40 shadow-sm text-center">
          {/* Subtle Sacred Aura Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-40 sm:h-48 bg-[#FFD21F]/15 blur-3xl pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Top Eyebrow Badge */}
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFD21F] border border-[#D9A441] px-4 py-1.5 rounded-full mb-3.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
              <span className="font-devanagari">सनातन ज्ञान संपदा</span>
            </span>

            {/* Clear High-Contrast Heading */}
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111] mb-3 leading-tight">
              Explore {catData.name} ({catData.enName})
            </h2>

            {/* Crisp Readable Subtitle */}
            <p className="font-devanagari text-sm sm:text-base text-[#555555] max-w-lg mx-auto mb-7 leading-relaxed font-normal">
              किसी वेद, मंत्र, सूक्त, ऋषि, देवता या विषय से अपनी पावन ज्ञान यात्रा शुरू करें।
            </p>

            {/* 100% Mobile Responsive Touch Buttons (>= 44px) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 max-w-sm sm:max-w-none mx-auto">
              <button
                type="button"
                onClick={() => {
                  const firstSub = catData.subCategories?.[0]?.slug || "rigveda";
                  navigate(`/library/${category}/${firstSub}`);
                }}
                className="w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-xl sm:rounded-full bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-bold text-xs sm:text-sm shadow-xs hover:shadow-sm cursor-pointer transition-all hover:-translate-y-0.5 active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Explore Sub-Categories</span>
                <span className="text-base leading-none">→</span>
              </button>

              <button
                type="button"
                onClick={onOpenSearch}
                className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-xl sm:rounded-full bg-[#FFFFFF] hover:bg-[#FAF7F2] border-2 border-[#D9A441]/50 hover:border-[#D9A441] text-[#111111] font-bold text-xs sm:text-sm shadow-xs transition-all hover:-translate-y-0.5 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#555555]" />
                <span>Search Library</span>
                <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FAF7F2] text-[#555555] border border-[#E5E5E5]">
                  ⌘K
                </kbd>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
