var Transport = function(grid) {
	this.controlElement = new TransportControl(this);
	this.grid = grid;
	this.currentBeat = 0;
	this.on = false;
	this.bpm = 280;
	this.steppingProcess;
	var self = this;
	this.initStepper = function() {
		self.stepper();
		self.steppingProcess = setInterval(function(){
			self.stepper()
		},self.bpmToMS(self.bpm));
	};
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