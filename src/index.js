const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('src'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Require and use the routes for each entity
const randomThoughtsRoutes = require('./routes/randomThoughtsRoutes');
app.use('/random-thoughts', randomThoughtsRoutes);

const gamesRoutes = require('./routes/gamesRoutes');
app.use('/games', gamesRoutes);

const moviesRoutes = require('./routes/moviesRoutes');
app.use('/movies', moviesRoutes);

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
