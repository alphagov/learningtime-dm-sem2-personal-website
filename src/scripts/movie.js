document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('movie-review-form');
    const message = document.getElementById('message');
    const reviewsContainer = document.getElementById('reviews-container');

    fetchReviews();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const rating = parseInt(document.getElementById('rating').value);
        const entry = document.getElementById('entry').value;

        if (isNaN(rating) || rating < 1 || rating > 5) {
            showMessage('Please enter a valid rating between 1 and 5.');
            return;
        }

        fetch('/movies/add-review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, date, rating, entry })
        })
        .then((response) => response.json())
        .then((data) => {
            showMessage(data.message);
            form.reset();
            fetchReviews();
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
    function fetchReviews() {
        fetch('/movies/get-reviews')
            .then((response) => response.json())
            .then((data) => {
                if (data && data.reviews && data.reviews.length > 0) {
                    reviewsContainer.innerHTML = ''; // Clear previous reviews
                    
                    data.reviews.forEach((review) => {
                        const reviewElement = document.createElement('div');
                        reviewElement.className = 'review';
                        reviewElement.innerHTML = `
                            <h3>${review.title}</h3>
                            <p><strong>Date:</strong> ${review.date}</p>
                            <p><strong>Rating:</strong> ${review.rating}/5</p>
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
});
