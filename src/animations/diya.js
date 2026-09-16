/**
 * Sacred Diya Animation & Rendering Module
 * Authentic Brass Sanctum Diya with Flickering Light & Ambient Bloom
 */

export function generateDiyaSVG(uid) {
  return `<svg viewBox="0 0 110 90" width="110" height="90" style="overflow:visible;">
    <defs>
      <linearGradient id="${uid}_brass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FFE9A6"/>
        <stop offset="35%" stop-color="#C9963B"/>
        <stop offset="80%" stop-color="#8E6018"/>
        <stop offset="100%" stop-color="#553408"/>
      </linearGradient>
      <radialGradient id="${uid}_flameGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FFE082" stop-opacity="0.85"/>
        <stop offset="45%" stop-color="#FF9800" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#FF5722" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="${uid}_flameBody" cx="50%" cy="75%" r="65%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="30%" stop-color="#FFF9C4"/>
        <stop offset="65%" stop-color="#FFB300"/>
        <stop offset="90%" stop-color="#F4511E"/>
        <stop offset="100%" stop-color="#B71C1C"/>
      </radialGradient>
    </defs>

    <!-- Ground Contact Shadow: Anchors Diya firmly to the sanctuary floor -->
    <ellipse cx="55" cy="84" rx="42" ry="6" fill="rgba(35, 15, 8, 0.45)"/>

    <!-- Brass Diya Pedestal & Oil Bowl -->
    <g class="g-diya-base" style="transform-origin: 55px 74px;">
      <path d="M45,74 C45,80 38,82 34,84 L76,84 C72,82 65,80 65,74 Z" fill="url(#${uid}_brass)"/>
      <path d="M16,52 C24,74 86,74 94,52 C98,46 106,39 108,35 C100,37 92,39 84,41 C64,43 46,43 26,41 C18,39 10,37 2,35 C4,39 12,46 16,52 Z" fill="url(#${uid}_brass)"/>
      <path d="M2,35 C28,42 82,42 108,35 C82,39 28,39 2,35 Z" fill="#FFE9A6" opacity="0.6"/>
      <ellipse cx="55" cy="44" rx="36" ry="7" fill="#6A4012"/>
      <path d="M53,46 Q54,36 55,28" stroke="#3D210D" stroke-width="2.5" stroke-linecap="round"/>
    </g>

    <!-- Diya Flame & Ambient Candlelight Bloom -->
    <g class="g-diya-flame-group" style="transform-origin: 55px 26px;">
      <circle class="diya-ambient-glow" cx="55" cy="22" r="38" fill="url(#${uid}_flameGlow)"/>
      <g class="diya-flicker-flame" style="transform-origin: 55px 26px;">
        <path d="M55,6 C49,16 47,22 50,28 C52,31 58,31 60,28 C63,22 61,16 55,6 Z" fill="url(#${uid}_flameBody)"/>
        <ellipse cx="55" cy="24" rx="3.0" ry="4.8" fill="#FFFFFF" opacity="0.95"/>
      </g>
    </g>
  </svg>`;
}
