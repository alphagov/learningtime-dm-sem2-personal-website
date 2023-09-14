const randomThoughtsModel = require('../models/randomThoughtsModel');

const RandomThoughtsController = {
    addEntry: (title, date, entry, callback) => {
        randomThoughtsModel.run(
            'INSERT INTO random_thoughts (title, date, entry) VALUES (?, ?, ?)',
            [title, date, entry],
            callback
        );
    },

    getAllEntries: (callback) => {
        randomThoughtsModel.all('SELECT * FROM random_thoughts', callback);
    },
};

module.exports = RandomThoughtsController;
