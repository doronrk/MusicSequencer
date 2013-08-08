var samples = ["horn.mp3", "triangle.mp3", "crash.mp3", "hiHat.mp3", "clap.mp3", "snare.mp3", "what.mp3", "trunkShaker.mp3"];
// each sampletrack should have ability to change time resolution
// ie numBeats * 2 or /2 or /3 *3
// this will make stepper more complex, but fun challenge

var SampleTrack = function(track, numBeats, grid) {
	this.on = true;
	this.grid = grid;
	this.retrigger = false;
	this.track = track;
	this.numBeats = numBeats;
	this.fname = "samples/" + samples[this.track%8];
	this.domElement = new dom.SampleTrackDom(this);
	this.sample = new Sample(this.fname, this);
	this.sampleSelector = new SampleSelector(this);
	this.samplePreview = new SamplePreview(this);
	this.sampleMute = new dom.SampleMuteDom(this);
	this.selectAll = new dom.SelectAllDom(this);
	this.clearAll = new dom.ClearAllDom(this);
	dom.appendToDom(this.domElement, this.sampleSelector.domElement);
	dom.appendToDom(this.domElement, this.samplePreview.domElement);
	this.buttons = [];
	for (var beat = 0; beat < this.numBeats; beat++) {
		var newButton = new Button(this.track, beat, this);
		dom.appendToDom(this.domElement, newButton.domElement);
		this.buttons.push(newButton);
	}
}
SampleTrack.prototype.reloadAudio = function(fname) {
	this.fname = "samples/" + fname;
	this.sample.reloadAudio();
	this.samplePreview.domElement.redraw();
}
SampleTrack.prototype.handleSelectAll = function() {
	this.buttons.forEach(function(x){
		if (!x.on) {
			x.flip();
		}
	});
}
SampleTrack.prototype.handleClearAll = function() {
	this.buttons.forEach(function(x){
		if (x.on) {
			x.flip();
		}
	});
}