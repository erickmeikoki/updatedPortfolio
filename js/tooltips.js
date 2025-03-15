class TooltipManager {
    constructor() {
        this.tooltips = {
            'about-title': 'Learn about my professional background and expertise',
            'projects-title': 'Explore my featured development projects and their technical details',
            'skills-title': 'View my technical skills and proficiency levels',
            'contact-title': 'Get in touch with me for opportunities or collaborations'
        };
        this.activeTooltip = null;
        this.init();
    }

    init() {
        // Create tooltip container
        this.tooltipElement = document.createElement('div');
        this.tooltipElement.className = 'tooltip';
        this.tooltipElement.setAttribute('role', 'tooltip');
        this.tooltipElement.setAttribute('aria-hidden', 'true');
        document.body.appendChild(this.tooltipElement);

        // Add event listeners to section headers
        Object.keys(this.tooltips).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.setAttribute('tabindex', '0');
                element.setAttribute('aria-describedby', `tooltip-${id}`);
                element.addEventListener('mouseenter', () => this.showTooltip(element));
                element.addEventListener('mouseleave', () => this.hideTooltip());
                element.addEventListener('focus', () => this.showTooltip(element));
                element.addEventListener('blur', () => this.hideTooltip());
            }
        });

        // Handle keyboard events
        document.addEventListener('keyup', (e) => {
            if (e.key === 'Escape' && this.activeTooltip) {
                this.hideTooltip();
            }
        });
    }

    showTooltip(element) {
        const id = element.id;
        const text = this.tooltips[id];
        if (!text) return;

        this.tooltipElement.textContent = text;
        this.tooltipElement.setAttribute('aria-hidden', 'false');
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        const tooltipRect = this.tooltipElement.getBoundingClientRect();
        
        this.tooltipElement.style.top = `${rect.bottom + window.scrollY + 10}px`;
        this.tooltipElement.style.left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2)}px`;
        
        this.tooltipElement.classList.add('visible');
        this.activeTooltip = element;
    }

    hideTooltip() {
        this.tooltipElement.classList.remove('visible');
        this.tooltipElement.setAttribute('aria-hidden', 'true');
        this.activeTooltip = null;
    }
}

// Initialize tooltip manager
const tooltipManager = new TooltipManager();
