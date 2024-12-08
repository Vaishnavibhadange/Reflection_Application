// Feedback Form Logic
if (window.location.pathname.endsWith('feedback.html')) {
    const feedbackName = new URLSearchParams(window.location.search).get('name'); // Extract feedback name from URL
    document.getElementById('feedback-name').textContent = feedbackName || 'Unknown';

    const feedbackForm = document.getElementById('feedback-form');
    const errorMessage = document.getElementById('error-message');

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const positiveOptions = [...document.querySelectorAll('input[name="positive"]:checked')].map(option => option.value);
        const improvementOptions = [...document.querySelectorAll('input[name="improvement"]:checked')].map(option => option.value);
        const positiveFeedback = document.getElementById('positive-feedback').value.trim();
        const improvementFeedback = document.getElementById('improvement-feedback').value.trim();

        if (positiveOptions.length === 0 && improvementOptions.length === 0) {
            errorMessage.style.display = 'block';
            return;
        }

        errorMessage.style.display = 'none';

        const feedbackData = {
            positiveOptions,
            improvementOptions,
            positiveFeedback,
            improvementFeedback,
            submittedFor: feedbackName,
            submittedAt: new Date().toLocaleString()
        };

        // Save feedback data to localStorage
        const existingFeedbacks = JSON.parse(localStorage.getItem('submittedFeedbacks')) || [];
        existingFeedbacks.push(feedbackData);
        localStorage.setItem('submittedFeedbacks', JSON.stringify(existingFeedbacks));

        // Show a success message or redirect
        alert('Thank you for your feedback!');
        feedbackForm.reset();
    });
}
