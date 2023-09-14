const express = require('express');
const router = express.Router();
const GamesController = require('../controllers/gamesController');

router.post('/add-review', (req, res) => {
    const { title, date, rating, entry } = req.body;
    GamesController.addReview(title, date, rating, entry, (err) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred while adding the review.' });
        }
        res.json({ message: 'Review added successfully.' });
    });
});

router.get('/get-reviews', (req, res) => {
    GamesController.getAllReviews((err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred while fetching reviews.' });
        }
        res.json({ reviews: rows });
    });
});

module.exports = router;
