// Master Veda Hierarchical Tree Data Model
// Full Vedic Taxonomy:
// Root (4 Vedas) -> Branches / Recensions (Shakhas) -> Texts (Samhitas, Brahmanas, Aranyakas, Upanishads, Sutras) -> Chapters / Suktas -> Mantras

export const VEDA_HIERARCHY_TREE = {
  id: "root",
  name: "वेद",
  enName: "Veda",
  children: [
    // ========================================================
    // 1. RIGVEDA (ऋग्वेद)
    // ========================================================
    {
      id: "rigveda",
      slug: "rigveda",
      name: "ऋग्वेद",
      enName: "Rigveda",
      desc: "ऋचाओं और सूक्तों का प्राचीनतम वैदिक संग्रह। स्तुति, ज्ञान, विज्ञान और आध्यात्मिक चेतना का मूल स्रोत।",
      enDesc: "The oldest Vedic corpus of verses and hymns. The primordial source of praise, wisdom, science, and spiritual consciousness.",
      stats: "१० मण्डल • १०२८ सूक्त • १०,५५२ मंत्र",
      enStats: "10 Mandalas • 1,028 Suktas • 10,552 Verses",
      priest: "होतृ (Hotri)",
      enPriest: "Hotri (Invoking Priest)",
      badge: "प्रधान श्रुति",
      imageKey: "card-rigveda.jpg",
      children: [
        {
          id: "shakala-shakha",
          name: "शाकल शाखा (Shakala Shakha)",
          enName: "Shakala Shakha",
          desc: "ऋग्वेद की वर्तमान में उपलब्ध मुख्य एवं प्रामाणिक शाखा।",
          enDesc: "The primary and authoritative extant recension of the Rigveda.",
          stats: "१० मण्डल • १०२८ सूक्त",
          enStats: "10 Mandalas • 1,028 Suktas",
          priest: "होतृ (Hotri)",
          enPriest: "Hotri (Invoking Priest)",
          badge: "शाखा",
          imageKey: "card-shakala-shakha.jpg",
          children: [
            {
              id: "rigveda-samhita",
              name: "क. ऋग्वेद संहिता (मूल मंत्र भाग)",
              enName: "Rigveda Samhita",
              desc: "१० मण्डल, १०२८ सूक्त, १०,५५२ ऋचाएँ — अग्नि सूक्त, पुरुष सूक्त, नासदीय सूक्त, गायत्री मंत्र।",
              enDesc: "10 Mandalas, 1,028 Suktas, 10,552 Verses — Agni Sukta, Purusha Sukta, Nasadiya Sukta, Gayatri Mantra.",
              stats: "१० मण्डल • १०२८ सूक्त • १०५५२ ऋचाएँ",
              enStats: "10 Mandalas • 1,028 Suktas • 10,552 Verses",
              badge: "संहिता ग्रंथ",
              imageKey: "card-samhita.jpg",
              children: [
                {
                  id: "rv-sukta-1",
                  name: "१. अग्नि सूक्त (मण्डल १, सूक्त १)",
                  enName: "Agni Sukta (Mandala 1, Sukta 1)",
                  desc: "ऋग्वेद का प्रथम सूक्त — ऋषि मधुच्छन्दा वैश्वामित्र कृत ९ ऋचाओं में अग्निदेव की महत्ता।",
                  enDesc: "First Sukta of Rigveda — 9 verses in praise of Agni by Sage Madhuchhanda Vaishvamitra.",
                  stats: "९ मंत्र • गायत्री छंद",
                  enStats: "9 Verses • Gayatri Metre",
                  badge: "सूक्त",
                  imageKey: "card-sukta-agni.jpg",
                  children: [
                    {
                      id: "rv-1-1-1",
                      name: "मंत्र १.१.१: ॐ अग्निमीळे पुरोहितं...",
                      enName: "Mantra 1.1.1 (Agnimile Purohitam)",
                      desc: "यज्ञ के पुरोहित, प्रकाशमान देव, ऋत्विक और रत्नों के धारक अग्निदेव की स्तुति।",
                      enDesc: "Praise of Agni as the priest of the sacrifice, radiant deity, invoking minister, and bestower of riches.",
                      stats: "ऋषि: मधुच्छन्दा • छंद: गायत्री",
                      enStats: "Sage: Madhuchhanda • Metre: Gayatri",
                      badge: "वेदमंत्र",
                      mantraId: "rv-1-1-1",
                      imageKey: "card-sukta-agni.jpg"
                    },
                    {
                      id: "rv-1-1-2",
                      name: "मंत्र १.१.२: अग्निः पूर्वेभिरृषिभिः...",
                      enName: "Mantra 1.1.2 (Agnih Purvebhir)",
                      desc: "पुरातन और नवीन दोनों ऋषियों द्वारा पूजित अग्निदेव का आह्वान।",
                      enDesc: "Invocation of Agni, adored by ancient and modern sages alike.",
                      stats: "ऋषि: मधुच्छन्दा • छंद: गायत्री",
                      enStats: "Sage: Madhuchhanda • Metre: Gayatri",
                      badge: "वेदमंत्र",
                      mantraId: "rv-1-1-2",
                      imageKey: "card-sukta-agni.jpg"
                    },
                    {
                      id: "rv-1-1-3",
                      name: "मंत्र १.१.३: अग्निना रयिमश्नवत्...",
                      enName: "Mantra 1.1.3 (Agnina Rayim)",
                      desc: "अग्नि के माध्यम से प्रतिदिन अक्षय यश और वीर संतान की प्राप्ति।",
                      enDesc: "Attainment of daily increasing prosperity, fame, and valiant heroic progeny through Agni.",
                      stats: "ऋषि: मधुच्छन्दा • छंद: गायत्री",
                      enStats: "Sage: Madhuchhanda • Metre: Gayatri",
                      badge: "वेदमंत्र",
                      mantraId: "rv-1-1-3",
                      imageKey: "card-sukta-agni.jpg"
                    }
                  ]
                },
                {
                  id: "rv-sukta-gayatri",
                  name: "२. गायत्री महामंत्र (मण्डल ३, सूक्त ६२)",
                  enName: "Gayatri Mantra (Mandala 3, Sukta 62)",
                  desc: "वेदमाता गायत्री — सविता देव के परम तेज का ध्यान एवं सद्बुद्धि की प्रार्थना।",
                  enDesc: "Vedamata Gayatri — Meditation on the solar illumination of Savitr for inspiring righteous intellect.",
                  stats: "मंत्र १० • २४ अक्षर",
                  enStats: "Mantra 10 • 24 Syllables",
                  badge: "महामंत्र",
                  mantraId: "rv-3-62-10",
                  imageKey: "card-sukta-gayatri.jpg"
                },
                {
                  id: "rv-sukta-purusha",
                  name: "३. पुरुष सूक्त (मण्डल १०, सूक्त ९०)",
                  enName: "Purusha Sukta (Mandala 10, Sukta 90)",
                  desc: "ब्रह्माण्ड के विराट् पुरुष का स्वरूप और सृष्टि उत्पत्ति का वैदिक विज्ञान।",
                  enDesc: "The nature of the Cosmic Being (Purusha) and the Vedic metaphysics of cosmic creation.",
                  stats: "१६ ऋचाएँ • अनुष्टुप् छंद",
                  enStats: "16 Verses • Anushtup Metre",
                  badge: "सूक्त",
                  mantraId: "rv-10-90-1",
                  imageKey: "card-sukta-purusha.jpg"
                },
                {
                  id: "rv-sukta-nasadiya",
                  name: "४. नासदीय सूक्त (मण्डल १०, सूक्त १२९)",
                  enName: "Nasadiya Sukta (Creation Hymn)",
                  desc: "सृष्टि के पूर्व क्या था? विश्व का सर्वाधिक प्राचीन एवं गूढ़ दार्शनिक सूक्त।",
                  enDesc: "What existed before creation? The world's most ancient and profound philosophical hymn.",
                  stats: "७ ऋचाएँ • त्रिष्टुप् छंद",
                  enStats: "7 Verses • Trishtup Metre",
                  badge: "दार्शनिक सूक्त",
                  mantraId: "rv-10-129-1",
                  imageKey: "card-sukta-nasadiya.jpg"
                },
                {
                  id: "rv-sukta-sangathan",
                  name: "५. संगठन सूक्त (मण्डल १०, सूक्त १९१)",
                  enName: "Sangathan Sukta (Unity Hymn)",
                  desc: "'सं गच्छध्वं सं वदध्वं' — सामूहिक एकता, सद्भाव और विश्व बंधुत्व का संदेश।",
                  enDesc: "'Walk together, speak together' — The eternal Vedic message of unity, harmony, and concord.",
                  stats: "४ ऋचाएँ • अनुष्टुप् छंद",
                  enStats: "4 Verses • Anushtup Metre",
                  badge: "सूक्त",
                  mantraId: "rv-10-191-2",
                  imageKey: "card-sukta-samgathan.jpg"
                }
              ]
            },
            {
              id: "rigveda-brahmana",
              name: "ख. ब्राह्मण ग्रंथ (ऐतरेय, कौषीतकि/शांखायन)",
              enName: "Rigveda Brahmana Texts",
              desc: "यज्ञ-विधान, कर्मकाण्ड एवं वैदिक आख्यानों का विस्तृत निरूपण।",
              enDesc: "Detailed exposition of ritual methodology, liturgical procedures, and Vedic legends.",
              stats: "२ ब्राह्मण ग्रंथ",
              enStats: "2 Brahmana Texts",
              badge: "ब्राह्मण ग्रंथ",
              imageKey: "card-brahmana.jpg",
              children: [
                {
                  id: "aitareya-brahmana",
                  name: "i. ऐतरेय ब्राह्मण",
                  enName: "Aitareya Brahmana",
                  desc: "महीदास ऐतरेय कृत — ४० अध्याय (८ पंचिका), सोमयाग व राज्याभिषेक विधान।",
                  enDesc: "By Mahidasa Aitareya — 40 chapters (8 Panchikas) on Soma sacrifices and royal consecration.",
                  stats: "४० अध्याय (८ पंचिका)",
                  enStats: "40 Chapters (8 Panchikas)",
                  badge: "ब्राह्मण",
                  imageKey: "card-grantha-aitareya.jpg"
                },
                {
                  id: "kaushitaki-brahmana",
                  name: "ii. कौषीतकि (शांखायन) ब्राह्मण",
                  enName: "Kaushitaki (Shankhayana) Brahmana",
                  desc: "३० अध्याय — हविर्यज्ञ, सोमयाग एवं ऋत्विजों के आचार-नियम।",
                  enDesc: "30 chapters — Oblation rites, Soma rituals, and conduct of officiating priests.",
                  stats: "३० अध्याय",
                  enStats: "30 Chapters",
                  badge: "ब्राह्मण",
                  imageKey: "card-brahmana.jpg"
                }
              ]
            },
            {
              id: "rigveda-aranyaka",
              name: "ग. आरण्यक ग्रंथ (ऐतरेय, कौषीतकि)",
              enName: "Rigveda Aranyaka Texts",
              desc: "अरण्य (वन) में चिंतन योग्य दार्शनिक एवं प्राण-विद्या परक ग्रंथ।",
              enDesc: "Forest treatises for contemplative inquiry, metaphysical symbolism, and vital breath (Prana).",
              stats: "२ आरण्यक ग्रंथ",
              enStats: "2 Aranyaka Texts",
              badge: "आरण्यक",
              imageKey: "card-aranyaka.jpg",
              children: [
                {
                  id: "aitareya-aranyaka",
                  name: "i. ऐतरेय आरण्यक",
                  enName: "Aitareya Aranyaka",
                  desc: "५ आरण्यक — महाव्रत, उक्थ एवं प्राण विद्या का तात्विक चिंतन।",
                  enDesc: "5 Aranyakas — Philosophical contemplation on the Mahavrata ceremony, Uktha, and Prana Vidya.",
                  stats: "५ आरण्यक",
                  enStats: "5 Aranyakas",
                  badge: "आरण्यक",
                  imageKey: "card-grantha-aitareya.jpg"
                },
                {
                  id: "kaushitaki-aranyaka",
                  name: "ii. कौषीतकि आरण्यक",
                  enName: "Kaushitaki Aranyaka",
                  desc: "१५ अध्याय — प्राणोपासना एवं अंतरग्निहोत्र का विधान।",
                  enDesc: "15 chapters — Meditation on Prana and inner ritualism (Antar-Agnihotra).",
                  stats: "१५ अध्याय",
                  enStats: "15 Chapters",
                  badge: "आरण्यक",
                  imageKey: "card-aranyaka.jpg"
                }
              ]
            },
            {
              id: "rigveda-upanishad",
              name: "घ. उपनिषद ग्रंथ (ऐतरेय, कौषीतकि)",
              enName: "Rigveda Upanishad Texts",
              desc: "परम आत्मतत्व एवं ब्रह्मविद्या का अमृतमय उपदेश।",
              enDesc: "Nectarine teachings on the supreme Self (Atman) and Brahman-realization.",
              stats: "२ मुख्य उपनिषद",
              enStats: "2 Principal Upanishads",
              badge: "उपनिषद",
              imageKey: "card-upanishad.jpg",
              children: [
                {
                  id: "aitareya-upanishad",
                  name: "i. ऐतरेय उपनिषद",
                  enName: "Aitareya Upanishad",
                  desc: "ऋग्वेद का प्रधान उपनिषद — महावाक्य 'प्रज्ञानं ब्रह्म' (चेतना ही ब्रह्म है)।",
                  enDesc: "Principal Upanishad of Rigveda — Mahavakya 'Prajnanam Brahma' (Consciousness is Brahman).",
                  stats: "३ अध्याय • 'प्रज्ञानं ब्रह्म'",
                  enStats: "3 Chapters • 'Prajnanam Brahma'",
                  badge: "मुख्य उपनिषद",
                  imageKey: "card-grantha-aitareya.jpg"
                },
                {
                  id: "kaushitaki-upanishad",
                  name: "ii. कौषीतकि उपनिषद",
                  enName: "Kaushitaki Upanishad",
                  desc: "४ अध्याय — देवयान व पितृयान मार्ग, प्राणो ब्रह्म एवं प्रतर्दन विद्या।",
                  enDesc: "4 chapters — The Devayana and Pitriyana paths, Prana as Brahman, and Pratardana Vidya.",
                  stats: "४ अध्याय",
                  enStats: "4 Chapters",
                  badge: "उपनिषद",
                  imageKey: "card-upanishad.jpg"
                }
              ]
            },
            {
              id: "rigveda-kalpa-sutra",
              name: "ङ. ऋग्वेद के कल्प, सूत्र व प्रातिशाख्य ग्रंथ",
              enName: "Rigveda Kalpa, Sutras & Pratishakhya",
              desc: "श्रौत, गृह्य सूत्र एवं वर्णोच्चारण नियम।",
              enDesc: "Shrauta rites, domestic Grihya rituals, and phonetic pronunciation treatises.",
              stats: "सूत्र एवं प्रातिशाख्य",
              enStats: "Sutras & Pratishakhya",
              badge: "सूत्र ग्रंथ",
              imageKey: "card-kalpa.jpg",
              children: [
                {
                  id: "ashvalayana-shrauta",
                  name: "i. आश्वलायन व शांखायन श्रौतसूत्र",
                  enName: "Ashvalayana & Shankhayana Shrautasutra",
                  desc: "होतृ ऋत्विक द्वारा संपन्न किए जाने वाले श्रौत यागों का विधान।",
                  enDesc: "Liturgical guidelines for solemn Shrauta sacrifices conducted by the Hotri priest.",
                  stats: "श्रौतसूत्र",
                  enStats: "Shrautasutra",
                  badge: "कल्पसूत्र",
                  imageKey: "card-shrautasutra.jpg"
                },
                {
                  id: "ashvalayana-grihya",
                  name: "ii. आश्वलायन व पारस्कर गृह्यसूत्र",
                  enName: "Ashvalayana & Paraskara Grihyasutra",
                  desc: "दैनिक पंचमहायज्ञ एवं १६ गृह्य संस्कारों का शास्त्रीय क्रम।",
                  enDesc: "Classical procedure of five daily sacrifices (Pancha Mahayajna) and 16 domestic rites (Samskaras).",
                  stats: "गृह्यसूत्र",
                  enStats: "Grihyasutra",
                  badge: "कल्पसूत्र",
                  imageKey: "card-grihyasutra.jpg"
                },
                {
                  id: "rigveda-pratishakhya",
                  name: "iii. ऋग्वेद प्रातिशाख्य (उच्चारण नियम)",
                  enName: "Rigveda Pratishakhya",
                  desc: "महर्षि शौनक कृत — शुद्ध वर्णोच्चारण, स्वर प्रक्रिया एवं संधि नियम।",
                  enDesc: "By Maharshi Shaunaka — Phonetic rules for flawless pronunciation, accents, and euphony.",
                  stats: "उच्चारण शास्त्र",
                  enStats: "Phonetics & Grammar",
                  badge: "प्रातिशाख्य",
                  imageKey: "card-pratishakhya.jpg"
                }
              ]
            }
          ]
        }
      ]
    },

    // ========================================================
    // 2. YAJURVEDA (यजुर्वेद)
    // ========================================================
    {
      id: "yajurveda",
      slug: "yajurveda",
      name: "यजुर्वेद",
      enName: "Yajurveda",
      desc: "यज्ञ, कर्म एवं अनुष्ठानिक क्रियाओं का वेद। शुक्ल और कृष्ण शाखा परंपरा में विभक्त।",
      enDesc: "The Veda of rituals, liturgical actions, and sacrifice, divided into Shukla and Krishna traditions.",
      stats: "४० अध्याय • १९७५ मंत्र",
      enStats: "40 Chapters • 1,975 Verses",
      priest: "अध्वर्यु (Adhvaryu)",
      enPriest: "Adhvaryu (Officiating Priest)",
      badge: "कर्मकाण्ड एवं ज्ञान",
      imageKey: "card-yajurveda.jpg",
      children: [
        // ----------------------------------------------------
        // A. SHUKLA YAJURVEDA
        // ----------------------------------------------------
        {
          id: "shukla-yajurveda",
          name: "A. शुक्ल यजुर्वेद (Shukla Yajurveda)",
          enName: "Shukla Yajurveda",
          desc: "वाजसनेयि परंपरा — याज्ञवल्क्य ऋषि द्वारा संकलित विशुद्ध मंत्र भाग।",
          enDesc: "Vajasaneyi tradition — Pristine verse portion compiled by Rishi Yajnavalkya.",
          stats: "माध्यन्दिना, काण्व व सूत्र",
          enStats: "Madhyandina, Kanva & Sutras",
          priest: "अध्वर्यु (Adhvaryu)",
          enPriest: "Adhvaryu (Officiating Priest)",
          badge: "मुख्य परंपरा",
          imageKey: "card-yajurveda.jpg",
          children: [
            {
              id: "madhyandina-shakha",
              name: "1. माध्यन्दिना शाखा (Madhyandina)",
              enName: "Madhyandina Shakha",
              desc: "उत्तर व मध्य भारत में सर्वाधिक प्रचलित वाजसनेयि शाखा।",
              enDesc: "The most widely chanted Vajasaneyi Shakha in North and Central India.",
              stats: "४० अध्याय • १९७५ मंत्र",
              enStats: "40 Chapters • 1,975 Verses",
              priest: "अध्वर्यु (Adhvaryu)",
              enPriest: "Adhvaryu (Officiating Priest)",
              badge: "शाखा",
              imageKey: "card-madhyandina-shakha.jpg",
              children: [
                {
                  id: "madhyandina-samhita",
                  name: "क. माध्यन्दिना संहिता (वाजसनेयि संहिता)",
                  enName: "Madhyandina Samhita (Vajasaneyi)",
                  desc: "४० अध्याय, १९७५ मंत्र — रुद्राध्याय (अध्याय १६), शिवसंकल्प (अध्याय ३४), ईशावास्य (अध्याय ४०)।",
                  enDesc: "40 Chapters, 1,975 Verses — Rudradhyaya (Ch 16), Shiva Sankalpa (Ch 34), Ishavasya (Ch 40).",
                  stats: "४० अध्याय • १९७५ मंत्र",
                  enStats: "40 Chapters • 1,975 Verses",
                  badge: "संहिता",
                  imageKey: "card-samhita.jpg",
                  children: [
                    {
                      id: "vs-adhyaya-1",
                      name: "१. अध्याय १: दर्शपूर्णमास याग (इषे त्वोर्जे त्वा...)",
                      enName: "Adhyaya 1: Darshapurnamasa Yagya",
                      desc: "यजुर्वेद का प्रथम अध्याय — पवित्र पलाश शाखा छेदन एवं हवि निर्माण।",
                      enDesc: "First chapter of Yajurveda — Cutting of sacred Palasha branch and preparation of oblation.",
                      stats: "३१ मंत्र",
                      enStats: "31 Verses",
                      badge: "अध्याय",
                      mantraId: "vs-1-1",
                      imageKey: "card-samhita.jpg"
                    },
                    {
                      id: "vs-adhyaya-16",
                      name: "२. अध्याय १६: रुद्राध्याय / शतरुद्रिय (नमस्ते रुद्र मन्यव...)",
                      enName: "Adhyaya 16: Sri Rudram / Shatarudriya",
                      desc: "भगवान रुद्र के १००+ पावन नामों एवं विश्वरूप की स्तुति (रुद्राभिषेक का मूल आधार)।",
                      enDesc: "Praise of 100+ sacred names and cosmic form of Lord Rudra (Fountainhead of Rudrabhisheka).",
                      stats: "६६ मंत्र • नमकम-चमकम",
                      enStats: "66 Verses • Namakam-Chamakam",
                      badge: "रुद्राध्याय",
                      mantraId: "vs-16-1",
                      imageKey: "card-sukta-rudra.jpg"
                    },
                    {
                      id: "vs-adhyaya-34",
                      name: "३. अध्याय ३४: शिवसंकल्प सूक्त (तन्मे मनः शिवसंकल्पमस्तु)",
                      enName: "Adhyaya 34: Shiva Sankalpa Sukta",
                      desc: "मन की पवित्रता, उदात्त संकल्प एवं मानसिक एकाग्रता का महासूक्त।",
                      enDesc: "Great hymn on purity of mind, noble resolve, and mental focus.",
                      stats: "६ मंत्र",
                      enStats: "6 Verses",
                      badge: "सूक्त",
                      mantraId: "vs-34-1",
                      imageKey: "card-sukta-mrityunjaya.jpg"
                    },
                    {
                      id: "vs-adhyaya-40",
                      name: "४. अध्याय ४०: ईशावास्योपनिषद (ईशा वास्यमिदं सर्वं...)",
                      enName: "Adhyaya 40: Isha Upanishad",
                      desc: "यजुर्वेद का अंतिम अध्याय — कर्मयोग, त्याग और आत्मज्ञान का मूल आधार।",
                      enDesc: "Concluding chapter of Yajurveda — Foundations of Karma Yoga, renunciation, and Self-knowledge.",
                      stats: "१८ मंत्र",
                      enStats: "18 Verses",
                      badge: "उपनिषद",
                      mantraId: "vs-40-1",
                      imageKey: "card-grantha-isha.jpg"
                    }
                  ]
                },
                {
                  id: "madhyandina-shatapatha",
                  name: "ख. शतपथ ब्राह्मण (माध्यन्दिना पाठ)",
                  enName: "Shatapatha Brahmana (Madhyandina)",
                  desc: "१४ काण्ड, १०० प्रपाठक, ४३८ ब्राह्मण — वैदिक वांग्मय का सबसे विशाल ब्राह्मण ग्रंथ।",
                  enDesc: "14 Kandas, 100 Prapathakas, 438 Brahmanas — The largest Brahmana text in Vedic literature.",
                  stats: "१४ काण्ड • १०० प्रपाठक",
                  enStats: "14 Kandas • 100 Prapathakas",
                  badge: "ब्राह्मण",
                  imageKey: "card-grantha-shatapatha.jpg"
                },
                {
                  id: "madhyandina-upanishad",
                  name: "ग. उपनिषद (ईशावास्योपनिषद और बृहदारण्यकोपनिषद)",
                  enName: "Upanishads (Isha & Brihadaranyaka)",
                  desc: "ईशावास्योपनिषद् और बृहदारण्यकोपनिषद् ('अहं ब्रह्मास्मि')।",
                  enDesc: "Isha Upanishad and Brihadaranyaka Upanishad ('Aham Brahmasmi').",
                  stats: "ईश व बृहदारण्यक",
                  enStats: "Isha & Brihadaranyaka",
                  badge: "उपनिषद",
                  imageKey: "card-grantha-brihadaranyaka.jpg"
                }
              ]
            },
            {
              id: "kanva-shakha",
              name: "2. काण्व शाखा (Kanva)",
              enName: "Kanva Shakha",
              desc: "दक्षिण व पूर्व भारत में प्रचलित वाजसनेयि शाखा।",
              enDesc: "Prevalent Vajasaneyi Shakha in South and East India.",
              stats: "४० अध्याय • २०८६ मंत्र",
              enStats: "40 Chapters • 2,086 Verses",
              priest: "अध्वर्यु (Adhvaryu)",
              enPriest: "Adhvaryu (Officiating Priest)",
              badge: "शाखा",
              imageKey: "card-kanva-shakha.jpg",
              children: [
                {
                  id: "kanva-samhita",
                  name: "क. काण्व संहिता",
                  enName: "Kanva Samhita",
                  desc: "४० अध्याय, ३२८ अनुवाक, २०८६ मंत्र — काण्व पाठ परंपरा।",
                  enDesc: "40 Chapters, 328 Anuvakas, 2,086 Verses — Kanva recension text.",
                  stats: "४० अध्याय • २०८६ मंत्र",
                  enStats: "40 Chapters • 2,086 Verses",
                  badge: "संहिता",
                  imageKey: "card-samhita.jpg"
                },
                {
                  id: "kanva-shatapatha",
                  name: "ख. शतपथ ब्राह्मण (काण्व पाठ)",
                  enName: "Shatapatha Brahmana (Kanva)",
                  desc: "१७ काण्ड, १०४ प्रपाठक — काण्व पाठ का शतपथ ब्राह्मण।",
                  enDesc: "17 Kandas, 104 Prapathakas — Shatapatha Brahmana of the Kanva tradition.",
                  stats: "१७ काण्ड • १०४ प्रपाठक",
                  enStats: "17 Kandas • 104 Prapathakas",
                  badge: "ब्राह्मण",
                  imageKey: "card-grantha-shatapatha.jpg"
                },
                {
                  id: "kanva-upanishad",
                  name: "ग. उपनिषद (काण्व मत का ईश और बृहदारण्यक)",
                  enName: "Upanishad Texts (Kanva Tradition)",
                  desc: "काण्व ईशावास्योपनिषद् एवं काण्व बृहदारण्यकोपनिषद्।",
                  enDesc: "Kanva recension of Isha Upanishad and Brihadaranyaka Upanishad.",
                  stats: "काण्व उपनिषद",
                  enStats: "Kanva Upanishads",
                  badge: "उपनिषद",
                  imageKey: "card-grantha-brihadaranyaka.jpg"
                }
              ]
            },
            {
              id: "shukla-kalpa-sutras",
              name: "3. शुक्ल यजुर्वेद के कल्प व सूत्र ग्रंथ (पारस्कर गृह्यसूत्र, कात्यायन श्रौतसूत्र आदि)",
              enName: "Shukla Yajurveda Kalpa & Sutras",
              desc: "पारस्कर गृह्यसूत्र, कात्यायन श्रौतसूत्र, कात्यायन शुल्बसूत्र एवं शुक्ल यजुः प्रातिशाख्य।",
              enDesc: "Paraskara Grihyasutra, Katyayana Shrautasutra, Katyayana Shulbasutra and Shukla Yajuh Pratishakhya.",
              stats: "पारस्कर, कात्यायन आदि सूत्र",
              enStats: "Paraskara, Katyayana Sutras",
              badge: "सूत्र ग्रंथ",
              imageKey: "card-shrautasutra.jpg"
            }
          ]
        },

        // ----------------------------------------------------
        // B. KRISHNA YAJURVEDA
        // ----------------------------------------------------
        {
          id: "krishna-yajurveda",
          name: "B. कृष्ण यजुर्वेद (Krishna Yajurveda)",
          enName: "Krishna Yajurveda",
          desc: "चरक परंपरा — मंत्र और ब्राह्मण भाग का संयुक्त संकलन। तैत्तिरीय, मैत्रायणी, कठ एवं कपिष्ठल शाखाएँ।",
          enDesc: "Charaka tradition — Combined corpus of mantras and Brahmana commentary. Taittiriya, Maitrayani, Katha, and Kapishthala recensions.",
          stats: "४ मुख्य शाखाएँ",
          enStats: "4 Major Shakhas",
          priest: "अध्वर्यु (Adhvaryu)",
          enPriest: "Adhvaryu (Officiating Priest)",
          badge: "मुख्य परंपरा",
          imageKey: "card-yajurveda.jpg",
          children: [
            {
              id: "taittiriya-shakha",
              name: "1. तैत्तिरीय शाखा (Taittiriya)",
              enName: "Taittiriya Shakha",
              desc: "दक्षिण भारत में सर्वाधिक अध्ययन की जाने वाली कृष्ण यजुर्वेद की शाखा।",
              enDesc: "The most widely studied Krishna Yajurveda Shakha in South India.",
              stats: "७ काण्ड • ४४ प्रपाठक",
              enStats: "7 Kandas • 44 Prapathakas",
              priest: "अध्वर्यु (Adhvaryu)",
              enPriest: "Adhvaryu (Officiating Priest)",
              badge: "शाखा",
              imageKey: "card-taittiriya-shakha.jpg",
              children: [
                {
                  id: "taittiriya-samhita",
                  name: "क. तैत्तिरीय संहिता",
                  enName: "Taittiriya Samhita",
                  desc: "७ काण्ड, ४४ प्रपाठक, ६५१ अनुवाक, २१९८ कंडिकाएँ — दर्शपूर्णमास, सोमयाग, अग्निचयन।",
                  enDesc: "7 Kandas, 44 Prapathakas, 651 Anuvakas, 2,198 Kandikas — Darshapurnamasa, Somayaga, Agnichayana.",
                  stats: "७ काण्ड • ४४ प्रपाठक",
                  enStats: "7 Kandas • 44 Prapathakas",
                  badge: "संहिता",
                  imageKey: "card-samhita.jpg",
                  children: [
                    {
                      id: "ts-kanda-1",
                      name: "१. काण्ड १: दर्शपूर्णमास व सोमयाग (इषे त्वोर्जे त्वा...)",
                      enName: "Kanda 1: Darshapurnamasa & Soma Yagya",
                      desc: "पवित्र काष्ठ छेदन, हवि निर्माण एवं सोमयाग के यजुर्मंत्र।",
                      enDesc: "Sacred wood preparation, oblation formulas, and Somayaga Yajus mantras.",
                      stats: "८ प्रपाठक",
                      enStats: "8 Prapathakas",
                      badge: "काण्ड",
                      mantraId: "ts-1-1-1",
                      imageKey: "card-samhita.jpg"
                    },
                    {
                      id: "ts-kanda-4",
                      name: "२. काण्ड ४: अग्निचयन एवं श्रीरुद्रम्",
                      enName: "Kanda 4: Agnichayana & Sri Rudram",
                      desc: "वेदिका निर्माण, श्येनचिति एवं तैत्तिरीय पाठ का चमकम-नमकम।",
                      enDesc: "Altar construction, Shyena-chiti, and Taittiriya text of Chamakam-Namakam.",
                      stats: "७ प्रपाठक",
                      enStats: "7 Prapathakas",
                      badge: "काण्ड",
                      imageKey: "card-sukta-rudra.jpg"
                    }
                  ]
                },
                {
                  id: "taittiriya-brahmana",
                  name: "ख. तैत्तिरीय ब्राह्मण",
                  enName: "Taittiriya Brahmana",
                  desc: "३ काण्ड — नक्षत्रेष्टि, सौत्रामणी, पुरुषमेध एवं अश्वमेध यागों का विशद वर्णन।",
                  enDesc: "3 Kandas — Detailed ritual instructions on Nakshtreshti, Sautramani, Purushamedha, and Ashvamedha.",
                  stats: "३ काण्ड • २८ प्रपाठक",
                  enStats: "3 Kandas • 28 Prapathakas",
                  badge: "ब्राह्मण",
                  imageKey: "card-brahmana.jpg"
                },
                {
                  id: "taittiriya-aranyaka",
                  name: "ग. तैत्तिरीय आरण्यक",
                  enName: "Taittiriya Aranyaka",
                  desc: "१० प्रपाठक — आरुणेतुक चयन, ब्रह्मयज्ञ एवं पितृमेध। ७-९वाँ प्रपाठक तैत्तिरीय उपनिषद है।",
                  enDesc: "10 Prapathakas — Arunetuka ritual, Brahmayajna, and Pitrimedha. Chapters 7-9 constitute the Taittiriya Upanishad.",
                  stats: "१० प्रपाठक",
                  enStats: "10 Prapathakas",
                  badge: "आरण्यक",
                  imageKey: "card-aranyaka.jpg"
                },
                {
                  id: "taittiriya-upanishad-group",
                  name: "घ. उपनिषद (तैत्तिरीय, महानारायण, श्वेताश्वतर)",
                  enName: "Taittiriya Upanishad Texts",
                  desc: "शिक्षावल्ली, ब्रह्मानन्दवल्ली, भृगुवल्ली ('सत्यं वद धर्मं चर') एवं महानारायणोपनिषद।",
                  enDesc: "Shikshavalli, Brahmanandavalli, Bhriguvalli ('Satyam Vada Dharmam Chara') and Mahanarayana Upanishad.",
                  stats: "३ प्रमुख उपनिषद",
                  enStats: "3 Principal Upanishads",
                  badge: "उपनिषद",
                  imageKey: "card-upanishad.jpg"
                }
              ]
            },
            {
              id: "maitrayani-shakha",
              name: "2. मैत्रायणी शाखा (Maitrayani Samhita)",
              enName: "Maitrayani Shakha",
              desc: "४ काण्ड, ५४ प्रपाठक — गुजरात व महाराष्ट्र में सुरक्षित प्राचीन शाखा।",
              enDesc: "4 Kandas, 54 Prapathakas — Ancient Shakha preserved in Gujarat and Maharashtra.",
              stats: "४ काण्ड • ५४ प्रपाठक",
              enStats: "4 Kandas • 54 Prapathakas",
              priest: "अध्वर्यु (Adhvaryu)",
              enPriest: "Adhvaryu (Officiating Priest)",
              badge: "शाखा",
              imageKey: "card-samhita.jpg"
            },
            {
              id: "katha-shakha",
              name: "3. कठ / काठक शाखा (Kathaka Samhita & कठोपनिषद)",
              enName: "Katha (Kathaka) Shakha",
              desc: "काठक संहिता (५ खंड, ४० स्थानक) एवं विश्वप्रसिद्ध कठोपनिषद (यम-नचिकेता संवाद)।",
              enDesc: "Kathaka Samhita (5 sections, 40 Sthanakas) and world-renowned Katha Upanishad (Yama-Nachiketa dialogue).",
              stats: "काठक संहिता व कठोपनिषद",
              enStats: "Kathaka Samhita & Katha Upanishad",
              priest: "अध्वर्यु (Adhvaryu)",
              enPriest: "Adhvaryu (Officiating Priest)",
              badge: "शाखा",
              imageKey: "card-grantha-katha.jpg"
            },
            {
              id: "kapisthala-shakha",
              name: "4. कपिष्ठल शाखा (Kapisthala Samhita)",
              enName: "Kapisthala Shakha",
              desc: "८ अष्टक — कपिष्ठल कठ संहिता (खंडित उपलब्ध अंश)।",
              enDesc: "8 Ashtakas — Kapishthala Katha Samhita (Extant fragments).",
              stats: "८ अष्टक (अपूर्ण)",
              enStats: "8 Ashtakas (Incomplete)",
              priest: "अध्वर्यु (Adhvaryu)",
              enPriest: "Adhvaryu (Officiating Priest)",
              badge: "शाखा",
              imageKey: "card-samhita.jpg"
            },
            {
              id: "krishna-kalpa-sutras",
              name: "5. कृष्ण यजुर्वेद के सूत्र ग्रंथ (आपस्तम्ब, बौधायन, मानव कल्पसूत्र)",
              enName: "Krishna Yajurveda Sutra Texts",
              desc: "बौधायन, आपस्तम्ब, सत्याषाढ़ (हिरण्यकेशी), वैखानस, भारद्वाज, मानव, वाराह कल्पसूत्र।",
              enDesc: "Baudhayana, Apastamba, Satyashadha (Hiranyakeshi), Vaikhanasa, Bharadvaja, Manava, and Varaha Kalpasutras.",
              stats: "श्रौत, गृह्य, धर्म व शुल्बसूत्र",
              enStats: "Shrauta, Grihya, Dharma & Shulbasutras",
              badge: "सूत्र ग्रंथ",
              imageKey: "card-kalpa.jpg"
            }
          ]
        }
      ]
    },

    // ========================================================
    // 3. SAMAVEDA (सामवेद)
    // ========================================================
    {
      id: "samaveda",
      slug: "samaveda",
      name: "सामवेद",
      enName: "Samaveda",
      desc: "गायकी, संगीतमय ऋचाओं एवं सामगान का दिव्य वेद। भगवान श्रीकृष्ण ने गीता में कहा: 'वेदानां सामवेदोऽस्मि'।",
      enDesc: "The divine Veda of melody, musical chanting, and celestial adoration. In Gita, Lord Krishna said: 'Vedanam Samavedo Asmi'.",
      stats: "१८७५ मंत्र • कौथुम, राणायनीय, जैमिनीय",
      enStats: "1,875 Verses • Kauthuma, Ranayaniya, Jaiminiya",
      priest: "उद्गातृ (Udgatri)",
      enPriest: "Udgatri (Chanting Priest)",
      badge: "संगीत एवं उपासना",
      imageKey: "card-samaveda.jpg",
      children: [
        {
          id: "kauthuma-shakha",
          name: "A. कौथुम शाखा (Kauthuma)",
          enName: "Kauthuma Shakha",
          desc: "गुजरात, उत्तर भारत एवं बंगाल में सर्वाधिक प्रचलित सामवेद की शाखा।",
          enDesc: "Most widely practiced Shakha of Samaveda in Gujarat, North India, and Bengal.",
          stats: "पूर्वार्चिक व उत्तरार्चिक",
          enStats: "Purvarchika & Uttararchika",
          priest: "उद्गातृ (Udgatri)",
          enPriest: "Udgatri (Chanting Priest)",
          badge: "शाखा",
          imageKey: "card-kauthuma-shakha.jpg",
          children: [
            {
              id: "kauthuma-samhita",
              name: "क. कौथुम सामवेद संहिता",
              enName: "Kauthuma Samaveda Samhita",
              desc: "पूर्वार्चिक (६ प्रपाठक, ६५० ऋचाएँ) और उत्तरार्चिक (९ प्रपाठक, १२२५ ऋचाएँ)।",
              enDesc: "Purvarchika (6 Prapathakas, 650 verses) and Uttararchika (9 Prapathakas, 1225 verses).",
              stats: "१८७५ मंत्र",
              enStats: "1,875 Verses",
              badge: "संहिता",
              imageKey: "card-samhita.jpg",
              children: [
                {
                  id: "sv-purvarchika-1",
                  name: "१. पूर्वार्चिक: आग्नेय पर्व (अग्न आ याहि वीतये...)",
                  enName: "Purvarchika: Agneya Parva",
                  desc: "सामवेद का प्रथम मंगलाचरण मंत्र — उद्गाता द्वारा अग्निदेव का संगीतमय आवाहन।",
                  enDesc: "Opening benedictory chant of Samaveda — musical invocation of Agni by the Udgatri priest.",
                  stats: "प्रपाठक १ • मंत्र १.१",
                  enStats: "Prapathaka 1 • Mantra 1.1",
                  badge: "पर्व",
                  mantraId: "sv-1-1-1",
                  imageKey: "card-sukta-agni.jpg"
                },
                {
                  id: "sv-purvarchika-2",
                  name: "२. पूर्वार्चिक: ऐन्द्र पर्व (त्वमग्ने यज्ञानां...)",
                  enName: "Purvarchika: Aindra Parva",
                  desc: "इन्द्र व अग्नि स्तुति सामगान — दिव्य तेज एवं सामर्थ्य का सामगान।",
                  enDesc: "Musical praise chants of Indra and Agni — invoking divine brilliance and spiritual potency.",
                  stats: "प्रपाठक १ • मंत्र १.२",
                  enStats: "Prapathaka 1 • Mantra 1.2",
                  badge: "पर्व",
                  mantraId: "sv-1-1-2",
                  imageKey: "card-sukta-agni.jpg"
                },
                {
                  id: "sv-uttararchika-1",
                  name: "३. उत्तरार्चिक: पवमान काण्ड (उच्चा ते जातमन्धसो...)",
                  enName: "Uttararchika: Pavamana Kanda",
                  desc: "पवमान सोम का दिव्य सामगान — आत्मिक आनंद एवं अमृतत्व का गान।",
                  enDesc: "Sacred melodic chanting of Pavamana Soma — celebrating spiritual bliss and divine immortality.",
                  stats: "प्रपाठक २ • मंत्र २.१",
                  enStats: "Prapathaka 2 • Mantra 2.1",
                  badge: "पर्व",
                  mantraId: "sv-2-1-1",
                  imageKey: "card-sukta-soma.jpg"
                }
              ]
            },
            {
              id: "kauthuma-brahmanas",
              name: "ख. कौथुम ब्राह्मण ग्रंथ (ताण्ड्य, षड्विंश, सामविधान आदि ८ ब्राह्मण)",
              enName: "Kauthuma Brahmana Texts (8 Brahmanas)",
              desc: "ताण्ड्य (पंचविंश/महाब्राह्मण), षड्विंश, सामविधान, आर्षेय, देवताध्याय, उपनिषद्, संहितोपनिषद्, वंश ब्राह्मण।",
              enDesc: "Tandya (Panchavimsha / Mahabrahmana), Shadvimsha, Samavidhana, Arsheya, Daivatadhyaya, Upanishad, Samhitopanishad, and Vamsha Brahmana.",
              stats: "८ ब्राह्मण ग्रंथ",
              enStats: "8 Brahmana Texts",
              badge: "ब्राह्मण",
              imageKey: "card-brahmana.jpg"
            },
            {
              id: "kauthuma-upanishad",
              name: "ग. उपनिषद (छान्दोग्य उपनिषद)",
              enName: "Chandogya Upanishad",
              desc: "सामवेद का सबसे विशाल उपनिषद — महावाक्य 'तत्त्वमसि' (वह तुम ही हो), उद्गीथ उपासना एवं शांडिल्य विद्या।",
              enDesc: "Largest Upanishad of Samaveda — Contains the Mahavakya 'Tat Tvam Asi' (Thou Art That), Udgitha meditation, and Shandilya Vidya.",
              stats: "८ प्रपाठक • 'तत्त्वमसि'",
              enStats: "8 Prapathakas • 'Tat Tvam Asi'",
              badge: "मुख्य उपनिषद",
              imageKey: "card-grantha-chandogya.jpg"
            }
          ]
        },
        {
          id: "ranayaniya-shakha",
          name: "B. राणायनीय शाखा (Ranayaniya)",
          enName: "Ranayaniya Shakha",
          desc: "महाराष्ट्र, कर्नाटक एवं उड़ीसा में प्रचलित सामवेद की शाखा।",
          enDesc: "Samaveda Shakha practiced primarily in Maharashtra, Karnataka, and Odisha.",
          stats: "द्राह्यायण व गान परंपरा",
          enStats: "Drahyayana & Gana Tradition",
          priest: "उद्गातृ (Udgatri)",
          enPriest: "Udgatri (Chanting Priest)",
          badge: "शाखा",
          imageKey: "card-samaveda.jpg"
        },
        {
          id: "jaiminiya-shakha",
          name: "C. जैमिनीय / तवलकार शाखा (Jaiminiya)",
          enName: "Jaiminiya Shakha",
          desc: "तमिलनाडु व केरल में सुरक्षित शाखा — जैमिनीय संहिता, ब्राह्मण, आरण्यक एवं केनोपनिषद।",
          enDesc: "Rare Shakha preserved in Tamil Nadu and Kerala — Includes Jaiminiya Samhita, Brahmana, Aranyaka, and Kena Upanishad.",
          stats: "संहिता, ब्राह्मण, आरण्यक, केनोपनिषद",
          enStats: "Samhita, Brahmana, Aranyaka, Kena Upanishad",
          priest: "उद्गातृ (Udgatri)",
          enPriest: "Udgatri (Chanting Priest)",
          badge: "शाखा",
          imageKey: "card-jaiminiya-shakha.jpg",
          children: [
            {
              id: "kena-upanishad",
              name: "i. केनोपनिषद (तवलकार उपनिषद)",
              enName: "Kena Upanishad",
              desc: "'केनेषितं पतति प्रेषितं मनः' — यक्ष उपाख्यान, मन और प्राण का प्रेरक परम ब्रह्म।",
              enDesc: "'Keneshetam Patati Preshitam Manah' — The Yaksha episode, the Supreme Brahman inspiring mind and life-force.",
              stats: "४ खंड",
              enStats: "4 Sections",
              badge: "उपनिषद",
              imageKey: "card-upanishad.jpg"
            }
          ]
        },
        {
          id: "samaveda-sutras",
          name: "D. सामवेद के सूत्र व गान ग्रंथ (ग्रामगेय गान, अरण्यगेय गान, गोभिल गृह्यसूत्र)",
          enName: "Samaveda Sutras & Gana Texts",
          desc: "लाट्यायन, द्राह्यायण श्रौतसूत्र, गोभिल, खादिर गृह्यसूत्र, पुष्पसूत्र एवं साम प्रातिशाख्य।",
          enDesc: "Latyayana, Drahyayana Shrautasutras, Gobhila, Khadira Grihyasutras, Pushpasutra, and Sama Pratishakhya.",
          stats: "गान व सूत्र ग्रंथ",
          enStats: "Gana & Sutra Texts",
          badge: "सूत्र व गान",
          imageKey: "card-chhanda.jpg"
        }
      ]
    },

    // ========================================================
    // 4. ATHARVAVEDA (अथर्ववेद)
    // ========================================================
    {
      id: "atharvaveda",
      slug: "atharvaveda",
      name: "अथर्ववेद",
      enName: "Atharvaveda",
      desc: "ब्रह्मवेद — आयुर्वेद, भैषज्य, शांति-पौष्टिक कर्म, राष्ट्र-रक्षा, गणित, वास्तु एवं गूढ़ अध्यात्म का संग्रह।",
      enDesc: "Brahmaveda — The comprehensive scripture of wellness, healing, national defense, statecraft, cosmology, and supreme metaphysics.",
      stats: "२० काण्ड • ७३० सूक्त • ५,९७७ मंत्र",
      enStats: "20 Kandas • 730 Suktas • 5,977 Verses",
      priest: "ब्रह्मा (Brahma)",
      enPriest: "Brahma (Supreme Overseer Priest)",
      badge: "ब्रह्मवेद एवं विज्ञान",
      imageKey: "card-atharvaveda.jpg",
      children: [
        {
          id: "shaunaka-shakha",
          name: "A. शौनक शाखा (Shaunaka)",
          enName: "Shaunaka Shakha",
          desc: "अथर्ववेद की वर्तमान में पूर्णतः उपलब्ध एवं सर्वाधिक प्रचलित शाखा।",
          enDesc: "The fully extant and most prominent shakha of Atharvaveda practiced across India.",
          stats: "२० काण्ड • ७३० सूक्त • ५९७७ मंत्र",
          enStats: "20 Kandas • 730 Suktas • 5,977 Verses",
          priest: "ब्रह्मा (Brahma)",
          enPriest: "Brahma (Supreme Overseer Priest)",
          badge: "शाखा",
          imageKey: "card-shaunaka-shakha.jpg",
          children: [
            {
              id: "shaunaka-samhita",
              name: "क. शौनक अथर्ववेद संहिता",
              enName: "Shaunaka Atharvaveda Samhita",
              desc: "२० काण्ड, ७३० सूक्त, ५९७७ मंत्र — पृथ्वी सूक्त (काण्ड १२), काल सूक्त (काण्ड १९), स्कम्भ सूक्त (काण्ड १०)।",
              enDesc: "20 Kandas, 730 Suktas, 5,977 Verses — Includes Prithvi Sukta (Kanda 12), Kala Sukta (Kanda 19), and Skambha Sukta (Kanda 10).",
              stats: "२० काण्ड • ७३० सूक्त",
              enStats: "20 Kandas • 730 Suktas",
              badge: "संहिता",
              imageKey: "card-samhita.jpg",
              children: [
                {
                  id: "av-kanda-1",
                  name: "१. काण्ड १: मेधाजनन / त्रिसप्त सूक्त (ये त्रिषप्ताः परियन्ति...)",
                  enName: "Kanda 1: Medhajanana / Trisapta Sukta",
                  desc: "अथर्ववेद का प्रथम सूक्त — वाणी के स्वामी से बुद्धि, बल और मेधा की प्रार्थना।",
                  enDesc: "Opening Sukta of Atharvaveda — Prayer to the Lord of Speech for wisdom, vitality, and intellectual brilliance.",
                  stats: "४ मंत्र",
                  enStats: "4 Verses",
                  badge: "सूक्त",
                  mantraId: "av-1-1-1",
                  imageKey: "card-sukta-vak.jpg"
                },
                {
                  id: "av-prithvi-sukta",
                  name: "२. काण्ड १२: भूमि सूक्त / पृथ्वी सूक्त (माता भूमिः पुत्रोऽहं पृथिव्याः)",
                  enName: "Kanda 12: Bhumi Sukta (Earth Anthem)",
                  desc: "विश्व का प्रथम पर्यावरण एवं राष्ट्रगीत — 'धरती मेरी माता है और मैं इसका पुत्र हूँ'।",
                  enDesc: "The world's earliest environmental and ecological anthem — 'Earth is my mother, and I am her child'.",
                  stats: "६३ ऋचाएँ",
                  enStats: "63 Verses",
                  badge: "सूक्त",
                  mantraId: "av-12-1-12",
                  imageKey: "card-sukta-prithvi.jpg"
                },
                {
                  id: "av-shanti-sukta",
                  name: "३. काण्ड १९: विश्व शांति सूक्त (द्यौः शान्तिरन्तरिक्षं शान्तिः...)",
                  enName: "Kanda 19: Vishva Shanti Sukta",
                  desc: "समस्त ब्रह्माण्ड, प्रकृति और मानव जाति में वैश्विक शांति की प्रार्थना।",
                  enDesc: "Prayer for universal peace spanning the cosmos, skies, nature, plants, and all humanity.",
                  stats: "१४ मंत्र",
                  enStats: "14 Verses",
                  badge: "सूक्त",
                  mantraId: "av-19-9-14",
                  imageKey: "card-sukta-shanti.jpg"
                }
              ]
            },
            {
              id: "shaunaka-sutras",
              name: "ख. प्रातिशाख्य व कल्पसूत्र (वैतान श्रौतसूत्र, कौशिक गृह्यसूत्र)",
              enName: "Shaunaka Sutras & Pratishakhya",
              desc: "वैतान श्रौतसूत्र (ब्रह्मा ऋत्विक के कार्य), कौशिक गृह्यसूत्र (भैषज्य, शांति, पौष्टिक विधान) एवं अथर्व प्रातिशाख्य।",
              enDesc: "Vaitana Shrautasutra (Duties of Brahma priest), Kaushika Grihyasutra (Medicine, peace rituals), and Atharva Pratishakhya.",
              stats: "वैतान व कौशिक सूत्र",
              enStats: "Vaitana & Kaushika Sutras",
              badge: "सूत्र ग्रंथ",
              imageKey: "card-shrautasutra.jpg"
            }
          ]
        },
        {
          id: "paippalada-shakha",
          name: "B. पिप्पलाद शाखा (Paippalada)",
          enName: "Paippalada Shakha",
          desc: "उड़ीसा, झारखंड एवं कश्मीर में सुरक्षित दुर्लभ शाखा (२० काण्ड)।",
          enDesc: "Rare Shakha preserved in Odisha, Jharkhand, and Kashmir (20 Kandas).",
          stats: "२० काण्ड • पिप्पलाद संहिता",
          enStats: "20 Kandas • Paippalada Samhita",
          priest: "ब्रह्मा (Brahma)",
          enPriest: "Brahma (Supreme Overseer Priest)",
          badge: "शाखा",
          imageKey: "card-paippalada-shakha.jpg"
        },
        {
          id: "atharvaveda-general-literature",
          name: "C. अथर्ववेद वांग्मय का सामान्य वर्गीकरण",
          enName: "Atharvaveda General Literature",
          desc: "गोपथ ब्राह्मण, मुण्डक, माण्डूक्य, प्रश्नोपनिषद एवं कल्पसूत्र।",
          enDesc: "Gopatha Brahmana, Mundaka, Mandukya, Prashna Upanishad, and Kalpasutras.",
          stats: "ब्राह्मण, उपनिषद एवं सूत्र",
          enStats: "Brahmana, Upanishad & Sutras",
          badge: "वांग्मय",
          imageKey: "card-atharvaveda.jpg",
          children: [
            {
              id: "gopatha-brahmana",
              name: "ख. ब्राह्मण ग्रंथ (केवल एक: गोपथ ब्राह्मण / Gopatha Brahmana)",
              enName: "Gopatha Brahmana",
              desc: "पूर्व गोपथ (५ प्रपाठक) एवं उत्तर गोपथ (६ प्रपाठक) — ब्रह्मा ऋत्विक के कर्त्तव्य एवं ओंकार महिमा।",
              enDesc: "Purva Gopatha (5 Prapathakas) and Uttara Gopatha (6 Prapathakas) — Role of Brahma priest and glory of Omkara.",
              stats: "११ प्रपाठक (पूर्व व उत्तर)",
              enStats: "11 Prapathakas (Purva & Uttara)",
              badge: "ब्राह्मण",
              imageKey: "card-brahmana.jpg"
            },
            {
              id: "atharvaveda-aranyaka-note",
              name: "ग. आरण्यक ग्रंथ (अथर्ववेद का कोई स्वतंत्र आरण्यक उपलब्ध नहीं है)",
              enName: "Atharvaveda Aranyaka Note",
              desc: "प्रामाणिक वैदिक परंपरा के अनुसार अथर्ववेद का कोई स्वतंत्र आरण्यक नहीं है; इसका दार्शनिक भाग सीधे उपनिषदों में निहित है।",
              enDesc: "According to canonical Vedic tradition, Atharvaveda has no separate extant Aranyaka; its philosophical portion is directly contained in Upanishads.",
              stats: "उपनिषदों में समाहित",
              enStats: "Contained in Upanishads",
              badge: "विशेष संदर्भ",
              imageKey: "card-aranyaka.jpg"
            },
            {
              id: "atharvaveda-upanishads",
              name: "घ. उपनिषद ग्रंथ (मुण्डकोपनिषद, माण्डूक्य उपनिषद, प्रश्नोपनिषद)",
              enName: "Atharvaveda Major Upanishads",
              desc: "मुण्डकोपनिषद ('सत्यमेव जयते'), माण्डूक्य उपनिषद ('अयमात्मा ब्रह्म') एवं प्रश्नोपनिषद (६ आध्यात्मिक प्रश्न)।",
              enDesc: "Mundaka Upanishad ('Satyameva Jayate'), Mandukya Upanishad ('Ayam Atma Brahma'), and Prashna Upanishad (6 spiritual inquiries).",
              stats: "३ प्रधान उपनिषद",
              enStats: "3 Principal Upanishads",
              badge: "मुख्य उपनिषद",
              imageKey: "card-upanishad.jpg",
              children: [
                {
                  id: "mundaka-upanishad",
                  name: "i. मुण्डकोपनिषद",
                  enName: "Mundaka Upanishad",
                  desc: "'सत्यमेव जयते नानृतम्' — परा व अपरा विद्या, जीवात्मा-परमात्मा का दो पक्षी रूपक।",
                  enDesc: "'Satyameva Jayate Nanritam' — Para & Apara Vidya, allegory of the two birds representing individual soul and Supreme Soul.",
                  stats: "३ मुण्डक • ६४ मंत्र",
                  enStats: "3 Mundakas • 64 Verses",
                  badge: "उपनिषद",
                  imageKey: "card-grantha-mundaka.jpg"
                },
                {
                  id: "mandukya-upanishad",
                  name: "ii. माण्डूक्य उपनिषद",
                  enName: "Mandukya Upanishad",
                  desc: "'अयमात्मा ब्रह्म' — ॐकार एवं चेतना की चार अवस्थाएँ (जाग्रत, स्वप्न, सुषुप्ति, तुरीय)।",
                  enDesc: "'Ayam Atma Brahma' — Omkara and the four states of consciousness (Jagrat, Swapna, Sushupti, Turiya).",
                  stats: "१२ मंत्र • चेतना की ४ अवस्थाएँ",
                  enStats: "12 Verses • 4 States of Consciousness",
                  badge: "उपनिषद",
                  imageKey: "card-grantha-mandukya.jpg"
                },
                {
                  id: "prashna-upanishad",
                  name: "iii. प्रश्नोपनिषद",
                  enName: "Prashna Upanishad",
                  desc: "महर्षि पिप्पलाद और ६ ऋषियों के ६ गूढ़ आध्यात्मिक प्रश्न व समाधान।",
                  enDesc: "Maharshi Pippalada answering 6 profound philosophical questions from 6 seeking sages.",
                  stats: "६ प्रश्न व उत्तर",
                  enStats: "6 Questions & Answers",
                  badge: "उपनिषद",
                  imageKey: "card-upanishad.jpg"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// Helper function to resolve tree path
export function getNodeByPath(pathIds = []) {
  if (!pathIds || pathIds.length === 0) return VEDA_HIERARCHY_TREE;
  let current = VEDA_HIERARCHY_TREE;
  for (const id of pathIds) {
    if (!current.children) return null;
    const found = current.children.find((c) => c.id === id || c.slug === id);
    if (!found) return null;
    current = found;
  }
  return current;
}

// Helper function to recursively find any node by ID or slug with ancestors
export function findNodeById(id, current = VEDA_HIERARCHY_TREE, ancestors = []) {
  if (!id) return null;
  if (current.id === id || current.slug === id || current.mantraId === id) {
    return { node: current, ancestors };
  }
  if (current.children) {
    for (const child of current.children) {
      const res = findNodeById(id, child, [...ancestors, current]);
      if (res) return res;
    }
  }
  return null;
}
