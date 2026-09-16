/**
 * Section Reveals & ScrollTrigger Transitions
 * Luxury storytelling journey with scrubbed reveals
 */

export function setupContentReveals() {
  if (!window.gsap || !window.ScrollTrigger) return [];
  const triggers = [];
      const defaultScrub = 0.75;

      // Hero content fades as you journey into celebration
      const tHero = gsap.to('.hero-content-wrapper', {
        opacity: 0, y: -40,
        scrollTrigger: {
          trigger: '#scene-hero',
          start: 'top top',
          end: 'bottom 60%',
          scrub: defaultScrub,
          fastScrollEnd: true,
        }
      });
      if (tHero.scrollTrigger) triggers.push(tHero.scrollTrigger);

      // Celebration
      const tCel = gsap.from('#scene-celebration .content-glass', {
        opacity: 0, y: 55,
        scrollTrigger: {
          trigger: '#scene-celebration',
          start: 'top 82%',
          end: 'top 45%',
          scrub: defaultScrub,
          fastScrollEnd: true,
        }
      });
      if (tCel.scrollTrigger) triggers.push(tCel.scrollTrigger);

      // Invitation card
      const tInv = gsap.from('#invitation-card', {
        opacity: 0, y: 50, scale: 0.97,
        scrollTrigger: {
          trigger: '#scene-invitation',
          start: 'top 80%',
          end: 'top 45%',
          scrub: defaultScrub,
          fastScrollEnd: true,
        }
      });
      if (tInv.scrollTrigger) triggers.push(tInv.scrollTrigger);

      // Sacred Transition Bridge
      const tBridge = gsap.from('.scene-transition-bridge', {
        opacity: 0, scaleY: 0.5,
        scrollTrigger: {
          trigger: '#scene-details',
          start: 'top 92%',
          end: 'top 72%',
          scrub: defaultScrub,
          fastScrollEnd: true,
        }
      });
      if (tBridge.scrollTrigger) triggers.push(tBridge.scrollTrigger);

      // Details Card Reveal
      const tDetails = gsap.from('#scene-details .details-card', {
        opacity: 0, y: 45,
        scrollTrigger: {
          trigger: '#scene-details',
          start: 'top 84%',
          end: 'top 50%',
          scrub: defaultScrub,
          fastScrollEnd: true,
        }
      });
      if (tDetails.scrollTrigger) triggers.push(tDetails.scrollTrigger);

      // Timeline Spine Golden Fill Drawing
      const spineFill = document.getElementById('timeline-spine-fill');
      if (spineFill) {
        const tSpine = gsap.to(spineFill, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#details-list',
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: defaultScrub,
            fastScrollEnd: true,
          }
        });
        if (tSpine.scrollTrigger) triggers.push(tSpine.scrollTrigger);
      }

      // Detail rows staggered vertical reveal
      const tRows = gsap.from('#scene-details .detail-row', {
        opacity: 0,
        y: 18,
        stagger: 0.08,
        scrollTrigger: {
          trigger: '#details-list',
          start: 'top 76%',
          end: 'top 36%',
          scrub: defaultScrub,
          fastScrollEnd: true,
        }
      });
      if (tRows.scrollTrigger) triggers.push(tRows.scrollTrigger);

      // Location
      const tLoc = gsap.from('#scene-location .content-glass', {
        opacity: 0, y: 50,
        scrollTrigger: {
          trigger: '#scene-location',
          start: 'top 80%',
          end: 'top 45%',
          scrub: defaultScrub,
          fastScrollEnd: true,
        }
      });
      if (tLoc.scrollTrigger) triggers.push(tLoc.scrollTrigger);

      // Modak
      const tModak = gsap.from('.modak-wrap', {
        opacity: 0, y: 35, scale: 0.85,
        scrollTrigger: {
          trigger: '#scene-modak',
          start: 'top 80%',
          end: 'top 50%',
          scrub: defaultScrub,
          fastScrollEnd: true,
        }
      });
      if (tModak.scrollTrigger) triggers.push(tModak.scrollTrigger);

      const tModakLine = gsap.from('.modak-line', {
        opacity: 0, y: 25,
        scrollTrigger: {
          trigger: '#scene-modak',
          start: 'top 72%',
          end: 'top 42%',
          scrub: defaultScrub,
          fastScrollEnd: true,
        }
      });
      if (tModakLine.scrollTrigger) triggers.push(tModakLine.scrollTrigger);

      // Final scene
      const tFinalBadge = gsap.from('#scene-final .final-art-badge', {
        opacity: 0, scale: 0.75,
        scrollTrigger: {
          trigger: '#scene-final',
          start: 'top 80%',
          end: 'top 50%',
          scrub: defaultScrub,
          fastScrollEnd: true,
        }
      });
      if (tFinalBadge.scrollTrigger) triggers.push(tFinalBadge.scrollTrigger);

      const tFinalMain = gsap.from('#scene-final .final-main', {
        opacity: 0, y: 25,
        scrollTrigger: {
          trigger: '#scene-final',
          start: 'top 65%',
          end: 'top 35%',
          scrub: defaultScrub,
          fastScrollEnd: true,
        }
      });
      if (tFinalMain.scrollTrigger) triggers.push(tFinalMain.scrollTrigger);

      const tFinalSub = gsap.from('#scene-final .final-sub', {
        opacity: 0,
        scrollTrigger: {
          trigger: '#scene-final',
          start: 'top 55%',
          end: 'top 30%',
          scrub: defaultScrub,
          fastScrollEnd: true,
        }
      });
      if (tFinalSub.scrollTrigger) triggers.push(tFinalSub.scrollTrigger);

  return triggers;
}

export function cleanupTransitions(triggers = []) {
  triggers.forEach(t => t && t.kill && t.kill());
}
