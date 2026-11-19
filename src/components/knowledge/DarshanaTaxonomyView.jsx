import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import {
  Brain,
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  ArrowRight,
  Compass,
  CheckCircle2,
  Scroll,
  Sun,
  Flame,
} from "lucide-react";
import {
  SHAD_DARSHANAS_DATA,
  NASTIKA_DARSHANAS_DATA,
  DARSHANA_NESTED_TAXONOMY_TREE,
} from "../../data/darshanaData.js";
import { MUKTIKA_CANON_SUMMARY } from "../../data/upanishadData.js";

export default function DarshanaTaxonomyView({ onSelectReaderText }) {
  const { isHindi } = useLanguage();
  // Sub-sections: 'astika_pairs', 'vedanta_subschools', 'nastika_systems', 'muktika_tree'
  const [activeSubTab, setActiveSubTab] = useState("astika_pairs");
  const [expandedSchoolId, setExpandedSchoolId] = useState("nyaya");
  const [selectedVedantaSchool, setSelectedVedantaSchool] = useState("advaita");

  // Pair groups for Astika Darshana
  const pairs = [
    {
      id: "pair-1",
      title: "१. न्याय एवं वैशेषिक युगल (Epistemology & Atomistic Realism)",
      theme: "प्रमाण-मीमांसा, तार्किक अन्वेषण एवं परमाणु-सृष्टि विज्ञान",
      badge: "तर्क व पदार्थ विज्ञान",
      schools: SHAD_DARSHANAS_DATA.filter((d) => ["nyaya", "vaisheshika"].includes(d.id)),
    },
    {
      id: "pair-2",
      title: "२. सांख्य एवं योग युगल (Cosmic Dualism & Practical Realization)",
      theme: "२५ तत्त्वों का विवेक-ज्ञान एवं चित्तवृत्ति-निरोध द्वारा कैवल्य",
      badge: "तत्त्व व साधना विज्ञान",
      schools: SHAD_DARSHANAS_DATA.filter((d) => ["samkhya", "yoga"].includes(d.id)),
    },
    {
      id: "pair-3",
      title: "३. मीमांसा एवं वेदान्त युगल (Exegesis & Non-Dual Ultimate Reality)",
      theme: "कर्मकाण्ड एवं ज्ञानकाण्ड — धर्म-जिज्ञासा से ब्रह्म-जिज्ञासा की यात्रा",
      badge: "वेद-प्रामाण्य व ब्रह्म विज्ञान",
      schools: SHAD_DARSHANAS_DATA.filter((d) => ["mimamsa", "vedanta"].includes(d.id)),
    },
  ];

  const vedantaData = SHAD_DARSHANAS_DATA.find((d) => d.id === "vedanta");
  const vedantaSchools = vedantaData?.vedantaSchoolsDetailed || [];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-br from-[#1c140d] via-[#2a1a10] to-[#1a110a] text-white p-6 sm:p-8 rounded-3xl border border-amber-800/40 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
              <Brain className="w-3.5 h-3.5" />
              <span>PHILOSOPHICAL TAXONOMY & SUB-SCHOOLS</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              भारतीय दर्शन गहन वर्गीकरण एवं उप-परंपराएँ
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm font-devanagari mt-1 max-w-3xl leading-relaxed">
              आस्तिक षड्दर्शन युगल, वेदान्त के ६ प्रमुख संप्रदाय, नास्तिक श्रमण परंपराएँ तथा उपनिषदों का वैदिक ज्ञान-वृक्ष।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-amber-900/50 border border-amber-600/30 text-amber-200 text-xs font-semibold">
              ६ आस्तिक दर्शन • ३ नास्तिक दर्शन • ६ वेदान्त शाखाएँ
            </span>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="mt-6 pt-5 border-t border-amber-800/50 flex flex-wrap items-center gap-2">
          {[
            {
              id: "astika_pairs",
              label: "आस्तिक षड्दर्शन युगल (3 Allied Pairs)",
              icon: Layers,
            },
            {
              id: "vedanta_subschools",
              label: "वेदान्त की ६ उप-परंपराएँ (6 Vedanta Schools)",
              icon: Sun,
            },
            {
              id: "nastika_systems",
              label: "नास्तिक दर्शन परंपरा (Heterodox)",
              icon: Compass,
            },
            {
              id: "muktika_tree",
              label: "१०८ मुक्तिक कोष वर्गीकरण (Muktika Canon)",
              icon: Scroll,
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
      {/* SUB-TAB 1: ASTIKA ALLIED PAIRS (षड्दर्शन ३ युगल) */}
      {/* ========================================================================= */}
      {activeSubTab === "astika_pairs" && (
        <div className="space-y-8 animate-fadeIn">
          {pairs.map((pair) => (
            <div
              key={pair.id}
              className="rounded-3xl border border-stone-200 bg-white p-6 md:p-8 shadow-xs space-y-6"
            >
              {/* Pair Title Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                    {pair.badge}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                    {pair.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-devanagari mt-0.5">
                    {pair.theme}
                  </p>
                </div>
              </div>

              {/* Two Schools Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pair.schools.map((school) => {
                  const isExpanded = expandedSchoolId === school.id;
                  return (
                    <div
                      key={school.id}
                      className="rounded-2xl border border-amber-200/90 bg-[#fffdfa] p-5 md:p-6 shadow-2xs space-y-4 hover:border-amber-300 transition-colors"
                    >
                      {/* School Top Info */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-amber-900 px-2 py-0.5 rounded-md bg-amber-100">
                              प्रवर्तक: {school.founder}
                            </span>
                            <span className="text-xs text-stone-500 font-serif">
                              मूल ग्रंथ: {school.foundationalText}
                            </span>
                          </div>
                          <h4 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                            {school.name}
                            <span className="text-sm font-normal text-stone-500 ml-2 font-sans">
                              ({school.enName})
                            </span>
                          </h4>
                        </div>

                        {onSelectReaderText && (
                          <button
                            type="button"
                            onClick={() => onSelectReaderText(school.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-800 text-white text-xs font-bold hover:bg-amber-900 transition-colors shadow-2xs shrink-0 cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>सूत्र वाचन</span>
                          </button>
                        )}
                      </div>

                      {/* Epistemology / Pramanas */}
                      <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-800 space-y-1">
                        <div>
                          <strong>स्वीकृत प्रमाण ({school.pramanas.length}):</strong>{" "}
                          <span className="text-amber-900 font-semibold">
                            {school.pramanas.join(", ")}
                          </span>
                        </div>
                        <div>
                          <strong>पदार्थ स्वरूप:</strong> {school.padarthas}
                        </div>
                      </div>

                      {/* Core Philosophy Summary */}
                      <div className="space-y-1.5">
                        <strong className="text-xs font-bold text-stone-900 block font-devanagari">
                          मूल दार्शनिक सिद्धांत:
                        </strong>
                        <ul className="space-y-1 text-xs text-stone-700 font-devanagari">
                          {school.corePhilosophy.slice(0, 3).map((cp, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                              <span>{cp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Nested Details Toggle */}
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedSchoolId(isExpanded ? null : school.id)
                        }
                        className="w-full py-2 px-3 rounded-xl border border-amber-300 bg-amber-50/80 hover:bg-amber-100/80 text-xs font-bold text-amber-900 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>
                          {isExpanded
                            ? "गहन वर्गीकरण संकुचित करें (Collapse)"
                            : `गहन शास्त्रीय विभाजन देखें (${school.name} के विशेष अंग)`}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-amber-800" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-amber-800" />
                        )}
                      </button>

                      {/* EXPANDED DEEP NESTED CONTENT */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-amber-200/80 space-y-4 animate-fadeIn">
                          {/* NYAYA: 16 Padarthas & Syllogism */}
                          {school.id === "nyaya" && (
                            <div className="space-y-4">
                              {school.padarthasDetail && (
                                <div>
                                  <h5 className="font-serif text-sm font-bold text-stone-900 mb-2">
                                    न्याय के १६ पदार्थ (16 Epistemological Categories):
                                  </h5>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {school.padarthasDetail.map((p, idx) => (
                                      <div
                                        key={idx}
                                        className="p-2.5 rounded-lg bg-white border border-stone-200 text-[11px]"
                                      >
                                        <div className="font-bold text-amber-900">
                                          {idx + 1}. {p.name} ({p.enName})
                                        </div>
                                        <div className="text-stone-600 mt-0.5 font-devanagari">
                                          {p.definition}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {school.syllogism && (
                                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
                                  <div className="font-bold text-amber-950 mb-1">
                                    पञ्चावयव अनुमान (5-Member Syllogism):
                                  </div>
                                  <div className="space-y-1 font-devanagari text-stone-800">
                                    {school.syllogism.members.map((m, idx) => (
                                      <div key={idx} className="flex items-start gap-1">
                                        <span className="font-semibold text-amber-900 min-w-[70px]">
                                          {m.name}:
                                        </span>
                                        <span>{m.example}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* VAISHESHIKA: 7 Padarthas, 9 Dravyas, Paramanuvada */}
                          {school.id === "vaisheshika" && (
                            <div className="space-y-4">
                              {school.dravyasDetail && (
                                <div>
                                  <h5 className="font-serif text-sm font-bold text-stone-900 mb-2">
                                    वैशेषिक के ९ द्रव्य (9 Primary Substances):
                                  </h5>
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    {school.dravyasDetail.map((d, idx) => (
                                      <div
                                        key={idx}
                                        className="p-2.5 rounded-lg bg-white border border-stone-200 text-[11px]"
                                      >
                                        <div className="font-bold text-amber-900">
                                          {idx + 1}. {d.name} ({d.enName})
                                        </div>
                                        <div className="text-stone-600 mt-0.5 font-devanagari">
                                          {d.nature}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {school.paramanuvadaDetail && (
                                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-devanagari">
                                  <div className="font-bold text-amber-950 mb-1">
                                    {school.paramanuvadaDetail.title}
                                  </div>
                                  <p className="text-stone-700 leading-relaxed">
                                    {school.paramanuvadaDetail.description}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* SAMKHYA: 25 Tattvas & Satkaryavada */}
                          {school.id === "samkhya" && (
                            <div className="space-y-4">
                              {school.tattvasHierarchy && (
                                <div>
                                  <h5 className="font-serif text-sm font-bold text-stone-900 mb-2">
                                    सांख्य के २५ तत्त्वों की क्रमबद्ध सृष्टि (25 Tattvas Hierarchy):
                                  </h5>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {school.tattvasHierarchy.map((t, idx) => (
                                      <div
                                        key={idx}
                                        className="p-2.5 rounded-lg bg-white border border-stone-200 text-[11px]"
                                      >
                                        <div className="font-bold text-amber-900">
                                          {t.level}: {t.name}
                                        </div>
                                        <div className="text-stone-600 mt-0.5 font-devanagari">
                                          {t.elements.join(", ")}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {school.satkaryavadaPrinciples && (
                                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-devanagari">
                                  <div className="font-bold text-amber-950 mb-1">
                                    सत्कार्यवाद के ५ प्रमाण (5 Proofs of Pre-existent Effect):
                                  </div>
                                  <ul className="space-y-1 text-stone-800">
                                    {school.satkaryavadaPrinciples.map((sp, idx) => (
                                      <li key={idx} className="flex items-start gap-1.5">
                                        <span className="font-bold text-amber-900 shrink-0">
                                          • {sp.sanskrit}:
                                        </span>
                                        <span>{sp.explanation}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}

                          {/* YOGA: 4 Padas & 8 Limbs Ashtanga Yoga */}
                          {school.id === "yoga" && (
                            <div className="space-y-4">
                              {school.ashtangaLimbsDetail && (
                                <div>
                                  <h5 className="font-serif text-sm font-bold text-stone-900 mb-2">
                                    अष्टांग योग के आठ अंग (Eight Limbs of Classical Yoga):
                                  </h5>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {school.ashtangaLimbsDetail.map((limb, idx) => (
                                      <div
                                        key={idx}
                                        className="p-2.5 rounded-lg bg-white border border-stone-200 text-[11px]"
                                      >
                                        <div className="font-bold text-amber-900">
                                          अंग {idx + 1}: {limb.name} ({limb.enName})
                                        </div>
                                        <div className="text-stone-600 mt-0.5 font-devanagari">
                                          {limb.definition}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {school.padasDetail && (
                                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-devanagari">
                                  <div className="font-bold text-amber-950 mb-1">
                                    योग सूत्र के ४ पाद (१९५ सूत्र):
                                  </div>
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-stone-800">
                                    {school.padasDetail.map((p, idx) => (
                                      <div key={idx} className="p-2 rounded bg-white/80 border border-amber-100">
                                        <span className="font-bold text-amber-900 block">{p.name}</span>
                                        <span className="text-[10px] text-stone-500">{p.sutrasCount} सूत्र</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* MIMAMSA: 12 Adhyayas, Apurva, 3 Schools */}
                          {school.id === "mimamsa" && (
                            <div className="space-y-4">
                              {school.mimamsaSchools && (
                                <div>
                                  <h5 className="font-serif text-sm font-bold text-stone-900 mb-2">
                                    पूर्व मीमांसा के ३ उप-संप्रदाय (Three Sub-Schools):
                                  </h5>
                                  <div className="space-y-2">
                                    {school.mimamsaSchools.map((ms, idx) => (
                                      <div
                                        key={idx}
                                        className="p-2.5 rounded-lg bg-white border border-stone-200 text-xs"
                                      >
                                        <div className="font-bold text-amber-900">
                                          {ms.name} (आचार्य: {ms.acharya}) — {ms.pramanasCount} प्रमाण
                                        </div>
                                        <div className="text-stone-600 mt-0.5 font-devanagari text-[11px]">
                                          {ms.specialTenet}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {school.apurvaDoctrine && (
                                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-devanagari">
                                  <div className="font-bold text-amber-950 mb-1">
                                    अपूर्व सिद्धांत (Doctrine of Apūrva):
                                  </div>
                                  <p className="text-stone-700 leading-relaxed">
                                    {school.apurvaDoctrine.description}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* VEDANTA: 4 Adhyayas & 6 Schools reference */}
                          {school.id === "vedanta" && (
                            <div className="space-y-4">
                              {school.adhyayasDetail && (
                                <div>
                                  <h5 className="font-serif text-sm font-bold text-stone-900 mb-2">
                                    ब्रह्म सूत्र के ४ अध्याय (५५५ सूत्र):
                                  </h5>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {school.adhyayasDetail.map((a, idx) => (
                                      <div
                                        key={idx}
                                        className="p-2.5 rounded-lg bg-white border border-stone-200 text-xs"
                                      >
                                        <div className="font-bold text-amber-900">
                                          अध्याय {idx + 1}: {a.name} ({a.sutrasCount} सूत्र)
                                        </div>
                                        <div className="text-stone-600 mt-0.5 font-devanagari text-[11px]">
                                          {a.theme}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="p-3 rounded-xl bg-amber-100/70 border border-amber-300 text-xs flex items-center justify-between">
                                <span className="font-bold text-amber-950">
                                  वेदान्त के ६ प्रमुख संप्रदायों का विस्तृत तुलनात्मक अध्ययन देखें:
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setActiveSubTab("vedanta_subschools")}
                                  className="px-3 py-1 rounded-lg bg-amber-800 text-white font-bold text-xs hover:bg-amber-900 cursor-pointer"
                                >
                                  ६ संप्रदाय →
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: VEDANTA 6 MAJOR SUB-SCHOOLS */}
      {/* ========================================================================= */}
      {activeSubTab === "vedanta_subschools" && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                वेदान्त प्रस्थानत्रयी परंपरा
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                वेदान्त के ६ प्रमुख दार्शनिक संप्रदाय (Six Major Vedanta Schools)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-devanagari mt-1 max-w-3xl leading-relaxed">
                उपनिषद्, भगवद्गीता एवं ब्रह्मसूत्र (प्रस्थानत्रयी) पर आधारित भारतीय मनीषा के छह सर्वोच्च भाष्यकार एवं उनके सिद्धांत।
              </p>
            </div>

            {/* School Selector Pills */}
            <div className="flex flex-wrap items-center gap-2 border-b border-stone-100 pb-4">
              {vedantaSchools.map((vs) => (
                <button
                  key={vs.id}
                  type="button"
                  onClick={() => setSelectedVedantaSchool(vs.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    selectedVedantaSchool === vs.id
                      ? "bg-amber-800 text-white shadow-xs"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {vs.name} ({vs.founder})
                </button>
              ))}
            </div>

            {/* Detailed Active School View */}
            {(() => {
              const activeSchool =
                vedantaSchools.find((vs) => vs.id === selectedVedantaSchool) ||
                vedantaSchools[0];
              if (!activeSchool) return null;

              return (
                <div className="p-6 rounded-2xl border border-amber-200 bg-[#fffdfa] shadow-xs space-y-6">
                  {/* Title & Founder */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 pb-4">
                    <div>
                      <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-200">
                        आचार्य: {activeSchool.founder} ({activeSchool.period})
                      </span>
                      <h4 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1.5">
                        {activeSchool.name}
                        <span className="text-base font-normal text-stone-500 ml-2 font-sans">
                          ({activeSchool.enName})
                        </span>
                      </h4>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-stone-500 block">प्रमुख ग्रंथ</span>
                      <span className="text-xs font-bold text-stone-800 font-serif">
                        {activeSchool.foundationalTexts?.join(", ")}
                      </span>
                    </div>
                  </div>

                  {/* Triad Views: Jiva, Brahma, Jagat */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
                      <div className="flex items-center gap-2 font-bold text-amber-900 text-xs mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>ब्रह्म का स्वरूप (Brahman)</span>
                      </div>
                      <p className="text-xs text-stone-700 font-devanagari leading-relaxed">
                        {activeSchool.triadView?.brahman}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
                      <div className="flex items-center gap-2 font-bold text-indigo-900 text-xs mb-1">
                        <Brain className="w-3.5 h-3.5 text-indigo-600" />
                        <span>जीव का स्वरूप (Jiva / Self)</span>
                      </div>
                      <p className="text-xs text-stone-700 font-devanagari leading-relaxed">
                        {activeSchool.triadView?.jiva}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
                      <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs mb-1">
                        <Compass className="w-3.5 h-3.5 text-emerald-600" />
                        <span>जगत का स्वरूप (Jagat / World)</span>
                      </div>
                      <p className="text-xs text-stone-700 font-devanagari leading-relaxed">
                        {activeSchool.triadView?.jagat}
                      </p>
                    </div>
                  </div>

                  {/* Core Tenets & Sadhana / Moksha */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs font-devanagari space-y-2">
                      <strong className="text-amber-950 block text-xs">
                        प्रमुख दार्शनिक सिद्धांत (Core Doctrines):
                      </strong>
                      <ul className="space-y-1.5 list-disc pl-4 text-stone-800">
                        {activeSchool.coreDoctrines?.map((cd, idx) => (
                          <li key={idx}>{cd}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs font-devanagari space-y-3">
                      <div>
                        <strong className="text-stone-900 block text-xs">
                          साधना एवं मोक्ष मार्ग (Path of Liberation):
                        </strong>
                        <p className="text-stone-700 mt-1 leading-relaxed">
                          {activeSchool.sadhanaAndMoksha}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-stone-200">
                        <strong className="text-amber-900 block text-xs">
                          सुप्रसिद्ध महावाक्य / सूत्र:
                        </strong>
                        <span className="font-bold text-amber-950 font-serif text-sm block mt-0.5">
                          "{activeSchool.famousDictum}"
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Quick Summary Grid of All 6 Schools */}
            <div className="pt-4 border-t border-stone-200">
              <h4 className="font-serif text-base font-bold text-stone-900 mb-3">
                ६ वेदान्त संप्रदायों का संक्षिप्त तुलनात्मक पत्रक:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {vedantaSchools.map((vs) => (
                  <div
                    key={vs.id}
                    onClick={() => setSelectedVedantaSchool(vs.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedVedantaSchool === vs.id
                        ? "bg-amber-50/90 border-amber-400 shadow-2xs"
                        : "bg-white border-stone-200 hover:border-amber-200 hover:bg-stone-50"
                    }`}
                  >
                    <div className="font-bold text-xs text-stone-900">
                      {vs.name}
                    </div>
                    <div className="text-[11px] text-amber-900 font-semibold mt-0.5">
                      आचार्य: {vs.founder}
                    </div>
                    <p className="text-[10px] text-stone-600 mt-1 font-devanagari line-clamp-2">
                      {vs.coreTenetSummary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: NASTIKA SYSTEMS (नास्तिक / श्रमण परंपरा) */}
      {/* ========================================================================= */}
      {activeSubTab === "nastika_systems" && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200">
                अवैदिक / श्रमण दार्शनिक परंपरा
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                नास्तिक दर्शन परंपरा (Heterodox Indian Philosophies)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-devanagari mt-1 max-w-3xl leading-relaxed">
                जो दर्शन वेदों को अपौरुषेय स्वतः-प्रमाण स्वीकार नहीं करते — चार्वाक (भौतिकवाद), बौद्ध (चार आर्य सत्य व प्रतीत्यसमुत्पाद) एवं जैन (अनेकान्तवाद व स्याद्वाद)।
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {NASTIKA_DARSHANAS_DATA.map((nas) => (
                <div
                  key={nas.id}
                  className="rounded-2xl border border-stone-200 bg-[#fffdfa] p-5 shadow-2xs space-y-4 hover:border-amber-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-rose-900 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                        प्रवर्तक: {nas.founder}
                      </span>
                      <h4 className="font-serif text-xl font-bold text-stone-900 mt-1.5">
                        {nas.name}
                      </h4>
                      <span className="text-xs text-stone-500 font-sans">
                        {nas.enName}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 space-y-1">
                    <div>
                      <strong>स्वीकृत प्रमाण:</strong>{" "}
                      <span className="text-rose-900 font-semibold">
                        {nas.pramanas.join(", ")}
                      </span>
                    </div>
                    <div>
                      <strong>मूल ग्रंथ:</strong> {nas.foundationalText}
                    </div>
                  </div>

                  <div>
                    <strong className="text-xs font-bold text-stone-900 block font-devanagari mb-1">
                      मूल दार्शनिक सिद्धांत:
                    </strong>
                    <ul className="space-y-1 text-xs text-stone-700 font-devanagari">
                      {nas.corePhilosophy.map((cp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                          <span>{cp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {nas.subSchools && (
                    <div className="pt-2 border-t border-stone-200 space-y-1.5">
                      <strong className="text-xs font-bold text-stone-900 block font-devanagari">
                        ४ प्रमुख उप-संप्रदाय:
                      </strong>
                      <div className="space-y-1 text-xs text-stone-700 font-devanagari">
                        {nas.subSchools.map((sub, idx) => (
                          <div key={idx} className="p-1.5 rounded bg-white border border-stone-200 text-[11px]">
                            <span className="font-bold text-rose-950">{sub.name}:</span>{" "}
                            <span>{sub.tenet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs font-devanagari text-amber-950">
                    <strong>मुक्ति / साध्य दृष्टिकोण:</strong> {nas.mokshaView}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: 108 MUKTIKA CANON TAXONOMY */}
      {/* ========================================================================= */}
      {activeSubTab === "muktika_tree" && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                १०८ उपनिषद् ज्ञान-कोष
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                मुक्तिक उपनिषद् कोष का वैदिक एवं विषयवार विभाजन
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-devanagari mt-1 max-w-3xl leading-relaxed">
                मुक्तिकोपनिषद् में भगवान श्रीराम द्वारा पवनपुत्र हनुमान को उपदिष्ट १०८ उपनिषदों का प्रामाणिक वर्गीकरण।
              </p>
            </div>

            {/* Veda Division Grid */}
            <div>
              <h4 className="font-serif text-base font-bold text-stone-900 mb-3">
                १. वेदों के अनुसार १०८ उपनिषद् विभाजन:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MUKTIKA_CANON_SUMMARY.byVeda.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-amber-200 bg-[#fffdfa] shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900">{v.veda}</span>
                      <span className="text-lg font-serif font-bold text-amber-800">
                        {v.count}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-600 font-serif mt-1">
                      शांति पाठ: <span className="font-bold text-stone-800">{v.shantiMantra}</span>
                    </div>
                    <div className="mt-2 text-[10px] text-stone-500 font-devanagari">
                      प्रमुख: {v.prominent.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Thematic Division Grid */}
            <div className="pt-4 border-t border-stone-200">
              <h4 className="font-serif text-base font-bold text-stone-900 mb-3">
                २. दार्शनिक विषय एवं सम्प्रदाय के अनुसार विभाजन:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                {MUKTIKA_CANON_SUMMARY.byTheme.map((th, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-stone-200 bg-stone-50 text-center"
                  >
                    <div className="text-xl font-serif font-bold text-amber-800">
                      {th.count}
                    </div>
                    <div className="text-xs font-bold text-stone-900 mt-0.5">
                      {th.theme}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-1">
                      {th.desc}
                    </div>
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
