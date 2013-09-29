$(document).ready(function() {
	var currentPlaylist = []
	$.get("/allsongs", function(data) {
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
			console.log('newPlaylist', newPlaylist)
			console.log('currentPlaylist', currentPlaylist)
			if (!(newPlaylist.length == currentPlaylist.length)) {
				console.log('pushing to songsToAdd')
				songsToAdd.push(newPlaylist[newPlaylist.length - 1])
				console.log(songsToAdd)
			}
			if (!(songsToAdd.length == 0)) {
				console.log('searching for song')
				console.log(songsToAdd[0])
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
			}
			currentPlaylist = newPlaylist
			console.log('setting currentPlaylist = newPlaylist')
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
			tracks: "t31960987"
		},
		success: function(response) {
			console.log(response.result)
			console.log(response.result['embedUrl'])
			var playerUrl = response.result['embedUrl']
			var playerKey = response.result['key']
			$.post("/newsong", {key: playerKey})
			$('.container').after('<embed src="' + playerUrl + '" id="rdio-player">')
		},
		error: function(response) {
			console.log("error " + response.message)
		}
	})
}
