var Button = function(track, beat, sampleTrack){ //will take dom
	this.track = track;
	this.beat = beat;
	this.sampleTrack = sampleTrack;
	this.on = false;
	this.domElement = new ButtonDom(this);
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
		console.log(this.track.toString(), this.beat.toString());
	}
}