/**
 * Ambient Particle System (Lotus Petals, Marigold & Golden Pollen)
 * Canvas 2D with Offscreen Sprite Pre-rendering & GSAP Ticker Synchronization
 */

import { CFG, clamp, rand, pick } from '../core/config.js';

export const Particles = {
  canvas: null,
  ctx: null,
  particles: [],
  worldProgress: 0,
  rafId: null,
  _tick: null,
  w: 0,
  h: 0,
  running: false,
  pollenCanvas: null,
  lastTime: 0,

  init() {
    this.canvas = document.getElementById('ambient-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.resize();

    // Pre-render pollen offscreen sprite once to eliminate runtime createRadialGradient calls
    this.pollenCanvas = document.createElement('canvas');
    this.pollenCanvas.width = 32;
    this.pollenCanvas.height = 32;
    const pCtx = this.pollenCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pGrad.addColorStop(0, 'rgba(255, 238, 150, 1)');
    pGrad.addColorStop(0.45, 'rgba(242, 185, 80, 0.75)');
    pGrad.addColorStop(1, 'rgba(242, 185, 80, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.beginPath();
    pCtx.arc(16, 16, 16, 0, Math.PI * 2);
    pCtx.fill();

    let resizeDebounce = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(() => this.resize(), 150);
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else if (this.running) {
        this.start();
      }
    });
  },

  resize() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width  = Math.floor(this.w * dpr);
    this.canvas.height = Math.floor(this.h * dpr);
    this.canvas.style.width  = this.w + 'px';
    this.canvas.style.height = this.h + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  },

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();

    this._tick = () => {
      if (!this.running) return;
      const now = performance.now();
      const dt = clamp((now - this.lastTime) / 1000, 0.008, 0.033);
      this.lastTime = now;
      this.update(dt);
      this.render();
    };

    // Use GSAP ticker as single animation authority with fallback
    if (window.gsap && gsap.ticker) {
      gsap.ticker.add(this._tick);
    } else {
      const fallbackLoop = () => {
        if (!this.running) return;
        this._tick();
        this.rafId = requestAnimationFrame(fallbackLoop);
      };
      this.rafId = requestAnimationFrame(fallbackLoop);
    }
  },

  stop() {
    this.running = false;
    if (this._tick && window.gsap && gsap.ticker) {
      gsap.ticker.remove(this._tick);
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  },

  spawn(type) {
    const p = {
      x: rand(0, this.w),
      y: (type === 'petal' || type === 'marigold') ? rand(-40, -10) : rand(0, this.h),
      vx: 0, vy: 0,
      life: 0, maxLife: 1,
      type: type,
      size: 1, opacity: 0,
      rotation: rand(0, 360),
      rotSpeed: rand(-0.6, 0.6),
    };

    switch (type) {
      case 'dust':
        p.size = rand(1.2, 2.2);
        p.maxLife = rand(7, 13);
        p.vx = rand(-0.12, 0.12);
        p.vy = rand(-0.28, -0.06);
        p.color = pick(['rgba(255,235,175,', 'rgba(243,220,158,', 'rgba(255,225,140,']);
        break;
      case 'pollen':
        p.size = rand(2.2, 3.8);
        p.maxLife = rand(8, 15);
        p.vx = rand(-0.2, 0.2);
        p.vy = rand(0.12, 0.35);
        p.color = 'rgba(242,185,80,';
        break;
      case 'petal':
        p.size = rand(9, 15);
        p.maxLife = rand(12, 22);
        p.vx = rand(-0.4, 0.4);
        p.vy = rand(0.35, 0.65);
        p.color = pick([
          'rgba(232,155,176,', 'rgba(255,243,246,', 'rgba(178,70,100,', 'rgba(230,124,34,'
        ]);
        p.swayAmp = rand(1.2, 2.0);
        p.swayFreq = rand(0.35, 0.7);
        break;
      case 'marigold':
        p.size = rand(6, 10);
        p.maxLife = rand(10, 18);
        p.vx = rand(-0.3, 0.3);
        p.vy = rand(0.38, 0.7);
        p.color = pick(['rgba(230,124,34,', 'rgba(245,182,60,', 'rgba(217,110,20,']);
        p.swayAmp = rand(1.0, 1.6);
        p.swayFreq = rand(0.4, 0.75);
        break;
    }
    return p;
  },

  update(dt = 0.016) {
    const p = this.worldProgress;
    const dustRate     = 0.05;
    const pollenRate   = 0.02 + p * 0.03;
    const petalRate    = 0.02 + p * 0.04;
    const marigoldRate = p > 0.4 ? 0.02 + p * 0.025 : 0;

    if (this.particles.length < CFG.maxParticles) {
      if (Math.random() < dustRate)     this.particles.push(this.spawn('dust'));
      if (Math.random() < pollenRate)   this.particles.push(this.spawn('pollen'));
      if (Math.random() < petalRate)    this.particles.push(this.spawn('petal'));
      if (Math.random() < marigoldRate) this.particles.push(this.spawn('marigold'));
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const pt = this.particles[i];
      pt.life += dt;
      const ratio = pt.life / pt.maxLife;

      if (ratio >= 1) {
        this.particles.splice(i, 1);
        continue;
      }

      if (ratio < 0.15) {
        pt.opacity = (ratio / 0.15) * 0.8;
      } else if (ratio > 0.82) {
        pt.opacity = ((1 - ratio) / 0.18) * 0.8;
      } else {
        pt.opacity = 0.8;
      }

      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.rotation += pt.rotSpeed;

      if (pt.type === 'petal' || pt.type === 'marigold') {
        pt.x += Math.sin(pt.life * pt.swayFreq) * pt.swayAmp * 0.4;
      }
      pt.x += Math.sin(pt.life * 0.2 + pt.y * 0.004) * 0.12;

      if (pt.x < -30) pt.x = this.w + 30;
      if (pt.x > this.w + 30) pt.x = -30;
      if (pt.y > this.h + 50 || pt.y < -60) {
        this.particles.splice(i, 1);
      }
    }
  },

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      if (p.type === 'dust') {
        ctx.fillStyle = p.color + (p.opacity * 0.85) + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'pollen') {
        ctx.globalAlpha = p.opacity;
        const s = p.size * 2;
        ctx.drawImage(this.pollenCanvas, p.x - p.size, p.y - p.size, s, s);
      } else {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.beginPath();
        if (p.type === 'petal') {
          ctx.ellipse(0, 0, p.size * 0.42, p.size, 0, 0, Math.PI * 2);
        } else {
          ctx.ellipse(0, 0, p.size * 0.55, p.size * 0.85, 0, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
      }
    }
    ctx.globalAlpha = 1;
  }
};
