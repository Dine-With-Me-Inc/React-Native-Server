const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const AWS = require('aws-sdk');
require('dotenv').config();

const ProfileRouter = require('../../Routers/ProfileRouter');

const app = express();

app.use(cors());      
app.use(helmet());      
app.use(morgan('common')); 
app.use(express.json()); 

app.use('/api/v1/profiles/', ProfileRouter);

module.exports = app;