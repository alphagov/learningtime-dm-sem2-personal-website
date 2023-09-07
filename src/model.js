const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('main.db');


db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS random_thoughts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        date DATE,
        entry TEXT
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        date DATE,
        rating INT,
        entry TEXT
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        date DATE,
        rating INT,
        entry TEXT
      )
    `);
  });

module.exports = db;