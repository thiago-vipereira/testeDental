const mongoose = require('mongoose');
const assert = require('assert');
const request = require('supertest');
const app = require('../api/app');

const Clinic = mongoose.model('clinic');
const User = mongoose.model('user');
const Audit = mongoose.model('audit');

describe('User controller', () => {
	let testClinic;
	let testClinicId;
	let testUser;
	let testUserId;
	
	beforeEach(done => {
		testClinic = new Clinic({ name: 'Alpha' });
		

		testClinic.save().then(clinic => {
			testClinicId = clinic._id;

			testUser = new User({
				name: 'José Silva',
				email: 'jose@email.com',
				password: '123',
				clinics: [
					{ clinic_id: clinic._id, name: clinic.name }
				]
			});

			testUser.save().then(user => {
				testUserId = user._id;
				done();
			});
		});
	});

	it('POST to /api/user and creates a new user', done => {
		User.count()
			.then(count => {
				request(app)
					.post('/api/user')
					.send({
						name: 'Maria Souza',
						email: 'maria@email.com',
						password: '123',
						clinics: [
							{ clinic_id: testClinicId, name: testClinic.name }
						]
					})
					.end(() => {
						User.findOne({ name: 'Maria Souza' })
							.then(user => {
								Audit.findOne({ document: user._id })
									.then(doc => {
										assert(user && doc.action === 'created');
										done();
									});
							});
					});
			});
	});

	it('PUT to /api/user/:id and updates a user', done => {
		request(app)
			.put(`/api/user/${testUserId}`)
			.send({ name: 'Ana Maria' })
			.end(() => {
				User.findById({ _id: testUserId })
					.then(user => {
						Audit.findOne({ document: user._id })
							.then(doc => {
								assert(user.name === 'Ana Maria' && doc.diff.name.length > 1);
								done();
							});
					});
			});
	});

	it('DELETE to /api/user/:id and deletes the user', done => {
		request(app)
			.delete(`/api/user/${testUserId}`)
			.end(() => {
				User.findById({ _id: testUserId })
					.then(user => {
						Audit.findOne({ document: user._id })
							.then(doc => {
								assert(doc.action === 'deleted' && user.active === false);
								done();
							});
					});
			});
		
	});

});

