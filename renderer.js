$(() => {
	$('#message').bind('input propertychange', function() {
		const text = this.value

		const binary = text.split('').map(function (char) { return char.charCodeAt(0).toString(2); }).join(' ');
		
		console.log(binary)
		$('#binary_message').val(binary)
	})

	$('#message').focus()
})