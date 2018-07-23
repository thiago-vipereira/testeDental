const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/dentalQI_test', { useMongoClient: true });
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning!', error);
    });
});

beforeEach(done => {
  const db = mongoose.connection.db;

  db.dropDatabase()
    .then(() => done())
    .catch(() => done());
});