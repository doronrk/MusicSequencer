var green = "rgb(0, 128, 0)",
	red = "rgb(255, 0, 0)",
	blue = "rgb(0, 0, 255)",
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
	this.domNode = $("<div class = 'sample_button'>preview</div>");
}
SamplePreviewDom.prototype.draw = function() {
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
	var numBoxes = this.sampleTrack.numBeats + 1;
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
