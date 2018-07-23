const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const keys = require('../../config/keys');
const cors = require('cors');
const path = require('path');

module.exports = app => {

	// SPA config: the server always sends the index.html
	/*app.use(express.static(path.join(__dirname, '../../client/public')));

	app.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname, '../../client/public', 'index.html'));
	});*/

	app.use(cors());

	app.use(bodyParser.json());

	app.use(
		cookieSession({
			name: 'dentalqi',
			maxAge: 24 * 60 * 60 * 1000,
			keys: [keys.cookieKey],
			overwrite: true
		})
	);

	// required for passport
	app.use(passport.initialize());
	app.use(passport.session());
};