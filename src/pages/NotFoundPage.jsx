import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, Home, Search, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import SEO from "../components/common/SEO.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function NotFoundPage({ onOpenSearch }) {
  const { isHindi } = useLanguage();
  const navigate = useNavigate();

  const QUICK_PATHS = [
    { title: isHindi ? "चार वेद" : "The Four Vedas", path: "/category/vedas", desc: isHindi ? "ऋग्वेद, यजुर्वेद, सामवेद, अथर्ववेद" : "Rigveda, Yajurveda, Samaveda, Atharvaveda" },
    { title: isHindi ? "उपनिषद एवं दर्शन" : "Upanishad & Darshana", path: "/upanishad-darshana", desc: isHindi ? "ईश, केन, कठ व षड्दर्शन" : "108 Upanishads and 6 Darshanas" },
    { title: isHindi ? "पुराण एवं इतिहास" : "Purana & Itihasa", path: "/purana-itihasa", desc: isHindi ? "18 महापुराण, रामायण, महाभारत" : "18 Mahapuranas, Ramayana, Mahabharata" },
    { title: isHindi ? "मंत्र एवं स्तोत्र" : "Mantra & Stotra", path: "/mantra-stotra", desc: isHindi ? "शास्त्रीय स्तुति एवं जप" : "Vedic hymns, stotras and suktas" },
  ];

  return (
    <div className="min-h-[80vh] bg-[#FFFFFF] flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8">
      <SEO
        title={isHindi ? "404 पृष्ठ अप्राप्य — Veda Library" : "404 Page Not Found — Veda Library"}
        description={isHindi ? "यह पृष्ठ वर्तमान में उपलब्ध नहीं है। Veda Library में अन्य प्रामाणिक शास्त्रों एवं संदर्भों को खोजें।" : "The requested page was not found in Veda Library. Explore our authentic sacred scriptures."}
        robots="noindex, follow"
      />

      <div className="max-w-2xl mx-auto text-center">
        {/* Sacred Icon Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FFFDF0] border-2 border-[#D9A441] shadow-sm mb-6">
          <Compass className="w-10 h-10 text-[#D9A441] animate-pulse" />
        </div>

        {/* 404 & Sanskrit Shloka */}
        <p className="text-xs font-bold uppercase tracking-widest text-[#D9A441] bg-[#FFF9E6] px-3 py-1 rounded-full border border-[#D9A441]/40 inline-block mb-3">
          त्रुटि ४०४ • मार्गभ्रंशः
        </p>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#111111] tracking-tight">
          {isHindi ? "यह पृष्ठ अप्राप्य है" : "Page Not Found"}
        </h1>

        <p className="font-devanagari text-lg text-[#D9A441] font-semibold mt-3">
          "अन्वेषणे मार्गभ्रंशः — ज्ञानमार्गः सर्वदा उद्घाटितः"
        </p>

        <p className="text-sm sm:text-base text-[#555555] mt-2 max-w-lg mx-auto leading-relaxed">
          {isHindi
            ? "जिस पृष्ठ या ग्रंथ को आप खोज रहे हैं, वह स्थानांतरित कर दिया गया है अथवा उसका पता बदल गया है।"
            : "The page or scripture you are looking for has been moved or does not exist. Use the links below to continue your journey."}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FFD21F] text-[#111111] font-semibold text-sm hover:bg-[#D9A441] transition-all shadow-xs"
          >
            <Home className="w-4 h-4" />
            {isHindi ? "मुख्य पृष्ठ पर लौटें" : "Return to Library Home"}
          </Link>

          {onOpenSearch && (
            <button
              onClick={() => onOpenSearch("")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-[#E5E5E5] text-[#111111] font-medium text-sm hover:border-[#111111] transition-all shadow-xs"
            >
              <Search className="w-4 h-4 text-[#555555]" />
              {isHindi ? "संपूर्ण पुस्तकालय में खोजें (⌘K)" : "Search Entire Library (⌘K)"}
            </button>
          )}
        </div>

        {/* Canonical Jump Links */}
        <div className="mt-12 pt-8 border-t border-[#E5E5E5] text-left">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#555555] mb-4 text-center">
            {isHindi ? "प्रमुख ज्ञान अनुभाग" : "Canonical Knowledge Sections"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUICK_PATHS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group p-3.5 rounded-lg border border-[#E5E5E5] hover:border-[#FFD21F] bg-[#FFFFFF] hover:bg-[#FFFDF0] transition-all flex items-center justify-between"
              >
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#111111] group-hover:text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#555555] mt-0.5">{item.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#888888] group-hover:text-[#111111] group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
