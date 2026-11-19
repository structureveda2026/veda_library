import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import {
  Layers,
  Crown,
  Heart,
  Shield,
  Compass,
  Sparkles,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Scroll,
  Sun,
  Flame,
  CheckCircle2,
} from "lucide-react";
import {
  PANCHA_LAKSHANA,
  MAHAPURANAS_DATA,
  UPAPURANAS_DATA,
} from "../../data/puranaData.js";
import {
  ITIHASA_EPISTEMOLOGY,
  RAMAYANA_DATA,
  MAHABHARATA_DATA,
} from "../../data/itihasaData.js";

/**
 * Purana & Itihasa Deep Taxonomy & Canonical Division View
 * Provides exhaustive structured analysis for:
 * 1. 18 Mahapuranas: Guna breakdown (Sattvika, Rajasa, Tamasa) + Deep Khanda / Samhita structures
 * 2. Pancha Lakshana & Dasha Lakshana (Srimad Bhagavata 12.7)
 * 3. 18 Canonical Upapuranas
 * 4. Valmiki Ramayana (7 Kandas & Gayatri Ramayana 24-syllable link)
 * 5. Mahabharata (18 Parvas, 3 Evolutionary Stages & Harivamsa)
 * 6. Major Akhyanas & Epical Jewels (Gita, Vidura Niti, Yaksha Prashna, Vishnu Sahasranama, Durga Saptashati, etc.)
 */
export default function PuranaItihasaTaxonomyView({ onSelectReaderText }) {
  const { isHindi } = useLanguage();
  // Sub-tabs: 'purana_khandas', 'lakshanas_upapuranas', 'ramayana_kandas', 'mahabharata_parvas', 'major_akhyanas'
  const [activeSubTab, setActiveSubTab] = useState("purana_khandas");
  const [expandedPuranaId, setExpandedPuranaId] = useState("padma-purana");
  const [selectedGunaFilter, setSelectedGunaFilter] = useState("all");

  const gunas = [
    { id: "all", label: "समस्त १८ महापुराण", count: 18 },
    { id: "sattvika", label: "सात्त्विक पुराण (विष्णु प्रधान)", count: 6, color: "emerald" },
    { id: "rajasa", label: "राजस पुराण (ब्रह्मा/सूर्य प्रधान)", count: 6, color: "amber" },
    { id: "tamasa", label: "तामस पुराण (शिव/अग्नि प्रधान)", count: 6, color: "indigo" },
  ];

  const filteredPuranas = MAHAPURANAS_DATA.filter((p) => {
    if (selectedGunaFilter === "all") return true;
    if (selectedGunaFilter === "sattvika") return p.guna.includes("सात्त्विक");
    if (selectedGunaFilter === "rajasa") return p.guna.includes("राजस");
    if (selectedGunaFilter === "tamasa") return p.guna.includes("तामस");
    return true;
  });

  // Major Akhyanas list
  const MAJOR_AKHYANAS = [
    {
      id: "gita",
      title: "श्रीमद्भगवद्गीता (The Divine Song)",
      source: "महाभारत • भीष्मपर्व (अध्याय २५–४२)",
      shlokas: "१८ अध्याय • ७०० श्लोक",
      speaker: "भगवान श्रीकृष्ण एवं धनुर्धर अर्जुन",
      readerSlug: "bhagavad-gita",
      theme: "कर्मयोग, ज्ञानयोग, भक्तियोग एवं शरणागति का परम समन्वय। कुरुक्षेत्र के युद्धस्थल पर अवसादग्रस्त अर्जुन को दिया गया आत्मसाक्षात्कार का उपदेश।",
      highlight: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन (२.४७) • सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज (१८.६६)",
    },
    {
      id: "durga-saptashati",
      title: "श्री दुर्गा सप्तशती / देवी माहात्म्य",
      source: "मार्कण्डेय पुराण (अध्याय ८१–९३)",
      shlokas: "१३ अध्याय • ७०० मन्त्र",
      speaker: "महर्षि मेधा ऋषि, सुरथ राजा एवं समाधि वैश्य",
      readerSlug: "markandeya-purana",
      theme: "महाकाली, महालक्ष्मी एवं महासरस्वती का प्राकट्य, मधु-कैटभ वध, महिषासुर संहार एवं शुम्भ-निशुम्भ वध। जगज्जननी की परम आद्याशक्ति के रूप में प्रतिष्ठा।",
      highlight: "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके • या देवी सर्वभूतेषु मातृरूपेण संस्थिता",
    },
    {
      id: "yaksha-prashna",
      title: "यक्ष-युधिष्ठिर संवाद (Yaksha Prashna)",
      source: "महाभारत • वनपर्व (अरण्यक ३१३)",
      shlokas: "१ अध्याय • १२५+ प्रश्न-उत्तर",
      speaker: "यक्ष (धर्मराज) एवं धर्मराज युधिष्ठिर",
      readerSlug: "mahabharata",
      theme: "संसार का सबसे बड़ा आश्चर्य, ज्ञान, दया, लज्जा, धृति तथा धर्म के गूढ़ रहस्यों पर युधिष्ठिर के तात्त्विक उत्तर, जिससे चारों मृत पाण्डव पुनः जीवित हुए।",
      highlight: "माता गुरुतरा भूमेः खात्पितोच्चतरस्तथा • अहन्यहनि भूतानि गच्छन्ति यममन्दिरम्",
    },
    {
      id: "vishnu-sahasranama",
      title: "विष्णु सहस्रनाम स्तोत्र (1000 Divine Names)",
      source: "महाभारत • अनुशासनपर्व (अध्याय १४९)",
      shlokas: "१४९ श्लोक • १००० दिव्य नाम",
      speaker: "शरशय्या पर स्थित भीष्म पितामह एवं युधिष्ठिर",
      readerSlug: "mahabharata",
      theme: "भीष्म पितामह द्वारा युधिष्ठिर के प्रश्न पर परमात्मा श्रीविष्णु के एक सहस्र दिव्य नामों का उपदेश। आदि शंकराचार्य का प्रथम भाष्य इसी पर है।",
      highlight: "यस्य स्मरणात् सर्वपापेभ्यो विमुच्यते • यतः सर्वाणि भूतानि भवन्त्यादियुगागमे",
    },
    {
      id: "vidura-niti",
      title: "विदुर नीति (Ethical & Political Wisdom)",
      source: "महाभारत • उद्योगपर्व (प्रजागर पर्व ३३–४०)",
      shlokas: "८ अध्याय • ५००+ श्लोक",
      speaker: "महात्मा विदुर एवं व्यथित महाराज धृतराष्ट्र",
      readerSlug: "mahabharata",
      theme: "युद्ध से पूर्व चिंतातुर धृतराष्ट्र को आत्मसंयम, धर्म, नीति, न्याय, मूर्ख व पंडित के लक्षण और राज्य-सञ्चालन का विशद उपदेश।",
      highlight: "एकं विषरसो हन्ति शस्त्रेणैकश्च वध्यते • स हन्ति सविषं राष्ट्रं यद्राजानं प्रपद्यते",
    },
    {
      id: "sanatsujatiya",
      title: "सनत्सुजातीय (Sanatsujatiya Brahmavidya)",
      source: "महाभारत • उद्योगपर्व (अध्याय ४१–४६)",
      shlokas: "४ अध्याय • ब्रह्मविद्या निरूपण",
      speaker: "महर्षि सनत्सुजात एवं धृतराष्ट्र",
      readerSlug: "mahabharata",
      theme: "मृत्यु के रहस्य का उद्घाटन: 'प्रमादं वै मृत्युमहं ब्रवीमि' — असावधानी और अज्ञान ही मृत्यु है, आत्मज्ञान ही अमरता है। आदि शंकराचार्य भाष्य युक्त।",
      highlight: "प्रमादं वै मृत्युमहं ब्रवीमि सदाऽप्रमादममृतत्वं ब्रवीमि",
    },
    {
      id: "gopi-gita",
      title: "गोपी गीत एवं भ्रमर गीत",
      source: "श्रीमद्भागवत महापुराण • दशम स्कन्ध (अध्याय ३१ व ४७)",
      shlokas: "१९+ श्लोक • रास पञ्चाध्यायी",
      speaker: "विप्रलम्भ शृंगार में गोपियाँ एवं उद्धव जी",
      readerSlug: "shrimad-bhagavata",
      theme: "गोपियों की भगवान श्रीकृष्ण के प्रति निष्काम, परम पराभक्ति और विरह-वेदना। जीव का परमात्मा से अनन्य तादात्म्य।",
      highlight: "जयति तेऽधिकं जन्मना व्रजः श्रयत इन्दिरा शश्वदत्र हि (१०.३१.१)",
    },
    {
      id: "mula-ramayana",
      title: "मूल रामायण / संक्षेप रामायण (Bala Kanda Sarga 1)",
      source: "वाल्मीकि रामायण • बालकाण्ड (सर्ग १)",
      shlokas: "१०० श्लोक",
      speaker: "देवर्षि नारद एवं महर्षि वाल्मीकि",
      readerSlug: "valmiki-ramayana",
      theme: "वाल्मीकि जी के प्रश्न 'को न्वस्मिन् साम्प्रतं लोके गुणवान् कश्च वीर्यवान्' के उत्तर में नारद जी द्वारा सम्पूर्ण रामायण का सार-संक्षेप।",
      highlight: "इक्ष्वाकुवंशप्रभवो रामो नाम जनैः श्रुतः • नियतात्मा महावीर्यो द्युतिमान् धृतिमान् वशी",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-br from-[#1c1209] via-[#2a190d] to-[#1a1008] text-white p-6 sm:p-8 rounded-3xl border border-amber-800/40 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>CANONICAL STRUCTURE & DEEP TAXONOMY</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              पुराण एवं इतिहास गहन विभाजन एवं आख्यान रत्न
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm font-devanagari mt-1 max-w-3xl leading-relaxed">
              १८ महापुराणों के खण्ड व संहिताएँ, वाल्मीकि रामायण के ७ काण्ड, महाभारत के १८ पर्व, पंच-दश लक्षण तथा इतिहास-पुराण के अनमोल दार्शनिक आख्यान।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-amber-900/50 border border-amber-600/30 text-amber-200 text-xs font-semibold">
              १८ महापुराण • १८ उपपुराण • ७ काण्ड • १८ पर्व
            </span>
          </div>
        </div>

        {/* Sub-Navigation Bar */}
        <div className="mt-6 pt-5 border-t border-amber-800/50 flex flex-wrap items-center gap-2">
          {[
            {
              id: "purana_khandas",
              label: "१८ महापुराण खण्ड व संरचना",
              icon: Crown,
            },
            {
              id: "major_akhyanas",
              label: "प्रमुख दार्शनिक आख्यान रत्न (Gita & Jewels)",
              icon: Sparkles,
            },
            {
              id: "ramayana_kandas",
              label: "वाल्मीकि रामायण ७ काण्ड संरचना",
              icon: Heart,
            },
            {
              id: "mahabharata_parvas",
              label: "महाभारत १८ पर्व व विकास-क्रम",
              icon: Shield,
            },
            {
              id: "lakshanas_upapuranas",
              label: "पंच-दश लक्षण एवं १८ उपपुराण",
              icon: Compass,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-stone-950 shadow-sm"
                    : "bg-black/40 text-stone-300 hover:text-white hover:bg-black/60 border border-amber-900/30"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-stone-950" : "text-amber-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: 18 MAHAPURANAS DEEP KHANDAS & SAMHITAS */}
      {/* ========================================================================= */}
      {activeSubTab === "purana_khandas" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Guna Filter Tabs */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mr-2">
                त्रिगुण वर्गीकरण:
              </span>
              {gunas.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGunaFilter(g.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedGunaFilter === g.id
                      ? "bg-amber-800 text-white shadow-xs font-bold"
                      : "bg-stone-50 text-stone-700 hover:bg-amber-50 hover:text-amber-900 border border-stone-200"
                  }`}
                >
                  {g.label} ({g.count})
                </button>
              ))}
            </div>
            <span className="text-xs text-stone-500 font-devanagari">
              पद्म पुराण उत्तर खण्डानुसार वर्गीकरण
            </span>
          </div>

          {/* Mahapuranas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPuranas.map((purana) => {
              const isExpanded = expandedPuranaId === purana.id;
              return (
                <div
                  key={purana.id}
                  className="rounded-2xl border border-amber-200/80 bg-white p-5 shadow-xs hover:border-amber-300 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                        क्रम #{purana.order}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          purana.guna.includes("सात्त्विक")
                            ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            : purana.guna.includes("राजस")
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-indigo-100 text-indigo-900 border border-indigo-300"
                        }`}
                      >
                        {purana.guna}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="font-serif text-xl font-bold text-stone-900">
                        {purana.name}
                      </h4>
                      <div className="text-xs text-amber-900 font-semibold mt-0.5">
                        {purana.presidingDeity} • {purana.shlokas}
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 font-devanagari leading-relaxed line-clamp-3">
                      {purana.desc}
                    </p>

                    {/* Structure Info Box */}
                    <div className="p-3 rounded-xl bg-[#fffdfa] border border-amber-200 text-xs font-devanagari">
                      <strong className="text-amber-950 block mb-1">
                        विभाजन व खण्ड संरचना:
                      </strong>
                      <p className="text-stone-800 font-semibold">{purana.structure}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {purana.majorKhandas.map((k, kIdx) => (
                          <span
                            key={kIdx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-stone-100 space-y-3 animate-fadeIn text-xs font-devanagari">
                        <div>
                          <strong className="text-stone-900 block mb-1">
                            प्रमुख आख्यान एवं उपाख्यान:
                          </strong>
                          <ul className="space-y-1 text-stone-700">
                            {purana.keyNarratives.map((kn, idx) => (
                              <li key={idx} className="flex items-start gap-1">
                                <span className="text-amber-700">•</span>
                                <span>{kn}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {purana.famousStotras && (
                          <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-[11px]">
                            <strong className="text-amber-950 block">प्रसिद्ध स्तोत्र:</strong>
                            <span className="text-stone-700">
                              {purana.famousStotras.join(", ")}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setExpandedPuranaId(isExpanded ? null : purana.id)}
                      className="text-xs font-bold text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      {isExpanded ? "कम देखें" : "आख्यान देखें"}
                    </button>

                    {onSelectReaderText && (
                      <button
                        type="button"
                        onClick={() => onSelectReaderText(purana.slug)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-800 text-white text-xs font-bold hover:bg-amber-900 transition-colors shadow-2xs cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>श्लोक वाचन</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: MAJOR AKHYANAS & JEWELS */}
      {/* ========================================================================= */}
      {activeSubTab === "major_akhyanas" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                दार्शनिक रत्न एवं कालजयी संवाद
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                इतिहास व पुराणों के प्रमुख आख्यान (Major Narratives & Philosophical Jewels)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-devanagari mt-0.5 max-w-3xl leading-relaxed">
                महाभारत, रामायण एवं पुराणों के वे पावन उप-ग्रंथ जिन्होंने भारतीय चिंतन, नीति, अध्यात्म और साधना को अमर दिशा प्रदान की।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {MAJOR_AKHYANAS.map((akhyana) => (
                <div
                  key={akhyana.id}
                  className="p-5 rounded-2xl border border-amber-200 bg-[#fffdfa] shadow-2xs space-y-3.5 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-200">
                        {akhyana.source}
                      </span>
                      <span className="text-xs font-semibold text-stone-500 font-serif">
                        {akhyana.shlokas}
                      </span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-stone-900">
                      {akhyana.title}
                    </h4>

                    <div className="text-xs text-stone-600 font-devanagari">
                      <strong>वक्ता एवं श्रोता:</strong> {akhyana.speaker}
                    </div>

                    <p className="text-xs text-stone-700 font-devanagari leading-relaxed">
                      {akhyana.theme}
                    </p>

                    <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs font-devanagari text-amber-950 italic">
                      <strong className="not-italic block mb-0.5 font-bold">
                        अमर सूत्र:
                      </strong>
                      "{akhyana.highlight}"
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">
                      लाइब्रेरी में प्रामाणिक पाठ उपलब्ध
                    </span>
                    {onSelectReaderText && (
                      <button
                        type="button"
                        onClick={() => onSelectReaderText(akhyana.readerSlug)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-800 text-white text-xs font-bold hover:bg-amber-900 transition-colors shadow-2xs cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>मूल श्लोक पढ़ें</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: VALMIKI RAMAYANA 7 KANDAS */}
      {/* ========================================================================= */}
      {activeSubTab === "ramayana_kandas" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200">
                आदिकाव्य • २४,००० श्लोक
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                श्रीमद्वाल्मीकि रामायण का ७ काण्डों में गहन विभाजन
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-devanagari mt-0.5 max-w-3xl leading-relaxed">
                गायत्री महामंत्र के २४ अक्षरों से रामायण के प्रत्येक १,००० श्लोकों पर एक नए सर्ग का शुभारंभ होता है (गायत्री रामायण)।
              </p>
            </div>

            {/* Gayatri Connection Banner */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-devanagari">
              <div>
                <strong className="text-amber-950 block text-sm">
                  गायत्री रामायण रहस्य (24 Akshara - 24,000 Shlokas):
                </strong>
                <p className="text-stone-700 mt-0.5">
                  'तत्सवितुर्वरेण्यं...' के २४ अक्षरों से क्रमशः २४ सहस्र श्लोक बंधे हैं। प्रथम श्लोक 'त' अक्षर से ('तपःस्वाध्यायनिरतं...') आरंभ होता है।
                </p>
              </div>
              {onSelectReaderText && (
                <button
                  type="button"
                  onClick={() => onSelectReaderText("valmiki-ramayana")}
                  className="px-3.5 py-2 rounded-xl bg-amber-800 text-white font-bold text-xs shrink-0 hover:bg-amber-900 transition-colors shadow-2xs cursor-pointer"
                >
                  मूल रामायण पाठ →
                </button>
              )}
            </div>

            {/* Kandas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RAMAYANA_DATA.kandas.map((kanda) => (
                <div
                  key={kanda.id}
                  className="rounded-2xl border border-stone-200 bg-[#fffdfa] p-5 shadow-2xs space-y-3.5 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                        काण्ड #{kanda.order}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">
                        {kanda.sargas} सर्ग • {kanda.shlokas} श्लोक
                      </span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-stone-900">
                      {kanda.name} ({kanda.enName})
                    </h4>

                    <p className="text-xs text-stone-600 font-devanagari leading-relaxed">
                      {kanda.desc}
                    </p>

                    <div className="pt-2 border-t border-stone-100">
                      <strong className="text-xs font-bold text-stone-900 block font-devanagari mb-1">
                        प्रमुख प्रसंग:
                      </strong>
                      <ul className="space-y-1 text-xs text-stone-700 font-devanagari">
                        {kanda.keyEpisodes.slice(0, 4).map((ep, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-rose-700">•</span>
                            <span>{ep}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] font-devanagari text-stone-700">
                    <strong>केन्द्रीय संदेश:</strong> {kanda.centralMessage}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: MAHABHARATA 18 PARVAS & EVOLUTION */}
      {/* ========================================================================= */}
      {activeSubTab === "mahabharata_parvas" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-full border border-indigo-200">
                पंचम वेद • १,००,००० श्लोक
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                महाभारत का १८ पर्वों में विभाजन एवं विकास-क्रम
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-devanagari mt-0.5 max-w-3xl leading-relaxed">
                'यन्नेहास्ति न कुत्रचित्' — जो महाभारत में नहीं है, वह कहीं नहीं है।
              </p>
            </div>

            {/* 3 Evolution Stages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs font-devanagari space-y-1">
                <span className="text-amber-900 font-bold uppercase text-[10px] tracking-wider block">
                  प्रथम चरण (Stage 1)
                </span>
                <div className="text-base font-serif font-bold text-stone-900">
                  जय (Jaya) • ८,८०० श्लोक
                </div>
                <p className="text-stone-700">
                  महर्षि वेदव्यास द्वारा विरचित मूल ग्रंथ। कौरव-पाण्डव युद्ध में धर्म की विजय।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs font-devanagari space-y-1">
                <span className="text-indigo-900 font-bold uppercase text-[10px] tracking-wider block">
                  द्वितीय चरण (Stage 2)
                </span>
                <div className="text-base font-serif font-bold text-stone-900">
                  भारत (Bharata) • २४,००० श्लोक
                </div>
                <p className="text-stone-700">
                  व्यास शिष्य वैशम्पायन जी द्वारा महाराज जनमेजय के सर्पसत्र में सुनाया गया आख्यान।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs font-devanagari space-y-1">
                <span className="text-emerald-900 font-bold uppercase text-[10px] tracking-wider block">
                  तृतीय चरण (Stage 3)
                </span>
                <div className="text-base font-serif font-bold text-stone-900">
                  महाभारत • १,००,००० श्लोक
                </div>
                <p className="text-stone-700">
                  सूतजी (उग्रश्रवा) द्वारा नैमिषारण्य में शौनकादि ऋषियों के सम्मुख उपाख्यानों सहित विशद वाचन।
                </p>
              </div>
            </div>

            {/* 18 Parvas Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {MAHABHARATA_DATA.parvas.map((parva) => (
                <div
                  key={parva.id}
                  className="p-4 rounded-2xl border border-stone-200 bg-[#fffdfa] shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                      पर्व #{parva.order}
                    </span>
                    <span className="text-[11px] text-stone-500 font-mono">
                      {parva.adhyayas} अध्याय • {parva.shlokas} श्लोक
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-stone-900">
                    {parva.name} ({parva.enName})
                  </h4>

                  <p className="text-xs text-stone-600 font-devanagari leading-relaxed">
                    {parva.desc}
                  </p>

                  <div className="text-[11px] text-amber-900 font-semibold font-devanagari">
                    प्रमुख: {parva.keyEpisodes.slice(0, 3).join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 5: PANCHA & DASHA LAKSHANA & UPAPURANAS */}
      {/* ========================================================================= */}
      {activeSubTab === "lakshanas_upapuranas" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Pancha vs Dasha Lakshana */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                शास्त्रीय परिभाषा
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                पुराणों के पंच लक्षण एवं महापुराणों के दश लक्षण
              </h3>
            </div>

            {/* Sanskrit Verses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#fffdfa] border border-amber-200 font-devanagari text-xs space-y-2">
                <strong className="text-amber-950 block text-sm">
                  पंच लक्षण (अमरकोश व मत्स्य पुराण ५३.६५):
                </strong>
                <p className="italic text-stone-800 font-serif">
                  "सर्गश्च प्रतिसर्गश्च वंशो मन्वन्तराणि च। वंशानुचरितं चैव पुराणं पञ्चलक्षणम्॥"
                </p>
                <div className="text-stone-700">
                  सर्ग (प्राथमिक सृष्टि), प्रतिसर्ग (प्रलय व पुनरुत्पत्ति), वंश (देव-ऋषि वंशावली), मन्वन्तर (मनु कालचक्र), वंशानुचरित (सूर्य-चन्द्र राजवंश इतिहास)।
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#fffdfa] border border-indigo-200 font-devanagari text-xs space-y-2">
                <strong className="text-indigo-950 block text-sm">
                  दश लक्षण (श्रीमद्भागवत १२.७.९-१०):
                </strong>
                <p className="italic text-stone-800 font-serif">
                  "सर्गोऽस्याथ विसर्गश्च वृत्ती रक्षान्तराणि च। वंशो वंशानुचरितं संस्था हेतुरपाश्रयः॥"
                </p>
                <div className="text-stone-700">
                  महापुराणों में ५ के अतिरिक्त विसर्ग (व्यष्टि सृष्टि), वृत्ति (आजीविका), रक्षा (अवतार लीला), संस्था (प्रलय), हेतु (कर्म वासना), और अपाश्रय (परब्रह्म आश्रय) भी होते हैं।
                </div>
              </div>
            </div>

            {/* 18 Upapuranas List */}
            <div className="pt-4 border-t border-stone-200">
              <h4 className="font-serif text-xl font-bold text-stone-900 mb-3">
                १८ उपपुराण (18 Canonical Upapuranas)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {UPAPURANAS_DATA.map((up, idx) => (
                  <div
                    key={up.id || idx}
                    className="p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs font-devanagari space-y-1"
                  >
                    <div className="font-bold text-amber-950">
                      {idx + 1}. {up.name} ({up.enName})
                    </div>
                    <div className="text-stone-600 text-[11px]">
                      <strong>देवता:</strong> {up.presidingDeity} • {up.shlokas}
                    </div>
                    <p className="text-stone-700 text-[11px] line-clamp-2">
                      {up.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
