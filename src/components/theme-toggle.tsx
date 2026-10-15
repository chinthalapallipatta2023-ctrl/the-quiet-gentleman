import { useEffect, useState } from 'react';
import { Lightbulb, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let preference: string | null = null;
    try { preference = localStorage.getItem('maison-appearance'); } catch { /* Storage may be unavailable. */ }
    setDark(preference ? preference === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark]);
  function toggle() {
    const next = !dark;
    setDark(next);
    try { localStorage.setItem('maison-appearance', next ? 'dark' : 'light'); } catch { /* Keep the switch usable without storage. */ }
  }
  return <Button variant="navigation" className="theme-switch" role="switch" aria-checked={dark} aria-label="Dark mode" title={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggle}><span className="theme-switch-track"><span className="theme-switch-knob"><Lightbulb className="theme-bulb" /><Moon className="theme-moon" /></span></span></Button>;
}