class AccessibilityManager {
    constructor() {
        this.isHighContrast = localStorage.getItem('highContrast') === 'true';
        this.isTTSEnabled = false;
        this.speechSynthesis = window.speechSynthesis;
        this.init();
    }

    init() {
        this.createAccessibilityControls();
        this.setupEventListeners();
        if (this.isHighContrast) {
            document.documentElement.setAttribute('data-high-contrast', 'true');
        }
    }

    createAccessibilityControls() {
        const navbar = document.querySelector('.nav-links');
        const accessibilityButton = document.createElement('button');
        accessibilityButton.className = 'nav-link accessibility-btn';
        accessibilityButton.setAttribute('aria-label', 'Toggle accessibility menu');
        accessibilityButton.innerHTML = '<i class="fas fa-universal-access"></i>';
        
        const accessibilityMenu = document.createElement('div');
        accessibilityMenu.className = 'accessibility-menu';
        accessibilityMenu.innerHTML = `
            <div class="accessibility-options">
                <button class="contrast-toggle" aria-label="Toggle high contrast">
                    <i class="fas fa-adjust"></i> High Contrast
                </button>
                <button class="tts-toggle" aria-label="Toggle text to speech">
                    <i class="fas fa-volume-up"></i> Read Aloud
                </button>
            </div>
        `;
        
        navbar.appendChild(accessibilityButton);
        document.body.appendChild(accessibilityMenu);
        
        accessibilityButton.addEventListener('click', () => {
            accessibilityMenu.classList.toggle('show');
        });
    }

    setupEventListeners() {
        const contrastToggle = document.querySelector('.contrast-toggle');
        const ttsToggle = document.querySelector('.tts-toggle');

        contrastToggle.addEventListener('click', () => this.toggleHighContrast());
        ttsToggle.addEventListener('click', () => this.toggleTTS());

        // Setup TTS for interactive elements
        document.querySelectorAll('a, button, h1, h2, h3, p').forEach(element => {
            element.addEventListener('focus', () => {
                if (this.isTTSEnabled) {
                    this.speak(element.textContent);
                }
            });
        });
    }

    toggleHighContrast() {
        this.isHighContrast = !this.isHighContrast;
        document.documentElement.setAttribute('data-high-contrast', this.isHighContrast);
        localStorage.setItem('highContrast', this.isHighContrast);
    }

    toggleTTS() {
        this.isTTSEnabled = !this.isTTSEnabled;
        document.querySelector('.tts-toggle').classList.toggle('active');
        
        if (this.isTTSEnabled) {
            this.speak('Text-to-speech enabled');
        } else {
            this.speechSynthesis.cancel();
        }
    }

    speak(text) {
        if (this.speechSynthesis.speaking) {
            this.speechSynthesis.cancel();
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        this.speechSynthesis.speak(utterance);
    }
}

// Initialize accessibility manager
const accessibilityManager = new AccessibilityManager();
