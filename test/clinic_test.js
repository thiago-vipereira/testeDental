const mongoose = require('mongoose');
const assert = require('assert');
const request = require('supertest');
const app = require('../api/app');

const Clinic = mongoose.model('clinic');

describe('Clinic controller', () => {
	let testClinic;
	
	beforeEach(done => {
		testClinic = new Clinic({ name: 'Alpha' });

		testClinic.save().then(() => done());
	});

	it('POST to /api/clinic and creates a new clinic', done => {
		Clinic.count().then(count => {
			request(app)
				.post('/api/clinic')
				.send({ name: 'Beta' })
				.end(() => {
					Clinic.count().then(newCount => {
						assert(count + 1 === newCount);
						done();
					})
				});
		});
	});

	it('PUT to /api/clinic/:id and updates a clinic', done => {
		request(app)
			.put(`/api/clinic/${testClinic._id}`)
			.send({ name: 'Alpha Updated' })
			.end(() => {
				Clinic.findById({ _id: testClinic._id })
					.then(clinic => {
						assert(clinic.name === 'Alpha Updated');
						done();
					});
			});
	});

	it('DELETE to /api/clinic/:id and deletes the clinic', done => {
		request(app)
			.delete(`/api/clinic/${testClinic._id}`)
			.end(() => {
				Clinic.findById({ _id: testClinic._id })
					.then(clinic => {
						assert(clinic.active === false);
						done();
					});
			});
		
	});

});

