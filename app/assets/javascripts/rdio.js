$(document).ready(function() {
	var songsToAdd = []
	var currentPlaylist = ["I knew you were trouble", "mercy", "Party Up"]

	var addSong = function(key) {
		R.ready(function() {
			R.request({
				method: "addToPlaylist",
				content: {
					playlist: "p6500654",
					tracks: key
				},
			})
		})
	}

	function updatePlaylist() {
		test = ["I knew you were trouble", "mercy", "Party Up",
									"Country Grammar", "Homecoming", "Roar"]
		songsToAdd = test.filter(function(i) {
										return !(currentPlaylist.indexOf(i) > -1)
									})
		console.log(songsToAdd)
		for (var i = 0; i < songsToAdd.length; i++) {
			console.log(i + " " + songsToAdd[i])
			var songQuery = JSON.stringify(songsToAdd[i])
			R.ready(function(){
				R.request({
					method: "search",
					content: {
						query: songQuery,
						types: "track"
					},
					success: function(response) {
						var trackKey = response.result.results[0]["key"]
						addSong(trackKey)
					},
					error: function(response) {
						console.log("error " + response.message)
					}
				})
			})
		}
		// songsToAdd = []
	}

	var i = setInterval(function() { updatePlaylist() }, 500)

	$('#sign-in-btn').click(function() {
	$('#create-playlist-btn').hide()
	$('#playlist-form').hide()
	$('.container').on('click', '#sign-in-btn', function() {
		R.authenticate()
		$('#sign-in-btn').hide()
		$('#create-playlist-btn').show()
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
					console.log(response.result)
					console.log(response.result['embedUrl'])
					var playerUrl = response.result['embedUrl']
					$('.container').append('<embed src="' + playerUrl + '">')
				},
				error: function(response) {
					console.log("error " + response.message)
				}
			})
		});
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
