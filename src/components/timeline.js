/**
 * Timeline Interactive Component
 * Handles micro-interactions, responsive states, and event row highlights
 */

export function initTimeline() {
  const rows = document.querySelectorAll('.detail-row');
  rows.forEach(row => {
    const onEnter = () => row.classList.add('hovered');
    const onLeave = () => row.classList.remove('hovered');

    row.addEventListener('mouseenter', onEnter);
    row.addEventListener('mouseleave', onLeave);
    row.addEventListener('focusin', onEnter);
    row.addEventListener('focusout', onLeave);
    row.addEventListener('touchstart', onEnter, { passive: true });
    row.addEventListener('touchend', onLeave, { passive: true });
  });
}
