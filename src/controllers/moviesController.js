const moviesModel = require('../models/moviesModel');

const MoviesController = {
    addReview: (title, date, rating, entry, callback) => {
        moviesModel.run(
            'INSERT INTO movies (title, date, rating, entry) VALUES (?, ?, ?, ?)',
            [title, date, rating, entry],
            callback
        );
    },

    getAllReviews: (callback) => {
        moviesModel.all('SELECT * FROM movies', callback);
    },
};

module.exports = MoviesController;
