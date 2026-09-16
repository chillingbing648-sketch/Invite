/**
 * Master Scroll Engine
 * Driven directly by GSAP ScrollTrigger Authority (Zero Decoupling Latency)
 */

import { Garden } from './flowers.js';
import { setupContentReveals } from './transitions.js';
import { Atmosphere } from './atmosphere.js';
import { Particles } from './particles.js';
import { CFG, isMobile, clamp, lerp } from '../core/config.js';

export const ScrollEngine = {
  lastAppliedProgress: -1,
  triggers: [],
  heroArtImg: null,
  heroAura: null,
  heroBackdrop: null,
  gardenFar: null,
  gardenMid: null,
  gardenNear: null,

  init() {
    const world = document.getElementById('world');
    if (!world) return;

    this.heroArtImg   = document.getElementById('hero-art-img');
    this.heroAura     = document.getElementById('hero-divine-aura');
    this.heroBackdrop = document.getElementById('hero-world-backdrop');
    this.gardenFar    = document.getElementById('garden-far');
    this.gardenMid    = document.getElementById('garden-mid');
    this.gardenNear   = document.getElementById('garden-near');

    // Fallback if GSAP or ScrollTrigger failed to load
    if (!window.gsap || !window.ScrollTrigger) {
      document.querySelectorAll('.content-glass, #invitation-card, .detail-row, .scene-transition-bridge, .modak-wrap, .modak-line, #scene-final .final-art-badge, #scene-final .final-main, #scene-final .final-sub').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      const spineFill = document.getElementById('timeline-spine-fill');
      if (spineFill) spineFill.style.transform = 'scaleY(1)';
      Garden.update(0.85);
      Atmosphere.update(0.5);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Promote to hardware composited layers
    [this.heroArtImg, this.heroAura, this.heroBackdrop, this.gardenFar, this.gardenMid, this.gardenNear].forEach(el => {
      if (el) {
        el.style.willChange = 'transform, opacity';
      }
    });

    // Master Continuous Scrub Tween (0.75s damping) perfectly synchronized with content reveals
    const progressProxy = { val: 0 };
    const masterTween = gsap.to(progressProxy, {
      val: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: world,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.75,
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        this.renderFrame(progressProxy.val);
      }
    });
    if (masterTween.scrollTrigger) {
      this.triggers.push(masterTween.scrollTrigger);
    }

    const revealTriggers = setupContentReveals();
    this.triggers.push(...revealTriggers);
    ScrollTrigger.refresh();

    // Render initial frame to ensure pristine resting state
    this.renderFrame(0);
  },

  renderFrame(p) {
    if (p < 0 || Math.abs(p - this.lastAppliedProgress) < 0.0003) return;
    this.lastAppliedProgress = p;

    // 1. Garden botanical growth sequence
    Garden.update(p);

    // 2. Progressive atmosphere lighting
    Atmosphere.update(p);

    // 3. Ambient particles progression
    Particles.worldProgress = p;

    // 4. Parallax & Camera Zoom
    this.applyTransforms(p);
  },

  applyTransforms(p) {
    // Keep botanical sanctuary in full vibrant bloom through Hero (0 -> 0.15) and Celebration (0.15 -> 0.38)
    // Then gently and cinematically fade into the deeper sacred invitation card (0.38 -> 0.56)
    const gardenOpacity = p < 0.38 ? 1 : clamp(1 - (p - 0.38) / 0.18, 0, 1);
    const isFoliageVisible = gardenOpacity > 0.005;

    const setGardenLayer = (layer, translateY) => {
      if (!layer) return;
      if (!isFoliageVisible) {
        if (layer.style.display !== 'none') {
          layer.style.display = 'none';
        }
      } else {
        if (layer.style.display === 'none') {
          layer.style.display = 'block';
        }
        layer.style.opacity = gardenOpacity;
        layer.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
      }
    };

    setGardenLayer(this.gardenFar,  -p * CFG.parallaxFar);
    setGardenLayer(this.gardenMid,  -p * CFG.parallaxMid);
    setGardenLayer(this.gardenNear, -p * CFG.parallaxNear);

    // Smooth camera zoom into Lord Ganesha (1.0 to 1.12 scale)
    if (this.heroArtImg) {
      const baseScale = isMobile ? 1.18 : 1.0;
      const targetScale = baseScale + p * 0.12;
      const driftY = -p * 45;
      this.heroArtImg.style.transform = `translate3d(0, ${driftY.toFixed(2)}px, 0) scale(${targetScale.toFixed(4)})`;
    }

    if (this.heroAura) {
      const auraScale = 1 + p * 0.22;
      this.heroAura.style.transform = `translate3d(-50%, -50%, 0) scale(${auraScale.toFixed(4)})`;
    }

    if (this.heroBackdrop) {
      const opacity = p > 0.85 ? lerp(1, 0.4, (p - 0.85) / 0.15) : 1;
      this.heroBackdrop.style.opacity = opacity.toFixed(3);
    }
  },

  destroy() {
    this.triggers.forEach(t => t && t.kill && t.kill());
    this.triggers = [];
    this.lastAppliedProgress = -1;
  }
};
