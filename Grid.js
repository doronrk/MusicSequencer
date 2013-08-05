;(function(exports) {
  var Grid = function(numTracks, numBeats){
	  this.numTracks = numTracks;
	  this.numBeats = numBeats;
	  this.domElement = new dom.GridDom(this);
	  this.clearButton = $("#clearButton");
	  this.tracks = [];
	  for (var track = 0; track < numTracks; track++) {
		  var newSampleTrack = new SampleTrack(track, this.numBeats);
		  dom.AppendDoms(this, newSampleTrack);
		  this.tracks.push(newSampleTrack);
	  }
	  this.draw = function() {
		  this.tracks.forEach(function(track) {
			  track.sample.domElement.draw();
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
	  var self = this;
	  this.clearButton.click( function () {
		  socket.emit("clearButton", {});
		  self.allOff();
	  })
  }

  exports.Grid = Grid;
}(this));
