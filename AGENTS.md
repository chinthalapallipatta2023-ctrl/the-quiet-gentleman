<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep replaceable brand identity, fictional product data, image references and page metadata helpers in the browser-safe catalogue module so visual content can be changed without rewriting page layouts.
- Use a shared root shell and typed TanStack routes for the wardrobe, products and editorial destinations so navigation and accessible overlays stay consistent.
- Keep collection switching in the shared shell, with a dedicated visible rail on compact screens and the same provider-backed control on desktop, so every screen switches the catalogue and palette together.
- Keep the demonstration bag in React context for the current visit only; this prototype does not take payments, persist orders or imply live inventory.
- Define all visual roles and editorial layouts in the global token-based stylesheet; use design-system Button variants for controls.
- Keep appearance preferences in the shared header with browser storage read after hydration; use fixed photography and garment color tokens so theme changes do not alter their colors.
- Use Embla for the homepage wardrobe rail so touch dragging, snapping and arrow navigation share proven carousel behavior.
- Product cards reveal once through IntersectionObserver after hydration; keep server-rendered content visible and respect reduced motion so browsing stays accessible.
- Shared scroll reveals observe below-the-fold editorial content and use the Web Animations API rather than mutating React-owned attributes, preserving lazy hydration, opening-view visibility and reduced-motion support.
- Wishlists use authenticated shopper ownership with database RLS; the shared provider loads persisted selections after hydration while the demonstration bag remains visit-only.
- The stylist validates occasion, fit and style on both sides, calls Lovable AI through an authenticated server function, and permits only existing catalogue slugs in results.
- Persist AI access and credit blocks in a service-only state table; restore access before clearing a paused state and starting a new request.

- Social share (og:image/twitter:image) uses 1200x630 renditions served from public/share/; build absolute URLs in head() from the getRequestOrigin server function, never from bundled asset imports.
