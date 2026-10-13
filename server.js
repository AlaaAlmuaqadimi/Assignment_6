const express = require('express');
const connectDB = require('./config/db');
const collectionRoutes = require('./routes/collectionRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());

app.use(collectionRoutes);
app.use(bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
