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
	return '0'.repeat(9-unfilled.length) + unfilled
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

    var listKey = [];
    var listMessage = [];
    var listResult = [];

    listKey = key.split('').map(function (char) { return char.charCodeAt(0) });  // codifica o char de acordo com a tabela ascii
	listMessage = message.match(/.{1,9}/g)       // codifica o char de acordo com a tabela ascii

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

	var descriptoMessage = listResult.map(function (char) { return fill_char(char) }).join('')
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
setTimeout(function () { $("#logo").hide() }, 2000)
setTimeout(function () {
	$("#app").show() 
	$('#clientDiv').hide()
	$('#serverDiv').show()
	}, 2000)

$('#message').css('border-radius', '15px')
$('#binary_message').css('border-radius', '15px')
$('#crypto_message').css('border-radius', '15px')
$('#crypto_message_server').css('border-radius', '15px')
$('#descrypto_message_server').css('border-radius', '15px')
$('#message_server').css('border-radius', '15px')
$('#ipText').css('border-radius', '15px')
$('#ipDiv').hide();

$('.togg_checkbox').bind('change', (event) => {
	if(event.target.checked){ 						//Client
		$('.togg_label').text('Client')
		$('.togg_label').css('color', 'blue')
		
		$('#ipDiv').show();
		$('#clientDiv').show()
		$('#serverDiv').hide()
        $('#message').attr('disabled', false)

	} else { 										//Server
		$('.togg_label').text('Server')
		$('.togg_label').css('color', 'red')

		$('#clientDiv').hide()
		$('#serverDiv').show()
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
	$('#crypto_message').val(crypto_val)            // muda o campo
   

    Plotly.newPlot('graph', XYdata(ami(crypto_val)), layout)
})

Plotly.newPlot('graph', (0, 0), layout)

$('#ipText').bind('input propertychange', function () {
    module.exports.ipDestino = this.value
})

$('#message').focus()

function showMessage(dataReceived) {
    console.log("info recebida: " + dataReceived)
    console.log("ok: " + dataReceived)
    $('#crypto_message_server').val(dataReceived.toString())
    $('#descrypto_message_server').val(descripto(dataReceived.toString(), 'aaa'))

    var palavra = descripto(dataReceived.toString(), 'aaa').match(/([10]{9}|\s+)/g).map(function (fromBinary) {
        return String.fromCharCode(parseInt(fromBinary, 2));
    }).join('');
    $('#message_server').val(palavra)
    console.log(palavra)

    Plotly.newPlot('graph', XYdata(ami(dataReceived.toString())), layout)
}

module.exports.showMessage = showMessage
