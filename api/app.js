const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const keys = require('../config/keys');
const routes = require('./routes/routes');
const authRoutes = require('./routes/authRoutes');
const utils = require('./services/utils');
const socket = require('./services/socket');

const app = express();


// Connecting to database
// and making sure it is not the test database used by mocha
mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(keys.mongoURI, { useMongoClient: true });
}
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser.json());

utils(app);
require('./services/passport');//config passport
authRoutes(app);
routes(app);
socket(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;