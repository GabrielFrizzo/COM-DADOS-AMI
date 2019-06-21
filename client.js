const net = require('net')
let ipDestino = require('./renderer.js')

const client = new net.Socket()

$('#connection_button').mouseup(() => {
    client.connect(1337, ipDestino["ipDestino"], () => {
        console.log('Connected to: ' + ipDestino["ipDestino"])
        $('#ipText').css('color', 'green')
    })
})


client.on('data', (data) => {
	console.log('Received from server: ' + data)
})

$('#send_button').mouseup(() => {
    client.write($('#crypto_message').val())
})

client.on('close', () => {
    console.log('Connection closed!')
    $('#ipText').css('color', 'red');
})	