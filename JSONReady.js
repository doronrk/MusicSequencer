(function(exports){
	var JSONReady = function(grid) {
		this.numTracks = grid ? grid.numTracks : 8;
		this.numBeats = grid ? grid.numBeats : 16;
		this.tracks = [];
		if (grid) {
			console.log(grid.tracks);
		}
		for (var track = 0; track < this.numTracks; track++) {
			var buttons = [];
			for (var button = 0; button < this.numBeats; button++) {
				var on = grid ? grid.tracks[track].buttons[button].on : false;
				buttons.push(on);
			}
			this.tracks.push(buttons);
		}
	}
	exports.JSONReady = JSONReady;
})(this);