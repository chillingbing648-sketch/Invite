/**
 * Section Reveals & ScrollTrigger Transitions
 * Luxury storytelling journey with scrubbed reveals
 */

export function setupContentReveals() {
  if (!window.gsap || !window.ScrollTrigger) return [];
  const triggers = [];
  const defaultScrub = 0.75;

  // 1. Hero content fades out smoothly as you journey into celebration
  const tHero = gsap.fromTo('.hero-content-wrapper',
    { opacity: 1, y: 0 },
    {
      opacity: 0,
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scene-hero',
        start: 'top top',
        end: 'bottom 60%',
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      }
    }
  );
  if (tHero.scrollTrigger) triggers.push(tHero.scrollTrigger);

  // 2. Celebration frosted card reveal
  const tCel = gsap.fromTo('#scene-celebration .content-glass',
    { opacity: 0, y: 55 },
    {
      opacity: 1,
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scene-celebration',
        start: 'top 82%',
        end: 'top 45%',
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      }
    }
  );
  if (tCel.scrollTrigger) triggers.push(tCel.scrollTrigger);

  // 3. Sacred Invitation Card reveal
  const tInv = gsap.fromTo('#invitation-card',
    { opacity: 0, y: 50, scale: 0.97 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scene-invitation',
        start: 'top 80%',
        end: 'top 45%',
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      }
    }
  );
  if (tInv.scrollTrigger) triggers.push(tInv.scrollTrigger);

  // 4. Sacred Transition Bridge between Invitation & Details
  const tBridge = gsap.fromTo('.scene-transition-bridge',
    { opacity: 0, scaleY: 0.5 },
    {
      opacity: 1,
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scene-details',
        start: 'top 92%',
        end: 'top 72%',
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      }
    }
  );
  if (tBridge.scrollTrigger) triggers.push(tBridge.scrollTrigger);

  // 5. Details Card Reveal
  const tDetails = gsap.fromTo('#scene-details .details-card',
    { opacity: 0, y: 45 },
    {
      opacity: 1,
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scene-details',
        start: 'top 84%',
        end: 'top 50%',
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      }
    }
  );
  if (tDetails.scrollTrigger) triggers.push(tDetails.scrollTrigger);

  // 6. Timeline Spine Golden Fill Drawing
  const spineFill = document.getElementById('timeline-spine-fill');
  if (spineFill) {
    const tSpine = gsap.fromTo(spineFill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '#details-list',
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: defaultScrub,
          invalidateOnRefresh: true,
        }
      }
    );
    if (tSpine.scrollTrigger) triggers.push(tSpine.scrollTrigger);
  }

  // 7. Detail rows staggered vertical reveal
  const tRows = gsap.fromTo('#scene-details .detail-row',
    { opacity: 0, y: 18 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      ease: 'none',
      scrollTrigger: {
        trigger: '#details-list',
        start: 'top 76%',
        end: 'top 36%',
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      }
    }
  );
  if (tRows.scrollTrigger) triggers.push(tRows.scrollTrigger);

  // 8. Location Card Reveal
  const tLoc = gsap.fromTo('#scene-location .content-glass',
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scene-location',
        start: 'top 80%',
        end: 'top 45%',
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      }
    }
  );
  if (tLoc.scrollTrigger) triggers.push(tLoc.scrollTrigger);

  // 9. Modak Sacred Offering & Blessing
  const tModak = gsap.fromTo('.modak-wrap',
    { opacity: 0, y: 35, scale: 0.85 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scene-modak',
        start: 'top 80%',
        end: 'top 50%',
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      }
    }
  );
  if (tModak.scrollTrigger) triggers.push(tModak.scrollTrigger);

  const tModakLine = gsap.fromTo('.modak-line',
    { opacity: 0, y: 25 },
    {
      opacity: 1,
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scene-modak',
        start: 'top 72%',
        end: 'top 42%',
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      }
    }
  );
  if (tModakLine.scrollTrigger) triggers.push(tModakLine.scrollTrigger);

  // 10. Final Sacred Darshan
  const tFinalBadge = gsap.fromTo('#scene-final .final-art-badge',
    { opacity: 0, scale: 0.75 },
    {
      opacity: 1,
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scene-final',
        start: 'top 80%',
        end: 'top 50%',
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      }
    }
  );
  if (tFinalBadge.scrollTrigger) triggers.push(tFinalBadge.scrollTrigger);

  const tFinalMain = gsap.fromTo('#scene-final .final-main',
    { opacity: 0, y: 25 },
    {
      opacity: 1,
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scene-final',
        start: 'top 65%',
        end: 'top 35%',
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      }
    }
  );
  if (tFinalMain.scrollTrigger) triggers.push(tFinalMain.scrollTrigger);

  const tFinalSub = gsap.fromTo('#scene-final .final-sub',
    { opacity: 0, y: 15 },
    {
      opacity: 1,
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scene-final',
        start: 'top 55%',
        end: 'top 30%',
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      }
    }
  );
  if (tFinalSub.scrollTrigger) triggers.push(tFinalSub.scrollTrigger);

  return triggers;
}

export function cleanupTransitions(triggers = []) {
  triggers.forEach(t => t && t.kill && t.kill());
}
