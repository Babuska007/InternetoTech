const dotenv = require('dotenv');
const express = require("express");
const cors = require("cors");
const gameRoutes = require("./routes/gameRoutes");
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(gameRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
