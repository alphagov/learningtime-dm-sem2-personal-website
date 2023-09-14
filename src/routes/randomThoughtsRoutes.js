const express = require('express');
const router = express.Router();
const RandomThoughtsController = require('../controllers/randomThoughtsController');

router.post('/add-entry', (req, res) => {
    const { title, date, entry } = req.body;
    RandomThoughtsController.addEntry(title, date, entry, (err) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred while adding the entry.' });
        }
        res.json({ message: 'Entry added successfully.' });
    });
});

router.get('/get-entries', (req, res) => {
    RandomThoughtsController.getAllEntries((err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred while fetching entries.' });
        }
        res.json({ entries: rows });
    });
});

module.exports = router;
