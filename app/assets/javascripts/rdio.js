$(document).ready(function() {
	$('.sign-in-btn').click(function() {
		R.authenticate()
	})
	$('.create-playlist-btn').click(function() {
		R.request({
			method: "createPlaylist",
			content: {
				name: "Practice SMSPlaylist",
				description: "A test version of our app",
				tracks: "a997982"
			},
			success: function(response) {
				var top = response.result[0]
				console.log(top.name + " by " + top.artist)
			}
			// error: function(response) {
			// 	console.log("error " + response.message)
			// }
		})
	})
})
