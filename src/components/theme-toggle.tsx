import { useEffect, useState, type MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import { withViewTransition } from '@/lib/view-transition';

const rays = [0, 45, 90, 135, 180, 225, 270, 315];

/** Day/night switch: a sun whose rays draw in as a shadow eclipses it, while the page is revealed from the button outward. */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let preference: string | null = null;
    try { preference = localStorage.getItem('maison-appearance'); } catch { /* Storage may be unavailable. */ }
    setDark(preference ? preference === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark]);
  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next = !dark;
    const box = event.currentTarget.getBoundingClientRect();
    withViewTransition('theme-shift', () => { setDark(next); document.documentElement.classList.toggle('dark', next); }, { '--reveal-x': `${box.left + box.width / 2}px`, '--reveal-y': `${box.top + box.height / 2}px` });
    try { localStorage.setItem('maison-appearance', next ? 'dark' : 'light'); } catch { /* Keep the switch usable without storage. */ }
  }
  return <Button variant="navigation" size="icon" className="eclipse-toggle" role="switch" aria-checked={dark} aria-label="Dark mode" title={dark ? 'Switch to day' : 'Switch to night'} onClick={toggle}>
    <svg viewBox="0 0 24 24" aria-hidden="true" className="eclipse-icon">
      <mask id="eclipse-mask"><rect width="24" height="24" fill="white" /><circle className="eclipse-shadow" cx="24" cy="4" r="7" fill="black" /></mask>
      <circle className="eclipse-body" cx="12" cy="12" r="5" fill="currentColor" mask="url(#eclipse-mask)" />
      <g className="eclipse-rays" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">{rays.map(angle => <line key={angle} x1="12" y1="2.5" x2="12" y2="4.5" transform={`rotate(${angle} 12 12)`} />)}</g>
    </svg>
  </Button>;
}
