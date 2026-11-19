import React, { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { isHindi } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <section id="newsletter" className="py-6 sm:py-8 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#111111] bg-[#FFD21F] px-2.5 py-0.5 rounded-full border border-[#FFD21F]">
          {isHindi ? "ज्ञान सूचना" : "KNOWLEDGE UPDATES"}
        </span>
        <h2 className={`font-serif text-2xl sm:text-3xl font-bold text-[#111111] mt-2 ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi ? "Veda Library से जुड़े रहें" : "Stay Connected with Veda Library"}
        </h2>
        <p className={`text-xs sm:text-sm text-[#555555] mt-1.5 max-w-lg mx-auto ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi
            ? "नए प्रकाशित ग्रंथ, वैदिक सूक्त, शोध संदर्भ एवं पाण्डुलिपि विवरणी की नियमित सूचना प्राप्त करें।"
            : "Receive regular updates on newly published scriptures, Vedic hymns, scholarly references, and manuscripts."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-5 max-w-md mx-auto flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <Mail className="w-4 h-4 text-[#555555] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isHindi ? "आपका ईमेल पता" : "Your Email Address"}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E5E5E5] focus:border-[#D9A441] focus:outline-none text-xs sm:text-sm text-[#111111] shadow-2xs font-medium"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#FFD21F] hover:bg-[#D9A441] text-[#111111] font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer flex-shrink-0"
          >
            {isHindi ? "सदस्यता लें" : "Subscribe"}
          </button>
        </form>

        {subscribed && (
          <p className="mt-3 text-xs font-semibold text-[#111111] flex items-center justify-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-[#D9A441]" />
            {isHindi
              ? "धन्यवाद! आप Veda Library ज्ञान सूचना सूची से जुड़ गए हैं।"
              : "Thank you! You are now subscribed to Veda Library knowledge updates."}
          </p>
        )}
      </div>
    </section>
  );
}
