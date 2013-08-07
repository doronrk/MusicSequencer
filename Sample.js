;(function(exports) {	
	var Sample = function(fname, sampleTrack) {
		// why sampleTrack ref argument instead of this.sampleTrack = sampleTrack
		// why var audio vs. this.audio
		var audio = $("<audio controls><source src='" + sampleTrack.fname + "' type ='audio/mpeg'></audio>");
		var prevAudio = audio;
		this.play = function () {
			if (sampleTrack.on) {
				if (sampleTrack.retrigger) {
					prevAudio.get(0).pause();
				}
				audio.get(0).play();
				prevAudio = audio;
				audio = $("<audio controls><source src='" + sampleTrack.fname + "' type ='audio/mpeg'></audio>");
			}
		}
	}
	exports.Sample = Sample;
}(this));