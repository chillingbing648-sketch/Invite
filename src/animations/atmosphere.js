/**
 * Atmosphere Module
 * Continuous Lighting Progression (Morning Radiance -> Golden Hour -> Twilight Dusk)
 */

import { lerp } from '../core/config.js';

export const Atmosphere = {
  sky:  null,
  glow: null,
  dusk: null,
  rays: null,
  _lastGlow: -1,
  _lastDusk: -1,
  _lastRays: -1,

  init() {
    this.sky  = document.getElementById('atmo-sky');
    this.glow = document.getElementById('atmo-glow');
    this.dusk = document.getElementById('atmo-dusk');
    this.rays = document.getElementById('god-rays');
  },

  update(progress) {
    const p = progress;

    const glowOpacity = p < 0.2 ? 0.7 :
                        p < 0.7 ? lerp(0.7, 0.95, (p - 0.2) / 0.5) :
                        lerp(0.95, 0.45, (p - 0.7) / 0.3);
    if (Math.abs(glowOpacity - this._lastGlow) > 0.005) {
      if (this.glow) this.glow.style.opacity = glowOpacity;
      this._lastGlow = glowOpacity;
    }

    const duskOpacity = p > 0.72 ? (p - 0.72) / 0.28 : 0;
    if (Math.abs(duskOpacity - this._lastDusk) > 0.005) {
      if (this.dusk) this.dusk.style.opacity = duskOpacity;
      this._lastDusk = duskOpacity;
    }

    if (this.rays) {
      const rayOpacity = p < 0.2 ? 0.35 :
                         p < 0.7 ? 0.60 :
                         lerp(0.60, 0.2, (p - 0.7) / 0.3);
      if (Math.abs(rayOpacity - this._lastRays) > 0.005) {
        this.rays.style.opacity = rayOpacity;
        this._lastRays = rayOpacity;
      }
    }
  }
};
