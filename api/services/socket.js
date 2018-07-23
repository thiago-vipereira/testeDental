const AgendaController = require('../controllers/agenda_controller');

module.exports = app => {

	var server = require('http').Server(app);
	var io = require('socket.io')(server);
	
	server.listen(80);
		
	io.on('connection', function (socket) {
		
		socket.on('fetch', function (data) {
			AgendaController.fetch(data, socket);
		});

		socket.on('create', function (data) {
			AgendaController.create(data, socket);
		});

		socket.on('update', function (data) {
			AgendaController.update(data, socket);
		});
	});
};