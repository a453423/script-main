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

    const tabs = document.querySelectorAll(".category-tab");
    const products = document.querySelectorAll(".product-card");
    const paginationItems = document.querySelectorAll(".page-item");
    const prevPage = document.querySelector(".page-nav:first-child");
    const nextPage = document.querySelector(".page-nav:last-child");

    const itemsPerPage = 6; // Number of products per page
    let currentPage = 1;
    let currentCategory = "All Items";
    let currentSearchQuery = ""; // Add a global variable for the search query

    const categoryFilter = document.getElementById('categoryFilter');
    // Remove or comment out this line
    // const sortFilter = document.getElementById('sortFilter');

    // Function to filter products by category and paginate
    function updateProducts() {
        let filteredProducts = Array.from(products).filter(product => {
            const matchesCategory = currentCategory === "All Items" || product.dataset.category === currentCategory;
            const matchesSearch = currentSearchQuery === "" || 
                product.querySelector('.product-title').textContent.toLowerCase().includes(currentSearchQuery) || 
                product.querySelector('.product-description').textContent.toLowerCase().includes(currentSearchQuery);
            return matchesCategory && matchesSearch; // Filter by both category and search query
        });

        // Apply sorting
        // const sortValue = sortFilter.value;
        // if (sortValue === "lowToHigh") {
        //     filteredProducts.sort((a, b) => {
        //         const priceA = parseFloat(a.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));
        //         const priceB = parseFloat(b.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));
        //         return priceA - priceB;
        //     });
        // } else if (sortValue === "highToLow") {
        //     filteredProducts.sort((a, b) => {
        //         const priceA = parseFloat(a.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));
        //         const priceB = parseFloat(b.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));
        //         return priceB - priceA;
        //     });
        // } else if (sortValue === "bestRated") {
        //     filteredProducts.sort((a, b) => parseFloat(b.querySelector('.product-rating').textContent) - parseFloat(a.querySelector('.product-rating').textContent));
        // } else if (sortValue === "newest") {
        //     // Add logic for newest if applicable (e.g., based on a data attribute like `data-date`)
        // }

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        products.forEach(product => (product.style.display = "none")); // Hide all products
        filteredProducts.slice(start, end).forEach(product => (product.style.display = "block")); // Show filtered products

        // Update pagination visibility
        paginationItems.forEach((item, index) => {
            if (index < Math.ceil(filteredProducts.length / itemsPerPage)) {
                item.style.display = "inline-flex"; // Ensure buttons are visible
            } else {
                item.style.display = "none"; // Hide unused buttons
            }
        });

        // Update active pagination button
        paginationItems.forEach(item => item.classList.remove("active"));
        if (paginationItems[currentPage - 1]) {
            paginationItems[currentPage - 1].classList.add("active");
        }
    }

    // Event listener for category tabs
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active")); // Remove active class from all tabs
            tab.classList.add("active"); // Add active class to the clicked tab

            currentCategory = tab.textContent.trim(); // Update current category
            currentPage = 1; // Reset to the first page
            updateProducts(); // Update products
        });
    });

    // Event listener for pagination buttons
    paginationItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            currentPage = index + 1; // Update current page
            updateProducts(); // Update products
        });
    });

    // Event listener for previous and next buttons
    prevPage.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            updateProducts();
        }
    });

    nextPage.addEventListener("click", () => {
        const filteredProducts = Array.from(products).filter(product => {
            return currentCategory === "All Items" || product.dataset.category === currentCategory;
        });
        if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
            currentPage++;
            updateProducts();
        }
    });

    const searchBar = document.querySelector('.search-bar input');

    // Event listener for the search bar
    searchBar.addEventListener('input', () => {
        currentSearchQuery = searchBar.value.toLowerCase().trim(); // Update the global search query
        currentPage = 1; // Reset to the first page
        updateProducts(); // Update products
    });

    // Event listener for category filter
    categoryFilter.addEventListener('change', () => {
        currentCategory = categoryFilter.value;
        currentPage = 1; // Reset to the first page
        updateProducts();
    });

    // Remove or comment out any event listeners or logic related to sortFilter
    // Example:
    // sortFilter.addEventListener('change', () => {
    //     updateProducts(); // Update products based on the selected sort option
    // });

    // Initialize the product grid
    updateProducts();
});