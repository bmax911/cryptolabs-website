document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        const emailInput = document.getElementById('email-input');
        const submitButton = signupForm.querySelector('button[type="submit"]');
        const errorMessage = document.getElementById('error-message');
        const successMessage = document.getElementById('success-message');

        // The basic list of public email providers to block
        const personalEmailDomains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
            'aol.com', 'icloud.com', 'live.com', 'msn.com'
        ];

        signupForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop the form from reloading the page
            
            // Hide previous messages
            errorMessage.classList.add('hidden');
            successMessage.classList.add('hidden');

            const email = emailInput.value.trim().toLowerCase();
            
            if (!email || !email.includes('@')) {
                errorMessage.textContent = 'Please enter a valid email address.';
                errorMessage.classList.remove('hidden');
                return;
            }

            const domain = email.split('@')[1];

            if (personalEmailDomains.includes(domain)) {
                errorMessage.textContent = 'Please use a work email. Personal domains are not accepted.';
                errorMessage.classList.remove('hidden');
            } else {
                // This is where the Reoon verification will happen.
                // For now, we'll just show a success message.
                successMessage.textContent = 'Thank you! Your request has been received.';
                successMessage.classList.remove('hidden');
                signupForm.reset();
                submitButton.disabled = true;
                submitButton.textContent = 'Request Sent!';
            }
        });
    }
});