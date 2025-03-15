class ThemeGenerator {
    constructor() {
        this.themeDialog = null;
        this.init();
    }

    init() {
        this.createThemeDialog();
        this.addThemeButton();
    }

    createThemeDialog() {
        const dialog = document.createElement('dialog');
        dialog.className = 'theme-dialog';
        dialog.innerHTML = `
            <div class="theme-dialog-content">
                <h2>Customize Theme</h2>
                <div class="color-picker-container">
                    <label for="primary-color">Primary Color:</label>
                    <input type="color" id="primary-color" value="#2563eb">
                    <div class="color-preview"></div>
                </div>
                <div class="theme-actions">
                    <button class="btn" id="apply-theme">Apply Theme</button>
                    <button class="btn" id="close-dialog">Cancel</button>
                </div>
            </div>
        `;
        document.body.appendChild(dialog);
        this.themeDialog = dialog;
        this.setupEventListeners();
    }

    addThemeButton() {
        const navbar = document.querySelector('.nav-links');
        const themeButton = document.createElement('button');
        themeButton.className = 'nav-link customize-theme-btn';
        themeButton.innerHTML = '<i class="fas fa-palette"></i> Customize';
        themeButton.addEventListener('click', () => this.themeDialog.showModal());
        navbar.appendChild(themeButton);
    }

    setupEventListeners() {
        const colorPicker = this.themeDialog.querySelector('#primary-color');
        const applyButton = this.themeDialog.querySelector('#apply-theme');
        const closeButton = this.themeDialog.querySelector('#close-dialog');
        const preview = this.themeDialog.querySelector('.color-preview');

        colorPicker.addEventListener('input', (e) => {
            preview.style.backgroundColor = e.target.value;
            this.generateThemePreview(e.target.value);
        });

        applyButton.addEventListener('click', () => {
            this.applyTheme(colorPicker.value);
            this.themeDialog.close();
        });

        closeButton.addEventListener('click', () => {
            this.themeDialog.close();
        });
    }

    generateThemePreview(primaryColor) {
        // Convert hex to RGB for easier manipulation
        const rgb = this.hexToRgb(primaryColor);
        
        // Generate lighter and darker variations
        const lightVariant = this.adjustBrightness(rgb, 0.2);
        const darkVariant = this.adjustBrightness(rgb, -0.2);

        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--primary-light', lightVariant);
        document.documentElement.style.setProperty('--primary-dark', darkVariant);
    }

    applyTheme(primaryColor) {
        // Save to localStorage
        localStorage.setItem('custom-theme-primary', primaryColor);
        this.generateThemePreview(primaryColor);

        // Update particle colors
        const event = new CustomEvent('themeUpdate', { detail: { primaryColor } });
        document.dispatchEvent(event);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    adjustBrightness(rgb, factor) {
        const adjust = (value) => {
            const adjusted = Math.round(value * (1 + factor));
            return Math.min(255, Math.max(0, adjusted));
        };

        return `rgb(${adjust(rgb.r)}, ${adjust(rgb.g)}, ${adjust(rgb.b)})`;
    }
}

// Initialize theme generator
const themeGenerator = new ThemeGenerator();
