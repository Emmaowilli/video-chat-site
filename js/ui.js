window.loadPage = async (url) => {
    const content = document.getElementById('content');
    try {
        const response = await fetch(url);
        content.innerHTML = await response.text();
    } catch (err) {
        content.innerHTML = '<h2>Page not found</h2>';
    }
};

// Call this on load
document.addEventListener('DOMContentLoaded', () => {
    loadPage('pages/login.html'); // Start on login
});