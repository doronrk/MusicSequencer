var SampleSelector = function(sampleTrack) {
	this.sampleTrack = sampleTrack;
	this.domElement = new SampleSelectorDom(this);
	this.controlElement = new SampleSelectorControl(this);
}