const net = require('net')

const server = net.createServer()

server.on('connection', (socket) => {
	socket.write('Echo server\r\n')
	
	socket.on('data', (data) => {
		console.log('Received from client: ' + data)
		$()
	})
})

server.listen(1337)
