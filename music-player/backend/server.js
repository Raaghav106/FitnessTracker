// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000; // Port for the Express server

// Middleware
app.use(cors()); // Allows all origins to access the API
app.use(express.json());

// Route to proxy API requests
app.get('/api/songs', async (req, res) => {
  const { type, value } = req.query;
  let apiUrl = '';

  if (type === 'artist') {
    apiUrl = `https://api.deezer.com/search/artist?q=${value}`;
  } else if (type === 'genre') {
    apiUrl = `https://api.deezer.com/genre/${value}/artists`;
  } else if (type === 'mood') {
    apiUrl = `https://api.deezer.com/search?q=mood:"${value}"`;
  }

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching songs:', error.message);
    res.status(500).send('Error fetching songs');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
