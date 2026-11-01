import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GitBranch, Sparkles, BookOpen, Layers, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

const CONNECTION_NODES = [
  {
    id: "rigveda-agni",
    label: "ऋग्वेद (Rigveda १.१)",
    englishLabel: "Rigveda First Hymn",
    rootText: "ऋग्वेद संहिता (शाकल शाखा)",
    mantra: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम्",
    rishi: "मधुच्छन्दा वैश्वामित्र (Madhuchhanda)",
    devata: "अग्नि देव (Agni — Divine Priest)",
    chandas: "गायत्री छंद (Gayatri Metre)",
    subject: "यज्ञ पुरोहित, प्रकाश एवं ऊर्जा तत्व",
    targetRoute: "/library/veda/rigveda/agnisukta",
    insight: "ऋग्वेद का प्रथम मंत्र भौतिक अग्नि एवं अंतःचेतना के प्रकाशक दोनों स्वरूपों को एक सूत्र में जोड़ता है।"
  },
  {
    id: "gayatri-savitur",
    label: "गायत्री महामंत्र (३.६२.१०)",
    englishLabel: "Gayatri Mahamantra",
    rootText: "ऋग्वेद मण्डल ३ • सूक्त ६२",
    mantra: "तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि",
    rishi: "महर्षि विश्वामित्र (Vishvamitra)",
    devata: "सवितृ देव (Savitur — Supreme Light)",
    chandas: "निचृद् गायत्री (Nicrit Gayatri)",
    subject: "प्रज्ञा जागरण, बुद्धि शुद्धि एवं आत्मज्ञान",
    targetRoute: "/library/veda/rigveda/agnisukta",
    insight: "सूर्य की प्राणमयी ऊर्जा और मानव प्रज्ञा के बीच का सनातन संबंध, जो समस्त वैदिक ज्ञान का बीज है।"
  },
  {
    id: "rudra-yajurveda",
    label: "रुद्राध्याय (यजुर्वेद १६)",
    englishLabel: "Sri Rudram Chamakam",
    rootText: "कृष्ण यजुर्वेद तैत्तिरीय संहिता",
    mantra: "नमस्ते रुद्र मन्यव उतो त इषवे नमः",
    rishi: "महर्षि परमेष्ठी प्रजापति",
    devata: "शंभु महादेव (Lord Shiva)",
    chandas: "अनुष्टुप् एवं जगती",
    subject: "रुद्राभिषेक, प्रकृति संरक्षण एवं शांति",
    targetRoute: "/library/puja/shaiva/rudrabhisheka",
    insight: "यजुर्वेद का प्रसिद्ध शतरुद्रीय पाठ जिसमें चराचर जगत के कण-कण में शिव तत्व की व्यापकता वर्णित है।"
  },
  {
    id: "gita-krishna",
    label: "श्रीमद्भगवद्गीता (भीष्मपर्व)",
    englishLabel: "Bhagavad Gita",
    rootText: "महाभारत प्रस्थानत्रयी",
    mantra: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    rishi: "महर्षि कृष्ण द्वैपायन वेदव्यास",
    devata: "भगवान श्रीकृष्ण (Parabrahma)",
    chandas: "अनुष्टुप् छंद (Anushtup)",
    subject: "निष्काम कर्मयोग, सांख्य एवं भक्तियोग",
    targetRoute: "/library/collections/vedic-collection",
    insight: "उपनिषदों का सार रूपी अमर उपदेश, जो धर्म-अधर्म के द्वंद्व में जीवन जीने की संपूर्ण कला सिखाता है।"
  },
  {
    id: "daily-agnihotra",
    label: "दैनिक अग्निहोत्र (श्रौत-स्मार्त)",
    englishLabel: "Daily Agnihotra",
    rootText: "यजुर्वेद एवं शतपथ ब्राह्मण",
    mantra: "सूर्याय स्वाहा सूर्याय इदं न मम",
    rishi: "वैदिक गृहस्थ एवं याज्ञिक परंपरा",
    devata: "सूर्य एवं प्रजापति",
    chandas: "वैदिक स्वाहाकार",
    subject: "पर्यावरण शुद्धि, प्राण ऊर्जा एवं नित्य कर्म",
    targetRoute: "/library/yagya-sanskar",
    insight: "सूर्योदय और सूर्यास्त के समय ताम्र कुण्ड में दी जाने वाली आहुतियाँ जो वायुमंडल और अंतःकरण को शुद्ध करती हैं।"
  }
];

export default function KnowledgeConnectionSection() {
  const [selectedNodeId, setSelectedNodeId] = useState("rigveda-agni");
  const navigate = useNavigate();

  const activeNode = CONNECTION_NODES.find((n) => n.id === selectedNodeId) || CONNECTION_NODES[0];

  return (
    <section id="connections" className="py-8 sm:py-10 bg-white border-y border-[#E5E5E5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#111111] bg-[#FFD21F] px-3 py-1 rounded-full border border-[#FFD21F] shadow-2xs">
          CONNECTED SHASTRA MATRIX
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#111111] mt-3">
          Discover the Knowledge Connections
        </h2>
        <p className="text-xs sm:text-sm text-[#555555] font-devanagari mt-2 max-w-2xl mx-auto leading-relaxed">
          भारतीय ज्ञान परंपरा में एक विषय केवल एक पुस्तक तक सीमित नहीं होता; वह वेद, मंत्र, ऋषि, देवता, छंद और अनुष्ठान से परस्पर जुड़ा होता है। किसी भी नोड पर क्लिक करके उसके अंतर्संबंध देखें:
        </p>

        {/* Focal Selection Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-4 mt-4 no-scrollbar px-2 sm:px-0">
          {CONNECTION_NODES.map((node) => {
            const isSelected = selectedNodeId === node.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNodeId(node.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#FFD21F] text-[#111111] border-[#FFD21F] shadow-xs font-bold scale-102"
                    : "bg-white text-[#555555] border-[#E5E5E5] hover:border-[#D9A441] hover:text-[#111111]"
                }`}
              >
                <span>{node.label}</span>
              </button>
            );
          })}
        </div>

        {/* Visual Dynamic Graph Box */}
        <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs hover:border-[#D9A441] transition-colors text-left">
          {/* Top Root Node Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#E5E5E5] gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9A441] bg-[#FFD21F]/15 border border-[#D9A441]/30 px-2.5 py-0.5 rounded">
                PRIMARY CORPUS ROOT
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#111111] mt-1.5">
                {activeNode.rootText}
              </h3>
              <p className="text-xs text-[#555555] font-medium font-devanagari mt-0.5">
                {activeNode.englishLabel}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate(activeNode.targetRoute)}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <span>Read Connected Text</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Central Connecting Grid: 4 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            {/* 1. Mantra */}
            <div className="p-4 rounded-xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#D9A441] shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-[#D9A441] block mb-1">
                मंत्र / ऋचा (Vedic Mantra)
              </span>
              <p className="font-devanagari text-sm font-bold text-[#111111] leading-snug">
                "{activeNode.mantra}"
              </p>
              <span className="text-[11px] text-[#555555] block mt-2">
                मूल स्वर व पदच्छेद विधान
              </span>
            </div>

            {/* 2. Rishi */}
            <div className="p-4 rounded-xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#FFD21F] shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-[#555555] block mb-1">
                ऋषि (Vedic Seer / द्रष्टा)
              </span>
              <p className="font-devanagari text-sm font-bold text-[#111111] leading-snug">
                {activeNode.rishi}
              </p>
              <span className="text-[11px] text-[#555555] block mt-2">
                मंत्र के द्रष्टा एवं परंपरा
              </span>
            </div>

            {/* 3. Devata */}
            <div className="p-4 rounded-xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#D9A441] shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-[#D9A441] block mb-1">
                देवता (Presiding Deity)
              </span>
              <p className="font-devanagari text-sm font-bold text-[#111111] leading-snug">
                {activeNode.devata}
              </p>
              <span className="text-[11px] text-[#555555] block mt-2">
                उपास्य स्वरूप व चैतन्य
              </span>
            </div>

            {/* 4. Chandas */}
            <div className="p-4 rounded-xl bg-white border border-[#E5E5E5] border-t-2 border-t-[#FFD21F] shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-[#555555] block mb-1">
                छंद (Vedic Metre / Chhandas)
              </span>
              <p className="font-devanagari text-sm font-bold text-[#111111] leading-snug">
                {activeNode.chandas}
              </p>
              <span className="text-[11px] text-[#555555] block mt-2">
                स्वर-लय, मात्रा एवं नाद विज्ञान
              </span>
            </div>
          </div>

          {/* Bottom Subject & Philosophical Synthesis */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#E5E5E5] text-[#111111] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9A441]">
                UNIVERSAL SUBJECT & ESSENCE • विषय
              </span>
              <h4 className="font-serif text-lg font-bold text-[#111111] mt-0.5">
                {activeNode.subject}
              </h4>
              <p className="text-xs text-[#555555] font-devanagari mt-1 max-w-2xl leading-relaxed">
                {activeNode.insight}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate(activeNode.targetRoute)}
              className="flex-shrink-0 text-xs font-bold text-[#111111] hover:text-[#D9A441] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Explore Chapter</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
