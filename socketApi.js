var socket_io = require('socket.io');
var io = socket_io();


let users = {};

io.on('connection', (socket) => {
	if (!socket.request.session.username) {
		return;
	}
	
	if (!users[socket.request.session.userid])
		users[socket.request.session.userid] = {};


	users[socket.request.session.userid][socket.id] = socket;

	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});

	socket.on('disconnect', () => {
		delete users[socket.request.session.userid][socket.id];
	});
});

function getUserSockets(userId) {
	return users[userId];
}

module.exports = {
	io,
	getUserSockets,
};
