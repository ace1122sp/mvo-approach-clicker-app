const express = require('express');
const path = require('path');

const PUBLIC = path.resolve(__dirname, './public');
const PORT = process.env.PORT || 4000;

const app = express();

// add middlewares
app.use(express.static(PUBLIC));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));  
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));