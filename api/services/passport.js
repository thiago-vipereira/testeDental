const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const User = mongoose.model('user');
const AuthUser = mongoose.model('authUser');

passport.serializeUser((user, done) => {
 	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(new LocalStrategy(
	{
		usernameField:"email",
	 	passwordField:"password",
	 	passReqToCallback: true
	},
	(req, username, password, done) => {
		if(!req.body.auxReq){
			User.findOne({ email: username }, (err, user) => {
				if (err){
					return done(err);
				}

				if (!user){
					return done(null, false, "No user found");
				}

				if (!user.validPassword(password)){
		    		return done(null, false, "Oops! Wrong password"); // create the loginMessage and save it to session as flashdata
				}
				
				return done(null, user);
			});
		} else {
			var newSession = req.body.auxReq;

			req.session.user = newSession.user;
			req.session.clinic = newSession.clinic;
			req.session.token = bcrypt.hashSync(new Date().toString, bcrypt.genSaltSync(8), null);

			// create authUser
		
			AuthUser.findOne({ id_user: req.session.user._id, clinic_data: req.session.clinic.clinic_data })
			.then(user => {
				if(user){
					user.update({ token: req.session.token })
					.then(() => AuthUser.findOne({ id_user: req.session.user._id, clinic_data: req.session.clinic.clinic_data }))
					.then(user => {
						user.save();
						return done(null, req.user);
					}).catch();
				} else {
					AuthUser.create({id_user: req.session.user._id, clinic_data: req.session.clinic.clinic_data, date: new Date, token: req.session.token})
					.then(user => {
						return done(null, req.user);
					}).catch();
				}
			})
		}
	}
));