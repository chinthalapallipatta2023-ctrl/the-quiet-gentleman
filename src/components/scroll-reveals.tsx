import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';

/** Enhance existing editorial layouts without hiding server-rendered content. */
export function ScrollReveals() {
 const location = useRouterState({ select: state => state.location.href });
 useEffect(() => {
  if (!('IntersectionObserver' in window)) return;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const elements = Array.from(document.querySelectorAll<HTMLElement>(
   'main .intro-line, main .object-image, main .object-copy, main .section-heading, main .campaign-copy, main .campaign-photo, main .page-intro, main .filter-row, main .article-layout > *, main .journal-grid > *, main .gallery-main, main .purchase, .footer-top, .footer-bottom',
  ));
  const observer = new IntersectionObserver(entries => {
   for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.setAttribute('data-scroll-reveal', 'visible');
    observer.unobserve(entry.target);
   }
  }, { threshold: 0, rootMargin: '0px 0px -48px 0px' });
  const showAll = () => {
   if (!preference.matches) return;
   observer.disconnect();
   elements.forEach(element => element.setAttribute('data-scroll-reveal', 'visible'));
  };
  if (!preference.matches) {
   elements.forEach(element => {
    // Keep the opening view fully visible; reveal only content below it.
    if (element.getBoundingClientRect().top < window.innerHeight - 48) return;
    element.setAttribute('data-scroll-reveal', 'pending');
    observer.observe(element);
   });
  }
  preference.addEventListener('change', showAll);
  return () => {
   observer.disconnect();
   preference.removeEventListener('change', showAll);
   elements.forEach(element => element.removeAttribute('data-scroll-reveal'));
  };
 }, [location]);
 return null;
}