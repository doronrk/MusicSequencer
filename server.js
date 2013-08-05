var app = require('http').createServer(handler),
	io = require('socket.io').listen(app, {log: false}),
	fs = require('fs'),
	JSONReady = require('./JSONReady.js').JSONReady;

app.listen(4000);

function handler (req, res) {
	var file = req.url === "/" ? "/index.html" : req.url;
	fs.readFile(__dirname + file, function (err, data) {
		if (err) {
			res.writeHead(404);
			res.end();
		}
		else {
			res.writeHead(200);
			res.end(data);
		}
	});
}
var gridJSON = new JSONReady();
var newUser = false;

io.sockets.on('connection', function (socket) {
	socket.emit("loadGrid", {gridJSON: gridJSON});
	socket.on("buttonPress", function (data) {
		socket.broadcast.emit("buttonPress", data);
		console.log(data);
	});
	socket.on("clearButton", function (data) {
		socket.broadcast.emit("clearButton", data);
		console.log("clearButton");
	});
	socket.on("saveButton", function (data) {
		gridJSON = data.gridJSON;
	});
});