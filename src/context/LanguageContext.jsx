import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const TRANSLATIONS = {
  nav: {
    home: { en: "Home", hi: "होम" },
    explore: { en: "Explore", hi: "वेद ज्ञान" },
    grantha: { en: "Grantha", hi: "ग्रंथ संग्रह" },
    mantraStotra: { en: "Mantra & Stotra", hi: "मंत्र एवं स्तोत्र" },
    articles: { en: "Blogs & Articles", hi: "शास्त्रीय आलेख" },
    topics: { en: "Topics", hi: "प्रमुख विषय" },
    research: { en: "Research", hi: "अनुसंधान" },
    searchPrompt: { en: "Search library...", hi: "पुस्तकालय में खोजें..." },
  },
  actions: {
    previous: { en: "Previous", hi: "पिछला" },
    next: { en: "Next", hi: "अगला" },
    page: { en: "Page", hi: "पृष्ठ" },
    of: { en: "/", hi: "/" },
    jumpToVerse: { en: "Jump to verse", hi: "श्लोक या पृष्ठ" },
    go: { en: "Go", hi: "जाएँ" },
    back: { en: "Back", hi: "पीछे जाएं" },
    search: { en: "Search", hi: "खोजें" },
    clearTag: { en: "Clear Tag", hi: "टैग हटाएं" },
    showAll: { en: "Show All", hi: "समस्त देखें" },
    resetFilter: { en: "Reset Filter", hi: "फ़िल्टर रीसेट करें" },
    save: { en: "Bookmark", hi: "सहेजें" },
    saved: { en: "Saved", hi: "सहेजा गया" },
    focusMode: { en: "Focus Mode", hi: "ध्यान मोड" },
    normalMode: { en: "Normal View", hi: "सामान्य दृश्य" },
  },
  footer: {
    exploreHeading: { en: "Explore", hi: "ज्ञान शाखाएँ" },
    quickLinks: { en: "Quick Links", hi: "महत्वपूर्ण कड़ियाँ" },
    categories: { en: "Featured Disciplines", hi: "प्रमुख विषय" },
    rights: { en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।" },
    subtitle: {
      en: "Digital preservation and presentation of Vedic & traditional knowledge.",
      hi: "भारतीय वैदिक एवं शास्त्रीय ज्ञान परंपरा का प्रामाणिक डिजिटल संग्रह।",
    },
    quickSearch: { en: "Quick Search Library", hi: "पुस्तकालय खोजें" },
    verifiedCorpus: { en: "100% Source-Verified Sanskrit Corpus", hi: "१००% प्रामाणिक संस्कृत एवं वैदिक मूल स्रोत" },
    canonicalStructure: { en: "Text-First Canonical Structure & Pada-Patha", hi: "पद-पाठ एवं शास्त्रीय संरचना आधारित" },
    digitalHeritage: { en: "Open Digital Heritage for Practitioners & Scholars", hi: "साधकों व शोधार्थियों हेतु मुक्त डिजिटल धरोहर" },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem("veda_language");
      return saved === "en" ? "en" : "hi";
    } catch {
      return "hi";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("veda_language", language);
    } catch {}
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "hi" ? "en" : "hi"));
  };

  /**
   * Helper translation lookup:
   * t("nav.home") or t("actions.next", "Next")
   */
  const t = (path, fallback = "") => {
    if (!path) return fallback;
    const parts = path.split(".");
    let current = TRANSLATIONS;
    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = current[part];
      } else {
        return fallback || path;
      }
    }
    if (current && typeof current === "object" && language in current) {
      return current[language];
    }
    return fallback || (typeof current === "string" ? current : path);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isHindi: language === "hi",
        isEnglish: language === "en",
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback if used outside Provider
    return {
      language: "hi",
      setLanguage: () => {},
      toggleLanguage: () => {},
      isHindi: true,
      isEnglish: false,
      t: (path, fallback = "") => fallback || path,
    };
  }
  return context;
}

export default LanguageContext;
