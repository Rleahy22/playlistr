$(document).ready(function() {
	$('#create-playlist-btn').hide()
	$('#playlist-form').hide()
	$('.container').on('click', '#sign-in-btn', function() {
		R.authenticate()
		$('#sign-in-btn').hide()
		$('#create-playlist-btn').show()
	})
	$('.container').on('click', '#create-playlist-btn', function() {
		$('#create-playlist-btn').hide()
		$('#playlist-form').show()
	})
	$('.container').on('submit', '#playlist-form', function(e) {
		e.preventDefault()
		e.stopPropagation()
		var name = $('#playlist-form input').val()
		R.ready(createPlaylist(name))
		$('#playlist-form').hide()
	})
})

function createPlaylist(name) {
	R.request({
		method: "createPlaylist",
		content: {
			name: name,
			description: "A test version of our app",
			tracks: "t32961632, t32961633"
		},
		success: function(response) {
			console.log(response.result['embedUrl'])
			var playerUrl = response.result['embedUrl']
			$('.container').after('<embed src="' + playerUrl + '" id="rdio-player">')
		},
		error: function(response) {
			console.log("error " + response.message)
		}
	})
}
