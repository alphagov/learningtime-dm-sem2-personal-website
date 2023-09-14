document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('journal-form');
    const message = document.getElementById('message');
    const reviewsContainer = document.getElementById('entry-container');

    fetchEntries();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const entry = document.getElementById('entry').value;

        fetch('/random-thoughts/add-entry', {
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
            fetchEntries();
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
    function fetchEntries() {
        fetch('/random-thoughts/get-entries')
            .then((response) => response.json())
            .then((data) => {
                if (data && data.entries && data.entries.length > 0) {
                    reviewsContainer.innerHTML = ''; // Clear previous reviews
                    
                    data.entries.forEach((entry) => {
                        const entryElement = document.createElement('div');
                        entryElement.className = 'entry';
                        entryElement.innerHTML = `
                            <h3>${entry.title}</h3>
                            <p><strong>Date:</strong> ${entry.date}</p>
                            <p><strong>Description:</strong> ${entry.entry}</p>
                            <hr>
                        `;
                        reviewsContainer.appendChild(entryElement);
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

