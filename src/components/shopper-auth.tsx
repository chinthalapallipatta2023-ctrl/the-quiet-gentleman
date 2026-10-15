import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import '@lovable.dev/cloud-auth-js/styles.css';
import { useWishlist } from '@/lib/wishlist';
const credentials = z.object({ email: z.string().email().max(254), password: z.string().min(8).max(128) });
export function ShopperAuth() {
 const wishlist = useWishlist();
 const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
 const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
 const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
 const social = async (provider: 'google' | 'lovable') => {
  setBusy(true); setMessage('');
  try {
   const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
   if (result.error) setMessage(result.error.message);
   else if (!result.redirected) wishlist.setAuthOpen(false);
  } catch { setMessage('Sign-in could not be completed. Please try again.'); }
  finally { setBusy(false); }
 };
 const submit = async (event: React.FormEvent) => {
  event.preventDefault(); setMessage('');
  const parsed = mode === 'reset' ? z.string().email().max(254).safeParse(email) : credentials.safeParse({ email, password });
  if (!parsed.success) { setMessage('Enter a valid email and a password of at least 8 characters.'); return; }
  setBusy(true);
  try {
   if (mode === 'reset') {
    const result = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
    setMessage(result.error?.message ?? 'Check your email for a password reset link.');
   } else if (mode === 'signup') {
    const result = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } });
    if (result.error) setMessage(result.error.message);
    else if (result.data.session) wishlist.setAuthOpen(false);
    else setMessage('Check your email to confirm your account, then sign in here.');
   } else {
    const result = await supabase.auth.signInWithPassword({ email, password });
    if (result.error) setMessage(result.error.message); else wishlist.setAuthOpen(false);
   }
  } catch { setMessage('Sign-in is unavailable right now. Please try again.'); }
  finally { setBusy(false); }
 };
 return <Sheet open={wishlist.authOpen} onOpenChange={wishlist.setAuthOpen}><SheetContent className="drawer-panel"><SheetTitle className="drawer-title">{mode === 'signup' ? 'Your wardrobe, kept' : mode === 'reset' ? 'Reset your password' : 'Welcome back'}</SheetTitle><SheetDescription>Sign in to keep your wishlist and receive personal selections.</SheetDescription><div className="drawer-content auth-form">{mode !== 'reset' && <><Button variant="outline" disabled={busy} onClick={() => void social('google')}>Continue with Google</Button><Button className="lovable-auth-button" disabled={busy} onClick={() => void social('lovable')}>Continue with Lovable</Button><p className="auth-divider">or with email</p></>}<form onSubmit={submit}><label htmlFor="shopper-email">Email</label><input id="shopper-email" type="email" autoComplete="email" maxLength={254} required value={email} onChange={event => setEmail(event.target.value)} />{mode !== 'reset' && <><label htmlFor="shopper-password">Password</label><input id="shopper-password" type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} minLength={8} maxLength={128} required value={password} onChange={event => setPassword(event.target.value)} /></>}<Button variant="editorial" type="submit" disabled={busy}>{busy ? 'PLEASE WAIT…' : mode === 'signup' ? 'CREATE ACCOUNT' : mode === 'reset' ? 'SEND RESET LINK' : 'SIGN IN'}</Button></form>{message && <p role="status" className="body-copy">{message}</p>}<Button variant="editorialLink" onClick={() => {setMode(mode === 'signup' ? 'signin' : 'signup');setMessage('');}}>{mode === 'signup' ? 'Already have an account? Sign in' : 'Create an account'}</Button><Button variant="navigation" onClick={() => {setMode(mode === 'reset' ? 'signin' : 'reset');setMessage('');}}>{mode === 'reset' ? 'Back to sign in' : 'Forgot password?'}</Button></div></SheetContent></Sheet>;
}