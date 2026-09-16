/**
 * Grounded Botanical Sanctuary System
 * Lotus, Pads, Palm Growth & Blooming Sequence
 */

import { generateDiyaSVG } from './diya.js';

import { clamp, rand } from '../core/config.js';

  export const Garden = {
    elements: [],

    init() {
      this.populate('garden-far',  this.farSpecs());
      this.populate('garden-mid',  this.midSpecs());
      this.populate('garden-near', this.nearSpecs());
    },

    populate(layerId, specs) {
      const layer = document.getElementById(layerId);
      if (!layer) return;

      specs.forEach(spec => {
        const item = this.createPlantElement(spec);
        layer.appendChild(item.dom);
        this.elements.push(item);
      });
    },

    farSpecs() {
      // 2 elegant distant tropical palms framing the extreme screen edges
      return [
        { type: 'palm', side: 'left',  pos: '-1%', h: 320, growStart: 0.00, growEnd: 0.18 },
        { type: 'palm', side: 'right', pos: '-1%', h: 325, growStart: 0.01, growEnd: 0.19 },
      ];
    },

    midSpecs() {
      // Grounded sanctum elements: 1 lotus pad, 1 blooming lotus, and 1 grounded brass diya per flank
      return [
        // Left Flank
        { type: 'pad',   side: 'left', pos: '0%',  h: 125, growStart: 0.02, growEnd: 0.18 },
        { type: 'lotus', side: 'left', pos: '5%',  h: 240, growStart: 0.04, growEnd: 0.24 },
        { type: 'diya',  side: 'left', pos: '13%', h: 90,  growStart: 0.08, growEnd: 0.25 },

        // Right Flank
        { type: 'pad',   side: 'right', pos: '0%',  h: 130, growStart: 0.02, growEnd: 0.18 },
        { type: 'lotus', side: 'right', pos: '5%',  h: 245, growStart: 0.05, growEnd: 0.25 },
        { type: 'diya',  side: 'right', pos: '13%', h: 90,  growStart: 0.09, growEnd: 0.26 },
      ];
    },

    nearSpecs() {
      // Foreground corner framing lily pads
      return [
        { type: 'pad', side: 'left',  pos: '-3%', h: 160, growStart: 0.06, growEnd: 0.22, blur: 1.5 },
        { type: 'pad', side: 'right', pos: '-3%', h: 165, growStart: 0.07, growEnd: 0.23, blur: 1.5 },
      ];
    },

    createPlantElement(spec) {
      const dom = document.createElement('div');
      dom.className = `g-plant g-${spec.type}`;

      if (spec.side === 'left') {
        dom.style.left = spec.pos;
      } else {
        dom.style.right = spec.pos;
      }

      const w = spec.type === 'pad'   ? spec.h * 1.55 :
                spec.type === 'lotus' ? spec.h * 1.25 :
                spec.type === 'palm'  ? spec.h * 0.95 :
                spec.type === 'diya'  ? 110 : 70;

      dom.style.width  = w + 'px';
      dom.style.height = spec.h + 'px';
      if (spec.blur) dom.style.filter = `blur(${spec.blur}px)`;

      const windWrap = document.createElement('div');
      const windClass = spec.type === 'pad'  ? 'wind-sway-pad' :
                        spec.type === 'diya' ? '' :
                        (spec.side === 'left' ? 'wind-sway-1' : 'wind-sway-2');
      windWrap.className = `g-wind-wrap ${windClass}`;
      windWrap.style.animationDelay = rand(-3, 0) + 's';

      const uid = 'bio_' + Math.floor(Math.random() * 1000000);
      windWrap.innerHTML = this.buildSvg(spec, w, spec.h, uid);
      dom.appendChild(windWrap);

      // Pre-cache DOM element references and geometry once to eliminate all querySelector / getTotalLength overhead during scroll!
      const stem = dom.querySelector('.g-stem');
      let stemLen = 0;
      if (stem) {
        try { stemLen = stem.getTotalLength(); } catch(e) { stemLen = spec.h * 0.7; }
        stem.style.strokeDasharray = stemLen;
        stem.style.strokeDashoffset = stemLen;
      }

      return {
        dom: dom,
        spec: spec,
        w: w,
        h: spec.h,
        uid: uid,
        growStart: spec.growStart,
        growEnd:   spec.growEnd,
        lastEased: -1,
        refs: {
          stem: stem,
          stemLen: stemLen,
          leaves: Array.from(dom.querySelectorAll('.g-leaf')),
          lifter: dom.querySelector('.g-lifter'),
          outerTier: dom.querySelector('.g-bloom-outer'),
          midTier:   dom.querySelector('.g-bloom-mid'),
          innerTier: dom.querySelector('.g-bloom-inner'),
          core:      dom.querySelector('.g-bloom-core'),
          budShield: dom.querySelector('.g-bud-shield'),
          padShape:  dom.querySelector('.g-pad-shape'),
          canopy:    dom.querySelector('.g-canopy'),
          diyaBase:  dom.querySelector('.g-diya-base'),
          flameGrp:  dom.querySelector('.g-diya-flame-group'),
          ambientGlow: dom.querySelector('.diya-ambient-glow'),
        }
      };
    },

    buildSvg(spec, w, h, uid) {
      const cx = w / 2;

      switch (spec.type) {
        case 'lotus': {
          const stemEndY = h * 0.40;
          const curveX = cx + (spec.side === 'left' ? 14 : -14);

          return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="overflow:visible;" shape-rendering="geometricPrecision">
            <defs>
              <linearGradient id="${uid}_stem" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stop-color="#142612"/>
                <stop offset="60%" stop-color="#284422"/>
                <stop offset="100%" stop-color="#4F7543"/>
              </linearGradient>
              <radialGradient id="${uid}_pOuter" cx="50%" cy="85%" r="75%">
                <stop offset="0%" stop-color="#FFF5F7"/>
                <stop offset="45%" stop-color="#E89BB0"/>
                <stop offset="85%" stop-color="#B24664"/>
                <stop offset="100%" stop-color="#84243C"/>
              </radialGradient>
              <radialGradient id="${uid}_pMid" cx="50%" cy="80%" r="70%">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="50%" stop-color="#FCE1E8"/>
                <stop offset="85%" stop-color="#E89BB0"/>
                <stop offset="100%" stop-color="#A1304C"/>
              </radialGradient>
              <radialGradient id="${uid}_core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FFF3C4"/>
                <stop offset="60%" stop-color="#F2DA9B"/>
                <stop offset="90%" stop-color="#C9963B"/>
                <stop offset="100%" stop-color="#8E6018"/>
              </radialGradient>
            </defs>

            <!-- Stem Path -->
            <path class="g-stem" d="M${cx},${h} Q${curveX},${h*0.72} ${cx},${stemEndY}"
                  fill="none" stroke="url(#${uid}_stem)" stroke-width="4.5" stroke-linecap="round"/>

            <!-- Stem Leaflets -->
            <g class="g-leaf g-leaf-1" style="transform-origin: ${cx-3}px ${h*0.72}px;">
              <path d="M${cx-2},${h*0.72} C${cx-24},${h*0.68} ${cx-36},${h*0.58} ${cx-40},${h*0.52} C${cx-32},${h*0.58} ${cx-18},${h*0.66} ${cx-2},${h*0.72} Z"
                    fill="#284422" stroke="rgba(243,220,158,0.4)" stroke-width="0.8"/>
            </g>
            <g class="g-leaf g-leaf-2" style="transform-origin: ${cx+3}px ${h*0.58}px;">
              <path d="M${cx+2},${h*0.58} C${cx+26},${h*0.54} ${cx+38},${h*0.44} ${cx+42},${h*0.38} C${cx+34},${h*0.44} ${cx+18},${h*0.52} ${cx+2},${h*0.58} Z"
                    fill="#33542B" stroke="rgba(243,220,158,0.4)" stroke-width="0.8"/>
            </g>

            <!-- Flower Lifter -->
            <g class="g-lifter" style="transform: translateY(0px);">
              <g class="g-head-nod">
                <!-- Calyx -->
                <g class="g-calyx" style="transform-origin: ${cx}px ${stemEndY}px;">
                  <path d="M${cx},${stemEndY} C${cx-16},${stemEndY+2} ${cx-24},${stemEndY-8} ${cx-20},${stemEndY-16} C${cx-12},${stemEndY-8} ${cx-4},${stemEndY-2} ${cx},${stemEndY} Z" fill="#284422"/>
                  <path d="M${cx},${stemEndY} C${cx+16},${stemEndY+2} ${cx+24},${stemEndY-8} ${cx+20},${stemEndY-16} C${cx+12},${stemEndY-8} ${cx+4},${stemEndY-2} ${cx},${stemEndY} Z" fill="#284422"/>
                </g>

                <!-- Bud Phase Shield -->
                <g class="g-bud-shield" style="transform-origin: ${cx}px ${stemEndY}px;">
                  <path d="M${cx},${stemEndY} C${cx-16},${stemEndY-12} ${cx-12},${stemEndY-45} ${cx},${stemEndY-58} C${cx+12},${stemEndY-45} ${cx+16},${stemEndY-12} ${cx},${stemEndY} Z"
                        fill="url(#${uid}_pOuter)"/>
                </g>

                <!-- Outer Bloom Petals -->
                <g class="g-bloom-outer" style="transform-origin: ${cx}px ${stemEndY}px;">
                  <path d="M${cx},${stemEndY} C${cx-38},${stemEndY-8} ${cx-65},${stemEndY-28} ${cx-70},${stemEndY-48} C${cx-50},${stemEndY-44} ${cx-24},${stemEndY-25} ${cx},${stemEndY} Z" fill="url(#${uid}_pOuter)"/>
                  <path d="M${cx},${stemEndY} C${cx+38},${stemEndY-8} ${cx+65},${stemEndY-28} ${cx+70},${stemEndY-48} C${cx+50},${stemEndY-44} ${cx+24},${stemEndY-25} ${cx},${stemEndY} Z" fill="url(#${uid}_pOuter)"/>
                  <path d="M${cx},${stemEndY} C${cx-48},${stemEndY+6} ${cx-75},${stemEndY-8} ${cx-82},${stemEndY-24} C${cx-58},${stemEndY-16} ${cx-26},${stemEndY-6} ${cx},${stemEndY} Z" fill="url(#${uid}_pOuter)"/>
                  <path d="M${cx},${stemEndY} C${cx+48},${stemEndY+6} ${cx+75},${stemEndY-8} ${cx+82},${stemEndY-24} C${cx+58},${stemEndY-16} ${cx+26},${stemEndY-6} ${cx},${stemEndY} Z" fill="url(#${uid}_pOuter)"/>
                </g>

                <!-- Mid Bloom Petals -->
                <g class="g-bloom-mid" style="transform-origin: ${cx}px ${stemEndY}px;">
                  <path d="M${cx},${stemEndY} C${cx-28},${stemEndY-16} ${cx-46},${stemEndY-48} ${cx-44},${stemEndY-72} C${cx-25},${stemEndY-58} ${cx-12},${stemEndY-30} ${cx},${stemEndY} Z" fill="url(#${uid}_pMid)"/>
                  <path d="M${cx},${stemEndY} C${cx+28},${stemEndY-16} ${cx+46},${stemEndY-48} ${cx+44},${stemEndY-72} C${cx-25},${stemEndY-58} ${cx-12},${stemEndY-30} ${cx},${stemEndY} Z" fill="url(#${uid}_pMid)"/>
                  <path d="M${cx},${stemEndY-10} C${cx-18},${stemEndY-34} ${cx-18},${stemEndY-68} ${cx},${stemEndY-88} C${cx+18},${stemEndY-68} ${cx+18},${stemEndY-34} ${cx},${stemEndY-10} Z" fill="url(#${uid}_pOuter)"/>
                </g>

                <!-- Inner Bloom Petals -->
                <g class="g-bloom-inner" style="transform-origin: ${cx}px ${stemEndY}px;">
                  <path d="M${cx},${stemEndY} C${cx-20},${stemEndY-16} ${cx-24},${stemEndY-46} ${cx-16},${stemEndY-66} C${cx-8},${stemEndY-48} ${cx-4},${stemEndY-26} ${cx},${stemEndY} Z" fill="url(#${uid}_pMid)"/>
                  <path d="M${cx},${stemEndY} C${cx+20},${stemEndY-16} ${cx+24},${stemEndY-46} ${cx+16},${stemEndY-66} C${cx+8},${stemEndY-48} ${cx+4},${stemEndY-26} ${cx},${stemEndY} Z" fill="url(#${uid}_pMid)"/>
                </g>

                <!-- Sacred Core -->
                <g class="g-bloom-core" style="transform-origin: ${cx}px ${stemEndY-18}px;">
                  <ellipse cx="${cx}" cy="${stemEndY-18}" rx="14" ry="9" fill="url(#${uid}_core)"/>
                  <circle cx="${cx-8}" cy="${stemEndY-22}" r="1.8" fill="#FFF8E0"/>
                  <circle cx="${cx}"   cy="${stemEndY-24}" r="2.0" fill="#FFF8E0"/>
                  <circle cx="${cx+8}" cy="${stemEndY-22}" r="1.8" fill="#FFF8E0"/>
                  <circle cx="${cx-5}" cy="${stemEndY-16}" r="1.6" fill="#8E6018"/>
                  <circle cx="${cx+5}" cy="${stemEndY-16}" r="1.6" fill="#8E6018"/>
                </g>
              </g>
            </g>
          </svg>`;
        }

        case 'palm': {
          const curveSide = spec.side === 'left' ? 1 : -1;
          return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="overflow:visible;" shape-rendering="geometricPrecision">
            <defs>
              <linearGradient id="${uid}_palmStem" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stop-color="#142612"/>
                <stop offset="50%" stop-color="#284422"/>
                <stop offset="100%" stop-color="#4F7543"/>
              </linearGradient>
            </defs>
            <g class="g-canopy" style="transform-origin: ${cx}px bottom;">
              <!-- Central Stem Rachis -->
              <path class="g-stem" d="M${cx},${h} Q${cx + curveSide * 45},${h*0.45} ${cx + curveSide * 85},${h*0.08}"
                    fill="none" stroke="url(#${uid}_palmStem)" stroke-width="5" stroke-linecap="round"/>
              <!-- Graceful Leaf Pinnae -->
              <g fill="#243C1E" stroke="rgba(243,220,158,0.2)" stroke-width="0.7">
                <path d="M${cx+curveSide*10},${h*0.75} Q${cx+curveSide*50},${h*0.68} ${cx+curveSide*70},${h*0.72} Q${cx+curveSide*35},${h*0.75} ${cx+curveSide*10},${h*0.75} Z"/>
                <path d="M${cx+curveSide*20},${h*0.62} Q${cx+curveSide*65},${h*0.52} ${cx+curveSide*90},${h*0.56} Q${cx+curveSide*45},${h*0.62} ${cx+curveSide*20},${h*0.62} Z" fill="#2E4D27"/>
                <path d="M${cx+curveSide*32},${h*0.48} Q${cx+curveSide*78},${h*0.38} ${cx+curveSide*105},${h*0.42} Q${cx+curveSide*55},${h*0.48} ${cx+curveSide*32},${h*0.48} Z"/>
                <path d="M${cx+curveSide*46},${h*0.35} Q${cx+curveSide*88},${h*0.25} ${cx+curveSide*110},${h*0.29} Q${cx+curveSide*65},${h*0.35} ${cx+curveSide*46},${h*0.35} Z" fill="#365B2F"/>
                <path d="M${cx+curveSide*62},${h*0.22} Q${cx+curveSide*95},${h*0.14} ${cx+curveSide*108},${h*0.18} Q${cx+curveSide*75},${h*0.23} ${cx+curveSide*62},${h*0.22} Z"/>
              </g>
            </g>
          </svg>`;
        }

        case 'diya': {
          return generateDiyaSVG(uid);
        }

        case 'pad': {
          const cy = h * 0.55;
          return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="overflow:visible;">
            <defs>
              <radialGradient id="${uid}_pad" cx="50%" cy="45%" r="52%">
                <stop offset="0%" stop-color="#446D3A"/>
                <stop offset="68%" stop-color="#213D1C"/>
                <stop offset="95%" stop-color="#122510"/>
                <stop offset="100%" stop-color="#C9963B"/>
              </radialGradient>
            </defs>
            <g class="g-pad-shape" style="transform-origin: ${cx}px ${cy}px;">
              <path d="M${cx},${cy}
                       C${cx*0.3},${cy*0.95} 0,${cy*0.45} ${cx*0.12},${cy*0.15}
                       C${cx*0.28},0 ${cx*0.72},0 ${cx*0.88},${cy*0.15}
                       C${w},${cy*0.45} ${w*0.88},${cy*0.95} ${cx},${cy} Z"
                    fill="url(#${uid}_pad)" stroke="rgba(243,220,158,0.4)" stroke-width="1.2"/>
              <!-- Golden Veining -->
              <g stroke="rgba(243,220,158,0.22)" stroke-width="1.2" fill="none">
                <path d="M${cx},${cy*0.6} Q${cx*0.4},${cy*0.4} ${cx*0.25},${cy*0.25}"/>
                <path d="M${cx},${cy*0.6} Q${cx*0.6},${cy*0.25} ${cx*0.5},${cy*0.08}"/>
                <path d="M${cx},${cy*0.6} Q${cx*1.4},${cy*0.25} ${cx*1.5},${cy*0.08}"/>
                <path d="M${cx},${cy*0.6} Q${cx*1.6},${cy*0.4} ${w*0.85},${cy*0.25}"/>
              </g>
              <!-- Pearl dew droplet -->
              <circle cx="${cx+4}" cy="${cy*0.6-2}" r="3.2" fill="rgba(255,255,255,0.55)" stroke="rgba(255,255,255,0.8)" stroke-width="0.8"/>
            </g>
          </svg>`;
        }

        default:
          return '';
      }
    },

    update(progress) {
      // Reset finalization flags when scroll direction changes
      // This ensures Garden re-renders when scrolling backward after reaching full bloom
      if (this._finalizedMax && progress < 0.30) {
        this._finalizedMax = false;
      }
      if (this._finalizedMin && progress > 0.005) {
        this._finalizedMin = false;
      }

      // Early-exit only if truly finalized AND no direction reversal
      if (progress > 0.32 && this._finalizedMax) return;
      if (progress <= 0 && this._finalizedMin) return;

      let allMax = true;
      let allMin = true;

      this.elements.forEach(item => {
        const p = clamp((progress - item.growStart) / (item.growEnd - item.growStart), 0, 1);
        const eased = p < 1 ? 1 - Math.pow(1 - p, 3) : 1;

        if (eased < 1) allMax = false;
        if (eased > 0) allMin = false;

        // Skip DOM writes if progress delta is negligible
        if (Math.abs(eased - item.lastEased) < 0.002) return;
        item.lastEased = eased;

        const dom = item.dom;
        const r = item.refs;

        if (eased <= 0.005) {
          if (dom.style.opacity !== '0') dom.style.opacity = '0';
          return;
        }
        if (dom.style.opacity !== '1') dom.style.opacity = '1';

        // Phase 1: Stem Growth (0% → 60% of eased)
        if (r.stem) {
          const stemProgress = clamp(eased / 0.6, 0, 1);
          r.stem.style.strokeDashoffset = (1 - stemProgress) * r.stemLen;
        }

        // Phase 2: Leaflets unfolding (25% → 75% of eased)
        if (r.leaves.length > 0) {
          const leafP = clamp((eased - 0.25) / 0.5, 0, 1);
          r.leaves.forEach((lf, idx) => {
            const delayP = clamp(leafP - idx * 0.15, 0, 1);
            const lfScale = 1 - Math.pow(1 - delayP, 2.5);
            lf.style.transform = `scale(${lfScale})`;
            lf.style.opacity = delayP > 0.04 ? '1' : '0';
          });
        }

        // Phase 3: Lifter translation (using GPU translate3d)
        if (r.lifter) {
          const liftP = clamp(eased / 0.6, 0, 1);
          const startOffset = item.h * 0.55;
          const currentY = (1 - liftP) * startOffset;
          r.lifter.style.transform = `translate3d(0, ${currentY}px, 0)`;
          r.lifter.style.opacity = liftP > 0.1 ? '1' : '0';
        }

        // Phase 4: Petals — staggered bloom: bud → outer → mid → inner → core
        if (r.outerTier) {
          const bloomP = clamp((eased - 0.45) / 0.55, 0, 1);

          if (r.budShield) {
            r.budShield.style.opacity = String(1 - bloomP * 0.95);
            r.budShield.style.transform = `scale(${1 - bloomP * 0.25})`;
          }

          const outP = clamp(bloomP / 0.75, 0, 1);
          r.outerTier.style.transform = `scale(${0.25 + outP * 0.75})`;
          r.outerTier.style.opacity = outP > 0.08 ? '1' : '0';

          if (r.midTier) {
            const midP = clamp((bloomP - 0.15) / 0.75, 0, 1);
            r.midTier.style.transform = `scale(${0.2 + midP * 0.8})`;
            r.midTier.style.opacity = midP > 0.08 ? '1' : '0';
          }

          if (r.innerTier) {
            const inP = clamp((bloomP - 0.3) / 0.7, 0, 1);
            r.innerTier.style.transform = `scale(${0.15 + inP * 0.85})`;
            r.innerTier.style.opacity = inP > 0.08 ? '1' : '0';
          }

          if (r.core) {
            const coreP = clamp((bloomP - 0.35) / 0.65, 0, 1);
            r.core.style.transform = `scale(${coreP})`;
            r.core.style.opacity = coreP > 0.1 ? '1' : '0';
          }
        }

        // Pad Shape
        if (r.padShape) {
          r.padShape.style.transform = `scale(${eased})`;
        }

        // Canopy
        if (r.canopy) {
          r.canopy.style.transform = `scale(${eased})`;
        }

        // Diya
        if (item.spec.type === 'diya') {
          if (r.diyaBase) {
            r.diyaBase.style.transform = `scale(${clamp(eased / 0.6, 0, 1)})`;
          }
          if (r.flameGrp) {
            const flameP = clamp((eased - 0.45) / 0.55, 0, 1);
            r.flameGrp.style.transform = `scale(${flameP})`;
            r.flameGrp.style.opacity = flameP > 0.05 ? '1' : '0';
          }
          if (r.ambientGlow) {
            const glowP = clamp((eased - 0.5) / 0.5, 0, 1);
            r.ambientGlow.style.opacity = String(glowP * 0.9);
          }
        }
      });

      this._finalizedMax = allMax;
      this._finalizedMin = allMin;
    }
  };

