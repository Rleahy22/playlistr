$(document).ready(function() {
	$('#sign-in-btn').click(function() {
		R.authenticate()
	})
	$('#create-playlist-btn').on('click', function() {
		R.ready(function() {
  		R.player.play({source: "a3032151"}); // Alice In Chains - The Devil Put Dinosaurs Here
		});
		// console.log('here')
		// R.request({
		// 	method: "createPlaylist",
		// 	content: {
		// 		name: "Practice SMSPlaylist",
		// 		description: "A test version of our app",
		// 		tracks: "a3032151"
		// 	},
		// 	success: function(response) {
		// 		var top = response.result[0]
		// 		console.log(top.name + " by " + top.artist)
		// 	}
		// 	// error: function(response) {
		// 	// 	console.log("error " + response.message)
		// 	// }
		// })
	})
})
