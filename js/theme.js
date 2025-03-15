class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.toggleBtn = document.getElementById('theme-toggle');
        this.init();
    }

    init() {
        // Set initial theme
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateToggleButton();

        // Add event listener with enhanced animation
        this.toggleBtn.addEventListener('click', () => {
            this.toggleBtn.style.transform = 'rotate(180deg) scale(0.8)';
            setTimeout(() => {
                this.toggleTheme();
                this.toggleBtn.style.transform = 'rotate(0) scale(1)';
            }, 200);
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateToggleButton();
    }

    updateToggleButton() {
        const icon = this.toggleBtn.querySelector('i');
        if (this.theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();