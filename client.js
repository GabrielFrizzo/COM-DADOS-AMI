const net = require('net')

const client = new net.Socket()
client.connect(1337, '10.181.3.245', () => {
	console.log('Connected!')
	client.write('Hello, server! Love, Client.')
})

client.on('data', (data) => {
	console.log('Received from server: ' + data)
})

$('#send_button').mouseup(() => {
	client.write($('#binary_message').val())
})

client.on('close', () => {
	console.log('Connection closed!')
})	