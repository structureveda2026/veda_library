import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  BookOpen,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Flame,
  Scroll,
  Sun,
  Filter
} from "lucide-react";
import { MASTER_CATEGORIES } from "../../data/megaMenuData.js";
import { FOUR_VEDAS, TOPIC_CHIPS, GRANTHA_ARCHIVE } from "../../data/libraryHomeData.js";
import { ALL_VEDIC_MANTRAS, searchMantras } from "../../data/vedicMantrasData.js";
import { VEDA_HIERARCHY_TREE } from "../../data/vedaHierarchyTree.js";

const POPULAR_SUGGESTIONS = [
  { name: "अग्नि सूक्त (1.1.1)", path: "/library/mantra/rv-1-1-1" },
  { name: "गायत्री महामंत्र (3.62.10)", path: "/library/mantra/rv-3-62-10" },
  { name: "रुद्राष्टाध्यायी (16.1)", path: "/library/mantra/vs-16-1" },
  { name: "शिवसंकल्प सूक्त (34.1)", path: "/library/mantra/vs-34-1" },
  { name: "ईशावास्योपनिषद (40.1)", path: "/library/mantra/vs-40-1" },
  { name: "पुरुष सूक्त (10.90.1)", path: "/library/mantra/rv-10-90-1" },
  { name: "Rigveda", path: "/library/veda/rigveda" },
  { name: "Yajurveda", path: "/library/veda/yajurveda" },
  { name: "Samaveda", path: "/library/veda/samaveda" },
  { name: "Atharvaveda", path: "/library/veda/atharvaveda" }
];

export default function SearchModal({ isOpen, onClose, initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedFilter, setSelectedFilter] = useState("all"); // 'all', 'mantras', 'vedas', 'granthas', 'categories'
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery || "");
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, initialQuery, onClose]);

  if (!isOpen) return null;

  const normalized = query.trim().toLowerCase();

  // Search matches
  const matchedMantras = normalized ? searchMantras(normalized) : [];

  const matchedCategories = MASTER_CATEGORIES.filter(
    (c) =>
      c.title.toLowerCase().includes(normalized) ||
      c.enTitle.toLowerCase().includes(normalized) ||
      c.tagline.toLowerCase().includes(normalized)
  );

  const matchedVedas = FOUR_VEDAS.filter(
    (v) =>
      v.name.toLowerCase().includes(normalized) ||
      v.enName.toLowerCase().includes(normalized) ||
      v.desc.toLowerCase().includes(normalized)
  );

  const matchedTopics = TOPIC_CHIPS.filter((t) =>
    t.name.toLowerCase().includes(normalized)
  );

  const matchedGranthas = GRANTHA_ARCHIVE.filter(
    (g) =>
      g.name.toLowerCase().includes(normalized) ||
      g.enName.toLowerCase().includes(normalized) ||
      g.author.toLowerCase().includes(normalized) ||
      g.summary.toLowerCase().includes(normalized)
  );

  const hasResults =
    matchedMantras.length > 0 ||
    matchedCategories.length > 0 ||
    matchedVedas.length > 0 ||
    matchedTopics.length > 0 ||
    matchedGranthas.length > 0;

  const handleSelectResult = (path) => {
    onClose();
    if (path) navigate(path);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card: Pure White #FFFFFF, Clean 1px border #E5E5E5 */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E5E5E5] overflow-hidden z-10 flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E5E5E5] bg-white">
          <Search className="w-5 h-5 text-[#555555] mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Veda, Shakha, Grantha, Mantra No. (1.1.1), Shloka..."
            className="w-full bg-transparent text-[#111111] placeholder:text-[#888888] focus:outline-none text-sm sm:text-base font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-[#888888] hover:text-[#111111] rounded-full mr-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-[#555555] hover:text-[#111111] bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Filter Chips Bar */}
        <div className="px-4 py-2 border-b border-[#E5E5E5] bg-white flex items-center gap-1.5 overflow-x-auto text-xs font-medium scrollbar-none">
          <span className="text-[#888888] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#555555]" />
            <span>फ़िल्टर:</span>
          </span>
          {[
            { id: "all", label: "सभी (All)" },
            { id: "mantras", label: `वेदमंत्र (${matchedMantras.length})` },
            { id: "vedas", label: "वेद व शाखाएँ" },
            { id: "granthas", label: "ग्रंथ व संग्रह" }
          ].map((flt) => {
            const isActive = selectedFilter === flt.id;
            return (
              <button
                key={flt.id}
                type="button"
                onClick={() => setSelectedFilter(flt.id)}
                className={`px-3 py-1 rounded-full text-[11px] transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#FFD21F] text-[#111111] font-bold border border-[#FFD21F] shadow-xs"
                    : "bg-white text-[#555555] hover:text-[#111111] border border-[#E5E5E5] hover:border-[#D9A441]"
                }`}
              >
                {flt.label}
              </button>
            );
          })}
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-4 text-left">
          {!query ? (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#555555] mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>लोकप्रिय खोज (Popular Search Suggestions)</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SUGGESTIONS.map((sug) => (
                  <button
                    key={sug.name}
                    onClick={() => handleSelectResult(sug.path)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-[#111111] border border-[#E5E5E5] hover:border-[#D9A441] hover:bg-[#FFD21F]/15 transition-all cursor-pointer shadow-xs"
                  >
                    {sug.name}
                  </button>
                ))}
              </div>
            </div>
          ) : !hasResults ? (
            <div className="py-8 text-center text-[#555555] space-y-4">
              <div>
                <p className="text-sm font-semibold text-[#111111]">"{query}" के लिए कोई परिणाम नहीं मिला।</p>
                <p className="text-xs text-[#555555] mt-1">
                  कृपया अन्य कीवर्ड, वेद, सूक्त, मंत्र संख्या (उदा. 1.1.1, Agni, Rudra, Gayatri) खोजें।
                </p>
              </div>

              {/* Zero-Results Helpful Recommendations */}
              <div className="pt-3 border-t border-[#E5E5E5] text-left">
                <p className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>सुझाए गए प्रमुख ग्रंथ एवं मंत्र:</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SUGGESTIONS.slice(0, 6).map((rec) => (
                    <button
                      key={rec.name}
                      onClick={() => handleSelectResult(rec.path)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-[#111111] border border-[#E5E5E5] hover:border-[#D9A441] hover:bg-[#FFD21F]/20 transition-all cursor-pointer"
                    >
                      {rec.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* 1. Verified Vedic Mantras Matches */}
              {(selectedFilter === "all" || selectedFilter === "mantras") &&
                matchedMantras.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-[#C62828]" />
                        <span>प्रामाणिक वेदमंत्र (Vedic Mantras)</span>
                      </span>
                      <span className="text-[10px] text-[#111111] bg-[#FFD21F] font-bold px-2 py-0.5 rounded-full">
                        {matchedMantras.length} मिले
                      </span>
                    </h4>
                    <div className="space-y-2">
                      {matchedMantras.map((m) => (
                        <div
                          key={m.id}
                          onClick={() => handleSelectResult(`/library/mantra/${m.id}`)}
                          className="p-3.5 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] hover:bg-stone-50/50 transition-all cursor-pointer group shadow-xs"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-xs font-bold text-[#111111] bg-[#F9F9F9] px-2 py-0.5 rounded border border-[#E5E5E5]">
                              {m.textName} • मंत्र {m.mantraNumber}
                            </span>
                            <span className="text-[10px] text-[#555555]">
                              {m.shakha} • {m.rishi}
                            </span>
                          </div>
                          <p className="font-devanagari text-xs sm:text-sm font-bold text-[#111111] group-hover:text-[#D9A441] line-clamp-1">
                            {m.sanskrit}
                          </p>
                          <p className="text-xs text-[#555555] font-devanagari mt-1 line-clamp-1">
                            {m.hindiTranslation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* 2. Veda Matches */}
              {(selectedFilter === "all" || selectedFilter === "vedas") &&
                matchedVedas.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2 flex items-center gap-1.5">
                      <Scroll className="w-3.5 h-3.5 text-[#D9A441]" />
                      <span>वेद एवं शाखाएँ (The Vedas)</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {matchedVedas.map((v) => (
                        <div
                          key={v.id}
                          onClick={() => handleSelectResult(`/library/veda/${v.id}`)}
                          className="p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] hover:bg-stone-50/50 transition-all flex items-start gap-2.5 cursor-pointer group shadow-xs"
                        >
                          <BookOpen className="w-4 h-4 text-[#D9A441] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-[#111111] group-hover:text-[#D9A441]">
                              {v.name} <span className="text-xs text-[#555555] font-normal">({v.enName})</span>
                            </p>
                            <p className="text-xs text-[#555555] line-clamp-1">{v.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* 3. Granthas Matches */}
              {(selectedFilter === "all" || selectedFilter === "granthas") &&
                matchedGranthas.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#D9A441]" />
                      <span>ग्रंथ संग्रह (Grantha Archive)</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {matchedGranthas.map((g) => (
                        <div
                          key={g.name}
                          onClick={() => handleSelectResult("/library/collections")}
                          className="p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] hover:bg-stone-50/50 transition-all flex items-start gap-2.5 cursor-pointer group shadow-xs"
                        >
                          <BookOpen className="w-4 h-4 text-[#D9A441] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-[#111111] group-hover:text-[#D9A441]">{g.name}</p>
                            <p className="text-xs text-[#555555] line-clamp-1">{g.author} • {g.summary}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* 4. Master Categories */}
              {(selectedFilter === "all" || selectedFilter === "categories") &&
                matchedCategories.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#D9A441]" />
                      <span>ज्ञान श्रेणियाँ (Knowledge Taxonomy)</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {matchedCategories.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => handleSelectResult(c.route || "/library/knowledge")}
                          className="p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-[#D9A441] hover:bg-stone-50/50 transition-all flex items-start gap-2.5 cursor-pointer group shadow-xs"
                        >
                          <Layers className="w-4 h-4 text-[#D9A441] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-[#111111] group-hover:text-[#D9A441]">
                              {c.title} <span className="text-xs text-[#555555] font-normal">({c.enTitle})</span>
                            </p>
                            <p className="text-xs text-[#555555] line-clamp-1">{c.tagline}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>

        {/* Footer Quick Info */}
        <div className="p-3 bg-white border-t border-[#E5E5E5] text-center text-[11px] text-[#555555] flex items-center justify-between px-4">
          <span>वेदों के मूल मंत्रों, शाखाओं और ग्रंथों को खोजने के लिए कीवर्ड टाइप करें</span>
          <span className="font-mono text-[10px] text-[#888888] bg-stone-100 px-2 py-0.5 rounded border border-[#E5E5E5]">Ctrl+K / ⌘K</span>
        </div>
      </div>
    </div>
  );
}
