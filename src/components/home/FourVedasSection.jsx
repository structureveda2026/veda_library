import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Layers, Flame, Crown, Sparkles, Scroll } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";

// Card images
import rigvedaImg from "../../assets/images/library/cards/card-rigveda.jpg";
import yajurvedaImg from "../../assets/images/library/cards/card-yajurveda.jpg";
import samavedaImg from "../../assets/images/library/cards/card-samaveda.jpg";
import atharvavedaImg from "../../assets/images/library/cards/card-atharvaveda.jpg";

const VEDA_CARDS_DATA = [
  {
    id: "rigveda",
    name: "ऋग्वेद",
    enName: "Rigveda",
    tradition: "हौत्र",
    enTradition: "Hautra",
    priest: "होतृ",
    enPriest: "Hotri",
    priestRole: "ऋचाओं का सस्वर पाठ व देव-आवाहन",
    enPriestRole: "Invocation of Devas through sacred hymns",
    shakhaCount: "२१ शाखाएँ (मुख्य: शाकल)",
    enShakhaCount: "21 Shakhas (Primary: Shakala)",
    stats: "१० मण्डल • १०२८ सूक्त • १०,५५२ मंत्र",
    enStats: "10 Mandalas • 1,028 Suktas • 10,552 Mantras",
    desc: "अपौरुषेय श्रुति का आदिम वेद। शाकल संहिता, ऐतरेय व कौषीतकि ब्राह्मण, आरण्यक, ऐतरेयोपनिषद एवं आश्वलायन श्रौतसूत्र।",
    enDesc: "The primeval Veda of hymnic hymns. Preserves the Shakala Samhita, Aitareya Brahmana, and sublime philosophy.",
    shakhaList: [
      "शाकल संहिता (१०२८ सूक्त)",
      "ऐतरेय व कौषीतकि ब्राह्मण",
      "ऐतरेय उपनिषद",
      "आश्वलायन श्रौतसूत्र",
    ],
    enShakhaList: [
      "Shakala Samhita (1,028 Suktas)",
      "Aitareya & Kaushitaki Brahmanas",
      "Aitareya Upanishad",
      "Ashvalayana Shrautasutra",
    ],
    image: rigvedaImg,
  },
  {
    id: "yajurveda",
    name: "यजुर्वेद",
    enName: "Yajurveda",
    tradition: "आध्वर्यव",
    enTradition: "Adhvaryava",
    priest: "अध्वर्यु",
    enPriest: "Adhvaryu",
    priestRole: "यज्ञ विधि व आहुति कर्म के मुख्य ऋत्विक",
    enPriestRole: "Master of ritual action & sacred oblations",
    shakhaCount: "१०१ शाखाएँ (शुक्ल व कृष्ण)",
    enShakhaCount: "101 Shakhas (Shukla & Krishna)",
    stats: "शुक्ल व कृष्ण • शतपथ ब्राह्मण • रुद्राध्याय",
    enStats: "Shukla & Krishna • Shatapatha • Rudradhyaya",
    desc: "यज्ञ एवं वैदिक कर्म परंपरा। शुक्ल यजुर्वेद (माध्यन्दिना, शतपथ, ईश व बृहदारण्यक) एवं कृष्ण यजुर्वेद (तैत्तिरीय, कठोपनिषद)।",
    enDesc: "The canonical ritual liturgy, dividing into Shukla and Krishna recensions, housing the monumental Shatapatha Brahmana.",
    shakhaList: [
      "शुक्ल: वाजसनेयि माध्यन्दिना",
      "शतपथ ब्राह्मण (१०० अध्याय)",
      "ईश व बृहदारण्यक उपनिषद",
      "कृष्ण: तैत्तिरीय संहिता",
    ],
    enShakhaList: [
      "Shukla: Vajasaneyi Madhyandina",
      "Shatapatha Brahmana (100 Adhyayas)",
      "Isha & Brihadaranyaka Upanishads",
      "Krishna: Taittiriya Samhita",
    ],
    image: yajurvedaImg,
  },
  {
    id: "samaveda",
    name: "सामवेद",
    enName: "Samaveda",
    tradition: "औद्गात्र",
    enTradition: "Audgatra",
    priest: "उद्गातृ",
    enPriest: "Udgatri",
    priestRole: "साम ऋचाओं के मधुर संगीतकार",
    enPriestRole: "Singer of melodious liturgical chants",
    shakhaCount: "१,००० शाखाएँ (उपलब्ध: ३ प्रमुख)",
    enShakhaCount: "1,000 Shakhas (Available: 3 Recensions)",
    stats: "१८७५ छंद/साम • गान परंपरा • छान्दोग्य",
    enStats: "1,875 Samas • Musical Chants • Chandogya",
    desc: "सामगान और वैदिक गायन परंपरा। कौथुम, राणायनीय, जैमिनीय शाखाएँ, ताण्ड्य महाब्राह्मण, छान्दोग्य ('तत्त्वमसि') व केनोपनिषद्।",
    enDesc: "The celestial matrix of melody and sacred chant, preserving the sublime Chandogya and Kena Upanishads.",
    shakhaList: [
      "कौथुम शाखा (पूर्वार्चिक, उत्तरार्चिक)",
      "राणायनीय व जैमिनीय शाखा",
      "ताण्ड्य महाब्राह्मण (पंचविंश)",
      "छान्दोग्य उपनिषद ('तत्त्वमसि')",
    ],
    enShakhaList: [
      "Kauthuma Shakha (Purvarchika)",
      "Ranayaniya & Jaiminiya Shakhas",
      "Tandya Mahabrahmana (Panchavimsha)",
      "Chandogya Upanishad",
    ],
    image: samavedaImg,
  },
  {
    id: "atharvaveda",
    name: "अथर्ववेद",
    enName: "Atharvaveda",
    tradition: "ब्राह्म",
    enTradition: "Brahma",
    priest: "ब्रह्मा",
    enPriest: "Brahma",
    priestRole: "सर्वयज्ञ अधीक्षक एवं दोष परिहारक",
    enPriestRole: "Supreme overseer of rites & cosmic balance",
    shakhaCount: "९ शाखाएँ (शौनक व पैप्पलाद)",
    enShakhaCount: "9 Shakhas (Shaunaka & Paippalada)",
    stats: "२० काण्ड • ७३० सूक्त • ५,९७७ मंत्र",
    enStats: "20 Kandas • 730 Suktas • 5,977 Mantras",
    desc: "राष्ट्र, समाज, भैषज्य (आयुर्वेद) एवं ब्रह्मविद्या का महावेद। शौनक व पैप्पलाद शाखा, गोपथ ब्राह्मण, मुण्डक व माण्डूक्य उपनिषद।",
    enDesc: "The monumental wisdom of statecraft, longevity, and supreme Brahman, giving the immortal motto 'Satyameva Jayate'.",
    shakhaList: [
      "शौनक संहिता (पृथ्वी सूक्त १२.१)",
      "पैप्पलाद शाखा (ओडिशा परंपरा)",
      "गोपथ ब्राह्मण (पूर्व व उत्तर)",
      "मुण्डक ('सत्यमेव जयते') व माण्डूक्य",
    ],
    enShakhaList: [
      "Shaunaka Samhita (Prithvi Sukta)",
      "Paippalada Shakha (Odisha Recension)",
      "Gopatha Brahmana (Purva & Uttara)",
      "Mundaka & Mandukya Upanishads",
    ],
    image: atharvavedaImg,
  },
];

export default function FourVedasSection({ onNavigateKnowledge, onSelectVeda }) {
  const { isHindi } = useLanguage();
  const navigate = useNavigate();

  const handleSelectVeda = (vedaId) => {
    if (onSelectVeda) {
      onSelectVeda(vedaId);
    } else if (onNavigateKnowledge) {
      onNavigateKnowledge(vedaId);
    } else {
      navigate(`/library/veda/${vedaId}`);
    }
  };

  return (
    <section
      id="four-vedas"
      className="py-6 sm:py-8 bg-white border-b border-[#E5E5E5] relative"
    >
      <div className="max-w-7xl mx-auto px-[0.3rem] sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#FFD21F]/40 text-[#111111] mb-2.5 shadow-xs">
            <Flame className="w-3.5 h-3.5 text-[#C62828]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#111111]">
              {isHindi ? "अपौरुषेय श्रुति परंपरा" : "THE CANONICAL SHRUTI"}
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111]">
            {isHindi ? "चारों वेदों का अन्वेषण करें" : "Explore the Four Holy Vedas"}
          </h2>
          <p className="font-serif text-sm sm:text-base text-[#D9A441] font-bold mt-1">
            {isHindi
              ? "वैदिक ज्ञान के चार आधार स्तम्भ • हौत्र, आध्वर्यव, औद्गात्र एवं ब्राह्म परंपरा में संरक्षित वाङ्मय"
              : "The Four Pillars of Vedic Knowledge Preserved Across Millennia"}
          </p>
          <p
            className={`text-xs sm:text-sm text-[#555555] mt-2 max-w-2xl mx-auto leading-relaxed ${
              isHindi ? "font-devanagari" : ""
            }`}
          >
            {isHindi
              ? "प्रत्येक वेद की अपनी प्रामाणिक पाठ-परंपरा, ऋत्विक, शाखाएँ एवं संहिताएँ हैं। अपनी रुचि के अनुसार वेद मूल पाठ का अध्ययन करें।"
              : "Each Veda possesses its unique recitational tradition, presiding priest, and canonical Shakhas. Select any Veda to explore its verses and commentaries."}
          </p>
        </div>

        {/* Elegant Bento-Style Layout with 1px border (#E5E5E5) & Golden Accent Hover (#D9A441) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {VEDA_CARDS_DATA.map((veda) => {
            const title = isHindi ? veda.name : veda.enName;
            const shakhaPill = isHindi ? veda.shakhaCount : veda.enShakhaCount;
            const statsText = isHindi ? veda.stats : veda.enStats;
            const description = isHindi ? veda.desc : veda.enDesc;
            const traditionLabel = isHindi
              ? `${veda.tradition} • ${veda.priest}`
              : `${veda.enTradition} • ${veda.enPriest || veda.priest}`;

            return (
              <div
                key={veda.id}
                onClick={() => handleSelectVeda(veda.id)}
                className="group flex flex-col justify-between bg-white rounded-xl border border-[#E5E5E5] hover:border-[#D9A441] shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 overflow-hidden cursor-pointer relative"
              >
                <div>
                  {/* Bento Compartment 1: Compact Image Frame with Authentic Priest & Shakha Badges */}
                  <div className="relative h-24 sm:h-28 w-full overflow-hidden bg-[#111111]">
                    <img
                      src={veda.image}
                      alt={veda.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    {/* Shakha Count Badge in Brand Yellow #FFD21F */}
                    <div className="absolute top-2 right-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFD21F] text-[#111111] border border-[#FFD21F] shadow-2xs font-devanagari">
                        <Layers className="w-2.5 h-2.5 text-[#111111]" />
                        <span>{shakhaPill}</span>
                      </span>
                    </div>

                    {/* Authentic Priest Badge */}
                    <div className="absolute bottom-2 left-2 right-auto">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-white/95 text-[#111111] border border-[#E5E5E5] backdrop-blur-md shadow-2xs font-devanagari">
                        <Crown className="w-3 h-3 text-[#D9A441]" />
                        <span>{traditionLabel}</span>
                      </span>
                    </div>
                  </div>

                  {/* Bento Compartment 2: Title, Liturgy Role & Stats */}
                  <div className="p-3">
                    {/* Single Clean Title */}
                    <h3
                      className={`text-base font-bold text-[#111111] group-hover:text-[#D9A441] transition-colors leading-tight ${
                        isHindi ? "font-devanagari" : "font-serif"
                      }`}
                    >
                      {title}
                    </h3>

                    {/* Liturgical Role Line */}
                    <p className={`text-[11px] text-[#D9A441] font-semibold mt-0.5 flex items-center gap-1 truncate ${isHindi ? "font-devanagari" : ""}`}>
                      <Sparkles className="w-2.5 h-2.5 text-[#D9A441] shrink-0" />
                      <span className="truncate">
                        {isHindi ? veda.priestRole : veda.enPriestRole}
                      </span>
                    </p>

                    {/* Stats Ribbon */}
                    <div className={`mt-1.5 px-2 py-0.5 rounded-md bg-stone-50 border border-[#E5E5E5] text-[10px] font-medium text-[#111111] flex items-center gap-1.5 ${isHindi ? "font-devanagari" : ""}`}>
                      <BookOpen className="w-3 h-3 text-[#D9A441] shrink-0" />
                      <span className="truncate">{statsText}</span>
                    </div>

                    {/* Description */}
                    <p
                      className={`text-[11px] text-[#555555] mt-1.5 leading-snug line-clamp-2 ${
                        isHindi ? "font-devanagari" : ""
                      }`}
                    >
                      {description}
                    </p>

                    {/* Bento Compartment 3: Canonical Shakhas */}
                    <div className="mt-2">
                      <span className={`text-[9px] font-bold text-[#666666] uppercase tracking-wider block mb-1 ${isHindi ? "font-devanagari" : ""}`}>
                        {isHindi ? "प्रमुख शाखाएँ:" : "Key Shakhas:"}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {(isHindi ? veda.shakhaList : (veda.enShakhaList || veda.shakhaList)).slice(0, 3).map((sh, idx) => (
                          <span
                            key={idx}
                            className={`text-[9px] font-medium px-1.5 py-0.2 rounded bg-white text-[#555555] border border-[#E5E5E5] group-hover:border-[#D9A441] group-hover:text-[#111111] transition-colors truncate max-w-full ${isHindi ? "font-devanagari" : ""}`}
                          >
                            {sh}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bento Compartment 4: Explore Button */}
                <div className="p-3 pt-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectVeda(veda.id);
                    }}
                    className="w-full py-1.5 px-2.5 rounded-lg text-center text-xs font-bold bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-1.5 group/btn cursor-pointer active:scale-[0.98]"
                  >
                    <span>
                      {isHindi
                        ? `${veda.name} मूल पाठ व शाखाएँ`
                        : `Read ${veda.enName} & Shakhas`}
                    </span>
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
