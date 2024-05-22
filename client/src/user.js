window.addEventListener('DOMContentLoaded', () => {
    renderUserData();
});

async function renderUserData() {
    const { data: { user }, error } = await _supabase.auth.getUser();

    if (error) {
        console.log('Authentication error => ', error);
        // document.querySelector('#login-button').classList.add('hidden');
        const userCard = `
            <button onclick="login()">Login</button>
        `;

        document.querySelector('#user-card').innerHTML = userCard;
        return;
    }

    const userCard = `
        <div class='user-card'>
            <p>${user.user_metadata.full_name}</p>
            <p>Total paid: </p>
            <p>Highest paid: </p>
            <button onclick='logout()'>Logout</button>
        </div>
    `;

    document.querySelector('#user-card').innerHTML = userCard;
}