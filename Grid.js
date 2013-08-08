;(function(exports) {
	var Grid = function(gridJSON){
		this.numTracks = gridJSON.numTracks;
		this.numBeats = gridJSON.numBeats;
		this.controlElement = new GridControl(this);
		this.bpmButton = $("#bpmButton");
		this.resizeButton = $("#resizeButton");
		this.transport = new Transport(this);
		this.transportbpm = gridJSON.bpm;
		this.BPMCalculator = new BPMCalculator(this);
		this.tracks = [];
		for (var track = 0; track < this.numTracks; track++) {
			var newSampleTrack = new SampleTrack(track, this.numBeats, this);
			this.tracks.push(newSampleTrack);
		}
		this.domElement = new dom.GridDom(this.tracks);
		for (var track = 0; track < this.numTracks; track++) {
			for (var beat = 0; beat < this.numBeats; beat++) {
				this.tracks[track].buttons[beat].on = gridJSON.tracks[track][beat];
			}
		}
		$("#bpm").val(this.transport.bpm);
		$("#numTracks").val(this.numTracks);
		$("#numBeats").val(this.numBeats);
		this.domElement.draw();
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
		this.handleBpm= function(bpm) {
			if (10 < bpm && bpm < 1000) {
				self.transport.bpm = bpm;
				var displayBpm = Math.round(bpm * 100)/100;
				$("#bpm").val(displayBpm);
				if (self.transport.on) {
					self.transport.initStepper();
				}
			}
		}
		this.handleResize = function(newTracks, newBeats) {
			this.transport.stopHandle();
			// this.transport.restartHandle();
			// create new tracks
			for (var track = this.tracks.length; track < newTracks; track++) {
				var newSampleTrack = new SampleTrack(track, this.numBeats, this);
				dom.appendToDom(this.domElement, newSampleTrack.domElement);
				this.tracks.push(newSampleTrack);
			}
			this.numTracks = newTracks;
			this.numBeats = newBeats;
			// draw visible tracks
			for (var track = 0; track < this.numTracks; track++) {
				this.tracks[track].domElement.getDomNode().show();
			}
			// hide previously visible tracks
			for (var track = newTracks; track < this.tracks.length; track++) {
				this.tracks[track].domElement.getDomNode().hide();
			}
			// create new beats
			for (var beat = this.tracks[0].buttons.length; beat < newBeats; beat++) {
				console.log("create new beats");
				for (var track = 0; track < this.tracks.length; track++) {
					var thisTrack = this.tracks[track];
					var newButton = new Button(track, beat, thisTrack);
					thisTrack.buttons.push(newButton);
				}
			}
			// draw visible buttons
			for (var beat = 0; beat < this.numBeats; beat++) {
				this.getBeat(beat).forEach(function (button) {
					button.domElement.getDomNode().show();
				});
			}
			// hide previously visible buttons
			for (var beat = this.numBeats; beat < this.tracks[0].buttons.length; beat++) {
				this.getBeat(beat).forEach(function (button) {
					button.domElement.getDomNode().hide();
				});
			}
			this.domElement.draw();
			this.transport.restartHandle();
		}
		this.highlightBeat(0, true);
	}
	exports.Grid = Grid;
}(this));	