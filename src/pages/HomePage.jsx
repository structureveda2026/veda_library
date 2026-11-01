import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SEO from "../components/common/SEO.jsx";
import HeroSection from "../components/home/HeroSection.jsx";
import TrustStrip from "../components/home/TrustStrip.jsx";
import SacredQuoteSection from "../components/home/SacredQuoteSection.jsx";
import AboutVedaLibrarySection from "../components/home/AboutVedaLibrarySection.jsx";
import ExploreKnowledgeSection from "../components/home/ExploreKnowledgeSection.jsx";
import FeaturedKnowledgeSection from "../components/home/FeaturedKnowledgeSection.jsx";
import FeaturedCollectionsSection from "../components/home/FeaturedCollectionsSection.jsx";
import FourVedasSection from "../components/home/FourVedasSection.jsx";
import GranthaArchiveSection from "../components/home/GranthaArchiveSection.jsx";
import MantraStotraSection from "../components/home/MantraStotraSection.jsx";
import TopicDiscoverySection from "../components/home/TopicDiscoverySection.jsx";
import RecentlyAddedSection from "../components/home/RecentlyAddedSection.jsx";
import KnowledgeConnectionSection from "../components/home/KnowledgeConnectionSection.jsx";
import ResearchSection from "../components/home/ResearchSection.jsx";
import AudiencePathsSection from "../components/home/AudiencePathsSection.jsx";
import PrinciplesSection from "../components/home/PrinciplesSection.jsx";
import RoadmapSection from "../components/home/RoadmapSection.jsx";
import NewsletterSection from "../components/home/NewsletterSection.jsx";
import FinalCtaSection from "../components/home/FinalCtaSection.jsx";

export default function HomePage({ onOpenSearch }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/about") {
      const el = document.getElementById("about");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    }
  }, [location.pathname]);

  const homeSchema = [
    {
      "@type": "WebSite",
      "name": "Veda Library",
      "alternateName": "वेद लाइब्रेरी — वैदिक ज्ञान परंपरा",
      "url": "https://library.vedastructure.com/",
      "description": "वैदिक एवं भारतीय ज्ञान परंपरा का प्रामाणिक डिजिटल संग्रह। चार वेद, उपनिषद्, पुराण, मंत्र एवं स्तोत्र।",
      "inLanguage": ["hi", "en", "sa"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://library.vedastructure.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "name": "Veda Library",
      "url": "https://library.vedastructure.com/",
      "logo": "https://library.vedastructure.com/vite.svg",
      "description": "वैदिक एवं भारतीय ज्ञान परंपरा का प्रामाणिक डिजिटल संग्रह"
    }
  ];

  return (
    <div className="space-y-0">
      <SEO
        title="VEDA LIBRARY — वैदिक एवं भारतीय ज्ञान परंपरा का डिजिटल संग्रह"
        description="ऋग्वेद, यजुर्वेद, सामवेद, अथर्ववेद, उपनिषद, पुराण, दर्शन एवं वैदिक मंत्र-स्तोत्रों का प्रामाणिक, त्रिभाषी डिजिटल संग्रह। अन्वय, भावार्थ और विशुद्ध शोध।"
        canonical="/"
        schema={homeSchema}
        keywords={[
          "Veda Library",
          "वेद",
          "ऋग्वेद",
          "यजुर्वेद",
          "सामवेद",
          "अथर्ववेद",
          "उपनिषद",
          "वैदिक मंत्र",
          "स्तोत्र",
          "भारतीय ज्ञान परंपरा"
        ]}
      />

      {/* 01. HERO SECTION + PROMINENT SEARCH + DUAL CTAs */}
      <HeroSection
        onOpenSearch={onOpenSearch}
        onNavigateKnowledge={(target) => navigate(typeof target === "string" ? target : "/library/veda")}
        onNavigateCollections={() => navigate("/library/collections")}
      />

      {/* 02. TRUST / PURPOSE STRIP — separate section immediately below hero */}
      <TrustStrip />

      {/* 03. DAILY SACRED SUBHASHITA / SHLOKA — Trilingual Wisdom */}
      <SacredQuoteSection />

      {/* 04. ABOUT VEDA LIBRARY — एक स्थान पर भारतीय ज्ञान परंपरा */}
      <AboutVedaLibrarySection
        onNavigateKnowledge={() => navigate("/library/knowledge")}
      />

      {/* 05. EXPLORE BY CATEGORY — 8 primary cards + View All 18 */}
      <ExploreKnowledgeSection
        onSelectCategory={(id) => navigate(`/library/${id}`)}
        onNavigateKnowledge={() => navigate("/library/knowledge")}
      />

      {/* 06. FEATURED KNOWLEDGE — Tabbed: All | Articles | Mantra | Grantha | Topics */}
      <FeaturedKnowledgeSection
        onNavigateKnowledge={() => navigate("/library/knowledge")}
      />

      {/* 06. THE FOUR VEDAS */}
      <FourVedasSection
        onNavigateKnowledge={(vedaId) => navigate(vedaId ? `/library/veda/${vedaId}` : "/library/veda")}
      />

      {/* 07. MANTRA, SUKTA & STOTRA */}
      <MantraStotraSection
        onNavigateKnowledge={() => navigate("/library/mantra-stotra")}
      />

      {/* 08. FEATURED COLLECTIONS — Curated Archives */}
      <FeaturedCollectionsSection
        onNavigateCollections={() => navigate("/library/collections")}
      />

      {/* 09. GRANTHA ARCHIVE */}
      <GranthaArchiveSection
        onNavigateCollections={() => navigate("/library/collections")}
      />

      {/* 10. EXPLORE BY TOPIC */}
      <TopicDiscoverySection
        onNavigateKnowledge={() => navigate("/library/knowledge")}
      />

      {/* 11. RECENTLY ADDED */}
      <RecentlyAddedSection
        onSelectArticle={(id) => {
          if (id === "rudrabhisheka") {
            navigate("/library/puja/shaiva/rudrabhisheka");
          } else if (id === "agnihotra") {
            navigate("/library/yagya-sanskar");
          } else {
            navigate("/library/veda/rigveda/agnisukta");
          }
        }}
      />

      {/* 12. DISCOVER THE CONNECTIONS */}
      <KnowledgeConnectionSection />

      {/* 13. RESEARCH & REFERENCES */}
      <ResearchSection
        onNavigateKnowledge={() => navigate("/library/knowledge")}
      />

      {/* 14. START WHERE YOU ARE — Students / Seekers / Researchers */}
      <AudiencePathsSection
        onNavigateKnowledge={() => navigate("/library/veda")}
      />

      {/* 15. OUR APPROACH / PRINCIPLES */}
      <PrinciplesSection />

      {/* 16. THE LIBRARY IS GROWING — Roadmap */}
      <RoadmapSection />

      {/* 17. NEWSLETTER & KNOWLEDGE UPDATES */}
      <NewsletterSection />

      {/* 18. FINAL CALL TO ACTION */}
      <FinalCtaSection
        onOpenSearch={onOpenSearch}
        onNavigateKnowledge={() => navigate("/library/veda")}
      />
    </div>
  );
}
