var green = "rgb(0, 128, 0)",
	red = "rgb(255, 0, 0)",
	blue = "rgb(0, 0, 255)",
	grey = "rgb(100, 100, 100)",
	highlight = "2px solid white",
	notHighlight = "2px solid black";

var boxWidth = 50,
	boxHeight = 50,
	boxBorder = 2;
	boxWidthSpace = boxWidth + 2 * boxBorder,
	boxHeightSpace = boxHeight + 2 * boxBorder;

function AppendDoms (parent, child) {
	var parentDom = parent.domElement.domNode;
	var childDom = child.domElement.domNode;
	parentDom.append(childDom);
}

var BPMCalculatorDom = function(BPMCalculator) {
	this.BPMCalculator = BPMCalculator;
	this.domNode = $("<div id = 'BPMCalculator'>" + this.BPMCalculator.bpm + "</div>");
	this.draw = function() {
		this.domNode.css({"background-color": grey});
		this.domNode.css({"width": "" + boxWidth.toString() + "px"});
		this.domNode.css({"height": "" + boxHeight.toString() + "px"});
		this.domNode.css({"float": "left"});
		this.domNode.css({"border": "" + boxBorder.toString() + "px solid black"});
	}
	var self = this;
	this.domNode.click(function() {
		var d = new Date();
		var ms = d.getMilliseconds();
		var s = d.getSeconds();
		self.BPMCalculator.handleClick(s, ms);
	});
}

var BPMSyncDom = function(BPMCalculator) {
	this.BPMCalculator = BPMCalculator;
	this.domNode = $("<div id = 'BPMSync'>SYNC BPM</div>");
	this.draw = function() {
		this.domNode.css({"background-color": grey});
		this.domNode.css({"width": "" + boxWidth.toString() + "px"});
		this.domNode.css({"height": "" + boxHeight.toString() + "px"});
		this.domNode.css({"float": "left"});
		this.domNode.css({"border": "" + boxBorder.toString() + "px solid black"});
	}
	var self = this;
	this.domNode.click(function() {
		var bpm = self.BPMCalculator.bpm;
		self.BPMCalculator.grid.handleBpm(bpm);
	});
}

var ButtonDom = function(button) {
	this.button = button;
	this.domNode = $("<div class ='button' track = '" + this.button.track.toString() + "' beat = '" + this.button.beat.toString() + "'></div>");
}
ButtonDom.prototype.draw = function() {
	var color = this.button.on ? red : green;
	this.domNode.css({"background-color": color});
	this.domNode.css({"width": "" + boxWidth.toString() + "px"});
	this.domNode.css({"height": "" + boxHeight.toString() + "px"});
	this.domNode.css({"float": "left"});
	this.domNode.css({"border": "" + boxBorder.toString() + "px solid black"});
}
ButtonDom.prototype.redraw = function() {
	var color = this.button.on ? red : green;
	this.domNode.css({"background-color": color});
}
ButtonDom.prototype.highlight = function(state) {
	var color = state ? highlight : notHighlight;
	this.domNode.css({"border" : color});
}

var SamplePreviewDom = function(samplePreview) {
	this.samplePreview = samplePreview;
	var file = this.samplePreview.sampleTrack.fname;
	file = file.replace(/^.*\\/i, "");
	file = file.replace("samples/", "");
	console.log(file);
	this.domNode = $("<font color='white'><div class = 'sample_button'>" + file + "</div></font>");
}
SamplePreviewDom.prototype.draw = function() {
	this.domNode.css({"background-color": blue});
	this.domNode.css({"width": "" + boxWidth.toString() + "px"});
	this.domNode.css({"height": "" + boxHeight.toString() + "px"});
	this.domNode.css({"float": "left"});
	this.domNode.css({"border": "" + boxBorder.toString() + "px solid black"});
}

var SampleSelectorDom = function(sampleSelector) {
	this.sampleSelector = sampleSelector;
	this.domNode = $("<input id='sampleFileName' type='file'/>");
}
SampleSelectorDom.prototype.draw = function() {
	this.domNode.css({"background-color": blue});
	this.domNode.css({"width": "" + boxWidth.toString() + "px"});
	this.domNode.css({"height": "" + boxHeight.toString() + "px"});
	this.domNode.css({"float": "left"});
	this.domNode.css({"border": "" + boxBorder.toString() + "px solid black"});
}

var SampleTrackDom = function(sampleTrack) {
	this.sampleTrack = sampleTrack;
	this.domNode = $("<div class ='sample_track' track = '" + this.sampleTrack.track.toString() + "'></div>");
}
SampleTrackDom.prototype.draw = function() {
	this.domNode.css({"width" : "" + this.width().toString() + "px"});
	this.domNode.css({"height": "" + this.height().toString() + "px"});
}
SampleTrackDom.prototype.width = function () {
	var numBoxes = this.sampleTrack.grid.numBeats + 2;
	console.log(numBoxes);
	return numBoxes * boxWidthSpace;
}
SampleTrackDom.prototype.height = function () {
	return boxHeightSpace;
}

var GridDom = function(grid) {
	this.grid = grid;
	this.domNode = $("#grid");
}
GridDom.prototype.draw = function() {
	this.domNode.css({"width" : "" + this.width().toString() + "px"});
	this.domNode.css({"height": "" + this.height().toString() + "px"});
}
GridDom.prototype.width = function() {
	return this.grid.tracks[0].domElement.width();
}
GridDom.prototype.height = function() {
	return this.numTracks * this.grid.tracks[0].domElement.height();
}
