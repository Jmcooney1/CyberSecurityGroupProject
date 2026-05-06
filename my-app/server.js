const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  console.log("Received login:", req.body);

  const { username, password } = req.body;

  const data = fs.existsSync('users.json') 
    ? JSON.parse(fs.readFileSync('users.json')) 
    : [];

  data.push({ username, password });
  fs.writeFileSync('users.json', JSON.stringify(data, null, 2));

  res.json({ success: true });
});

app.listen(3000, () => console.log('Server running on port 3000'));