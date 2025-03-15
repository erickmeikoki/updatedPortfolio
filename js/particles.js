class Particle {
    constructor(canvas, color) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = color;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-bg');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.init();
        this.animate();
        this.handleThemeChange();
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.createParticles();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        const color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas, color));
        }
    }

    handleThemeChange() {
        const observer = new MutationObserver(() => {
            const color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
            this.particles.forEach(particle => particle.color = color);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        this.connectParticles();
        requestAnimationFrame(() => this.animate());
    }

    connectParticles() {
        const maxDistance = 100;
        this.ctx.strokeStyle = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color')
            .trim();
        this.ctx.lineWidth = 0.3;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});
