const passport = require('passport');
const mongoose = require('mongoose');
const AuthUser = require('../models/authUser');

module.exports = app => {

	app.post('/api/login',
		passport.authenticate('local'),
		(req, res) => {
			res.send(req.user);
		}
	);

	app.get('/api/logout', (req, res) => {
		req.session = {};
		req.logout();
    	res.send('logout');
	});

	app.get('/api/session', (req, res) => {
		res.send(req.session);
	});

	app.get('/api/in_use', (req, res) => {
		var token = req.session.token ? req.session.token+'' : false;
		if(token){
			AuthUser.findOne({ id_user: req.session.user._id, token: req.session.token })
				.then(user => {
					if(user){
						res.send(true);
					} else {
						res.send(false);
					}
				})
				.catch();
		}else{
			res.send('out');
		}
	});
};
