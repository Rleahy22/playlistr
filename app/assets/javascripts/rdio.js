console.log(R.ready([callback(ready)]))
console.log(R.authenticated)
R.request({
	method: "createPlaylist",
	content: {
		name: "Practice SMSPlaylist",
		description: "A test version of our app",
		tracks: "a997982",
	},
	success: function(response) {
		var top = response.result[0]
		console.log(top.name + " by " + top.artist)
	}
	error: function(response) {
		console.log("error " + response.message)
	}
})