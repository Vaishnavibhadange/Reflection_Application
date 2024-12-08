// Registration Logic
if (document.getElementById('register-form')) {
    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (localStorage.getItem(email)) {
            alert('User already exists!');
        } else {
            localStorage.setItem(email, password);
            alert('Registration successful! Please login.');
            window.location.href = 'index.html';
        }
    });
}


// Login Logic
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const storedPassword = localStorage.getItem(email);

        if (storedPassword && storedPassword === password) {
            alert('Login successful!');
            window.location.href = 'survey.html'; // Redirect to Survey page
        } else {
            alert('Invalid email or password!');
        }
    });
}

// Survey Page Logic
if (window.location.pathname.endsWith('survey.html')) {

    const feedbackTable = document.getElementById('feedback-table').querySelector('tbody');
    const createFeedbackButton = document.getElementById('create-feedback');

    // Load existing feedbacks from localStorage
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    let feedbackCounter = feedbacks.length; // Start counter from existing feedback count

    // Function to render feedbacks in the table
    function renderFeedbacks() {
        feedbackTable.innerHTML = ''; // Clear table
        feedbacks.forEach((feedback) => {
            const newRow = document.createElement('tr');

            // Feedback Name Column
            const nameCell = document.createElement('td');
            nameCell.textContent = feedback.name;
            newRow.appendChild(nameCell);

            // Feedback Link Column
            const linkCell = document.createElement('td');
            const linkElement = document.createElement('a');
            linkElement.href = feedback.link;
            linkElement.textContent = feedback.link;
            linkElement.target = '_blank';
            linkCell.appendChild(linkElement);
            newRow.appendChild(linkCell);

            // Open Button Column
            const openCell = document.createElement('td');
            const openButton = document.createElement('button');
            openButton.textContent = 'Open';
            openButton.classList.add('open-dashboard');
            openButton.setAttribute('data-feedback-name', feedback.name);
            openButton.addEventListener('click', () => {
                window.location.href = `dashboard.html?name=${feedback.name}`;
            });
            openCell.appendChild(openButton);
            newRow.appendChild(openCell);

            feedbackTable.appendChild(newRow);
        });
    }

    // Function to create new feedback entry
    function createFeedbackEntry() {
        feedbackCounter++;
        const feedbackName = `Feedback-F${feedbackCounter}`;
        const feedbackLink = `feedback.html?name=${feedbackName}`;

        const newFeedback = {
            name: feedbackName,
            link: feedbackLink
        };

        feedbacks.push(newFeedback);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        renderFeedbacks();
    }

    // Attach event listener to the "Create New Feedback" button
    createFeedbackButton.addEventListener('click', createFeedbackEntry);

    // Render feedbacks on page load
    renderFeedbacks();
}

