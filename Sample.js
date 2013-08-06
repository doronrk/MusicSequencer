var Sample = function(fname, sampleTrack) {
	this.sampleTrack = sampleTrack;
	this.fname = fname;
	this.audio = $("<audio controls><source src='" + this.fname + "' type ='audio/mpeg'></audio>");
	this.prevAudio = this.audio;
	this.domElement = new SampleDom(this);
	this.controlElement = new SampleControl(this);
	this.play = function () {
		if (this.sampleTrack.on) {
			if (this.sampleTrack.retrigger) {
				this.prevAudio.get(0).pause();
			}
			this.audio.get(0).play();
			this.prevAudio = this.audio;
			this.audio = $("<audio controls><source src='" + this.fname + "' type ='audio/mpeg'></audio>");
		}
	}
}