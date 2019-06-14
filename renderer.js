function XYdata(binary) {
	var x = [0]
	var y = [binary[0]]
	var count = 0
	for (const bit of binary.substr(1)){
		if (bit != y.slice(-1)[0]) {
			x.push(count)
			y.push(bit)
		}
		count += 1
		x.push(count)
		y.push(bit)
	}

	return [{x: x, y: y}]
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

    var criptoMessage = listResult.map(function (char) { return char.toString(2); }).join('')
    console.log(criptoMessage)
    return criptoMessage;
}

$('.togg_checkbox').bind('change', (event) => {
	if(event.target.checked){
		$('.togg_label').text('Client')
		$('.togg_label').css('color', 'blue')
		$('#send_button').disabled = true
	} else {
		$('.togg_label').text('Server')
		$('.togg_label').css('color', 'red')
	}
})

$('#message').bind('input propertychange', function() {
	const text = this.value

	const binary = text.split('').map(function (char) { return char.charCodeAt(0).toString(2); }).join('');
	
	$('#binary_message').val(binary)

    const crypto_val = cripto(text, 'aaa')

    $('#binary_message').val(binary)
    $('#crypto_message').val(crypto_val)            // muda o campo

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

    Plotly.newPlot('graph', XYdata(crypto_val), layout)
})

$('#message').focus()