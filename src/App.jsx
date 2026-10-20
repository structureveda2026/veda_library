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
import MantraStotraHubPage from "./pages/MantraStotraHubPage.jsx";
import MantraStotraDetailPage from "./pages/MantraStotraDetailPage.jsx";

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
    <div className="min-h-screen flex flex-col bg-[#fffaf0] text-[#171717] font-sans antialiased selection:bg-amber-200 selection:text-amber-950">
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
          {/* Page 1: Home Landing Page */}
          <Route
            path="/"
            element={<HomePage onOpenSearch={handleOpenSearch} />}
          />
          <Route
            path="/library"
            element={<HomePage onOpenSearch={handleOpenSearch} />}
          />

          {/* Blogs & Articles Hub */}
          <Route path="/library/articles" element={<VedaArticlesPage />} />
          <Route path="/library/blogs" element={<VedaArticlesPage />} />
          <Route path="/library/articles/:slug" element={<BlogDetailPage />} />
          <Route path="/library/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="/articles" element={<VedaArticlesPage />} />
          <Route path="/blogs" element={<VedaArticlesPage />} />
          <Route path="/articles/:slug" element={<BlogDetailPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />

          {/* Dedicated Mantra Archive & Detail Experience */}
          <Route path="/library/mantra-stotra/all" element={<MantraStotraHubPage />} />
          <Route path="/library/mantra-stotra/item/:slug" element={<MantraStotraDetailPage />} />
          <Route path="/mantra-stotra/all" element={<MantraStotraHubPage />} />
          <Route path="/mantra-stotra/:slug" element={<MantraStotraDetailPage />} />

          {/* Knowledge & Collections Hubs */}
          <Route path="/library/knowledge" element={<KnowledgePage />} />
          <Route path="/library/collections" element={<CollectionsPage />} />
          <Route
            path="/library/collections/:collectionId"
            element={<CollectionsPage />}
          />

          {/* Dedicated Purana & Itihasa Experience */}
          <Route
            path="/library/purana-itihasa"
            element={<PuranaItihasaPage onOpenSearch={handleOpenSearch} />}
          />
          <Route
            path="/library/purana"
            element={<PuranaItihasaPage onOpenSearch={handleOpenSearch} />}
          />
          <Route
            path="/library/itihasa"
            element={<PuranaItihasaPage onOpenSearch={handleOpenSearch} />}
          />
          <Route
            path="/purana-itihasa"
            element={<PuranaItihasaPage onOpenSearch={handleOpenSearch} />}
          />
          <Route
            path="/purana"
            element={<PuranaItihasaPage onOpenSearch={handleOpenSearch} />}
          />
          <Route
            path="/itihasa"
            element={<PuranaItihasaPage onOpenSearch={handleOpenSearch} />}
          />

          {/* Dedicated Upanishad & Darshana Experience */}
          <Route
            path="/library/upanishad-darshana"
            element={<UpanishadDarshanaPage onOpenSearch={handleOpenSearch} />}
          />
          <Route
            path="/library/upanishad"
            element={<UpanishadDarshanaPage onOpenSearch={handleOpenSearch} />}
          />
          <Route
            path="/library/darshana"
            element={<UpanishadDarshanaPage onOpenSearch={handleOpenSearch} />}
          />
          <Route
            path="/upanishad-darshana"
            element={<UpanishadDarshanaPage onOpenSearch={handleOpenSearch} />}
          />
          <Route
            path="/upanishad"
            element={<UpanishadDarshanaPage onOpenSearch={handleOpenSearch} />}
          />
          <Route
            path="/darshana"
            element={<UpanishadDarshanaPage onOpenSearch={handleOpenSearch} />}
          />

          {/* Page 2: Category Landing Page (e.g. /library/veda, /library/mantra-stotra, /library/puja) */}
          <Route
            path="/library/:category"
            element={
              <CategoryLandingPage onOpenSearch={() => setIsSearchOpen(true)} />
            }
          />

          {/* Page 3: Subject Detail Page (e.g. /library/veda/rigveda, /library/puja/shaiva) */}
          <Route
            path="/library/:category/:subject"
            element={
              <SubjectDetailPage onOpenSearch={() => setIsSearchOpen(true)} />
            }
          />

          {/* Page 4: Standard Mantra Reader Experience */}
          <Route
            path="/library/mantra/:mantraId"
            element={
              <MantraReaderPage onOpenSearch={() => setIsSearchOpen(true)} />
            }
          />
          <Route
            path="/mantra/:mantraId"
            element={
              <MantraReaderPage onOpenSearch={() => setIsSearchOpen(true)} />
            }
          />
          <Route
            path="/library/:category/:subject/mantra/:mantraId"
            element={
              <MantraReaderPage onOpenSearch={() => setIsSearchOpen(true)} />
            }
          />

          <Route
            path="/library/purana/shrimad-bhagavata/skandha-11/:chapter"
            element={<BhagavataChapterDetailPage />}
          />
          <Route
            path="/library/purana/shrimad-bhagavata/skandha-11"
            element={<ScriptureChapterIndexPage />}
          />

          {/* Page 5: Universal Detail Reader Page (e.g. /library/puja/shaiva/rudrabhisheka, /library/veda/rigveda/agnisukta) */}
          <Route
            path="/library/:category/:subject/:article"
            element={<ArticleDetailPage />}
          />

          {/* Fallback to Home */}
          <Route
            path="*"
            element={<HomePage onOpenSearch={() => setIsSearchOpen(true)} />}
          />
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
