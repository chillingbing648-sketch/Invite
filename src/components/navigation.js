/**
 * Navigation & User Interaction Controls
 * Scroll cues, smooth scrolling to scenes, keyboard triggers
 */

export function initNavigation() {
  const prompt = document.getElementById('hero-scroll-prompt');
  if (prompt) {
    prompt.setAttribute('role', 'button');
    prompt.setAttribute('tabindex', '0');
    prompt.style.cursor = 'pointer';

    const scrollToFirstScene = () => {
      const celebration = document.getElementById('scene-celebration');
      if (celebration) {
        celebration.scrollIntoView({ behavior: 'smooth' });
      }
    };

    prompt.addEventListener('click', scrollToFirstScene);
    prompt.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToFirstScene();
      }
    });
  }
}
