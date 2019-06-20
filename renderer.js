const layout = {
	yaxis: {
		range: [-1, 1],
		autorange:false,
		showgrid: false,
		nticks: 3
	},
	xaxis: {
		showgrid: false,
		showline: false
	}
	// margin: { t: 0 }
}

function XYdata(binary) {
	var x = [0]
	var y = [binary[0]]
	var count = 0
	for (const bit of binary.slice(1)){
		if (bit != y.slice(-1)) {
			x.push(count)
			y.push(bit)
		}
		count += 1
		x.push(count)
		y.push(bit)
	}

	return [{x: x, y: y}]
}

function fill_char(char) {
	unfilled = char.toString(2)
	return '0'.repeat(8-unfilled.length) + unfilled
}

function cripto(message, key) {

    var listKey = [];
    var listMessage = [];
    var listResult = [];

    listKey = key.split('').map(function (char) { return char.charCodeAt(0) });          // codifica o char de acordo com a tabela ascii
    listMessage = message.split('').map(function (char) { return char.charCodeAt(0) });       // codifica o char de acordo com a tabela ascii

    var mSize = listMessage.length;
    var kSize = listKey.length;
    var count = 0;
    var i = 0;
    var j = 0;

    while (count != mSize) {

        if (j === kSize - 1) { j = 0; }
        listResult.push(parseInt(listKey[j]) + parseInt(listMessage[i]));                 // soma o valor da mensagem com o valor da chave 
        j++;
        i++;
        count++;
    }

    var criptoMessage = listResult.map(function (char) { return fill_char(char) }).join('')

    return criptoMessage;
}

function descripto(message, key) {

	console.log('mensagem criptografada: ' + message)
    var listKey = [];
    var listMessage = [];
    var listResult = [];

    listKey = key.split('').map(function (char) { return char.charCodeAt(0) });          // codifica o char de acordo com a tabela ascii
    listMessage = message.match(/.{1,8}/g)       // codifica o char de acordo com a tabela ascii
	console.log('listMessage: ' + listMessage)

    var mSize = listMessage.length;
    var kSize = listKey.length;
    var count = 0;
    var i = 0;
    var j = 0;

    while (count != mSize) {

        if (j === kSize - 1) { j = 0; }
        listResult.push(parseInt(listMessage[i], 2) - parseInt(listKey[j]));                 // soma o valor da mensagem com o valor da chave 
        j++;
        i++;
        count++;
	}
	console.log('ListResult: ' + listResult)

	var descriptoMessage = listResult.map(function (char) { return fill_char(char) }).join('')
	console.log('Mesangem descriptografada: ' + descriptoMessage)
    return descriptoMessage;
}

function ami(binary) {
	var last = 1
	binaryVector = binary.split('')

	for (i=0; i < binaryVector.length; i++){
		if(binaryVector[i] == 1){
			binaryVector[i] = last
			last = -last
		}
	}
	return binaryVector
}

$("#logo").show()
console.log('aisudiasudhiashdiasu')
setTimeout(function () { $("#logo").hide() }, 2000)
setTimeout(function () { $("#app").show() }, 2000)

$('#message').css('border-radius', '15px')
$('#binary_message').css('border-radius', '15px')
$('#crypto_message').css('border-radius', '15px')
$('#ipText').css('border-radius', '15px')
$('#ipDiv').hide();

$('.togg_checkbox').bind('change', (event) => {
	if(event.target.checked){
		$('.togg_label').text('Client')
        $('.togg_label').css('color', 'blue')

        $('#ipDiv').show();

		$('#msg_lbl').text('Digite sua mensagem: ')
        $('#message').attr('disabled', false)
		$('#send_button').show()
	} else {
		$('.togg_label').text('Server')
		$('.togg_label').css('color', 'red')
		$('#msg_lbl').text('Mensagem recebida: ')
        $('#message').attr('disabled', true)
        $('#send_button').hide()
        $('#ipDiv').hide();
	}
	$(':text').val('')
	Plotly.newPlot('graph', (0,0), layout)
})

$('#message').bind('input propertychange', function() {
	const text = this.value

	const binary = text.split('').map(function (char) { return fill_char(char.charCodeAt(0)) }).join('');
	
	$('#binary_message').val(binary)

	const crypto_val = cripto(text, 'aaa')
	const descypto_val = descripto(crypto_val, 'aaa')

    $('#binary_message').val(binary)
    $('#crypto_message').val(crypto_val)            // muda o campo

    Plotly.newPlot('graph', XYdata(ami(crypto_val)), layout)
})

Plotly.newPlot('graph', (0, 0), layout)


$('#ipText').bind('input propertychange', function () {
    module.exports.ipDestino = this.value
})


$('#message').focus()