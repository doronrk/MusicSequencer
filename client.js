var socket;
$(document).ready(function () {
	socket = io.connect('http://localhost');
	var	tracks = 8;
	var	beats = 16;
	var grid = new Grid(tracks, beats);
	grid.draw();
	var transport = new Transport(grid);
	socket.on("buttonPress", function(data) {
		var track = data.track;
		var beat = data.beat;
		var sourceTrack = grid.tracks[track];
		var sourceButton = sourceTrack.buttons[beat];
		sourceButton.flip();
	})
	socket.on("clearButton", function(data) {
		grid.allOff();
	})
});