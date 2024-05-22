window.addEventListener('DOMContentLoaded', () => {
    renderUserData();
});

async function renderUserData() {
    const { data: { user }, error } = await _supabase.auth.getUser();

    if (error) {
        console.log('Authentication error => ', error);
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
            <p>What you need to get the ball: </p>
            <button onclick='logout()'>Logout</button>
        </div>
    `;

    document.querySelector('#user-card').innerHTML = userCard;
}

async function getUserEmail() {
    const { data: { user }, error } = await _supabase.auth.getUser();

    if (error) {
        console.log('Authentication error => ', error);
        return 'email@sample.com';
    }

    return user.email
}

async function getUserId() {
    const { data: { user }, error } = await _supabase.auth.getUser();

    if (error) {
        console.log('Authentication error => ', error);
        return '';
    }

    return user.id
}
