const express = require('express');
const userRoutes = require ('./routes/user')
const connection = require('./config/config.js');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());



connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...');
  });

/*Permet l'accés à l'api depuis n'import quelle origine*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);

module.exports = app;