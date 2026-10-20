import React from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="space-y-0">
      {/* 01. HERO SECTION + PROMINENT SEARCH + DUAL CTAs */}
      <HeroSection
        onOpenSearch={onOpenSearch}
        onNavigateKnowledge={() => navigate("/library/veda")}
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
