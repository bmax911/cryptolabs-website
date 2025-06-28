document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        const emailInput = document.getElementById('email-input');
        const submitButton = signupForm.querySelector('button[type="submit"]');
        const errorMessage = document.getElementById('error-message');
        const successMessage = document.getElementById('success-message');

        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // 1. Give instant feedback: Disable the button and show a "working" state.
            submitButton.disabled = true;
            submitButton.textContent = 'Verifying...';
            errorMessage.classList.add('hidden');
            successMessage.classList.add('hidden');
            
            const email = emailInput.value.trim().toLowerCase();

            try {
                // 2. Call our own secure backend function.
                const response = await fetch('/.netlify/functions/verify-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email }),
                });

                const result = await response.json();

                if (!response.ok) {
                    // This handles server errors (500, 502, etc.) from our function.
                    throw new Error(result.error || 'A server error occurred.');
                }

                // 3. Handle the response from our function.
                if (result.is_safe) {
                    // SUCCESS: The email was good.
                    successMessage.textContent = result.message;
                    successMessage.classList.remove('hidden');
                    signupForm.reset();
                    // Keep the button disabled after success.
                    submitButton.textContent = 'Request Sent!';
                } else {
                    // FAIL: The email was risky, unsafe, or invalid.
                    errorMessage.textContent = result.message;
                    errorMessage.classList.remove('hidden');
                    // Re-enable the button so the user can try another email.
                    submitButton.disabled = false;
                    submitButton.textContent = 'Request Access';
                }

            } catch (error) {
                // This handles network errors (no internet) or other unexpected issues.
                console.error('Submission Error:', error);
                errorMessage.textContent = 'Could not connect to the service. Please check your connection and try again.';
                errorMessage.classList.remove('hidden');
                // Re-enable the button on error.
                submitButton.disabled = false; 
                submitButton.textContent = 'Request Access';
            }
        });
    }
});