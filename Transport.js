;(function(exports) {
	var Transport = function(grid) {
		this.controlElement = new TransportControl(this);
		this.grid = grid;
		this.currentBeat = 0;
		this.on = false;
		this.bpm = 280;
		this.steppingProcess;
		var self = this;
		this.initStepper = function() {
			clearInterval(self.steppingProcess);
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
		this.startHandle = function() {
			this.on = true;
			this.controlElement.startButton.hide();
			this.controlElement.stopButton.show();
			self.initStepper();
		};
		this.stopHandle = function() {
			this.on = false;
			this.controlElement.stopButton.hide();
			this.controlElement.startButton.show();
			clearInterval(this.steppingProcess);
		};
		this.restartHandle = function() {
			clearInterval(this.steppingProcess);
			this.grid.unhighlight();
			this.currentBeat = 0;
			if (this.on) {
				this.initStepper();
			} else {
				this.grid.highlightBeat(0, true);
			}
		};
	}
	exports.Transport = Transport;
}(this));


