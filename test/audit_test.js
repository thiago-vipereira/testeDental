const mongoose = require('mongoose');
const assert = require('assert');
const request = require('supertest');
const app = require('../api/app');

const Clinic = mongoose.model('clinic');
const User = mongoose.model('user');
const Audit = mongoose.model('audit');

describe('Audit Controller', () => {
	let testClinic;
	let testUser;
	
	beforeEach(done => {
		testClinic = new Clinic({ name: 'Audit' });
		testUser = new User({ name: 'João Silva', email: 't@t.com', password: '123' });

		testClinic.save().then(() => {
			testUser.save().then(() => done());
		});
		
	});

	it('records CREATING a clinic', done => {
		const newClinic = { name: 'Audit Created' };

		request(app)
			.post(`/api/clinic`)
			.send({ name: 'Audit Created'})
			.end(() => {
				Clinic.findOne({ name: 'Audit Created'})
					.then(clinic => {
						Audit.findOne({ document: clinic._id })
							.then(doc => {
								assert(doc.action === 'created' && doc.diff.name === 'Audit Created');
								done();
							});
					});
			});
	});

	it('records UPDATING a clinic', done => {
		request(app)
			.put(`/api/clinic/${testClinic._id}`)
			.send({ name: 'Audited', address: 'R. Fernando Simas, 208' })
			.end(() => {
				testClinic.save().then(() => {
					Audit.findOne({ document: testClinic._id })
						.then(doc => {
							assert(doc.diff.name.length > 0);
							done();
						});
				});
			});
	});

	it('records DELETING a clinic', done => {
		request(app)
			.delete(`/api/clinic/${testClinic._id}`)
			.end(() => {
				testClinic.save().then(() => {
					Audit.findOne({ document: testClinic._id })
						.then(doc => {
							assert(doc.action === 'deleted');
							done();
						});
				});
			});
	});

});

