const gamesModel = require('../models/gamesModel');

const GamesController = {
    addReview: (title, date, rating, entry, callback) => {
        gamesModel.run(
            'INSERT INTO games (title, date, rating, entry) VALUES (?, ?, ?, ?)',
            [title, date, rating, entry],
            callback
        );
    },

    getAllReviews: (callback) => {
        gamesModel.all('SELECT * FROM games', callback);
    },
};

module.exports = GamesController;
