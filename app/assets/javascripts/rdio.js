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
					tracks: "t32961632"
				},
				success: function(response) {
					var top = response.result[0]
				},
				error: function(response) {
					console.log("error " + response.message)
				}
			})
		});
	})
})
