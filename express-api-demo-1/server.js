// Step 1: Initialize a new Node.js project
// This is usually done through the terminal using the command `npm init -y`

// Step 2: Install Express.js
// This is usually done through the terminal using the command `npm install express`

// Step 3: Create a new Express.js application
const express = require('express');
const app = express();

// Use express.json() middleware
app.use(express.json());

// Import the sqlite3 package
const sqlite3 = require('sqlite3').verbose();

// Open a connection to the SQLite database
// SQLite will automatically create a new database file if it doesn't exist
let db = new sqlite3.Database('./my_database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

// Create a table (if it doesn't exist)
db.run('CREATE TABLE IF NOT EXISTS greetings(name text)', (err) => {
  if (err) {
    return console.error(err.message);
  }
});

// Step 4: Define a simple GET route
app.get('/', (req, res) => {
  res.send('Hello from the express API demo!');
});

// Define a POST route
app.post('/sayhello', (req, res) => {
  // Access the variable from the request body
  const { name } = req.body;  // assuming the variable you want to pull out is "name"

  // Alter the variable (for example, append "Hello" to it)
  const greeting = 'Hello ' + name;

  // Insert the received data into the database
  db.run(`INSERT INTO greetings(name) VALUES(?)`, [greeting], function (err) {
    if (err) {
      return console.log(err.message);
    }
    res.send({ greeting: greeting });
  });
});

// Define a GET route
app.get('/greetings', (req, res) => {
  // Fetch all records from the database
  db.all('SELECT name FROM greetings', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
});

// Step 5: Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});