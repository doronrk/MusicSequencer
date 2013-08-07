var SampleSelector = function(sampleTrack) {
	this.sampleTrack = sampleTrack;
	this.domElement = new dom.SampleSelectorDom(this);
	this.controlElement = new SampleSelectorControl(this);
}