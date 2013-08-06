var socket;
$(document).ready(function () {
	socket = io.connect('http://localhost');
	var grid;
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
	socket.on("loadGrid", function(data) {
		grid = new Grid(data.gridJSON);
		grid.draw();
	})
});