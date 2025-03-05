const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;
app.use(express.json());

const db = new sqlite3.Database("./dbproj.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

db.run(
  `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE ,
  password TEXT
  )`
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const encryptedPassword = await bcryptjs.hash(password, 8);
  console.log("POST: ", username, password);

  db.run(
    `INSERT INTO users (username,password) VALUES (?,?)`,
    [username, encryptedPassword],
    (err) => {
      if (err) return res.status(400).send({ message: "User already exists" });
      res.send({ message: "User registered" });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
