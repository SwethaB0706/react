const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/replicate', (req, res) => {
  const token = process.env.REPLICATE_API_TOKEN;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`,
  };

  fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers,
    body: JSON.stringify(req.body),
  })
  .then(response => response.json())
  .then(data => res.json(data))
  .catch(error => console.error(error));
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});