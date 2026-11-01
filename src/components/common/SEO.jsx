import React, { useEffect } from "react";

const CANONICAL_BASE = "https://library.vedastructure.com";

/**
 * Helper to update or create a <meta> element in document.head
 */
function updateMetaTag(key, value, attr = "name") {
  if (!value && value !== "") return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

/**
 * Helper to update or create a <link> element in document.head
 */
function updateLinkTag(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Helper to inject or update JSON-LD structured data script
 */
function updateJsonLd(schema) {
  const SCRIPT_ID = "veda-structured-data";
  let script = document.getElementById(SCRIPT_ID);

  if (!schema) {
    if (script) script.remove();
    return;
  }

  if (!script) {
    script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  let formatted = schema;
  if (Array.isArray(schema)) {
    formatted = {
      "@context": "https://schema.org",
      "@graph": schema.map((s) => {
        const copy = { ...s };
        delete copy["@context"];
        return copy;
      }),
    };
  } else if (schema && !schema["@context"]) {
    formatted = {
      "@context": "https://schema.org",
      ...schema,
    };
  }

  script.textContent = JSON.stringify(formatted, null, 2);
}

/**
 * useSEO Hook — Comprehensive, Zero-Dependency, React 19 Compatible SEO Manager
 */
export function useSEO({
  title,
  description,
  canonical,
  schema,
  type = "website",
  image,
  keywords,
  robots = "index, follow, max-image-preview:large",
}) {
  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title;
      updateMetaTag("og:title", title, "property");
      updateMetaTag("twitter:title", title);
    }

    // 2. Meta Description
    if (description) {
      updateMetaTag("description", description);
      updateMetaTag("og:description", description, "property");
      updateMetaTag("twitter:description", description);
    }

    // 3. Robots
    if (robots) {
      updateMetaTag("robots", robots);
    }

    // 4. Canonical URL & OG:URL
    const fullCanonical = canonical
      ? canonical.startsWith("http")
        ? canonical
        : `${CANONICAL_BASE}${canonical.startsWith("/") ? "" : "/"}${canonical}`
      : `${CANONICAL_BASE}${window.location.pathname}`;

    updateLinkTag("canonical", fullCanonical);
    updateMetaTag("og:url", fullCanonical, "property");

    // 5. OpenGraph & Twitter Basics
    updateMetaTag("og:type", type, "property");
    updateMetaTag("og:site_name", "Veda Library — वैदिक ज्ञान परंपरा", "property");
    updateMetaTag("og:locale", "hi_IN", "property");
    updateMetaTag("twitter:card", "summary_large_image");

    // 6. Keywords
    if (keywords) {
      const kw = Array.isArray(keywords) ? keywords.join(", ") : keywords;
      updateMetaTag("keywords", kw);
    }

    // 7. Image
    if (image) {
      const fullImage = image.startsWith("http")
        ? image
        : `${CANONICAL_BASE}${image.startsWith("/") ? "" : "/"}${image}`;
      updateMetaTag("og:image", fullImage, "property");
      updateMetaTag("twitter:image", fullImage);
    }

    // 8. Structured Data (JSON-LD)
    updateJsonLd(schema);

    // Cleanup: Remove structured data on unmount if appropriate
    return () => {
      // Keep head clean if component unmounts
    };
  }, [
    title,
    description,
    canonical,
    type,
    image,
    keywords,
    robots,
    JSON.stringify(schema),
  ]);
}

/**
 * SEO Component Wrapper
 */
export default function SEO(props) {
  useSEO(props);
  return null;
}
