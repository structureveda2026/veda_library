import React from "react";

/**
 * Custom Sacred Line-Art Icons matching the client reference mockup exactly:
 * ChatGPT Image Sep 18, 2026 at 09_37_23 PM.png
 */

// 1. Veda: Sacred open manuscript / palm-leaf grantha
export function VedaIcon({ className = "w-7 h-7 text-[#D9A441]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="8" y1="6" x2="16" y2="6" strokeWidth="1.5" />
      <line x1="8" y1="10" x2="16" y2="10" strokeWidth="1.5" />
      <line x1="8" y1="14" x2="13" y2="14" strokeWidth="1.5" />
    </svg>
  );
}

// 2. Vedanga: Sacred sprouting kalasha / auspicious branch
export function VedangaIcon({ className = "w-7 h-7 text-emerald-700" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22v-9" />
      <path d="M12 13c-3-2.5-7-1.5-8-5 3.5 0 6.5 2 8 5z" />
      <path d="M12 10c2.5-2.5 6.5-2 8-5-3 0-6 2-8 5z" />
      <path d="M12 6C10.5 4 11 2 12 2c1 0 1.5 2 0 4z" />
      <circle cx="12" cy="17" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// 3. Upanishad: Sacred Temple Shikhara / Vimana Sanctum
export function UpanishadIcon({ className = "w-7 h-7 text-cyan-700" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2l-6 7h12l-6-7z" />
      <path d="M7 9v11h10V9" />
      <path d="M10 20v-5a2 2 0 0 1 4 0v5" />
      <line x1="12" y1="2" x2="12" y2="0.5" strokeWidth="2" />
      <line x1="4" y1="20" x2="20" y2="20" strokeWidth="2" />
    </svg>
  );
}

// 4. Darshana: Sacred Interlocking Yantra / Mandala
export function DarshanaIcon({ className = "w-7 h-7 text-indigo-700" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// 5. Dharma: Meditating Yogi / Sacred Dhvaja
export function DharmaIcon({ className = "w-7 h-7 text-[#D9A441]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="6" r="3" />
      <path d="M6 20c0-3.5 2.5-6 6-6s6 2.5 6 6" />
      <path d="M9 14l-3 4h12l-3-4" />
      <line x1="12" y1="14" x2="12" y2="18" />
    </svg>
  );
}

// 6. Samskara: Purna Kumbha Kalasha with Mango Leaves & Coconut
export function SamskaraIcon({ className = "w-7 h-7 text-teal-700" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 12c-2 2-2 6 0 8h8c2-2 2-6 0-8H8z" />
      <ellipse cx="12" cy="12" rx="4" ry="1.5" />
      <path d="M12 4c-2 2-2 4-2 6h4c0-2 0-4-2-6z" fill="currentColor" opacity="0.15" />
      <path d="M12 4c-2 2-2 4-2 6h4c0-2 0-4-2-6z" />
      <path d="M8 8c-2 1-3 3-3 4h3" />
      <path d="M16 8c2 1 3 3 3 4h-3" />
    </svg>
  );
}

// 7. Puja: Lit Sacred Diya / Oil Lamp
export function PujaIcon({ className = "w-7 h-7 text-rose-700" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 14c0 4 3.5 7 8 7s8-3 8-7H4z" />
      <path d="M12 3c-1.5 2.5-2.5 4.5-2.5 6a2.5 2.5 0 0 0 5 0c0-1.5-1-3.5-2.5-6z" fill="currentColor" opacity="0.2" />
      <path d="M12 3c-1.5 2.5-2.5 4.5-2.5 6a2.5 2.5 0 0 0 5 0c0-1.5-1-3.5-2.5-6z" />
      <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2" />
    </svg>
  );
}

// 8. Yagya: Sacred Havan Kund & Fire Altar
export function YagyaIcon({ className = "w-7 h-7 text-[#D9A441]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="4 14 6 21 18 21 20 14 4 14" />
      <line x1="2" y1="14" x2="22" y2="14" strokeWidth="2" />
      <path d="M12 3c-2 3-3 5-3 7 0 2 1.5 3 3 3s3-1 3-3c0-2-1-4-3-7z" fill="currentColor" opacity="0.2" />
      <path d="M12 3c-2 3-3 5-3 7 0 2 1.5 3 3 3s3-1 3-3c0-2-1-4-3-7z" />
    </svg>
  );
}

// 9. Mantra: Japa Mala / Sacred Rosary Beads
export function MantraIcon({ className = "w-7 h-7 text-purple-700" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="11" r="7" strokeDasharray="3 3" />
      <circle cx="12" cy="11" r="7" />
      <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 19.5v3.5" strokeWidth="2" />
      <path d="M10 23h4" strokeWidth="1.5" />
    </svg>
  );
}

// 10. Jyotisha: 12-Ray Surya / Astrological Chakra
export function JyotishaIcon({ className = "w-7 h-7 text-[#D9A441]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.15" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3" />
      <path d="M12 19v3" />
      <path d="M2 12h3" />
      <path d="M19 12h3" />
      <path d="M4.93 4.93l2.12 2.12" />
      <path d="M16.95 16.95l2.12 2.12" />
      <path d="M4.93 19.07l2.12-2.12" />
      <path d="M16.95 7.05l2.12-2.12" />
    </svg>
  );
}

// 11. Devata: Divine Kiritam / Deity Crown & Mandir Sanctum
export function DevataIcon({ className = "w-7 h-7 text-emerald-800" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 17l2-10 6 5 6-5 2 10H4z" />
      <circle cx="12" cy="6" r="1.5" fill="currentColor" />
      <circle cx="6" cy="7" r="1" fill="currentColor" />
      <circle cx="18" cy="7" r="1" fill="currentColor" />
      <line x1="3" y1="19" x2="21" y2="19" strokeWidth="2" />
    </svg>
  );
}

// 12. Traditional Knowledge: Mortar & Pestle / Ayurveda Herb Bowl
export function TraditionalIcon({ className = "w-7 h-7 text-blue-700" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 12c0 4.5 3.5 8 8 8s8-3.5 8-8H4z" />
      <line x1="16" y1="4" x2="9" y2="15" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 4l3-1" strokeWidth="2" />
      <line x1="2" y1="12" x2="22" y2="12" strokeWidth="1.5" />
    </svg>
  );
}

// 13. Purana & Itihasa: Sacred Scroll / Golden Epic
export function PuranaIcon({ className = "w-7 h-7 text-indigo-700" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
      <path d="M12 11h4" />
      <path d="M12 15h4" />
      <path d="M8 11h.01" />
      <path d="M8 15h.01" />
      <circle cx="12" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

// 14. Stotra: Sacred Lotus Blossom
export function StotraIcon({ className = "w-7 h-7 text-rose-700" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3c-2 3-5 7-5 11a5 5 0 0 0 10 0c0-4-3-8-5-11z" />
      <path d="M7 14c-3-2-4-5-4-8 3 1 6 3 7 6" />
      <path d="M17 14c3-2 4-5 4-8-3 1-6 3-7 6" />
      <line x1="4" y1="21" x2="20" y2="21" strokeWidth="2" />
    </svg>
  );
}

// 15. Vastu: Architectural Vastu Purusha Mandala Grid
export function VastuIcon({ className = "w-7 h-7 text-[#D9A441]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

// 16. Sanskrit: Sacred Devanagari Akshara Stylus
export function SanskritIcon({ className = "w-7 h-7 text-[#D9A441]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 6h16" strokeWidth="2" />
      <path d="M12 6v14" strokeWidth="2" />
      <path d="M12 12c-3 0-5-2-5-4" />
      <path d="M12 12c3 0 5 2 5 4s-2 4-5 4" />
    </svg>
  );
}

// 17. Grantha Archive: Palm Leaf Tied Bundle
export function GranthaIcon({ className = "w-7 h-7 text-yellow-800" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="6" width="18" height="5" rx="1" />
      <rect x="3" y="13" width="18" height="5" rx="1" />
      <line x1="8" y1="4" x2="8" y2="20" strokeWidth="2" />
      <line x1="16" y1="4" x2="16" y2="20" strokeWidth="2" />
    </svg>
  );
}

// 18. Research: Scholarly Magnifier over Sacred Shastra
export function ResearchIcon({ className = "w-7 h-7 text-indigo-800" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2.5" />
      <line x1="8" y1="11" x2="14" y2="11" strokeWidth="1.5" />
      <line x1="11" y1="8" x2="11" y2="14" strokeWidth="1.5" />
    </svg>
  );
}

// Map key to SVG component
export const SACRED_ICON_MAP = {
  veda: VedaIcon,
  vedanga: VedangaIcon,
  upanishad: UpanishadIcon,
  darshana: DarshanaIcon,
  dharma: DharmaIcon,
  samskara: SamskaraIcon,
  puja: PujaIcon,
  yagya: YagyaIcon,
  mantra: MantraIcon,
  jyotisha: JyotishaIcon,
  devata: DevataIcon,
  "traditional-knowledge": TraditionalIcon,
  purana: PuranaIcon,
  "purana-itihasa": PuranaIcon,
  stotra: StotraIcon,
  vastu: VastuIcon,
  ayurveda: TraditionalIcon,
  sanskrit: SanskritIcon,
  grantha: GranthaIcon,
  research: ResearchIcon
};
