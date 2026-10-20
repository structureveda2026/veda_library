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
    priest: "होता (Hotri)",
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
      "आश्वलायन श्रौतसूत्र"
    ],
    image: rigvedaImg,
    badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
    priestPill: "bg-amber-950/85 text-amber-200 border-amber-400/50"
  },
  {
    id: "yajurveda",
    name: "यजुर्वेद",
    enName: "Yajurveda",
    priest: "अध्वर्यु (Adhvaryu)",
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
      "कृष्ण: तैत्तिरीय संहिता"
    ],
    image: yajurvedaImg,
    badgeBg: "bg-orange-100 text-orange-900 border-orange-300",
    priestPill: "bg-stone-900/85 text-amber-300 border-amber-400/50"
  },
  {
    id: "samaveda",
    name: "सामवेद",
    enName: "Samaveda",
    priest: "उद्गाता (Udgatri)",
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
      "छान्दोग्य उपनिषद ('तत्त्वमसि')"
    ],
    image: samavedaImg,
    badgeBg: "bg-sky-100 text-sky-900 border-sky-300",
    priestPill: "bg-sky-950/85 text-sky-200 border-sky-400/50"
  },
  {
    id: "atharvaveda",
    name: "अथर्ववेद",
    enName: "Atharvaveda",
    priest: "ब्रह्मा (Brahma)",
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
      "मुण्डक ('सत्यमेव जयते') व माण्डूक्य"
    ],
    image: atharvavedaImg,
    badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
    priestPill: "bg-emerald-950/85 text-emerald-200 border-emerald-400/50"
  }
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
    <section id="four-vedas" className="py-12 sm:py-16 bg-[#fffaf0] border-b border-amber-200/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-900 mb-2.5">
            <Flame className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest">
              {isHindi ? "अपौरुषेय श्रुति परंपरा" : "THE CANONICAL SHRUTI"}
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900">
            {isHindi ? "चारों वेदों का अन्वेषण करें" : "Explore the Four Holy Vedas"}
          </h2>
          <p className="font-serif text-sm sm:text-base text-amber-900 font-semibold mt-1">
            {isHindi
              ? "वैदिक ज्ञान के चार आधार स्तम्भ • होता, अध्वर्यु, उद्गाता एवं ब्रह्मा के संरक्षण में सुरक्षित अपौरुषेय वाङ्मय"
              : "The Four Pillars of Vedic Knowledge Preserved Across Millennia"}
          </p>
          <p
            className={`text-xs sm:text-sm text-stone-600 mt-2 max-w-xl mx-auto leading-relaxed ${
              isHindi ? "font-devanagari" : ""
            }`}
          >
            {isHindi
              ? "प्रत्येक वेद की अपनी प्रामाणिक पाठ-परंपरा, ऋत्विक, शाखाएँ एवं संहिताएँ हैं। अपनी रुचि के अनुसार वेद मूल पाठ का अध्ययन करें।"
              : "Each Veda possesses its unique recitational tradition, presiding priest, and canonical Shakhas. Select any Veda to explore its verses and commentaries."}
          </p>
        </div>

        {/* 4 Modern Royal Veda Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {VEDA_CARDS_DATA.map((veda) => {
            const title = isHindi ? veda.name : veda.enName;
            const subtitleTag = isHindi ? veda.enName : veda.name;
            const shakhaPill = isHindi ? veda.shakhaCount : veda.enShakhaCount;
            const statsText = isHindi ? veda.stats : veda.enStats;
            const description = isHindi ? veda.desc : veda.enDesc;

            return (
              <div
                key={veda.id}
                onClick={() => handleSelectVeda(veda.id)}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-amber-200/80 hover:border-amber-400 shadow-xs hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden cursor-pointer relative"
              >
                <div>
                  {/* Image Frame with Badges */}
                  <div className="relative aspect-16/10 overflow-hidden bg-stone-950">
                    <img
                      src={veda.image}
                      alt={veda.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/35 to-black/10" />

                    {/* Priest Badge (होता, अध्वर्यु, उद्गाता, ब्रह्मा) */}
                    <div className="absolute bottom-2.5 left-2.5 right-auto">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${veda.priestPill}`}
                      >
                        <Crown className="w-3 h-3 text-amber-300" />
                        <span className="font-devanagari">{veda.priest}</span>
                      </span>
                    </div>

                    {/* Shakha Count Badge (Top-right) */}
                    <div className="absolute top-2.5 right-2.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-amber-200 border border-amber-400/40 backdrop-blur-md shadow-2xs font-devanagari">
                        <Layers className="w-2.5 h-2.5 text-amber-400" />
                        <span>{shakhaPill}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5">
                    {/* Title & Subtitle */}
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-tight ${
                          isHindi ? "font-devanagari" : "font-serif"
                        }`}
                      >
                        {title}
                      </h3>
                      <span className="text-[11px] font-serif font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 uppercase tracking-wider">
                        {subtitleTag}
                      </span>
                    </div>

                    {/* Stats pill */}
                    <div className="mt-2.5 px-2.5 py-1 rounded-lg bg-amber-50/70 border border-amber-200/60 text-[10px] font-semibold text-amber-950 font-devanagari flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3 text-amber-700 shrink-0" />
                      <span className="truncate">{statsText}</span>
                    </div>

                    {/* Description */}
                    <p
                      className={`text-[11px] sm:text-xs text-stone-600 mt-2.5 leading-relaxed line-clamp-2 ${
                        isHindi ? "font-devanagari" : ""
                      }`}
                    >
                      {description}
                    </p>

                    {/* Shakha breakdown pills */}
                    <div className="mt-3">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                        {isHindi ? "प्रमुख शाखाएँ व संहिता:" : "Key Shakhas & Texts:"}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {veda.shakhaList.slice(0, 3).map((sh, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-semibold px-2 py-0.5 rounded bg-stone-50 text-stone-700 border border-stone-200/80 font-devanagari group-hover:bg-amber-50 group-hover:text-amber-900 group-hover:border-amber-200 transition-colors truncate max-w-full"
                          >
                            {sh}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Reading Link Button */}
                <div className="p-4 sm:p-5 pt-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectVeda(veda.id);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl text-center text-xs font-bold bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                  >
                    <span>
                      {isHindi
                        ? `${veda.name} मूल पाठ व शाखाएँ पढ़ें`
                        : `Read ${veda.enName} & Shakhas`}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
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
