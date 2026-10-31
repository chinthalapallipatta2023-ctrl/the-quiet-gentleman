import { flushSync } from 'react-dom';

type TransitionDocument = Document & { startViewTransition?: (update: () => void) => { finished: Promise<void> } };

/** Runs a synchronous UI update inside a named View Transition, falling back to an instant change. */
export function withViewTransition(className: string, update: () => void, vars: Record<string, string> = {}) {
  const doc = document as TransitionDocument;
  if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { update(); return; }
  const root = document.documentElement;
  Object.entries(vars).forEach(([key, value]) => root.style.setProperty(key, value));
  root.classList.add(className);
  const transition = doc.startViewTransition(() => flushSync(update));
  transition.finished.finally(() => root.classList.remove(className));
}
