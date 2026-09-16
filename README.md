<div align="center">

# 🪔 Ganesh Chaturthi 2026 — Bappa's Garden

### **A cinematic, scroll-driven digital invitation for welcoming Bappa home.**

A handcrafted static microsite that combines the original Ganpati artwork with a living botanical environment, layered depth, organic motion, devotional typography, and a continuous visual journey.

<p>
  <a href="https://chillingbing648-sketch.github.io/Invite/">🌐 Live Invitation</a> ·
  <a href="https://github.com/chillingbing648-sketch/Invite">💻 Source Code</a>
</p>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111111)
![GSAP](https://img.shields.io/badge/GSAP-3.12.5-88CE02?style=for-the-badge&logo=greensock&logoColor=111111)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Hosted-222222?style=for-the-badge&logo=githubpages&logoColor=white)

</div>

---

## 🌿 Bappa's Garden — Current Advancement

The biggest evolution of the project is the move from a collection of animated decorations to a **persistent living garden** that grows around the Ganpati artwork as the user scrolls.

The scene is designed to progress conceptually as:

```text
NOTHING
  ↓
STEMS
  ↓
LEAVES
  ↓
BUDS
  ↓
FLOWERS
  ↓
MID-GROUND VEGETATION
  ↓
FOREGROUND DEPTH
  ↓
FULL FESTIVE GARDEN
```

The environment is not reset between sections. Earlier growth remains part of the scene, creating a sense of visual memory and continuous world-building.

### What has advanced

- 🌱 **Biological growth sequencing** — botanical elements are driven by growth progress rather than simple section fade-ins.
- 🌺 **SVG flower construction** — flowers are assembled from stems, leaves, buds, layered petals and cores so bloom can happen progressively.
- 🌀 **Four-tier transform architecture** — placement, wind, biological growth and bloom are separated to avoid animation systems fighting over the same transform.
- 🌳 **Far / Mid / Near depth layers** — vegetation is staged around the central artwork to create spatial hierarchy and parallax.
- 🌬️ **Organic motion** — wind is applied through dedicated wrappers so leaves and flowers can continue subtle movement after they have grown.
- 🪷 **Artwork-aware composition** — the original `ganpati_hero.png` remains the visual source of truth and the garden is arranged around its existing composition.
- ✨ **Continuous atmosphere** — glow, god rays, lantern light, dusk treatment and ambient particles support the garden instead of appearing as disconnected effects.
- 🎞️ **Cinematic scroll progression** — scene movement uses GSAP + ScrollTrigger rather than independent page-section animations.

---

## ✨ Experience

The invitation currently combines:

- 🪔 **Ceremonial curtain opening** with click, tap, keyboard and scroll entry support.
- 🛕 **Original Ganpati artwork** kept as the central visual anchor.
- 🌿 **Procedural botanical garden** with far, mid and near layers.
- 🌸 **Progressive flower and plant growth** with staged bloom timing.
- 🌬️ **Layer-specific wind motion** for a more natural, less synchronized feel.
- ✨ **Divine atmosphere** built from halo glow, lantern flicker, god rays, dusk and particles.
- 📜 **Scroll storytelling** across celebration, invitation, event details, location, prasad and closing blessing scenes.
- 🕉️ **Marathi / Devanagari typography** paired with cinematic English typography.
- 📱 **Responsive composition** for desktop, tablet and mobile layouts.
- ♿ **Reduced-motion and focus-state support** for accessibility and comfort.

---

## 🎬 Visual Direction

```text
CURTAIN
   ↓
BAPPA + FIRST SPARKS OF LIFE
   ↓
BOTANICAL GROWTH
   ↓
PARALLAX + DEPTH
   ↓
FLOWERS + FOLIAGE
   ↓
FESTIVE ATMOSPHERE
   ↓
INVITATION
   ↓
FINAL BLESSING
```

The intended feeling is **growth, depth and devotion** — not a collection of separate web sections.

The palette remains rooted in:

`Ivory` · `Cream` · `Maroon` · `Crimson` · `Gold` · `Lotus Pink` · `Sage` · `Marigold`

---

## 🧠 Architecture

The project remains intentionally **zero-build and static**. There is no backend, database, authentication service or package manager required for the invitation itself.

```text
Browser
   │
   ▼
index.html
   │
   ├── Design tokens + typography
   ├── Persistent atmosphere
   ├── Ganpati artwork anchor
   ├── Garden far / mid / near layers
   ├── Scrollable invitation scenes
   └── Runtime animation + interaction
          │
          ▼
   GSAP + ScrollTrigger
          │
          ▼
   Continuous scene progression
          │
          ▼
      GitHub Pages
```

### Garden motion model

```text
Plant parent
   │
   ├── Position / depth
   │
   └── Wind wrapper
          │
          └── Growth / bloom internals
```

The separation is important because multiple animation systems should never compete for ownership of the same transform.

---

## 🌺 Botanical Growth System

The current garden engine creates plant specifications with explicit growth windows and depth placement.

```text
Far layer
  Trees · Buds · Bushes

Mid layer
  Pads · Stems · Lotus blooms · Buds

Near layer
  Larger pads · Foreground lotus blooms
```

Each plant is given a growth interval, position and height, allowing the complete garden to be choreographed as one continuous progression.

A typical bloom sequence is designed as:

```text
Grounding
  → stem draws
  → leaves unfold
  → bud forms
  → flower head rises
  → outer petals open
  → inner petals + core appear
  → gentle wind
```

This is intended to make the garden **feel grown**, not merely revealed.

---

## 🎨 Original Artwork Principle

The repository-local `ganpati_hero.png` is the primary artwork asset.

The visual system is built around the artwork rather than replacing it with generated imagery:

```text
Original Ganpati artwork
          │
          ├── Aura / halo atmosphere
          ├── Garden framing
          ├── Parallax depth
          ├── Ambient particles
          └── Final blessing treatment
```

The garden therefore acts as an environmental extension of the artwork instead of becoming a separate visual subject.

---

## 🧭 Scene Structure

The current invitation is organised as a continuous sequence:

| Scene | Purpose |
|---|---|
| Curtain | Ceremonial opening and entry |
| Hero | Bappa introduction and visual anchor |
| Celebration | Devotion, joy and togetherness |
| Invitation | Main family invitation card |
| Details | Celebration date, sthapana, aarti and visarjan |
| Location | Guest arrival information and directions |
| Modak | Festive prasad moment |
| Final | Closing blessing and return to the central artwork |

---

## ⚙️ Technology Stack

| Technology | Role |
|---|---|
| **HTML5** | Semantic structure and invitation content |
| **CSS3** | Visual system, layout, atmospheric effects and responsive styling |
| **JavaScript (ES2022+)** | Garden engine, scene orchestration and interaction |
| **GSAP 3.12.5** | Timeline and motion control |
| **ScrollTrigger** | Scroll-linked scene progress |
| **Canvas 2D** | Lightweight ambient particles |
| **Google Fonts** | Devanagari + English typography |
| **GitHub Pages** | Static hosting |
| **GitHub Actions** | Deployment workflow |

---

## 📁 Repository Structure

```text
Invite/
│
├── index.html              # Production invitation
├── ganpati_hero.png        # Original Ganpati artwork
├── index - Copy.html       # Legacy reference copy
├── README.md               # Project documentation
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Pages deployment
```

The single-file architecture is deliberate: this is a self-contained invitation microsite with a small asset surface and no server-side application layer.

---

## 📱 Responsive + Accessibility Principles

The experience is designed around composition rather than fixed desktop coordinates.

```text
Desktop → full depth + cinematic staging
Tablet  → reduced density + preserved hierarchy
Mobile  → touch-safe spacing + composition-first scaling
```

Accessibility/performance principles include:

- Visible `:focus-visible` states.
- Decorative layers use `pointer-events: none` when interaction is unnecessary.
- Motion-heavy layers use transforms where practical.
- Particle counts are reduced on smaller screens.
- `prefers-reduced-motion` disables non-essential motion and ambient effects.

---

## 🚀 Deployment

Production target:

**https://chillingbing648-sketch.github.io/Invite/**

```text
main
  ↓
GitHub Actions
  ↓
GitHub Pages
  ↓
Live invitation
```

The project requires no application server.

---

## 🗺️ Roadmap

### Completed / In Progress

- [x] Cinematic curtain opening
- [x] Original Ganpati artwork integration
- [x] Persistent garden architecture
- [x] Far / Mid / Near parallax depth
- [x] Biological plant growth timings
- [x] SVG-based flower bloom construction
- [x] Layer-specific organic wind motion
- [x] Continuous atmosphere and lighting
- [x] Scroll-driven invitation journey
- [x] Responsive layout foundations
- [x] Reduced-motion support

### Next Enhancements

- [ ] Finalise the **Nothing → Everything** growth choreography across the complete scroll length
- [ ] Further tune flower emergence so foreground blooms arrive later and feel earned
- [ ] Refine the final merge between mature garden and Ganpati artwork
- [ ] Add **Add to Calendar** utility
- [ ] Add **Share Invite** utility
- [ ] Audit every transition on mobile devices
- [ ] Add a measurable performance / Lighthouse budget
- [ ] Consider modular CSS/JS extraction only when the scene complexity justifies it

---

## 🤝 Development Principles

When evolving the experience:

1. Keep the original Ganpati artwork as the source of truth.
2. Build the world around the artwork instead of covering it with effects.
3. Prefer growth, movement and depth over generic fade-ins.
4. Give each animated layer one clear transform owner.
5. Keep the center visually calm and let stronger garden elements frame the composition.
6. Preserve readability and touch safety on mobile.
7. Avoid unnecessary dependencies and heavy runtime systems.

---

## 🪔 The Idea

> **An invitation that grows into the celebration as you move through it.**

<div align="center">

### गणपती बाप्पा मोरया 🙏

**Built with devotion, motion & a little bit of code.**

</div>
