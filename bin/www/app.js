const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const AWS = require('aws-sdk');
const ProfileRouter = require('../../Routers/ProfileRouter');
require('dotenv').config();

const app = express();

app.use(cors());      
app.use(helmet());      
app.use(morgan('common')); 
app.use(express.json()); 

app.use('/api/v1/profile/', ProfileRouter);
app.get('/', (req, res) => {
  res.send('API is up and running!');
});

module.exports = app;