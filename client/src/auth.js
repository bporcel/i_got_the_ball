const { createClient } = supabase
const _supabase = createClient('https://tlmwywzrefmfiakuqinf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbXd5d3pyZWZtZmlha3VxaW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzMTk3MzUsImV4cCI6MjAzMTg5NTczNX0.6QDE2FskwQBZ6nkzzZFrdVf_7rEX0D_dh8nE_0WHvBg')

async function login() {
    await _supabase.auth.signInWithOAuth(
        {
            provider: 'google'
        }
    );
}

async function logout() {
    await _supabase.auth.signOut();
}

async function isLoggedIn() {
    const { error } = await _supabase.auth.getUser();
    return error ? false : true;
}
