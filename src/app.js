const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes')
const app = express();

app.use(cors());
app.use(express.json());
 
 
app.use('/auth', authRoutes);
app.use('/users', userRoutes); 
app.use('/teams', teamRoutes);

module.exports = app;