// Dashboard Logic
if (window.location.pathname.endsWith('dashboard.html')) {
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackName = new URLSearchParams(window.location.search).get('name');

    // Retrieve feedbacks from localStorage
    const feedbacks = JSON.parse(localStorage.getItem('submittedFeedbacks')) || [];

    if (feedbacks.length === 0) {
        feedbackContainer.innerHTML = '<p>No feedback submissions found.</p>';
    } else {
        feedbacks.forEach((feedback, index) => {
            if (feedback.submittedFor === feedbackName) {
                // Create feedback card
                const feedbackCard = document.createElement('div');
                feedbackCard.className = 'feedback-card';

                // Feedback header
                feedbackCard.innerHTML = `
          <h3>Anonymous ${index + 1}</h3>
          <div class="feedback-section">
            <h4>Positive Emotions</h4>
            <div class="feedback-options">
              ${feedback.positiveOptions.map(option => `<span>${option}</span>`).join('')}
            </div>
          </div>
          <div class="feedback-section">
            <h4>Improvements</h4>
            <div class="feedback-options">
              ${feedback.improvementOptions.map(option => `<span>${option}</span>`).join('')}
            </div>
          </div>
          <div class="feedback-section">
            <h4>Positive Comments</h4>
            <textarea readonly rows="2">${feedback.positiveFeedback}</textarea>
          </div>
          <div class="feedback-section">
            <h4>Improvement Area</h4>
            <textarea readonly rows="2">${feedback.improvementFeedback}</textarea>
          </div>
        `;

                feedbackContainer.appendChild(feedbackCard);
            }
        });
    }
}

