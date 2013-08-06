var SamplePreview = function(sampleTrack) {
	this.sampleTrack = sampleTrack;
	this.domElement = new SamplePreviewDom(this);
	this.controlElement = new SamplePreviewControl(this);
}