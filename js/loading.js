class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.init();
    }

    init() {
        // Ensure all content is loaded before hiding the loading screen
        window.addEventListener('load', () => {
            // Add a small delay to ensure animations are visible
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 2000); // 2 seconds delay
        });
    }

    hideLoadingScreen() {
        this.loadingScreen.classList.add('hidden');
    }
}

// Initialize loading screen
const loadingScreen = new LoadingScreen();
