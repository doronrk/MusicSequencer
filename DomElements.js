;(function(exports) {
  var green = "rgb(0, 128, 0)",
	    red = "rgb(255, 0, 0)",
    	blue = "rgb(0, 0, 255)",
    	highlight = "2px solid white",
      notHighlight = "2px solid black";

  var appendToDom = function(parentDom, childDom) {
    parentDom.getDomNode().append(childDom.getDomNode());
  };

  var ButtonDom = function(button, sampleTrack) {
	  this.button = button;
	  var domNode = $("<div class ='button' track = '" + this.button.track.toString() + "' beat = '" + this.button.beat.toString() + "'></div>");
	  var self = this;
	  // Should this click listener be here or in Button.js, or control.js ... hmmmmm
	  domNode.click( function () {
		  socket.emit("buttonPress", {track: self.button.track, beat: self.button.beat})
		  self.button.flip();
	  })

    this.getDomNode = function() {
      return domNode;
    };

    appendToDom(sampleTrack.domElement, this)
  }
  ButtonDom.width = 50;
  ButtonDom.height = 50;
  ButtonDom.border = 2;
  ButtonDom.widthSpace = ButtonDom.width + 2 * (ButtonDom.border);
  ButtonDom.heightSpace = ButtonDom.height + 2 * (ButtonDom.border);
  ButtonDom.prototype.draw = function() {
	  var color = this.button.on ? red : green;
	  this.getDomNode().css({"background-color": color});
	  this.getDomNode().css({"width": "" + ButtonDom.width.toString() + "px"});
	  this.getDomNode().css({"height": "" + ButtonDom.height.toString() + "px"});
	  this.getDomNode().css({"float": "left"});
	  this.getDomNode().css({"border": "" + ButtonDom.border.toString() + "px solid black"});
  }
  ButtonDom.prototype.redraw = function() {
	  var color = this.button.on ? red : green;
	  this.getDomNode().css({"background-color": color});
  }
  ButtonDom.prototype.highlight = function(state) {
	  var color = state ? highlight : notHighlight;
	  this.getDomNode().css({"border" : color});
  }

  var SampleDom = function(fname) {
	  var domNode = $("<div class = 'sample_button' fname = '" + fname.toString() + "'></div>");
	  domNode.click(function () {
		  sample.play();
	  });

	  domNode.css({"background-color": blue});
	  domNode.css({"width": "" + ButtonDom.width.toString() + "px"});
	  domNode.css({"height": "" + ButtonDom.height.toString() + "px"});
	  domNode.css({"float": "left"});
	  domNode.css({"border": "" + ButtonDom.border.toString() + "px solid black"});

    this.getDomNode = function() {
      return domNode;
    };
  }
  SampleDom.widthSpace = SampleDom.width + 2 * SampleDom.border;
  SampleDom.heightSpace = SampleDom.height + 2 * SampleDom.border;


  var SampleTrackDom = function(track, sample) {
	  var domNode = $("<div class ='sample_track' track = '" + track + "'></div>");

    this.getDomNode = function() {
      return domNode;
    };

    appendToDom(this, sample.domElement);
	  domNode.css({"height": "" + ButtonDom.heightSpace + "px"});
  }

  var GridDom = function(tracks) {
	  var domNode = $("#grid");
    this.getDomNode = function() {
      return domNode;
    };

    var self = this;
    tracks.forEach(function(x) {
      appendToDom(self, x.domElement)
    });
  }

  exports.dom = {};
  exports.dom.ButtonDom = ButtonDom;
  exports.dom.SampleTrackDom = SampleTrackDom;
  exports.dom.SampleDom = SampleDom;
  exports.dom.GridDom = GridDom;
  exports.dom.appendToDom = appendToDom;
}(this));
