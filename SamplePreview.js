var SamplePreview = function(sampleTrack) {
	this.sampleTrack = sampleTrack;
	this.domElement = new dom.SamplePreviewDom(this);
	this.controlElement = new SamplePreviewControl(this);
}