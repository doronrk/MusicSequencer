var GridControl = function(grid) {
	this.grid = grid;
	this.clearButton = $("#clearButton");
	this.saveButton = $("#saveButton");
	var self = this;
	this.clearButton.click(function () {
		socket.emit("clearButton", {});
		self.grid.allOff();
	});
	this.saveButton.click(function () {
		var jReady = new JSONReady(self.grid);
		socket.emit("saveButton", {gridJSON: jReady});
	});
}

var TransportControl = function(transport) {
	this.transport = transport;
	this.startButton = $("#startButton");
	this.stopButton = $("#stopButton");
	this.restartButton = $("#restartButton");
	this.submitButton = $("#submitButton");
	this.stopButton.hide();
	var self = this;
	this.startButton.click(function() {
		self.transport.on = true;
		$(this).hide();
		self.stopButton.show();
		self.transport.initStepper();
	});
	this.stopButton.click(function(){
		self.transport.on = false;
		$(this).hide();
		self.startButton.show();
		clearInterval(self.transport.steppingProcess);
	});
	this.restartButton.click(function () {
		clearInterval(self.transport.steppingProcess);
		self.transport.grid.unhighlight();
		self.transport.currentBeat = 0;
		if (self.transport.on) {
			self.transport.initStepper();
		} else {
			self.transport.grid.highlightBeat(0, true);
		}
	});
}

var ButtonControl = function(button) {
	this.button = button;
	var self = this;
	this.button.domElement.domNode.click(function() {
		self.button.flip();
		socket.emit("buttonPress", {track: self.button.track, beat: self.button.beat});
	});
}

var SampleControl = function(sample) {
	this.sample = sample;
	var self = this;
	this.sample.domElement.domNode.click(function () {
		console.log("play");
		self.sample.play();
	});
}

