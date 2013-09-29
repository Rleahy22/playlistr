$(document).ready(function() {
	$('#sign-in-btn').click(function() {
		R.authenticate()
	})
	$('#create-playlist-btn').on('click', function() {
		R.ready(function() {
			R.request({
				method: "createPlaylist",
				content: {
					name: "Practice SMSPlaylist",
					description: "A test version of our app",
					tracks: "t32961632, t32961633"
				},
				success: function(response) {
					console.log(response.result['embedUrl'])
					var playerUrl = response.result['embedUrl']
					$('.container').append('<embed src="' + playerUrl + '">')
				},
				error: function(response) {
					console.log("error " + response.message)
				}
			})
		});
	})
})
