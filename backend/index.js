const express = require('express');
const imageRoutes = require('./routes/images');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Routes
app.use('/api/images', imageRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});