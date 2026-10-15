import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useWishlist } from '@/lib/wishlist';
import { pageHead } from '@/lib/catalog';
import { Button } from '@/components/ui/button';
export const Route = createFileRoute('/reset-password')({ head: () => pageHead('Reset Password', 'Securely update your shopper account password.'), component: ResetPassword });
function ResetPassword() {
 const wishlist = useWishlist(); const [password, setPassword] = useState(''); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
 return <div className="container-editorial"><div className="page-intro"><h1>A fresh start.</h1></div>{wishlist.user ? <form className="auth-form reset-form" onSubmit={async event => {event.preventDefault(); if (password.length < 8 || password.length > 128) return; setBusy(true); const result = await supabase.auth.updateUser({ password }); setMessage(result.error?.message ?? 'Your password has been updated.');setBusy(false);}}><label htmlFor="new-password">New password</label><input id="new-password" type="password" autoComplete="new-password" required minLength={8} maxLength={128} value={password} onChange={event => setPassword(event.target.value)} /><Button variant="editorial" disabled={busy}>UPDATE PASSWORD</Button><p role="status">{message}</p></form> : <p className="body-copy wishlist-bottom">Open the password reset link from your email to continue.</p>}</div>;
}