/**
 * Application Core Configuration & Shared Utilities
 * Architecture: main -> core/config -> components -> animation systems
 */

export const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
export const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const CFG = {
  maxParticles: isMobile ? 18 : 42,
  parallaxFar:  60,
  parallaxMid:  35,
  parallaxNear: 15,
};

export const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
export const lerp  = (a, b, t) => a + (b - a) * t;
export const rand  = (lo, hi) => Math.random() * (hi - lo) + lo;
export const pick  = arr => arr[Math.floor(Math.random() * arr.length)];

export const EVENT_CONFIG = {
  title: 'Ganesh Chaturthi 2026 — Dubey Family',
  description: 'Join the Dubey Family in welcoming Lord Ganesha this Ganesh Chaturthi for Bappa\'s Sthapana, Aarti, and Prasad.\nMorning Muhurat: 10:30 AM\nEvening Aarti: 7:00 PM daily.',
  location: 'Surya Shopping Sector, Mira Road East, Mumbai',
  startISO: '20260914T050000Z',
  endISO:   '20260914T143000Z',
  mapsUrl:  'https://maps.google.com/?q=Surya+Shopping+Sector,+Mira+Road+East,+Mumbai',
};
