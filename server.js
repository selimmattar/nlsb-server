/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/levels', require('./levels/levels.controller'));

// global error handler
app.use(errorHandler);

// start server
// eslint-disable-next-line no-undef
const port =
  process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 4000;
const server = app.listen(port, function() {
    // eslint-disable-next-line no-console
    console.log('Server listening on port ' + port);
});
