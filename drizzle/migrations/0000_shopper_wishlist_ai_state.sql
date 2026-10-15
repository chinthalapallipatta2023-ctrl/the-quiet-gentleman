CREATE TABLE public.wishlist_items (
 user_id uuid NOT NULL,
 product_slug text NOT NULL CHECK (product_slug IN ('everyday-shirt','pleated-trouser','relaxed-overshirt','knit-polo','striped-shirt','straight-trouser')),
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY (user_id, product_slug)
);
GRANT SELECT, INSERT, DELETE ON public.wishlist_items TO authenticated;
GRANT ALL ON public.wishlist_items TO service_role;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own wishlist" ON public.wishlist_items FOR SELECT TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "Save own pieces" ON public.wishlist_items FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
CREATE POLICY "Remove own pieces" ON public.wishlist_items FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);
CREATE TABLE public.ai_service_state (
 id text PRIMARY KEY,
 blocked boolean NOT NULL DEFAULT false,
 message text,
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.ai_service_state TO service_role;
ALTER TABLE public.ai_service_state ENABLE ROW LEVEL SECURITY;