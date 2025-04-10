
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }
    
    // Toggle theme when the button is clicked
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Update icon visibility
        const isDarkMode = document.body.classList.contains('dark-mode');
        moonIcon.style.display = isDarkMode ? 'none' : 'block';
        sunIcon.style.display = isDarkMode ? 'block' : 'none';
        
        // Save preference to localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
});

document.addEventListener('DOMContentLoaded', () => {
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const downloadCards = document.querySelectorAll('.download-card');

const filterCards = () => {
    const query = searchInput.value.toLowerCase();
    downloadCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-description').textContent.toLowerCase();
        if (title.includes(query) || description.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

searchButton.addEventListener('click', filterCards);
searchInput.addEventListener('input', filterCards);
});
