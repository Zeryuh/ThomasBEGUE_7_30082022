require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const path = require('path');
const helmet = require("helmet");

//création application Express
const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vmqrins.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

    app.use(express.json());

//Résolution erreur CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Middleware
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use(helmet());
app.use('/api/posts', postsRoutes);
app.use('/api/auth', userRoutes);
module.exports = app;