import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";

const CONNECTION_NODES = [
  {
    id: "rigveda-agni",
    label: "ऋग्वेद (Rigveda १.१)",
    englishLabel: "Rigveda First Hymn",
    rootText: "ऋग्वेद संहिता (शाकल शाखा)",
    rootTextEn: "Rigveda Samhita (Shakala Shakha)",
    mantra: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम्",
    rishi: "मधुच्छन्दा वैश्वामित्र",
    rishiEn: "Madhuchhanda Vaishvamitra",
    devata: "अग्नि देव",
    devataEn: "Agni Deva (Divine Priest)",
    chandas: "गायत्री छंद",
    chandasEn: "Gayatri Metre",
    subject: "यज्ञ पुरोहित, प्रकाश एवं ऊर्जा तत्व",
    subjectEn: "Sacrificial Priest, Illumination & Vital Energy",
    targetRoute: "/library/veda/rigveda/agnisukta",
    insight: "ऋग्वेद का प्रथम मंत्र भौतिक अग्नि एवं अंतःचेतना के प्रकाशक दोनों स्वरूपों को एक सूत्र में जोड़ता है।",
    insightEn: "The inaugural verse of Rigveda bridges elemental fire and transcendent consciousness into unified spiritual awareness."
  },
  {
    id: "gayatri-savitur",
    label: "गायत्री महामंत्र (३.६२.१०)",
    englishLabel: "Gayatri Mahamantra",
    rootText: "ऋग्वेद मण्डल ३ • सूक्त ६२",
    rootTextEn: "Rigveda Mandala 3 • Sukta 62",
    mantra: "तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि",
    rishi: "महर्षि विश्वामित्र",
    rishiEn: "Maharishi Vishvamitra",
    devata: "सवितृ देव",
    devataEn: "Savitur Deva (Supreme Divine Light)",
    chandas: "निचृद् गायत्री",
    chandasEn: "Nicrit Gayatri Metre",
    subject: "प्रज्ञा जागरण, बुद्धि शुद्धि एवं आत्मज्ञान",
    subjectEn: "Awakening of Intellect, Purity of Mind & Self-Knowledge",
    targetRoute: "/library/veda/rigveda/agnisukta",
    insight: "सूर्य की प्राणमयी ऊर्जा और मानव प्रज्ञा के बीच का सनातन संबंध, जो समस्त वैदिक ज्ञान का बीज है।",
    insightEn: "The eternal communion between life-giving solar consciousness and human intellect, forming the root of Vedic wisdom."
  },
  {
    id: "rudra-yajurveda",
    label: "रुद्राध्याय (यजुर्वेद १६)",
    englishLabel: "Sri Rudram Chamakam",
    rootText: "कृष्ण यजुर्वेद तैत्तिरीय संहिता",
    rootTextEn: "Krishna Yajurveda Taittiriya Samhita",
    mantra: "नमस्ते रुद्र मन्यव उतो त इषवे नमः",
    rishi: "महर्षि परमेष्ठी प्रजापति",
    rishiEn: "Maharishi Parameshthi Prajapati",
    devata: "शंभु महादेव",
    devataEn: "Lord Shiva (Rudra)",
    chandas: "अनुष्टुप् एवं जगती",
    chandasEn: "Anushtup & Jagati Metres",
    subject: "रुद्राभिषेक, प्रकृति संरक्षण एवं शांति",
    subjectEn: "Rudrabhisheka, Cosmic Harmony & Universal Peace",
    targetRoute: "/library/puja/shaiva/rudrabhisheka",
    insight: "यजुर्वेद का प्रसिद्ध शतरुद्रीय पाठ जिसमें चराचर जगत के कण-कण में शिव तत्व की व्यापकता वर्णित है।",
    insightEn: "The celebrated Satarudriya hymn celebrating the all-pervading immanence of Shiva in every aspect of the cosmos."
  },
  {
    id: "gita-krishna",
    label: "श्रीमद्भगवद्गीता (भीष्मपर्व)",
    englishLabel: "Bhagavad Gita",
    rootText: "महाभारत भीष्मपर्व",
    rootTextEn: "Mahabharata Bhishma Parva",
    mantra: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    rishi: "महर्षि कृष्ण द्वैपायन वेदव्यास",
    rishiEn: "Maharishi Veda Vyasa",
    devata: "भगवान श्रीकृष्ण",
    devataEn: "Lord Sri Krishna (Parabrahma)",
    chandas: "अनुष्टुप् छंद",
    chandasEn: "Anushtup Metre",
    subject: "निष्काम कर्मयोग, सांख्य एवं भक्तियोग",
    subjectEn: "Selfless Action (Nishkama Karma), Samkhya & Bhakti Yoga",
    targetRoute: "/library/collections/vedic-collection",
    insight: "उपनिषदों का सार रूपी अमर उपदेश, जो धर्म-अधर्म के द्वंद्व में जीवन जीने की संपूर्ण कला सिखाता है।",
    insightEn: "The essence of the Upanishads, revealing the profound art of living and acting with equanimity amid moral conflict."
  },
  {
    id: "daily-agnihotra",
    label: "दैनिक अग्निहोत्र (श्रौत-स्मार्त)",
    englishLabel: "Daily Agnihotra",
    rootText: "यजुर्वेद एवं शतपथ ब्राह्मण",
    rootTextEn: "Yajurveda & Shatapatha Brahmana",
    mantra: "सूर्याय स्वाहा सूर्याय इदं न मम",
    rishi: "वैदिक गृहस्थ परंपरा",
    rishiEn: "Vedic Grihastha Lineage",
    devata: "सूर्य एवं प्रजापति",
    devataEn: "Surya & Prajapati",
    chandas: "वैदिक स्वाहाकार",
    chandasEn: "Vedic Svahakara Liturgy",
    subject: "पर्यावरण शुद्धि, प्राण ऊर्जा एवं नित्य कर्म",
    subjectEn: "Environmental Purification, Pranic Vitality & Daily Duty",
    targetRoute: "/library/yagya-sanskar",
    insight: "सूर्योदय और सूर्यास्त के समय ताम्र कुण्ड में दी जाने वाली आहुतियाँ जो वायुमंडल और अंतःकरण को शुद्ध करती हैं।",
    insightEn: "Dawn and dusk copper-pyre solar oblations that sanctify both the atmospheric environment and inner consciousness."
  }
];

export default function KnowledgeConnectionSection() {
  const [selectedNodeId, setSelectedNodeId] = useState("rigveda-agni");
  const navigate = useNavigate();
  const { isHindi } = useLanguage();

  const activeNode = CONNECTION_NODES.find((n) => n.id === selectedNodeId) || CONNECTION_NODES[0];

  const nodeLabel = isHindi ? activeNode.label : activeNode.englishLabel;
  const rootText = isHindi ? activeNode.rootText : activeNode.rootTextEn;
  const rishiText = isHindi ? activeNode.rishi : activeNode.rishiEn;
  const devataText = isHindi ? activeNode.devata : activeNode.devataEn;
  const chandasText = isHindi ? activeNode.chandas : activeNode.chandasEn;
  const subjectText = isHindi ? activeNode.subject : activeNode.subjectEn;
  const insightText = isHindi ? activeNode.insight : activeNode.insightEn;

  return (
    <section id="connections" className="py-7 sm:py-9 bg-white border-y border-[#E5E5E5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#111111] bg-[#FFD21F] px-3 py-1 rounded-full border border-[#FFD21F] shadow-2xs">
          {isHindi ? "शास्त्रीय ज्ञान अंतर्संबंध" : "CONNECTED SHASTRA MATRIX"}
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mt-2.5">
          {isHindi ? "ज्ञान अंतर्संबंध रेखाचित्र" : "Discover Knowledge Connections"}
        </h2>
        <p className={`text-xs sm:text-sm text-[#555555] mt-1.5 max-w-2xl mx-auto leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi
            ? "परंपरा में ज्ञान एकाकी नहीं, अपितु परस्पर संबद्ध है। किसी भी केंद्र-बिंदु को चुनकर उसके वेद, मंत्र, ऋषि, देवता, छंद एवं दार्शनिक संबंध को समझें:"
            : "In traditional Indian scholarship, knowledge is interlinked across Vedas, Mantras, Rishis, Deities, Metres, and Ritual practices. Select any node to trace its connections:"}
        </p>

        {/* 5 Interactive Selectable Canonical Nodes */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5 mb-6">
          {CONNECTION_NODES.map((node) => {
            const isSelected = node.id === selectedNodeId;
            const btnLabel = isHindi ? node.label : node.englishLabel;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNodeId(node.id)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#FFD21F] text-[#111111] border border-[#FFD21F] shadow-xs scale-102"
                    : "bg-white text-[#555555] border border-[#E5E5E5] hover:border-[#FFD21F] hover:bg-[#FFD21F]/15 hover:text-[#111111]"
                }`}
              >
                {btnLabel}
              </button>
            );
          })}
        </div>

        {/* Dynamic Connected Node Visualization Box */}
        <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm p-4 sm:p-6 text-left relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#E5E5E5] gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9A441] block">
                {isHindi ? "प्रधान ग्रंथ संदर्भ" : "PRIMARY CORPUS ROOT"}
              </span>
              <h3 className={`font-serif text-lg sm:text-xl font-bold text-[#111111] mt-0.5 ${isHindi ? "font-devanagari" : ""}`}>
                {rootText}
              </h3>
              <p className="text-xs text-[#555555] font-semibold mt-0.5">
                {nodeLabel}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate(activeNode.targetRoute)}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <span>{isHindi ? "सम्बद्ध ग्रंथ पढ़ें" : "Read Connected Text"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Central Connecting Grid: 4 Pillars in a compact 2x2 on mobile, 4-col on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-4">
            {/* 1. Mantra (Authentic Devanagari preserved in both modes) */}
            <div className="p-3 sm:p-4 rounded-xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#D9A441] shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-[#D9A441] block mb-1">
                {isHindi ? "मंत्र / ऋचा" : "Vedic Mantra / Verse"}
              </span>
              <p className="font-devanagari text-xs sm:text-sm font-bold text-[#111111] leading-snug line-clamp-2">
                "{activeNode.mantra}"
              </p>
              <span className="text-[10px] sm:text-[11px] text-[#555555] block mt-1.5 truncate">
                {isHindi ? "मूल स्वर व पदच्छेद विधान" : "Original Swara & Padapatha"}
              </span>
            </div>

            {/* 2. Rishi */}
            <div className="p-3 sm:p-4 rounded-xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#FFD21F] shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-[#555555] block mb-1">
                {isHindi ? "ऋषि / द्रष्टा" : "Vedic Seer (Rishi)"}
              </span>
              <p className={`text-xs sm:text-sm font-bold text-[#111111] leading-snug truncate ${isHindi ? "font-devanagari" : ""}`}>
                {rishiText}
              </p>
              <span className="text-[10px] sm:text-[11px] text-[#555555] block mt-1.5 truncate">
                {isHindi ? "मंत्र के द्रष्टा एवं परंपरा" : "Revealer & Lineage"}
              </span>
            </div>

            {/* 3. Devata */}
            <div className="p-3 sm:p-4 rounded-xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#D9A441] shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-[#D9A441] block mb-1">
                {isHindi ? "उपास्य देवता" : "Presiding Deity"}
              </span>
              <p className={`text-xs sm:text-sm font-bold text-[#111111] leading-snug truncate ${isHindi ? "font-devanagari" : ""}`}>
                {devataText}
              </p>
              <span className="text-[10px] sm:text-[11px] text-[#555555] block mt-1.5 truncate">
                {isHindi ? "उपास्य स्वरूप व चैतन्य" : "Consciousness & Form"}
              </span>
            </div>

            {/* 4. Chandas */}
            <div className="p-3 sm:p-4 rounded-xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#FFD21F] shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-[#555555] block mb-1">
                {isHindi ? "वैदिक छंद" : "Vedic Metre (Chhandas)"}
              </span>
              <p className={`text-xs sm:text-sm font-bold text-[#111111] leading-snug truncate ${isHindi ? "font-devanagari" : ""}`}>
                {chandasText}
              </p>
              <span className="text-[10px] sm:text-[11px] text-[#555555] block mt-1.5 truncate">
                {isHindi ? "स्वर-लय व मात्रा विज्ञान" : "Rhythm & Syllables"}
              </span>
            </div>
          </div>

          {/* Bottom Subject & Philosophical Synthesis */}
          <div className="p-3.5 sm:p-5 rounded-xl bg-white border border-[#E5E5E5] text-[#111111] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9A441]">
                {isHindi ? "विषय एवं दार्शनिक तत्त्व" : "UNIVERSAL SUBJECT & ESSENCE"}
              </span>
              <h4 className={`font-serif text-lg font-bold text-[#111111] mt-0.5 ${isHindi ? "font-devanagari" : ""}`}>
                {subjectText}
              </h4>
              <p className={`text-xs text-[#555555] mt-1 max-w-2xl leading-relaxed ${isHindi ? "font-devanagari" : ""}`}>
                {insightText}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate(activeNode.targetRoute)}
              className="flex-shrink-0 text-xs font-bold text-[#111111] hover:text-[#D9A441] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>{isHindi ? "अध्याय देखें" : "Explore Chapter"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
