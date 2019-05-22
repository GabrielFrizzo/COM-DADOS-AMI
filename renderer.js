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

$('#message').bind('input propertychange', function() {
	const text = this.value

	const binary = text.split('').map(function (char) { return char.charCodeAt(0).toString(2); }).join('');
	
	$('#binary_message').val(binary)

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
	Plotly.newPlot( 'graph', XYdata(binary), layout )
})

$('#message').focus()