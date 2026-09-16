/**
 * Main Application Orchestrator
 * Architecture: main -> core/config -> components -> animation systems -> UI interactions
 * Ganesh Chaturthi Invitation - 14th September 2026
 */

import { isMobile, reducedMotion, CFG } from './core/config.js';
import { Atmosphere } from './animations/atmosphere.js';
import { Particles } from './animations/particles.js';
import { Garden } from './animations/flowers.js';
import { Curtain, Sound } from './animations/hero.js';
import { ScrollEngine } from './animations/scroll.js';
import { initNavigation } from './components/navigation.js';
import { initTimeline } from './components/timeline.js';
import { Actions, initInvitationActions } from './components/invitation.js';

// -------------------------------------------------------------
// REDUCED MOTION FALLBACK
// -------------------------------------------------------------
export function initReducedMotion() {
  document.body.classList.add('unlocked');
  const curtain = document.getElementById('curtain-scene');
  if (curtain) curtain.style.display = 'none';

  if (window.gsap) {
    gsap.set(['#hero-kicker', '#hero-title', '#hero-devanagari', '#hero-scroll-prompt'], {
      opacity: 1, scale: 1, y: 0
    });
    gsap.set(['.content-glass', '#invitation-card', '.detail-row', '.scene-transition-bridge', '.modak-wrap', '.modak-line', '#scene-final .final-art-badge', '#scene-final .final-main', '#scene-final .final-sub'], {
      opacity: 1, scale: 1, x: 0, y: 0
    });
    gsap.set('#timeline-spine-fill', { scaleY: 1 });
  }

  Garden.init();
  Garden.update(0.85);
  Atmosphere.init();
  Atmosphere.update(0.5);
  Actions.init();
}

// -------------------------------------------------------------
// BOOTSTRAP INITIALIZATION
// -------------------------------------------------------------
async function bootstrap() {
  if (reducedMotion) {
    initReducedMotion();
    return;
  }

  // 1. Initialize Curtain immediately so CTA, seal, and backdrop taps respond with zero delay
  Curtain.init({
    onUnlocked: () => {
      ScrollEngine.init();
      Particles.start();
    }
  });

  // 2. Safe font loading race (1200ms timeout)
  if (document.fonts && document.fonts.ready) {
    try {
      await Promise.race([
        document.fonts.ready,
        new Promise(resolve => setTimeout(resolve, 1200))
      ]);
    } catch (e) {}
  }

  // 3. Initialize background visual layers and interactive components
  try {
    Atmosphere.init();
    Garden.init();
    Particles.init();
    initInvitationActions();
    initNavigation();
    initTimeline();
  } catch (err) {
    console.warn('Module initialization warning:', err);
  }

  if (window.gsap) {
    gsap.set(['#hero-kicker', '#hero-title', '#hero-devanagari', '#hero-scroll-prompt'], { y: 24 });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
