const express = require('express');
const bodyParser = require('body-parser');
const db = require('./model'); // Import the database configuration
const path = require('path');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("src"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"index.html"));
});

app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname,"index.html"));
  });

app.get("/randomthoughts", (req, res) => {
  res.sendFile(path.join(__dirname,"./views/randomthoughts.html"));
});

app.get("/games", (req, res) => {
  res.sendFile(path.join(__dirname,"./views/games.html"));
});

app.get("/movies", (req, res) => {
  res.sendFile(path.join(__dirname,"./views/movies.html"));
});

app.post('/rate-game', (req, res) => {
  const {title, date, rating, entry } = req.body;
  db.run(
      'INSERT INTO games (title, date, rating, entry) VALUES (?, ?, ?, ?)',
      [title, date, rating, entry],
  );
});

app.post('/rate-movie', (req, res) => {
  const {title, date, rating, entry } = req.body;
  db.run(
      'INSERT INTO movies (title, date, rating, entry) VALUES (?, ?, ?, ?)',
      [title, date, rating, entry],
  );
});

app.post('/add-journal-entry', (req, res) => {
  const {title, date, entry } = req.body;
  db.run(
      'INSERT INTO random_thoughts (title, date, entry) VALUES (?, ?, ?)',
      [title, date, entry],
  );
});

app.get('/get-game-reviews', (req, res) => {
  db.all('SELECT * FROM games', (err, rows) => {
      if (err) {
          return res.status(500).json({ message: 'An error occurred while fetching reviews.' });
      }
      res.json({ reviews: rows });
  });
});

app.get('/get-movie-reviews', (req, res) => {
  db.all('SELECT * FROM movies', (err, rows) => {
      if (err) {
          return res.status(500).json({ message: 'An error occurred while fetching reviews.' });
      }
      res.json({ reviews: rows });
  });
});

app.get('/get-journal-entries', (req, res) => {
  db.all('SELECT * FROM random_thoughts', (err, rows) => {
      if (err) {
          return res.status(500).json({ message: 'An error occurred while fetching reviews.' });
      }
      res.json({ reviews: rows });
  });
});

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});

