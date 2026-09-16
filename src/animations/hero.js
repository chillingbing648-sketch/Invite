/**
 * Hero Awakening & Ceremonial Curtain Entrance
 * Temple Bell Sound & Velvet Curtain Parting Animation
 */

import { rand } from '../core/config.js';

export const Sound = {
  ctx: null,

  playBell(freq = 528, duration = 3.0) {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;
      const partials = [
        { mult: 1.0,  gain: 0.45, decay: duration },
        { mult: 2.76, gain: 0.30, decay: duration * 0.7 },
        { mult: 5.40, gain: 0.15, decay: duration * 0.45 }
      ];

      partials.forEach(p => {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * p.mult, now);
        g.gain.setValueAtTime(0.001, now);
        g.gain.exponentialRampToValueAtTime(p.gain, now + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);
        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + p.decay);
      });
    } catch (e) {}
  }
};

export const Curtain = {
  opened: false,
  initialized: false,
  onUnlockedCallback: null,

  init(options = {}) {
    if (this.initialized) return;
    this.initialized = true;

    if (options.onUnlocked) {
      this.onUnlockedCallback = options.onUnlocked;
    }

    const scene = document.getElementById('curtain-scene');
    if (!scene) return;

    const dustContainer = document.getElementById('curtain-dust');
    if (dustContainer) {
      for (let i = 0; i < 22; i++) {
        const d = document.createElement('div');
        d.className = 'dust-particle';
        d.style.cssText = `
          left: ${rand(10, 90)}%;
          bottom: ${rand(5, 40)}%;
          width: ${rand(3, 7)}px;
          height: ${rand(3, 7)}px;
          --drift: ${rand(-20, 20)}px;
          animation: dust-rise ${rand(4, 8)}s ease-out ${rand(0, 3)}s infinite;
        `;
        dustContainer.appendChild(d);
      }
    }

    const triggerOpen = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      this.open();
    };

    // Intentional tap targets: CTA button, central ceremonial seal, AND curtain backdrop
    const seal = document.getElementById('ceremonial-seal');
    const enterBtn = document.getElementById('curtain-enter-btn');

    if (enterBtn) enterBtn.addEventListener('click', triggerOpen);
    if (seal) seal.addEventListener('click', triggerOpen);
    if (scene) {
      scene.addEventListener('click', triggerOpen);
      scene.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerOpen(e);
        }
      });
    }
  },

  open() {
    if (this.opened) return;
    this.opened = true;

    const scene     = document.getElementById('curtain-scene');
    const left      = document.getElementById('curtain-left');
    const right     = document.getElementById('curtain-right');
    const intro     = document.getElementById('curtain-intro');
    const seamGlow  = document.getElementById('seam-glow');

    // Immediately disable pointer events to prevent double activation
    if (scene) scene.style.pointerEvents = 'none';

    Sound.playBell(528, 3.2);

    // Graceful fallback if GSAP CDN failed to load
    if (!window.gsap) {
      document.body.classList.add('unlocked');
      if (scene) scene.style.display = 'none';
      const reveals = document.querySelectorAll('#hero-kicker, #hero-title, #hero-devanagari, #hero-scroll-prompt');
      reveals.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      if (typeof this.onUnlockedCallback === 'function') {
        this.onUnlockedCallback();
      }
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.add('unlocked');
        if (scene) scene.style.display = 'none';
        if (typeof this.onUnlockedCallback === 'function') {
          this.onUnlockedCallback();
        }
      }
    });

    // 1. Text & Seal dissolve as seam light swells
    tl.to(intro, { opacity: 0, scale: 0.96, duration: 0.5, ease: 'power2.in' }, 0);
    tl.to(seamGlow, { opacity: 1, scaleX: 2.4, duration: 0.7, ease: 'power2.out' }, 0.2);

    // 2. Curtains part with realistic velvet fabric gather
    tl.to(left,  { xPercent: -100, scaleX: 0.88, duration: 2.0, ease: 'power3.inOut' }, 0.35);
    tl.to(right, { xPercent: 100,  scaleX: 0.88, duration: 2.0, ease: 'power3.inOut' }, 0.35);

    // 3. Scene fade out
    tl.to(scene, { opacity: 0, duration: 0.7, ease: 'power2.out' }, 1.7);

    // 4. Hero content reveals cleanly over living artwork
    tl.to('#hero-kicker',        { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 1.7);
    tl.to('#hero-title',         { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 2.0);
    tl.to('#hero-devanagari',    { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 2.3);
    tl.to('#hero-scroll-prompt', { opacity: 0.9, y: 0, duration: 1.0, ease: 'power2.out' }, 2.6);
  }
};
