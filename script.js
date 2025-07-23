document.addEventListener("DOMContentLoaded", function() {
    
    // --- Function to load HTML components (like header and footer) ---
    const loadComponent = (componentPath, placeholderId) => {
        return fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Could not load ${componentPath}`);
                }
                return response.text();
            })
            .then(data => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = data;
                }
            });
    };

    // --- Function to initialize the mobile menu ---
    const initializeMobileMenu = () => {
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            document.querySelectorAll('#mobile-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    };
    
    // --- Function to initialize scroll animations ---
    const initializeScrollAnimations = () => {
        const scrollElements = document.querySelectorAll('.animate-on-scroll');
        
        if (!scrollElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        scrollElements.forEach(element => {
            observer.observe(element);
        });
    };

    // --- Load components and then initialize scripts ---
    Promise.all([
        loadComponent('header.html', 'header-placeholder'),
        loadComponent('footer.html', 'footer-placeholder')
    ])
    .then(() => {
        // After the header and footer are loaded, initialize their scripts
        initializeMobileMenu();
        initializeScrollAnimations(); // This can run anytime after DOM is loaded
    })
    .catch(error => {
        console.error("Error loading components:", error);
    });

});
