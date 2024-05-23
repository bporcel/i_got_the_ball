import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export async function login() {
    await supabase.auth.signInWithOAuth(
        {
            provider: 'google'
        }
    );
}

export async function logout() {
    await supabase.auth.signOut();
}

export async function isLoggedIn() {
    const { error } = await supabase.auth.getUser();
    return error ? false : true;
}
