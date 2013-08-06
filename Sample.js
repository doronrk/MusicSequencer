;(function(exports) {
  var Sample = function(fname, sampleTrack) {
	  var audio = $("<audio controls><source src='" + fname + "' type ='audio/mpeg'></audio>");
	  this.domElement = new dom.SampleDom(this);
	  // this.domElement.draw();
	  this.play = function () {
		  if (sampleTrack.on) {
			  audio.get(0).play();
			  audio = $("<audio controls><source src='" + fname + "' type ='audio/mpeg'></audio>");
		  }
	  }
  }

  exports.Sample = Sample;
}(this));
