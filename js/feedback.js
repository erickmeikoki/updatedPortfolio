class FeedbackWidget {
    constructor() {
        this.toggleBtn = document.getElementById('feedback-toggle');
        this.form = document.getElementById('feedback-form');
        this.init();
    }

    init() {
        this.toggleBtn.addEventListener('click', () => this.toggleForm());
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Handle Escape key to close form
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.form.hidden) {
                this.closeForm();
            }
        });
    }

    toggleForm() {
        const isHidden = this.form.hidden;
        this.form.hidden = !isHidden;
        this.toggleBtn.setAttribute('aria-expanded', !isHidden);
        
        if (!isHidden) {
            this.closeForm();
        } else {
            this.form.querySelector('select').focus();
        }
    }

    closeForm() {
        this.form.hidden = true;
        this.toggleBtn.setAttribute('aria-expanded', 'false');
        this.toggleBtn.focus();
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        const data = {
            type: formData.get('feedback-type'),
            message: formData.get('feedback-message'),
            rating: formData.get('rating')
        };

        try {
            // In a real application, you would send this data to a server
            console.log('Feedback submitted:', data);
            this.showSuccessMessage();
            this.form.reset();
            this.closeForm();
        } catch (error) {
            this.showErrorMessage('Failed to submit feedback. Please try again later.');
        }
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.setAttribute('role', 'alert');
        message.style.color = 'green';
        message.style.padding = '1rem';
        message.style.marginTop = '1rem';
        message.textContent = 'Thank you for your feedback!';
        
        this.form.parentElement.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }

    showErrorMessage(text) {
        const message = document.createElement('div');
        message.className = 'error-message';
        message.setAttribute('role', 'alert');
        message.style.color = 'red';
        message.style.padding = '1rem';
        message.style.marginTop = '1rem';
        message.textContent = text;
        
        this.form.parentElement.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }
}

// Initialize feedback widget
const feedbackWidget = new FeedbackWidget();
