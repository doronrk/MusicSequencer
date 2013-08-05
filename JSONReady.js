var JSONReady = function(grid) {
	this.numTracks = grid.numTracks;
	this.numBeats = grid.numBeats;
	this.tracks = [];
	for (var track = 0; track < this.numTracks; track++) {
		var buttons = [];
		for (var button = 0; button < this.numBeats; button++) {
			var on = grid.tracks[track].buttons[button].on;
			buttons.push(on);
		}
		this.tracks.push(buttons);
	}
}