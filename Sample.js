;(function(exports) {	
	var Sample = function(fname, sampleTrack) {
		var audio = $("<audio controls><source src='" + sampleTrack.fname + "' type ='audio/mpeg'></audio>");
		var prevAudio = audio;
		this.play = function () {
			//audio = $("<audio controls><source src='" + sampleTrack.fname + "' type ='audio/mpeg'></audio>");
			if (sampleTrack.on) {
				if (sampleTrack.retrigger) {
					prevAudio.get(0).pause();
				}
				audio.get(0).play();
				prevAudio = audio;
				this.reloadAudio();
			}
		}
		this.reloadAudio = function() {
			audio = $("<audio controls><source src='" + sampleTrack.fname + "' type ='audio/mpeg'></audio>");
		}
	}
	exports.Sample = Sample;
}(this));