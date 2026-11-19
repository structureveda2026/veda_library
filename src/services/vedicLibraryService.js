import { VEDIC_MANTRAS, getMantraById, ALL_VEDIC_MANTRAS } from "../data/vedicMantrasData.js";
import { VEDA_HIERARCHY_TREE, findNodeById } from "../data/vedaHierarchyTree.js";
import { SUBJECTS_DATA, CATEGORIES_DATA } from "../data/categoryTemplatesData.js";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://api.vedastructure.com/api";

/**
 * Helper to fetch with timeout and JSON parsing
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = 4000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

const PRIEST_MAP = {
  "होतृ (Hotri)": "Hotri (Invoking Priest)",
  "होतृ": "Hotri (Invoking Priest)",
  "अध्वर्यु (Adhvaryu)": "Adhvaryu (Officiating Priest)",
  "अध्वर्यु": "Adhvaryu (Officiating Priest)",
  "उद्गातृ (Udgatri)": "Udgatri (Chanting Priest)",
  "उद्गातृ": "Udgatri (Chanting Priest)",
  "ब्रह्मा (Brahma)": "Brahma (Supreme Overseer Priest)",
  "ब्रह्मा": "Brahma (Supreme Overseer Priest)",
};

const AUTHOR_TRANSLATIONS = {
  "महर्षि याज्ञवल्क्य": "Maharshi Yajnavalkya",
  "याज्ञवल्क्य परंपरा": "Yajnavalkya Tradition",
  "तित्तिरि ऋषि": "Rishi Tittiri",
  "तित्तिरि परंपरा": "Tittiri Tradition",
  "ऋषि तित्तिरि": "Rishi Tittiri",
  "कृष्ण यजुर्वेद": "Krishna Yajurveda Tradition",
  "शुक्ल यजुर्वेद": "Shukla Yajurveda Tradition",
  "कठ ऋषि": "Rishi Katha",
  "महीदास ऐतरेय": "Mahidasa Aitareya",
  "कौषीतकि ऋषि": "Kaushitaki Rishi",
  "ऋषि गोपथ": "Rishi Gopatha",
  "महर्षि शाकल्य": "Maharshi Shakalya",
  "प्रस्थानत्रयी": "Prasthanatrayi",
  "यम-नचिकेता संवाद": "Yama-Nachiketa Dialogue",
  "महर्षि श्वेताश्वतर": "Maharshi Shvetashvatara",
  "महर्षि बौधायन": "Maharshi Baudhayana",
  "वैदिक परंपरा": "Vedic Tradition",
  "अंगिरा-शौनक": "Angiras-Shaunaka Tradition",
  "महर्षि पिप्पलाद": "Maharshi Pippalada",
};

const GRANTHA_NAME_TRANSLATIONS = {
  "ऐतरेय ब्राह्मण": "Aitareya Brahmana",
  "कौषीतकि ब्राह्मण (शांखायन)": "Kaushitaki Brahmana (Shankhayana)",
  "कौषीतकि ब्राह्मण": "Kaushitaki Brahmana",
  "ऐतरेय आरण्यक": "Aitareya Aranyaka",
  "ऐतरेयोपनिषद": "Aitareya Upanishad",
  "शतपथ ब्राह्मण": "Shatapatha Brahmana",
  "तैत्तिरीय ब्राह्मण": "Taittiriya Brahmana",
  "तैत्तिरीय आरण्यक": "Taittiriya Aranyaka",
  "बृहदारण्यक उपनिषद": "Brihadaranyaka Upanishad",
  "ईशावास्योपनिषद": "Isha Upanishad",
  "कठोपनिषद": "Katha Upanishad",
  "ताण्ड्य महाब्राह्मण (पंचविंश)": "Tandya Mahabrahmana (Panchavimsha)",
  "षड्विंश ब्राह्मण": "Shadvimsha Brahmana",
  "सामविधान ब्राह्मण": "Samavidhana Brahmana",
  "छान्दोग्य उपनिषद": "Chandogya Upanishad",
  "केनोपनिषद": "Kena Upanishad",
  "गोपथ ब्राह्मण": "Gopatha Brahmana",
  "मुण्डक उपनिषद": "Mundaka Upanishad",
  "माण्डूक्य उपनिषद": "Mandukya Upanishad",
  "प्रश्नोपनिषद": "Prashna Upanishad",
};

const GRANTHA_DESC_TRANSLATIONS = {
  "सोमयाग, राज्याभिषेक एवं अग्निहोत्र विधान।": "Soma sacrifice, royal consecration (Rajasuya), and Agnihotra rituals.",
  "यज्ञ-विधान एवं वैदिक कर्मकांड।": "Ritual ordinances and Vedic ceremonial procedures.",
  "महाव्रत एवं प्राणविद्या का दार्शनिक निरूपण।": "Philosophical exposition of the Mahavrata rite and Prana-vidya.",
  "महावाक्य 'प्रज्ञानं ब्रह्म' (चेतना ही ब्रह्म है)।": "Source of the Mahavakya 'Prajnanam Brahma' (Consciousness is Brahman).",
  "१४ काण्ड, १०० प्रपाठक — सबसे विशाल ब्राह्मण ग्रंथ।": "14 Kandas, 100 Prapathakas — The most monumental of all Vedic Brahmanas.",
  "नक्षत्रेष्टि, सौत्रामणी एवं अश्वमेध विधान।": "Nakshatreshti, Sautramani and Ashvamedha sacrificial procedures.",
  "१० प्रपाठक — ब्रह्मयज्ञ एवं प्राणोपासना।": "10 Prapathakas — Brahma-yajna meditation and sacred inward worship.",
  "महावाक्य 'अहं ब्रह्मास्मि' (मैं ही ब्रह्म हूँ)।": "Source of the profound Mahavakya 'Aham Brahmasmi' (I am Brahman).",
  "त्यागपूर्वक भोग का सनातन सिद्धांत।": "The eternal principle of joyful renunciation ('Tena tyaktena bhunjitha').",
  "यम और नचिकेता का आत्मविद्या संवाद।": "Dialogue on the immortality of the Self between Yama and Nachiketa.",
  "विशाल साम वैदिक याग विधान।": "Comprehensive ritual exposition of Saman chants in solemn sacrifices.",
  "अद्भुत शांति कर्म एवं अनुष्ठान।": "Extraordinary expiatory rites, omens, and auspicious peace rituals.",
  "सामगानों के प्रायश्चित्त व फल।": "Spiritual merits, fruits, and penances associated with Saman melodies.",
  "महावाक्य 'तत्त्वमसि' एवं ओंकार उद्गीथ उपासना।": "The Mahavakya 'Tat Tvam Asi' and profound meditation on Omkara Udgitha.",
  "परम ब्रह्म एवं आत्मज्ञान का उपदेश।": "Instruction on the unconditioned nature of the Supreme Brahman.",
  "अथर्ववेद का एकमात्र उपलब्ध प्रामाणिक ब्राह्मण ग्रंथ।": "The sole surviving authoritative Brahmana scripture of Atharvaveda.",
  "राष्ट्रीय आदर्श वाक्य 'सत्यमेव जयते' का मूल स्रोत।": "Primordial source of India's national motto 'Satyameva Jayate'.",
  "महावाक्य 'अयमात्मा ब्रह्म' एवं ओंकार की चार अवस्थाएँ।": "The Mahavakya 'Ayam Atma Brahma' and the 4 states of consciousness in AUM.",
  "महर्षि पिप्पलाद से ६ मुनियों के दार्शनिक प्रश्न।": "Six profound existential questions answered by Sage Pippalada.",
};

const TEXT_TITLE_TRANSLATIONS = {
  "१. अग्नि सूक्त (मण्डल १, सूक्त १)": "Agni Sukta (Mandala 1, Sukta 1)",
  "२. गायत्री महामंत्र (मण्डल ३, सूक्त ६२)": "Gayatri Mantra (Mandala 3, Sukta 62)",
  "२. गायत्री महामंत्र (मण्डल ३, सूक्त ६२.१०)": "Gayatri Mantra (Mandala 3, Sukta 62.10)",
  "३. महामृत्युंजय मंत्र (मण्डल ७, सूक्त ५९)": "Mahamrityunjaya Mantra (Mandala 7, Sukta 59)",
  "३. महामृत्युंजय मंत्र (मण्डल ७, सूक्त ५९.१२)": "Mahamrityunjaya Mantra (Mandala 7, Sukta 59.12)",
  "४. पुरुष सूक्त (मण्डल १०, सूक्त ९०)": "Purusha Sukta (Mandala 10, Sukta 90)",
  "५. नासदीय सूक्त (मण्डल १०, सूक्त १२९)": "Nasadiya Sukta (Mandala 10, Sukta 129)",
  "६. संगठन सूक्त (मण्डल १०, सूक्त १९१)": "Sangathan Sukta (Mandala 10, Sukta 191)",
  "१. दर्शपूर्णमास याग (अध्याय १ - इषे त्वोर्जे त्वा...)": "Adhyaya 1: Darshapurnamasa Yagya",
  "२. रुद्राध्याय / शतरुद्रिय (अध्याय १६ - नमस्ते रुद्र मन्यव...)": "Adhyaya 16: Sri Rudram / Shatarudriya",
  "३. शिवसंकल्प सूक्त (अध्याय ३४ - तन्मे मनः शिवसंकल्पमस्तु)": "Adhyaya 34: Shiva Sankalpa Sukta",
  "४. ईशावास्योपनिषद (अध्याय ४० - ईशा वास्यमिदं सर्वं...)": "Adhyaya 40: Isha Upanishad",
  "५. तैत्तिरीय संहिता (कृष्ण यजुर्वेद काण्ड १)": "Taittiriya Samhita (Kanda 1)",
  "१. आग्नेय काण्ड (अग्न आ याहि वीतये...)": "Purvarchika: Agneya Parva",
  "२. ऐन्द्र पर्व (त्वमग्ने यज्ञानां...)": "Purvarchika: Aindra Parva",
  "३. पवमान काण्ड (उच्चा ते जातमन्धसो...)": "Uttararchika: Pavamana Kanda",
  "१. मेधा जनन सूक्त (काण्ड १, सूक्त १ - ये त्रिषप्ताः परियन्ति...)": "Kanda 1: Medhajanana / Trisapta Sukta",
  "२. भूमि सूक्त / पृथ्वी सूक्त (काण्ड १२, सूक्त १ - माता भूमिः पुत्रोऽहं...)": "Kanda 12: Bhumi Sukta (Earth Anthem)",
  "३. विश्व शांति सूक्त (काण्ड १९, सूक्त ९ - द्यौः शान्तिरन्तरिक्षं...)": "Kanda 19: Vishva Shanti Sukta",
};

const TEXT_DESC_TRANSLATIONS = {
  "ऋग्वेद का प्रथम मंगलाचरण सूक्त (९ ऋचाएँ)": "Opening invocation of the Rigveda (9 verses in Gayatri metre).",
  "वेदमाता गायत्री — सविता देव के परम तेज की उपासना": "Vedamata Gayatri — Meditation on the solar splendor of Savitr.",
  "वेदमाता गायत्री — बुद्धि व तेज की प्रार्थना": "Vedamata Gayatri — Meditation on the solar splendor of Savitr.",
  "संजीवनी महामंत्र — मृत्युंजय शिव की उपासना": "Sanjeevani Mahamantra — Revering Shiva to transcend mortality.",
  "संजीवनी महामंत्र — अकाल मृत्यु व भवभय नाशक": "Sanjeevani Mahamantra — Revering Shiva to transcend mortality.",
  "ब्रह्माण्ड के विराट् पुरुष का स्वरूप व सृष्टि रचना": "Cosmic vision of the Universal Being and creation.",
  "विराट् पुरुष व सृष्टि का ब्रह्माण्डीय विज्ञान (१६ ऋचाएँ)": "Cosmic vision of the Universal Being and creation (16 verses).",
  "सृष्टि उत्पत्ति का ब्रह्माण्डीय चिंतन": "Profound cosmological contemplation on the origin of existence.",
  "सृष्टि उत्पत्ति का दार्शनिक चिंतन (७ ऋचाएँ)": "Profound cosmological contemplation on the origin of existence (7 verses).",
  "विश्व बंधुत्व एवं सामाजिक समरसता का अमर संदेश": "Immortal hymn of universal unity, concord, and collective purpose.",
  "सामूहिक सद्भाव व विश्व बंधुत्व का सूक्त (४ ऋचाएँ)": "Immortal hymn of universal unity, concord, and collective purpose (4 verses).",
  "यजुर्वेद का प्रथम अध्याय व मंगलाचरण": "First chapter of Yajurveda — Rites for new and full moon oblations.",
  "रुद्राभिषेक का मूल आधार (६६ मंत्र)": "The fountainhead of Rudrabhisheka revering the cosmic form of Rudra (66 mantras).",
  "रुद्राध्याय का मूल आधार (६६ मंत्र)": "The fountainhead of Rudrabhisheka revering the cosmic form of Rudra (66 mantras).",
  "मन की पवित्रता और दिव्य संकल्प (६ मंत्र)": "Hymn on pristine mental resolve and auspicious consciousness (6 mantras).",
  "कर्मयोग एवं आत्मज्ञान का शिरोमणि ग्रंथ (१८ मंत्र)": "Supreme revelation of Karma Yoga and Self-knowledge (18 mantras).",
  "दर्शपूर्णमास एवं सोमयाग विधि": "Foundational ceremonies and Soma rituals of Krishna Yajurveda.",
  "सामवेद का प्रथम सामगान मंगलाचरण": "Opening musical chant of Samaveda invoking Lord Agni.",
  "इन्द्र व अग्नि स्तुति सामगान": "Musical chants of Indra and Agni for spiritual vigor.",
  "पवमान सोम का दिव्य सामगान": "Sacred melodies celebrating spiritual bliss and immortality.",
  "वाचस्पति देव द्वारा बुद्धि व मेधा संवर्धन": "Invocation to the Lord of Speech for wisdom and intellect.",
  "विश्व का प्रथम पर्यावरण व मातृभूमि राष्ट्रगान": "The world's earliest ecological anthem celebrating Mother Earth.",
  "समस्त लोकों एवं प्रकृति में शांति की वैश्विक प्रार्थना": "Global prayer for cosmic, terrestrial, and spiritual peace.",
};

function translateStatsToEn(statsStr) {
  if (!statsStr || typeof statsStr !== "string") return statsStr;
  const devanagariNums = {
    "०": "0", "१": "1", "२": "2", "३": "3", "४": "4",
    "५": "5", "६": "6", "७": "7", "८": "8", "९": "9",
  };
  let en = statsStr.replace(/[०-९]/g, (d) => devanagariNums[d] || d);
  return en
    .replace(/मण्डल/g, "Mandalas")
    .replace(/सूक्त/g, "Suktas")
    .replace(/ऋचाएँ|ऋचा/g, "Verses")
    .replace(/मंत्र|मन्त्र/g, "Verses")
    .replace(/काण्ड/g, "Kandas")
    .replace(/अध्याय/g, "Chapters")
    .replace(/अनुवाक/g, "Anuvakas")
    .replace(/प्रपाठक/g, "Prapathakas")
    .replace(/ब्राह्मण ग्रंथ|ब्राह्मण/g, "Brahmanas")
    .replace(/आरण्यक ग्रंथ|आरण्यक/g, "Aranyakas")
    .replace(/उपनिषद ग्रंथ|उपनिषद/g, "Upanishads")
    .replace(/शाखाएँ|शाखा/g, "Recensions")
    .replace(/मुख्य/g, "Major")
    .replace(/अक्षर/g, "Syllables")
    .replace(/छंद/g, "Metre");
}

const localNodesList = [];
function collectNodes(n) {
  if (!n) return;
  localNodesList.push(n);
  if (n.children) n.children.forEach(collectNodes);
}
collectNodes(VEDA_HIERARCHY_TREE);

function findMatchingLocalTreeNode(remoteNode) {
  if (!remoteNode) return null;
  if (remoteNode.id) {
    const res = findNodeById(remoteNode.id);
    if (res && res.node) return res.node;
  }
  if (remoteNode.slug) {
    const res = findNodeById(remoteNode.slug);
    if (res && res.node) return res.node;
  }
  if (remoteNode.mantraId) {
    const res = findNodeById(remoteNode.mantraId);
    if (res && res.node) return res.node;
  }
  if (remoteNode.enName) {
    const byEn = localNodesList.find(
      (n) => n.enName && n.enName.trim().toLowerCase() === remoteNode.enName.trim().toLowerCase()
    );
    if (byEn) return byEn;
  }
  if (remoteNode.name) {
    const byName = localNodesList.find((n) => n.name && n.name.trim() === remoteNode.name.trim());
    if (byName) return byName;
  }
  const rNorm = (remoteNode.name || "")
    .replace(/^[०-९0-9a-zA-Z\.\s\-\–\—\(\)ivx\.]+/i, "")
    .replace(/[\(\)\—\–\-\:\,\.\s]/g, "");
  if (rNorm.length >= 3) {
    const bySub = localNodesList.find((n) => {
      if (n.id === "root") return false;
      const lNorm = (n.name || "")
        .replace(/^[०-९0-9a-zA-Z\.\s\-\–\—\(\)ivx\.]+/i, "")
        .replace(/[\(\)\—\–\-\:\,\.\s]/g, "");
      return lNorm.length >= 3 && (rNorm.includes(lNorm) || lNorm.includes(rNorm));
    });
    if (bySub) return bySub;
  }
  return null;
}

function mergeTreeNode(remoteNode) {
  if (!remoteNode) return remoteNode;
  const localMatch = findMatchingLocalTreeNode(remoteNode);

  const merged = {
    ...remoteNode,
    enName: remoteNode.enName || localMatch?.enName,
    enDesc: remoteNode.enDesc || localMatch?.enDesc || TEXT_DESC_TRANSLATIONS[remoteNode.desc],
    enStats: remoteNode.enStats || localMatch?.enStats || translateStatsToEn(remoteNode.stats),
    enPriest: remoteNode.enPriest || localMatch?.enPriest || PRIEST_MAP[remoteNode.priest],
    priest: remoteNode.priest || localMatch?.priest,
    badge: remoteNode.badge || localMatch?.badge,
  };

  if (Array.isArray(remoteNode.children) && remoteNode.children.length > 0) {
    merged.children = remoteNode.children.map(mergeTreeNode);
  }
  return merged;
}

function mergeAvailableTexts(remoteTexts, fallbackTexts) {
  return remoteTexts.map((remote, idx) => {
    let match = fallbackTexts.find(
      (f) =>
        (remote.mantraId && f.mantraId === remote.mantraId) ||
        (remote.slug && f.slug === remote.slug)
    );

    let treeMatch = null;
    if (remote.mantraId) {
      const res = findNodeById(remote.mantraId);
      if (res && res.node) treeMatch = res.node;
    }

    const enTitle =
      remote.enTitle ||
      TEXT_TITLE_TRANSLATIONS[remote.title] ||
      treeMatch?.enName ||
      match?.enTitle ||
      fallbackTexts[idx]?.enTitle;

    const enDesc =
      remote.enDesc ||
      TEXT_DESC_TRANSLATIONS[remote.desc] ||
      treeMatch?.enDesc ||
      match?.enDesc ||
      fallbackTexts[idx]?.enDesc;

    return {
      ...remote,
      enTitle,
      enDesc,
    };
  });
}

function mergeRelatedGranthas(remoteGranthas, fallbackGranthas) {
  return remoteGranthas.map((remote, idx) => {
    const match =
      fallbackGranthas.find(
        (f) =>
          (remote.slug && f.slug === remote.slug) ||
          (remote.name &&
            f.name &&
            (remote.name === f.name ||
              remote.name.includes(f.name) ||
              f.name.includes(remote.name)))
      ) || fallbackGranthas[idx];

    const enName =
      remote.enName ||
      GRANTHA_NAME_TRANSLATIONS[remote.name] ||
      match?.enName ||
      remote.name;

    const enAuthor =
      remote.enAuthor ||
      AUTHOR_TRANSLATIONS[remote.author] ||
      match?.enAuthor ||
      (remote.author ? remote.author : undefined);

    const enDesc =
      remote.enDesc ||
      GRANTHA_DESC_TRANSLATIONS[remote.desc] ||
      match?.enDesc ||
      (match?.desc ? match.enDesc : undefined);

    const enType = remote.enType || match?.enType;

    return {
      ...remote,
      enName,
      enAuthor,
      enDesc,
      enType,
    };
  });
}

export const VedicLibraryService = {
  /**
   * Fetch all Vedas from backend (with offline fallback)
   */
  async getVedas() {
    const endpoints = [
      `${API_BASE_URL}/library/vedas`,
      `${API_BASE_URL}/vedas`,
    ];

    for (const url of endpoints) {
      try {
        const result = await fetchWithTimeout(url);
        if (result && result.success && Array.isArray(result.data) && result.data.length > 0) {
          return {
            vedas: result.data.map(mergeTreeNode),
            isLive: true,
          };
        }
      } catch (err) {
        // Fallback
      }
    }

    return {
      vedas: VEDA_HIERARCHY_TREE.children || [],
      isLive: false,
    };
  },

  /**
   * Fetch Veda by Slug with its complete tree & metadata from backend (with offline fallback)
   */
  async getVedaBySlug(slug = "rigveda") {
    if (!slug) return null;

    const endpoints = [
      `${API_BASE_URL}/library/vedas/${slug}`,
      `${API_BASE_URL}/vedas/${slug}`,
    ];

    for (const url of endpoints) {
      try {
        const result = await fetchWithTimeout(url);
        if (result && result.success && result.data) {
          const vedaData = result.data;
          const key = `veda/${slug}`;
          const fallbackSubject =
            SUBJECTS_DATA[key] ||
            SUBJECTS_DATA[slug] ||
            SUBJECTS_DATA["veda/rigveda"];

          // Merge availableTexts
          const remoteTexts =
            Array.isArray(vedaData.availableTexts) && vedaData.availableTexts.length > 0
              ? vedaData.availableTexts
              : fallbackSubject.availableTexts || [];
          const mergedTexts = mergeAvailableTexts(
            remoteTexts,
            fallbackSubject.availableTexts || []
          );

          // Merge relatedGranthas
          const remoteGranthas =
            Array.isArray(vedaData.relatedGranthas) && vedaData.relatedGranthas.length > 0
              ? vedaData.relatedGranthas
              : fallbackSubject.relatedGranthas || [];
          const mergedGranthas = mergeRelatedGranthas(
            remoteGranthas,
            fallbackSubject.relatedGranthas || []
          );

          // Merge backend data with any missing UI fields from fallback
          const mergedSubject = {
            ...fallbackSubject,
            name: vedaData.name || fallbackSubject.name,
            enName: vedaData.enName || fallbackSubject.enName,
            eyebrow: vedaData.eyebrow || fallbackSubject.eyebrow,
            intro: vedaData.intro || fallbackSubject.intro,
            overviewText: vedaData.overviewText || fallbackSubject.overviewText,
            desc: vedaData.desc || fallbackSubject.desc,
            stats: vedaData.stats || fallbackSubject.stats,
            priest: vedaData.priest || fallbackSubject.priest,
            badge: vedaData.badge || fallbackSubject.badge,
            quickInfo: vedaData.quickInfo || fallbackSubject.quickInfo,
            rishis:
              Array.isArray(vedaData.rishis) && vedaData.rishis.length > 0
                ? vedaData.rishis
                : fallbackSubject.rishis,
            deities:
              Array.isArray(vedaData.deities) && vedaData.deities.length > 0
                ? vedaData.deities
                : fallbackSubject.deities,
            devatas:
              Array.isArray(vedaData.deities) && vedaData.deities.length > 0
                ? vedaData.deities
                : Array.isArray(vedaData.devatas) && vedaData.devatas.length > 0
                  ? vedaData.devatas
                  : fallbackSubject.devatas,
            availableTexts: mergedTexts,
            relatedGranthas: mergedGranthas,
          };

          // Recursively merge tree nodes with local curated metadata
          const rawTree = Array.isArray(vedaData.tree) ? vedaData.tree : [];
          const mergedChildren = rawTree.map(mergeTreeNode);

          const localRootMatch = findMatchingLocalTreeNode({
            id: vedaData.id || slug,
            slug,
          });

          // Hierarchical tree
          const treeNode = {
            id: vedaData.id || slug,
            slug: vedaData.slug || slug,
            name: vedaData.name || localRootMatch?.name,
            enName: vedaData.enName || localRootMatch?.enName,
            desc: vedaData.desc || localRootMatch?.desc,
            enDesc: vedaData.enDesc || localRootMatch?.enDesc,
            stats: vedaData.stats || localRootMatch?.stats,
            enStats:
              vedaData.enStats ||
              localRootMatch?.enStats ||
              translateStatsToEn(vedaData.stats),
            priest: vedaData.priest || localRootMatch?.priest,
            enPriest:
              vedaData.enPriest ||
              localRootMatch?.enPriest ||
              PRIEST_MAP[vedaData.priest],
            badge: vedaData.badge || localRootMatch?.badge,
            children: mergedChildren,
          };

          return {
            subjectData: mergedSubject,
            treeNode:
              treeNode.children && treeNode.children.length > 0 ? treeNode : null,
            isLive: true,
          };
        }
      } catch (err) {
        // Fallback
      }
    }

    // Local fallback
    const key = `veda/${slug}`;
    const subjectData =
      SUBJECTS_DATA[key] ||
      SUBJECTS_DATA[slug] ||
      (slug === "rigveda" ? SUBJECTS_DATA["veda/rigveda"] : null);
    const treeNode =
      VEDA_HIERARCHY_TREE.children.find((v) => v.id === slug || v.slug === slug) ||
      (slug === "rigveda" ? VEDA_HIERARCHY_TREE.children[0] : null);

    if (!subjectData && !treeNode) {
      return null;
    }

    return {
      subjectData,
      treeNode,
      isLive: false,
    };
  },

  /**
   * Fetch single Mantra by ID from backend (with offline fallback)
   */
  async getMantraById(mantraId = "rv-1-1-1") {
    if (!mantraId) return null;

    const endpoints = [
      `${API_BASE_URL}/library/mantras/${mantraId}`,
      `${API_BASE_URL}/mantras/${mantraId}`,
    ];

    for (const url of endpoints) {
      try {
        const result = await fetchWithTimeout(url);
        if (result && result.success && result.data) {
          const liveMantra = result.data;
          return {
            mantra: {
              ...liveMantra,
              padapatha: liveMantra.padapatha || [],
              chapterMantraIds: liveMantra.chapterMantraIds || [],
              siblings: liveMantra.siblings || [],
            },
            isLive: true,
          };
        }
      } catch (err) {
        // Fallback
      }
    }

    // Local fallback
    const localMantra = getMantraById(mantraId) || ALL_VEDIC_MANTRAS[0];
    return {
      mantra: localMantra,
      isLive: false,
    };
  },

  /**
   * Search Mantras (with offline fallback)
   */
  async searchMantras(params = {}) {
    const { query = "", vedaId = "all", page = 1, limit = 50 } = params;

    const queryParams = new URLSearchParams();
    if (query) queryParams.append("search", query);
    if (vedaId && vedaId !== "all") queryParams.append("vedaId", vedaId);
    if (page) queryParams.append("page", String(page));
    if (limit) queryParams.append("limit", String(limit));

    const endpoints = [
      `${API_BASE_URL}/library/mantras?${queryParams.toString()}`,
      `${API_BASE_URL}/mantras?${queryParams.toString()}`,
    ];

    for (const url of endpoints) {
      try {
        const result = await fetchWithTimeout(url);
        if (result && result.success && result.data && Array.isArray(result.data.mantras)) {
          return {
            mantras: result.data.mantras,
            pagination: result.data.pagination,
            isLive: true,
          };
        }
      } catch (err) {
        // Fallback
      }
    }

    // Local fallback search
    const filtered = ALL_VEDIC_MANTRAS.filter((m) => {
      if (vedaId !== "all" && m.vedaId !== vedaId) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase().trim();
      return (
        (m.id && m.id.toLowerCase().includes(q)) ||
        (m.textName && m.textName.toLowerCase().includes(q)) ||
        (m.sectionRef && m.sectionRef.toLowerCase().includes(q)) ||
        (m.sanskrit && m.sanskrit.toLowerCase().includes(q)) ||
        (m.hindiTranslation && m.hindiTranslation.toLowerCase().includes(q)) ||
        (m.englishTranslation && m.englishTranslation.toLowerCase().includes(q)) ||
        (m.hinglishTranslation && m.hinglishTranslation.toLowerCase().includes(q)) ||
        (m.rishi && m.rishi.toLowerCase().includes(q)) ||
        (m.devata && m.devata.toLowerCase().includes(q))
      );
    });

    return {
      mantras: filtered,
      pagination: {
        total: filtered.length,
        page: 1,
        limit: filtered.length,
        totalPages: 1,
      },
      isLive: false,
    };
  },
};

export default VedicLibraryService;
