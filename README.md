<div align="center">

# 🪔 Ganesh Chaturthi — Divine Sanctuary

### **A cinematic digital invitation for welcoming Bappa home.**

A handcrafted, immersive Ganesh Chaturthi experience built as a lightweight static web application — blending devotional design, botanical motion, cinematic transitions, Marathi typography, and the original Ganpati artwork into one continuous visual journey.

<p>
  <a href="https://chillingbing648-sketch.github.io/Invite/">🌐 Live Invitation</a> ·
  <a href="https://github.com/chillingbing648-sketch/Invite">💻 Source Code</a>
</p>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111111)
![GSAP](https://img.shields.io/badge/GSAP-Animation-88CE02?style=for-the-badge&logo=greensock&logoColor=111111)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Hosted-222222?style=for-the-badge&logo=githubpages&logoColor=white)

</div>

---

## ✨ Experience

This is not a conventional event page. It is designed as a **scroll-driven devotional scene** that gradually reveals the invitation through light, motion, flora, typography, and atmosphere.

The current experience includes:

- 🪔 **Cinematic curtain reveal** — the journey begins behind a ceremonial crimson curtain.
- 🌺 **Botanical world** — layered flowers, leaves, petals and tropical foliage create depth around the central artwork.
- 🌬️ **Organic motion** — multi-frequency wind animation gives the garden a living, non-mechanical feel.
- ✨ **Divine atmosphere** — halo glow, lantern flicker, dusk transitions and soft vignettes support the devotional mood.
- 🛕 **Original Ganpati artwork** — the repository preserves the supplied `ganpati_hero.png` as the central visual.
- 📜 **Scroll storytelling** — sections transition progressively instead of behaving like disconnected website blocks.
- 🕉️ **Indian typography system** — Yatra One and Tiro Devanagari Marathi complement Cormorant Garamond and Jost.
- 📱 **Responsive invitation** — composition adapts for desktop and mobile viewports.
- ♿ **Accessible focus states** — keyboard-visible outlines and semantic interaction hooks are included.

---

## 🎨 Visual Direction

```text
DEVOTION
   ↓
ATMOSPHERE
   ↓
ARTWORK
   ↓
BOTANICAL DEPTH
   ↓
SCROLL STORY
   ↓
INVITATION
```

The visual language is intentionally warm and handcrafted rather than generic:

`Ivory` · `Cream` · `Maroon` · `Crimson` · `Gold` · `Lotus Pink` · `Sage` · `Marigold`

---

## 🧠 Architecture

The project is intentionally **zero-build and static**. There is no application server, framework runtime, database, or package manager required for the invitation itself.

### Runtime architecture

```text
                         Browser
                            │
                            ▼
                     index.html
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
     Design Tokens     Scene Structure    Runtime Logic
          │                 │                 │
          ▼                 ▼                 ▼
        CSS            HTML Sections        JavaScript
          │                 │                 │
          └─────────────────┼─────────────────┘
                            ▼
                    GSAP + ScrollTrigger
                            │
                            ▼
                  Scroll-driven experience
                            │
                            ▼
                      GitHub Pages
```

### Logical layers inside the application

```text
01 — Design System
     Colors · Typography · Easing · Spacing

02 — Atmosphere
     Sky · Glow · Vignette · Dusk

03 — Hero World
     Ganpati artwork · Aura · Lanterns · Petals

04 — Garden Engine
     Far / Mid / Near depth · Botanical elements · Wind motion

05 — Ceremony Layer
     Curtain · Reveal · Intro copy

06 — Story Sections
     Invitation content · Scroll progression · Scene changes

07 — Interaction Layer
     Pointer · Scroll · Reveal timing · Reduced-motion handling
```

This keeps the current single-page delivery simple while preserving clear boundaries between visual systems, scene composition, and runtime behaviour.

---

## 🌿 Motion Architecture

The experience uses **GSAP 3.12.5** and **ScrollTrigger** for deterministic animation sequencing.

The motion system is built around:

```text
Scroll Position
      ↓
Progress Mapping
      ↓
Scene Timeline
      ├── Background atmosphere
      ├── Hero artwork
      ├── Garden parallax
      ├── Botanical growth
      ├── Curtain transition
      └── Invitation reveal
```

Botanical movement uses multiple organic-wind keyframes instead of one universal oscillation, which allows foreground, middle-ground, flowers and leaves to move with different rhythms.

---

## 📁 Repository Structure

```text
Invite/
│
├── index.html              # Production invitation — UI, styling & runtime
├── ganpati_hero.png        # Original Ganpati artwork
├── index - Copy.html       # Legacy reference copy
├── README.md               # Project documentation
└── .github/
    └── workflows/
        └── deploy.yml      # Automated GitHub Pages deployment
```

### Current architecture choice

The invitation is maintained as a **single production HTML document** because it is a self-contained microsite with no backend and a very small asset surface. This keeps deployment deterministic and makes the invitation portable.

For larger future iterations, the natural evolution is:

```text
index.html
├── css/
│   ├── tokens.css
│   ├── atmosphere.css
│   ├── garden.css
│   ├── ceremony.css
│   └── responsive.css
│
├── js/
│   ├── scene.js
│   ├── garden.js
│   ├── animations.js
│   ├── interaction.js
│   └── motion.js
│
└── assets/
    ├── images/
    └── illustrations/
```

That split is deliberately documented as the **next architecture stage**, rather than pretending the current repository is already modularized.

---

## ⚙️ Technology Stack

| Technology | Role |
|---|---|
| **HTML5** | Semantic page structure and invitation content |
| **CSS3** | Design system, atmosphere, responsive layout and botanical animation |
| **JavaScript (ES2022+)** | Scene orchestration and interaction logic |
| **GSAP 3.12.5** | High-fidelity animation timelines |
| **ScrollTrigger** | Scroll-driven progress and scene transitions |
| **Google Fonts** | Cormorant Garamond, Yatra One, Tiro Devanagari Marathi, Jost |
| **GitHub Pages** | Static hosting |
| **GitHub Actions** | Automated deployment |

No backend, database, API keys, authentication service, or build pipeline is required for the current invitation.

---

## 🚀 Hosting

The production deployment target is:

**https://chillingbing648-sketch.github.io/Invite/**

Every push to `main` is intended to trigger the GitHub Actions deployment workflow.

```text
main branch
    ↓
GitHub Actions
    ↓
Upload static site artifact
    ↓
GitHub Pages
    ↓
🌐 Live Invitation
```

Because the project is a static site, hosting is intentionally simple and resilient: the browser only needs the repository's HTML, image asset and external font/animation CDN resources.

---

## 💻 Run Locally

No installation is required.

```bash
git clone https://github.com/chillingbing648-sketch/Invite.git
cd Invite
```

Then open `index.html` in a browser.

For the closest production-like local environment, serve the folder with any static HTTP server.

---

## 📱 Responsive Design

The scene is designed around a layered visual system rather than a fixed desktop composition.

```text
Desktop
  └── Full botanical depth + cinematic staging

Tablet
  └── Reduced spatial density + preserved hierarchy

Mobile
  └── Composition-first scaling + touch-safe interactions
```

The goal is to keep the central deity artwork, invitation typography and transition hierarchy intact across viewport sizes.

---

## ♿ Accessibility & Performance Principles

- Visible `:focus-visible` states for keyboard users.
- Decorative layers use `pointer-events: none` where interaction is unnecessary.
- `will-change` is reserved for motion-heavy layers.
- Scene elements use GPU-friendly transforms where practical.
- The visual system avoids unnecessary JavaScript-driven per-frame DOM updates.
- Reduced-motion support should remain enabled as the animation system evolves.
- External CDN dependencies are kept intentionally small.

---

## 🔐 Asset & Content Notes

The invitation currently depends on the repository-local `ganpati_hero.png` for the central artwork and external Google Fonts / cdnjs resources for typography and GSAP. The supplied artwork is not replaced by generated imagery.

Keep the following stable when editing the scene:

```text
ganpati_hero.png
# central artwork asset

index.html
# production entry point
```

---

## 🗺️ Roadmap

### Current

- [x] Cinematic opening curtain
- [x] Original Ganpati artwork integration
- [x] Layered garden system
- [x] Organic wind motion
- [x] Scroll-driven visual progression
- [x] Marathi + English typography
- [x] Responsive composition
- [x] GitHub Pages deployment workflow

### Next

- [ ] Modular CSS / JavaScript extraction
- [ ] More advanced botanical growth sequencing
- [ ] Richer mobile-specific scene choreography
- [ ] Reduced-motion audit across every transition
- [ ] Local font fallback strategy
- [ ] Lighthouse / performance budget tracking
- [ ] Optional custom domain

---

## 🤝 Contributing

This is a personal invitation experience, but improvements should preserve the project's visual character.

Before opening a change:

1. Keep the Ganpati artwork central to the composition.
2. Prefer transforms and opacity over expensive layout animation.
3. Keep motion organic and layered rather than perfectly synchronized.
4. Preserve mobile readability.
5. Test the opening scene, scroll progression, final section and reload behaviour.

---

## 🪔 The Idea

> **Not just an invitation — a small digital space for welcoming Bappa home.**

<div align="center">

### गणपती बाप्पा मोरया 🙏

**Built with devotion, motion & a little bit of code.**

</div>
