# Veda Library — Digital Vedic Knowledge & Sacred Scripture Platform

An open, authoritative digital sanctuary and interactive research portal dedicated to the preservation, exploration, and modern contextual study of Vedic literature, sacred mantras, philosophical granthas, and Indian cultural heritage.

---

## Table of Contents
- [Key Features](#key-features)
- [Vedic Domain Architecture](#vedic-domain-architecture)
- [Tech Stack & Libraries](#tech-stack--libraries)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Application Routes](#application-routes)
- [Design System & Accessibility](#design-system--accessibility)

---

## Key Features

- **Four Vedas Deep Dive**: Comprehensive exploration of Rigveda, Samaveda, Yajurveda, and Atharvaveda, detailing historical contexts, shakas, rishis, and primary themes.
- **Grantha & Scripture Archive**: Structured hierarchy covering Shruti (Vedas, Brahmanas, Aranyakas, Upanishads) and Smriti (Vedangas, Upavedas, Darshanas, Puranas, Itihasas).
- **Mantra & Stotra Reader**: Interactive reader with Devanagari script, poetic meters (Chhandas), English commentaries, and deity associations.
- **Interactive Multi-Modal Search**: Instant overlay modal enabling keyword discovery across collections, deities, hymns, and authors with fuzzy matching.
- **Audience Learning Pathways**: Tailored learning journeys for Spiritual Seekers, Academic Scholars, Daily Practitioners, and Independent Researchers.
- **Sacred Deities & Iconography**: Rich visual and contextual index of Vedic and Puranic deities (Trimurti, Dashavatara, Navagraha, Panchayatana, and Vedic Devas).
- **Interactive Knowledge Connection Graph**: Visualized conceptual links between Vedic aphorisms, metaphysical concepts (Dharma, Karma, Moksha), and scientific connections.
- **Curated Articles & Editorial Blog**: Rigorous, referenced scholarship bridging ancient Vedic wisdom with modern cognitive sciences, ecology, and philosophy.

---

## Vedic Domain Architecture

```
                       ┌────────────────────────┐
                       │      VEDA LIBRARY      │
                       └───────────┬────────────┘
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         ▼                                                   ▼
┌─────────────────┐                                 ┌─────────────────┐
│     SHRUTI      │                                 │     SMRITI      │
│ (That which is  │                                 │ (That which is  │
│     Heard)      │                                 │   Remembered)   │
└────────┬────────┘                                 └────────┬────────┘
         │                                                   │
  ├── 1. Samhitas (Rig, Sama, Yajur, Atharva)         ├── 1. Vedangas (Shiksha, Kalpa, etc.)
  ├── 2. Brahmanas (Rituals & Explanations)           ├── 2. Upavedas (Ayurveda, Dhanurveda)
  ├── 3. Aranyakas (Forest Treatises)                 ├── 3. Darshanas (6 Classical Systems)
  └── 4. Upanishads (Vedanta Philosophical Kernels)   └── 4. Itihasas & Puranas
```

---

## Tech Stack & Libraries

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component-driven declarative UI layer with optimal concurrent rendering |
| **Vite 8** | Next-generation instant development server and production bundler |
| **Tailwind CSS v4** | Ultra-modern utility-first styling with `@theme` token customization |
| **React Router v7** | Client-side dynamic routing, nested routes, and scroll restoration |
| **Lucide React** | Clean, accessible vector icons for modern web interfaces |
| **Class Variance Authority (CVA)** | Type-safe composable UI component variants |
| **Clsx & Tailwind Merge** | Dynamic, collision-free className resolution |

---

## Project Structure

```
veda-library/
├── public/                     # Static assets, manifests & favicon
├── src/
│   ├── assets/                 # Sacred imagery, deity cards, temple icons
│   │   └── images/library/
│   │       ├── cards/          # Thematic Vedic card graphics
│   │       └── deities/        # Classical deity representations
│   ├── components/             # Modular, decoupled UI components
│   │   ├── article/            # ArticleDetailPage reader
│   │   ├── blog/               # BlogCard & FeaturedBlogCard
│   │   ├── collections/        # CollectionsPage display components
│   │   ├── common/             # SacredIcons, SearchModal, IconHelper
│   │   ├── footer/             # VedaFooter sitemap & copyright
│   │   ├── home/               # 15+ curated landing page sections
│   │   │   ├── HeroSection.jsx
│   │   │   ├── FourVedasSection.jsx
│   │   │   ├── GranthaArchiveSection.jsx
│   │   │   ├── MantraStotraSection.jsx
│   │   │   ├── AudiencePathsSection.jsx
│   │   │   └── ...
│   │   ├── knowledge/          # Knowledge connection tree & explorer
│   │   ├── navbar/             # VedaNavbar & multi-tier MegaMenu
│   │   └── ui/                 # Reusable atomic UI (badge, button, card, tabs)
│   ├── data/                   # Authoritative Vedic structured datasets
│   │   ├── vedaHierarchyTree.js
│   │   ├── vedicMantrasData.js
│   │   ├── vedicArticlesData.js
│   │   ├── collectionsData.js
│   │   └── megaMenuData.js
│   ├── lib/                    # Utility helpers (utils.js)
│   ├── pages/                  # Top-level view routes
│   │   ├── HomePage.jsx
│   │   ├── MantraReaderPage.jsx
│   │   ├── CategoryLandingPage.jsx
│   │   ├── SubjectDetailPage.jsx
│   │   ├── BlogListPage.jsx
│   │   └── BlogDetailPage.jsx
│   ├── services/               # API & data access services
│   ├── App.jsx                 # Route composition & root layout
│   ├── main.jsx                # React root mount point
│   └── index.css               # Base styles & typography rules
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher (Node.js 20+ recommended)
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/structureveda2026/veda_library.git
   cd veda_library
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The application will be live at `http://localhost:5173/`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Generates optimized assets ready for deployment in the `dist/` directory.

---

## Application Routes

| Path | View | Description |
| :--- | :--- | :--- |
| `/` | **Home Portal** | Complete gateway with Four Vedas overview, interactive search, and scripture archives |
| `/knowledge` | **Knowledge Explorer** | Structural breakdown of ancient Indian texts and philosophical streams |
| `/mantras` | **Mantra Reader** | Sacred hymns with Devanagari script, translation, and audio meter metadata |
| `/collections` | **Grantha Collections** | Curated collections categorized by philosophical tradition |
| `/category/:id` | **Category Showcase** | Dedicated landing page for specific Vedic branches |
| `/subject/:id` | **Subject Deep Dive** | In-depth academic commentary on individual subjects |
| `/blog` | **Veda Blog & Insights** | Research articles, translations, and contemporary essays |
| `/blog/:id` | **Article Detail** | Full-length reader layout with table of contents and references |

---

## Design System & Accessibility

- **Sacred Aesthetics**: Warm ochre, temple gold, sandalwood accents, and deep parchment tones evoke traditional reverence.
- **Dual Script Legibility**: Optimized rendering for both Sanskrit Devanagari glyphs and Latin alphabets.
- **Responsive Layout**: Fluid breakpoints catering seamlessly from smartphones to ultra-wide displays.
- **Accessible Contrasts**: WCAG AA conformant text contrasts ensuring high readability across all reading modes.
