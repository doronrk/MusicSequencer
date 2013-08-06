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
		self.transport.startHandle();
	});
	this.stopButton.click(function(){
		self.transport.stopHandle();
	});
	this.restartButton.click(function () {
		self.transport.restartHandle();
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

var SamplePreviewControl = function(samplePreview) {
	this.samplePreview = samplePreview;
	var self = this;
	this.samplePreview.domElement.domNode.click(function () {
		self.samplePreview.sampleTrack.sample.play();
	});
}

var SampleSelectorControl = function(sampleSelector) {
	this.sampleSelector = sampleSelector;
	var self = this;
	this.sampleSelector.domElement.domNode.bind("change", function (e)
	{
		var file = self.sampleSelector.domElement.domNode.val();
		// file = file.replace(/^.*\\/i, "");
		// file = "samples/"+file;	
		self.sampleSelector.sampleTrack.reloadSample(file);
		console.log(file);
	});
}