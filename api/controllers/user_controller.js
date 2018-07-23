const _ = require('lodash'); 
const mongoose = require('mongoose');

const Clinic = require('../models/clinic');
const User = require('../models/user');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	getSchema(req, res, next) {
		res.send(Object.keys(User.schema.tree).filter((item) => !["id", "_id", "__v", "clinic_id", "created_at", "updated_at", "updated_by"].includes(item)));
	},
	create(req, res, next){
		let props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		if (props.clinics) {

			props.password = User().generateHash(props.password);
			
			User.create(props)
				.then(user => {
					AuditController.create(user, props, props.clinics[0].clinic_id, updatedBy);
					res.send(user)
				})
				.catch(next);

		} else {
			res.send("has no clinic")
		}
	},
	edit(req, res, next){
		const userId = req.params.id;
		const props = req.body;

		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevUser;

		User.findById({ _id: userId })
			.then(user => {
				// stores previous document
				prevUser = user;

				user.update(props)
					.then(() => User.findById({ _id: userId }))
					.then(user => {
						user.save();
						res.send(user);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const userId = req.params.id;
		let updatedBy;
		let prevUser;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		User.findById({ _id: userId })
			.then(user => {
				prevUser = user;

				user.update({ active: false })
					.then(() => User.findById({ _id: userId }))
					.then(user => {
						user.save();

						// compares previous document with new props
						AuditController.compare(prevUser, { active: false }, user.clinics, updatedBy);

						res.send(user);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const userId = req.params.id;

		User.findById({_id: userId})
			.then(user => res.send(user))
			.catch(next);
	},
	emailValidate(req, res, next){
		const userEmail = req.body.email;

		User.emailValidate(userEmail).then(email => {
			if(email){
				res.send(email)
			}else{
				res.send(userEmail)
			}
		});
	},
	changePassword(req, res, next){
		const userReq = req.body;
		let oldPass = userReq.password;
		let updatedBy;
		let prevUser;
console.log(userReq);
		User.findById({ _id: userReq.userId })
			.then(user => {
				
			if (!user.validPassword(oldPass)){
				res.send("Oops! Wrong password");
			} else {

				if (req.body.updated_by) {
					updatedBy = req.body.updated_by;
				}
				prevUser = user;

				let newPass = User().generateHash(userReq.newPassword);
				console.log(user);
				user.update({ password: newPass })
					.then(() => User.findById({ _id: userReq.userId }))
						.then(user => {
							user.save();
							AuditController.compare(prevUser, { password: newPass }, user._id, updatedBy);
							res.send(user);
						});
			}
		})
		.catch(next);
	},
	sendForgotPass(req, res, next){
		const userReq = req.body;
		let token =  User().generateHash(userReq.email);
		let tokenExp = new Date(Date.now() + 6*60*60*1000);

		User.findOneAndUpdate({ email: userReq.email }, { token: token, token_exp: tokenExp })
			.then(() => res.send(token))
			.catch(next);
	},
	receiveForgotPass(req, res, next){
		const userReq = req.body;  //waiting for token, newPassword
		let updatedBy;
		let prevUser;

		User.findOne({ token: userReq.token }, user => {
			let userId = user.id;
			prevUser = user;
			if(user.tokenExp > Date.now()) {

				if (req.body.updated_by) {
					updatedBy = req.body.updated_by;
				}
				let newPass = User().generateHash(userReq.newPassword);

				user.update([{ password: newPass }, { token: null }, { tokenExp: null }])
					.then(() => User.findById({ _id: userId }))
						.then(user => {
							user.save();
							AuditController.compare(prevUser, [{ password: newPass }, { token: null }, { tokenExp: null }], userId, updatedBy);
							res.send(user);
						});
			}
		})
		.catch(next);
	},
	getUsers(req, res, next) { 
		const userIds = req.body.users; 
		let arrayIds = []; 

		_.map(userIds, clinicId => { 
			arrayIds.push(mongoose.Types.ObjectId(clinicId)); 
		});

		User.find({ _id: { $in: arrayIds } }) 
			.select({ _id: true, name: true, active: true }) 
			.then(users => res.send(users)) 
			.catch(next); 
	},
	updateDashboard(req, res, next) {
		User.findByIdAndUpdate(req.session.user._id, {$set: {'dashboard.card': req.body}})
			.then(() => res.send(true))
			.catch(res.send(false));
	},
	deleteCard(req, res, next) {
		User.findOneAndUpdate({_id: req.session.user._id, 'dashboard.saved.kind': req.params.type}, {$pull: { 'dashboard.saved.$.card': {_id: req.body.id} }})
			.then(() => res.send(true))
			.catch(res.send(false));
	},
	saveCard(req, res, next) {
		User.findOneAndUpdate({_id: req.session.user._id, 'dashboard.saved.kind': req.params.type}, { $push: { 'dashboard.saved.$.card': req.body} })
			.then(() => res.send(true))
			.catch(res.send(false));
	},
};