// Step 1: Initialize a new Node.js project
// This is usually done through the terminal using the command `npm init -y`

// Step 2: Install Express.js
// This is usually done through the terminal using the command `npm install express`

// Step 3: Create a new Express.js application
const express = require('express');
const app = express();

// Step 4: Define a simple GET route
app.get('/', (req, res) => {
  res.send('Hello from the express API demo!');
});

// Define a POST route
app.post('/alter', (req, res) => {
    // Access the variable from the request body
    const { variable } = req.body;
  
    // Alter the variable (for example, append " altered" to it)
    const alteredVariable = variable + ' altered';
  
    // Send the altered variable in the response
    res.send({ alteredVariable: alteredVariable });
  });

// Step 5: Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});