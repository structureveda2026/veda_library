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
    <section id="newsletter" className="py-14 bg-[#fffdf8] border-t border-amber-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200">
          {isHindi ? "ज्ञान सूचना" : "KNOWLEDGE UPDATES"}
        </span>
        <h2 className={`font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2 ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi ? "Veda Library से जुड़े रहें" : "Stay Connected with Veda Library"}
        </h2>
        <p className={`text-sm text-stone-600 mt-2 max-w-lg mx-auto ${isHindi ? "font-devanagari" : ""}`}>
          {isHindi
            ? "नए प्रकाशित ग्रंथ, वैदिक सूक्त, शोध संदर्भ एवं पाण्डुलिपि विवरणी की नियमित सूचना प्राप्त करें।"
            : "Receive regular updates on newly published scriptures, Vedic hymns, scholarly references, and manuscripts."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <Mail className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isHindi ? "आपका ईमेल पता" : "Your Email Address"}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-stone-300 focus:border-amber-500 focus:outline-none text-sm text-stone-800 shadow-2xs font-medium"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex-shrink-0"
          >
            {isHindi ? "सदस्यता लें" : "Subscribe"}
          </button>
        </form>

        {subscribed && (
          <p className="mt-3 text-xs font-semibold text-emerald-700 flex items-center justify-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            {isHindi
              ? "धन्यवाद! आप Veda Library ज्ञान सूचना सूची से जुड़ गए हैं।"
              : "Thank you! You are now subscribed to Veda Library knowledge updates."}
          </p>
        )}
      </div>
    </section>
  );
}
