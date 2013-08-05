;(function(exports) {
  var Transport = function(grid) {
	  this.startButton = $("#startButton");
	  this.stopButton = $("#stopButton");
	  this.restartButton = $("#restartButton");
	  this.stopButton.hide();
	  this.currentBeat = 0;
	  this.on = false;
	  this.bpm = 120;
	  this.steppingProcess;
	  var self = this;
	  this.startButton.click( function () {
		  self.on = true;
		  $(this).hide();
		  self.stopButton.show();
		  self.stepper();
		  self.steppingProcess = setInterval(function(){self.stepper()},self.bpmToMS(self.bpm));
	  });
	  this.stopButton.click( function () {
		  self.on = false;
		  $(this).hide();
		  self.startButton.show();
		  clearInterval(self.steppingProcess);
	  });
	  this.restartButton.click( function () {
		  clearInterval(self.steppingProcess);
		  grid.unhighlight();
		  self.currentBeat = 0;
		  if (self.on) {
			  self.stepper();
			  self.steppingProcess = setInterval(function(){self.stepper()},self.bpmToMS(self.bpm));
		  }
		  else {
			  grid.highlightBeat(0, true);
		  }
	  })
	  this.stepper = function () {
		  this.currentBeat = this.currentBeat%grid.numBeats;
		  var prevBeat = this.currentBeat === 0 ? grid.numBeats - 1 : this.currentBeat - 1;
		  grid.highlightBeat(this.currentBeat, true);
		  grid.highlightBeat(prevBeat, false);
		  grid.playBeat(this.currentBeat);
		  this.currentBeat++;
	  };
	  this.bpmToMS = function(bpm) {
		  var beatsPerSecond = bpm/60.0;
		  var secondsPerBeat = 1.0/beatsPerSecond;
		  var msPerBeat = secondsPerBeat * 1000.0;
		  return msPerBeat;
	  };
  }

  exports.Transport = Transport;
}(this));
