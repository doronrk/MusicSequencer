;(function(exports) {
  var Sample = function(fname, sampleTrack) {
	  this.fname = fname;
	  this.audio = $("<audio controls><source src='" + this.fname + "' type ='audio/mpeg'></audio>");
	  this.domElement = new dom.SampleDom(this);
	  // this.domElement.draw();
	  this.play = function () {
		  if (sampleTrack.on) {
			  this.audio.get(0).play();
			  this.audio = $("<audio controls><source src='" + this.fname + "' type ='audio/mpeg'></audio>");
		  }
	  }
  }

  exports.Sample = Sample;
}(this));
