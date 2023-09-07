document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('journal-form');
    const message = document.getElementById('message');

    fetchEntry();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const entry = document.getElementById('entry').value;

        // Send data to the server
        fetch('/add-journal-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, date, entry })
        })
        .then((response) => response.json())
        .then((data) => {
            showMessage(data.message);
            form.reset();
        })
        .catch((error) => {
            showMessage('An error occurred. Please try again later.');
            console.error(error);
        });
    });

    function showMessage(msg) {
        message.textContent = msg;
        setTimeout(() => {
            message.textContent = '';
        }, 3000);
    }
});

function fetchEntry() {
    fetch('/get-journal-entries')
        .then((response) => response.json())
        .then((data) => {
            const reviewsContainer = document.getElementById('entry-container');
            reviewsContainer.innerHTML = ''; // Clear previous reviews
            
            if (data && data.reviews && data.reviews.length > 0) {
                data.reviews.forEach((review) => {
                    const reviewElement = document.createElement('div');
                    reviewElement.className = 'review';
                    reviewElement.innerHTML = `
                        <h3>${review.title}</h3>
                        <p><strong>Date:</strong> ${review.date}</p>
                        <p><strong>Description:</strong> ${review.entry}</p>
                        <hr>
                    `;
                    reviewsContainer.appendChild(reviewElement);
                });
            } else {
                reviewsContainer.innerHTML = '<p>No reviews available.</p>';
            }
        })
        .catch((error) => {
            console.error(error);
        });
}