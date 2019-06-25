const net = require('net')
let mensagem
let renderer = require('./renderer.js')

const server = net.createServer()

server.on('connection', (socket) => {
	socket.write('Echo server\r\n')
	
	socket.on('data', (data) => {
		mensagem = data
		console.log('Received from client: ' + mensagem)
        //module.exports.mensagem = mensagem
        renderer.showMessage(mensagem)
	})
})

server.listen(1337)
