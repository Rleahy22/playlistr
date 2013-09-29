$(document).ready(function() {
	var currentPlaylist = {}
	response = $.get("/allsongs", function(data) {
		currentPlaylist = data
	})
	var addSong = function(key) {
		R.ready(function() {
			R.request({
				method: "addToPlaylist",
				content: {
					playlist: "p6505813",
					tracks: key
				},
			})
		})
	}

	function updatePlaylist() {
		var newPlaylist = []
		var songsToAdd = []
		$.get("/allsongs", function(data) {
			newPlaylist = data
			if (!(newPlaylist.length == currentPlaylist.length)) {
				songsToAdd << newPlaylist[newPlaylist.length - 1]
			}
			console.log(songsToAdd)
			if (!(songsToAdd.length == 0)) {
				var songQuery = JSON.stringify(songsToAdd[0])
				R.ready(function(){
					R.request({
						method: "search",
						content: {
							query: songQuery,
							types: "track"
						},
						success: function(response) {
							var song = response.result.results[0]
							addSong(song["key"])
							$.post("/newsong", {title: song["name"]})
						},
						error: function(response) {
							console.log("error " + response.message)
						}
					})
				})
				console.log("current = " + currentPlaylist)
				console.log("new = " + newPlaylist)
				currentPlaylist = newPlaylist
			}
		})
	}

	var i = setInterval(function() { updatePlaylist() }, 5000)

	$('#create-playlist-btn').hide()
	$('#new-playlist').hide()
	$('#new-number').hide()
	$('.container').on('click', '#sign-in-btn', function() {
		R.authenticate()
		$('#sign-in-btn').hide()
		$('#create-playlist-btn').show()
	})

	$('.container').on('click', '#create-playlist-btn', function() {
		$('#create-playlist-btn').hide()
		$('#new-playlist').show()
	})

	$('.container').on('submit', '#new-playlist', function(e) {
		e.preventDefault()
		e.stopPropagation()
		var name = $('#new-playlist input').val()
		R.ready(createPlaylist(name))
		$('#new-playlist').hide()
		$('#new-number').show()
	})

	$('.container').on('submit', '#new-number', function(e) {
		e.preventDefault()
		$.post('/addnumber', $('#new-number').serialize())
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
			console.log(response.result)
			console.log(response.result['embedUrl'])
			var playerUrl = response.result['embedUrl']
			$('.container').after('<embed src="' + playerUrl + '" id="rdio-player">')
		},
		error: function(response) {
			console.log("error " + response.message)
		}
	})
}