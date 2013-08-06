var Grid = function(gridJSON){
	this.numTracks = gridJSON.numTracks;
	this.numBeats = gridJSON.numBeats;
	this.domElement = new GridDom(this);
	this.controlElement = new GridControl(this);
	this.bpmButton = $("#bpmButton");
	this.resizeButton = $("#resizeButton");
	this.transport = new Transport(this);
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
		for (var track = 0; track < this.numTracks; track++) {
			this.tracks[track].samplePreview.domElement.draw();
			this.tracks[track].sampleSelector.domElement.draw();
			for (var beat = 0; beat < this.numBeats; beat++) {
				this.tracks[track].buttons[beat].domElement.draw();
			}
			this.tracks[track].domElement.draw();
		}
	}
	this.getBeat = function(beat) {
		buttons = [];
		for (var track = 0; track < this.numTracks; track++) {
			buttons.push(this.tracks[track].buttons[beat]);
		}
		return buttons;
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
	var self = this;
	this.bpmButton.click(function(e){
		e.preventDefault();
		var bpm = $("#bpm").val() ? $("#bpm").val() : self.transport.bpm;
		self.transport.bpm = bpm;
		self.transport.initStepper();
	});
	this.resizeButton.click(function(e) {
		e.preventDefault();
		var numTracks = $("#numTracks").val() ? parseInt($("#numTracks").val(), 10) : self.numTracks;
		var numBeats = $("#numBeats").val() ? parseInt($("#numBeats").val(), 10) : self.numBeats;
		self.handleResize(numTracks, numBeats);
	});
	this.handleResize = function(newTracks, newBeats) {
		this.transport.stopHandle();
		this.transport.restartHandle();
		// create new tracks
		for (var track = this.tracks.length; track < newTracks; track++) {
			var newSampleTrack = new SampleTrack(track, this.numBeats);
			AppendDoms(this, newSampleTrack);
			this.tracks.push(newSampleTrack);
		}
		this.numTracks = newTracks;
		this.numBeats = newBeats;
		// draw visible tracks
		for (var track = 0; track < this.numTracks; track++) {
			this.tracks[track].domElement.domNode.show();
		}
		// hide previously visible tracks
		for (var track = newTracks; track < this.tracks.length; track++) {
			console.log("hide previous tracks");
			this.tracks[track].domElement.domNode.hide();
		}
		this.draw();
	}
}