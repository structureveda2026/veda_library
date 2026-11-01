import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import VedaNavbar from "./components/navbar/VedaNavbar.jsx";
import SearchModal from "./components/common/SearchModal.jsx";
import VedaFooter from "./components/footer/VedaFooter.jsx";

// Pages
import HomePage from "./pages/HomePage.jsx";
import CategoryLandingPage from "./pages/CategoryLandingPage.jsx";
import SubjectDetailPage from "./pages/SubjectDetailPage.jsx";
import KnowledgePage from "./components/knowledge/KnowledgePage.jsx";
import CollectionsPage from "./components/collections/CollectionsPage.jsx";
import ArticleDetailPage from "./components/article/ArticleDetailPage.jsx";
import MantraReaderPage from "./pages/MantraReaderPage.jsx";
import BlogListPage, { VedaArticlesPage } from "./pages/VedaArticlesPage.jsx";
import BlogDetailPage from "./pages/BlogDetailPage.jsx";
import PuranaItihasaPage from "./pages/PuranaItihasaPage.jsx";
import UpanishadDarshanaPage from "./pages/UpanishadDarshanaPage.jsx";
import ScriptureChapterIndexPage from "./pages/ScriptureChapterIndexPage.jsx";
import BhagavataChapterDetailPage from "./pages/BhagavataChapterDetailPage.jsx";
import ScriptureReaderPage from "./pages/ScriptureReaderPage.jsx";
import MantraStotraHubPage from "./pages/MantraStotraHubPage.jsx";
import MantraStotraDetailPage from "./pages/MantraStotraDetailPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import EditorialPolicyPage from "./pages/EditorialPolicyPage.jsx";
import ContributePage from "./pages/ContributePage.jsx";
import ScholarsPage from "./pages/ScholarsPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import TermsOfServicePage from "./pages/TermsOfServicePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import SourceAttributionPage from "./pages/SourceAttributionPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Helper component to ensure smooth scrolling to top on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function MainLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState("");

  const handleOpenSearch = (query = "") => {
    setSearchInitialQuery(typeof query === "string" ? query : "");
    setIsSearchOpen(true);
  };

  // Global Keyboard shortcut: ⌘K or Ctrl+K opens quick search modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        handleOpenSearch("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#111111] font-sans antialiased selection:bg-[#FFD21F]/30 selection:text-[#111111]">
      {/* Scroll restoration */}
      <ScrollToTop />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialQuery={searchInitialQuery}
      />

      {/* Sticky Global Header with Direct Clean Page Navigation */}
      <VedaNavbar onOpenSearch={() => handleOpenSearch("")} />

      {/* Dynamic View Router */}
      <main className="flex-1">
        <Routes>
          {/* ========================================================= */}
          {/* A. CANONICAL ROUTES (Official Veda Structure Specification) */}
          {/* ========================================================= */}

          {/* 1. Library Home: Route: / */}
          <Route path="/" element={<HomePage onOpenSearch={handleOpenSearch} />} />
          <Route path="/library" element={<HomePage onOpenSearch={handleOpenSearch} />} />

          {/* 2. Main Knowledge Category: Route: /category/{category-slug} & Plural Aliases */}
          <Route
            path="/category/:category"
            element={<CategoryLandingPage onOpenSearch={() => setIsSearchOpen(true)} />}
          />
          <Route
            path="/category/:categorySlug"
            element={<CategoryLandingPage onOpenSearch={() => setIsSearchOpen(true)} />}
          />
          <Route
            path="/categories"
            element={<CategoryLandingPage onOpenSearch={() => setIsSearchOpen(true)} />}
          />
          <Route
            path="/categories/:categorySlug"
            element={<CategoryLandingPage onOpenSearch={() => setIsSearchOpen(true)} />}
          />
          <Route
            path="/vedas"
            element={<CategoryLandingPage onOpenSearch={() => setIsSearchOpen(true)} />}
          />
          <Route
            path="/veda"
            element={<CategoryLandingPage onOpenSearch={() => setIsSearchOpen(true)} />}
          />
          <Route
            path="/samhitas"
            element={<CategoryLandingPage onOpenSearch={() => setIsSearchOpen(true)} />}
          />
          <Route
            path="/samhita"
            element={<CategoryLandingPage onOpenSearch={() => setIsSearchOpen(true)} />}
          />
          <Route
            path="/upanishads"
            element={<UpanishadDarshanaPage onOpenSearch={handleOpenSearch} />}
          />
          <Route
            path="/puranas"
            element={<PuranaItihasaPage onOpenSearch={handleOpenSearch} />}
          />
          <Route
            path="/darshanas"
            element={<UpanishadDarshanaPage onOpenSearch={handleOpenSearch} />}
          />

          {/* 3. Subcategory & Scripture Details: Route: /scriptures/:slug, /knowledge/:slug */}
          <Route
            path="/scriptures/:slug"
            element={<SubjectDetailPage onOpenSearch={() => setIsSearchOpen(true)} />}
          />
          <Route
            path="/knowledge/:slug"
            element={<SubjectDetailPage onOpenSearch={() => setIsSearchOpen(true)} />}
          />
          <Route
            path="/category/:category/:subject"
            element={<SubjectDetailPage onOpenSearch={() => setIsSearchOpen(true)} />}
          />
          <Route
            path="/category/:categorySlug/:subcategorySlug"
            element={<SubjectDetailPage onOpenSearch={() => setIsSearchOpen(true)} />}
          />

          {/* 3.5 Dedicated Universal Scripture Reader: Route: /read/:slug & /scriptures/:slug/read */}
          <Route
            path="/read/:slug"
            element={<ScriptureReaderPage onOpenSearch={handleOpenSearch} />}
          />
          <Route
            path="/scriptures/:slug/read"
            element={<ScriptureReaderPage onOpenSearch={handleOpenSearch} />}
          />
          <Route
            path="/library/read/:slug"
            element={<ScriptureReaderPage onOpenSearch={handleOpenSearch} />}
          />

          {/* 4. Text / Grantha Detail: Route: /texts/{text-slug} */}
          <Route path="/texts/:article" element={<ArticleDetailPage />} />
          <Route path="/texts/:subject/:article" element={<ArticleDetailPage />} />
          <Route path="/texts/:category/:subject/:article" element={<ArticleDetailPage />} />

          {/* 5. Knowledge Article Detail: Route: /articles/{article-slug} */}
          <Route path="/articles" element={<VedaArticlesPage />} />
          <Route path="/articles/:slug" element={<BlogDetailPage />} />
          <Route path="/blogs" element={<VedaArticlesPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />

          {/* 6. Mantra & Stotra Hub & Detail: Routes: /mantras, /mantras/:slug, /stotras */}
          <Route path="/mantras" element={<MantraStotraHubPage />} />
          <Route path="/stotras" element={<MantraStotraHubPage />} />
          <Route path="/stotras/:slug" element={<MantraStotraDetailPage />} />
          <Route
            path="/mantras/:mantraId"
            element={<MantraReaderPage onOpenSearch={() => setIsSearchOpen(true)} />}
          />
          <Route
            path="/mantra/:mantraId"
            element={<MantraReaderPage onOpenSearch={() => setIsSearchOpen(true)} />}
          />

          {/* 7. Stotram Detail: Route: /stotram/{stotram-slug} */}
          <Route path="/stotram/:slug" element={<MantraStotraDetailPage />} />
          <Route path="/stotram/all" element={<MantraStotraHubPage />} />
          <Route path="/mantra-stotra/:slug" element={<MantraStotraDetailPage />} />
          <Route path="/mantra-stotra/all" element={<MantraStotraHubPage />} />
          <Route path="/mantra-stotra" element={<MantraStotraHubPage />} />

          {/* 8. Search Results: Route: /search?q={query} */}
          <Route path="/search" element={<KnowledgePage />} />

          {/* 9. Author / Scholar Profile: Route: /scholars/{scholar-slug} */}
          <Route path="/scholars" element={<ScholarsPage />} />
          <Route path="/scholars/:scholarSlug" element={<ScholarsPage />} />
          <Route path="/library/scholars" element={<ScholarsPage />} />
          <Route path="/library/scholars/:scholarSlug" element={<ScholarsPage />} />

          {/* 10. About, Editorial Policy, Sources, Contact, Privacy & Terms */}
          <Route path="/about" element={<AboutPage onOpenSearch={handleOpenSearch} />} />
          <Route path="/editorial-policy" element={<EditorialPolicyPage />} />
          <Route path="/source-attribution" element={<SourceAttributionPage />} />
          <Route path="/source-policy" element={<SourceAttributionPage />} />
          <Route path="/sources" element={<SourceAttributionPage />} />
          <Route path="/contribute" element={<ContributePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />

          {/* Library Subpath Aliases */}
          <Route path="/library/about" element={<AboutPage onOpenSearch={handleOpenSearch} />} />
          <Route path="/library/editorial-policy" element={<EditorialPolicyPage />} />
          <Route path="/library/source-attribution" element={<SourceAttributionPage />} />
          <Route path="/library/source-policy" element={<SourceAttributionPage />} />
          <Route path="/library/sources" element={<SourceAttributionPage />} />
          <Route path="/library/contribute" element={<ContributePage />} />
          <Route path="/library/contact" element={<ContactPage />} />
          <Route path="/library/contact-us" element={<ContactPage />} />
          <Route path="/library/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/library/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/library/terms" element={<TermsOfServicePage />} />
          <Route path="/library/terms-of-service" element={<TermsOfServicePage />} />

          {/* ========================================================= */}
          {/* B. BACKWARD COMPATIBLE & DEDICATED SCRIPTURE ALIASES      */}
          {/* ========================================================= */}
          <Route path="/library/articles" element={<VedaArticlesPage />} />
          <Route path="/library/blogs" element={<VedaArticlesPage />} />
          <Route path="/library/articles/:slug" element={<BlogDetailPage />} />
          <Route path="/library/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="/library/mantra-stotra" element={<MantraStotraHubPage />} />
          <Route path="/library/mantra-stotra/all" element={<MantraStotraHubPage />} />
          <Route path="/library/mantra-stotra/item/:slug" element={<MantraStotraDetailPage />} />
          <Route path="/library/knowledge" element={<KnowledgePage />} />
          <Route path="/library/collections" element={<CollectionsPage />} />
          <Route path="/library/collections/:collectionId" element={<CollectionsPage />} />
          <Route path="/library/purana-itihasa" element={<PuranaItihasaPage onOpenSearch={handleOpenSearch} />} />
          <Route path="/library/purana" element={<PuranaItihasaPage onOpenSearch={handleOpenSearch} />} />
          <Route path="/library/itihasa" element={<PuranaItihasaPage onOpenSearch={handleOpenSearch} />} />
          <Route path="/purana-itihasa" element={<PuranaItihasaPage onOpenSearch={handleOpenSearch} />} />
          <Route path="/purana" element={<PuranaItihasaPage onOpenSearch={handleOpenSearch} />} />
          <Route path="/itihasa" element={<PuranaItihasaPage onOpenSearch={handleOpenSearch} />} />
          <Route path="/library/upanishad-darshana" element={<UpanishadDarshanaPage onOpenSearch={handleOpenSearch} />} />
          <Route path="/library/upanishad" element={<UpanishadDarshanaPage onOpenSearch={handleOpenSearch} />} />
          <Route path="/library/darshana" element={<UpanishadDarshanaPage onOpenSearch={handleOpenSearch} />} />
          <Route path="/upanishad-darshana" element={<UpanishadDarshanaPage onOpenSearch={handleOpenSearch} />} />
          <Route path="/upanishad" element={<UpanishadDarshanaPage onOpenSearch={handleOpenSearch} />} />
          <Route path="/darshana" element={<UpanishadDarshanaPage onOpenSearch={handleOpenSearch} />} />
          <Route path="/library/:category" element={<CategoryLandingPage onOpenSearch={() => setIsSearchOpen(true)} />} />
          <Route path="/library/:category/:subject" element={<SubjectDetailPage onOpenSearch={() => setIsSearchOpen(true)} />} />
          <Route path="/library/mantra/:mantraId" element={<MantraReaderPage onOpenSearch={() => setIsSearchOpen(true)} />} />
          <Route path="/library/:category/:subject/mantra/:mantraId" element={<MantraReaderPage onOpenSearch={() => setIsSearchOpen(true)} />} />
          <Route path="/library/purana/shrimad-bhagavata/skandha-11/:chapter" element={<BhagavataChapterDetailPage />} />
          <Route path="/library/purana/shrimad-bhagavata/skandha-11" element={<ScriptureChapterIndexPage />} />
          <Route path="/library/:category/:subject/:article" element={<ArticleDetailPage />} />

          {/* 404 Not Found Handling */}
          <Route path="/404" element={<NotFoundPage onOpenSearch={handleOpenSearch} />} />
          <Route path="*" element={<NotFoundPage onOpenSearch={handleOpenSearch} />} />
        </Routes>
      </main>

      {/* Global Scholarly Footer */}
      <VedaFooter onOpenSearch={() => setIsSearchOpen(true)} />
    </div>
  );
}

import { LanguageProvider } from "./context/LanguageContext.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <MainLayout />
      </LanguageProvider>
    </BrowserRouter>
  );
}
