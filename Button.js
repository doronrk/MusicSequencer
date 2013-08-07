;(function (exports) {
	var Button = function(track, beat, sampleTrack){
		this.track = track;
		this.beat = beat;
		this.sampleTrack = sampleTrack;
		this.on = false;
		this.domElement = new dom.ButtonDom(this, this.sampleTrack);
		this.controlElement = new ButtonControl(this);
	}
	Button.prototype.flip = function(){
		this.on = !this.on;
		this.domElement.redraw();
	}
	Button.prototype.highlight = function(state) {
		this.domElement.highlight(state);
	}
	Button.prototype.play = function() {
		if (this.on) {
			this.sampleTrack.sample.play();
		}
	}
	exports.Button = Button;
}(this));