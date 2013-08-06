var Grid = function(gridJSON){
	this.numTracks = gridJSON.numTracks;
	this.numBeats = gridJSON.numBeats;
	this.domElement = new GridDom(this);
	this.controlElement = new GridControl(this);
	this.tracks = [];
	for (var track = 0; track < this.numTracks; track++) {
		var newSampleTrack = new SampleTrack(track, this.numBeats);
		AppendDoms(this, newSampleTrack);
		this.tracks.push(newSampleTrack);
	}
	for (var track = 0; track < this.numTracks; track++) {
		for (var beat = 0; beat < this.numBeats; beat++) {
			this.tracks[track].buttons[beat].on = gridJSON.tracks[track][beat];
		}
	}
	this.draw = function() {
		this.tracks.forEach(function(track) {
			track.samplePreview.domElement.draw();
			track.buttons.forEach(function(button) {
				button.domElement.draw();
			})
			track.domElement.draw();
		})
		this.domElement.draw();
	}
	this.getBeat = function(beat) {
		return this.tracks.map(function (track) {
			return track.buttons[beat];
		})
	}
	this.allButtons = function() {
		return this.tracks.reduce(function (a, track) {
			return a.concat(track.buttons);
		}, [])
	}
	this.highlightBeat = function (beat, state) {
		this.getBeat(beat).forEach( function (button) {
			button.highlight(state);
		})
	}
	this.playBeat = function (beat) {
		this.getBeat(beat).forEach( function (button) {
			button.play();
		})
	}
	this.allOff = function () {
		this.allButtons().forEach(function (button) {
			if (button.on) {
				button.flip();
			}
		})
	}
	this.unhighlight = function () {
		this.allButtons().forEach(function (button) {
			button.highlight(false);
		})
	}
}