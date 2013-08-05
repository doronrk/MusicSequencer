var socket;
$(document).ready(function () {
	socket = io.connect('http://localhost');
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
		var grid = new Grid(0,0);
		grid.loadJSON(data.gridJSON);
		grid.draw();
		var transport = new Transport(grid);
	})
});