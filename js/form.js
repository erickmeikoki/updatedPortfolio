class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
        });
    }

    validateField(field) {
        field.setCustomValidity('');
        field.checkValidity();

        if (field.validity.valueMissing) {
            field.setCustomValidity('This field is required');
        } else if (field.type === 'email' && field.validity.typeMismatch) {
            field.setCustomValidity('Please enter a valid email address');
        }

        this.showFieldError(field);
    }

    showFieldError(field) {
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }

        if (!field.validity.valid) {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.style.color = 'red';
            error.style.fontSize = '0.8rem';
            error.style.marginTop = '0.25rem';
            error.textContent = field.validationMessage;
            field.parentElement.appendChild(error);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (this.form.checkValidity()) {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);

            try {
                // In a real application, you would send this data to a server
                console.log('Form submitted:', data);
                this.showSuccessMessage();
                this.form.reset();
            } catch (error) {
                this.showErrorMessage('Failed to send message. Please try again later.');
            }
        } else {
            this.form.querySelectorAll('input, textarea').forEach(field => {
                this.validateField(field);
            });
        }
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.style.color = 'green';
        message.style.padding = '1rem';
        message.style.marginTop = '1rem';
        message.textContent = 'Message sent successfully!';
        
        this.form.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }

    showErrorMessage(text) {
        const message = document.createElement('div');
        message.className = 'error-message';
        message.style.color = 'red';
        message.style.padding = '1rem';
        message.style.marginTop = '1rem';
        message.textContent = text;
        
        this.form.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }
}

// Initialize form validator
const formValidator = new FormValidator('contact-form');
