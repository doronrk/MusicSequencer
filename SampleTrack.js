var samples = ["horn.mp3", "triangle.mp3", "crash.mp3", "hiHat.mp3", "clap.mp3", "snare.mp3", "what.mp3", "trunkShaker.mp3"].map(function (samp) {
	return "samples/" + samp;
})
// each sampletrack should have ability to change time resolution
// ie numBeats * 2 or /2 or /3 *3
// this will make stepper more complex, but fun challenge

var SampleTrack = function(track, numBeats) {
	this.on = true;
	this.retrigger = false;
	this.track = track;
	this.numBeats = numBeats;
	this.fname = samples[this.track%8];
	this.domElement = new SampleTrackDom(this);
	this.sample = new Sample(this.fname, this);
	this.samplePreview = new SamplePreview(this);
	AppendDoms(this, this.samplePreview);
	this.buttons = [];
	for (var beat = 0; beat < this.numBeats; beat++) {
		var newButton = new Button(this.track, beat, this);
		AppendDoms(this, newButton);
		this.buttons.push(newButton);
	}
}