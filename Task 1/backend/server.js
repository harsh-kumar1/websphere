const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require('cors');
// At the top
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("353541647580-nfcsijq1voe1g5a41m5o72t9o8g4ca2h.apps.googleusercontent.com");

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
