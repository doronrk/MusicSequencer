;(function(exports) {
	var green = "rgb(0, 128, 0)",
		red = "rgb(255, 0, 0)",
		blue = "rgb(0, 0, 255)",
		grey = "rgb(100, 100, 100)",
		highlight = "2px solid white",
		notHighlight = "2px solid black";

	var boxWidth = 50,
		boxHeight = 50,
		boxBorder = 2,
		boxWidthSpace = boxWidth + 2 * boxBorder,
		boxHeightSpace = boxHeight + 2 * boxBorder;

	var appendToDom = function (parentDom, childDom) {
		parentDom.getDomNode().append(childDom.getDomNode());
	};

	var BPMCalculatorDom = function(BPMCalculator) {
		this.BPMCalculator = BPMCalculator;
		var domNode = $("<div id = 'BPMCalculator'>" + this.BPMCalculator.bpm + "</div>");
		domNode.css({"background-color": grey});
		domNode.css({"width": "" + boxWidth.toString() + "px"});
		domNode.css({"height": "" + boxHeight.toString() + "px"});
		domNode.css({"float": "left"});
		domNode.css({"border": "" + boxBorder.toString() + "px solid black"});
		this.getDomNode = function() {
			return domNode;
		};
		var self = this;
		domNode.click(function() {
			var d = new Date();
			var ms = d.getMilliseconds();
			var s = d.getSeconds();
			self.BPMCalculator.handleClick(s, ms);
		});
	}

	var BPMSyncDom = function(BPMCalculator) {
		this.BPMCalculator = BPMCalculator;
		var domNode = $("<div id = 'BPMSync'>SYNC BPM</div>");
		domNode.css({"background-color": grey});
		domNode.css({"width": "" + boxWidth.toString() + "px"});
		domNode.css({"height": "" + boxHeight.toString() + "px"});
		domNode.css({"float": "left"});
		domNode.css({"border": "" + boxBorder.toString() + "px solid black"});
		this.getDomNode = function() {
			return domNode;
		}
		var self = this;
		domNode.click(function() {
			var bpm = self.BPMCalculator.bpm;
			self.BPMCalculator.grid.handleBpm(bpm);
		});
	}

	var ButtonDom = function(button, sampleTrack) {
		this.button = button;
		// why is this construct better than this.domNode = ?
		var domNode = $("<div class ='button' track = '" + this.button.track.toString() + "' beat = '" + this.button.beat.toString() + "'></div>");
		this.getDomNode = function() {
			return domNode;
		};
		var color = this.button.on ? red : green;
		domNode.css({"background-color": color});
		domNode.css({"width": "" + boxWidth.toString() + "px"});
		domNode.css({"height": "" + boxHeight.toString() + "px"});
		domNode.css({"float": "left"});
		domNode.css({"border": "" + boxBorder.toString() + "px solid black"});
		appendToDom(sampleTrack.domElement, this);
	}
	ButtonDom.prototype.redraw = function() {
		var color = this.button.on ? red : green;
		this.getDomNode().css({"background-color": color});
	}
	ButtonDom.prototype.highlight = function(state) {
		var color = state ? highlight : notHighlight;
		this.getDomNode().css({"border" : color});
	}

	var SamplePreviewDom = function(samplePreview) {
		this.samplePreview = samplePreview;
		var file = this.samplePreview.sampleTrack.fname;
		file = file.replace(/^.*\\/i, "");
		file = file.replace("samples/", "");
		var domNode = $("<font color='white'><div class = 'sample_button'>" + file + "</div></font>");
		domNode.css({"background-color": blue});
		domNode.css({"width": "" + boxWidth.toString() + "px"});
		domNode.css({"height": "" + boxHeight.toString() + "px"});
		domNode.css({"float": "left"});
		domNode.css({"border": "" + boxBorder.toString() + "px solid black"});
		this.getDomNode = function () {
			return domNode;
		};
	}

	var SampleSelectorDom = function(sampleSelector) {
		this.sampleSelector = sampleSelector;
		var domNode = $("<input id='sampleFileName' type='file'/>");
		domNode.css({"background-color": blue});
		domNode.css({"width": "" + boxWidth.toString() + "px"});
		domNode.css({"height": "" + boxHeight.toString() + "px"});
		domNode.css({"float": "left"});
		domNode.css({"border": "" + boxBorder.toString() + "px solid black"});
		this.getDomNode = function() {
			return domNode;
		};
	}

	var SampleTrackDom = function(sampleTrack) {
		this.sampleTrack = sampleTrack;
		var domNode = $("<div class ='sample_track' track = '" + this.sampleTrack.track.toString() + "'></div>");
		this.getDomNode = function() {
			return domNode;
		};
		// appendToDom(this, sample.domElement);
		domNode.css({"width" : "" + this.width().toString() + "px"});
		domNode.css({"height": "" + boxHeightSpace + "px"});
	}
	SampleTrackDom.prototype.width = function () {
		var numBoxes = this.sampleTrack.grid.numBeats + 2;
		return numBoxes * boxWidthSpace;
	}
	var GridDom = function(tracks) {
		this.tracks = tracks;
		var domNode = $("#grid");
		this.getDomNode = function() {
			return domNode;
		};
		var self = this;
		tracks.forEach(function(x) {
			appendToDom(self, x.domElement);
		});
	}
	GridDom.prototype.draw = function() {
		this.getDomNode().css({"width" : "" + this.width().toString() + "px"});
		this.getDomNode().css({"height": "" + this.height().toString() + "px"});
	}
	GridDom.prototype.width = function() {
		return this.tracks[0].domElement.width();
	}
	GridDom.prototype.height = function() {
		return this.numTracks * boxHeightSpace;
	}
	exports.dom = {};
	exports.dom.appendToDom = appendToDom;
	exports.dom.BPMCalculatorDom = BPMCalculatorDom;
	exports.dom.BPMSyncDom = BPMSyncDom;
	exports.dom.SamplePreviewDom = SamplePreviewDom;
	exports.dom.SampleSelectorDom = SampleSelectorDom;
	exports.dom.ButtonDom = ButtonDom;
	exports.dom.SampleTrackDom = SampleTrackDom;
	exports.dom.GridDom = GridDom;
}(this));
